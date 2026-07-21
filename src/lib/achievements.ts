import { Award, BookOpen, Calendar, Flame, GraduationCap, Medal, Rocket, Sparkles, Star, Target, Trophy, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AchievementTier = "bronze" | "silver" | "gold" | "platinum";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tier: AchievementTier;
  metric: "lessons" | "streak" | "weekly_goals";
  threshold: number;
};

export const TIER_STYLE: Record<AchievementTier, { ring: string; bg: string; text: string; label: string }> = {
  bronze: {
    ring: "ring-amber-700/40",
    bg: "bg-amber-700/10",
    text: "text-amber-700 dark:text-amber-500",
    label: "Bronze",
  },
  silver: {
    ring: "ring-slate-400/50",
    bg: "bg-slate-400/10",
    text: "text-slate-500 dark:text-slate-300",
    label: "Silver",
  },
  gold: {
    ring: "ring-amber-400/60",
    bg: "bg-amber-400/15",
    text: "text-amber-500 dark:text-amber-400",
    label: "Gold",
  },
  platinum: {
    ring: "ring-primary/60",
    bg: "bg-primary/10",
    text: "text-primary",
    label: "Platinum",
  },
};

export const ACHIEVEMENTS: Achievement[] = [
  // Lesson milestones
  { id: "first_lesson", title: "First Step", description: "Complete your first lesson.", icon: Sparkles, tier: "bronze", metric: "lessons", threshold: 1 },
  { id: "learner_10", title: "Curious Mind", description: "Complete 10 lessons.", icon: BookOpen, tier: "bronze", metric: "lessons", threshold: 10 },
  { id: "learner_25", title: "Steady Learner", description: "Complete 25 lessons.", icon: GraduationCap, tier: "silver", metric: "lessons", threshold: 25 },
  { id: "learner_50", title: "Knowledge Seeker", description: "Complete 50 lessons.", icon: Medal, tier: "silver", metric: "lessons", threshold: 50 },
  { id: "learner_100", title: "Scholar", description: "Complete 100 lessons.", icon: Trophy, tier: "gold", metric: "lessons", threshold: 100 },
  { id: "learner_250", title: "Master Scholar", description: "Complete 250 lessons.", icon: Award, tier: "platinum", metric: "lessons", threshold: 250 },

  // Streaks
  { id: "streak_3", title: "Warming Up", description: "3-day learning streak.", icon: Flame, tier: "bronze", metric: "streak", threshold: 3 },
  { id: "streak_7", title: "On Fire", description: "7-day learning streak.", icon: Flame, tier: "silver", metric: "streak", threshold: 7 },
  { id: "streak_14", title: "Blazing", description: "14-day learning streak.", icon: Zap, tier: "silver", metric: "streak", threshold: 14 },
  { id: "streak_30", title: "Unstoppable", description: "30-day learning streak.", icon: Rocket, tier: "gold", metric: "streak", threshold: 30 },
  { id: "streak_60", title: "Legendary", description: "60-day learning streak.", icon: Star, tier: "platinum", metric: "streak", threshold: 60 },

  // Weekly goals
  { id: "weekly_1", title: "Goal Setter", description: "Hit your weekly goal once.", icon: Target, tier: "bronze", metric: "weekly_goals", threshold: 1 },
  { id: "weekly_4", title: "Consistent Achiever", description: "Hit your weekly goal 4 times.", icon: Calendar, tier: "silver", metric: "weekly_goals", threshold: 4 },
  { id: "weekly_12", title: "Season Finisher", description: "Hit your weekly goal 12 times.", icon: Trophy, tier: "gold", metric: "weekly_goals", threshold: 12 },
];

export type AchievementProgress = {
  achievement: Achievement;
  current: number;
  unlocked: boolean;
  percent: number;
};

export type LearnerStats = {
  totalLessons: number;
  currentStreak: number;
  weeklyGoalsMet: number;
};

export function computeAchievements(stats: LearnerStats): AchievementProgress[] {
  return ACHIEVEMENTS.map((a) => {
    const current =
      a.metric === "lessons"
        ? stats.totalLessons
        : a.metric === "streak"
          ? stats.currentStreak
          : stats.weeklyGoalsMet;
    const percent = Math.max(0, Math.min(100, Math.round((current / a.threshold) * 100)));
    return { achievement: a, current, unlocked: current >= a.threshold, percent };
  });
}

/**
 * Given per-day lesson completion counts, count how many ISO-ish weeks
 * (Mon..Sun) hit the weekly goal.
 */
export function countWeeklyGoalsMet(dayCounts: Record<string, number>, goal: number): number {
  const byWeek = new Map<string, number>();
  for (const [date, count] of Object.entries(dayCounts)) {
    const d = new Date(date + "T00:00:00");
    const day = d.getDay();
    const diff = (day + 6) % 7;
    const monday = new Date(d);
    monday.setDate(d.getDate() - diff);
    const key = monday.toISOString().slice(0, 10);
    byWeek.set(key, (byWeek.get(key) ?? 0) + count);
  }
  let met = 0;
  for (const total of byWeek.values()) if (total >= goal) met++;
  return met;
}

export function currentStreakFromDays(days: Set<string>): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ymd = (d: Date) => d.toISOString().slice(0, 10);
  const start = new Date(today);
  if (!days.has(ymd(today))) start.setDate(start.getDate() - 1);
  let streak = 0;
  const cursor = new Date(start);
  while (days.has(ymd(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
