import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Sparkles,
  User,
  Send,
  Mic,
  BookOpen,
  Clock,
  Zap,
  Target,
  TrendingUp,
  Flame,
  Award,
  CheckCircle2,
  Circle,
  Play,
  Layers,
} from "lucide-react";
import type { ReactNode } from "react";

type Feature = {
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
  mock: ReactNode;
};

/* --------------------------- Reusable card shell --------------------------- */

function MockShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Ambient glows */}
      <div
        className="absolute -inset-8 rounded-[36px] blur-3xl opacity-70"
        aria-hidden="true"
        style={{
          background:
            "conic-gradient(from 140deg at 50% 50%, color-mix(in oklab, var(--primary-glow) 35%, transparent), color-mix(in oklab, var(--accent) 30%, transparent), color-mix(in oklab, var(--highlight) 25%, transparent), color-mix(in oklab, var(--primary-glow) 35%, transparent))",
        }}
      />
      <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-accent/40 blur-3xl opacity-60" aria-hidden="true" />
      <div className="absolute -left-6 -bottom-6 h-40 w-40 rounded-full bg-primary-glow/50 blur-3xl opacity-60" aria-hidden="true" />

      {/* Glass card */}
      <div
        className="relative rounded-3xl border border-white/50 bg-white/70 p-6 shadow-elegant backdrop-blur-xl dark:border-white/10 dark:bg-card/60"
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--primary-glow) 8%, transparent), transparent 45%, color-mix(in oklab, var(--accent) 8%, transparent))",
          }}
          aria-hidden="true"
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------- Mockups ---------------------------------- */

