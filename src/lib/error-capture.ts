// Captures errors out-of-band so server.ts can recover the stack when h3 has
// already swallowed the throw into a generic 500 Response. Also keeps a small
// ring buffer of recent errors for the /api/debug/errors preview endpoint.
//
// Each capture stores sanitized request/response metadata (headers, status,
// body snippet) so broken routes can be triaged without re-running the request.

export type SanitizedHeaders = Record<string, string>;

export type CapturedRequest = {
  method: string;
  url: string;
  path: string;
  headers: SanitizedHeaders;
};

export type CapturedResponse = {
  status: number;
  headers: SanitizedHeaders;
  contentType?: string;
  bodySnippet?: string;
  bodyTruncated?: boolean;
};

export type CapturedError = {
  id: string;
  at: number;
  message: string;
  name: string;
  stack?: string;
  location?: { file: string; line: number; column: number };
  requestId?: string;
  method?: string;
  path?: string;
  request?: CapturedRequest;
  response?: CapturedResponse;
};

const RING_SIZE = 50;
const TTL_MS = 5_000;
const BODY_SNIPPET_MAX = 600;

// Header names that must never leave the server. Compared case-insensitively.
const SENSITIVE_HEADERS = new Set([
  "authorization",
  "proxy-authorization",
  "cookie",
  "set-cookie",
  "x-api-key",
  "x-auth-token",
  "x-supabase-auth",
  "x-forwarded-authorization",
  "sb-access-token",
  "sb-refresh-token",
]);

// Query params commonly used to smuggle secrets. Redacted from stored URLs.
const SENSITIVE_QUERY_KEYS = /^(access_token|refresh_token|token|api[_-]?key|secret|password|code)$/i;

const ring: CapturedError[] = [];
let lastCapturedError: { error: unknown; at: number } | undefined;

// Persistence — only active on the server (Cloudflare Worker / Node).
// The ring buffer survives cold-starts and hot-reloads by being rehydrated
// from the `debug_error_captures` table on first read.
const isServer = typeof window === "undefined" && typeof process !== "undefined";
let hydrationPromise: Promise<void> | undefined;
let hydrated = false;

async function loadAdmin() {
  if (!isServer) return null;
  try {
    const mod = await import("@/integrations/supabase/client.server");
    return mod.supabaseAdmin ?? null;
  } catch {
    return null;
  }
}

async function hydrateFromDb(): Promise<void> {
  const admin = await loadAdmin();
  if (!admin) return;
  try {
    const { data, error } = await admin
      .from("debug_error_captures")
      .select("capture_id, captured_at, name, message, stack, location, request_id, method, path, request, response")
      .order("captured_at", { ascending: false })
      .limit(RING_SIZE);
    if (error || !data) return;
    // Only fill positions the in-memory ring doesn't already know about.
    const seen = new Set(ring.map((r) => r.id));
    const rows = data
      .filter((r) => !seen.has(r.capture_id))
      .map((r) => ({
        id: r.capture_id,
        at: new Date(r.captured_at).getTime(),
        name: r.name,
        message: r.message,
        stack: r.stack ?? undefined,
        location: (r.location as CapturedError["location"]) ?? undefined,
        requestId: r.request_id ?? undefined,
        method: r.method ?? undefined,
        path: r.path ?? undefined,
        request: (r.request as CapturedRequest) ?? undefined,
        response: (r.response as CapturedResponse) ?? undefined,
      } satisfies CapturedError));
    // Merge chronologically ascending, cap at RING_SIZE.
    const merged = [...rows.reverse(), ...ring].slice(-RING_SIZE);
    ring.splice(0, ring.length, ...merged);
  } catch {
    // Never let persistence break capture.
  }
}

export function ensureHydrated(): Promise<void> {
  if (hydrated) return Promise.resolve();
  if (!hydrationPromise) {
    hydrationPromise = hydrateFromDb().then(() => {
      hydrated = true;
    });
  }
  return hydrationPromise;
}

if (isServer) {
  // Fire-and-forget on module load so the ring is warm by the time
  // the first request hits getRecentErrors().
  void ensureHydrated();
}

async function persistCapture(captured: CapturedError): Promise<void> {
  const admin = await loadAdmin();
  if (!admin) return;
  try {
    await admin.from("debug_error_captures").insert({
      capture_id: captured.id,
      captured_at: new Date(captured.at).toISOString(),
      name: captured.name,
      message: captured.message,
      stack: captured.stack ?? null,
      location: captured.location ?? null,
      request_id: captured.requestId ?? null,
      method: captured.method ?? null,
      path: captured.path ?? null,
      request: captured.request ?? null,
      response: captured.response ?? null,
    });
  } catch {
    // ignore — persistence is best-effort
  }
}


