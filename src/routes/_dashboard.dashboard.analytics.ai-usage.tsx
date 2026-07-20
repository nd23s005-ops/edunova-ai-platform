import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getAiUsage } from "@/lib/analytics/ai-usage.functions";
import { KpiCard } from "@/components/analytics/KpiCard";
import { TrendChart } from "@/components/analytics/TrendChart";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_dashboard/dashboard/analytics/ai-usage")({
  component: AiUsagePage,
  head: () => ({ meta: [{ title: "AI Usage Analytics — EduNova AI" }] }),
});

function AiUsagePage() {
  const fn = useServerFn(getAiUsage);
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "ai-usage"],
    queryFn: () => fn({ data: { days: 30 } }),
    staleTime: 60_000,
  });

  if (isLoading) return <Skeleton className="h-64" />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Requests (30d)" value={data.totals.requests} />
        <KpiCard label="Successful" value={data.totals.success} />
        <KpiCard label="Success Rate" value={data.totals.success_rate} suffix="%" />
        <KpiCard label="Distinct Features" value={data.by_kind.length} />
      </div>
      <TrendChart title="Daily AI requests" data={data.trend} kind="bar" />
      <Card className="p-4">
        <div className="text-sm font-medium mb-3">Usage by feature</div>
        <ul className="space-y-1 text-sm">
          {data.by_kind.map((k) => (
            <li key={k.kind} className="flex justify-between">
              <span className="capitalize">{k.kind.replace(/[-_]/g, " ")}</span>
              <span className="font-mono">{k.value}</span>
            </li>
          ))}
          {data.by_kind.length === 0 ? <li className="text-muted-foreground">No AI activity yet.</li> : null}
        </ul>
      </Card>
    </div>
  );
}
