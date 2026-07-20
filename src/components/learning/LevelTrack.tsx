import { CheckCircle2 } from "lucide-react";
import {
  LEVEL_LABEL,
  LEVEL_ORDER,
  levelBandProgress,
  levelFromProgress,
  levelIndex,
  nextLevel,
  type CourseLevel,
} from "@/lib/ai/engine/level-track";
import { cn } from "@/lib/utils";

export function LevelTrack({
  progress,
  compact = false,
  estimatedMinutesRemaining,
}: {
  progress: number;
  compact?: boolean;
  estimatedMinutesRemaining?: number | null;
}) {
  const current: CourseLevel = levelFromProgress(progress);
  const currentIdx = levelIndex(current);
  const upcoming = nextLevel(current);
  const bandPct = levelBandProgress(progress);

  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card p-5 shadow-card", compact && "p-4")}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Current level</p>
          <p className="mt-1 text-lg font-bold">{LEVEL_LABEL[current]}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">
            {upcoming ? <>Next: <span className="font-medium text-foreground">{LEVEL_LABEL[upcoming]}</span></> : "Journey complete"}
          </p>
          {typeof estimatedMinutesRemaining === "number" && estimatedMinutesRemaining > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              ~{Math.round(estimatedMinutesRemaining / 60)}h to complete
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1">
        {LEVEL_ORDER.map((lvl, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <div key={lvl} className="flex flex-1 items-center gap-1">
              <div
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[10px] font-semibold transition",
                  done && "border-primary bg-primary text-primary-foreground",
                  active && "border-primary bg-primary/10 text-primary",
                  !done && !active && "border-border/60 bg-muted text-muted-foreground",
                )}
                title={LEVEL_LABEL[lvl]}
              >
                {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              {i < LEVEL_ORDER.length - 1 && (
                <div
                  className={cn(
                    "h-1 flex-1 rounded-full transition",
                    i < currentIdx ? "bg-primary" : "bg-muted",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {!compact && (
        <div className="mt-4 grid grid-cols-6 gap-1 text-center text-[10px] text-muted-foreground">
          {LEVEL_ORDER.map((lvl, i) => (
            <span key={lvl} className={cn(i === currentIdx && "font-semibold text-foreground")}>
              {LEVEL_LABEL[lvl]}
            </span>
          ))}
        </div>
      )}

      {upcoming && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress to {LEVEL_LABEL[upcoming]}</span>
            <span>{bandPct}%</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${bandPct}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
