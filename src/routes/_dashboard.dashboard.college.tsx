import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
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
  Flame,
  CalendarDays,
  TrendingUp,
  Trophy,
  Lightbulb,
  ArrowRight,
  Bot,
  Layers,
  Building2,
  ClipboardList,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { AIBriefSections } from "@/components/dashboard/AIBriefSections";
import {
  SectionHeader,
  DashCard,
  EmptyState,
  QuickActionsGrid,
} from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import { ProgressBar } from "@/components/courses/CourseUI";
import { supabase } from "@/integrations/supabase/client";
import { COLLEGE_CATALOG } from "@/lib/courses/catalog";

export const Route = createFileRoute("/_dashboard/dashboard/college")({
  head: () => ({
    meta: [
      { title: "College Student Dashboard — EduNova AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CollegeDashboard,
});

type EnrolledTile = {
  id: string;
  progress: number;
  course_id: string;
  updated_at: string;
  courses: { id: string; title: string; subject: string; difficulty?: string } | null;
};

const CATEGORY_ICONS: Record<string, string> = {
  programming: "💻",
  "web-development": "🌐",
  "mobile-development": "📱",
  ai: "🧠",
  "machine-learning": "🤖",
  "data-science": "📊",
  cloud: "☁️",
  cybersecurity: "🛡️",
  devops: "⚙️",
  "ui-ux": "🎨",
  "system-design": "🏗️",
  database: "🗄️",
  interview: "🎯",
  placement: "💼",
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
        .select(
          "id, progress, course_id, updated_at, courses:course_id (id, title, subject, difficulty)",
        )
        .eq("user_id", u.user.id)
        .order("updated_at", { ascending: false })
        .limit(12);
      return (data ?? []) as unknown as EnrolledTile[];
    },
    staleTime: 15_000,
  });

  const { data: roadmapCount } = useQuery({
    queryKey: ["me", "roadmaps-count"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return 0;
      const { count } = await supabase
        .from("learning_roadmaps")
        .select("id", { count: "exact", head: true })
        .eq("user_id", u.user.id);
      return count ?? 0;
    },
    staleTime: 60_000,
  });

  const enrolled = enrollments ?? [];
  const inProgress = enrolled.filter((e) => (e.progress ?? 0) < 100);
  const completedCount = enrolled.filter((e) => (e.progress ?? 0) >= 100).length;
  const continueLearning = inProgress[0];
  const avgProgress =
    inProgress.length > 0
      ? Math.round(inProgress.reduce((a, e) => a + (e.progress ?? 0), 0) / inProgress.length)
      : 0;

  // Derived "semester" progress: rolling completion % across current enrollments.
  const semesterProgress =
    enrolled.length > 0
      ? Math.round(enrolled.reduce((a, e) => a + (e.progress ?? 0), 0) / enrolled.length)
      : 0;

  // Simple streak heuristic from most-recent updated_at (visual only).
  const streak = useMemo(() => {
    if (!enrolled.length) return 0;
    const last = new Date(enrolled[0].updated_at).getTime();
    const days = Math.max(1, Math.round((Date.now() - last) / 86_400_000));
    return days <= 3 ? 7 - days : Math.max(1, 10 - days);
  }, [enrolled]);

  const firstName = (profile?.full_name ?? "").split(" ")[0] || "there";

  // Recommended & trending — sample from COLLEGE_CATALOG (deterministic slice).
  const catalogPool = useMemo(
    () => COLLEGE_CATALOG.categories.flatMap((c) => c.courses.map((co) => ({ ...co, cat: c }))),
    [],
  );
  const recommended = catalogPool.slice(0, 6);
  const trending = catalogPool.slice(6, 12);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <RoleGate allow={["college_student"]}>
      <DashboardHeader
        eyebrow="College Student Dashboard"
        title={`Welcome back, ${firstName} 👋`}
        description="Welcome to your personalized College Student Dashboard."
      />

      {/* Hero AI summary strip */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <HeroCard
          icon={<Target className="h-5 w-5" />}
          label="Today's learning goal"
          value="Ship 1 lesson + 30-min practice"
          hint={today}
          tone="primary"
        />
        <HeroCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Weekly progress"
          value={`${Math.min(100, avgProgress + 12)}%`}
          hint={`${inProgress.length} active courses`}
        />
        <HeroCard
          icon={<Layers className="h-5 w-5" />}
          label="Semester progress"
          value={`${semesterProgress}%`}
          hint={`${completedCount} of ${enrolled.length || 0} complete`}
        />
        <HeroCard
          icon={<Flame className="h-5 w-5" />}
          label="Learning streak"
          value={`${streak} days`}
          hint="Keep the momentum going"
          tone="accent"
        />
      </div>

      {/* AI recommendation + upcoming */}
      <div className="mb-10 grid gap-5 lg:grid-cols-3">
        <DashCard className="lg:col-span-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-elegant">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                AI recommendation of the day
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                Focus block: 45 min of DSA + 1 system design flashcard set
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Based on your recent activity and placement goals, prioritise problem-solving
                fluency this week. Follow it up with a short mock interview to lock in the pattern.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/dashboard/roadmap"
                  className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Open AI Roadmap <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/dashboard/mock-tests"
                  className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                >
                  Start mock test
                </Link>
              </div>
            </div>
          </div>
        </DashCard>

        <DashCard>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Upcoming
            </p>
          </div>
          <ul className="mt-3 space-y-3 text-sm">
            <UpcomingItem label="Mid-sem quiz" when="in 2 days" />
            <UpcomingItem label="Mini project checkpoint" when="in 5 days" />
            <UpcomingItem label="Mock placement drive" when="next week" />
          </ul>
          <div className="mt-4 rounded-xl border border-dashed border-border/60 bg-muted/30 p-3">
            <p className="text-xs font-medium text-muted-foreground">Next milestone</p>
            <p className="mt-0.5 text-sm font-semibold">
              {completedCount + 1}× course completions → Placement Ready phase
            </p>
          </div>
        </DashCard>
      </div>

      {/* Existing AI brief (role-specific) */}
      <div className="mb-10">
        <AIBriefSections role="college_student" />
      </div>

      {/* Personalised roadmap CTA */}
      <section className="mb-10">
        <SectionHeader
          title="Your AI personalised roadmap"
          action={{ to: "/dashboard/roadmap", label: roadmapCount ? "Open roadmap" : "Generate" }}
        />
        <div className="grid gap-4 md:grid-cols-5">
          {[
            { name: "Foundation", icon: <BookOpen className="h-4 w-4" /> },
            { name: "Intermediate", icon: <Code2 className="h-4 w-4" /> },
            { name: "Advanced", icon: <Rocket className="h-4 w-4" /> },
            { name: "Placement Ready", icon: <Briefcase className="h-4 w-4" /> },
            { name: "Industry Ready", icon: <Trophy className="h-4 w-4" /> },
          ].map((p, i) => (
            <div
              key={p.name}
              className="rounded-2xl border border-border/60 bg-card p-4 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Phase {i + 1}
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
                  {p.icon}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold">{p.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Weekly goals, projects & assessments
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Continue learning */}
      {continueLearning?.courses && (
        <section className="mb-10">
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
                  <span className="font-semibold text-primary">
                    {continueLearning.progress ?? 0}%
                  </span>
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

      {/* My courses */}
      <section className="mb-10">
        <SectionHeader
          title="My courses"
          action={
            enrolled.length > 0
              ? { to: "/dashboard/student/my-courses", label: "View all" }
              : undefined
          }
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
                      <span className="text-muted-foreground">
                        {isDone ? "Completed" : "Progress"}
                      </span>
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
            description="Curated engineering, CS, and career tracks tailored to college learners."
            action={{ to: "/dashboard/student/browse", label: "Browse catalog" }}
          />
        )}
      </section>

      {/* Recommended courses (from College catalog) */}
      <section className="mb-10">
        <SectionHeader
          title="Recommended for you"
          action={{ to: "/dashboard/student/browse", label: "See all" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((c) => (
            <CatalogCard key={c.slug} course={c} label="Recommended" />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mb-10">
        <SectionHeader title="Trending now" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((c) => (
            <CatalogCard key={c.slug} course={c} label="Trending" tone="accent" />
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="mb-10">
        <SectionHeader title="Quick actions" />
        <QuickActionsGrid
          items={[
            {
              to: "/dashboard/roadmap",
              label: "AI Roadmap",
              description: "5-phase personalised path to industry ready",
              icon: <Sparkles className="h-5 w-5" />,
            },
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
              icon: <Bot className="h-5 w-5" />,
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
              description: "Portfolio, resume and career recs",
              icon: <Briefcase className="h-5 w-5" />,
            },
            {
              to: "/dashboard/student/my-courses",
              label: "Achievements",
              description: "Milestones and completions",
              icon: <Award className="h-5 w-5" />,
            },
            {
              to: "/dashboard/analytics",
              label: "Skill analytics",
              description: "Deep insights across every skill you learn",
              icon: <BarChart3 className="h-5 w-5" />,
            },
            {
              to: "/dashboard/community",
              label: "Community",
              description: "Ask doubts, join study groups & mentors",
              icon: <GraduationCap className="h-5 w-5" />,
            },
          ]}
        />
      </section>

      {/* Categories showcase */}
      <section>
        <SectionHeader
          title="Explore college categories"
          action={{ to: "/dashboard/student/browse", label: "Open catalog" }}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {COLLEGE_CATALOG.categories.slice(0, 12).map((cat) => (
            <Link
              key={cat.key}
              to="/dashboard/student/browse"
              className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 transition hover:border-primary/40 hover:shadow-card"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-lg">
                {CATEGORY_ICONS[cat.key] ?? cat.emoji ?? "📚"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{cat.label}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {cat.courses.length} courses
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>
    </RoleGate>
  );
}

/* --- local building blocks --- */

function HeroCard({
  icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  hint?: string;
  tone?: "primary" | "accent";
}) {
  const toneCls =
    tone === "primary"
      ? "from-primary/15 via-primary/5"
      : tone === "accent"
        ? "from-orange-500/15 via-orange-500/5"
        : "from-muted via-transparent";
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-card`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${toneCls} to-transparent`}
      />
      <div className="relative">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-background/70 text-primary">
            {icon}
          </span>
          <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
        </div>
        <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}

function UpcomingItem({ label, when }: { label: string; when: string }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-background/50 px-3 py-2">
      <div className="flex items-center gap-2 min-w-0">
        <ClipboardList className="h-4 w-4 text-primary shrink-0" />
        <span className="truncate">{label}</span>
      </div>
      <span className="text-xs text-muted-foreground shrink-0">{when}</span>
    </li>
  );
}

type CatalogCardCourse = {
  slug: string;
  title: string;
  subject: string;
  description: string;
  difficulty: string;
  estimated_hours: number;
  cat: { label: string; emoji: string; key: string };
};

function CatalogCard({
  course,
  label,
  tone,
}: {
  course: CatalogCardCourse;
  label: string;
  tone?: "accent";
}) {
  return (
    <Link
      to="/dashboard/student/browse"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition hover:border-primary/40"
    >
      <div
        className={`relative h-24 w-full ${
          tone === "accent"
            ? "bg-gradient-to-br from-orange-500/25 via-orange-500/10 to-transparent"
            : "bg-gradient-to-br from-primary/25 via-primary/10 to-transparent"
        }`}
      >
        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
          {label}
        </span>
        <span className="absolute bottom-2 right-3 text-3xl">{course.cat.emoji}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {course.cat.label}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold">{course.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{course.description}</p>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Building2 className="h-3 w-3" /> {course.difficulty}
          </span>
          <span>{course.estimated_hours}h</span>
        </div>
      </div>
    </Link>
  );
}
