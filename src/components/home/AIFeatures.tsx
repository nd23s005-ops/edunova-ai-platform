import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Brain,
  Sparkles,
  MessagesSquare,
  LineChart as LineChartIcon,
  Route as RouteIcon,
  User,
  Cpu,
  Mic,
  Paperclip,
  Check,
  CircleDot,
  Lock,
  TrendingUp,
  Star,
  Zap,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Feature 1 · Learning Twin                                                 */
/* -------------------------------------------------------------------------- */
function LearningTwinCard() {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-elegant backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(120,220,225,0.35),transparent_70%)] blur-2xl" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-highlight blur-md opacity-60" />
              <div className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-highlight text-primary-foreground">
                <User className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Learner</p>
              <p className="text-sm font-bold text-foreground">Aarav · Grade 11</p>
            </div>
          </div>
          <motion.div
            animate={reduce ? undefined : { rotate: [0, 8, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent/25 to-primary/20 text-accent-foreground shadow-glow"
          >
            <Brain className="h-5 w-5 text-primary" />
          </motion.div>
        </div>

        {/* Connection line */}
        <svg viewBox="0 0 320 60" className="mt-4 h-12 w-full" aria-hidden="true">
          <motion.path
            d="M20,30 C90,-10 220,70 300,30"
            fill="none"
            stroke="url(#twinGrad)"
            strokeWidth="2"
            strokeDasharray="4 6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="twinGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#EF7B24" />
              <stop offset="100%" stopColor="#3FB8B0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="mt-2 space-y-3">
          <MasteryRow label="Algebra" value={92} tone="primary" />
          <MasteryRow label="Trigonometry" value={74} tone="accent" />
          <MasteryRow label="Calculus" value={58} tone="warn" />
        </div>

        <div className="mt-5 flex items-center justify-between rounded-2xl border border-border/60 bg-secondary/40 px-4 py-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Knowledge Score</p>
            <p className="mt-0.5 font-display text-2xl font-bold text-foreground">
              8.4<span className="text-base text-muted-foreground">/10</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">This Week</p>
            <p className="mt-0.5 inline-flex items-center gap-1 text-sm font-bold text-success">
              <TrendingUp className="h-4 w-4" /> +12%
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MasteryRow({ label, value, tone }: { label: string; value: number; tone: "primary" | "accent" | "warn" }) {
  const color =
    tone === "primary"
      ? "from-primary to-highlight"
      : tone === "accent"
      ? "from-accent to-primary-glow"
      : "from-amber-400 to-rose-400";
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <span className="font-bold text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Feature 2 · Knowledge Gap Heatmap                                         */
/* -------------------------------------------------------------------------- */
function KnowledgeGapCard() {
  const reduce = useReducedMotion();
  // 0 mastered · 1 review · 2 weak
  const grid = [
    0, 0, 1, 0, 0, 2,
    0, 1, 0, 0, 2, 0,
    0, 0, 0, 1, 0, 0,
    1, 0, 0, 0, 0, 0,
    0, 0, 2, 0, 1, 0,
  ];
  const swatch = (v: number) =>
    v === 0
      ? "bg-emerald-400/85"
      : v === 1
      ? "bg-orange-400/85"
      : "bg-rose-500/85";

  return (
    <div className="relative">
      <motion.div
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-elegant backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Concept Heatmap</p>
            <p className="mt-1 font-display text-lg font-bold text-foreground">Physics · Chapter Review</p>
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-rose-300/60 bg-rose-50 px-3 py-1 text-[11px] font-bold text-rose-600 shadow-sm"
          >
            <span className={`h-1.5 w-1.5 rounded-full bg-rose-500 ${reduce ? "" : "animate-pulse"}`} />
            3 Gaps Detected
          </motion.div>
        </div>

        <div className="mt-5 grid grid-cols-6 gap-2">
          {grid.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.015, duration: 0.35 }}
              className={`aspect-square rounded-lg ${swatch(v)} shadow-sm`}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
          <Legend color="bg-emerald-400" label="Mastered" />
          <Legend color="bg-orange-400" label="Needs Review" />
          <Legend color="bg-rose-500" label="Weak" />
        </div>

        <div className="mt-5 rounded-2xl border border-border/60 bg-secondary/40 p-3">
          <p className="text-xs font-semibold text-foreground">Recommended next: <span className="text-primary">Newton's Third Law</span></p>
        </div>
      </motion.div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-sm ${color}`} /> {label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Feature 3 · Smart Learning Paths                                          */
/* -------------------------------------------------------------------------- */
function LearningPathCard() {
  const reduce = useReducedMotion();
  const steps = [
    { title: "Foundations", state: "done" as const, icon: Check },
    { title: "Core Concepts", state: "done" as const, icon: Check },
    { title: "Practice & Quizzes", state: "current" as const, icon: CircleDot },
    { title: "Advanced Topics", state: "next" as const, icon: Sparkles },
    { title: "Capstone Project", state: "locked" as const, icon: Lock },
  ];
  return (
    <div className="relative">
      <motion.div
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-elegant backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Personalized Roadmap</p>
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">Data Science</span>
        </div>

        <div className="relative mt-5 pl-3">
          {/* animated vertical path */}
          <svg className="absolute left-3 top-2 h-[calc(100%-16px)] w-6" viewBox="0 0 24 300" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M12,4 C22,60 4,120 12,180 C20,220 6,260 12,296"
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="pathGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#EF7B24" />
                <stop offset="100%" stopColor="#3FB8B0" />
              </linearGradient>
            </defs>
          </svg>

          <ul className="relative space-y-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const bg =
                s.state === "done"
                  ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white"
                  : s.state === "current"
                  ? "bg-gradient-to-br from-primary to-highlight text-primary-foreground shadow-glow"
                  : s.state === "next"
                  ? "bg-accent/20 text-accent-foreground"
                  : "bg-secondary text-muted-foreground";
              return (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 pl-6"
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${bg}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex flex-1 items-center justify-between rounded-xl border border-border/60 bg-white/[0.05] px-3 py-2">
                    <span className="text-sm font-semibold text-foreground">{s.title}</span>
                    {s.state === "current" && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary">In Progress</span>
                    )}
                    {s.state === "next" && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-accent-foreground">AI Pick</span>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Feature 4 · AI Tutor Chat                                                 */
/* -------------------------------------------------------------------------- */
function AITutorCard() {
  const reduce = useReducedMotion();
  const [dots, setDots] = useState(1);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setDots((d) => (d % 3) + 1), 450);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative">
      <motion.div
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-elegant backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 border-b border-border/50 pb-4">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-highlight text-primary-foreground">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">EduNova AI Tutor</p>
            <p className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
              <span className={`h-1.5 w-1.5 rounded-full bg-emerald-500 ${reduce ? "" : "animate-pulse"}`} /> Online
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-primary-foreground shadow-sm"
          >
            Can you explain photosynthesis with a simple example?
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-[85%] rounded-2xl rounded-bl-md border border-border/60 bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm"
          >
            Sure! Think of a leaf as a tiny kitchen. Sunlight is the stove, water and CO₂ are the ingredients, and the leaf cooks up glucose + oxygen…
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="inline-flex items-center gap-1 rounded-2xl rounded-bl-md border border-border/60 bg-card px-3.5 py-2 text-sm text-muted-foreground shadow-sm"
          >
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full bg-primary/70 transition-opacity ${
                    dots > i ? "opacity-100" : "opacity-30"
                  }`}
                />
              ))}
            </span>
          </motion.div>
        </div>

        {/* Prompt chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {["Give a quiz", "Simpler please", "Show diagram"].map((p) => (
            <button key={p} className="rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground transition hover:border-primary/40 hover:text-primary">
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-3 py-2 shadow-sm">
          <Paperclip className="h-4 w-4 text-muted-foreground" />
          <span className="flex-1 text-sm text-muted-foreground">Ask anything…</span>
          <Mic className="h-4 w-4 text-primary" />
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-highlight text-primary-foreground">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Feature 5 · Learning Analytics                                            */
/* -------------------------------------------------------------------------- */
function AnalyticsCard() {
  const reduce = useReducedMotion();
  const bars = [40, 62, 48, 78, 66, 88, 72];
  return (
    <div className="relative">
      <motion.div
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-elegant backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Weekly Progress</p>
            <p className="mt-1 font-display text-lg font-bold text-foreground">14h 32m studied</p>
          </div>
          <div className="relative grid place-items-center">
            <svg viewBox="0 0 60 60" className="h-14 w-14 -rotate-90">
              <circle cx="30" cy="30" r="24" fill="none" stroke="rgb(230,230,230)" strokeWidth="6" />
              <motion.circle
                cx="30" cy="30" r="24" fill="none"
                stroke="url(#circGrad)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 24}
                initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                whileInView={{ strokeDashoffset: 2 * Math.PI * 24 * (1 - 0.78) }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
              />
              <defs>
                <linearGradient id="circGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#EF7B24" />
                  <stop offset="100%" stopColor="#3FB8B0" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute font-display text-sm font-bold text-foreground">78%</span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="mt-5 flex h-32 items-end gap-2 rounded-2xl bg-secondary/40 p-3">
          {bars.map((v, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${v}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              className="flex-1 rounded-lg bg-gradient-to-t from-primary to-highlight shadow-sm"
            />
          ))}
        </div>

        {/* Metric cards */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Metric icon={Zap} label="Streak" value="12d" />
          <Metric icon={Star} label="Mastery" value="84%" />
          <Metric icon={TrendingUp} label="Trend" value="+18%" />
        </div>
      </motion.div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Zap; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-white/[0.04] p-2.5">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3 text-primary" /> {label}
      </div>
      <p className="mt-0.5 font-display text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}


/* -------------------------------------------------------------------------- */
/*  Feature copy + rows                                                       */
/* -------------------------------------------------------------------------- */
type Feature = {
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
  visual: ReactNode;
};

const features: Feature[] = [
  {
    slug: "learning-twin",
    eyebrow: "Personalized",
    title: "Learning Twin",
    body: "The Learning Twin builds a personalized knowledge model for every learner — tracking concepts, strengths, weaknesses, quizzes, and progress over time — and continuously adapts future lessons and recommendations.",
    visual: <LearningTwinCard />,
  },
  {
    slug: "knowledge-gap-analysis",
    eyebrow: "Proactive",
    title: "Knowledge Gap Analysis",
    body: "EduNova AI automatically detects weak concepts before exams, identifies learning gaps, recommends targeted revision, and helps students improve before they struggle.",
    visual: <KnowledgeGapCard />,
  },
  {
    slug: "smart-learning-paths",
    eyebrow: "Adaptive",
    title: "Smart Learning Paths",
    body: "AI generates personalized learning roadmaps based on each student's goals, learning speed, performance, and interests — and reroutes as they grow.",
    visual: <LearningPathCard />,
  },
  {
    slug: "learning-analytics",
    eyebrow: "Insights",
    title: "Learning Analytics",
    body: "Track progress with intelligent dashboards showing study time, concept mastery, quiz performance, strengths, and improvement trends.",
    visual: <AnalyticsCard />,
  },
];

function Row({ feature, index }: { feature: Feature; index: number }) {
  const visualLeft = index % 2 === 1;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, x: visualLeft ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        className={visualLeft ? "lg:order-2" : "lg:order-1"}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3 w-3" /> {feature.eyebrow}
        </span>
        <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {feature.title}
        </h3>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          {feature.body}
        </p>
        <Link
          to="/features/$slug"
          params={{ slug: feature.slug }}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-all hover:gap-2.5"
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, x: visualLeft ? -40 : 40, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        className={visualLeft ? "lg:order-1" : "lg:order-2"}
      >
        {feature.visual}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */
const wordReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const wordItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] as const },
  },
};

function Heading() {
  const words = ["An", "AI", "stack", "for", "real", "learning"];
  return (
    <motion.h2
      variants={wordReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[56px]"
    >
      {words.map((w, i) => {
        const highlight = i === 1 || i === 2;
        return (
          <motion.span
            key={i}
            variants={wordItem}
            className={
              highlight
                ? "inline-block bg-[linear-gradient(92deg,#F19A3E_0%,#EF7B24_45%,#E85A9E_100%)] bg-[length:220%_100%] bg-clip-text text-transparent [animation:gradient-shift_7s_ease_infinite]"
                : "inline-block"
            }
            style={{ marginRight: "0.28em" }}
          >
            {w}
          </motion.span>
        );
      })}
    </motion.h2>
  );
}

export function AIFeatures() {
  return (
    <section id="ai-features" className="relative overflow-hidden py-24 sm:py-32" style={{ background: "transparent" }}>
      {/* Background wash */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-1/4 top-40 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(239,123,36,0.14), transparent 70%)" }}
        />
        <div
          className="absolute bottom-40 right-0 h-[420px] w-[520px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(120,220,225,0.18), transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-white/[0.05] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" /> AI-Powered Learning
          </motion.span>
          <Heading />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Every AI feature works together to personalize learning, identify knowledge gaps,
            recommend the next best lesson, and accelerate student success.
          </motion.p>
        </div>

        {/* Alternating rows */}
        <div className="mt-24 space-y-28 sm:mt-28 sm:space-y-32">
          {features.map((f, i) => (
            <Row key={f.slug} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
