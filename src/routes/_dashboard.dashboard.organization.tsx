import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Users,
  TrendingUp,
  BookOpen,
  BarChart3,
  FileText,
  UserPlus,
  Sparkles,
} from "lucide-react";
import { DashboardHeader, StatCard } from "@/components/dashboard/DashboardShared";
import {
  SectionHeader,
  DashCard,
  EmptyState,
  QuickActionsGrid,
  NotificationsPanel,
  type NotificationItem,
} from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";

export const Route = createFileRoute("/_dashboard/dashboard/organization")({
  component: OrganizationDashboard,
});

function OrganizationDashboard() {
  const notifications: NotificationItem[] = [
    { id: "n1", title: "Invite your first team members to unlock analytics", time: "Getting started", tone: "info" },
  ];

  return (
    <RoleGate allow={["organization"]}>
      <DashboardHeader
        title="Organization workspace"
        description="Cohort analytics, team management, and organization-wide rollout."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Members" value="0" hint="Invite to get started" icon={<Users className="h-4 w-4" />} />
        <StatCard label="Departments" value="0" icon={<Building2 className="h-4 w-4" />} />
        <StatCard label="Weekly active" value="—" hint="Once members join" icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Courses completed" value="0" hint="This quarter" icon={<BookOpen className="h-4 w-4" />} />
      </div>

      <section className="mb-8">
        <SectionHeader title="Organization overview" />
        <DashCard>
          <div className="grid gap-6 sm:grid-cols-3">
            <OverviewStat label="Learners" value="—" hint="Employees + students" />
            <OverviewStat label="Assigned courses" value="—" hint="Active assignments" />
            <OverviewStat label="Avg. engagement" value="—" hint="Weekly active rate" />
          </div>
        </DashCard>
      </section>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeader
            title="Team progress"
            action={{ to: "/dashboard/organization/analytics", label: "Open analytics" }}
          />
          <EmptyState
            icon={<BarChart3 className="h-5 w-5" />}
            title="No team activity yet"
            description="Team progress and cohort learning trends will appear as employees join and start courses."
            action={{ to: "/dashboard/organization/employees", label: "Invite employees" }}
          />
        </div>
        <div>
          <SectionHeader title="Assigned courses" action={{ to: "/dashboard/organization/course-assignment", label: "Assign" }} />
          <EmptyState
            icon={<BookOpen className="h-5 w-5" />}
            title="No course assignments yet"
            description="Assign courses to teams or individuals to track progress in one place."
            action={{ to: "/dashboard/organization/course-assignment", label: "Assign a course" }}
          />
        </div>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeader
            title="Employee management"
            action={{ to: "/dashboard/organization/employees", label: "Manage" }}
          />
          <DashCard>
            <div className="grid gap-4 sm:grid-cols-3">
              <ManageCard
                icon={<UserPlus className="h-5 w-5" />}
                title="Invite members"
                to="/dashboard/organization/employees"
              />
              <ManageCard
                icon={<Users className="h-5 w-5" />}
                title="Team directory"
                to="/dashboard/organization/employees"
              />
              <ManageCard
                icon={<FileText className="h-5 w-5" />}
                title="Reports"
                to="/dashboard/organization/reports"
              />
            </div>
          </DashCard>
        </div>
        <div>
          <SectionHeader title="Notifications" />
          <NotificationsPanel items={notifications} />
        </div>
      </div>

      <section>
        <SectionHeader title="Quick actions" />
        <QuickActionsGrid
          items={[
            {
              to: "/dashboard/organization/employees",
              label: "Invite employees",
              description: "Grow your team on EduNova AI",
              icon: <UserPlus className="h-5 w-5" />,
            },
            {
              to: "/dashboard/organization/course-assignment",
              label: "Assign courses",
              description: "Roll out learning paths",
              icon: <BookOpen className="h-5 w-5" />,
            },
            {
              to: "/dashboard/organization/analytics",
              label: "Analytics",
              description: "Cohort learning trends",
              icon: <BarChart3 className="h-5 w-5" />,
            },
            {
              to: "/dashboard/ai-assistant",
              label: "Nova AI",
              description: "Insights for L&D leaders",
              icon: <Sparkles className="h-5 w-5" />,
            },
          ]}
        />
      </section>
    </RoleGate>
  );
}

function OverviewStat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ManageCard({ icon, title, to }: { icon: React.ReactNode; title: string; to: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-4 transition hover:border-primary/40"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <p className="text-sm font-semibold">{title}</p>
    </Link>
  );
}
