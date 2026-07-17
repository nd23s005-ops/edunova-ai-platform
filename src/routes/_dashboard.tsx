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
  UserCog,
  Users,
  X,
} from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { homeForRole, ROLE_LABELS, type AppRole } from "@/lib/auth/roles";

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
    return { userId: data.user.id };
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
  { to: "/dashboard/student/roadmap", label: "Learning Roadmap", icon: Target },
  { to: "/dashboard/student/assignments", label: "Weekly Assignments", icon: ClipboardList },
  { to: "/dashboard/student/quizzes", label: "Quizzes", icon: Target },
  { to: "/dashboard/student/progress", label: "Progress Tracker", icon: BarChart3 },
  AI_ASSISTANT,
];

const ORG_NAV: NavItem[] = [
  { to: "/dashboard/organization", label: "My workspace", icon: Building2 },
  { to: "/dashboard/organization/employees", label: "Employees", icon: Users },
  { to: "/dashboard/organization/students", label: "Students", icon: GraduationCap },
  { to: "/dashboard/organization/course-assignment", label: "Course assignment", icon: BookOpen },
  { to: "/dashboard/organization/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/organization/reports", label: "Reports", icon: FileText },
  AI_ASSISTANT,
];

const ADMIN_NAV: NavItem[] = [
  { to: "/dashboard/admin", label: "My workspace", icon: Shield },
  { to: "/dashboard/admin/users", label: "User management", icon: Users },
  { to: "/dashboard/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/admin/reports", label: "Reports", icon: FileText },
  { to: "/dashboard/admin/settings", label: "Settings", icon: Settings },
  AI_ASSISTANT,
];

const PROFESSIONAL_NAV: NavItem[] = [
  { to: "/dashboard/professional", label: "My workspace", icon: GraduationCap },
  AI_ASSISTANT,
];

const NAV_BY_ROLE: Record<AppRole, NavItem[]> = {
  student: STUDENT_NAV,
  organization: ORG_NAV,
  admin: ADMIN_NAV,
  professional: PROFESSIONAL_NAV,
};



function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["me", "profile"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return null;
      const [{ data: p }, { data: r }] = await Promise.all([
        supabase.from("profiles").select("full_name, avatar_url").eq("id", userData.user.id).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", userData.user.id).maybeSingle(),
      ]);
      return {
        email: userData.user.email ?? "",
        fullName: p?.full_name ?? "",
        avatar: p?.avatar_url ?? null,
        role: (r?.role as AppRole | undefined) ?? null,
      };
    },
    staleTime: 60_000,
  });

  const role = profile?.role ?? null;

  // Student onboarding gate — redirect students without a student_profile to setup.
  const { data: studentProfileStatus } = useQuery({
    queryKey: ["me", "student_profile", "exists"],
    enabled: role === "student",
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return { exists: false };
      const { data } = await supabase
        .from("student_profiles")
        .select("id")
        .eq("user_id", u.user.id)
        .maybeSingle();
      return { exists: !!data };
    },
    staleTime: 60_000,
  });

  useEffect(() => {
    if (
      role === "student" &&
      studentProfileStatus &&
      !studentProfileStatus.exists &&
      !pathname.startsWith("/onboarding")
    ) {
      navigate({ to: "/onboarding/student-profile", replace: true });
    }
  }, [role, studentProfileStatus, pathname, navigate]);

  const roleNav = role ? NAV_BY_ROLE[role] : [];
  const initials = (profile?.fullName || profile?.email || "N L")
    .split(/\s+/)
    .map((s) => s[0])
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
          <div className="ml-auto flex items-center gap-3">
            {role && (
              <span className="hidden rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground sm:inline">
                {ROLE_LABELS[role]}
              </span>
            )}
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
