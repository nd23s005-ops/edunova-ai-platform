import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, GraduationCap, Shield, UserCog } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  component: DashboardIndex,
});

const roles = [
  { to: "/dashboard/student", icon: GraduationCap, name: "Student", desc: "Track your learning, courses, and Nova AI sessions." },
  { to: "/dashboard/teacher", icon: UserCog, name: "Teacher", desc: "Manage classes, assignments, and student mastery." },
  { to: "/dashboard/organization", icon: Building2, name: "Organization", desc: "Cohort analytics, teams, and rollout tools." },
  { to: "/dashboard/admin", icon: Shield, name: "Administrator", desc: "Platform governance, users, and system settings." },
] as const;

function DashboardIndex() {
  return (
    <>
      <DashboardHeader
        title="Welcome to EduNova AI"
        description="Choose a workspace to preview. Full role-based experiences will be implemented next."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {roles.map((r) => (
          <Link
            key={r.to}
            to={r.to}
            className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <r.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-semibold">{r.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              <span className="mt-3 inline-flex text-sm font-semibold text-primary">Enter workspace →</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
