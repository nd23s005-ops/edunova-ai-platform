import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type KpiCardProps = {
  label: string;
  value: number | string;
  delta?: number;
  suffix?: string;
  className?: string;
};

export function KpiCard({ label, value, delta, suffix, className }: KpiCardProps) {
  return (
    <Card className={cn("p-4 flex flex-col gap-1", className)}>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold">
        {typeof value === "number" ? value.toLocaleString() : value}
        {suffix ? <span className="text-sm font-normal text-muted-foreground ml-1">{suffix}</span> : null}
      </div>
      {typeof delta === "number" ? (
        <div className={cn("text-xs", delta >= 0 ? "text-emerald-600" : "text-rose-600")}>
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
        </div>
      ) : null}
    </Card>
  );
}
