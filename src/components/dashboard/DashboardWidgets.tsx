import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  action,
  hint,
}: {
  title: string;
  action?: { to: string; label: string };
  hint?: string;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h2>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground/80">{hint}</p>}
      </div>
      {action && (
        <Link to={action.to} className="text-xs font-medium text-primary hover:underline">
          {action.label} →
        </Link>
      )}
    </div>
  );
}

export function DashCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-5 shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: { to: string; label: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 py-10 text-center">
      {icon && (
        <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-muted text-muted-foreground">
          {icon}
        </div>
      )}
      <p className="text-sm font-semibold">{title}</p>
      {description && (
        <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">{description}</p>
      )}
      {action && (
        <Link
          to={action.to}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}

export type QuickAction = {
  to: string;
  label: string;
  description?: string;
  icon: ReactNode;
};

export function QuickActionsGrid({ items }: { items: QuickAction[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <Link
          key={it.to}
          to={it.to}
          className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-card transition hover:border-primary/40 hover:shadow-elegant"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            {it.icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{it.label}</p>
            {it.description && (
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                {it.description}
              </p>
            )}
          </div>
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
        </Link>
      ))}
    </div>
  );
}

export type NotificationItem = {
  id: string;
  title: string;
  time: string;
  tone?: "info" | "success" | "warning";
};

export function NotificationsPanel({ items }: { items: NotificationItem[] }) {
  if (!items.length) {
    return (
      <DashCard>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Bell className="h-4 w-4" />
          You&apos;re all caught up.
        </div>
      </DashCard>
    );
  }
  return (
    <DashCard className="p-0">
      <ul className="divide-y divide-border/60">
        {items.map((n) => (
          <li key={n.id} className="flex items-start gap-3 px-5 py-3">
            <span
              className={cn(
                "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                n.tone === "success" && "bg-emerald-500",
                n.tone === "warning" && "bg-amber-500",
                (!n.tone || n.tone === "info") && "bg-primary",
              )}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </DashCard>
  );
}

export type ActivityItem = {
  id: string;
  title: string;
  meta?: string;
  time: string;
  icon?: ReactNode;
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (!items.length) {
    return (
      <EmptyState
        title="No recent activity"
        description="Your lesson completions, quiz attempts and submissions will appear here."
      />
    );
  }
  return (
    <DashCard className="p-0">
      <ul className="divide-y divide-border/60">
        {items.map((a) => (
          <li key={a.id} className="flex items-start gap-3 px-5 py-3">
            {a.icon && (
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                {a.icon}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{a.title}</p>
              {a.meta && <p className="mt-0.5 text-xs text-muted-foreground">{a.meta}</p>}
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
          </li>
        ))}
      </ul>
    </DashCard>
  );
}
