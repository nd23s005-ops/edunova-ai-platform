import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callGatewayJSON, safeParse } from "@/lib/ai/engine/ai.server";

type Recommendation = {
  resourceId: string | null;
  title: string;
  reason: string;
  kind: string | null;
  courseTitle: string | null;
};

export const recommendNextResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Recommendation | null> => {
    const { supabase, userId } = context;

    // Pull all resources across enrolled courses + completion state.
    const { data: enroll } = await supabase
      .from("course_enrollments")
      .select("course_id, courses:course_id (id, title)")
      .eq("user_id", userId);

    const courses = (enroll ?? [])
      .map((r) => (r as { courses: { id: string; title: string } | null }).courses)
      .filter((c): c is { id: string; title: string } => !!c);
    if (courses.length === 0) return null;

    const ids = courses.map((c) => c.id);
    const [{ data: resources }, { data: done }] = await Promise.all([
      supabase
        .from("resources")
        .select("id, kind, title, description, course_id, order_index")
        .in("course_id", ids)
        .order("order_index"),
      supabase.from("resource_completions").select("resource_id").eq("user_id", userId),
    ]);

    const completedSet = new Set((done ?? []).map((d) => d.resource_id as string));
    const titleById = new Map(courses.map((c) => [c.id, c.title] as const));
    const pending = (resources ?? [])
      .filter((r) => !completedSet.has(r.id as string))
      .slice(0, 40)
      .map((r) => ({
        id: r.id as string,
        kind: r.kind as string,
        title: r.title as string,
        description: (r.description as string | null) ?? "",
        course: titleById.get(r.course_id as string) ?? "",
      }));

    if (pending.length === 0) return null;

    // Deterministic fallback: first uncompleted.
    const fallback = pending[0];

    try {
      const system =
        "You are a learning coach. Given a learner's remaining study resources and what they've completed, pick the SINGLE best next resource to study now. Return strict JSON only.";
      const user = JSON.stringify({
        completed_count: completedSet.size,
        remaining: pending,
        instructions:
          "Choose one resource id from `remaining` that best builds on what they've completed. Prefer notes/cheatsheet before question_bank. Respond as {\"resource_id\":\"...\",\"reason\":\"one short sentence\"}.",
      });
      const raw = await callGatewayJSON(system, user);
      const parsed = safeParse<{ resource_id?: string; reason?: string }>(raw);
      const picked = pending.find((p) => p.id === parsed?.resource_id) ?? fallback;
      return {
        resourceId: picked.id,
        title: picked.title,
        kind: picked.kind,
        courseTitle: picked.course,
        reason:
          (parsed?.reason && parsed.reason.slice(0, 200)) ||
          `Continue with ${picked.course} — this builds on what you've studied so far.`,
      };
    } catch {
      return {
        resourceId: fallback.id,
        title: fallback.title,
        kind: fallback.kind,
        courseTitle: fallback.course,
        reason: `Pick up where you left off in ${fallback.course}.`,
      };
    }
  });
