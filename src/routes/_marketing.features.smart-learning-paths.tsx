import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Target,
  Compass,
  Route as RouteIcon,
  Brain,
  Rocket,
  TrendingUp,
  BookOpen,
  Trophy,
  Clock,
  CheckCircle2,
  Flame,
  Gauge,
  ListChecks,
  Layers,
  Wand2,
  Activity,
  Users,
  Building2,
  GraduationCap,
  Lightbulb,
  ShieldCheck,
  Lock,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  LineChart,
  Zap,
  MapPin,
  Star,
  Circle,
  CircleCheckBig,
  CirclePlay,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";

const TITLE = "Smart Learning Paths — EduNova AI";
const DESCRIPTION =
  "Personalized learning roadmaps powered by AI. EduNova AI adapts every step of the journey to your goals, pace, and performance.";

export const Route = createFileRoute("/_marketing/features/smart-learning-paths")({
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
  component: SmartLearningPathsPage,
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const HERO_CHIPS = [
  { icon: Target, label: "Goal-aware" },
  { icon: Gauge, label: "Adapts to your pace" },
  { icon: Brain, label: "Learns as you learn" },
  { icon: TrendingUp, label: "Improves over time" },
];

const STEPS = [
  {
    icon: Compass,
    title: "Understand the Learner",
    text: "Every path starts with a short intake — enough to make the plan personal, never enough to feel like paperwork.",
    items: [
      "Learning goals",
      "Current skill level",
      "Interests",
      "Preferred learning style",
      "Available study time",
      "Career aspirations",
    ],
  },
  {
    icon: Activity,
    title: "Analyze Performance",
    text: "Nova AI reads every learning signal — how you answer, how consistently you show up, how deeply you understand.",
    items: [
      "Course progress",
      "Quiz results",
      "Assignment scores",
      "Practice tests",
      "Learning consistency",
      "Knowledge mastery",
    ],
  },
  {
    icon: RouteIcon,
    title: "Generate Personalized Roadmap",
    text: "A structured plan is created for the week, the month, and the milestone — not a static list, but a living roadmap.",
    items: [
      "Daily learning plan",
      "Weekly milestones",
      "Recommended courses",
      "Suggested resources",
      "Practice activities",
    ],
  },
  {
    icon: Wand2,
    title: "Adaptive Recommendations",
    text: "When your performance changes, so does the plan. The path skips what you know and reinforces what you don't.",
    items: [
      "Skip mastered topics",
      "Reinforce weak concepts",
      "Recommend revision",
      "Suggest advanced topics",
      "Adjust learning pace",
    ],
  },
  {
    icon: LineChart,
    title: "Continuous Optimization",
    text: "The roadmap evolves automatically after every quiz, assessment, lesson completion, and learning milestone.",
    items: [
      "Live mastery updates",
      "Momentum tracking",
      "Milestone re-planning",
      "Long-horizon goal alignment",
    ],
  },
];

const FEATURES = [
  {
    icon: Brain,
    title: "AI Personalized Learning Plans",
    text: "Every learner gets a plan built from their own goals, gaps, and preferred pace — not a template.",
  },
  {
    icon: Compass,
    title: "Adaptive Course Recommendations",
    text: "Courses are recommended in the order that unlocks the next concept — never as a generic list.",
  },
  {
    icon: RouteIcon,
    title: "Dynamic Learning Roadmaps",
    text: "Roadmaps stay in sync with your reality — re-planning around what you learned, missed, or mastered.",
  },
  {
    icon: Target,
    title: "Goal-Based Learning",
    text: "From board exams to full-stack careers, every milestone maps back to the outcome you set.",
  },
  {
    icon: TrendingUp,
    title: "Skill Progress Tracking",
    text: "Skills are tracked at the concept level, not just the course level — visible and explainable.",
  },
  {
    icon: Trophy,
    title: "Milestone Management",
    text: "Break the goal into wins that keep motivation high and momentum durable.",
  },
  {
    icon: Wand2,
    title: "Smart Revision Planning",
    text: "Nova schedules the exact revision you need, on the day you're most likely to forget.",
  },
  {
    icon: Gauge,
    title: "Learning Pace Optimization",
    text: "The plan speeds up when you're flying and slows down where the foundations still need work.",
  },
  {
    icon: Rocket,
    title: "Career-Focused Learning Paths",
    text: "Career tracks map skills, projects, and interview prep into one coherent journey.",
  },
  {
    icon: Sparkles,
    title: "Continuous AI Recommendations",
    text: "Every completed lesson triggers a fresh, honest suggestion for what to learn next.",
  },
];

interface PathExample {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  audience: string;
  tone: string;
  steps: string[];
}

const PATHS: PathExample[] = [
  {
    icon: Code2,
    title: "Full Stack Developer",
    audience: "Career track · 6–9 months",
    tone: "from-primary/80 via-primary/40 to-accent/60",
    steps: [
      "HTML & CSS",
      "JavaScript",
      "React.js",
      "Node.js",
      "MongoDB",
      "MERN Project",
      "Interview Preparation",
    ],
  },
  {
    icon: Cpu,
    title: "AI Engineer",
    audience: "Career track · 8–12 months",
    tone: "from-fuchsia-500/70 via-purple-500/40 to-indigo-500/60",
    steps: [
      "Python",
      "Mathematics",
      "Machine Learning",
      "Deep Learning",
      "Generative AI",
      "AI Projects",
      "Career Preparation",
    ],
  },
  {
    icon: Database,
    title: "Data Scientist",
    audience: "Career track · 6–10 months",
    tone: "from-emerald-500/70 via-teal-500/40 to-cyan-500/60",
    steps: [
      "Python",
      "Statistics",
      "SQL",
      "Pandas & NumPy",
      "Data Visualization",
      "Machine Learning",
      "Portfolio Projects",
    ],
  },
];

const PERSONALIZATION = [
  { icon: GraduationCap, label: "Academic goals" },
  { icon: Rocket, label: "Career goals" },
  { icon: BookOpen, label: "Previous knowledge" },
  { icon: Gauge, label: "Learning speed" },
  { icon: ListChecks, label: "Quiz performance" },
  { icon: Activity, label: "Assessment scores" },
  { icon: Sparkles, label: "Interests" },
  { icon: Brain, label: "Preferred learning style" },
  { icon: Clock, label: "Available study hours" },
  { icon: CheckCircle2, label: "Completed courses" },
];

const DASHBOARD_CARDS = [
  {
    icon: Target,
    label: "Current Learning Goal",
    value: "Full Stack Developer",
    delta: "React → Node.js phase",
    hint: "Weekly review on Sunday",
    tone: "from-primary/80 via-primary/40 to-accent/60",
  },
  {
    icon: LineChart,
    label: "Roadmap Progress",
    value: "62%",
    delta: "+9% this month",
    hint: "23 of 37 milestones",
    tone: "from-emerald-500/70 via-teal-500/40 to-cyan-500/60",
  },
  {
    icon: Trophy,
    label: "Skills Mastered",
    value: "14",
    delta: "3 new this week",
    hint: "Includes React fundamentals",
    tone: "from-fuchsia-500/70 via-purple-500/40 to-indigo-500/60",
  },
  {
    icon: BookOpen,
    label: "Next Recommended Course",
    value: "Node.js Essentials",
    delta: "≈ 6 hours to complete",
    hint: "Prereqs: JavaScript ✓",
    tone: "from-sky-500/70 via-blue-500/40 to-indigo-500/60",
  },
  {
    icon: Clock,
    label: "Weekly Study Goal",
    value: "8h / 10h",
    delta: "On pace for Sunday",
    hint: "2h buffer this week",
    tone: "from-orange-500/70 via-amber-500/40 to-rose-500/60",
  },
  {
    icon: Gauge,
    label: "Estimated Completion",
    value: "Feb 18",
    delta: "3 weeks ahead of plan",
    hint: "Adjusted from Mar 11",
    tone: "from-rose-500/70 via-pink-500/40 to-fuchsia-500/60",
  },
  {
    icon: Flame,
    label: "Learning Streak",
    value: "23 days",
    delta: "Personal best!",
    hint: "Longest since sign-up",
    tone: "from-orange-500/70 via-amber-500/40 to-rose-500/60",
  },
  {
    icon: Sparkles,
    label: "AI Recommendations",
    value: "4 waiting",
    delta: "Refreshed 5 min ago",
    hint: "Includes a mock interview",
    tone: "from-primary/80 via-primary/40 to-accent/60",
  },
];

const WHY = [
  { icon: Layers, label: "Avoid information overload" },
  { icon: RouteIcon, label: "Learn in the right order" },
  { icon: Target, label: "Focus on important topics" },
  { icon: Clock, label: "Save study time" },
  { icon: Flame, label: "Stay motivated" },
  { icon: Rocket, label: "Reach goals faster" },
  { icon: Brain, label: "Improve retention" },
  { icon: Trophy, label: "Build practical skills" },
];

const BENEFITS = [
  {
    icon: GraduationCap,
    audience: "Students",
    points: [
      "Personalized learning journey",
      "Faster skill development",
      "Better motivation",
      "Improved exam performance",
      "Career-focused guidance",
    ],
  },
  {
    icon: Building2,
    audience: "Organizations",
    points: [
      "Structured employee learning",
      "Customized training plans",
      "Better skill tracking",
      "Higher course completion",
    ],
  },
  {
    icon: Users,
    audience: "Administrators",
    points: [
      "Learning analytics",
      "Roadmap management",
      "Performance insights",
      "Scalable personalized education",
    ],
  },
];

const PRIVACY = [
  {
    icon: Lock,
    title: "Preferences stay private",
    text: "Your goals, pace, and interests are stored securely and never shared with third parties.",
  },
  {
    icon: ShieldCheck,
    title: "Secure recommendations",
    text: "Every recommendation is generated on infrastructure that follows industry-grade security practices.",
  },
  {
    icon: Compass,
    title: "You stay in control",
    text: "Update your goals, edit your plan, or reset your roadmap any time — the AI works for you, not the other way around.",
  },
  {
    icon: Sparkles,
    title: "Responsible AI",
    text: "Recommendations are transparent and grounded in your curriculum, not opaque scoring.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function SmartLearningPathsPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Feature"
        title={
          <>
            <span className="text-gradient">Smart Learning</span> Paths
          </>
        }
        description="Personalized Learning Roadmaps Powered by Artificial Intelligence"
      />

      {/* Hero */}
      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm text-muted-foreground">
              EduNova AI creates personalized learning journeys tailored to every learner's
              goals, current knowledge, learning speed, interests, and performance. Instead of
              following a fixed curriculum, Smart Learning Paths continuously adapt and
              recommend the next best learning step to maximize understanding, engagement, and
              long-term success.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/dashboard">
                  Generate my learning path <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/features/knowledge-gap-analysis">See Knowledge Gap Analysis</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {HERO_CHIPS.map((h) => (
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

      {/* What are */}
      <Section>
        <SectionHeading
          eyebrow="What they are"
          title="AI roadmaps built for one learner at a time"
          subtitle="Smart Learning Paths are AI-generated roadmaps designed to help every learner progress efficiently based on their individual needs. Unlike one-size-fits-all learning, EduNova AI continuously analyzes performance and adjusts recommendations automatically — so every learner follows a unique journey."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Sparkles,
              title: "Unique to every learner",
              text: "No two paths are identical — the roadmap is shaped by your goals, gaps, and pace.",
            },
            {
              icon: Wand2,
              title: "Adaptive by design",
              text: "The plan updates automatically as your understanding evolves.",
            },
            {
              icon: RouteIcon,
              title: "Ordered for outcomes",
              text: "Concepts are sequenced so each new lesson unlocks the next.",
            },
            {
              icon: Target,
              title: "Anchored to your goal",
              text: "Every milestone maps back to the outcome you actually care about.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHeading
          eyebrow="How it works"
          title="From goals to a living roadmap"
          subtitle="A five-stage workflow that runs in the background of every session."
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

      {/* Key features */}
      <Section>
        <SectionHeading
          eyebrow="Key features"
          title="Ten capabilities, one adaptive engine"
          subtitle="Every capability is transparent, editable, and grounded in your own curriculum."
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

      {/* Learning path examples */}
      <Section>
        <SectionHeading
          eyebrow="Learning path examples"
          title="What a Smart Learning Path looks like"
          subtitle="Three career-focused examples — every learner's version stays uniquely theirs."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {PATHS.map((p) => (
            <PathCard key={p.title} path={p} />
          ))}
        </div>
      </Section>

      {/* Personalization factors */}
      <Section>
        <SectionHeading
          eyebrow="Personalization factors"
          title="Signals that shape every roadmap"
          subtitle="Nova reads what matters — and nothing more — to build a plan that actually fits."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PERSONALIZATION.map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-medium">{p.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Live roadmap preview */}
      <Section>
        <SectionHeading
          eyebrow="Live roadmap preview"
          title="Your journey, visualised"
          subtitle="An interactive view of where you are, what's next, and how far you've come."
        />
        <RoadmapPreview />
      </Section>

      {/* Why smart learning paths */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-card sm:p-12">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              Why Smart Learning Paths
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Learn less noise. Learn more of what matters.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              AI turns a flood of courses, videos, and resources into a clear, ordered path —
              so every hour of study moves you closer to the outcome you signed up for.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {WHY.map((w) => (
                <div
                  key={w.label}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                    <w.icon className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium">{w.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Real-life example */}
      <Section>
        <SectionHeading
          eyebrow="Real-life example"
          title="How it plays out for one learner"
          subtitle="A student who wants to become a Full Stack Developer."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <ExampleCard
            tone="from-emerald-500/70 via-teal-500/40 to-cyan-500/60"
            icon={CheckCircle2}
            title="What Nova evaluates"
            items={[
              "Strong HTML & CSS foundations",
              "Limited JavaScript experience",
              "Career goal: Full Stack Developer",
              "Available time: 8–10 hrs / week",
            ]}
          />
          <ExampleCard
            tone="from-orange-500/70 via-amber-500/40 to-rose-500/60"
            icon={Wand2}
            title="The path Nova builds"
            items={[
              "Start: JavaScript fundamentals",
              "Then: React.js essentials",
              "Then: Node.js + Express",
              "Then: MongoDB & full-stack project",
            ]}
          />
          <ExampleCard
            tone="from-fuchsia-500/70 via-purple-500/40 to-indigo-500/60"
            icon={TrendingUp}
            title="How it adapts"
            items={[
              "Advanced topics unlock as mastery grows",
              "Extra practice added for weak areas",
              "Interview prep scheduled near the end",
              "Estimated completion updates weekly",
            ]}
          />
        </div>
      </Section>

      {/* Visual dashboard */}
      <Section>
        <SectionHeading
          eyebrow="Visual dashboard"
          title="Everything on your journey, at a glance"
          subtitle="A live snapshot of your goal, progress, streak, and what to do next."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              <p className="relative mt-1 text-lg font-semibold">{c.value}</p>
              <p className="relative mt-1 text-xs text-primary">{c.delta}</p>
              <p className="relative mt-2 text-xs text-muted-foreground">{c.hint}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section>
        <SectionHeading
          eyebrow="Benefits"
          title="One engine, three audiences"
          subtitle="The same personalization powers individual learners, organizations, and administrators."
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

      {/* Privacy */}
      <Section>
        <SectionHeading
          eyebrow="Privacy & security"
          title="Your journey stays yours"
          subtitle="Personalization only works if learners trust the system. We built for that from day one."
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
                Start your journey
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                A roadmap built for you, not the crowd
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell EduNova AI where you want to go — it will handle the ordering, the pacing,
                and the plan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/dashboard">
                  Generate my learning path <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">Start my personalized journey</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link to="/explore">Explore AI recommendations</Link>
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

function PathCard({ path }: { path: PathExample }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className={`absolute -right-14 -top-14 h-44 w-44 rounded-full bg-gradient-to-br ${path.tone} opacity-40 blur-2xl`} />
      <div className="relative flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <path.icon className="h-5 w-5" />
        </span>
        <Badge variant="secondary" className="text-[10px]">
          Career track
        </Badge>
      </div>
      <h3 className="relative mt-4 text-lg font-semibold">{path.title}</h3>
      <p className="relative mt-1 text-xs text-muted-foreground">{path.audience}</p>

      <ol className="relative mt-5 space-y-2">
        {path.steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-[10px] font-semibold text-primary">
              {i + 1}
            </span>
            <span className="flex-1 text-sm">{s}</span>
            {i < path.steps.length - 1 && (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </li>
        ))}
      </ol>
    </motion.div>
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

function RoadmapPreview() {
  const nodes = [
    { title: "HTML & CSS", state: "done" as const, meta: "Completed" },
    { title: "JavaScript", state: "done" as const, meta: "Completed" },
    { title: "React.js", state: "current" as const, meta: "In progress · 62%" },
    { title: "Node.js", state: "upcoming" as const, meta: "Next up" },
    { title: "MongoDB", state: "upcoming" as const, meta: "Milestone" },
    { title: "MERN Project", state: "upcoming" as const, meta: "Capstone" },
    { title: "Interview Prep", state: "upcoming" as const, meta: "Goal" },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            Current goal
          </p>
          <h3 className="mt-1 text-lg font-semibold">Full Stack Developer</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            <MapPin className="mr-1 h-3 w-3" /> Current: React.js
          </Badge>
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" /> ETA · Feb 18
          </Badge>
          <Badge variant="secondary">
            <Star className="mr-1 h-3 w-3" /> 3 badges earned
          </Badge>
        </div>
      </div>

      <ol className="relative mt-8 grid gap-4 md:grid-cols-7">
        {nodes.map((n, i) => (
          <li key={n.title} className="relative">
            {i < nodes.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[calc(100%-0.5rem)] top-4 hidden h-px w-8 bg-gradient-to-r from-primary/50 to-transparent md:block"
              />
            )}
            <div
              className={`flex flex-col items-start gap-3 rounded-2xl border p-4 backdrop-blur transition ${
                n.state === "current"
                  ? "border-primary/60 bg-primary/5 shadow-elegant"
                  : "border-border/60 bg-background/60"
              }`}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full ${
                  n.state === "done"
                    ? "bg-primary text-primary-foreground"
                    : n.state === "current"
                      ? "bg-primary/15 text-primary ring-2 ring-primary/40"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {n.state === "done" ? (
                  <CircleCheckBig className="h-4 w-4" />
                ) : n.state === "current" ? (
                  <CirclePlay className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </span>
              <div>
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{n.meta}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
        <MiniStat icon={Trophy} label="Milestones" value="4 / 7" />
        <MiniStat icon={Gauge} label="Skill progress" value="62%" />
        <MiniStat icon={Zap} label="Achievement badges" value="React Beginner · JS Pro · Consistency" />
      </div>
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
            Nova adaptive path
          </div>
          <Badge variant="secondary" className="text-[10px]">
            Live
          </Badge>
        </div>

        <div className="relative mt-6 space-y-3">
          {[
            { label: "JavaScript Fundamentals", state: "done" as const, tag: "Mastered" },
            { label: "React.js Essentials", state: "current" as const, tag: "In progress" },
            { label: "Node.js + Express", state: "next" as const, tag: "Next up" },
            { label: "MongoDB & MERN Project", state: "upcoming" as const, tag: "Milestone" },
          ].map((n) => (
            <div
              key={n.label}
              className={`flex items-center gap-3 rounded-2xl border p-3 ${
                n.state === "current"
                  ? "border-primary/60 bg-primary/5"
                  : "border-border/60 bg-background/60"
              }`}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full ${
                  n.state === "done"
                    ? "bg-primary text-primary-foreground"
                    : n.state === "current"
                      ? "bg-primary/15 text-primary ring-2 ring-primary/40"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {n.state === "done" ? (
                  <CircleCheckBig className="h-4 w-4" />
                ) : n.state === "current" ? (
                  <CirclePlay className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">{n.label}</p>
                <p className="text-[11px] text-muted-foreground">{n.tag}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>

        <div className="relative mt-5 flex items-center justify-between rounded-2xl border border-border/60 bg-background/60 p-3 backdrop-blur">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5 text-primary" />
            Nova suggests: 2 practice sets on hooks
          </div>
          <span className="text-xs text-primary">Adapts weekly</span>
        </div>
      </div>
    </motion.div>
  );
}
