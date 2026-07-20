import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  BookOpen,
  Layers,
  Route as RouteIcon,
  Tags,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Users,
  FileText,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader, DashCard } from "@/components/dashboard/DashboardWidgets";
import { cmsAnalytics } from "@/lib/cms/cms.functions";

export const Route = createFileRoute("/_dashboard/dashboard/admin/cms/")({
  component: CmsHub,
});

const SECTIONS = [
  { to: "/dashboard/admin/cms/courses", label: "Courses", desc: "Create, edit, publish and archive courses.", icon: BookOpen },
  { to: "/dashboard/admin/cms/categories", label: "Categories", desc: "Manage tracks & subcategories.", icon: Tags },
  { to: "/dashboard/admin/cms/paths", label: "Learning Paths", desc: "Curate dynamic learner journeys.", icon: RouteIcon },
  { to: "/dashboard/admin/cms/analytics", label: "Analytics", desc: "Course, resource and audit analytics.", icon: BarChart3 },
] as const;

function CmsHub() {
  const analyticsFn = useServerFn(cmsAnalytics);
  const q = useQuery({ queryKey: ["cms", "analytics"], queryFn: () => analyticsFn() });
  const a = q.data;

  return (
    <>
      <DashboardHeader
        title="AI Course & Content Management"
        description="Design, generate, review and publish courses across every track."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatTile icon={<Layers className="h-5 w-5" />} label="Total courses" value={a?.totalCourses ?? 0} />
        <StatTile icon={<ShieldCheck className="h-5 w-5" />} label="Published" value={a?.publishedCourses ?? 0} tint="emerald" />
        <StatTile icon={<FileText className="h-5 w-5" />} label="Drafts" value={a?.draftCourses ?? 0} tint="amber" />
        <StatTile icon={<Users className="h-5 w-5" />} label="Enrollments" value={a?.totalEnrollments ?? 0} tint="blue" />
        <StatTile icon={<Sparkles className="h-5 w-5" />} label="Resources" value={a?.resourceCount ?? 0} tint="violet" />
      </div>

      <section className="mb-10">
        <SectionHeader title="Sections" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className="rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:border-primary/40 hover:shadow-elegant"
              >
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-lg font-semibold">{s.label}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

function StatTile({
  icon,
  label,
  value,
  tint = "primary",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tint?: "primary" | "emerald" | "amber" | "blue" | "violet";
}) {
  const cls =
    tint === "emerald"
      ? "bg-emerald-500/10 text-emerald-500"
      : tint === "amber"
        ? "bg-amber-500/10 text-amber-500"
        : tint === "blue"
          ? "bg-blue-500/10 text-blue-500"
          : tint === "violet"
            ? "bg-violet-500/10 text-violet-500"
            : "bg-primary/10 text-primary";
  return (
    <DashCard>
      <div className="flex items-center gap-3">
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${cls}`}>{icon}</div>
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
      </div>
    </DashCard>
  );
}
