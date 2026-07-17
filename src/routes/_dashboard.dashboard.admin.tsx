import { createFileRoute } from "@tanstack/react-router";
import { Shield, Server, AlertTriangle, Users } from "lucide-react";
import { DashboardHeader, PlaceholderPanel, StatCard } from "@/components/dashboard/DashboardShared";

export const Route = createFileRoute("/_dashboard/dashboard/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <>
      <DashboardHeader
        title="Administrator workspace"
        description="Platform governance, user management, and system health."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value="1.24M" hint="All roles" icon={<Users className="h-4 w-4" />} />
        <StatCard label="System uptime" value="99.98%" hint="Last 90 days" icon={<Server className="h-4 w-4" />} />
        <StatCard label="Open incidents" value="0" hint="All systems healthy" icon={<AlertTriangle className="h-4 w-4" />} />
        <StatCard label="Security posture" value="A+" hint="SOC 2 Type II" icon={<Shield className="h-4 w-4" />} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <PlaceholderPanel title="User management" />
        <PlaceholderPanel title="System settings" />
      </div>
    </>
  );
}
