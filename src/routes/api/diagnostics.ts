import { createFileRoute } from "@tanstack/react-router";
import { getRecentErrors } from "@/lib/error-capture";

// Module-load timestamp — resets whenever the worker cold-starts.
const COLD_START_AT = Date.now();
const COLD_START_ISO = new Date(COLD_START_AT).toISOString();

type ProbeResult = {
  path: string;
  status: number | null;
  ok: boolean;
  durationMs: number;
  requestId: string | null;
  contentType: string | null;
  error?: string;
};

async function probe(origin: string, path: string, signal: AbortSignal): Promise<ProbeResult> {
  const started = Date.now();
  try {
    const res = await fetch(new URL(path, origin).toString(), {
      method: "GET",
      headers: { "x-diagnostics-probe": "1" },
      signal,
    });
    return {
      path,
      status: res.status,
      ok: res.ok,
      durationMs: Date.now() - started,
      requestId: res.headers.get("x-request-id"),
      contentType: res.headers.get("content-type"),
    };
  } catch (err) {
    return {
      path,
      status: null,
      ok: false,
      durationMs: Date.now() - started,
      requestId: null,
      contentType: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export const Route = createFileRoute("/api/diagnostics")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const now = Date.now();
        const url = new URL(request.url);
        const origin = url.origin;

        const requestedTargets = url.searchParams.get("targets");
        const targets = requestedTargets
          ? requestedTargets.split(",").map((s) => s.trim()).filter(Boolean)
          : ["/", "/api/health"];

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5_000);
        let probes: ProbeResult[] = [];
        try {
          probes = await Promise.all(
            targets.map((t) => probe(origin, t, controller.signal)),
          );
        } finally {
          clearTimeout(timeout);
        }

        const recentErrors = getRecentErrors().slice(-5).map((e) => ({
          requestId: e.requestId,
          at: e.at,
          method: e.method,
          path: e.path,
          name: e.name,
          message: e.message,
          responseStatus: e.response?.status ?? null,
        }));

        const upstreamOk = probes.every((p) => p.ok);
        const summary = {
          status: upstreamOk ? "ok" : "degraded",
          checkedAt: new Date(now).toISOString(),
          requestId: request.headers.get("x-request-id"),
          sandbox: {
            coldStartAt: COLD_START_ISO,
            uptimeMs: now - COLD_START_AT,
            runtime: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
          },
          upstream: {
            origin,
            probes,
            allOk: upstreamOk,
            statusCodes: probes.map((p) => p.status),
          },
          recentErrors,
          hint: upstreamOk
            ? "App responded 2xx/3xx to internal probes. If the edge still shows 'Internal server error', the failure is at the edge/proxy layer — cross-check the x-request-id from the failing response against the server logs."
            : "One or more internal probes failed. Inspect `upstream.probes[].status` and `recentErrors` for the failing path.",
        };

        return new Response(JSON.stringify(summary, null, 2), {
          status: 200,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
            "x-cold-start-at": COLD_START_ISO,
          },
        });
      },
    },
  },
});
