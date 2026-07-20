import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Users, Layers, ShieldCheck, FileText, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader, DashCard } from "@/components/dashboard/DashboardWidgets";
import { cmsAnalytics } from "@/lib/cms/cms.functions";

export const Route = createFileRoute("/_dashboard/dashboard/admin/cms/analytics")({
  component: Analytics,
});

function Analytics() {
  const fn = useServerFn(cmsAnalytics);
  const q = useQuery({ queryKey: ["cms", "analytics", "full"], queryFn: () => fn() });
  const a = q.data;
  const max = Math.max(1, ...(a?.topViewed ?? []).map((c) => c.view_count));

  return (
    <>
      <Link to="/dashboard/admin/cms" className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline">
        <ArrowLeft className="h-3 w-3" /> Back to CMS
      </Link>
      <DashboardHeader
        title="Content analytics"
        description="Platform-wide course and content metrics."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Tile icon={<Layers className="h-5 w-5" />} label="Total courses" value={a?.totalCourses ?? 0} />
        <Tile icon={<ShieldCheck className="h-5 w-5" />} label="Published" value={a?.publishedCourses ?? 0} tint="emerald" />
        <Tile icon={<FileText className="h-5 w-5" />} label="Drafts" value={a?.draftCourses ?? 0} tint="amber" />
        <Tile icon={<Users className="h-5 w-5" />} label="Enrollments" value={a?.totalEnrollments ?? 0} tint="blue" />
        <Tile icon={<Sparkles className="h-5 w-5" />} label="Resources" value={a?.resourceCount ?? 0} tint="violet" />
      </div>

      <section className="mb-8">
        <SectionHeader title="Most viewed courses" />
        <DashCard>
          {(a?.topViewed ?? []).length === 0 ? (
            <div className="text-sm text-muted-foreground">No data yet.</div>
          ) : (
            <div className="space-y-2">
              {(a?.topViewed ?? []).map((c) => (
                <div key={c.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="truncate">{c.title}</span>
                    <span className="text-muted-foreground">{c.view_count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.round((c.view_count / max) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </DashCard>
      </section>

      <section className="mb-10">
        <SectionHeader title="Recent admin actions" />
        <DashCard>
          {(a?.recentAudit ?? []).length === 0 ? (
            <div className="text-sm text-muted-foreground">No audit entries yet.</div>
          ) : (
            <ul className="divide-y divide-border/60 text-sm">
              {(a?.recentAudit ?? []).map((r, i) => (
                <li key={i} className="flex items-center justify-between py-2">
                  <span>
                    <span className="font-medium capitalize">{r.action}</span>{" "}
                    <span className="text-muted-foreground">{r.entity_type}</span>{" "}
                    {r.entity_id && <span className="text-xs text-muted-foreground">· {r.entity_id.slice(0, 8)}</span>}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </DashCard>
      </section>
    </>
  );
}

function Tile({ icon, label, value, tint = "primary" }: { icon: React.ReactNode; label: string; value: number; tint?: "primary" | "emerald" | "amber" | "blue" | "violet" }) {
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
