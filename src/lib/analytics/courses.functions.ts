import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const Input = z.object({ days: z.number().int().min(7).max(365).default(30), limit: z.number().int().min(1).max(50).default(10) });

/** Course analytics: top enrolled, completion rate, drop-off. */
export const getCourseAnalytics = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => Input.parse(v ?? {}))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const sinceIso = new Date(Date.now() - data.days * 86_400_000).toISOString();

    const { data: role } = await supabase
      .from("user_roles").select("role").eq("user_id", userId).maybeSingle();
    const isAdmin = role?.role === "admin";
    if (!isAdmin) throw new Error("Forbidden");

    const { data: enrolls } = await supabase
      .from("course_enrollments")
      .select("course_id, completed_at")
      .gte("enrolled_at", sinceIso)
      .limit(20000);

    const byCourse = new Map<string, { enrolls: number; completed: number }>();
    for (const row of enrolls ?? []) {
      const r = row as { course_id: string; completed_at: string | null };
      const b = byCourse.get(r.course_id) ?? { enrolls: 0, completed: 0 };
      b.enrolls++;
      if (r.completed_at) b.completed++;
      byCourse.set(r.course_id, b);
    }

    const topIds = Array.from(byCourse.entries())
      .sort((a, b) => b[1].enrolls - a[1].enrolls)
      .slice(0, data.limit)
      .map(([id]) => id);

    const { data: courses } = topIds.length
      ? await supabase.from("courses").select("id, title").in("id", topIds)
      : { data: [] as { id: string; title: string }[] };

    const rows = (courses ?? []).map((c) => {
      const b = byCourse.get(c.id) ?? { enrolls: 0, completed: 0 };
      return {
        id: c.id,
        title: c.title,
        enrollments: b.enrolls,
        completions: b.completed,
        completion_rate: b.enrolls ? +((b.completed / b.enrolls) * 100).toFixed(1) : 0,
      };
    });

    rows.sort((a, b) => b.enrollments - a.enrollments);
    return { rows };
  });
