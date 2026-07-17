import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Brain, Flame, Trophy, TrendingUp, Sparkles, PlayCircle } from "lucide-react";
import { getDailyQuizStats } from "@/lib/ai/daily-quiz.functions";
import { DashCard, SectionHeader } from "@/components/dashboard/DashboardWidgets";
import { ProgressBar } from "@/components/courses/CourseUI";

export function AIDailyQuizWidget() {
  const fetchStats = useServerFn(getDailyQuizStats);
  const { data } = useQuery({
    queryKey: ["daily-quiz", "stats"],
    queryFn: () => fetchStats({ data: undefined }),
    staleTime: 30_000,
  });

  const stats = data;
  const todayDone = stats?.todayAttempted ?? false;

  return (
    <section className="mb-8">
      <SectionHeader
        title="AI Daily Quiz"
        hint="Fresh AI-generated practice every day"
        action={{ to: "/dashboard/student/daily-quiz", label: todayDone ? "Review" : "Start" }}
      />
      <DashCard className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Brain className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Today's Quiz · ~30 questions
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                {todayDone ? "You've completed today's quiz" : "Sharpen your mind with a fresh AI quiz"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Personalized across 17 categories — GK, Science, Reasoning, Programming and more.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/dashboard/student/daily-quiz"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-primary/90"
                >
                  {todayDone ? (
                    <>
                      <Sparkles className="h-4 w-4" /> View insights
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4" /> Start today's quiz
                    </>
                  )}
                </Link>
                {stats && stats.totalAttempts > 0 && (
                  <Link
                    to="/dashboard/student/daily-quiz"
                    search={{ view: "history" }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-card px-4 py-2 text-sm font-medium hover:border-primary/40"
                  >
                    Quiz history
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-3 gap-3 lg:w-auto lg:min-w-[380px]">
            <MiniStat
              icon={<Flame className="h-4 w-4" />}
              label="Streak"
              value={`${stats?.currentStreak ?? 0}d`}
            />
            <MiniStat
              icon={<Trophy className="h-4 w-4" />}
              label="Best"
              value={`${Math.round(stats?.bestScorePct ?? 0)}%`}
            />
            <MiniStat
              icon={<TrendingUp className="h-4 w-4" />}
              label="Weekly"
              value={`${Math.round(stats?.weeklyAveragePct ?? 0)}%`}
            />
          </div>
        </div>
        {stats && stats.totalAttempts > 0 && (
          <div className="relative mt-6 grid gap-4 border-t border-border/60 pt-5 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Weekly progress
              </p>
              <ProgressBar value={Math.min(100, stats.weeklyAveragePct)} />
              <p className="mt-1 text-xs text-muted-foreground">
                {stats.attemptsThisWeek} attempt{stats.attemptsThisWeek === 1 ? "" : "s"} this week
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InsightList label="Strengths" items={stats.aggregateStrengths} tone="pos" />
              <InsightList label="Focus on" items={stats.aggregateWeaknesses} tone="neg" />
            </div>
          </div>
        )}
      </DashCard>
    </section>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}

function InsightList({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "pos" | "neg";
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground/70">Not enough data yet</p>
      ) : (
        <ul className="flex flex-wrap gap-1.5">
          {items.map((it) => (
            <li
              key={it}
              className={
                "rounded-full px-2 py-0.5 text-[11px] font-medium " +
                (tone === "pos"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400")
              }
            >
              {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
