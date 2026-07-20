import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPredictions } from "@/lib/analytics/predictions.functions";
import { PredictionCard } from "@/components/analytics/PredictionCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/_dashboard/dashboard/analytics/predictions")({
  component: PredictionsPage,
  head: () => ({ meta: [{ title: "AI Predictions — EduNova AI" }] }),
});

function PredictionsPage() {
  const fn = useServerFn(getPredictions);
  const qc = useQueryClient();
  const key = ["analytics", "predictions"];
  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => fn({ data: {} }),
    staleTime: 5 * 60_000,
  });
  const regen = useMutation({
    mutationFn: () => fn({ data: { force: true } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => regen.mutate()} disabled={regen.isPending}>
          <Sparkles className="h-4 w-4 mr-1" />
          Refresh predictions
        </Button>
      </div>
      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-36" />)}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {(data?.predictions ?? []).map((p, i) => <PredictionCard key={i} item={p as never} />)}
          {(data?.predictions?.length ?? 0) === 0 ? (
            <div className="text-sm text-muted-foreground">No predictions yet.</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
