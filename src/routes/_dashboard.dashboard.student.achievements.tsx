import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Section, ProgressBar, Badge } from "@/components/courses/CourseUI";
import { supabase } from "@/integrations/supabase/client";
import {
  computeAchievements,
  countWeeklyGoalsMet,
  currentStreakFromDays,
  TIER_STYLE,
  type AchievementProgress,
} from "@/lib/achievements";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/dashboard/student/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — EduNova AI" },
      {
        name: "description",
        content:
          "Unlock badges for learning streaks, completed lessons, and weekly goals you hit on EduNova AI.",
      },
      { property: "og:title", content: "Achievements — EduNova AI" },
      {
        property: "og:description",
        content: "Streak, lesson, and weekly-goal badges that unlock as you learn.",
      },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const [goal, setGoal] = useState(5);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("study-plan:weekly-goal");
      if (raw) setGoal(Math.max(1, Math.min(50, parseInt(raw, 10) || 5)));
    } catch {
      /* ignore */
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["me", "achievements", goal],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data: rows } = await supabase
        .from("lesson_progress")
        .select("completed_at, lesson_id")
        .eq("user_id", u.user.id)
        .order("completed_at", { ascending: false });
      const list = ((rows ?? []) as unknown as { completed_at: string | null }[]).filter(
        (r) => !!r.completed_at,
      ) as { completed_at: string }[];
      const days = new Set<string>();
      const dayCounts: Record<string, number> = {};
      for (const r of list) {
        const key = r.completed_at.slice(0, 10);
        days.add(key);
        dayCounts[key] = (dayCounts[key] ?? 0) + 1;
      }
      return {
        totalLessons: list.length,
        currentStreak: currentStreakFromDays(days),
        weeklyGoalsMet: countWeeklyGoalsMet(dayCounts, goal),
      };
    },
    staleTime: 30_000,
  });

  const stats = data ?? { totalLessons: 0, currentStreak: 0, weeklyGoalsMet: 0 };
  const items = computeAchievements(stats);
  const unlocked = items.filter((i) => i.unlocked);
  const inProgress = items.filter((i) => !i.unlocked);

  return (
    <RoleGate allow={["student", "college_student", "professional"]}>
      <DashboardHeader
        title="Achievements"
        description="Rewards unlock automatically as you complete lessons, build streaks, and hit weekly goals."
        actions={
          <Link to="/dashboard/student/study-plan">
            <Button variant="outline">Study Plan</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Badges unlocked" value={`${unlocked.length} / ${items.length}`} />
        <StatCard label="Current streak" value={`${stats.currentStreak} days`} />
        <StatCard label="Weekly goals met" value={`${stats.weeklyGoalsMet}`} />
      </div>

      <Section
        title="Unlocked"
        description={unlocked.length ? "Nicely done. Keep going to unlock more." : "None yet — finish a lesson to earn your first badge."}
      >
        {unlocked.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {unlocked.map((a) => (
              <BadgeCard key={a.achievement.id} item={a} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading…" : "Your first badge is one lesson away."}
          </p>
        )}
      </Section>

      <Section
        title="In progress"
        description="Track how close you are to the next reward."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {inProgress.map((a) => (
            <BadgeCard key={a.achievement.id} item={a} />
          ))}
        </div>
      </Section>
    </RoleGate>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function BadgeCard({ item }: { item: AchievementProgress }) {
  const { achievement: a, current, unlocked, percent } = item;
  const style = TIER_STYLE[a.tier];
  const Icon = a.icon;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60 bg-card p-4 shadow-card transition",
        unlocked ? "ring-1 " + style.ring : "opacity-90",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            style.bg,
            unlocked ? style.text : "text-muted-foreground",
          )}
        >
          {unlocked ? <Icon className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold">{a.title}</p>
            <Badge tone={unlocked ? "success" : "muted"}>{style.label}</Badge>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{a.description}</p>
        </div>
      </div>
      <div className="mt-3">
        <ProgressBar value={percent} />
        <p className="mt-1 text-[11px] text-muted-foreground">
          {Math.min(current, a.threshold)} / {a.threshold}
          {unlocked ? " · Unlocked" : ""}
        </p>
      </div>
    </div>
  );
}
