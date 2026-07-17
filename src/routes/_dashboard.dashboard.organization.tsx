import { createFileRoute } from "@tanstack/react-router";
import { Building2, Users, TrendingUp, BookOpen } from "lucide-react";
import { DashboardHeader, PlaceholderPanel, StatCard } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";

export const Route = createFileRoute("/_dashboard/dashboard/organization")({
  component: OrganizationDashboard,
});

function OrganizationDashboard() {
  return (
    <RoleGate allow={["organization"]}>
      <DashboardHeader
        title="Organization workspace"
        description="Cohort analytics, team management, and organization-wide rollout."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Members" value="3,412" hint="+128 this month" icon={<Users className="h-4 w-4" />} />
        <StatCard label="Departments" value="14" icon={<Building2 className="h-4 w-4" />} />
        <StatCard label="Engagement" value="87%" hint="Weekly active" icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Courses completed" value="612" hint="This quarter" icon={<BookOpen className="h-4 w-4" />} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <PlaceholderPanel title="Cohort analytics" />
        <PlaceholderPanel title="Team management" />
      </div>
    </RoleGate>
  );
}
