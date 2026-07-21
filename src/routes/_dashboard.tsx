import { useEffect, useState } from "react";
import {
  createFileRoute,
  Outlet,
  Link,
  useRouterState,
  useNavigate,
  redirect,
} from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Notebook,
  Settings,
  Shield,
  Sparkles,
  Target,
  Trophy,
  
  Users,
  X,
} from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { NotificationBell } from "@/components/dashboard/NotificationBell";
import { CommandPalette } from "@/components/dashboard/CommandPalette";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { homeForRole, normalizeRole, ROLE_LABELS, type AppRole } from "@/lib/auth/roles";

export const Route = createFileRoute("/_dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — EduNova AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
    return { userId: data.user.id, email: data.user.email ?? "" };
  },
  component: DashboardLayout,
});

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard };

const OVERVIEW: NavItem = { to: "/dashboard", label: "Overview", icon: LayoutDashboard };

const AI_ASSISTANT: NavItem = {
  to: "/dashboard/ai-assistant",
  label: "AI Assistant",
  icon: MessageSquare,
};

const STUDENT_NAV: NavItem[] = [
  { to: "/dashboard/student", label: "My workspace", icon: GraduationCap },
  { to: "/dashboard/student/my-courses", label: "My Courses", icon: BookOpen },
  { to: "/dashboard/student/browse", label: "Browse Courses", icon: BookOpen },
  { to: "/dashboard/student/resources", label: "Resources", icon: FileText },
  { to: "/dashboard/upskilling", label: "Upskilling Hub", icon: Sparkles },
  { to: "/dashboard/mock-tests", label: "Mock Tests", icon: Target },
  { to: "/dashboard/student/roadmap", label: "Learning Roadmap", icon: Target },
  { to: "/dashboard/student/assignments", label: "Weekly Assignments", icon: ClipboardList },
  { to: "/dashboard/student/quizzes", label: "Quizzes", icon: Target },
  { to: "/dashboard/student/progress", label: "Progress Tracker", icon: BarChart3 },
  { to: "/dashboard/student/study-plan", label: "Study Plan", icon: Target },
  { to: "/dashboard/student/achievements", label: "Achievements", icon: Trophy },
  { to: "/dashboard/career", label: "Career Accelerator", icon: Briefcase },
  { to: "/dashboard/community", label: "Community", icon: Users },
  { to: "/dashboard/analytics", label: "My Analytics", icon: BarChart3 },
  AI_ASSISTANT,
];

// Admin sidebar. AI Assistant is intentionally excluded — admin dashboard has no chatbot.
// Settings is Super Admin only; filtered at render time via useAdminAccess.
const ADMIN_NAV: NavItem[] = [
  { to: "/dashboard/admin", label: "Overview", icon: Shield },
  { to: "/dashboard/admin/users", label: "User management", icon: Users },
  { to: "/dashboard/admin/courses", label: "Course management", icon: BookOpen },
  { to: "/dashboard/admin/support", label: "Support queue", icon: MessageSquare },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/admin/reports", label: "Reports", icon: FileText },
  { to: "/dashboard/admin/activity", label: "Activity logs", icon: Notebook },
  { to: "/dashboard/admin/settings", label: "Settings", icon: Settings },
];
const ADMIN_SUPER_ONLY = new Set<string>(["/dashboard/admin/settings"]);


const PROFESSIONAL_NAV: NavItem[] = [
  { to: "/dashboard/professional", label: "My workspace", icon: GraduationCap },
  { to: "/dashboard/upskilling", label: "Upskilling Hub", icon: Sparkles },
  { to: "/dashboard/student/browse", label: "Browse courses", icon: BookOpen },
  { to: "/dashboard/student/my-courses", label: "My courses", icon: BookOpen },
  { to: "/dashboard/mock-tests", label: "Mock Tests", icon: Target },
  { to: "/dashboard/student/achievements", label: "Achievements", icon: Trophy },
  { to: "/dashboard/career", label: "Career Accelerator", icon: Briefcase },
  { to: "/dashboard/community", label: "Community", icon: Users },
  { to: "/dashboard/analytics", label: "My Analytics", icon: BarChart3 },
  AI_ASSISTANT,
];


