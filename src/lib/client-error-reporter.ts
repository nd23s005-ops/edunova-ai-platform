// Client-side capture that reports failed fetch / navigation to
// /api/debug/errors when the preview edge proxy or SSR returns 5xx.
//
// Preview/dev only — no-op in production builds. Fires and forgets via
// `keepalive: true` so reports survive page unloads. Deduplicates by
// URL+status within a short window to avoid log spam on retries.

const ENDPOINT = "/api/debug/errors";
const DEDUPE_WINDOW_MS = 3000;

const recentReports = new Map<string, number>();

function shouldReport(key: string): boolean {
  const now = Date.now();
  const last = recentReports.get(key);
  if (last && now - last < DEDUPE_WINDOW_MS) return false;
  recentReports.set(key, now);
  // Trim old entries
  if (recentReports.size > 100) {
    for (const [k, t] of recentReports) {
      if (now - t > DEDUPE_WINDOW_MS * 4) recentReports.delete(k);
    }
  }
  return true;
}

function isReportable(status: number): boolean {
  // Focus on server / edge failures. Skip 4xx client errors — those are
  // expected and would flood the ring buffer.
  return status === 500 || status === 502 || status === 503 || status === 504;
}

type ReportPayload = {
  kind: string;
  status?: number;
  url?: string;
  method?: string;
  requestId?: string;
  message?: string;
  stack?: string;
  userAgent?: string;
  route?: string;
};

function send(report: ReportPayload) {
  const body = JSON.stringify({
    ...report,
    userAgent: report.userAgent ?? navigator.userAgent,
    route: report.route ?? window.location.pathname + window.location.search,
  });
  try {
    // Do not report failures of the reporting endpoint itself.
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
      credentials: "same-origin",
    }).catch(() => {});
  } catch {
    // ignore
  }
}

function urlOf(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  return input.url;
}

function methodOf(input: RequestInfo | URL, init?: RequestInit): string {
  if (init?.method) return init.method.toUpperCase();
  if (input instanceof Request) return input.method.toUpperCase();
  return "GET";
}

let installed = false;

export function installClientErrorReporter() {
  if (installed) return;
  if (typeof window === "undefined") return;
  // Preview/dev only — Vite sets DEV true; production builds strip this branch.
  if (!import.meta.env.DEV) return;
  installed = true;

  // 1. Patch fetch to observe every response.
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = urlOf(input);
    // Never recurse on our own reporter.
    if (typeof url === "string" && url.endsWith(ENDPOINT)) {
      return originalFetch(input, init);
    }
    const method = methodOf(input, init);
    try {
      const res = await originalFetch(input, init);
      if (isReportable(res.status)) {
        const key = `${method} ${url} ${res.status}`;
        if (shouldReport(key)) {
          send({
            kind: "client.fetch.5xx",
            status: res.status,
            url,
            method,
            requestId: res.headers.get("x-request-id") ?? undefined,
          });
        }
      }
      return res;
    } catch (err) {
      // Network-level failure (proxy down, DNS, aborted). Report once.
      const key = `${method} ${url} network`;
      if (shouldReport(key)) {
        const message = err instanceof Error ? err.message : String(err);
        const stack = err instanceof Error ? err.stack : undefined;
        send({
          kind: "client.fetch.network",
          url,
          method,
          message,
          stack,
        });
      }
      throw err;
    }
  };

  // 2. Observe top-level navigation failures via the Performance API.
  // If the initial document response was 5xx, resource entry captures it.
  try {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav && (nav as unknown as { responseStatus?: number }).responseStatus) {
      const status = (nav as unknown as { responseStatus: number }).responseStatus;
      if (isReportable(status)) {
        send({
          kind: "client.navigation.5xx",
          status,
          url: window.location.href,
          method: "GET",
        });
      }
    }
  } catch {
    // Performance API surface differs across browsers; ignore.
  }

  // 3. Catch uncaught runtime errors on the client so they land in the same
  // ring buffer as SSR/handler errors.
  window.addEventListener("error", (event) => {
    const message = event.message || (event.error instanceof Error ? event.error.message : "error");
    const stack = event.error instanceof Error ? event.error.stack : undefined;
    const key = `runtime ${message}`;
    if (!shouldReport(key)) return;
    send({ kind: "client.runtime.error", message, stack });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message = reason instanceof Error ? reason.message : String(reason);
    const stack = reason instanceof Error ? reason.stack : undefined;
    const key = `rejection ${message}`;
    if (!shouldReport(key)) return;
    send({ kind: "client.unhandledrejection", message, stack });
  });
}
