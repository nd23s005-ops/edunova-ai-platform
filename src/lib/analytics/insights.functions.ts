import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callGatewayJSON, safeParse } from "./analytics.server";

const InsightsInput = z.object({
  scope: z.enum(["user", "platform", "course"]).default("user"),
  scope_id: z.string().uuid().optional(),
  force: z.boolean().default(false),
});

type InsightPayload = {
  insights: Array<{
    title: string;
    body: string;
    recommendations: string[];
    confidence?: number;
    kind?: string;
  }>;
};

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h

/** Generate (or return cached) narrative AI insights for the given scope. */
export const getInsights = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => InsightsInput.parse(v ?? {}))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const scopeId = data.scope === "user" ? userId : data.scope_id ?? null;

    if (data.scope !== "user") {
      const { data: role } = await supabase
        .from("user_roles").select("role").eq("user_id", userId).maybeSingle();
      if (role?.role !== "admin") throw new Error("Forbidden");
    }

    // Cached lookup
    if (!data.force) {
      let q = supabase
        .from("ai_insights")
        .select("*")
        .eq("scope_type", data.scope)
        .order("generated_at", { ascending: false })
        .limit(6);
      q = scopeId ? q.eq("scope_id", scopeId) : q.is("scope_id", null);
      const { data: cached } = await q;
      if (cached && cached.length > 0) {
        const fresh = cached.filter(
          (r) => Date.now() - new Date((r as { generated_at: string }).generated_at).getTime() < CACHE_TTL_MS,
        );
        if (fresh.length >= 3) return { insights: fresh, cached: true };
      }
    }

    // Build context snapshot
    let snapshot: Record<string, unknown> = {};
    if (data.scope === "user") {
      const [{ count: enrolls }, { count: completed }, { data: recent }] = await Promise.all([
        supabase.from("course_enrollments").select("id", { count: "exact", head: true }).eq("user_id", userId),
        supabase.from("lesson_progress").select("id", { count: "exact", head: true }).eq("user_id", userId).not("completed_at", "is", null),
        supabase
          .from("ai_universal_attempts")
          .select("kind, percentage, weak_topics, submitted_at")
          .eq("user_id", userId)
          .not("submitted_at", "is", null)
          .order("submitted_at", { ascending: false })
          .limit(10),
      ]);
      snapshot = { enrollments: enrolls ?? 0, lessons_completed: completed ?? 0, recent_attempts: recent ?? [] };
    } else if (data.scope === "platform") {
      const [{ count: users }, { count: courses }, { count: enrollments }] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("courses").select("id", { count: "exact", head: true }),
        supabase.from("course_enrollments").select("id", { count: "exact", head: true }),
      ]);
      snapshot = { users: users ?? 0, courses: courses ?? 0, enrollments: enrollments ?? 0 };
    } else if (data.scope === "course" && scopeId) {
      const { count: enrolls } = await supabase
        .from("course_enrollments").select("id", { count: "exact", head: true }).eq("course_id", scopeId);
      const { data: c } = await supabase.from("courses").select("title, description").eq("id", scopeId).maybeSingle();
      snapshot = { course: c, enrollments: enrolls ?? 0 };
    }

    const system =
      "You are an analytics assistant for an EdTech platform. Produce 3-5 concise, actionable insights based on the JSON snapshot. Return JSON: { insights: [{ title, body, recommendations: [string], confidence: 0-1, kind }] }. Keep body <= 2 sentences. Kind is one of: learning, at-risk, trend, course-improvement, career.";
    const user = JSON.stringify({ scope: data.scope, snapshot });
    const raw = await callGatewayJSON(system, user);
    const parsed = safeParse<InsightPayload>(raw) ?? { insights: [] };

    const rowsToInsert = parsed.insights.slice(0, 6).map((ins) => ({
      scope_type: data.scope,
      scope_id: scopeId,
      kind: ins.kind ?? "learning",
      title: ins.title.slice(0, 200),
      body: ins.body.slice(0, 1000),
      recommendations: ins.recommendations as never,
      confidence: ins.confidence ?? null,
      expires_at: new Date(Date.now() + CACHE_TTL_MS).toISOString(),
    }));

    if (rowsToInsert.length > 0) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("ai_insights").insert(rowsToInsert);
    }

    return { insights: rowsToInsert, cached: false };
  });
