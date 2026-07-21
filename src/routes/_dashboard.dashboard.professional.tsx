import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  BookOpen,
  TrendingUp,
  Target,
  Sparkles,
  Map,
  PlayCircle,
  CheckCircle2,
  Award,
  Compass,
} from "lucide-react";
import { DashboardHeader, StatCard } from "@/components/dashboard/DashboardShared";
import { AIBriefSections } from "@/components/dashboard/AIBriefSections";
import {
  SectionHeader,
  DashCard,
  EmptyState,
  QuickActionsGrid,
  NotificationsPanel,
  type NotificationItem,
} from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import { ProgressBar } from "@/components/courses/CourseUI";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_dashboard/dashboard/professional")({
  component: ProfessionalDashboard,
});

type EnrolledTile = {
  id: string;
  progress: number;
  course_id: string;
  updated_at: string;
  courses: { id: string; title: string; subject: string; difficulty: string } | null;
};

const ROADMAP_STEPS = [
  {
    title: "Foundations",
    description: "Strengthen core concepts and refresh fundamentals.",
    icon: BookOpen,
  },
  {
    title: "Specialization",
    description: "Go deep in your chosen upskilling track.",
    icon: Target,
  },
  {
    title: "Applied projects",
    description: "Reinforce learning with practice and case studies.",
    icon: Briefcase,
  },
  {
    title: "Mastery",
    description: "Track progress and consolidate real-world skills.",
    icon: Award,
  },
];

