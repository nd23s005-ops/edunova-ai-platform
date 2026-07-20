import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callGatewayJSON, safeParse } from "./analytics.server";

const Input = z.object({ force: z.boolean().default(false) });

type PredPayload = {
  predictions: Array<{
    kind: "completion_probability" | "dropout_risk" | "placement_readiness" | "next_course" | "certification_readiness";
    value?: number;
    label?: string;
    confidence?: number;
    rationale?: string;
  }>;
};

const TTL_MS = 12 * 60 * 60 * 1000;

/** Compute (or cache) predictions for the current user. */
export const getPredictions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => Input.parse(v ?? {}))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    if (!data.force) {
      const { data: cached } = await supabase
        .from("ai_predictions")
        .select("*")
        .eq("subject_type", "user")
        .eq("subject_id", userId)
        .order("generated_at", { ascending: false })
        .limit(8);
      const fresh = (cached ?? []).filter(
        (r) => Date.now() - new Date((r as { generated_at: string }).generated_at).getTime() < TTL_MS,
      );
      if (fresh.length >= 3) return { predictions: fresh, cached: true };
    }

    const [{ count: enrolls }, { count: completed }, { data: attempts }] = await Promise.all([
      supabase.from("course_enrollments").select("id", { count: "exact", head: true }).eq("user_id", userId),
      supabase.from("lesson_progress").select("id", { count: "exact", head: true }).eq("user_id", userId).not("completed_at", "is", null),
      supabase.from("ai_universal_attempts")
        .select("percentage, kind, submitted_at")
        .eq("user_id", userId)
        .not("submitted_at", "is", null)
        .order("submitted_at", { ascending: false })
        .limit(20),
    ]);

    const attemptsList = (attempts ?? []) as { percentage: number | null; kind: string }[];
    const avgPct = attemptsList.length
      ? attemptsList.reduce((a, r) => a + (r.percentage ?? 0), 0) / attemptsList.length
      : 0;

    const system =
      "You forecast learning outcomes for an EdTech user. Return JSON: { predictions: [{ kind, value (0-100), label, confidence (0-1), rationale }] }. Include: completion_probability, dropout_risk, placement_readiness, next_course, certification_readiness. Keep rationale <= 1 sentence.";
    const user = JSON.stringify({ enrollments: enrolls ?? 0, lessons_completed: completed ?? 0, recent_average_pct: +avgPct.toFixed(1), attempts: attemptsList.slice(0, 8) });
    const raw = await callGatewayJSON(system, user);
    const parsed = safeParse<PredPayload>(raw) ?? { predictions: [] };

    const rows = parsed.predictions.slice(0, 8).map((p) => ({
      subject_type: "user" as const,
      subject_id: userId,
      kind: p.kind,
      value: p.value ?? null,
      label: p.label ?? null,
      confidence: p.confidence ?? null,
      features: { rationale: p.rationale ?? null } as never,
      expires_at: new Date(Date.now() + TTL_MS).toISOString(),
    }));

    if (rows.length > 0) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("ai_predictions").insert(rows);
    }

    return { predictions: rows, cached: false };
  });
