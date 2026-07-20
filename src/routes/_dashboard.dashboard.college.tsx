import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Sparkles,
  Target,
  Compass,
  PlayCircle,
  CheckCircle2,
  Rocket,
  Code2,
  Briefcase,
  Award,
  BarChart3,
  GraduationCap,
} from "lucide-react";
import { DashboardHeader, StatCard } from "@/components/dashboard/DashboardShared";
import {
  SectionHeader,
  DashCard,
  EmptyState,
  QuickActionsGrid,
} from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import { ProgressBar } from "@/components/courses/CourseUI";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_dashboard/dashboard/college")({
  component: CollegeDashboard,
});

type EnrolledTile = {
  id: string;
  progress: number;
  course_id: string;
  updated_at: string;
  courses: { id: string; title: string; subject: string; difficulty?: string } | null;
};

function CollegeDashboard() {
  const { data: profile } = useQuery({
    queryKey: ["me", "profile-mini"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", u.user.id)
        .maybeSingle();
      return data as { full_name?: string | null } | null;
    },
    staleTime: 60_000,
  });

  const { data: enrollments } = useQuery({
    queryKey: ["me", "enrollments", "college-tiles"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [];
      const { data } = await supabase
        .from("course_enrollments")
        .select("id, progress, course_id, updated_at, courses:course_id (id, title, subject, difficulty)")
        .eq("user_id", u.user.id)
        .order("updated_at", { ascending: false })
        .limit(8);
      return (data ?? []) as unknown as EnrolledTile[];
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

  const firstName = (profile?.full_name ?? "").split(" ")[0];

  return (
    <RoleGate allow={["college_student"]}>
      <DashboardHeader
        title={firstName ? `Welcome, ${firstName}` : "Welcome"}
        description="Your college workspace — courses, projects and placement prep."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Enrolled" value={enrolled.length} icon={<BookOpen className="h-4 w-4" />} />
        <StatCard label="In progress" value={inProgress.length} icon={<PlayCircle className="h-4 w-4" />} />
        <StatCard label="Completed" value={completedCount} icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard label="Avg. progress" value={`${avgProgress}%`} icon={<BarChart3 className="h-4 w-4" />} />
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
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.subject}</p>
                  <h3 className="mt-1 line-clamp-2 text-base font-semibold">{c.title}</h3>
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{isDone ? "Completed" : "Progress"}</span>
                      <span className="font-semibold text-primary">{row.progress ?? 0}%</span>
                    </div>
                    <ProgressBar value={row.progress ?? 0} />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={<Compass className="h-5 w-5" />}
            title="Explore your first course"
            description="Browse curated tracks for engineering, humanities, and post-grad research."
            action={{ to: "/dashboard/student/browse", label: "Browse catalog" }}
          />
        )}
      </section>

      <section>
        <SectionHeader title="Quick actions" />
        <QuickActionsGrid
          items={[
            {
              to: "/dashboard/upskilling",
              label: "Upskilling Hub",
              description: "GenAI, cloud, front-end, data — job-ready tracks",
              icon: <Rocket className="h-5 w-5" />,
            },
            {
              to: "/dashboard/student/browse",
              label: "Browse catalog",
              description: "College-level subjects and specialisations",
              icon: <Compass className="h-5 w-5" />,
            },
            {
              to: "/dashboard/mock-tests",
              label: "Mock Tests",
              description: "Placement, aptitude and coding practice",
              icon: <Target className="h-5 w-5" />,
            },
            {
              to: "/dashboard/student/quizzes",
              label: "AI Quizzes",
              description: "Fresh questions across core subjects",
              icon: <Sparkles className="h-5 w-5" />,
            },
            {
              to: "/dashboard/student/progress",
              label: "Progress Tracker",
              description: "Skills, streaks and study hours",
              icon: <BarChart3 className="h-5 w-5" />,
            },
            {
              to: "/dashboard/ai-assistant",
              label: "Nova AI Mentor",
              description: "Career, projects and study help",
              icon: <GraduationCap className="h-5 w-5" />,
            },
            {
              to: "/dashboard/upskilling",
              label: "Coding Practice",
              description: "DSA, algorithms and interview prep",
              icon: <Code2 className="h-5 w-5" />,
            },
            {
              to: "/dashboard/profile",
              label: "Resume & Career",
              description: "Portfolio, resume and career recs (coming soon)",
              icon: <Briefcase className="h-5 w-5" />,
            },
            {
              to: "/dashboard/student/my-courses",
              label: "Achievements",
              description: "Milestones and completions",
              icon: <Award className="h-5 w-5" />,
            },
          ]}
        />
      </section>
    </RoleGate>
  );
}
