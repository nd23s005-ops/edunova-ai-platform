import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const RangeInput = z.object({ days: z.number().int().min(1).max(365).default(30) });

type Kpi = { key: string; label: string; value: number; delta?: number };
type Series = { date: string; value: number }[];

/**
 * Role-adaptive overview KPIs.
 * - Admin (super or otherwise): platform-wide totals.
 * - Everyone else: personal snapshot.
 */
export const getOverview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => RangeInput.parse(v ?? {}))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const sinceIso = new Date(Date.now() - data.days * 86_400_000).toISOString();

    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role, admin_level")
      .eq("user_id", userId)
      .maybeSingle();
    const isAdmin = roleRow?.role === "admin";

    if (isAdmin) {
      const [
        { count: totalUsers },
        { count: totalCourses },
        { count: totalEnrollments },
        { count: recentUsers },
        { count: aiAttempts },
        { count: lessonsCompleted },
      ] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("courses").select("id", { count: "exact", head: true }),
        supabase.from("course_enrollments").select("id", { count: "exact", head: true }),
        supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .gte("created_at", sinceIso),
        supabase
          .from("ai_universal_attempts")
          .select("id", { count: "exact", head: true })
          .gte("created_at", sinceIso),
        supabase
          .from("lesson_progress")
          .select("id", { count: "exact", head: true })
          .eq("completed", true)
          .gte("updated_at", sinceIso),
      ]);

      const kpis: Kpi[] = [
        { key: "users", label: "Total Users", value: totalUsers ?? 0 },
        { key: "new_users", label: `New Users (${data.days}d)`, value: recentUsers ?? 0 },
        { key: "courses", label: "Courses", value: totalCourses ?? 0 },
        { key: "enrollments", label: "Enrollments", value: totalEnrollments ?? 0 },
        { key: "ai_requests", label: `AI Attempts (${data.days}d)`, value: aiAttempts ?? 0 },
        { key: "lessons_completed", label: `Lessons Completed (${data.days}d)`, value: lessonsCompleted ?? 0 },
      ];

      // Simple daily trend of new enrollments
      const { data: enrolls } = await supabase
        .from("course_enrollments")
        .select("enrolled_at")
        .gte("enrolled_at", sinceIso)
        .order("enrolled_at", { ascending: true })
        .limit(5000);
      const trend = bucketByDay(
        (enrolls ?? []).map((r) => (r as { enrolled_at: string }).enrolled_at),
        data.days,
      );

      return { scope: "admin" as const, kpis, trend };
    }

    // Personal snapshot
    const [
      { count: myEnrollments },
      { count: myCompleted },
      { count: myAttempts },
      { count: myEvents },
    ] = await Promise.all([
      supabase
        .from("course_enrollments")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId),
      supabase
        .from("lesson_progress")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("completed", true),
      supabase
        .from("ai_universal_attempts")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .gte("created_at", sinceIso),
      supabase
        .from("analytics_events")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .gte("created_at", sinceIso),
    ]);

    const kpis: Kpi[] = [
      { key: "enrollments", label: "Courses Enrolled", value: myEnrollments ?? 0 },
      { key: "lessons_completed", label: "Lessons Completed", value: myCompleted ?? 0 },
      { key: "ai_attempts", label: `AI Attempts (${data.days}d)`, value: myAttempts ?? 0 },
      { key: "activity", label: `Actions (${data.days}d)`, value: myEvents ?? 0 },
    ];

    const { data: events } = await supabase
      .from("analytics_events")
      .select("created_at")
      .eq("user_id", userId)
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: true })
      .limit(5000);
    const trend = bucketByDay(
      (events ?? []).map((r) => (r as { created_at: string }).created_at),
      data.days,
    );

    return { scope: "self" as const, kpis, trend };
  });

function bucketByDay(iso: string[], days: number): Series {
  const map = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10);
    map.set(d, 0);
  }
  for (const s of iso) {
    const d = s.slice(0, 10);
    if (map.has(d)) map.set(d, (map.get(d) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([date, value]) => ({ date, value }));
}
