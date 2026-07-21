import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CalendarDays, Flame, Target, TrendingUp } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section, ProgressBar } from "@/components/courses/CourseUI";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_dashboard/dashboard/student/study-plan")({
  head: () => ({
    meta: [
      { title: "Study Plan — EduNova AI" },
      {
        name: "description",
        content:
          "Set a weekly learning goal, watch your streak grow with every lesson you finish, and stay on track.",
      },
      { property: "og:title", content: "Study Plan — EduNova AI" },
      {
        property: "og:description",
        content: "Weekly goals and a learning streak driven by the lessons you complete.",
      },
    ],
  }),
  component: StudyPlanPage,
});

function startOfWeek(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  const day = x.getDay(); // 0 = Sunday
  const diff = (day + 6) % 7; // ISO-ish: week starts Monday
  x.setDate(x.getDate() - diff);
  return x;
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function computeStreak(days: Set<string>): number {
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Allow streak to hold if today isn't yet done but yesterday was.
  const start = new Date(today);
  if (!days.has(ymd(today))) start.setDate(start.getDate() - 1);
  const cursor = new Date(start);
  while (days.has(ymd(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function StudyPlanPage() {
  const [goal, setGoal] = useState(5);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("study-plan:weekly-goal");
      if (raw) setGoal(Math.max(1, Math.min(50, parseInt(raw, 10) || 5)));
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem("study-plan:weekly-goal", String(goal));
    } catch {
      /* ignore */
    }
  }, [goal]);

  const { data, isLoading } = useQuery({
    queryKey: ["me", "streak"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const since = new Date();
      since.setDate(since.getDate() - 90);
      const { data: rows } = await supabase
        .from("lesson_progress")
        .select("completed_at, lesson_id")
        .eq("user_id", u.user.id)
        .gte("completed_at", since.toISOString())
        .order("completed_at", { ascending: false });
      const list = ((rows ?? []) as unknown as { completed_at: string; lesson_id: string }[]).filter(
        (r) => !!r.completed_at,
      );
      const days = new Set<string>();
      for (const r of list) days.add(r.completed_at.slice(0, 10));

      const weekStart = startOfWeek(new Date());
      const thisWeek = list.filter((r) => new Date(r.completed_at) >= weekStart);
      // Build 7-day buckets (Mon..Sun).
      const week: { label: string; date: string; count: number }[] = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        const key = ymd(d);
        week.push({
          label: d.toLocaleDateString(undefined, { weekday: "short" }),
          date: key,
          count: list.filter((r) => r.completed_at.slice(0, 10) === key).length,
        });
      }
      return {
        streak: computeStreak(days),
        thisWeekTotal: thisWeek.length,
        allTime: list.length,
        activeDays: days.size,
        week,
      };
    },
    staleTime: 30_000,
  });

  const done = data?.thisWeekTotal ?? 0;
  const goalPct = Math.round((done / Math.max(1, goal)) * 100);
  const maxDay = Math.max(1, ...(data?.week?.map((w) => w.count) ?? [0]));

  return (
    <RoleGate allow={["student", "college_student", "professional"]}>
      <DashboardHeader
        title="Study Plan"
        description="Set a weekly goal, build a streak, and let completed lessons do the work."
        actions={
          <Link to="/dashboard/student/my-courses">
            <Button variant="outline">Go to My Courses</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Flame className="h-4 w-4 text-orange-500" /> Current streak
          </div>
          <p className="mt-2 text-3xl font-bold">{data?.streak ?? 0} <span className="text-base font-medium text-muted-foreground">days</span></p>
          <p className="mt-1 text-xs text-muted-foreground">
            Finish a lesson today to keep it alive.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Target className="h-4 w-4 text-primary" /> This week
          </div>
          <p className="mt-2 text-3xl font-bold">
            {done} <span className="text-base font-medium text-muted-foreground">/ {goal} lessons</span>
          </p>
          <div className="mt-3">
            <ProgressBar value={goalPct} />
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-emerald-500" /> All time
          </div>
          <p className="mt-2 text-3xl font-bold">{data?.allTime ?? 0}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Across {data?.activeDays ?? 0} active days.
          </p>
        </div>
      </div>

      <Section
        title="Weekly goal"
        description="Choose how many lessons you want to finish each week. Progress updates automatically when you mark a lesson complete."
      >
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="goal" className="text-sm font-medium">
            Lessons per week
          </label>
          <Input
            id="goal"
            type="number"
            min={1}
            max={50}
            value={goal}
            onChange={(e) => setGoal(Math.max(1, Math.min(50, parseInt(e.target.value, 10) || 1)))}
            className="w-28"
          />
          <span className="text-xs text-muted-foreground">
            {done >= goal
              ? "Weekly goal reached — nice work."
              : `${goal - done} to go this week.`}
          </span>
        </div>
      </Section>

      <Section
        title="This week"
        description="Lessons you completed each day."
      >
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {(data?.week ?? []).map((d) => {
              const h = Math.round((d.count / maxDay) * 100);
              const isToday = d.date === ymd(new Date());
              return (
                <div key={d.date} className="flex flex-col items-center gap-2">
                  <div className="flex h-28 w-full items-end overflow-hidden rounded-lg bg-muted/50">
                    <div
                      className="w-full rounded-lg bg-primary transition-all"
                      style={{ height: `${d.count > 0 ? Math.max(h, 12) : 0}%` }}
                    />
                  </div>
                  <div className={`text-[11px] font-medium ${isToday ? "text-primary" : "text-muted-foreground"}`}>
                    {d.label}
                  </div>
                  <div className="text-xs font-semibold">{d.count}</div>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      <Section
        title="How the streak works"
        description="One completed lesson keeps today green. Miss a day and the streak resets."
      >
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 h-4 w-4 text-primary" />
            Marking a lesson complete counts toward today, your weekly goal, and your streak.
          </li>
          <li className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 h-4 w-4 text-primary" />
            Course progress on My Courses updates automatically after each lesson.
          </li>
        </ul>
      </Section>
    </RoleGate>
  );
}
