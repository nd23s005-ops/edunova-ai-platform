import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bug, RefreshCw, Filter, Save, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader, StatCard } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/dashboard/admin/debug-errors")({
  component: DebugErrorsPage,
});

type CapturedError = {
  id: string;
  at: number;
  name: string;
  message: string;
  stack?: string;
  requestId?: string;
  method?: string;
  path?: string;
  response?: { status: number };
};

type ApiResponse = { count: number; errors: CapturedError[] };
type RetentionConfig = { max_age_hours: number; max_rows: number; updated_at?: string };

function DebugErrorsPage() {
  const qc = useQueryClient();
  const [routeFilter, setRouteFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const errorsQuery = useQuery({
    queryKey: ["admin", "debug-errors"],
    queryFn: async () => {
      const res = await fetch("/api/debug/errors?limit=200", { credentials: "include" });
      if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
      return (await res.json()) as ApiResponse;
    },
    refetchInterval: 15_000,
  });

  const configQuery = useQuery({
    queryKey: ["admin", "debug-errors", "retention"],
    queryFn: async (): Promise<RetentionConfig | null> => {
      const { data, error } = await supabase
        .from("debug_error_retention_config")
        .select("max_age_hours, max_rows, updated_at")
        .eq("id", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const [ageInput, setAgeInput] = useState<string>("");
  const [rowsInput, setRowsInput] = useState<string>("");

  const updateConfig = useMutation({
    mutationFn: async () => {
      const age = Number(ageInput || configQuery.data?.max_age_hours);
      const rows = Number(rowsInput || configQuery.data?.max_rows);
      if (!Number.isFinite(age) || age <= 0) throw new Error("Age must be positive");
      if (!Number.isFinite(rows) || rows <= 0) throw new Error("Row cap must be positive");
      const { error } = await supabase
        .from("debug_error_retention_config")
        .update({ max_age_hours: age, max_rows: rows })
        .eq("id", true);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Retention policy updated");
      qc.invalidateQueries({ queryKey: ["admin", "debug-errors", "retention"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const errors = errorsQuery.data?.errors ?? [];
  const filtered = useMemo(() => {
    const r = routeFilter.trim().toLowerCase();
    const s = statusFilter.trim();
    return errors.filter((e) => {
      if (r && !(e.path ?? "").toLowerCase().includes(r)) return false;
      if (s && String(e.response?.status ?? "") !== s) return false;
      return true;
    });
  }, [errors, routeFilter, statusFilter]);

  const selected = filtered.find((e) => e.id === selectedId) ?? filtered[0];

  const statusCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of errors) {
      const key = String(e.response?.status ?? "—");
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [errors]);

  return (
    <RoleGate allow={["admin"]}>
      <DashboardHeader
        title="Debug errors"
        description="Recent captured server & client errors. Persisted across preview restarts."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Captured" value={String(errors.length)} icon={<Bug className="h-4 w-4" />} />
        <StatCard
          label="Retention (age)"
          value={configQuery.data ? `${configQuery.data.max_age_hours}h` : "—"}
          icon={<Filter className="h-4 w-4" />}
        />
        <StatCard
          label="Retention (rows)"
          value={configQuery.data ? String(configQuery.data.max_rows) : "—"}
          icon={<Filter className="h-4 w-4" />}
        />
      </div>

      <section className="mt-6 rounded-xl border bg-card p-4">
        <h2 className="text-sm font-semibold">Retention policy</h2>
        <p className="text-xs text-muted-foreground">
          Cleanup runs hourly. Rows older than max age or beyond max rows are removed.
        </p>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <div className="grid gap-1">
            <Label htmlFor="age" className="text-xs">Max age (hours)</Label>
            <Input
              id="age"
              type="number"
              min={1}
              className="w-32"
              placeholder={String(configQuery.data?.max_age_hours ?? 168)}
              value={ageInput}
              onChange={(e) => setAgeInput(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="rows" className="text-xs">Max rows</Label>
            <Input
              id="rows"
              type="number"
              min={1}
              className="w-32"
              placeholder={String(configQuery.data?.max_rows ?? 1000)}
              value={rowsInput}
              onChange={(e) => setRowsInput(e.target.value)}
            />
          </div>
          <Button
            onClick={() => updateConfig.mutate()}
            disabled={updateConfig.isPending}
            size="sm"
          >
            {updateConfig.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save policy
          </Button>
        </div>
      </section>

      <section className="mt-6 rounded-xl border bg-card p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="grid gap-1 flex-1 min-w-[200px]">
            <Label htmlFor="route" className="text-xs">Route contains</Label>
            <Input
              id="route"
              placeholder="/api/…"
              value={routeFilter}
              onChange={(e) => setRouteFilter(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="status" className="text-xs">Status</Label>
            <select
              id="status"
              className="h-9 rounded-md border bg-background px-2 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              {statusCounts.map(([code, n]) => (
                <option key={code} value={code === "—" ? "" : code}>
                  {code} ({n})
                </option>
              ))}
            </select>
          </div>
          <Button variant="outline" size="sm" onClick={() => errorsQuery.refetch()}>
            <RefreshCw className={cn("mr-2 h-4 w-4", errorsQuery.isFetching && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl border bg-card">
          <div className="border-b px-3 py-2 text-xs text-muted-foreground">
            {filtered.length} of {errors.length} shown
          </div>
          <ul className="divide-y max-h-[560px] overflow-auto">
            {errorsQuery.isLoading && (
              <li className="p-4 text-sm text-muted-foreground">Loading…</li>
            )}
            {!errorsQuery.isLoading && filtered.length === 0 && (
              <li className="p-4 text-sm text-muted-foreground">No errors match your filters.</li>
            )}
            {filtered.map((e) => {
              const isActive = selected?.id === e.id;
              const status = e.response?.status;
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(e.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 hover:bg-muted/60 transition",
                      isActive && "bg-muted",
                    )}
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={cn(
                          "inline-flex items-center rounded px-1.5 py-0.5 font-mono",
                          status && status >= 500 ? "bg-destructive/15 text-destructive" :
                          status && status >= 400 ? "bg-amber-500/15 text-amber-600" :
                          "bg-muted text-muted-foreground",
                        )}
                      >
                        {status ?? "—"}
                      </span>
                      <span className="font-mono text-muted-foreground truncate">
                        {e.method ?? ""} {e.path ?? "(no route)"}
                      </span>
                    </div>
                    <div className="mt-1 line-clamp-2 text-sm">{e.message}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {new Date(e.at).toLocaleString()} · {e.name}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-xl border bg-card p-4">
          {selected ? (
            <div className="space-y-3">
              <div>
                <div className="text-xs text-muted-foreground">{selected.name}</div>
                <div className="text-sm font-medium">{selected.message}</div>
              </div>
              <dl className="grid grid-cols-2 gap-2 text-xs">
                <dt className="text-muted-foreground">Route</dt>
                <dd className="font-mono truncate">{selected.method ?? ""} {selected.path ?? "—"}</dd>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="font-mono">{selected.response?.status ?? "—"}</dd>
                <dt className="text-muted-foreground">Request ID</dt>
                <dd className="font-mono truncate">{selected.requestId ?? "—"}</dd>
                <dt className="text-muted-foreground">Captured</dt>
                <dd>{new Date(selected.at).toLocaleString()}</dd>
              </dl>
              {selected.stack && (
                <pre className="max-h-[360px] overflow-auto rounded bg-muted p-3 text-[11px] leading-relaxed font-mono whitespace-pre-wrap">
                  {selected.stack}
                </pre>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Select an error to inspect its details.</p>
          )}
        </div>
      </div>
    </RoleGate>
  );
}
