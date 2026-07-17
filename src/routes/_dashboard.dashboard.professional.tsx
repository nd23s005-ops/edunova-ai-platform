import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Award, TrendingUp, Target } from "lucide-react";
import { DashboardHeader, PlaceholderPanel, StatCard } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";

export const Route = createFileRoute("/_dashboard/dashboard/professional")({
  component: ProfessionalDashboard,
});

function ProfessionalDashboard() {
  return (
    <RoleGate allow={["professional"]}>
      <DashboardHeader
        title="Professional workspace"
        description="Career growth, certifications, and upskilling paths powered by Nova AI."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active paths" value="3" hint="Upskilling tracks" icon={<Briefcase className="h-4 w-4" />} />
        <StatCard label="Certifications" value="2" hint="1 in progress" icon={<Award className="h-4 w-4" />} />
        <StatCard label="Skill growth" value="+24%" hint="Last 90 days" icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Weekly goal" value="82%" hint="On track" icon={<Target className="h-4 w-4" />} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <PlaceholderPanel title="Career paths" />
        <PlaceholderPanel title="Certification prep" />
      </div>
    </RoleGate>
  );
}
