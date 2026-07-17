import { createFileRoute } from "@tanstack/react-router";
import { Users, ClipboardList, LineChart, CheckCircle2 } from "lucide-react";
import { DashboardHeader, PlaceholderPanel, StatCard } from "@/components/dashboard/DashboardShared";

export const Route = createFileRoute("/_dashboard/dashboard/teacher")({
  component: TeacherDashboard,
});

function TeacherDashboard() {
  return (
    <>
      <DashboardHeader
        title="Teacher workspace"
        description="Manage classes, assignments, and see mastery across every student."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active students" value="184" hint="Across 6 classes" icon={<Users className="h-4 w-4" />} />
        <StatCard label="Assignments" value="24" hint="8 awaiting review" icon={<ClipboardList className="h-4 w-4" />} />
        <StatCard label="Avg. class mastery" value="72%" hint="↑ 6% this term" icon={<LineChart className="h-4 w-4" />} />
        <StatCard label="Feedback delivered" value="418" hint="Via Nova AI" icon={<CheckCircle2 className="h-4 w-4" />} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <PlaceholderPanel title="Classes" />
        <PlaceholderPanel title="Assignments" />
        <PlaceholderPanel title="Student analytics" />
      </div>
    </>
  );
}
