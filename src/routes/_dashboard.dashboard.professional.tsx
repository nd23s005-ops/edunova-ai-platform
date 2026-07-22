import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  BookOpen,
  TrendingUp,
  Target,
  Sparkles,
  PlayCircle,
  Award,
  Compass,
  Flame,
  CalendarDays,
  Lightbulb,
  ArrowRight,
  Bot,
  Trophy,
  Rocket,
  BadgeCheck,
  BarChart3,
  LineChart,
  FileText,
  UserRoundSearch,
  Building2,
  Crown,
  Layers,
  Gauge,
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
import { PRO_CATALOG } from "@/lib/courses/catalog";

export const Route = createFileRoute("/_dashboard/dashboard/professional")({
  head: () => ({
    meta: [
      { title: "Working Professional Dashboard — EduNova AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfessionalDashboard,
});

type EnrolledTile = {
  id: string;
  progress: number;
  course_id: string;
  updated_at: string;
  courses: { id: string; title: string; subject: string; difficulty?: string } | null;
};

const CAREER_PHASES = [
  {
    name: "Skill Assessment",
    icon: Gauge,
    hint: "Baseline current strengths & gaps",
  },
  {
    name: "Upskilling",
    icon: Rocket,
    hint: "Targeted courses & applied projects",
  },
  {
    name: "Specialization",
    icon: Layers,
    hint: "Deep expertise in your track",
  },
  {
    name: "Leadership & Growth",
    icon: Crown,
    hint: "Manage, mentor, and scale impact",
  },
  {
    name: "Industry Expert",
    icon: Trophy,
    hint: "Thought leadership & advisory",
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
      return data as { full_name?: string | null } | null;
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
        .limit(12);
      return (data ?? []) as unknown as EnrolledTile[];
    },
    staleTime: 15_000,
  });

  const { data: roadmapCount } = useQuery({
    queryKey: ["me", "roadmaps-count-pro"],
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

  const monthlyGrowth =
    enrolled.length > 0
      ? Math.round(enrolled.reduce((a, e) => a + (e.progress ?? 0), 0) / enrolled.length)
      : 0;

  const streak = useMemo(() => {
    if (!enrolled.length) return 0;
    const last = new Date(enrolled[0].updated_at).getTime();
    const days = Math.max(1, Math.round((Date.now() - last) / 86_400_000));
    return days <= 3 ? 8 - days : Math.max(1, 12 - days);
  }, [enrolled]);

  const productivity = Math.min(100, 40 + avgProgress / 2 + completedCount * 3);
  const promotionReadiness = Math.min(100, 35 + completedCount * 6 + avgProgress / 4);

  const firstName = (profile?.full_name ?? "").split(" ")[0] || "there";

  const catalogPool = useMemo(
    () => PRO_CATALOG.categories.flatMap((c) => c.courses.map((co) => ({ ...co, cat: c }))),
    [],
  );
  const recommended = catalogPool.slice(0, 6);
  const trending = catalogPool.slice(6, 12);
  const executive = catalogPool.slice(12, 18);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <RoleGate allow={["professional"]}>
      <DashboardHeader
        eyebrow="Working Professional Dashboard"
        title={`Welcome back, ${firstName} 👋`}
        description="Welcome to your AI-Powered Professional Learning Workspace."
      />

      {/* Executive KPI strip */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={<Target className="h-5 w-5" />}
          label="Today's learning goal"
          value="45 min focused deep-work"
          hint={today}
          tone="primary"
        />
        <KpiCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Weekly progress"
          value={`${Math.min(100, avgProgress + 8)}%`}
          hint={`${inProgress.length} active tracks`}
        />
        <KpiCard
          icon={<LineChart className="h-5 w-5" />}
          label="Monthly skill growth"
          value={`+${monthlyGrowth}%`}
          hint="vs. previous month"
          tone="accent"
        />
        <KpiCard
          icon={<Flame className="h-5 w-5" />}
          label="Learning streak"
          value={`${streak} days`}
          hint="Consistency compounds"
        />
      </div>

      {/* AI recommendation + career objective + certifications */}
      <div className="mb-10 grid gap-5 lg:grid-cols-3">
        <DashCard className="lg:col-span-2 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="relative flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-elegant">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                AI recommendation of the day
              </p>
              <h3 className="mt-1 text-lg font-semibold">
                Ship a 30-min System Design case study & review 1 leadership scenario
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Based on your target role and current pace, prioritise architecture depth this
                week. Pair it with a leadership vignette to stay promotion-ready.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/dashboard/roadmap"
                  className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Open Career Roadmap <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/dashboard/career/interview"
                  className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                >
                  Practice mock interview
                </Link>
              </div>
            </div>
          </div>

          <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-background/50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Current career objective
              </p>
              <p className="mt-1 text-sm font-semibold">
                Move into a senior / lead role in the next 12 months
              </p>
              <Link
                to="/dashboard/career/goals"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                Update objective <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Productivity score
              </p>
              <div className="mt-2 flex items-center justify-between text-sm font-semibold">
                <span>{Math.round(productivity)}/100</span>
                <span className="text-xs text-muted-foreground">This week</span>
              </div>
              <ProgressBar value={productivity} />
            </div>
          </div>
        </DashCard>

        <DashCard>
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Upcoming certifications
            </p>
          </div>
          <ul className="mt-3 space-y-3 text-sm">
            <UpcomingRow label="AWS Solutions Architect" when="target: 6 weeks" />
            <UpcomingRow label="PMP Refresh" when="target: 8 weeks" />
            <UpcomingRow label="GenAI Practitioner" when="target: 3 weeks" />
          </ul>
          <div className="mt-4 rounded-xl border border-dashed border-border/60 bg-muted/30 p-3">
            <p className="text-xs font-medium text-muted-foreground">Next career milestone</p>
            <p className="mt-0.5 text-sm font-semibold">
              Promotion readiness: {Math.round(promotionReadiness)}%
            </p>
            <div className="mt-2">
              <ProgressBar value={promotionReadiness} />
            </div>
          </div>
        </DashCard>
      </div>

      {/* Existing AI brief (role-specific) */}
      <div className="mb-10">
        <AIBriefSections role="professional" />
      </div>

      {/* Career roadmap phases */}
      <section className="mb-10">
        <SectionHeader
          title="Your AI Career Roadmap"
          action={{ to: "/dashboard/roadmap", label: roadmapCount ? "Open roadmap" : "Generate" }}
        />
        <div className="grid gap-4 md:grid-cols-5">
          {CAREER_PHASES.map((p, i) => {
            const Icon = p.icon;
            const active =
              i === Math.min(CAREER_PHASES.length - 1, Math.floor((avgProgress / 100) * CAREER_PHASES.length));
            return (
              <div
                key={p.name}
                className={`rounded-2xl border p-4 shadow-card transition ${
                  active ? "border-primary/60 bg-primary/5" : "border-border/60 bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Phase {i + 1}
                  </span>
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-lg ${
                      active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold">{p.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{p.hint}</p>
              </div>
            );
          })}
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
                {continueLearning.courses.difficulty
                  ? ` · ${continueLearning.courses.difficulty}`
                  : ""}
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

      {/* My learning */}
      <section className="mb-10">
        <SectionHeader
          title="My learning"
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
            title="Start a professional track"
            description="Executive learning paths curated for leadership, cloud, AI, and product."
            action={{ to: "/dashboard/student/browse", label: "Browse catalog" }}
          />
        )}
      </section>

      {/* Recommended */}
      <section className="mb-10">
        <SectionHeader
          title="Recommended for you"
          action={{ to: "/dashboard/student/browse", label: "See all" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((c) => (
            <ProCourseCard key={c.slug} course={c} label="Recommended" />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mb-10">
        <SectionHeader title="Trending in your industry" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((c) => (
            <ProCourseCard key={c.slug} course={c} label="Trending" tone="accent" />
          ))}
        </div>
      </section>

      {/* Executive picks */}
      {executive.length > 0 && (
        <section className="mb-10">
          <SectionHeader title="Executive learning paths" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {executive.map((c) => (
              <ProCourseCard key={c.slug} course={c} label="Executive" tone="exec" />
            ))}
          </div>
        </section>
      )}

      {/* Job & professional tools */}
      <section className="mb-10">
        <SectionHeader title="Job & professional tools" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ToolTile
            to="/dashboard/career/resume"
            icon={<FileText className="h-5 w-5" />}
            title="Resume builder & ATS score"
            desc="AI feedback, keyword coverage, and rewrite suggestions"
          />
          <ToolTile
            to="/dashboard/career/portfolio"
            icon={<Briefcase className="h-5 w-5" />}
            title="Portfolio builder"
            desc="Showcase projects, case studies & impact metrics"
          />
          <ToolTile
            to="/dashboard/career/interview"
            icon={<UserRoundSearch className="h-5 w-5" />}
            title="Interview prep & mock rounds"
            desc="Behavioural, system design, and role-specific drills"
          />
          <ToolTile
            to="/dashboard/career/jobs"
            icon={<Building2 className="h-5 w-5" />}
            title="Job application tracker"
            desc="Pipeline view of applications & follow-ups"
          />
          <ToolTile
            to="/dashboard/career/skill-gap"
            icon={<Gauge className="h-5 w-5" />}
            title="Skill gap analysis"
            desc="See exactly what to learn to hit the next role"
          />
          <ToolTile
            to="/dashboard/career/certifications"
            icon={<BadgeCheck className="h-5 w-5" />}
            title="Certifications tracker"
            desc="Deadlines, credly links & readiness"
          />
        </div>
      </section>

      {/* Productivity & performance */}
      <section className="mb-10">
        <SectionHeader title="Productivity & performance" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PerfCard label="Weekly productivity" value={`${Math.round(productivity)}%`} icon={<BarChart3 className="h-4 w-4" />} />
          <PerfCard label="Monthly progress" value={`+${monthlyGrowth}%`} icon={<LineChart className="h-4 w-4" />} />
          <PerfCard label="Courses completed" value={completedCount} icon={<Trophy className="h-4 w-4" />} />
          <PerfCard label="Promotion readiness" value={`${Math.round(promotionReadiness)}%`} icon={<Crown className="h-4 w-4" />} />
        </div>
      </section>

      {/* AI career assistant CTA */}
      <section className="mb-10">
        <DashCard className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold">Ask Nova, your AI Career Mentor</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Personalised guidance on promotions, switches, negotiation, and leadership growth.
            </p>
          </div>
          <Link
            to="/dashboard/ai-assistant"
            className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-primary/90"
          >
            Open mentor →
          </Link>
        </DashCard>
      </section>

      {/* Quick actions */}
      <section className="mb-10">
        <SectionHeader title="Quick actions" />
        <QuickActionsGrid
          items={[
            {
              to: "/dashboard/roadmap",
              label: "AI Career Roadmap",
              description: "5-phase path to industry expert",
              icon: <Sparkles className="h-5 w-5" />,
            },
            {
              to: "/dashboard/upskilling",
              label: "Upskilling Hub",
              description: "GenAI, Cloud, Data, Leadership tracks",
              icon: <Rocket className="h-5 w-5" />,
            },
            {
              to: "/dashboard/student/browse",
              label: "Professional catalog",
              description: "Executive-grade courses & specialisations",
              icon: <Compass className="h-5 w-5" />,
            },
            {
              to: "/dashboard/career",
              label: "Career hub",
              description: "Resume, portfolio, interviews, jobs",
              icon: <Briefcase className="h-5 w-5" />,
            },
            {
              to: "/dashboard/career/skill-gap",
              label: "Skill gap analysis",
              description: "AI benchmark vs. your target role",
              icon: <Gauge className="h-5 w-5" />,
            },
            {
              to: "/dashboard/mock-tests",
              label: "Mock interviews",
              description: "Role-specific practice sets",
              icon: <UserRoundSearch className="h-5 w-5" />,
            },
            {
              to: "/dashboard/career/certifications",
              label: "Certifications",
              description: "Track deadlines & readiness",
              icon: <BadgeCheck className="h-5 w-5" />,
            },
            {
              to: "/dashboard/analytics",
              label: "Learning analytics",
              description: "Skills, streaks, KPIs & insights",
              icon: <BarChart3 className="h-5 w-5" />,
            },
            {
              to: "/dashboard/student/my-courses",
              label: "Achievements",
              description: "Milestones & completions",
              icon: <Award className="h-5 w-5" />,
            },
            {
              to: "/dashboard/community",
              label: "Community & mentors",
              description: "Peer network and expert mentors",
              icon: <Bot className="h-5 w-5" />,
            },
          ]}
        />
      </section>

      {/* Categories */}
      <section>
        <SectionHeader
          title="Explore professional categories"
          action={{ to: "/dashboard/student/browse", label: "Open catalog" }}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PRO_CATALOG.categories.slice(0, 12).map((cat) => (
            <Link
              key={cat.key}
              to="/dashboard/student/browse"
              className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 transition hover:border-primary/40 hover:shadow-card"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-lg">
                {cat.emoji}
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

function KpiCard({
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
        ? "from-emerald-500/15 via-emerald-500/5"
        : "from-muted via-transparent";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-card">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${toneCls} to-transparent`} />
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

function UpcomingRow({ label, when }: { label: string; when: string }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-background/50 px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <ClipboardList className="h-4 w-4 shrink-0 text-primary" />
        <span className="truncate">{label}</span>
      </div>
      <span className="shrink-0 text-xs text-muted-foreground">{when}</span>
    </li>
  );
}

function PerfCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-3 text-xl font-bold">{value}</p>
    </div>
  );
}

function ToolTile({
  to,
  icon,
  title,
  desc,
}: {
  to: "/dashboard/career/resume" | "/dashboard/career/portfolio" | "/dashboard/career/interview" | "/dashboard/career/jobs" | "/dashboard/career/skill-gap" | "/dashboard/career/certifications";
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-card transition hover:border-primary/40"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
}

type ProCourse = {
  slug: string;
  title: string;
  subject: string;
  description: string;
  difficulty: string;
  estimated_hours: number;
  cat: { label: string; emoji: string; key: string };
};

function ProCourseCard({
  course,
  label,
  tone,
}: {
  course: ProCourse;
  label: string;
  tone?: "accent" | "exec";
}) {
  const banner =
    tone === "accent"
      ? "bg-gradient-to-br from-emerald-500/25 via-emerald-500/10 to-transparent"
      : tone === "exec"
        ? "bg-gradient-to-br from-amber-500/25 via-amber-500/10 to-transparent"
        : "bg-gradient-to-br from-primary/25 via-primary/10 to-transparent";
  return (
    <Link
      to="/dashboard/student/browse"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition hover:border-primary/40"
    >
      <div className={`relative h-24 w-full ${banner}`}>
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
          <span className="inline-flex items-center gap-1 capitalize">
            <Briefcase className="h-3 w-3" /> {course.difficulty}
          </span>
          <span>{course.estimated_hours}h · Certificate</span>
        </div>
      </div>
    </Link>
  );
}
