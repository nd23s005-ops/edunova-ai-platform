import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Feature = {
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
  mock: ReactNode;
};

const features: Feature[] = [
  {
    slug: "learning-twin",
    eyebrow: "Personalized",
    title: "Learning Twin",
    body: "The Learning Twin is a private, evolving representation of your knowledge — updated after every lesson, quiz, and question so guidance stays grounded in your reality, not a generic average.",
    mock: (
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold uppercase tracking-wider">Student</span>
          <span className="font-semibold uppercase tracking-wider text-primary">Learning Twin</span>
        </div>
        <div className="mt-5 rounded-xl border border-border/60 bg-secondary/40 p-4">
          <p className="text-sm font-medium">Concept: Vectors</p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-background">
            <div className="h-full w-[82%] bg-gradient-to-r from-primary to-accent" />
          </div>
          <p className="mt-2 text-right text-xs font-semibold text-primary">82%</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          {["Algebra", "Kinematics", "Recursion"].map((t) => (
            <span key={t} className="rounded-lg bg-secondary py-2 font-medium">{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    slug: "knowledge-gap",
    eyebrow: "Proactive",
    title: "Knowledge Gap Analysis",
    body: "Instead of waiting for a bad exam to surface issues, EduNova continuously analyzes your responses to spot fragile concepts and prescribes tiny, targeted reinforcement — before they become blockers.",
    mock: (
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Gap: Kinematics</p>
          <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
            3 clusters
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { l: "Free-fall", v: 42 },
            { l: "Projectiles", v: 61 },
            { l: "Relative", v: 28 },
          ].map((g) => (
            <div key={g.l} className="rounded-xl border border-border/60 bg-secondary/40 p-3">
              <p className="text-[11px] font-medium text-muted-foreground">{g.l}</p>
              <p className="mt-1 text-lg font-bold text-primary">{g.v}%</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-3 text-xs text-muted-foreground">
          Prescribed: 12-min targeted micro-lesson on free-fall reasoning.
        </div>
      </div>
    ),
  },
  {
    slug: "adaptive-recommendations",
    eyebrow: "Smart",
    title: "Adaptive Recommendations",
    body: "A recommender that respects your goals, energy, and calendar. It sequences the next best lesson so learning compounds instead of drifting.",
    mock: (
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Your path</p>
        <ol className="mt-4 space-y-2">
          {[
            { t: "Review: Big-O basics", done: true },
            { t: "Next: Recursion", done: false, active: true },
            { t: "Then: Dynamic Programming", done: false },
          ].map((s) => (
            <li
              key={s.t}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-sm ${
                s.active
                  ? "border-primary/40 bg-primary/5 text-foreground"
                  : "border-border bg-secondary/40 text-muted-foreground"
              }`}
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold ${
                  s.done ? "bg-primary text-primary-foreground" : "bg-background text-primary"
                }`}
              >
                {s.done ? "✓" : "→"}
              </span>
              {s.t}
            </li>
          ))}
        </ol>
      </div>
    ),
  },
  {
    slug: "ai-tutor",
    eyebrow: "24/7",
    title: "AI Tutor",
    body: "A patient tutor that meets you at your level, shows its work, and adapts explanations across three registers — visual, verbal, and worked example — until it clicks.",
    mock: (
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <div className="space-y-3">
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-primary p-3 text-sm text-primary-foreground">
            Why does entropy always increase?
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-secondary p-3 text-sm">
            Because reversible states are rare — let's build it visually.
            <span className="mt-2 block text-[11px] font-medium text-muted-foreground">
              Cited: Thermodynamics · L4
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "exam-generator",
    eyebrow: "Exam-ready",
    title: "Exam Generator",
    body: "Generates realistic mock exams based on your syllabus, previous performance, and target difficulty — with instant analytics and per-item explanations.",
    mock: (
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold">Mock JEE · Physics</span>
          <span className="rounded-md bg-secondary px-2 py-1 font-mono font-semibold">42:17</span>
        </div>
        <p className="mt-4 text-sm font-medium">
          Q7. A block slides down a frictionless incline…
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {["A. g sinθ", "B. g cosθ", "C. g tanθ", "D. g"].map((o, i) => (
            <button
              key={o}
              className={`rounded-lg border px-3 py-2 text-left transition ${
                i === 0
                  ? "border-primary/40 bg-primary/5 text-foreground"
                  : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
        <p className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Question 7 of 30</span>
          <span>Auto-saved</span>
        </p>
      </div>
    ),
  },
  {
    slug: "progress-analytics",
    eyebrow: "Insightful",
    title: "Progress Analytics",
    body: "Analytics designed to be read at a glance — not to be an admin task. Track streaks, mastery, and time on task without doom-scrolling dashboards.",
    mock: (
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold uppercase tracking-wider">This week</span>
          <span>Mon → Sun</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
            <p className="text-2xl font-bold text-primary">6.4h</p>
            <p className="text-[11px] font-medium text-muted-foreground">Focus</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
            <p className="text-2xl font-bold text-accent-foreground">+12</p>
            <p className="text-[11px] font-medium text-muted-foreground">Mastered</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
            <p className="text-2xl font-bold">🔥 7</p>
            <p className="text-[11px] font-medium text-muted-foreground">Streak</p>
          </div>
        </div>
        <div className="mt-4 flex h-16 items-end gap-1.5">
          {[38, 62, 45, 78, 55, 82, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-primary/40 to-primary"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
];

export function AIFeatures() {
  return (
    <section className="relative bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">AI Features</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            An AI stack for <span className="text-gradient">real learning</span>
          </h2>
        </div>

        <div className="mt-16 space-y-20">
          {features.map((f, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={f.slug}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={reverse ? "lg:order-2" : ""}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground">
                    {f.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {f.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{f.body}</p>
                  <Link
                    to="/features/$slug"
                    params={{ slug: f.slug }}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className={reverse ? "lg:order-1" : ""}>
                  <div className="relative">
                    <div
                      className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-highlight/10 to-accent/20 blur-2xl"
                      aria-hidden="true"
                    />
                    <div className="relative">{f.mock}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