function LearningTwinMock() {
  const reduce = useReducedMotion();
  return (
    <MockShell>
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <span>Learning Twin</span>
        <span className="inline-flex items-center gap-1 text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Syncing
        </span>
      </div>

      <div className="relative mt-6 h-56">
        {/* connection SVG */}
        <svg viewBox="0 0 320 220" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="lt-line" x1="0" x2="1">
              <stop offset="0" stopColor="oklch(0.72 0.13 195)" />
              <stop offset="1" stopColor="oklch(0.82 0.14 80)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M60 110 C 130 40, 190 40, 260 110"
            fill="none"
            stroke="url(#lt-line)"
            strokeWidth="2"
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          <motion.path
            d="M60 110 C 130 180, 190 180, 260 110"
            fill="none"
            stroke="url(#lt-line)"
            strokeWidth="2"
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
          />
        </svg>

        {/* left node: student */}
        <motion.div
          className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center"
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-border/60 bg-card shadow-card">
            <User className="h-6 w-6 text-primary" />
          </div>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">You</p>
        </motion.div>

        {/* right node: AI brain */}
        <motion.div
          className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary to-highlight text-primary-foreground shadow-glow">
            <Brain className="h-6 w-6" />
            <span className="absolute inset-0 rounded-2xl ring-2 ring-primary/40 animate-ping" />
          </div>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-primary">AI Twin</p>
        </motion.div>

        {/* floating chips */}
        <motion.div
          className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full border border-border/60 bg-card/90 px-3 py-1 text-[10px] font-semibold shadow-card backdrop-blur"
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-primary">●</span> Concept mastery <span className="text-accent-foreground font-bold">+12</span>
        </motion.div>
        <motion.div
          className="absolute left-1/2 bottom-2 -translate-x-1/2 rounded-full border border-border/60 bg-card/90 px-3 py-1 text-[10px] font-semibold shadow-card backdrop-blur"
          animate={reduce ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <Sparkles className="mr-1 inline h-3 w-3 text-accent-foreground" />
          Next lesson tuned
        </motion.div>
      </div>

      {/* mastery bars */}
      <div className="mt-4 space-y-2.5">
        {[
          { l: "Vectors", v: 82 },
          { l: "Recursion", v: 64 },
          { l: "Kinematics", v: 48 },
        ].map((t, i) => (
          <div key={t.l} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-[11px] font-semibold">{t.l}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                whileInView={{ width: `${t.v}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 + i * 0.15, ease: "easeOut" }}
              />
            </div>
            <span className="w-8 text-right text-[11px] font-bold text-primary">{t.v}%</span>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

function KnowledgeGapMock() {
  const reduce = useReducedMotion();
  // 5x4 heatmap
  const cells = [
    "g","g","g","o","g",
    "g","o","r","o","g",
    "g","g","o","r","o",
    "g","g","g","o","g",
  ];
  const color: Record<string, string> = {
    g: "bg-success/70 border-success/40",
    o: "bg-accent/80 border-accent/50",
    r: "bg-destructive/70 border-destructive/40",
  };
  return (
    <MockShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Concept Heatmap
          </p>
          <p className="mt-1 text-sm font-semibold">Physics · Semester 1</p>
        </div>
        <motion.div
          className="rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive"
          animate={reduce ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          3 gaps detected
        </motion.div>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-2">
        {cells.map((c, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02, duration: 0.35 }}
            className={`aspect-square rounded-lg border ${color[c]} shadow-sm`}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider">
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-success/70" /> Mastered</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-accent/80" /> Review</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-destructive/70" /> Weak</span>
      </div>

      <div className="mt-4 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-3">
        <p className="text-[11px] font-semibold text-primary">Prescribed</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          12-min micro-lesson: <span className="font-semibold text-foreground">Free-fall reasoning</span>
        </p>
      </div>
    </MockShell>
  );
}

function AITutorMock() {
  const reduce = useReducedMotion();
  return (
    <MockShell>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-highlight text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">Nova Tutor</p>
            <p className="text-[10px] text-success">● Online · answering</p>
          </div>
        </div>
        <button className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-primary shadow-card">
          <Mic className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-2.5">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="ml-auto max-w-[78%] rounded-2xl rounded-tr-md bg-primary px-3.5 py-2.5 text-sm text-primary-foreground shadow-card"
        >
          Why does entropy always increase?
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-[85%] rounded-2xl rounded-tl-md border border-border/60 bg-secondary/70 px-3.5 py-2.5 text-sm backdrop-blur"
        >
          Because reversible states are statistically rare. Let me sketch it visually
          <span className={reduce ? "" : "ml-0.5 inline-block w-1 -mb-0.5 h-3.5 align-middle bg-foreground animate-pulse"} />
          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
            <BookOpen className="h-3 w-3" /> Cited: Thermodynamics · L4
          </div>
        </motion.div>

        {/* typing */}
        <div className="flex items-center gap-1 pl-2">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "120ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "240ms" }} />
        </div>
      </div>

      {/* suggestions */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {["Show worked example", "Explain simpler", "Give a quiz"].map((s) => (
          <span key={s} className="rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-semibold text-foreground/80 shadow-sm">
            {s}
          </span>
        ))}
      </div>

      {/* input */}
      <div className="mt-3 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
        <input readOnly value="Ask Nova anything…" className="flex-1 bg-transparent text-xs text-muted-foreground outline-none" />
        <button className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* floating notif */}
      <motion.div
        className="absolute -right-3 -top-3 flex items-center gap-1.5 rounded-full border border-accent/30 bg-card px-2.5 py-1 text-[10px] font-bold shadow-card"
        animate={reduce ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap className="h-3 w-3 text-accent-foreground" />
        Instant answer
      </motion.div>
    </MockShell>
  );
}

function ExamGeneratorMock() {
  const reduce = useReducedMotion();
  return (
    <MockShell>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Mock Exam Builder</p>
        <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] font-bold">
          <Clock className="h-3 w-3" /> 42:17
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Subject</p>
          <p className="mt-1 text-sm font-bold">Physics</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Questions</p>
          <p className="mt-1 text-sm font-bold">30</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Difficulty</p>
          <div className="mt-1.5 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= 4 ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Duration</p>
          <p className="mt-1 text-sm font-bold">45 min</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-primary/25 bg-primary/5 p-3">
        <p className="text-[11px] font-semibold text-primary">Q7 · Preview</p>
        <p className="mt-1 text-xs font-medium leading-snug">
          A block slides down a frictionless incline of angle θ. Its acceleration is:
        </p>
        <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px]">
          {["A. g sinθ", "B. g cosθ", "C. g tanθ", "D. g"].map((o, i) => (
            <span
              key={o}
              className={`rounded-lg border px-2 py-1.5 ${
                i === 0
                  ? "border-primary/40 bg-primary/10 font-semibold text-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {o}
            </span>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={reduce ? undefined : { scale: 1.02 }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-highlight px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
      >
        <Play className="h-4 w-4 fill-current" /> Generate Exam
      </motion.button>

      <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-muted-foreground">
        <Sparkles className="h-3 w-3 text-accent-foreground" />
        AI recommends focusing on kinematics gaps
      </div>
    </MockShell>
  );
}

function AnalyticsMock() {
  const reduce = useReducedMotion();
  const bars = [38, 62, 45, 78, 55, 82, 70];
  return (
    <MockShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">This week</p>
          <p className="mt-1 text-sm font-semibold">Learning Trend</p>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
          <TrendingUp className="h-3 w-3" /> +18%
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-border/60 bg-secondary/40 p-2.5">
          <p className="text-lg font-bold text-primary">6.4h</p>
          <p className="text-[10px] font-semibold text-muted-foreground">Focus</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-secondary/40 p-2.5">
          <p className="inline-flex items-center gap-1 text-lg font-bold"><Flame className="h-4 w-4 text-accent-foreground" />7</p>
          <p className="text-[10px] font-semibold text-muted-foreground">Streak</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-secondary/40 p-2.5">
          <p className="text-lg font-bold text-highlight">92</p>
          <p className="text-[10px] font-semibold text-muted-foreground">Score</p>
        </div>
      </div>

      <div className="mt-4 flex h-24 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-primary/30 to-primary"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 text-center text-[9px] font-semibold text-muted-foreground">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      {/* completion ring */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border/60 bg-secondary/40 p-3">
        <div className="relative h-14 w-14">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="color-mix(in oklab, var(--foreground) 10%, transparent)" strokeWidth="3" />
            <motion.circle
              cx="18" cy="18" r="15" fill="none"
              stroke="url(#ring-grad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="94.2"
              initial={{ strokeDashoffset: 94.2 }}
              whileInView={{ strokeDashoffset: 94.2 * (1 - 0.74) }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="ring-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="oklch(0.52 0.11 200)" />
                <stop offset="1" stopColor="oklch(0.82 0.14 80)" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 grid place-items-center text-xs font-bold">74%</span>
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-semibold">Weekly goal</p>
          <p className="text-[10px] text-muted-foreground">7 of 10 lessons completed</p>
        </div>
        <motion.div
          className="rounded-full border border-accent/30 bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent-foreground"
          animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Award className="mr-1 inline h-3 w-3" /> On track
        </motion.div>
      </div>
    </MockShell>
  );
}

function LearningPathMock() {
  const steps = [
    { t: "Foundations", d: "Algebra basics", done: true },
    { t: "Core", d: "Vectors & motion", done: true },
    { t: "Now", d: "Recursion", active: true },
    { t: "Next", d: "Dynamic Programming" },
    { t: "Goal", d: "Advanced Physics", goal: true },
  ];
  return (
    <MockShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Your Roadmap</p>
          <p className="mt-1 text-sm font-semibold">Path to IIT-JEE 2027</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">42% complete</span>
      </div>

      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-highlight to-accent"
          initial={{ width: 0 }}
          whileInView={{ width: "42%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      <ol className="mt-6 relative space-y-3">
        {/* vertical connector */}
        <div className="absolute left-3 top-1 bottom-1 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" aria-hidden="true" />
        {steps.map((s, i) => (
          <motion.li
            key={s.t}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative flex items-start gap-3 rounded-xl border px-3 py-2 ${
              s.active
                ? "border-primary/40 bg-primary/5"
                : s.goal
                  ? "border-accent/30 bg-accent/10"
                  : "border-border bg-secondary/40"
            }`}
          >
            <span
              className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                s.done
                  ? "bg-primary text-primary-foreground"
                  : s.active
                    ? "bg-highlight text-highlight-foreground ring-4 ring-highlight/20"
                    : s.goal
                      ? "bg-accent text-accent-foreground"
                      : "bg-card text-muted-foreground border border-border"
              }`}
            >
              {s.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : s.goal ? <Target className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
            </span>
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{s.t}</p>
              <p className="text-sm font-semibold">{s.d}</p>
            </div>
            {s.active && (
              <span className="rounded-md bg-highlight/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-highlight">
                Live
              </span>
            )}
          </motion.li>
        ))}
      </ol>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 text-[11px]">
        <Layers className="h-3.5 w-3.5 text-primary" />
        <span className="font-semibold">Adaptive:</span>
        <span className="text-muted-foreground">re-routed after last quiz</span>
      </div>
    </MockShell>
  );
}

/* -------------------------------- Data ------------------------------------- */

const features: Feature[] = [
  {
    slug: "learning-twin",
    eyebrow: "Personalized",
    title: "Learning Twin",
    body: "The Learning Twin creates a living knowledge profile for every learner. It continuously adapts future lessons, quizzes, revision plans, and recommendations based on strengths, weaknesses, learning pace, and goals.",
    mock: <LearningTwinMock />,
  },
  {
    slug: "knowledge-gap",
    eyebrow: "Proactive",
    title: "Knowledge Gap Analysis",
    body: "EduNova AI detects weak concepts before they become learning barriers. It analyzes quiz performance, identifies gaps, and recommends targeted revision — so nothing quietly slips through.",
    mock: <KnowledgeGapMock />,
  },
  {
    slug: "ai-tutor",
    eyebrow: "24/7",
    title: "AI Tutor",
    body: "An intelligent tutor that answers questions instantly with visual explanations, worked examples, interactive hints, code support, and personalized feedback — right when you need it.",
    mock: <AITutorMock />,
  },
  {
    slug: "exam-generator",
    eyebrow: "Exam-Ready",
    title: "Exam Generator",
    body: "Generate realistic exams from syllabus coverage, previous performance, learning gaps, and difficulty settings — with AI-generated explanations for every question.",
    mock: <ExamGeneratorMock />,
  },
  {
    slug: "progress-analytics",
    eyebrow: "Insights",
    title: "Progress Analytics",
    body: "Track learning with intelligent dashboards showing concept mastery, study time, quiz performance, completion rates, streaks, and AI-powered recommendations.",
    mock: <AnalyticsMock />,
  },
  {
    slug: "learning-paths",
    eyebrow: "Adaptive",
    title: "Smart Learning Paths",
    body: "AI automatically builds personalized roadmaps from your goals, progress, strengths, career interests, and available study time — and reroutes as you grow.",
    mock: <LearningPathMock />,
  },
];

/* -------------------------------- Section ---------------------------------- */

const wordReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const wordItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] as const } },
};

function Heading() {
  const words = ["An", "AI", "Stack", "for", "Real", "Learning"];
  return (
    <motion.h2
      variants={wordReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={wordItem}
          className={`inline-block ${i === 1 || i === 2 ? "text-gradient bg-[length:200%_100%] [animation:gradient-shift_6s_ease_infinite]" : ""}`}
          style={{ marginRight: "0.28em" }}
        >
          {w}
        </motion.span>
      ))}
    </motion.h2>
  );
}

export function AIFeatures() {
  return (
    <section id="ai-features" className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Background wash */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[520px] w-[880px] -translate-x-1/2 rounded-full bg-primary-glow/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[520px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute inset-0 bg-grid-fade opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" /> AI Powered Learning
          </motion.span>
          <Heading />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Every AI capability works together to personalize education, improve understanding,
            identify weak areas, and help learners achieve their goals faster.
          </motion.p>
        </div>

        {/* Feature rows */}
        <div className="mt-20 space-y-24 sm:mt-24 sm:space-y-32">
          {features.map((f, i) => {
            const reverse = i % 2 === 1;
            return (
              <div key={f.slug} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
                  className={reverse ? "lg:order-2" : ""}
                >
                  <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-foreground">
                    {f.eyebrow}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    {f.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">{f.body}</p>
                  <Link
                    to="/features/$slug"
                    params={{ slug: f.slug }}
                    className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>

                {/* Mock */}
                <motion.div
                  initial={{ opacity: 0, x: reverse ? -40 : 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                  whileHover={{ y: -4 }}
                  className={`${reverse ? "lg:order-1" : ""} will-change-transform`}
                >
                  {f.mock}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
