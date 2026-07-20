import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const Input = z.object({ days: z.number().int().min(7).max(365).default(30) });

/** Assessment analytics across universal + subject + weekly + mock attempts. */
export const getAssessmentAnalytics = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => Input.parse(v ?? {}))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const sinceIso = new Date(Date.now() - data.days * 86_400_000).toISOString();

    const { data: role } = await supabase
      .from("user_roles").select("role").eq("user_id", userId).maybeSingle();
    const isAdmin = role?.role === "admin";

    const applyScope = <B extends { eq: (c: string, v: unknown) => B }>(b: B): B =>
      isAdmin ? b : b.eq("user_id", userId);

    const [universal, quiz, weekly, mock, subject] = await Promise.all([
      applyScope(supabase.from("ai_universal_attempts").select("percentage, submitted_at").gte("submitted_at", sinceIso).not("submitted_at", "is", null).limit(5000) as never),
      applyScope(supabase.from("quiz_attempts").select("score, max_score, submitted_at").gte("submitted_at", sinceIso).limit(5000) as never),
      applyScope(supabase.from("ai_weekly_attempts").select("score, max_score, submitted_at").gte("submitted_at", sinceIso).limit(5000) as never),
      applyScope(supabase.from("ai_mock_test_attempts").select("score, total, submitted_at").gte("submitted_at", sinceIso).not("submitted_at", "is", null).limit(5000) as never),
      applyScope(supabase.from("subject_quiz_attempts").select("score, total, submitted_at").gte("submitted_at", sinceIso).not("submitted_at", "is", null).limit(5000) as never),
    ]);

    type Row = { pct: number; submitted_at: string };
    const rows: Row[] = [];
    const pushPct = (arr: unknown, extract: (r: Record<string, unknown>) => number | null) => {
      for (const raw of ((arr as { data?: unknown[] })?.data ?? []) as Record<string, unknown>[]) {
        const p = extract(raw);
        if (p !== null && !Number.isNaN(p)) rows.push({ pct: p, submitted_at: String(raw.submitted_at) });
      }
    };
    pushPct(universal, (r) => (typeof r.percentage === "number" ? r.percentage : null));
    pushPct(quiz, (r) => {
      const s = r.score as number, m = r.max_score as number;
      return m ? (s / m) * 100 : null;
    });
    pushPct(weekly, (r) => {
      const s = r.score as number, m = r.max_score as number;
      return m ? (s / m) * 100 : null;
    });
    pushPct(mock, (r) => {
      const s = r.score as number, t = r.total as number;
      return t ? (s / t) * 100 : null;
    });
    pushPct(subject, (r) => {
      const s = r.score as number, t = r.total as number;
      return t ? (s / t) * 100 : null;
    });

    const total = rows.length;
    const avg = total ? +(rows.reduce((a, r) => a + r.pct, 0) / total).toFixed(1) : 0;
    const high = total ? +Math.max(...rows.map((r) => r.pct)).toFixed(1) : 0;
    const low = total ? +Math.min(...rows.map((r) => r.pct)).toFixed(1) : 0;
    const passed = rows.filter((r) => r.pct >= 40).length;
    const failed = total - passed;

    // Daily average trend
    const buckets = new Map<string, { sum: number; n: number }>();
    for (let i = data.days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10);
      buckets.set(d, { sum: 0, n: 0 });
    }
    for (const r of rows) {
      const d = r.submitted_at.slice(0, 10);
      const b = buckets.get(d);
      if (b) { b.sum += r.pct; b.n++; }
    }
    const trend = Array.from(buckets.entries()).map(([date, b]) => ({
      date,
      value: b.n ? +(b.sum / b.n).toFixed(1) : 0,
    }));

    return {
      totals: { attempts: total, avg, high, low, pass_rate: total ? +((passed / total) * 100).toFixed(1) : 0, fail_rate: total ? +((failed / total) * 100).toFixed(1) : 0 },
      trend,
    };
  });
