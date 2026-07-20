import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard/career", label: "Overview" },
  { to: "/dashboard/career/roadmap", label: "Roadmap" },
  { to: "/dashboard/career/skill-gap", label: "Skill Gap" },
  { to: "/dashboard/career/resume", label: "Resume" },
  { to: "/dashboard/career/ats", label: "ATS Checker" },
  { to: "/dashboard/career/portfolio", label: "Portfolio" },
  { to: "/dashboard/career/projects", label: "Projects" },
  { to: "/dashboard/career/jobs", label: "Jobs" },
  { to: "/dashboard/career/internships", label: "Internships" },
  { to: "/dashboard/career/interview", label: "Interviews" },
  { to: "/dashboard/career/coding", label: "Coding" },
  { to: "/dashboard/career/certifications", label: "Certificates" },
  { to: "/dashboard/career/goals", label: "Goals" },
  { to: "/dashboard/career/assistant", label: "Assistant" },
  { to: "/dashboard/career/profile", label: "Professional Profile" },
] as const;

export const Route = createFileRoute("/_dashboard/dashboard/career")({
  head: () => ({ meta: [{ title: "Career Accelerator — Nova Learn AI" }, { name: "robots", content: "noindex" }] }),
  component: CareerLayout,
});

function CareerLayout() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Career Accelerator</h1>
        <p className="text-sm text-muted-foreground">Learn → Practice → Build → Prepare → Apply → Get hired.</p>
      </div>
      <nav className="flex flex-wrap gap-2 border-b pb-2 overflow-x-auto">
        {NAV.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            className={cn("px-3 py-1.5 text-sm rounded-md hover:bg-muted transition-colors whitespace-nowrap")}
            activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
            activeOptions={{ exact: n.to === "/dashboard/career" }}
          >
            {n.label}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
