import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Compass, Map, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
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
  courses: {
    id: string;
    title: string;
    subject: string;
  } | null;
};

function StudentDashboard() {
  const { data: profile } = useQuery({
    queryKey: ["me", "student_profile"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("student_profiles")
        .select("current_class, board, language, school_name")
        .eq("user_id", u.user.id)
        .maybeSingle();
      return data;
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
        .select("id, progress, course_id, courses:course_id (id, title, subject)")
        .eq("user_id", u.user.id)
        .order("enrolled_at", { ascending: false })
        .limit(6);
      return (data ?? []) as unknown as EnrolledTile[];
    },
    staleTime: 15_000,
  });

  const hasEnrollments = (enrollments?.length ?? 0) > 0;

  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title="Welcome back"
        description={
          profile
            ? `Class ${profile.current_class} · ${BOARD_LABEL[profile.board] ?? profile.board}`
            : "Your personalized learning workspace"
        }
      />

      {hasEnrollments ? (
        <section className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              My Courses
            </h2>
            <Link
              to="/dashboard/student/my-courses"
              className="text-xs font-medium text-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrollments!.map((row) => {
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
                      <span className="text-muted-foreground">
                        {isDone ? "Completed" : "Progress"}
                      </span>
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
        </section>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <EmptyCard
            icon={<BookOpen className="h-5 w-5" />}
            title="My Courses"
            description="You haven't enrolled in any courses yet. Browse the catalog to get started."
            cta="Browse courses"
            to="/dashboard/student/browse"
          />
          <EmptyCard
            icon={<Map className="h-5 w-5" />}
            title="Learning Roadmap"
            description="Your roadmap will be generated as you enroll in courses and set goals."
            cta="Start a course"
            to="/dashboard/student/browse"
          />
          <EmptyCard
            icon={<Sparkles className="h-5 w-5" />}
            title="Nova AI Assistant"
            description="Ask academic questions, get concept explanations, and plan your studies."
            cta="Open AI Chat"
            to="/dashboard/student/ai-chat"
          />
        </div>
      )}

      {!hasEnrollments && (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
          <Compass className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-semibold">Nothing to track yet</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Enroll in your first course to see progress, weekly assignments, and quiz activity here.
          </p>
        </div>
      )}
    </RoleGate>
  );
}

function EmptyCard({
  icon,
  title,
  description,
  cta,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  to: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <Link
        to={to}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {cta} →
      </Link>
    </div>
  );
}
