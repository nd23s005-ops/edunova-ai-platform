import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getAssessmentAnalytics } from "@/lib/analytics/assessments.functions";
import { KpiCard } from "@/components/analytics/KpiCard";
import { TrendChart } from "@/components/analytics/TrendChart";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_dashboard/dashboard/analytics/assessments")({
  component: AssessmentsAnalyticsPage,
  head: () => ({ meta: [{ title: "Assessment Analytics — EduNova AI" }] }),
});

function AssessmentsAnalyticsPage() {
  const fn = useServerFn(getAssessmentAnalytics);
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "assessments"],
    queryFn: () => fn({ data: { days: 30 } }),
    staleTime: 60_000,
  });

  if (isLoading) return <Skeleton className="h-64" />;
  if (!data) return null;

  const t = data.totals;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard label="Attempts" value={t.attempts} />
        <KpiCard label="Average" value={t.avg} suffix="%" />
        <KpiCard label="Highest" value={t.high} suffix="%" />
        <KpiCard label="Lowest" value={t.low} suffix="%" />
        <KpiCard label="Pass Rate" value={t.pass_rate} suffix="%" />
        <KpiCard label="Fail Rate" value={t.fail_rate} suffix="%" />
      </div>
      <TrendChart title="Average score (30 days)" data={data.trend} />
    </div>
  );
}
