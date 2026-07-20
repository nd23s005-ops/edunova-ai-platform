import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export type PredictionItem = {
  kind: string;
  value?: number | null;
  label?: string | null;
  confidence?: number | null;
  features?: unknown;
};

const LABELS: Record<string, string> = {
  completion_probability: "Course Completion",
  dropout_risk: "Dropout Risk",
  placement_readiness: "Placement Readiness",
  next_course: "Next Course",
  certification_readiness: "Certification Readiness",
};

export function PredictionCard({ item }: { item: PredictionItem }) {
  const rationale =
    item.features && typeof item.features === "object" && "rationale" in (item.features as Record<string, unknown>)
      ? String((item.features as Record<string, unknown>).rationale ?? "")
      : "";
  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-baseline justify-between">
        <div className="font-medium">{LABELS[item.kind] ?? item.kind}</div>
        {typeof item.confidence === "number" ? (
          <div className="text-xs text-muted-foreground">±{Math.round((1 - item.confidence) * 100)}%</div>
        ) : null}
      </div>
      {typeof item.value === "number" ? (
        <>
          <div className="text-2xl font-semibold">{Math.round(item.value)}%</div>
          <Progress value={item.value} className="h-2" />
        </>
      ) : item.label ? (
        <div className="text-lg">{item.label}</div>
      ) : null}
      {rationale ? <p className="text-xs text-muted-foreground">{rationale}</p> : null}
    </Card>
  );
}
