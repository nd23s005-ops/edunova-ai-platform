import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  LineChart,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  Trophy,
  Flame,
  Brain,
  BookOpen,
  Gauge,
  ShieldCheck,
  Lock,
  Users,
  Building2,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Zap,
  Eye,
  Calendar,
  Award,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";

const TITLE = "Learning Analytics — EduNova AI";
const DESCRIPTION =
  "Intelligent dashboards that translate every study session into insight — mastery, time, momentum, and next-best actions, at a glance.";

export const Route = createFileRoute("/_marketing/features/learning-analytics")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearningAnalyticsPage,
});

/* -------------------------------------------------------------------------- */
/*  Hero illustration                                                          */
/* -------------------------------------------------------------------------- */
function HeroIllustration() {
  const bars = [42, 68, 55, 82, 74, 91, 88];
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-6 shadow-elegant backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(63,184,176,0.35),transparent_70%)] blur-2xl" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
            <LineChart className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">This week</p>
            <p className="text-sm font-bold">Learning Momentum</p>
          </div>
        </div>
        <Badge variant="secondary" className="gap-1">
          <TrendingUp className="h-3 w-3 text-primary" /> +18%
        </Badge>
      </div>

      <div className="mt-6 grid grid-cols-7 items-end gap-2 h-40">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
            className="rounded-t-md bg-gradient-to-t from-primary/70 to-accent/80"
          />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2 text-[10px] text-muted-foreground text-center">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "Study Time", value: "12h 40m", icon: Clock },
          { label: "Mastery", value: "78%", icon: Gauge },
          { label: "Streak", value: "14 days", icon: Flame },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border/60 bg-background/40 p-3">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <s.icon className="h-3 w-3" /> {s.label}
            </div>
            <p className="mt-1 text-lg font-bold">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Metric cards                                                               */
/* -------------------------------------------------------------------------- */
const METRICS = [
  { icon: Clock, label: "Study Time", desc: "Total focused minutes tracked automatically across every session." },
  { icon: Gauge, label: "Concept Mastery", desc: "Per-concept scores that update after every quiz, lesson, and revision." },
  { icon: Target, label: "Quiz Accuracy", desc: "Rolling accuracy segmented by topic, difficulty, and question type." },
  { icon: Flame, label: "Learning Streak", desc: "Daily consistency — the single strongest predictor of long-term progress." },
  { icon: TrendingUp, label: "Improvement Rate", desc: "Week-over-week gains in weak topics so momentum is visible." },
  { icon: Brain, label: "Retention Score", desc: "Spaced-recall performance that shows what's truly sticking in memory." },
  { icon: Activity, label: "Engagement", desc: "Depth of interaction — questions asked, notes taken, exercises attempted." },
  { icon: BookOpen, label: "Coverage", desc: "Syllabus completeness by chapter, unit, and objective." },
] as const;

