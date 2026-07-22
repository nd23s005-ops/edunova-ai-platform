// Executive Career Console — bespoke components for the Working Professional
// dashboard. Nothing in this file is imported from the school student dashboard
// or its shared widget kit; everything here is authored specifically for the
// executive / career-growth surface.

import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Target,
  Trophy,
  Rocket,
  Briefcase,
  Building2,
  ChartBar,
  ArrowRight,
  DollarSign,
  Award,
  ShieldCheck,
  Users2,
  Calendar,
  Compass,
  LineChart,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────────────── */
/* Executive Hero — analytical, KPI-forward, no playful chrome                */
/* ────────────────────────────────────────────────────────────────────────── */

export function ExecutiveHero({
  name,
  role,
  company,
  objective,
  marketValue,
  marketDelta,
  today,
}: {
  name: string;
  role: string;
  company: string;
  objective: string;
  marketValue: string;
  marketDelta: number;
  today: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card">
      {/* left accent bar */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-primary via-primary/70 to-primary/20" />
      <div className="grid gap-8 p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="grid h-5 w-5 place-items-center rounded-sm bg-primary/10 text-primary">
              <Briefcase className="h-3 w-3" />
            </span>
            Executive Career Console · {today}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {role}
            {company ? ` · ${company}` : ""}
          </p>

          <div className="mt-6 rounded-xl border border-border/60 bg-muted/30 p-4">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Compass className="h-3.5 w-3.5" /> Career objective
            </p>
            <p className="mt-1 text-base font-semibold leading-snug">{objective}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to="/dashboard/career/goals"
                className="inline-flex items-center gap-1 rounded-md bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:opacity-90"
              >
                Adjust objective <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                to="/dashboard/roadmap"
                className="inline-flex items-center gap-1 rounded-md border border-border/70 px-3 py-1.5 text-xs font-semibold hover:bg-muted"
              >
                Career roadmap
              </Link>
            </div>
          </div>
        </div>

        {/* Market value ticker */}
        <div className="grid gap-3">
          <div className="rounded-xl border border-border/70 bg-gradient-to-br from-primary/5 to-transparent p-5">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <DollarSign className="h-3.5 w-3.5" /> Skill market value
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tabular-nums">{marketValue}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold",
                  marketDelta >= 0
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                )}
              >
                {marketDelta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {marketDelta >= 0 ? "+" : ""}
                {marketDelta}%
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Modelled against your target role and current skill graph
            </p>
            <Sparkline className="mt-3 h-12 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <HeroStat label="Active tracks" value="4" hint="in-flight" />
            <HeroStat label="Certifications" value="7" hint="earned to date" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-xl font-semibold tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}

/* Simple deterministic sparkline */
function Sparkline({ className }: { className?: string }) {
  const pts = [8, 12, 10, 16, 14, 20, 22, 19, 25, 28, 30, 34];
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const d = pts
    .map((v, i) => {
      const x = (i / (pts.length - 1)) * 100;
      const y = 100 - ((v - min) / (max - min || 1)) * 100;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
      <defs>
        <linearGradient id="pro-spark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.14 260)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.7 0.14 260)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L100,100 L0,100 Z`} fill="url(#pro-spark)" />
      <path d={d} fill="none" stroke="oklch(0.55 0.16 260)" strokeWidth="1.5" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* KPI board — horizontal executive bar with sparkline chips                  */
/* ────────────────────────────────────────────────────────────────────────── */

export type ExecKpi = {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  icon: React.ReactNode;
};

export function ExecutiveKpiBoard({ items }: { items: ExecKpi[] }) {
  return (
    <div className="grid divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-card md:grid-cols-4 md:divide-x">
      {items.map((k) => (
        <div key={k.label} className="border-b border-border/70 p-5 last:border-b-0 md:border-b-0">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="grid h-5 w-5 place-items-center rounded-sm bg-muted text-foreground/70">
                {k.icon}
              </span>
              {k.label}
            </p>
            {typeof k.delta === "number" && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-semibold",
                  k.delta >= 0
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                )}
              >
                {k.delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {k.delta >= 0 ? "+" : ""}
                {k.delta}%
              </span>
            )}
          </div>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{k.value}</p>
          {k.hint && <p className="mt-0.5 text-xs text-muted-foreground">{k.hint}</p>}
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* AI Career Strategist — advisory panel                                      */
/* ────────────────────────────────────────────────────────────────────────── */

export function CareerStrategistPanel({
  headline,
  rationale,
  moves,
}: {
  headline: string;
  rationale: string;
  moves: { title: string; detail: string; to: string; impact: string }[];
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-card">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-foreground text-background">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            AI Career Strategist
          </p>
          <h2 className="mt-1 text-xl font-semibold leading-snug">{headline}</h2>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{rationale}</p>
        </div>
      </div>
      <div className="relative mt-6 grid gap-3 md:grid-cols-3">
        {moves.map((m) => (
          <Link
            key={m.title}
            to={m.to}
            className="group flex flex-col rounded-xl border border-border/70 bg-background/40 p-4 transition hover:border-primary/50 hover:bg-background"
          >
            <span className="inline-flex w-fit rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {m.impact}
            </span>
            <p className="mt-2 text-sm font-semibold">{m.title}</p>
            <p className="mt-1 flex-1 text-xs text-muted-foreground">{m.detail}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-foreground/80 group-hover:text-primary">
              Take action <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Career roadmap — vertical stepper (unique to Professional)                 */
/* ────────────────────────────────────────────────────────────────────────── */

const PHASES = [
  { icon: Target, name: "Skill Diagnostic", detail: "Baseline strengths & measurable gaps." },
  { icon: Rocket, name: "Targeted Upskilling", detail: "Focused sprints on high-leverage skills." },
  { icon: ShieldCheck, name: "Specialisation", detail: "Deep expertise in your chosen track." },
  { icon: Users2, name: "Leadership Scaling", detail: "Mentor, own scope, and grow influence." },
  { icon: Trophy, name: "Industry Expert", detail: "Advisor, speaker, thought leader." },
];

export function CareerRoadmapStepper({ activeIndex }: { activeIndex: number }) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            5-Phase Career Roadmap
          </p>
          <h3 className="text-base font-semibold">Path to industry leadership</h3>
        </div>
        <Link
          to="/dashboard/roadmap"
          className="inline-flex items-center gap-1 rounded-md border border-border/70 px-2.5 py-1 text-xs font-semibold hover:bg-muted"
        >
          Open <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <ol className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border">
        {PHASES.map((p, i) => {
          const Icon = p.icon;
          const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "todo";
          return (
            <li key={p.name} className="relative">
              <span
                className={cn(
                  "absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full border-2",
                  state === "active" && "border-primary bg-primary",
                  state === "done" && "border-primary/60 bg-primary/40",
                  state === "todo" && "border-border bg-background",
                )}
              />
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-lg",
                    state === "active" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.detail}</p>
                </div>
                {state === "active" && (
                  <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    In focus
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Skill Market Value analyzer                                                */
/* ────────────────────────────────────────────────────────────────────────── */

export function SkillMarketPanel({
  skills,
}: {
  skills: { name: string; demand: number; you: number; salary: string }[];
}) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Skill Market Analyzer
          </p>
          <h3 className="text-base font-semibold">Where the market pays for what you know</h3>
        </div>
        <ChartBar className="h-4 w-4 text-muted-foreground" />
      </div>
      <ul className="space-y-3">
        {skills.map((s) => (
          <li key={s.name} className="grid grid-cols-[1fr_auto] items-center gap-3">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{s.name}</span>
                <span className="text-xs text-muted-foreground">{s.salary}</span>
              </div>
              <div className="mt-1 grid gap-1">
                <BarRow label="Market demand" pct={s.demand} tone="market" />
                <BarRow label="Your proficiency" pct={s.you} tone="you" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function BarRow({ label, pct, tone }: { label: string; pct: number; tone: "market" | "you" }) {
  return (
    <div className="grid grid-cols-[110px_1fr_36px] items-center gap-2 text-[11px] text-muted-foreground">
      <span className="truncate">{label}</span>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", tone === "market" ? "bg-foreground/70" : "bg-primary")}
          style={{ width: `${Math.max(2, Math.min(100, pct))}%` }}
        />
      </div>
      <span className="text-right font-semibold text-foreground">{pct}</span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Certification ROI planner                                                  */
/* ────────────────────────────────────────────────────────────────────────── */

export function CertificationRoiCard({
  items,
}: {
  items: { name: string; weeks: number; salaryLift: string; readiness: number }[];
}) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Certification ROI Planner
          </p>
          <h3 className="text-base font-semibold">Investment vs. compensation lift</h3>
        </div>
        <Award className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="grid gap-3">
        {items.map((c) => (
          <div key={c.name} className="rounded-xl border border-border/60 bg-muted/20 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold">{c.name}</p>
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {c.salaryLift}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-[1fr_auto] items-center gap-3">
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                  style={{ width: `${c.readiness}%` }}
                />
              </div>
              <span className="text-xs font-semibold tabular-nums">{c.readiness}% ready</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Estimated {c.weeks} weeks of focused study
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Sprint rail — courses framed as sprints (never "chapters")                 */
/* ────────────────────────────────────────────────────────────────────────── */

export function SprintRail({
  title,
  subtitle,
  sprints,
}: {
  title: string;
  subtitle?: string;
  sprints: { title: string; cat: string; weeks: number; level: string; slug: string }[];
}) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
      <div className="mb-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {title}
          </p>
          {subtitle && <h3 className="text-base font-semibold">{subtitle}</h3>}
        </div>
        <Link
          to="/dashboard/student/browse"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          Full catalogue <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {sprints.map((s) => (
          <Link
            key={s.slug}
            to="/dashboard/student/courses/$courseId"
            params={{ courseId: s.slug }}
            className="group rounded-xl border border-border/60 bg-background/40 p-4 transition hover:border-primary/60 hover:bg-background"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {s.cat}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {s.level}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold leading-snug">{s.title}</p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {s.weeks}-week sprint
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-primary group-hover:underline">
                Begin <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* AI Career Mentor chat card (compact, unique framing)                       */
/* ────────────────────────────────────────────────────────────────────────── */

export function CareerMentorPanel() {
  const prompts = [
    "How do I position for a Staff Engineer promo?",
    "Compare AWS vs GCP certification ROI for me",
    "Draft a 90-day plan for switching to AI/ML",
    "What's my salary benchmark in Bangalore?",
  ];
  return (
    <section className="rounded-2xl border border-border/70 bg-gradient-to-br from-foreground/[0.03] to-primary/5 p-5 shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-foreground text-background">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            AI Career Mentor
          </p>
          <h3 className="text-sm font-semibold">Advisor-grade guidance, on demand</h3>
        </div>
      </div>
      <ul className="grid gap-2">
        {prompts.map((p) => (
          <li key={p}>
            <Link
              to="/dashboard/ai-assistant"
              search={{ q: p }}
              className="group flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-background/70 px-3 py-2 text-xs font-medium hover:border-primary/50 hover:bg-background"
            >
              <span className="truncate">{p}</span>
              <Send className="h-3 w-3 shrink-0 text-muted-foreground group-hover:text-primary" />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/dashboard/ai-assistant"
        className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-lg bg-foreground py-2 text-xs font-semibold text-background hover:opacity-90"
      >
        Open Career Mentor <ArrowRight className="h-3 w-3" />
      </Link>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Quick actions rail — executive tools only                                  */
/* ────────────────────────────────────────────────────────────────────────── */

export function ExecutiveActionsRail() {
  const actions: { label: string; to: string; icon: React.ReactNode; hint: string }[] = [
    { label: "Resume Studio", to: "/dashboard/career/resume", icon: <Briefcase className="h-4 w-4" />, hint: "ATS-optimised builder" },
    { label: "Portfolio", to: "/dashboard/career/portfolio", icon: <Building2 className="h-4 w-4" />, hint: "Executive presence" },
    { label: "Interview Prep", to: "/dashboard/career/interview", icon: <Users2 className="h-4 w-4" />, hint: "Behavioural & system" },
    { label: "Job Market", to: "/dashboard/career/jobs", icon: <Compass className="h-4 w-4" />, hint: "Curated roles" },
    { label: "Skill Gap", to: "/dashboard/career/skill-gap", icon: <LineChart className="h-4 w-4" />, hint: "Vs. target role" },
    { label: "Certifications", to: "/dashboard/career/certifications", icon: <Award className="h-4 w-4" />, hint: "ROI-ranked" },
  ];
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Executive Toolkit
      </p>
      <div className="mt-3 grid gap-2">
        {actions.map((a) => (
          <Link
            key={a.label}
            to={a.to}
            className="group flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 px-3 py-2.5 transition hover:border-primary/50 hover:bg-background"
          >
            <span className="grid h-8 w-8 place-items-center rounded-md bg-muted text-foreground/70 group-hover:bg-primary group-hover:text-primary-foreground">
              {a.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight">{a.label}</p>
              <p className="text-[11px] text-muted-foreground">{a.hint}</p>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Promotion readiness gauge                                                  */
/* ────────────────────────────────────────────────────────────────────────── */

export function PromotionGauge({ value, label }: { value: number; label: string }) {
  const v = Math.max(0, Math.min(100, value));
  const angle = (v / 100) * 180;
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Promotion Readiness
      </p>
      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-20 w-40">
          <svg viewBox="0 0 200 110" className="h-full w-full">
            <path
              d="M10,100 A90,90 0 0 1 190,100"
              fill="none"
              stroke="oklch(0.9 0.01 260)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M10,100 A90,90 0 0 1 190,100"
              fill="none"
              stroke="oklch(0.55 0.16 260)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${(angle / 180) * 283} 283`}
            />
          </svg>
          <div className="absolute inset-x-0 bottom-1 text-center">
            <p className="text-2xl font-semibold tabular-nums leading-none">{v}%</p>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{label}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Composite of certifications, delivery signals, and skill coverage.
          </p>
        </div>
      </div>
    </section>
  );
}