function parseFirstFrame(stack?: string): CapturedError["location"] {
  if (!stack) return undefined;
  const lines = stack.split("\n");
  for (const raw of lines) {
    const line = raw.trim();
    const m =
      line.match(/\(([^)]+):(\d+):(\d+)\)/) ||
      line.match(/at\s+([^\s]+):(\d+):(\d+)/);
    if (m) return { file: m[1], line: Number(m[2]), column: Number(m[3]) };
  }
  return undefined;
}

export function sanitizeHeaders(input: Headers | Record<string, string> | undefined): SanitizedHeaders {
  const out: SanitizedHeaders = {};
  if (!input) return out;
  const entries: Array<[string, string]> =
    input instanceof Headers
      ? Array.from(input.entries())
      : Object.entries(input);
  for (const [rawKey, rawValue] of entries) {
    const key = rawKey.toLowerCase();
    if (SENSITIVE_HEADERS.has(key)) {
      out[key] = "[redacted]";
      continue;
    }
    // Common Bearer/JWT patterns leaking through custom headers.
    const value = String(rawValue);
    if (/^bearer\s+/i.test(value) || /^eyJ[A-Za-z0-9_-]{10,}\./.test(value)) {
      out[key] = "[redacted]";
      continue;
    }
    out[key] = value.length > 512 ? value.slice(0, 512) + "…" : value;
  }
  return out;
}

export function sanitizeUrl(rawUrl: string): { url: string; path: string } {
  try {
    const u = new URL(rawUrl);
    for (const key of Array.from(u.searchParams.keys())) {
      if (SENSITIVE_QUERY_KEYS.test(key)) u.searchParams.set(key, "[redacted]");
    }
    return { url: u.toString(), path: u.pathname };
  } catch {
    return { url: rawUrl, path: rawUrl };
  }
}

export function snippetFromText(text: string): { bodySnippet: string; bodyTruncated: boolean } {
  if (text.length <= BODY_SNIPPET_MAX) return { bodySnippet: text, bodyTruncated: false };
  return { bodySnippet: text.slice(0, BODY_SNIPPET_MAX) + "…", bodyTruncated: true };
}

export async function captureResponseMeta(response: Response): Promise<CapturedResponse> {
  const headers = sanitizeHeaders(response.headers);
  const contentType = response.headers.get("content-type") ?? undefined;
  const meta: CapturedResponse = {
    status: response.status,
    headers,
    contentType,
  };
  // Only snapshot text-ish bodies. Skip binary streams to avoid corrupting them.
  const isTextish =
    !contentType ||
    /^(text\/|application\/(json|xml|javascript|x-www-form-urlencoded))/i.test(contentType);
  if (!isTextish) return meta;
  try {
    const text = await response.clone().text();
    const { bodySnippet, bodyTruncated } = snippetFromText(text);
    meta.bodySnippet = bodySnippet;
    meta.bodyTruncated = bodyTruncated;
  } catch {
    // ignore — body may already be consumed / streaming
  }
  return meta;
}

export function captureRequestMeta(request: Request): CapturedRequest {
  const { url, path } = sanitizeUrl(request.url);
  return {
    method: request.method,
    url,
    path,
    headers: sanitizeHeaders(request.headers),
  };
}

function toCaptured(error: unknown, meta?: Partial<CapturedError>): CapturedError {
  const err = error instanceof Error ? error : new Error(String(error));
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `err_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    at: Date.now(),
    name: err.name,
    message: err.message,
    stack: err.stack,
    location: parseFirstFrame(err.stack),
    ...meta,
  };
}

export function recordError(error: unknown, meta?: Partial<CapturedError>): CapturedError {
  const captured = toCaptured(error, meta);
  lastCapturedError = { error, at: Date.now() };
  ring.push(captured);
  if (ring.length > RING_SIZE) ring.shift();
  return captured;
}

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => {
    recordError((event as ErrorEvent).error ?? event);
  });
  globalThis.addEventListener("unhandledrejection", (event) => {
    recordError((event as PromiseRejectionEvent).reason);
  });
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}

export function getRecentErrors(limit = RING_SIZE): CapturedError[] {
  return ring.slice(-limit).reverse();
}
