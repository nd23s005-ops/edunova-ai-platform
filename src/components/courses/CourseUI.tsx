import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export const BOARD_LABEL: Record<string, string> = {
  state_board: "State Board",
  cbse: "CBSE",
  icse: "ICSE",
  cambridge: "Cambridge",
  ib: "IB",
  nios: "NIOS",
  other: "Other",
};

export const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function Markdown({ children }: { children: string | null | undefined }) {
  if (!children) return null;
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${v}%` }} />
    </div>
  );
}

export function ProgressRing({ value, size = 80 }: { value: number; size?: number }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  const dash = (v / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={8} className="stroke-muted" fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c}`}
        className="stroke-primary transition-all"
        fill="none"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
        className="fill-foreground text-sm font-semibold"
      >
        {v}%
      </text>
    </svg>
  );
}

export function Section({
  title,
  description,
  children,
  actions,
}: {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

export function Badge({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "primary" | "success" | "warning";
}) {
  const tones: Record<string, string> = {
    muted: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function EmptyContent({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
      <p className="text-sm font-semibold">{title}</p>
      {hint && <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
