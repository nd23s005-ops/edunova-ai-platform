import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Clock,
  Layers,
  ArrowRight,
  Sparkles,
  Trophy,
  Target,
  TrendingUp,
  History as HistoryIcon,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { ProgressBar } from "@/components/courses/CourseUI";
import { MOCK_TEST_CATEGORIES } from "@/lib/ai/mock-tests.catalog";
import { getMockTestStats } from "@/lib/ai/mock-tests.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/dashboard/mock-tests/ai/")({
  component: AIMockTestCenter,
});

function AIMockTestCenter() {
  const fetchStats = useServerFn(getMockTestStats);
  const { data: stats } = useQuery({
    queryKey: ["ai-mock-test-stats"],
    queryFn: () => fetchStats(),
  });

  return (
    <>
      <div className="mb-4">
        <Link
          to="/dashboard/mock-tests"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to mock tests
        </Link>
      </div>

      <DashboardHeader
        title={
          <span className="inline-flex items-center gap-2">
            <span aria-hidden>📝</span> AI Mock Test Center
          </span>
        }
        description="AI-generated mock tests across aptitude, reasoning, GK, programming, AI, school & placement prep. 30 fresh questions every attempt."
      />

      {/* Overview tiles */}
      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile
          icon={<Sparkles className="h-4 w-4" />}
          label="Total attempts"
          value={stats?.totalAttempts ?? 0}
        />
        <StatTile
          icon={<Trophy className="h-4 w-4" />}
          label="Best score"
          value={`${stats?.bestScorePct ?? 0}%`}
        />
        <StatTile
          icon={<Target className="h-4 w-4" />}
          label="Average"
          value={`${stats?.averageScorePct ?? 0}%`}
        />
        <StatTile
          icon={<TrendingUp className="h-4 w-4" />}
          label="This week"
          value={`${stats?.attemptsThisWeek ?? 0} tests`}
          sub={`avg ${stats?.weeklyAveragePct ?? 0}%`}
        />
      </div>

      {/* Categories */}
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Test categories
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_TEST_CATEGORIES.map((c) => {
          const stat = stats?.perCategory.find((p) => p.categoryId === c.id);
          return (
            <Link
              key={c.id}
              to="/dashboard/mock-tests/ai/$categoryId"
              params={{ categoryId: c.id }}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:border-primary/40 hover:shadow-elegant",
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br opacity-60",
                  c.gradient,
                )}
                aria-hidden
              />
              <div className="relative z-10">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl leading-none" aria-hidden>
                    {c.emoji}
                  </span>
                  <span className="rounded-full border border-border/60 bg-background/70 px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground backdrop-blur">
                    {c.difficulty}
                  </span>
                </div>
                <h3 className="text-base font-semibold group-hover:text-primary">{c.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {c.subtopics.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-[10px] text-muted-foreground backdrop-blur"
                    >
                      {s}
                    </span>
                  ))}
                  {c.subtopics.length > 4 && (
                    <span className="rounded-full px-2 py-0.5 text-[10px] text-muted-foreground">
                      +{c.subtopics.length - 4} more
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {c.durationMinutes} min
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5" /> {c.questionCount} Qs
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-foreground">
                    Start <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </div>

                {stat && (
                  <div className="mt-3 rounded-lg border border-border/50 bg-background/60 p-2 text-[11px] backdrop-blur">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Best {stat.bestPct}%</span>
                      <span>Last {stat.lastPct}%</span>
                    </div>
                    <div className="mt-1">
                      <ProgressBar value={stat.bestPct} />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* History */}
      {stats && stats.history.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <HistoryIcon className="h-4 w-4 text-primary" /> Recent attempts
          </h2>
          <ul className="space-y-2">
            {stats.history.slice(0, 10).map((h) => (
              <li
                key={h.id}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-card px-4 py-3 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{h.category_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(h.submitted_at).toLocaleString()} · {h.difficulty} ·{" "}
                    {Math.round(h.time_spent_seconds / 60)} min
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {h.score}/{h.total}
                  </p>
                  <p className="text-xs text-muted-foreground">{h.pct}%</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function StatTile({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
