import { createFileRoute } from "@tanstack/react-router";

const bootTime = Date.now();

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const requestId =
          request.headers.get("x-request-id") ||
          (globalThis.crypto?.randomUUID?.() ?? `req_${Date.now().toString(36)}`);
        const startedAt = Date.now();

        let dbOk: boolean | null = null;
        let dbLatencyMs: number | null = null;
        let dbError: string | null = null;

        try {
          const url = process.env.SUPABASE_URL;
          const key = process.env.SUPABASE_PUBLISHABLE_KEY;
          if (url && key) {
            const t0 = Date.now();
            const res = await fetch(`${url}/auth/v1/health`, {
              headers: { apikey: key },
              signal: AbortSignal.timeout(3000),
            });
            dbLatencyMs = Date.now() - t0;
            dbOk = res.ok;
            if (!res.ok) dbError = `status ${res.status}`;
          }
        } catch (e) {
          dbOk = false;
          dbError = e instanceof Error ? e.message : String(e);
        }

        const body = {
          status: dbOk === false ? "degraded" : "ok",
          requestId,
          timestamp: new Date().toISOString(),
          uptimeMs: Date.now() - bootTime,
          responseTimeMs: Date.now() - startedAt,
          runtime: {
            node: typeof process !== "undefined" ? process.version ?? null : null,
            hasSupabaseEnv: Boolean(
              process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY,
            ),
          },
          checks: {
            edge: { ok: true },
            supabase: { ok: dbOk, latencyMs: dbLatencyMs, error: dbError },
          },
        };

        return new Response(JSON.stringify(body, null, 2), {
          status: dbOk === false ? 503 : 200,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
            "x-request-id": requestId,
          },
        });
      },
    },
  },
});
