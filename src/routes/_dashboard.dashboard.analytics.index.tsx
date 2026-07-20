import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getOverview } from "@/lib/analytics/overview.functions";
import { KpiCard } from "@/components/analytics/KpiCard";
import { TrendChart } from "@/components/analytics/TrendChart";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_dashboard/dashboard/analytics/")({
  component: OverviewPage,
  head: () => ({ meta: [{ title: "Analytics Overview — EduNova AI" }] }),
});

function OverviewPage() {
  const fn = useServerFn(getOverview);
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "overview", 30],
    queryFn: () => fn({ data: { days: 30 } }),
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
      </div>
    );
  }
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {data.kpis.map((k) => (
          <KpiCard key={k.key} label={k.label} value={k.value} />
        ))}
      </div>
      <TrendChart
        title={data.scope === "admin" ? "Enrollments (30 days)" : "Your activity (30 days)"}
        data={data.trend}
      />
    </div>
  );
}
