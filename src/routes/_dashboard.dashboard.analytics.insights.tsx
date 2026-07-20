import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInsights } from "@/lib/analytics/insights.functions";
import { InsightCard } from "@/components/analytics/InsightCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";

export const Route = createFileRoute("/_dashboard/dashboard/analytics/insights")({
  component: InsightsPage,
  head: () => ({ meta: [{ title: "AI Insights — EduNova AI" }] }),
});

function InsightsPage() {
  const fn = useServerFn(getInsights);
  const qc = useQueryClient();
  const key = ["analytics", "insights", "user"];
  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => fn({ data: { scope: "user" } }),
    staleTime: 5 * 60_000,
  });
  const regen = useMutation({
    mutationFn: () => fn({ data: { scope: "user", force: true } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => regen.mutate()}
          disabled={regen.isPending}
        >
          <RefreshCw className={regen.isPending ? "animate-spin h-4 w-4 mr-1" : "h-4 w-4 mr-1"} />
          Regenerate
        </Button>
      </div>
      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32" />)}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {(data?.insights ?? []).map((ins, i) => <InsightCard key={i} item={ins as never} />)}
          {(data?.insights?.length ?? 0) === 0 ? (
            <div className="text-sm text-muted-foreground">No insights yet. Click Regenerate to build them.</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
