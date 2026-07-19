import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  requestId: string;
  timestamp: string;
  uptimeMs: number;
  responseTimeMs: number;
  runtime: { node: string | null; hasSupabaseEnv: boolean };
  checks: {
    edge: { ok: boolean };
    supabase: { ok: boolean | null; latencyMs: number | null; error: string | null };
  };
};

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [
      { title: "Health · Nova Learn AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: HealthPage,
});

function HealthPage() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [edgeLatencyMs, setEdgeLatencyMs] = useState<number | null>(null);
  const [edgeStatus, setEdgeStatus] = useState<number | null>(null);
  const [edgeRequestId, setEdgeRequestId] = useState<string | null>(null);

  const runCheck = async () => {
    setLoading(true);
    setError(null);
    const t0 = performance.now();
    try {
      const res = await fetch("/api/health", {
        headers: { "x-request-id": `preview_${Date.now().toString(36)}` },
        cache: "no-store",
      });
      setEdgeLatencyMs(Math.round(performance.now() - t0));
      setEdgeStatus(res.status);
      setEdgeRequestId(res.headers.get("x-request-id"));
      const json = (await res.json()) as HealthResponse;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    void runCheck();
  }, []);

  const overallOk = !error && edgeStatus === 200 && data?.status === "ok";

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Preview health</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Runs a live check against the sandbox edge and backend connectivity.
      </p>

      <div className="mt-6 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full ${
                loading
                  ? "bg-yellow-500"
                  : overallOk
                    ? "bg-green-500"
                    : "bg-red-500"
              }`}
              aria-hidden
            />
            <span className="font-medium">
              {loading ? "Checking…" : overallOk ? "All systems normal" : "Degraded"}
            </span>
          </div>
          <button
            type="button"
            onClick={runCheck}
            disabled={loading}
            className="rounded-md border px-3 py-1 text-sm hover:bg-accent disabled:opacity-50"
          >
            Re-check
          </button>
        </div>

        {error && (
          <p className="mt-3 rounded bg-red-500/10 p-3 text-sm text-red-600">
            Edge unreachable: {error}
          </p>
        )}

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Edge status</dt>
          <dd className="font-mono">{edgeStatus ?? "—"}</dd>
          <dt className="text-muted-foreground">Edge latency</dt>
          <dd className="font-mono">{edgeLatencyMs != null ? `${edgeLatencyMs} ms` : "—"}</dd>
          <dt className="text-muted-foreground">Request ID</dt>
          <dd className="truncate font-mono">{edgeRequestId ?? "—"}</dd>
          <dt className="text-muted-foreground">Backend</dt>
          <dd className="font-mono">
            {data
              ? data.checks.supabase.ok === null
                ? "not configured"
                : data.checks.supabase.ok
                  ? `ok (${data.checks.supabase.latencyMs ?? 0} ms)`
                  : `fail — ${data.checks.supabase.error ?? "unknown"}`
              : "—"}
          </dd>
          <dt className="text-muted-foreground">Server response</dt>
          <dd className="font-mono">{data ? `${data.responseTimeMs} ms` : "—"}</dd>
          <dt className="text-muted-foreground">Uptime</dt>
          <dd className="font-mono">
            {data ? `${Math.round(data.uptimeMs / 1000)}s` : "—"}
          </dd>
          <dt className="text-muted-foreground">Last checked</dt>
          <dd className="font-mono">{lastChecked ? lastChecked.toLocaleTimeString() : "—"}</dd>
        </dl>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Raw endpoint:{" "}
        <a href="/api/health" className="underline">
          /api/health
        </a>{" "}
        — returns JSON with a correlation <code>requestId</code>. Every server
        request response now includes an <code>x-request-id</code> header; grep
        server logs for it to locate a specific 502.
      </p>
    </div>
  );
}
