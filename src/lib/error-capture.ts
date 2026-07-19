// Captures errors out-of-band so server.ts can recover the stack when h3 has
// already swallowed the throw into a generic 500 Response. Also keeps a small
// ring buffer of recent errors for the /api/debug/errors preview endpoint.

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
};

const RING_SIZE = 50;
const TTL_MS = 5_000;

const ring: CapturedError[] = [];
let lastCapturedError: { error: unknown; at: number } | undefined;

function parseFirstFrame(stack?: string): CapturedError["location"] {
  if (!stack) return undefined;
  const lines = stack.split("\n");
  for (const raw of lines) {
    const line = raw.trim();
    // Common shapes: "at fn (file:line:col)" or "at file:line:col"
    const m =
      line.match(/\(([^)]+):(\d+):(\d+)\)/) ||
      line.match(/at\s+([^\s]+):(\d+):(\d+)/);
    if (m) return { file: m[1], line: Number(m[2]), column: Number(m[3]) };
  }
  return undefined;
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
