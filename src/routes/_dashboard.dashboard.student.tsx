import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Brain, Flame, Trophy } from "lucide-react";
import { DashboardHeader, PlaceholderPanel, StatCard } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";

export const Route = createFileRoute("/_dashboard/dashboard/student")({
  component: StudentDashboard,
});

function StudentDashboard() {
  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title="Student workspace"
        description="Your personalized learning hub — courses, streaks, and Nova AI sessions."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Courses in progress" value="6" hint="+2 this month" icon={<BookOpen className="h-4 w-4" />} />
        <StatCard label="Mastery gained" value="78%" hint="↑ 12% vs last week" icon={<Brain className="h-4 w-4" />} />
        <StatCard label="Current streak" value="12 days" hint="Personal best" icon={<Flame className="h-4 w-4" />} />
        <StatCard label="Certificates earned" value="3" hint="1 pending" icon={<Trophy className="h-4 w-4" />} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2"><PlaceholderPanel title="Your learning path">Continue where you left off — full course viewer coming soon.</PlaceholderPanel></div>
        <PlaceholderPanel title="Nova AI Tutor">Chat with Nova, practice drills, get feedback.</PlaceholderPanel>
      </div>
    </RoleGate>
  );
}