/* -------------------------------------------------------------------------- */
/*  Insight panels                                                              */
/* -------------------------------------------------------------------------- */
const INSIGHTS = [
  {
    icon: Eye,
    title: "See at a glance",
    body: "Every dashboard is designed so learners and mentors understand progress in under 10 seconds — no spreadsheets required.",
  },
  {
    icon: Zap,
    title: "Action, not just numbers",
    body: "Each chart pairs with an AI recommendation: revise this topic, retry this quiz, or move on to what's next.",
  },
  {
    icon: Calendar,
    title: "Time you actually studied",
    body: "Passive tab time is filtered out. Only focused, verified study minutes count toward your streak.",
  },
  {
    icon: AlertCircle,
    title: "Early warning signals",
    body: "Silent drops in accuracy, engagement, or retention surface before they turn into missed goals.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Workflow                                                                    */
/* -------------------------------------------------------------------------- */
const WORKFLOW = [
  { icon: Activity, title: "Capture", body: "Every quiz answer, lesson completed, note taken, and minute studied is logged." },
  { icon: BarChart3, title: "Compute", body: "Signals are combined into mastery, retention, and momentum scores." },
  { icon: PieChart, title: "Visualize", body: "Insights render as focused charts — not overwhelming data walls." },
  { icon: Sparkles, title: "Recommend", body: "The AI turns each insight into a next-best action tailored to the learner." },
  { icon: TrendingUp, title: "Improve", body: "Learners iterate weekly; mentors see progress; parents get clarity." },
];

/* -------------------------------------------------------------------------- */
/*  Audiences                                                                   */
/* -------------------------------------------------------------------------- */
const AUDIENCES = [
  {
    icon: GraduationCap,
    who: "Students",
    points: ["See exactly where you stand", "Know what to revise next", "Celebrate real progress"],
  },
  {
    icon: Users,
    who: "Professionals",
    points: ["Track upskilling ROI", "Balance learning with work", "Visualize career readiness"],
  },
  {
    icon: Building2,
    who: "Organizations",
    points: ["Team-wide adoption metrics", "Skill coverage heatmaps", "Compliance-friendly reporting"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Dashboard preview cards                                                     */
/* -------------------------------------------------------------------------- */
function MasteryHeatmap() {
  const cells = Array.from({ length: 35 }, (_, i) => ((i * 7) % 100));
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <PieChart className="h-4 w-4 text-primary" /> Mastery Heatmap
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {cells.map((v, i) => (
          <div
            key={i}
            className="h-6 rounded-md"
            style={{
              backgroundColor: `hsl(174 60% ${90 - v * 0.55}%)`,
            }}
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Each cell = one concept · darker = stronger mastery</p>
    </div>
  );
}

function WeakestTopics() {
  const topics = [
    { name: "Trigonometric Identities", score: 42 },
    { name: "Kinematics — Projectiles", score: 51 },
    { name: "Redox Reactions", score: 58 },
  ];
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <TrendingDown className="h-4 w-4 text-primary" /> Focus Areas
      </div>
      <div className="mt-4 space-y-3">
        {topics.map((t) => (
          <div key={t.name}>
            <div className="flex justify-between text-xs">
              <span className="font-medium">{t.name}</span>
              <span className="text-muted-foreground">{t.score}%</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${t.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GoalCard() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Trophy className="h-4 w-4 text-primary" /> Weekly Goal
      </div>
      <p className="mt-3 text-2xl font-bold">8 / 10 hrs</p>
      <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: "80%" }} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">On track to hit your weekly target — 2 hours to go.</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                        */
/* -------------------------------------------------------------------------- */
function LearningAnalyticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Feature · Insights"
        title={
          <>
            Learning <span className="text-gradient">Analytics</span>
          </>
        }
        description={DESCRIPTION}
      />

      {/* Hero visual */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3 text-primary" /> Every signal, one place
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Numbers that finally mean something
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              EduNova AI turns raw activity into decisions. Instead of dashboards full of vanity metrics,
              you get focused insights that answer three questions: <em>Where am I strong? Where am I weak? What do I do next?</em>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/register">
                  Start tracking <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/explore">Explore courses</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </Section>

      {/* Metrics grid */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">Core metrics</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Eight signals that describe real learning
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every chart in EduNova AI is built from these fundamental measurements — captured automatically as you learn.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-2xl border border-border/60 bg-card/60 p-5 shadow-sm"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-base font-bold">{m.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Dashboard preview */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">Dashboard preview</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Read your progress in seconds
          </h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <MasteryHeatmap />
          <WeakestTopics />
          <GoalCard />
        </div>
      </Section>

      {/* Insights */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {INSIGHTS.map((it) => (
            <div key={it.title} className="rounded-2xl border border-border/60 bg-card/60 p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-lg font-bold">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Workflow */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">How it works</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            From activity to action, in five steps
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {WORKFLOW.map((w, i) => (
            <div key={w.title} className="relative rounded-2xl border border-border/60 bg-card/60 p-5">
              <div className="absolute -top-3 left-5 rounded-full bg-gradient-to-r from-primary to-accent px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                Step {i + 1}
              </div>
              <div className="mt-2 grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <w.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-3 text-sm font-bold">{w.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Audiences */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">Who benefits</Badge>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Analytics for every kind of learner
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <div key={a.who} className="rounded-2xl border border-border/60 bg-card/60 p-6">
              <div className="flex items-center gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold">{a.who}</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {a.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Privacy */}
      <Section>
        <div className="rounded-3xl border border-border/60 bg-card/60 p-8 md:p-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Privacy first</p>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Your data belongs to you</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Analytics are visible only to the learner and the people they explicitly share with.
                We never sell learning data, and everything is encrypted in transit and at rest.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-2 text-xs font-semibold">
              <Lock className="h-4 w-4 text-primary" /> Encrypted &amp; private
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-10 text-center">
          <Award className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Start turning study time into progress
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Join EduNova AI and see your first learning insights in minutes.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/register">
                Create your account <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/explore">Browse courses</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
