import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getLeaderboard = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { period: "daily" | "weekly" | "monthly" | "all" } | undefined) => i ?? { period: "all" as const })
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    let since: string | null = null;
    const now = new Date();
    if (data.period === "daily") since = new Date(now.getTime() - 24 * 3600 * 1000).toISOString();
    else if (data.period === "weekly") since = new Date(now.getTime() - 7 * 24 * 3600 * 1000).toISOString();
    else if (data.period === "monthly") since = new Date(now.getTime() - 30 * 24 * 3600 * 1000).toISOString();
    let q = supabase.from("community_xp_events").select("user_id,amount").limit(5000);
    if (since) q = q.gte("created_at", since);
    const { data: rows } = await q;
    const totals = new Map<string, number>();
    for (const r of rows ?? []) totals.set(r.user_id, (totals.get(r.user_id) ?? 0) + (r.amount ?? 0));
    const ranked = Array.from(totals.entries()).map(([user_id, xp]) => ({ user_id, xp })).sort((a, b) => b.xp - a.xp).slice(0, 50);
    if (!ranked.length) return [];
    const ids = ranked.map((r) => r.user_id);
    const { data: profiles } = await supabase.from("profiles").select("id,full_name,avatar_url").in("id", ids);
    const map = new Map((profiles ?? []).map((p) => [p.id, p]));
    return ranked.map((r, i) => ({ rank: i + 1, ...r, profile: map.get(r.user_id) ?? null }));
  });

export const getMyXpSummary = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: xp }, { data: badges }] = await Promise.all([
      supabase.from("community_xp_events").select("amount,reason,created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(200),
      supabase.from("community_badges_earned").select("*").eq("user_id", userId).order("awarded_at", { ascending: false }),
    ]);
    const total = (xp ?? []).reduce((n, r) => n + (r.amount ?? 0), 0);
    return { total_xp: total, recent: xp ?? [], badges: badges ?? [] };
  });
