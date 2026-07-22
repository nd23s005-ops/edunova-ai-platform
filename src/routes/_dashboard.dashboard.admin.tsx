import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Shield,
  Server,
  Users,
  BookOpen,
  BarChart3,
  FileText,
  Settings,
  Sparkles,
  Lock,
  LifeBuoy,
  Activity,
  Bug,
  UserPlus,
  GraduationCap,
  Library,
  CheckCircle2,
  FileEdit,
  Archive,
  Bell,
  Plus,
} from "lucide-react";
import { DashboardHeader, StatCard } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { ReadOnlyBanner } from "@/components/admin/ReadOnlyBanner";
import { DemoCredentialsPopup } from "@/components/admin/DemoCredentialsPopup";
import { TrendChart } from "@/components/analytics/TrendChart";
import { useAdminAccess } from "@/lib/admin/access";
import { getAdminOverview } from "@/lib/admin/overview.functions";
import { cn } from "@/lib/utils";

const overviewQuery = {
  queryKey: ["admin", "overview"],
  queryFn: () => getAdminOverview(),
  staleTime: 30_000,
};

export const Route = createFileRoute("/_dashboard/dashboard/admin")({
  beforeLoad: async () => {
    const { redirect } = await import("@tanstack/react-router");
    const { supabase } = await import("@/integrations/supabase/client");
    const { homeForRole } = await import("@/lib/auth/roles");
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw redirect({ to: "/login" });
    const { data: r } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .maybeSingle();
    if (r?.role !== "admin") {
      throw redirect({ to: homeForRole((r?.role as string | null) ?? null) });
    }
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(overviewQuery),
  component: AdminDashboard,
  errorComponent: ({ error }) => (
    <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-6 text-sm text-destructive">
      Failed to load overview: {error.message}
    </div>
  ),
});


type Section = {
  to: string;
  label: string;
  description: string;
  icon: typeof Users;
  superOnly?: boolean;
};

const SECTIONS: Section[] = [
  { to: "/dashboard/admin/cms", label: "Course & Content CMS", description: "AI-powered course, curriculum & content management.", icon: BookOpen, superOnly: true },
  { to: "/dashboard/admin/users", label: "User Management", description: "View users across the platform.", icon: Users },
  { to: "/dashboard/admin/support", label: "Support Queue", description: "Review and respond to help desk tickets.", icon: LifeBuoy },
  { to: "/dashboard/admin/courses", label: "Course Catalog", description: "Browse the published course catalog.", icon: BookOpen },
  { to: "/dashboard/admin/analytics", label: "Analytics", description: "Platform-wide learning analytics.", icon: BarChart3 },
  { to: "/dashboard/admin/reports", label: "Reports", description: "Operational and compliance reports.", icon: FileText },
  { to: "/dashboard/admin/activity", label: "Activity Logs", description: "Recent administrative actions.", icon: Activity },
  { to: "/dashboard/admin/debug-errors", label: "Debug Errors", description: "Recent captured server & client errors.", icon: Bug, superOnly: true },
  { to: "/dashboard/admin/settings", label: "Platform Settings", description: "Configure roles, permissions and AI.", icon: Settings, superOnly: true },
  { to: "/dashboard/admin/ai-configuration", label: "AI Configuration", description: "Manage models and prompts.", icon: Sparkles, superOnly: true },
];

const QUICK_ACTIONS = [
  { to: "/dashboard/admin/cms/courses/new", label: "New course", icon: Plus, superOnly: true },
  { to: "/dashboard/admin/users", label: "Manage users", icon: Users },
  { to: "/dashboard/admin/support", label: "Support queue", icon: LifeBuoy },
  { to: "/dashboard/admin/analytics", label: "Open analytics", icon: BarChart3 },
];

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function AdminDashboard() {
  const access = useAdminAccess();
  const { data } = useSuspenseQuery(overviewQuery);
  const { totals } = data;

  const regTrend = data.registrationsByDay.map((r) => ({ date: r.date, value: r.count }));
  const enrTrend = data.enrollmentsByDay.map((r) => ({ date: r.date, value: r.count }));

  return (
    <RoleGate allow={["admin"]}>
      <DashboardHeader
        title="Administrator workspace"
        description={
          access.isSuper
            ? "Full administrative control across users, courses, resources, and platform operations."
            : "Read-only platform overview for demo administrators."
        }
      />

      {access.isReadOnly && <ReadOnlyBanner />}

      {/* Quick actions */}
      <div className="mb-6 flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((a) => {
          const locked = a.superOnly && !access.isSuper;
          const Icon = a.icon;
          const cls = cn(
            "inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium shadow-sm transition",
            locked ? "cursor-not-allowed opacity-50" : "hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
          );
          if (locked) {
            return (
              <span key={a.to} className={cls}>
                <Icon className="h-3.5 w-3.5" /> {a.label}
                <Lock className="h-3 w-3" />
              </span>
            );
          }
          return (
            <Link key={a.to} to={a.to} className={cls}>
              <Icon className="h-3.5 w-3.5" /> {a.label}
            </Link>
          );
        })}
      </div>

      {/* KPI stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value={totals.users.toLocaleString()} hint={`${totals.activeUsers.toLocaleString()} active in 30d`} icon={<Users className="h-4 w-4" />} />
        <StatCard label="Registrations today" value={totals.todayRegistrations.toLocaleString()} hint="New sign-ups since 00:00 UTC" icon={<UserPlus className="h-4 w-4" />} />
        <StatCard label="Enrolled learners" value={totals.enrollments.toLocaleString()} hint="Active course enrollments" icon={<GraduationCap className="h-4 w-4" />} />
        <StatCard label="Total resources" value={totals.resources.toLocaleString()} hint="Library assets" icon={<Library className="h-4 w-4" />} />
        <StatCard label="Total courses" value={totals.courses.toLocaleString()} hint="Excluding deleted" icon={<BookOpen className="h-4 w-4" />} />
        <StatCard label="Published" value={totals.publishedCourses.toLocaleString()} hint="Live courses" icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard label="Drafts" value={totals.draftCourses.toLocaleString()} hint="Awaiting publish" icon={<FileEdit className="h-4 w-4" />} />
        <StatCard label="Archived" value={totals.archivedCourses.toLocaleString()} hint="Hidden from catalog" icon={<Archive className="h-4 w-4" />} />
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <TrendChart title="Registrations · last 7 days" data={regTrend} kind="bar" height={220} />
        <TrendChart title="Enrollments · last 7 days" data={enrTrend} kind="line" height={220} />
      </div>

      {/* Activity + Notifications */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Recent activity</h3>
            <Link to="/dashboard/admin/activity" className="text-xs font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          {data.recentActivity.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
              No administrative actions recorded yet.
            </p>
          ) : (
            <ol className="relative space-y-3 border-l border-border/60 pl-5">
              {data.recentActivity.map((a) => (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[23px] top-1.5 grid h-3 w-3 place-items-center rounded-full border-2 border-primary bg-background" />
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="text-sm font-medium">{a.actor_name || "System"}</span>
                    <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {a.action}
                    </span>
                    <span className="text-sm text-muted-foreground">on {a.entity_type}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{formatRelative(a.created_at)}</span>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Latest notifications</h3>
          </div>
          {data.latestNotifications.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
              No notifications yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {data.latestNotifications.map((n) => (
                <li key={n.id} className="rounded-lg border border-border/40 p-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-medium leading-tight">{n.title}</p>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{formatRelative(n.created_at)}</span>
                  </div>
                  {n.body && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{n.body}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Sections */}
      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Sections</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => {
            const locked = s.superOnly && !access.isSuper;
            const Icon = s.icon;
            const inner = (
              <div
                className={cn(
                  "flex h-full items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-card transition",
                  locked ? "opacity-60" : "hover:border-primary/40 hover:shadow-elegant",
                )}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{s.label}</p>
                    {locked && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-border/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        <Lock className="h-3 w-3" /> Super admin
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{s.description}</p>
                </div>
              </div>
            );
            return locked ? (
              <div key={s.to} aria-disabled>
                {inner}
              </div>
            ) : (
              <Link key={s.to} to={s.to}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Compliance strip */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="System uptime" value="99.98%" hint="Last 90 days" icon={<Server className="h-4 w-4" />} />
        <StatCard label="Security posture" value="A+" hint="SOC 2 Type II" icon={<Shield className="h-4 w-4" />} />
        <StatCard label="Data policies" value="Enforced" hint="RLS enabled on all user tables" icon={<Shield className="h-4 w-4" />} />
      </div>

      {access.isDemo && <DemoCredentialsPopup />}
    </RoleGate>
  );
}
