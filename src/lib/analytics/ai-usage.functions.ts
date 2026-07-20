import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const Input = z.object({ days: z.number().int().min(1).max(365).default(30) });

/** AI usage analytics — counts + success rate across universal attempts. */
export const getAiUsage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => Input.parse(v ?? {}))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const sinceIso = new Date(Date.now() - data.days * 86_400_000).toISOString();

    const { data: role } = await supabase
      .from("user_roles").select("role").eq("user_id", userId).maybeSingle();
    const isAdmin = role?.role === "admin";

    let base = supabase
      .from("ai_universal_attempts")
      .select("id, status, kind, created_at", { count: "exact" })
      .gte("created_at", sinceIso);
    if (!isAdmin) base = base.eq("user_id", userId);
    const { data: rows, count } = await base.limit(10000);

    const totals = { total: count ?? 0, submitted: 0, in_progress: 0 } as Record<string, number>;
    const byKind = new Map<string, number>();
    const daily = new Map<string, number>();
    for (let i = data.days - 1; i >= 0; i--) {
      daily.set(new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10), 0);
    }
    for (const r of rows ?? []) {
      const rr = r as { status?: string; kind?: string; created_at: string };
      const status = rr.status ?? "unknown";
      totals[status] = (totals[status] ?? 0) + 1;
      byKind.set(rr.kind ?? "misc", (byKind.get(rr.kind ?? "misc") ?? 0) + 1);
      const d = rr.created_at.slice(0, 10);
      if (daily.has(d)) daily.set(d, (daily.get(d) ?? 0) + 1);
    }
    const success = totals.submitted ?? 0;
    const totalCount = totals.total;
    const success_rate = totalCount ? +((success / totalCount) * 100).toFixed(1) : 0;

    return {
      totals: { requests: totalCount, success, success_rate },
      by_kind: Array.from(byKind.entries()).map(([kind, value]) => ({ kind, value })),
      trend: Array.from(daily.entries()).map(([date, value]) => ({ date, value })),
    };
  });
