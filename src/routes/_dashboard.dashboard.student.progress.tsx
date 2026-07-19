import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  Clock,
  Flame,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { DashboardHeader, StatCard } from "@/components/dashboard/DashboardShared";
import { DashCard, SectionHeader, EmptyState } from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import { getWeeklyProgress } from "@/lib/ai/weekly-assessments.functions";

export const Route = createFileRoute("/_dashboard/dashboard/student/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const get = useServerFn(getWeeklyProgress);
  const { data, isLoading } = useQuery({
    queryKey: ["me", "weekly-progress"],
    queryFn: () => get(),
    staleTime: 30_000,
  });

  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title="Weekly Progress"
        description="Study hours, streaks, assessments and performance for the last 4 weeks."
      />

      {isLoading || !data ? (
        <EmptyState title="Crunching your numbers…" description="Loading weekly progress." />
      ) : (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Study this week"
              value={`${data.totalHoursThisWeek}h`}
              hint="Logged study time"
              icon={<Clock className="h-4 w-4" />}
            />
            <StatCard
              label="Lessons this week"
              value={data.lessonsThisWeek}
              icon={<CheckCircle2 className="h-4 w-4" />}
            />
            <StatCard
              label="Assessment avg."
              value={`${data.assessmentAveragePct}%`}
              hint="Last 4 weeks"
              icon={<Target className="h-4 w-4" />}
            />
            <StatCard
              label="Streak"
              value={`${data.streak}d`}
              hint="Consecutive active days"
              icon={<Flame className="h-4 w-4" />}
            />
          </div>

          <section className="mb-8 grid gap-6 lg:grid-cols-2">
            <div>
              <SectionHeader title="Study hours" hint="Last 4 weeks" />
              <DashCard>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.weeks}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="label" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashCard>
            </div>
            <div>
              <SectionHeader title="Lessons & assessments" hint="Weekly activity" />
              <DashCard>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={data.weeks}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="label" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Line type="monotone" dataKey="lessons" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="assessments" stroke="hsl(var(--muted-foreground))" strokeWidth={2} />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </DashCard>
            </div>
          </section>

          <section className="mb-8">
            <SectionHeader title="Performance by category" hint="Weekly assessments" />
            {data.categoryPerformance.length === 0 ? (
              <EmptyState
                icon={<TrendingUp className="h-5 w-5" />}
                title="No assessment data yet"
                description="Take a weekly assessment to see category-wise performance."
              />
            ) : (
              <DashCard>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.categoryPerformance}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="label" fontSize={12} />
                      <YAxis fontSize={12} domain={[0, 100]} />
                      <Tooltip formatter={(v: number) => `${v}%`} />
                      <Bar dataKey="pct" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DashCard>
            )}
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <DashCard>
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Strong areas</h3>
              </div>
              {data.strong.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Take more assessments to reveal your strongest categories.
                </p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {data.strong.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" /> {s}
                    </li>
                  ))}
                </ul>
              )}
            </DashCard>
            <DashCard>
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Focus areas</h3>
              </div>
              {data.weak.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No weak spots detected yet — keep it up!
                </p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {data.weak.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500" /> {s}
                    </li>
                  ))}
                </ul>
              )}
            </DashCard>
          </section>
        </>
      )}
    </RoleGate>
  );
}
