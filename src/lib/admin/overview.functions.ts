import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminOverview = {
  totals: {
    users: number;
    activeUsers: number;
    todayRegistrations: number;
    courses: number;
    publishedCourses: number;
    draftCourses: number;
    archivedCourses: number;
    resources: number;
    enrollments: number;
  };
  registrationsByDay: { date: string; count: number }[];
  enrollmentsByDay: { date: string; count: number }[];
  recentActivity: {
    id: string;
    action: string;
    entity_type: string;
    entity_id: string | null;
    created_at: string;
    actor_name: string | null;
  }[];
  latestNotifications: {
    id: string;
    title: string;
    body: string | null;
    kind: string;
    created_at: string;
  }[];
};

const DAYS = 7;

function last7Days(): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

function bucketByDay(rows: { created_at?: string | null; enrolled_at?: string | null }[], field: "created_at" | "enrolled_at") {
  const days = last7Days();
  const map = new Map(days.map((d) => [d, 0]));
  for (const r of rows) {
    const ts = r[field];
    if (!ts) continue;
    const day = new Date(ts).toISOString().slice(0, 10);
    if (map.has(day)) map.set(day, (map.get(day) ?? 0) + 1);
  }
  return days.map((date) => ({ date, count: map.get(date) ?? 0 }));
}

export const getAdminOverview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminOverview> => {
    // Verify caller is a super admin before using the admin client.
    const { data: role } = await context.supabase
      .from("user_roles")
      .select("role, admin_level")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (role?.role !== "admin") throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const since7 = new Date(Date.now() - 7 * 86400_000).toISOString();
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);
    const activeSince = new Date(Date.now() - 30 * 86400_000).toISOString();

    const [
      profilesCount,
      todayRegs,
      activeUsers,
      coursesTotal,
      coursesPublished,
      coursesDraft,
      coursesArchived,
      resourcesCount,
      enrollmentsCount,
      recentProfiles,
      recentEnrollments,
      auditRows,
      notifs,
    ] = await Promise.all([
      supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }).gte("created_at", todayStart.toISOString()),
      supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }).gte("updated_at", activeSince),
      supabaseAdmin.from("courses").select("*", { count: "exact", head: true }).is("deleted_at", null),
      supabaseAdmin.from("courses").select("*", { count: "exact", head: true }).eq("cms_status", "published").is("deleted_at", null),
      supabaseAdmin.from("courses").select("*", { count: "exact", head: true }).eq("cms_status", "draft").is("deleted_at", null),
      supabaseAdmin.from("courses").select("*", { count: "exact", head: true }).not("archived_at", "is", null),
      supabaseAdmin.from("resources").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("course_enrollments").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("profiles").select("created_at").gte("created_at", since7),
      supabaseAdmin.from("course_enrollments").select("enrolled_at").gte("enrolled_at", since7),
      supabaseAdmin
        .from("admin_audit_logs")
        .select("id, action, entity_type, entity_id, created_at, actor_id")
        .order("created_at", { ascending: false })
        .limit(8),
      supabaseAdmin
        .from("notifications")
        .select("id, title, body, kind, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    // Resolve actor names for audit rows.
    const actorIds = Array.from(
      new Set((auditRows.data ?? []).map((r) => r.actor_id).filter((x): x is string => !!x)),
    );
    const actorMap = new Map<string, string>();
    if (actorIds.length > 0) {
      const { data: actors } = await supabaseAdmin
        .from("profiles")
        .select("id, full_name")
        .in("id", actorIds);
      for (const a of actors ?? []) actorMap.set(a.id, a.full_name ?? "");
    }

    return {
      totals: {
        users: profilesCount.count ?? 0,
        activeUsers: activeUsers.count ?? 0,
        todayRegistrations: todayRegs.count ?? 0,
        courses: coursesTotal.count ?? 0,
        publishedCourses: coursesPublished.count ?? 0,
        draftCourses: coursesDraft.count ?? 0,
        archivedCourses: coursesArchived.count ?? 0,
        resources: resourcesCount.count ?? 0,
        enrollments: enrollmentsCount.count ?? 0,
      },
      registrationsByDay: bucketByDay(recentProfiles.data ?? [], "created_at"),
      enrollmentsByDay: bucketByDay(recentEnrollments.data ?? [], "enrolled_at"),
      recentActivity: (auditRows.data ?? []).map((r) => ({
        id: r.id,
        action: r.action,
        entity_type: r.entity_type,
        entity_id: r.entity_id,
        created_at: r.created_at,
        actor_name: r.actor_id ? actorMap.get(r.actor_id) ?? null : null,
      })),
      latestNotifications: notifs.data ?? [],
    };
  });