const COLLEGE_NAV: NavItem[] = [
  { to: "/dashboard/college", label: "My workspace", icon: GraduationCap },
  { to: "/dashboard/student/my-courses", label: "My Courses", icon: BookOpen },
  { to: "/dashboard/student/browse", label: "Browse Courses", icon: BookOpen },
  { to: "/dashboard/upskilling", label: "Upskilling Hub", icon: Sparkles },
  { to: "/dashboard/mock-tests", label: "Mock Tests", icon: Target },
  { to: "/dashboard/student/quizzes", label: "AI Quizzes", icon: Target },
  { to: "/dashboard/student/progress", label: "Progress Tracker", icon: BarChart3 },
  { to: "/dashboard/student/study-plan", label: "Study Plan", icon: Target },
  { to: "/dashboard/student/achievements", label: "Achievements", icon: Trophy },
  { to: "/dashboard/career", label: "Career Accelerator", icon: Briefcase },
  { to: "/dashboard/community", label: "Community", icon: Users },
  { to: "/dashboard/analytics", label: "My Analytics", icon: BarChart3 },
  AI_ASSISTANT,
];

const NAV_BY_ROLE: Record<AppRole, NavItem[]> = {
  student: STUDENT_NAV,
  college_student: COLLEGE_NAV,
  admin: ADMIN_NAV,
  professional: PROFESSIONAL_NAV,
};




function DashboardLayout() {
  const { userId, email } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["me", "profile", userId],
    queryFn: async () => {
      const [{ data: p }, { data: r }] = await Promise.all([
        supabase.from("profiles").select("full_name, avatar_url, onboarding_completed").eq("id", userId).maybeSingle(),
        supabase.from("user_roles").select("role, admin_level").eq("user_id", userId).maybeSingle(),
      ]);
      return {
        email,
        fullName: p?.full_name ?? "",
        avatar: p?.avatar_url ?? null,
        role: normalizeRole((r?.role as string | undefined) ?? null),
        adminLevel: (r as { admin_level?: string | null } | null)?.admin_level ?? null,
        onboardingCompleted: p?.onboarding_completed ?? false,
      };
    },
    staleTime: 60_000,
  });

  const role = profile?.role ?? null;

  useEffect(() => {
    if (
      role === "student" &&
      profile?.onboardingCompleted === false &&
      !pathname.startsWith("/onboarding")
    ) {
      navigate({ to: "/onboarding/student-profile", replace: true });
    }
  }, [role, profile?.onboardingCompleted, pathname, navigate]);

  const rawNav = role ? NAV_BY_ROLE[role] : [];
  // Hide super-admin-only entries from Demo Admins. We look up admin_level inline
  // (avoids extra hook dependency) using the same profile query result shape.
  const adminLevel = (profile as unknown as { adminLevel?: string | null })?.adminLevel ?? null;
  const roleNav =
    role === "admin" && adminLevel !== "super"
      ? rawNav.filter((n) => !ADMIN_SUPER_ONLY.has(n.to))
      : rawNav;

  const initials = (profile?.fullName || profile?.email || "N L")
    .split(/\s+/)
    .map((s: string) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  return (
    <div className="grid min-h-dvh lg:grid-cols-[260px_1fr]">
      <aside
        className={cn(
          "border-r border-border/60 bg-sidebar text-sidebar-foreground lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col",
          "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <Logo />
          <button
            className="rounded-md p-2 text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          <div>
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Workspace
            </p>
            <ul className="space-y-1">
              <li>
                <SidebarLink item={OVERVIEW} pathname={pathname} exact />
              </li>
              {roleNav.map((item, idx) => (
                <li key={item.to}>
                  <SidebarLink item={item} pathname={pathname} exact={idx === 0} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Account
            </p>
            <ul className="space-y-1">
              <li>
                <SidebarLink
                  item={{ to: "/dashboard/profile", label: "Profile & settings", icon: Settings }}
                  pathname={pathname}
                />
              </li>
            </ul>
          </div>
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <button
            className="rounded-md p-2 text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <CommandPalette />
            {role && (
              <span className="hidden rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground md:inline">
                {ROLE_LABELS[role]}
              </span>
            )}
            <NotificationBell />
            <ThemeToggle />
            <Link
              to="/dashboard/profile"
              className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold"
              aria-label="Open profile"
            >
              {initials || "NL"}
            </Link>
          </div>
        </header>
        <main className="flex-1 bg-background px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarLink({
  item,
  pathname,
  exact,
}: {
  item: NavItem;
  pathname: string;
  exact?: boolean;
}) {
  const active = exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
  return (
    <Link
      to={item.to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-elegant"
          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </Link>
  );
}

// Export a helper for other routes to check role gating
export function useRoleGate(allowed: AppRole[]) {
  return { allowed, homeForRole };
}
