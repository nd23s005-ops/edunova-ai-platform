import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Compass,
  Sparkles,
  Target,
  ClipboardList,
  Bell,
  CheckCircle2,
  PlayCircle,
  BarChart3,
  GraduationCap,
} from "lucide-react";
import { DashboardHeader, StatCard } from "@/components/dashboard/DashboardShared";
import {
  SectionHeader,
  DashCard,
  EmptyState,
  QuickActionsGrid,
  NotificationsPanel,
  ActivityFeed,
  type NotificationItem,
  type ActivityItem,
} from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import { ProgressBar } from "@/components/courses/CourseUI";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_dashboard/dashboard/student")({
  component: StudentDashboard,
});

const BOARD_LABEL: Record<string, string> = {
  state_board: "State Board",
  cbse: "CBSE",
  icse: "ICSE",
  cambridge: "Cambridge",
  ib: "IB",
  nios: "NIOS",
  other: "Other",
};

type EnrolledTile = {
  id: string;
  progress: number;
  course_id: string;
  updated_at: string;
  courses: { id: string; title: string; subject: string; board: string; class_min: number; class_max: number } | null;
};

type RecommendedCourse = {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
};

function StudentDashboard() {
  const { data: profile } = useQuery({
    queryKey: ["me", "student_profile"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const [{ data: p }, { data: sp }] = await Promise.all([
        supabase.from("profiles").select("full_name").eq("id", u.user.id).maybeSingle(),
        supabase
          .from("student_profiles")
          .select("current_class, board, school_name")
          .eq("user_id", u.user.id)
          .maybeSingle(),
      ]);
      return { ...p, ...sp } as {
        full_name?: string | null;
        current_class?: number | null;
        board?: string | null;
        school_name?: string | null;
      };
    },
    staleTime: 60_000,
  });

  const { data: enrollments } = useQuery({
    queryKey: ["me", "enrollments", "tiles"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [];
      const { data } = await supabase
        .from("course_enrollments")
        .select(
          "id, progress, course_id, updated_at, courses:course_id (id, title, subject, board, class_min, class_max)",
        )
        .eq("user_id", u.user.id)
        .order("updated_at", { ascending: false })
        .limit(8);
      return (data ?? []) as unknown as EnrolledTile[];
    },
    staleTime: 15_000,
  });

  const { data: recentActivity } = useQuery({
    queryKey: ["me", "recent-activity"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [] as ActivityItem[];
      const [lp, qa, sub] = await Promise.all([
        supabase
          .from("lesson_progress")
          .select("id, lesson_id, completed_at, lessons:lesson_id ( title )")
          .eq("user_id", u.user.id)
          .order("completed_at", { ascending: false })
          .limit(5),
        supabase
          .from("quiz_attempts")
          .select("id, score, max_score, submitted_at, quizzes:quiz_id ( title )")
          .eq("user_id", u.user.id)
          .not("submitted_at", "is", null)
          .order("submitted_at", { ascending: false })
          .limit(5),
        supabase
          .from("assignment_submissions")
          .select("id, status, updated_at, assignments:assignment_id ( title )")
          .eq("user_id", u.user.id)
          .order("updated_at", { ascending: false })
          .limit(5),
      ]);
      const items: ActivityItem[] = [];
      for (const r of lp.data ?? []) {
        const t = (r as unknown as { lessons?: { title?: string } }).lessons?.title ?? "Lesson";
        items.push({
          id: `lp-${r.id}`,
          title: `Completed lesson · ${t}`,
          time: fmt(r.completed_at as string | null),
          icon: <CheckCircle2 className="h-4 w-4" />,
        });
      }
      for (const r of qa.data ?? []) {
        const t = (r as unknown as { quizzes?: { title?: string } }).quizzes?.title ?? "Quiz";
        items.push({
          id: `qa-${r.id}`,
          title: `Quiz submitted · ${t}`,
          meta: r.score != null && r.max_score ? `Score ${r.score}/${r.max_score}` : undefined,
          time: fmt(r.submitted_at as string | null),
          icon: <Target className="h-4 w-4" />,
        });
      }
      for (const r of sub.data ?? []) {
        const t = (r as unknown as { assignments?: { title?: string } }).assignments?.title ?? "Assignment";
        items.push({
          id: `sub-${r.id}`,
          title: `Assignment ${r.status} · ${t}`,
          time: fmt(r.updated_at as string | null),
          icon: <ClipboardList className="h-4 w-4" />,
        });
      }
      return items
        .sort((a, b) => (a.time < b.time ? 1 : -1))
        .slice(0, 6);
    },
    staleTime: 15_000,
  });

  const enrolled = enrollments ?? [];
  const inProgress = enrolled.filter((e) => (e.progress ?? 0) < 100);
  const completedCount = enrolled.filter((e) => (e.progress ?? 0) >= 100).length;
  const continueLearning = inProgress[0];
  const avgProgress =
    inProgress.length > 0
      ? Math.round(inProgress.reduce((a, e) => a + (e.progress ?? 0), 0) / inProgress.length)
      : 0;

  const { data: recommendations } = useQuery({
    queryKey: ["me", "recommendations", profile?.board, profile?.current_class],
    queryFn: async () => {
      if (!profile?.board || !profile?.current_class) return [] as RecommendedCourse[];
      const enrolledIds = new Set(enrolled.map((e) => e.course_id));
      const { data } = await supabase
        .from("courses")
        .select("id, title, subject, difficulty")
        .eq("is_published", true)
        .eq("board", profile.board)
        .lte("class_min", profile.current_class)
        .gte("class_max", profile.current_class)
        .limit(12);
      return ((data ?? []) as RecommendedCourse[]).filter((c) => !enrolledIds.has(c.id)).slice(0, 4);
    },
    enabled: !!profile,
    staleTime: 60_000,
  });

  const notifications: NotificationItem[] = [];
  if (continueLearning?.courses) {
    notifications.push({
      id: "cont",
      title: `Pick up where you left off in ${continueLearning.courses.title}`,
      time: "Just now",
      tone: "info",
    });
  }
  if (completedCount > 0) {
    notifications.push({
      id: "done",
      title: `You've completed ${completedCount} course${completedCount === 1 ? "" : "s"} — great work!`,
      time: "This week",
      tone: "success",
    });
  }

  const firstName = (profile?.full_name ?? "").split(" ")[0];

  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title={firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        description={
          profile?.current_class
            ? `Class ${profile.current_class} · ${BOARD_LABEL[profile.board ?? ""] ?? profile.board ?? ""}`
            : "Your personalized learning workspace"
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Enrolled" value={enrolled.length} icon={<BookOpen className="h-4 w-4" />} />
        <StatCard label="In progress" value={inProgress.length} icon={<PlayCircle className="h-4 w-4" />} />
        <StatCard label="Completed" value={completedCount} icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard
          label="Avg. progress"
          value={`${avgProgress}%`}
          hint="Active courses"
          icon={<BarChart3 className="h-4 w-4" />}
        />
      </div>

      {continueLearning?.courses && (
        <section className="mb-8">
          <SectionHeader title="Continue learning" />
          <DashCard className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <PlayCircle className="h-7 w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {continueLearning.courses.subject}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{continueLearning.courses.title}</h3>
              <div className="mt-3 max-w-md">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-primary">{continueLearning.progress ?? 0}%</span>
                </div>
                <ProgressBar value={continueLearning.progress ?? 0} />
              </div>
            </div>
            <Link
              to="/dashboard/student/courses/$courseId"
              params={{ courseId: continueLearning.courses.id }}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-primary/90"
            >
              Resume →
            </Link>
          </DashCard>
        </section>
      )}

      <section className="mb-8">
        <SectionHeader
          title="My courses"
          action={enrolled.length > 0 ? { to: "/dashboard/student/my-courses", label: "View all" } : undefined}
        />
        {enrolled.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrolled.slice(0, 6).map((row) => {
              const c = row.courses;
              if (!c) return null;
              const isDone = (row.progress ?? 0) >= 100;
              return (
                <Link
                  key={row.id}
                  to="/dashboard/student/courses/$courseId"
                  params={{ courseId: c.id }}
                  className="block rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:border-primary/40"
                >
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {c.subject}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-base font-semibold">{c.title}</h3>
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{isDone ? "Completed" : "Progress"}</span>
                      <span className="font-semibold text-primary">{row.progress ?? 0}%</span>
                    </div>
                    <ProgressBar value={row.progress ?? 0} />
                  </div>
                  <p className="mt-4 text-sm font-medium text-primary">
                    {isDone ? "Review course →" : "Continue →"}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={<Compass className="h-5 w-5" />}
            title="No enrollments yet"
            description="Browse the catalog and enroll to start your learning journey."
            action={{ to: "/dashboard/student/browse", label: "Browse courses" }}
          />
        )}
      </section>

      <section className="mb-8">
        <SectionHeader
          title="Recommended for you"
          hint={profile?.board ? `Curated for ${BOARD_LABEL[profile.board] ?? profile.board}` : undefined}
          action={{ to: "/dashboard/student/browse", label: "Explore" }}
        />
        {recommendations && recommendations.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map((r) => (
              <Link
                key={r.id}
                to="/dashboard/student/courses/$courseId"
                params={{ courseId: r.id }}
                className="block rounded-2xl border border-border/60 bg-card p-4 shadow-card transition hover:border-primary/40"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {r.subject}
                </p>
                <h3 className="mt-1 line-clamp-2 text-sm font-semibold">{r.title}</h3>
                <p className="mt-3 text-xs text-muted-foreground capitalize">{r.difficulty}</p>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Personalized picks are coming"
            description="Complete your profile with a board and class to receive tailored course recommendations."
            action={{ to: "/dashboard/profile", label: "Complete profile" }}
          />
        )}
      </section>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeader title="Recent activity" />
          <ActivityFeed items={recentActivity ?? []} />
        </div>
        <div>
          <SectionHeader title="Notifications" />
          <NotificationsPanel items={notifications} />
        </div>
      </div>

      <section>
        <SectionHeader title="Quick actions" />
        <QuickActionsGrid
          items={[
            {
              to: "/dashboard/student/browse",
              label: "Browse catalog",
              description: "Explore 15+ subjects across boards",
              icon: <Compass className="h-5 w-5" />,
            },
            {
              to: "/dashboard/student/my-courses",
              label: "My courses",
              description: "Resume any of your enrollments",
              icon: <BookOpen className="h-5 w-5" />,
            },
            {
              to: "/dashboard/ai-assistant",
              label: "Nova AI Assistant",
              description: "Ask academic questions anytime",
              icon: <Sparkles className="h-5 w-5" />,
            },
            {
              to: "/dashboard/profile",
              label: "Profile & settings",
              description: "Update board, class and preferences",
              icon: <GraduationCap className="h-5 w-5" />,
            },
          ]}
        />
      </section>
    </RoleGate>
  );
}

function fmt(ts: string | null): string {
  if (!ts) return "";
  const d = new Date(ts);
  const diff = Date.now() - d.getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString();
}

// Unused import guard to satisfy linter when notifications empty
void Bell;
