import { createFileRoute } from "@tanstack/react-router";
import { getRecentErrors } from "@/lib/error-capture";

// Set when this worker instance first loaded — resets on cold-start.
const BOOT_AT = Date.now();
const BOOT_ISO = new Date(BOOT_AT).toISOString();

type CheckStatus = "pass" | "fail";

type Check = {
  name: string;
  status: CheckStatus;
  durationMs: number;
  detail?: string;
  httpStatus?: number;
  requestId?: string | null;
};

async function timed<T>(
  name: string,
  fn: () => Promise<{ status: CheckStatus; detail?: string; httpStatus?: number; requestId?: string | null }>,
): Promise<Check> {
  const started = Date.now();
  try {
    const result = await fn();
    return { name, durationMs: Date.now() - started, ...result };
  } catch (err) {
    return {
      name,
      status: "fail",
      durationMs: Date.now() - started,
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}

export const Route = createFileRoute("/api/upstream-status")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const origin = url.origin;
        const now = Date.now();

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5_000);

        const checks: Check[] = [];

        // 1. SSR handler path — can the server render a real app route?
        checks.push(
          await timed("ssr.handler", async () => {
            const res = await fetch(new URL("/", origin).toString(), {
              method: "GET",
              headers: { "x-diagnostics-probe": "upstream-status", accept: "text/html" },
              signal: controller.signal,
            });
            const ok = res.status >= 200 && res.status < 400;
            const ct = res.headers.get("content-type") ?? "";
            const looksHtml = ct.includes("text/html");
            return {
              status: ok && looksHtml ? "pass" : "fail",
              detail: looksHtml ? undefined : `unexpected content-type: ${ct || "<none>"}`,
              httpStatus: res.status,
              requestId: res.headers.get("x-request-id"),
            };
          }),
        );

        // 2. Server-route handler path — can a JSON API route respond?
        checks.push(
          await timed("api.handler", async () => {
            const res = await fetch(new URL("/api/health", origin).toString(), {
              method: "GET",
              headers: { "x-diagnostics-probe": "upstream-status" },
              signal: controller.signal,
            });
            return {
              status: res.ok ? "pass" : "fail",
              httpStatus: res.status,
              requestId: res.headers.get("x-request-id"),
            };
          }),
        );

        // 3. Server-function transport — the /_serverFn/ path must be reachable
        //    (405/404 is acceptable; a 5xx or a fetch throw is not).
        checks.push(
          await timed("serverfn.transport", async () => {
            const res = await fetch(new URL("/_serverFn/__probe", origin).toString(), {
              method: "GET",
              headers: { "x-diagnostics-probe": "upstream-status" },
              signal: controller.signal,
            });
            return {
              status: res.status < 500 ? "pass" : "fail",
              httpStatus: res.status,
              detail: res.status >= 500 ? "server function transport returned 5xx" : undefined,
              requestId: res.headers.get("x-request-id"),
            };
          }),
        );

        clearTimeout(timeout);

        const recent = getRecentErrors();
        const errorWindowMs = 5 * 60_000;
        const errorsLastFiveMinutes = recent.filter((e) => now - e.at <= errorWindowMs);
        const lastError = recent.length > 0 ? recent[recent.length - 1] : undefined;

        const allPass = checks.every((c) => c.status === "pass");
        const overall: "ok" | "degraded" | "down" =
          allPass && errorsLastFiveMinutes.length === 0
            ? "ok"
            : checks.some((c) => c.status === "pass")
              ? "degraded"
              : "down";

        const body = {
          status: overall,
          checkedAt: new Date(now).toISOString(),
          requestId: request.headers.get("x-request-id"),
          sandbox: {
            bootAt: BOOT_ISO,
            uptimeMs: now - BOOT_AT,
            runtime: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
          },
          checks,
          errors: {
            totalCaptured: recent.length,
            lastFiveMinutes: errorsLastFiveMinutes.length,
            last: lastError
              ? {
                  id: lastError.id,
                  at: new Date(lastError.at).toISOString(),
                  name: lastError.name,
                  message: lastError.message,
                  method: lastError.method,
                  path: lastError.path,
                  requestId: lastError.requestId,
                  responseStatus: lastError.response?.status,
                }
              : null,
          },
          hint:
            overall === "ok"
              ? "SSR, API, and server-function transports are all responding. If the edge preview still shows 'Internal server error', the failure is at the proxy layer — cross-check x-request-id against server logs."
              : "One or more upstream checks failed. See `checks[].detail` and `errors.last` for the failing path.",
        };

        return new Response(JSON.stringify(body, null, 2), {
          status: 200,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
            "x-boot-at": BOOT_ISO,
          },
        });
      },
    },
  },
});
