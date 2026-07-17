import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  TrendingUp,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Rocket,
  Clock,
  ArrowRight,
  BookOpen,
  Users,
  Building2,
  GraduationCap,
  CheckCircle2,
  Layers,
  Lightbulb,
  Compass,
  LineChart,
  Database,
  Activity,
  AlertTriangle,
  Wand2,
  Gauge,
  ListChecks,
  Radar,
  Lock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";

const TITLE = "Knowledge Gap Analysis — EduNova AI";
const DESCRIPTION =
  "Identify learning gaps, strengthen weak concepts, and improve exam performance with EduNova AI's proactive Knowledge Gap Analysis.";

export const Route = createFileRoute("/_marketing/features/knowledge-gap-analysis")({
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
  component: KnowledgeGapPage,
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const HELPS = [
  { icon: Radar, label: "Detect missing concepts" },
  { icon: Gauge, label: "Measure topic mastery" },
  { icon: Activity, label: "Track understanding" },
  { icon: Layers, label: "Build stronger foundations" },
  { icon: Brain, label: "Improve long-term retention" },
];

const STEPS = [
  {
    icon: Database,
    title: "Collect Learning Data",
    text: "Signals stream in from every learning surface — the platform never asks the learner to self-report progress.",
    items: [
      "Course progress",
      "Quiz scores",
      "Practice tests",
      "Assessments",
      "Study time",
      "Topic completion",
    ],
  },
  {
    icon: Activity,
    title: "Analyze Learning Behaviour",
    text: "Nova AI models study patterns and consistency, comparing them to the mastery expected at each stage of the curriculum.",
    items: [
      "Identify learning patterns",
      "Evaluate consistency",
      "Compare expected mastery",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Detect Knowledge Gaps",
    text: "Weakness is traced back to its root concept — not just the wrong answer, but the prerequisite that made it wrong.",
    items: [
      "Weak mathematics concepts",
      "Missing programming fundamentals",
      "Low quiz accuracy",
      "Unfinished lessons",
    ],
  },
  {
    icon: Wand2,
    title: "Recommend Improvements",
    text: "Every learner receives a targeted revision plan built from the exact resources most likely to close the gap.",
    items: [
      "Revision notes",
      "Videos",
      "Practice questions",
      "Mock tests",
      "Learning resources",
    ],
  },
  {
    icon: LineChart,
    title: "Track Improvement",
    text: "Mastery is re-evaluated after every assessment, and recommendations update the moment a gap closes or a new one appears.",
    items: [
      "Continuous mastery scoring",
      "Adaptive recommendations",
      "Trend & momentum tracking",
    ],
  },
];

const FEATURES = [
  {
    icon: Brain,
    title: "AI Concept Analysis",
    text: "Every question, lesson, and note is tagged to concepts, so learning is scored at the level of ideas — not raw marks.",
  },
  {
    icon: Target,
    title: "Weak Topic Detection",
    text: "Nova pinpoints the topics where accuracy, confidence, and retention diverge from the mastery curve.",
  },
  {
    icon: Wand2,
    title: "Smart Revision Suggestions",
    text: "Suggestions are chosen from proven materials, ordered by which one closes the largest gap in the least time.",
  },
  {
    icon: Compass,
    title: "Personalized Learning Recommendations",
    text: "Recommendations respect the learner's board, class, and goal — a Class 10 student and a JEE aspirant get different plans for the same weakness.",
  },
  {
    icon: Gauge,
    title: "Mastery Score",
    text: "A single, evolving score summarizes topic-level and subject-level understanding — always explainable, never a black box.",
  },
  {
    icon: Activity,
    title: "Progress Monitoring",
    text: "Daily and weekly monitoring surfaces momentum, plateaus, and regressions before they become exam surprises.",
  },
  {
    icon: TrendingUp,
    title: "Performance Trends",
    text: "Long-term trends across subjects and skill types show whether effort is translating into durable understanding.",
  },
  {
    icon: BarChart3,
    title: "Learning Analytics",
    text: "Rich analytics for learners, organizations, and admins — with the same underlying model powering every view.",
  },
];

const BENEFITS = [
  {
    icon: GraduationCap,
    audience: "Students",
    points: [
      "Discover weak subjects early",
      "Improve confidence before exams",
      "Learn more efficiently",
    ],
  },
  {
    icon: Building2,
    audience: "Organizations",
    points: [
      "Monitor learner progress",
      "Identify common learning gaps",
      "Improve training outcomes",
    ],
  },
  {
    icon: Users,
    audience: "Administrators",
    points: [
      "Track platform-wide learning performance",
      "Generate learning insights",
      "Improve educational quality",
    ],
  },
];

const DASHBOARD_CARDS = [
  {
    icon: Brain,
    label: "Knowledge Score",
    value: "742",
    delta: "+38 this week",
    hint: "Composite understanding index",
    tone: "from-primary/80 via-primary/40 to-accent/60",
  },
  {
    icon: Gauge,
    label: "Mastery Percentage",
    value: "78%",
    delta: "+6% vs last month",
    hint: "Across active subjects",
    tone: "from-emerald-500/70 via-teal-500/40 to-cyan-500/60",
  },
  {
    icon: AlertTriangle,
    label: "Weak Topics",
    value: "3",
    delta: "Functions · OOP · File I/O",
    hint: "Prioritised by exam weight",
    tone: "from-orange-500/70 via-amber-500/40 to-rose-500/60",
  },
  {
    icon: ListChecks,
    label: "Recommended Actions",
    value: "5",
    delta: "≈ 90 minutes to close",
    hint: "Curated for this week",
    tone: "from-fuchsia-500/70 via-purple-500/40 to-indigo-500/60",
  },
  {
    icon: LineChart,
    label: "Progress Trend",
    value: "Upward",
    delta: "4 weeks of gains",
    hint: "Momentum is strong",
    tone: "from-sky-500/70 via-blue-500/40 to-indigo-500/60",
  },
  {
    icon: CheckCircle2,
    label: "Revision Status",
    value: "On track",
    delta: "2 of 3 gaps closing",
    hint: "Next check-in tomorrow",
    tone: "from-rose-500/70 via-pink-500/40 to-fuchsia-500/60",
  },
];

const PRIVACY = [
  {
    icon: Lock,
    title: "Securely stored",
    text: "Learning data is encrypted in transit and at rest, and never sold or shared with third parties.",
  },
  {
    icon: ShieldCheck,
    title: "Personal information protected",
    text: "Only the signals needed to build your mastery model are used — nothing more, nothing exposed.",
  },
  {
    icon: Sparkles,
    title: "Responsible AI",
    text: "Recommendations are explainable, reviewable, and grounded in your own curriculum — no opaque scoring.",
  },
  {
    icon: Compass,
    title: "You stay in control",
    text: "You can review, reset, or export your learning profile at any time. Your journey belongs to you.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function KnowledgeGapPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Feature"
        title={
          <>
            <span className="text-gradient">Knowledge Gap</span> Analysis
          </>
        }
        description="Identify Learning Gaps. Strengthen Weak Concepts. Improve Exam Performance."
      />

      {/* Hero visual + description */}
      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm text-muted-foreground">
              EduNova AI continuously analyzes your learning progress, quiz performance,
              assessments, and study patterns to identify weak concepts before they become
              learning obstacles. Instead of waiting until exam time, the platform proactively
              highlights knowledge gaps and recommends personalized revision resources to help
              you improve with confidence.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/dashboard">
                  Analyze my learning <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/features/learning-twin">See Learning Twin</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {HELPS.map((h) => (
                <span
                  key={h.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-muted-foreground shadow-card"
                >
                  <h.icon className="h-3.5 w-3.5 text-primary" />
                  {h.label}
                </span>
              ))}
            </div>
          </motion.div>

          <HeroIllustration />
        </div>
      </Section>

      {/* What is */}
      <Section>
        <SectionHeading
          eyebrow="What it is"
          title="An AI system that maps understanding — not just marks"
          subtitle="Knowledge Gap Analysis compares what a learner currently understands against the mastery expected at each stage of the curriculum. It measures ideas, not just answers."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {HELPS.map((h) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="group rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <h.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-semibold">{h.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* How it works — timeline */}
      <Section>
        <SectionHeading
          eyebrow="How it works"
          title="From raw signals to a personalized revision plan"
          subtitle="An interactive pipeline that runs quietly behind every lesson, quiz, and assessment."
        />
        <ol className="relative space-y-6">
          <span
            aria-hidden="true"
            className="absolute left-6 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-primary/40 via-border to-transparent md:block"
          />
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:shadow-elegant md:pl-20"
            >
              <span className="relative md:absolute md:left-2 md:top-6 md:grid md:h-11 md:w-11 md:place-items-center md:rounded-xl md:bg-primary md:text-primary-foreground md:shadow-elegant">
                <step.icon className="hidden h-5 w-5 md:block" />
                <span className="inline-flex items-center gap-2 md:hidden">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <step.icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-primary">
                    Step {i + 1}
                  </span>
                </span>
              </span>
              <p className="hidden text-xs font-medium uppercase tracking-wide text-primary md:block">
                Step {i + 1}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {step.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-xs text-foreground/80"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-primary" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </Section>

      {/* Key Features */}
      <Section>
        <SectionHeading
          eyebrow="Key Features"
          title="Built for real understanding"
          subtitle="Each capability is designed to be transparent, adaptive, and grounded in curriculum outcomes."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section>
        <SectionHeading
          eyebrow="Benefits"
          title="One engine, three audiences"
          subtitle="The same mastery model powers personal revision, team dashboards, and platform-wide insights."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {BENEFITS.map((b) => (
            <div
              key={b.audience}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-card"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <b.icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-4 text-base font-semibold">{b.audience}</h3>
              <ul className="relative mt-3 space-y-2 text-sm text-muted-foreground">
                {b.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Real-life Example */}
      <Section>
        <SectionHeading
          eyebrow="Real-life example"
          title="How it plays out for one learner"
          subtitle="A Python course — and everything Nova AI notices along the way."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <ExampleCard
            tone="from-emerald-500/70 via-teal-500/40 to-cyan-500/60"
            icon={CheckCircle2}
            title="What Nova detects"
            items={[
              "Strong understanding of variables and loops",
              "Difficulty with functions and object-oriented programming",
              "Low quiz scores in file handling",
            ]}
          />
          <ExampleCard
            tone="from-orange-500/70 via-amber-500/40 to-rose-500/60"
            icon={Wand2}
            title="What Nova recommends"
            items={[
              "Beginner function tutorials",
              "OOP practice exercises",
              "File handling revision notes",
              "Additional quizzes on weak topics",
            ]}
          />
          <ExampleCard
            tone="from-fuchsia-500/70 via-purple-500/40 to-indigo-500/60"
            icon={TrendingUp}
            title="What happens next"
            items={[
              "Mastery score climbs after each session",
              "Weak topics move to 'monitoring' status",
              "New goals are suggested for the next sprint",
            ]}
          />
        </div>
      </Section>

      {/* Dashboard preview */}
      <Section>
        <SectionHeading
          eyebrow="Dashboard preview"
          title="Learning analytics that respect your time"
          subtitle="A glanceable overview — with drill-down available for every metric."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DASHBOARD_CARDS.map((c) => (
            <div
              key={c.label}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div
                className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${c.tone} opacity-40 blur-2xl`}
              />
              <div className="relative flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  Live
                </Badge>
              </div>
              <p className="relative mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {c.label}
              </p>
              <p className="relative mt-1 text-2xl font-semibold">{c.value}</p>
              <p className="relative mt-1 text-xs text-primary">{c.delta}</p>
              <p className="relative mt-2 text-xs text-muted-foreground">{c.hint}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why it matters */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-card sm:p-12">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                Why it matters
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Fix understanding before the exam does it for you
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Traditional learning waits for an exam to reveal what a student doesn't know.
                Knowledge Gap Analysis flips that order — the platform surfaces weak concepts as
                they form, so learners receive proactive support instead of last-minute panic.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                The result is measurable: stronger foundations, higher confidence, and revision
                time that goes to the exact topics that will move the needle.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <MiniStat icon={Rocket} label="Proactive support" value="Before exams, not after" />
              <MiniStat icon={Lightbulb} label="Focused revision" value="Only what you need" />
              <MiniStat icon={BookOpen} label="Curriculum aligned" value="Board & class aware" />
              <MiniStat icon={Clock} label="Time saved" value="Hours every week" />
            </div>
          </div>
        </div>
      </Section>

      {/* Privacy */}
      <Section>
        <SectionHeading
          eyebrow="Privacy & security"
          title="Your learning data, handled with care"
          subtitle="Analysis only works if learners trust the system. We designed for that from day one."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRIVACY.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border/60 bg-card p-5 shadow-card"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold">{p.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8 shadow-elegant sm:p-12">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                Start closing gaps
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                See where you stand — and where to go next
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Analyze your current understanding, review your progress, and jump straight into a
                revision plan built around your weakest concepts.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/dashboard">
                  Analyze my learning <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">View progress</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link to="/resources">Start personalized revision</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-wide text-primary">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-card backdrop-blur">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  );
}

function ExampleCard({
  tone,
  icon: Icon,
  title,
  items,
}: {
  tone: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
      <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${tone} opacity-40 blur-2xl`} />
      <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="relative mt-4 text-base font-semibold">{title}</h3>
      <ul className="relative mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-elegant">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Nova mastery model
          </div>
          <Badge variant="secondary" className="text-[10px]">
            Live
          </Badge>
        </div>

        <div className="relative mt-6 grid grid-cols-3 gap-3">
          <MasteryTile label="Algebra" value={92} />
          <MasteryTile label="Functions" value={54} weak />
          <MasteryTile label="OOP" value={41} weak />
          <MasteryTile label="Loops" value={88} />
          <MasteryTile label="File I/O" value={38} weak />
          <MasteryTile label="Recursion" value={73} />
        </div>

        <div className="relative mt-6 rounded-2xl border border-border/60 bg-background/60 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Recommended next
            </p>
            <span className="text-xs text-primary">3 actions</span>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <RecommendationRow icon={BookOpen} text="Revise: Functions in Python" />
            <RecommendationRow icon={ListChecks} text="Practice: 10 OOP problems" />
            <RecommendationRow icon={LineChart} text="Mock test: File handling" />
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function MasteryTile({
  label,
  value,
  weak = false,
}: {
  label: string;
  value: number;
  weak?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/60 p-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
        {weak && (
          <AlertTriangle className="h-3 w-3 text-orange-500" aria-label="Weak topic" />
        )}
      </div>
      <p className="mt-1 text-lg font-semibold">{value}%</p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${weak ? "bg-orange-500" : "bg-primary"}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function RecommendationRow({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <li className="flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="flex-1 text-xs">{text}</span>
      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
    </li>
  );
}
