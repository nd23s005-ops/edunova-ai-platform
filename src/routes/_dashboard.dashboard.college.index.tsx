import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import {
  Terminal,
  Code2,
  GitBranch,
  Github,
  Trophy,
  Rocket,
  Briefcase,
  Bot,
  Cpu,
  Beaker,
  Users,
  FileText,
  Layers,
  Flame,
  Zap,
  Target,
  Sparkles,
  ChevronRight,
  Bell,
  Building2,
  BookMarked,
  ClipboardCheck,
  Puzzle,
  Wrench,
  Calendar,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { RoleGate } from "@/components/auth/RoleGate";
import { supabase } from "@/integrations/supabase/client";
import { generateCollegeBrief, type BriefEntry, type CollegeBrief } from "@/lib/ai/college-brief.functions";
import { CodeAssistantPanel } from "@/components/college/CodeAssistantPanel";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/dashboard/college/")({
  head: () => ({
    meta: [
      { title: "College Student Dashboard — EduNova AI" },
      { name: "description", content: "AI-powered workspace for CS undergraduates: DSA, projects, placements, and beyond." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CollegeDashboard,
});

function CollegeDashboard() {
  return (
    <RoleGate allow={["college_student"]}>
      <CollegeDashboardInner />
    </RoleGate>
  );
}

function CollegeDashboardInner() {
  const { data: profile } = useQuery({
    queryKey: ["me", "college-profile-mini"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase.from("profiles").select("full_name").eq("id", u.user.id).maybeSingle();
      return data as { full_name?: string | null } | null;
    },
    staleTime: 60_000,
  });

  const briefFn = useServerFn(generateCollegeBrief);
  const { data: brief, isLoading } = useQuery({
    queryKey: ["college-brief"],
    queryFn: () => briefFn(),
    staleTime: 12 * 60 * 60 * 1000,
    retry: 1,
  });

  const firstName = (profile?.full_name ?? "").split(" ")[0] || "developer";
  const b: CollegeBrief | undefined = brief;

  return (
    <div className="space-y-8">
      {/* ── Terminal Hero ─────────────────────────────────────────────────── */}
      <TerminalHero name={firstName} brief={b} loading={isLoading} />

      {/* ── Metric strip: unique ring-based visualisation ─────────────────── */}
      <MetricRings brief={b} />

      {/* ── Main workspace: two-column asymmetric layout ──────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Primary column */}
        <div className="space-y-6">
          <AIFocusPanel brief={b} />
          <CodeAssistantPanel />
          <RoadmapRail brief={b} />
          <WorkspaceTabs brief={b} />
          <ToolGrid />
        </div>

        {/* Side rail */}
        <aside className="space-y-6">
          <ContribGrid streak={b?.codingStreakDays ?? 0} />
          <RailList
            icon={<Bell className="h-4 w-4" />}
            title="AI Notifications"
            items={b?.notifications ?? []}
          />
          <SkillRadar data={b?.skillRadar ?? []} />
          <RailList
            icon={<Building2 className="h-4 w-4" />}
            title="Company Spotlight"
            items={b?.companySpotlight ?? []}
          />
          <RailList
            icon={<Trophy className="h-4 w-4" />}
            title="Hackathons & Contests"
            items={b?.hackathons ?? []}
          />
          <RailList
            icon={<GitBranch className="h-4 w-4" />}
            title="Open Source Picks"
            items={b?.openSource ?? []}
          />
          <GithubSyncCard />
        </aside>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Terminal Hero                                                              */
/* ────────────────────────────────────────────────────────────────────────── */
function TerminalHero({ name, brief, loading }: { name: string; brief?: CollegeBrief; loading: boolean }) {
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-[oklch(0.16_0.02_260)] text-[oklch(0.94_0.02_260)] shadow-elegant">
      <div className="absolute inset-0 opacity-40 [background:radial-gradient(1200px_400px_at_100%_0%,oklch(0.6_0.18_280/.35),transparent),radial-gradient(800px_300px_at_0%_100%,oklch(0.6_0.18_180/.25),transparent)]" />
      <div className="relative">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.2_25)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.18_90)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.75_0.18_150)]" />
          <span className="ml-3 flex items-center gap-2 text-xs font-medium text-white/60">
            <Terminal className="h-3.5 w-3.5" /> edunova/college — {today}
          </span>
          <span className="ml-auto rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/70">
            College Student Dashboard
          </span>
        </div>

        {/* body */}
        <div className="grid gap-6 p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
          <div className="font-mono text-sm leading-7">
            <p className="text-white/50">$ whoami</p>
            <p className="text-white">
              <span className="text-[oklch(0.85_0.16_170)]">›</span> Welcome back, <span className="font-bold text-white">{name}</span> 👋
            </p>
            <p className="mt-2 text-white/50">$ edunova today --role college_student</p>
            <p className="text-white">
              <span className="text-[oklch(0.85_0.16_170)]">›</span>{" "}
              {loading ? "Compiling your personalised plan…" : brief?.headline ?? "Ship one lesson, one problem, one commit today."}
            </p>
            <p className="mt-2 text-white/50">$ focus.today()</p>
            <p className="text-[oklch(0.9_0.14_90)]">
              → {loading ? "…" : brief?.focusOfTheDay ?? "45 min DSA + 30 min system design"}
            </p>
            <p className="mt-3 text-white/50">
              <span className="mr-1">$</span>
              <span className="animate-pulse text-white">▍</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 self-center">
            <HeroChip icon={<Code2 className="h-4 w-4" />} label="Coding Playground" to="/dashboard/college/playground" />
            <HeroChip icon={<Puzzle className="h-4 w-4" />} label="DSA Practice" to="/dashboard/mock-tests" />
            <HeroChip icon={<Bot className="h-4 w-4" />} label="AI Mentor" to="/dashboard/ai-assistant" />
            <HeroChip icon={<Rocket className="h-4 w-4" />} label="Roadmap" to="/dashboard/roadmap" />
            <HeroChip icon={<Briefcase className="h-4 w-4" />} label="Placement Prep" to="/dashboard/career/interview" />
            <HeroChip icon={<FileText className="h-4 w-4" />} label="Resume Builder" to="/dashboard/career/resume" />
            <HeroChip icon={<Wrench className="h-4 w-4" />} label="Portfolio Builder" to="/dashboard/career/portfolio" />
            <HeroChip icon={<Target className="h-4 w-4" />} label="Personalize" to="/dashboard/college/personalize" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroChip({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium text-white/90 backdrop-blur transition hover:border-white/25 hover:bg-white/10"
    >
      <span className="grid h-6 w-6 place-items-center rounded-md bg-white/10">{icon}</span>
      <span className="truncate">{label}</span>
      <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
    </Link>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Metric rings                                                                */
/* ────────────────────────────────────────────────────────────────────────── */
function MetricRings({ brief }: { brief?: CollegeBrief }) {
  const items = [
    { label: "Productivity", value: brief?.productivityScore ?? 0, suffix: "", icon: <Activity className="h-4 w-4" />, hue: 280 },
    { label: "Coding streak", value: Math.min(100, (brief?.codingStreakDays ?? 0) * 4), display: `${brief?.codingStreakDays ?? 0}d`, icon: <Flame className="h-4 w-4" />, hue: 30 },
    { label: "DSA / week", value: Math.min(100, (brief?.dsaSolvedThisWeek ?? 0) * 4), display: String(brief?.dsaSolvedThisWeek ?? 0), icon: <Zap className="h-4 w-4" />, hue: 200 },
    { label: "Semester", value: brief?.semesterProgressPct ?? 0, suffix: "%", icon: <Layers className="h-4 w-4" />, hue: 160 },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-card">
          <Ring value={it.value} hue={it.hue}>
            <span className="text-sm font-bold tabular-nums">{it.display ?? `${it.value}${it.suffix ?? ""}`}</span>
          </Ring>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {it.icon}
              {it.label}
            </p>
            <p className="mt-1 text-lg font-semibold">
              {it.display ?? `${it.value}${it.suffix ?? ""}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Ring({ value, hue, children }: { value: number; hue: number; children: React.ReactNode }) {
  const clamped = Math.max(0, Math.min(100, value));
  const stroke = `oklch(0.68 0.18 ${hue})`;
  const track = `oklch(0.68 0.18 ${hue} / 0.15)`;
  const r = 26;
  const c = 2 * Math.PI * r;
  const dash = (clamped / 100) * c;
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
      <circle cx="32" cy="32" r={r} fill="none" stroke={track} strokeWidth="6" />
      <circle
        cx="32" cy="32" r={r} fill="none" stroke={stroke} strokeWidth="6" strokeLinecap="round"
        strokeDasharray={`${dash} ${c}`}
      />
      <foreignObject x="0" y="0" width="64" height="64" transform="rotate(90 32 32)">
        <div className="flex h-16 w-16 items-center justify-center">{children}</div>
      </foreignObject>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* AI Focus panel                                                              */
/* ────────────────────────────────────────────────────────────────────────── */
function AIFocusPanel({ brief }: { brief?: CollegeBrief }) {
  const recs = brief?.aiRecommendations ?? [];
  return (
    <section className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/5 via-card to-card p-5 shadow-card">
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">AI Recommendations</p>
          <h2 className="text-lg font-semibold">Your next best moves</h2>
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {recs.slice(0, 4).map((r, i) => (
          <div key={i} className="rounded-xl border border-border/60 bg-background/40 p-4 backdrop-blur">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold">{r.title}</p>
              {r.tag && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">{r.tag}</span>}
            </div>
            {r.detail && <p className="mt-1 text-xs text-muted-foreground">{r.detail}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Roadmap rail — horizontal timeline                                          */
/* ────────────────────────────────────────────────────────────────────────── */
function RoadmapRail({ brief }: { brief?: CollegeBrief }) {
  const phases = brief?.roadmapPhases ?? [];
  const current = 1; // Intermediate — visual placeholder
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">AI Personalised Roadmap</p>
          <h2 className="text-lg font-semibold">From foundation → industry ready</h2>
        </div>
        <Link to="/dashboard/roadmap" className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-semibold hover:bg-muted">
          Open <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="relative">
        <div className="absolute left-3 right-3 top-6 h-1 rounded-full bg-muted" />
        <div className="absolute left-3 top-6 h-1 rounded-full bg-primary transition-all"
             style={{ width: `${((current + 0.5) / Math.max(1, phases.length)) * 96}%` }} />
        <div className="relative grid gap-4 md:grid-cols-5">
          {phases.slice(0, 5).map((p, i) => {
            const state = i < current ? "done" : i === current ? "active" : "todo";
            return (
              <div key={i} className="text-center">
                <div
                  className={cn(
                    "mx-auto grid h-12 w-12 place-items-center rounded-full border-2 text-xs font-bold",
                    state === "active" && "border-primary bg-primary text-primary-foreground shadow-elegant",
                    state === "done" && "border-primary/60 bg-primary/10 text-primary",
                    state === "todo" && "border-border bg-background text-muted-foreground",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="mt-2 text-xs font-semibold">{p.title}</p>
                {p.detail && <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">{p.detail}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Workspace Tabs                                                              */
/* ────────────────────────────────────────────────────────────────────────── */
type TabKey = "challenges" | "dsa" | "projects" | "interview" | "weekly" | "study" | "career";
const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "challenges", label: "Coding Challenges", icon: <Code2 className="h-4 w-4" /> },
  { key: "dsa", label: "DSA Practice", icon: <Puzzle className="h-4 w-4" /> },
  { key: "projects", label: "Project Lab", icon: <Beaker className="h-4 w-4" /> },
  { key: "interview", label: "Interview Prep", icon: <ClipboardCheck className="h-4 w-4" /> },
  { key: "weekly", label: "Weekly Challenges", icon: <Target className="h-4 w-4" /> },
  { key: "study", label: "Study Planner", icon: <Calendar className="h-4 w-4" /> },
  { key: "career", label: "Career Guidance", icon: <Briefcase className="h-4 w-4" /> },
];

function WorkspaceTabs({ brief }: { brief?: CollegeBrief }) {
  const [tab, setTab] = useState<TabKey>("challenges");
  const items: BriefEntry[] = useMemo(() => {
    if (!brief) return [];
    switch (tab) {
      case "challenges": return brief.codingChallenges;
      case "dsa": return brief.dsaProblems;
      case "projects": return brief.projectIdeas;
      case "interview": return brief.interviewQuestions;
      case "weekly": return brief.weeklyChallenges;
      case "study": return brief.studyPlan;
      case "career": return brief.careerGuidance;
    }
  }, [brief, tab]);

  return (
    <section className="rounded-2xl border border-border/60 bg-card shadow-card">
      <div className="flex flex-wrap gap-1 border-b border-border/60 p-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition",
              tab === t.key ? "bg-primary text-primary-foreground shadow-elegant" : "text-muted-foreground hover:bg-muted",
            )}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-2">
        {items.length === 0 ? (
          <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
            Generating fresh AI content for this section…
          </div>
        ) : items.slice(0, 6).map((it, i) => (
          <div key={i} className="rounded-xl border border-border/60 bg-background/40 p-4 transition hover:border-primary/40">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold leading-snug">{it.title}</p>
              {it.tag && <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{it.tag}</span>}
            </div>
            {it.detail && <p className="mt-1 text-xs text-muted-foreground line-clamp-3">{it.detail}</p>}
            {it.meta && <p className="mt-2 text-[10px] uppercase tracking-wider text-primary/80">{it.meta}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Tool grid (unique to college)                                               */
/* ────────────────────────────────────────────────────────────────────────── */
function ToolGrid() {
  const tools = [
    { to: "/dashboard/career/coding", label: "Coding Playground", desc: "Multi-language sandbox", icon: <Terminal className="h-5 w-5" /> },
    { to: "/dashboard/ai-assistant", label: "AI Code Assistant", desc: "Explain, debug, refactor", icon: <Cpu className="h-5 w-5" /> },
    { to: "/dashboard/career/projects", label: "Project Lab", desc: "Ship portfolio projects", icon: <Beaker className="h-5 w-5" /> },
    { to: "/dashboard/career/portfolio", label: "Portfolio Builder", desc: "Public developer profile", icon: <Wrench className="h-5 w-5" /> },
    { to: "/dashboard/career/resume", label: "Resume Builder", desc: "ATS-scored resumes", icon: <FileText className="h-5 w-5" /> },
    { to: "/dashboard/career/interview", label: "Mock Interviews", desc: "Technical + behavioural", icon: <Users className="h-5 w-5" /> },
    { to: "/dashboard/career/internships", label: "Internships", desc: "Curated openings", icon: <Briefcase className="h-5 w-5" /> },
    { to: "/dashboard/career/skill-gap", label: "Skill Analytics", desc: "Where to focus next", icon: <Activity className="h-5 w-5" /> },
    { to: "/dashboard/career/certifications", label: "Certifications", desc: "Track & verify", icon: <BookMarked className="h-5 w-5" /> },
  ];
  return (
    <section>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Developer Toolbelt</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.label}
            to={t.to}
            className="group flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              {t.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold">{t.label}</p>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
            <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Contribution grid (GitHub-style)                                            */
/* ────────────────────────────────────────────────────────────────────────── */
function ContribGrid({ streak }: { streak: number }) {
  // 7x14 grid seeded from streak value for deterministic visual
  const cells = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < 7 * 14; i++) {
      const seed = (i * 9301 + streak * 49297) % 233280;
      const rnd = seed / 233280;
      const boost = i > 7 * 14 - streak ? 0.35 : 0;
      const v = Math.max(0, Math.min(4, Math.floor((rnd + boost) * 5)));
      arr.push(v);
    }
    return arr;
  }, [streak]);
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <Flame className="h-4 w-4 text-primary" /> Coding streak
        </p>
        <span className="text-xs font-bold tabular-nums text-primary">{streak}d</span>
      </div>
      <div className="grid grid-cols-14 gap-1" style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}>
        {cells.map((v, i) => (
          <span
            key={i}
            className="aspect-square rounded-[3px]"
            style={{
              background:
                v === 0 ? "oklch(0.9 0.01 260 / 0.4)" :
                `oklch(${0.85 - v * 0.08} 0.16 260 / ${0.35 + v * 0.16})`,
            }}
          />
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">Commit today to keep the streak alive.</p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Side-rail generic list                                                      */
/* ────────────────────────────────────────────────────────────────────────── */
function RailList({ icon, title, items }: { icon: React.ReactNode; title: string; items: BriefEntry[] }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
      <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <span className="text-primary">{icon}</span> {title}
      </p>
      <ul className="space-y-2.5">
        {items.slice(0, 4).map((it, i) => (
          <li key={i} className="rounded-lg border border-border/40 bg-background/40 p-2.5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-semibold leading-snug">{it.title}</p>
              {it.tag && <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary">{it.tag}</span>}
            </div>
            {it.detail && <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">{it.detail}</p>}
          </li>
        ))}
        {items.length === 0 && <li className="text-xs text-muted-foreground">Generating…</li>}
      </ul>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Skill radar (bars)                                                          */
/* ────────────────────────────────────────────────────────────────────────── */
function SkillRadar({ data }: { data: { skill: string; level: number }[] }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
      <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <Activity className="h-4 w-4 text-primary" /> Skill Analytics
      </p>
      <ul className="space-y-2.5">
        {data.slice(0, 6).map((s) => (
          <li key={s.skill}>
            <div className="mb-0.5 flex items-center justify-between text-[11px]">
              <span className="font-semibold">{s.skill}</span>
              <span className="tabular-nums text-muted-foreground">{s.level}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                   style={{ width: `${s.level}%` }} />
            </div>
          </li>
        ))}
        {data.length === 0 && <li className="text-xs text-muted-foreground">Awaiting analysis…</li>}
      </ul>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* GitHub sync card                                                            */
/* ────────────────────────────────────────────────────────────────────────── */
function GithubSyncCard() {
  return (
    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-[oklch(0.18_0.02_260)] to-[oklch(0.22_0.03_280)] p-4 text-white shadow-card">
      <div className="flex items-center gap-2">
        <Github className="h-5 w-5" />
        <p className="text-sm font-bold">GitHub Integration</p>
      </div>
      <p className="mt-1 text-xs text-white/70">
        Sync repositories, showcase pinned projects, and count commits toward your coding streak.
      </p>
      <Link
        to="/dashboard/career/portfolio"
        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black hover:bg-white/90"
      >
        Connect GitHub <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
