import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Shield,
  Server,
  AlertTriangle,
  Users,
  BookOpen,
  Building2,
  BarChart3,
  FileText,
  Settings,
  Sparkles,
  Lock,
  LifeBuoy,
  Activity,
  Bug,
} from "lucide-react";
import { DashboardHeader, StatCard } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { ReadOnlyBanner } from "@/components/admin/ReadOnlyBanner";
import { DemoCredentialsPopup } from "@/components/admin/DemoCredentialsPopup";
import { useAdminAccess } from "@/lib/admin/access";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/dashboard/admin")({
  component: AdminDashboard,
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
  { to: "/dashboard/admin/organizations", label: "Organizations", description: "Review connected organizations.", icon: Building2 },
  { to: "/dashboard/admin/analytics", label: "Analytics", description: "Platform-wide learning analytics.", icon: BarChart3 },
  { to: "/dashboard/admin/reports", label: "Reports", description: "Operational and compliance reports.", icon: FileText },
  { to: "/dashboard/admin/activity", label: "Activity Logs", description: "Recent administrative actions.", icon: Activity },
  { to: "/dashboard/admin/debug-errors", label: "Debug Errors", description: "Recent captured server & client errors.", icon: Bug, superOnly: true },
  { to: "/dashboard/admin/settings", label: "Platform Settings", description: "Configure roles, permissions and AI.", icon: Settings, superOnly: true },
  { to: "/dashboard/admin/ai-configuration", label: "AI Configuration", description: "Manage models and prompts.", icon: Sparkles, superOnly: true },
];


function AdminDashboard() {
  const access = useAdminAccess();

  return (
    <RoleGate allow={["admin"]}>
      <DashboardHeader
        title="Administrator workspace"
        description={
          access.isSuper
            ? "Full administrative control."
            : "Read-only platform overview for demo administrators."
        }
      />

      {access.isReadOnly && <ReadOnlyBanner />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value="1.24M" hint="All roles" icon={<Users className="h-4 w-4" />} />
        <StatCard label="System uptime" value="99.98%" hint="Last 90 days" icon={<Server className="h-4 w-4" />} />
        <StatCard label="Open incidents" value="0" hint="All systems healthy" icon={<AlertTriangle className="h-4 w-4" />} />
        <StatCard label="Security posture" value="A+" hint="SOC 2 Type II" icon={<Shield className="h-4 w-4" />} />
      </div>

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

      {/* Demo Credentials popup — visible to demo admins for reference. */}
      {access.isDemo && <DemoCredentialsPopup />}
    </RoleGate>
  );
}