function ProfessionalDashboard() {
  const { data: profile } = useQuery({
    queryKey: ["me", "prof-profile"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", u.user.id)
        .maybeSingle();
      return data;
    },
    staleTime: 60_000,
  });

  const { data: enrollments } = useQuery({
    queryKey: ["me", "prof-enrollments"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [];
      const { data } = await supabase
        .from("course_enrollments")
        .select(
          "id, progress, course_id, updated_at, courses:course_id (id, title, subject, difficulty)",
        )
        .eq("user_id", u.user.id)
        .order("updated_at", { ascending: false })
        .limit(8);
      return (data ?? []) as unknown as EnrolledTile[];
    },
    staleTime: 15_000,
  });

  const { data: recommendations } = useQuery({
    queryKey: ["prof", "recommendations"],
    queryFn: async () => {
      const { data } = await supabase
        .from("courses")
        .select("id, title, subject, difficulty, estimated_hours")
        .eq("is_published", true)
        .in("difficulty", ["intermediate", "advanced"] as never[])
        .limit(6);
      return data ?? [];
    },
    staleTime: 60_000,
  });

  const enrolled = enrollments ?? [];
  const inProgress = enrolled.filter((e) => (e.progress ?? 0) < 100);
  const completed = enrolled.filter((e) => (e.progress ?? 0) >= 100).length;
  const continueLearning = inProgress[0];
  const avgProgress =
    inProgress.length > 0
      ? Math.round(inProgress.reduce((a, e) => a + (e.progress ?? 0), 0) / inProgress.length)
      : 0;

  const firstName = (profile?.full_name ?? "").split(" ")[0];

  const notifications: NotificationItem[] = [];
  if (continueLearning?.courses) {
    notifications.push({
      id: "cont",
      title: `Resume ${continueLearning.courses.title}`,
      time: "Just now",
      tone: "info",
    });
  }
  if (completed > 0) {
    notifications.push({
      id: "milestone",
      title: `${completed} course${completed === 1 ? "" : "s"} completed — keep the momentum`,
      time: "This month",
      tone: "success",
    });
  }

  const enrolledIds = new Set(enrolled.map((e) => e.course_id));
  const filteredRecs = (recommendations ?? []).filter((r) => !enrolledIds.has(r.id)).slice(0, 4);

  return (
    <RoleGate allow={["professional"]}>
      <DashboardHeader
        eyebrow="Working Professional Dashboard"
        title={firstName ? `Welcome back, ${firstName}` : "Professional workspace"}
        description="Career growth and upskilling paths powered by Nova AI."
      />

      <div className="mb-10">
        <AIBriefSections role="professional" />
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active paths" value={inProgress.length} icon={<Briefcase className="h-4 w-4" />} />
        <StatCard label="Courses completed" value={completed} icon={<BookOpen className="h-4 w-4" />} />
        <StatCard
          label="Avg. progress"
          value={`${avgProgress}%`}
          hint="Active tracks"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard label="Weekly goal" value={inProgress.length > 0 ? "On track" : "Set a goal"} icon={<Target className="h-4 w-4" />} />
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
                {continueLearning.courses.subject} · {continueLearning.courses.difficulty}
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
        <SectionHeader title="Enrolled courses" />
        {enrolled.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrolled.slice(0, 6).map((row) => {
              const c = row.courses;
              if (!c) return null;
              const done = (row.progress ?? 0) >= 100;
              return (
                <Link
                  key={row.id}
                  to="/dashboard/student/courses/$courseId"
                  params={{ courseId: c.id }}
                  className="block rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:border-primary/40"
                >
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    {done ? <CheckCircle2 className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {c.subject} · {c.difficulty}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-base font-semibold">{c.title}</h3>
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{done ? "Completed" : "Progress"}</span>
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
            title="No enrollments yet"
            description="Browse upskilling courses and enroll to start building your track."
            action={{ to: "/dashboard/student/browse", label: "Browse courses" }}
          />
        )}
      </section>

      <section className="mb-8">
        <SectionHeader title="Upskilling recommendations" hint="Intermediate & advanced picks" />
        {filteredRecs.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredRecs.map((r) => (
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
                <p className="mt-3 text-xs text-muted-foreground capitalize">
                  {r.difficulty}
                  {r.estimated_hours ? ` · ${r.estimated_hours}h` : ""}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState title="No new recommendations right now" description="Explore the catalog for more courses." action={{ to: "/dashboard/student/browse", label: "Browse" }} />
        )}
      </section>

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeader title="Career roadmap" hint="A guided path to mastery" />
          <DashCard>
            <ol className="grid gap-4 sm:grid-cols-2">
              {ROADMAP_STEPS.map((step, i) => {
                const Icon = step.icon;
                const active = i === Math.min(ROADMAP_STEPS.length - 1, Math.floor((avgProgress / 100) * ROADMAP_STEPS.length));
                return (
                  <li
                    key={step.title}
                    className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/50 p-3"
                  >
                    <span
                      className={
                        "grid h-9 w-9 shrink-0 place-items-center rounded-lg " +
                        (active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")
                      }
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        Step {i + 1}. {step.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </DashCard>
        </div>
        <div>
          <SectionHeader title="Notifications" />
          <NotificationsPanel items={notifications} />
        </div>
      </div>

      <section className="mb-8">
        <SectionHeader title="AI Career Assistant" />
        <DashCard className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold">Ask Nova about your career path</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Get personalized guidance on courses, skills gaps, and next steps in your professional journey.
            </p>
          </div>
          <Link
            to="/dashboard/ai-assistant"
            className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-primary/90"
          >
            Open assistant →
          </Link>
        </DashCard>
      </section>

      <section>
        <SectionHeader title="Quick actions" />
        <QuickActionsGrid
          items={[
            {
              to: "/dashboard/student/browse",
              label: "Browse courses",
              description: "Discover upskilling programs",
              icon: <Compass className="h-5 w-5" />,
            },
            {
              to: "/dashboard/student/my-courses",
              label: "My courses",
              description: "Track your active learning",
              icon: <BookOpen className="h-5 w-5" />,
            },
            {
              to: "/dashboard/ai-assistant",
              label: "Career assistant",
              description: "Nova AI helps plan your growth",
              icon: <Sparkles className="h-5 w-5" />,
            },
            {
              to: "/dashboard/profile",
              label: "Profile",
              description: "Update your goals & role",
              icon: <Map className="h-5 w-5" />,
            },
          ]}
        />
      </section>
    </RoleGate>
  );
}
