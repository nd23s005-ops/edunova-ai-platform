import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

export type InsightItem = {
  title: string;
  body: string;
  kind?: string | null;
  confidence?: number | null;
  recommendations?: string[] | unknown;
};

export function InsightCard({ item }: { item: InsightItem }) {
  const recs = Array.isArray(item.recommendations) ? (item.recommendations as string[]) : [];
  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <div className="font-medium">{item.title}</div>
        </div>
        {item.kind ? <Badge variant="outline">{item.kind}</Badge> : null}
      </div>
      <p className="text-sm text-muted-foreground">{item.body}</p>
      {recs.length > 0 ? (
        <ul className="list-disc pl-5 text-sm space-y-0.5">
          {recs.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      ) : null}
      {typeof item.confidence === "number" ? (
        <div className="text-xs text-muted-foreground">Confidence {Math.round(item.confidence * 100)}%</div>
      ) : null}
    </Card>
  );
}
