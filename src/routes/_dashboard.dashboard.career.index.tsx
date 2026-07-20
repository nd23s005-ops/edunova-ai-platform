import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getCareerSnapshot } from "@/lib/career/dashboard.functions";
import { KpiCard } from "@/components/analytics/KpiCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Briefcase, Target } from "lucide-react";

export const Route = createFileRoute("/_dashboard/dashboard/career/")({
  component: CareerHome,
});

function CareerHome() {
  const fn = useServerFn(getCareerSnapshot);
  const { data, isLoading } = useQuery({ queryKey: ["career", "snapshot"], queryFn: () => fn(), staleTime: 60_000 });

  if (isLoading || !data) return <div className="grid gap-3 md:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-24" />)}</div>;

  const s = data.scores;
  const c = data.counts;
  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        <KpiCard label="Career Readiness" value={s.careerReadiness} suffix="%" />
        <KpiCard label="Industry Readiness" value={s.industryReadiness} suffix="%" />
        <KpiCard label="Placement Ready" value={s.placementReadiness} suffix="%" />
        <KpiCard label="Resume" value={s.resumeCompletion} suffix="%" />
        <KpiCard label="ATS Score" value={s.atsScore} suffix="%" />
        <KpiCard label="Portfolio" value={s.portfolioCompletion} suffix="%" />
        <KpiCard label="Skill Score" value={s.skillScore} suffix="%" />
        <KpiCard label="Interview Avg" value={s.interviewScore} suffix="%" />
        <KpiCard label="Coding Accuracy" value={s.codingAccuracy} suffix="%" />
        <KpiCard label="Jobs Applied" value={c.jobsApplied} />
        <KpiCard label="Internships Applied" value={c.internshipsApplied} />
        <KpiCard label="Certificates" value={c.certifications} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium flex items-center gap-2"><FileText className="h-4 w-4" /> Resumes</div>
            <Button asChild size="sm" variant="ghost"><Link to="/dashboard/career/resume">Manage</Link></Button>
          </div>
          <ul className="text-sm space-y-1">
            {(data.resumes ?? []).map((r) => (
              <li key={r.id} className="flex justify-between"><span>{r.title}</span><span className="text-muted-foreground">{r.ats_score ?? 0}%</span></li>
            ))}
            {!data.resumes.length ? <li className="text-muted-foreground">No resumes yet.</li> : null}
          </ul>
        </Card>

        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium flex items-center gap-2"><Target className="h-4 w-4" /> Career Goals</div>
            <Button asChild size="sm" variant="ghost"><Link to="/dashboard/career/goals">Add goal</Link></Button>
          </div>
          <ul className="text-sm space-y-2">
            {(data.goals ?? []).map((g) => (
              <li key={g.id}>
                <div className="flex justify-between"><span>{g.title}</span><span className="text-muted-foreground">{Math.round((Number(g.progress) / Math.max(1, Number(g.target))) * 100)}%</span></div>
                <Progress value={(Number(g.progress) / Math.max(1, Number(g.target))) * 100} className="h-1.5 mt-1" />
              </li>
            ))}
            {!data.goals.length ? <li className="text-muted-foreground">No active goals.</li> : null}
          </ul>
        </Card>

        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium flex items-center gap-2"><Briefcase className="h-4 w-4" /> Recent Interviews</div>
            <Button asChild size="sm" variant="ghost"><Link to="/dashboard/career/interview">Practice</Link></Button>
          </div>
          <ul className="text-sm space-y-1">
            {(data.recentInterviews ?? []).map((r) => (
              <li key={r.id} className="flex justify-between">
                <span className="capitalize">{r.kind}</span>
                <span className="text-muted-foreground">{r.overall_score ?? "—"}%</span>
              </li>
            ))}
            {!data.recentInterviews.length ? <li className="text-muted-foreground">No sessions yet.</li> : null}
          </ul>
        </Card>
      </div>

      <Card className="p-4 flex flex-wrap items-center gap-3">
        <Sparkles className="h-5 w-5 text-primary" />
        <div className="flex-1 text-sm">Ask Nova Career Assistant for the next best step in your journey.</div>
        <Button asChild size="sm"><Link to="/dashboard/career/assistant">Open assistant</Link></Button>
      </Card>
    </div>
  );
}
