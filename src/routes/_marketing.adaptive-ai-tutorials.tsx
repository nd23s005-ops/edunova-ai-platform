import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Brain,
  ChartLine,
  Compass,
  Gauge,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  PlayCircle,
  Route as RouteIcon,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_marketing/adaptive-ai-tutorials")({
  head: () => ({
    meta: [
      { title: "Adaptive AI Tutorials — EduNova AI" },
      {
        name: "description",
        content:
          "Personalized, AI-powered tutorials that adapt to your pace, style, and goals. Explore featured tutorials, track progress, and follow smart learning paths.",
      },
      { property: "og:title", content: "Adaptive AI Tutorials — EduNova AI" },
      {
        property: "og:description",
        content:
          "Learn with personalized AI-powered tutorials designed to match your learning pace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdaptiveTutorialsPage,
});

const featured = [
  { icon: Sparkles, title: "Personalized Learning", desc: "Lessons that adjust in real time to what you already know." },
  { icon: Compass, title: "AI Study Planner", desc: "Daily plans built around your goals, calendar, and energy." },
  { icon: Brain, title: "Adaptive Quiz System", desc: "Questions that get harder — or easier — based on mastery." },
  { icon: Zap, title: "Smart Revision", desc: "Spaced repetition surfaces the exact concept you're forgetting." },
  { icon: ChartLine, title: "Learning Analytics", desc: "Deep insights into strengths, gaps, and momentum." },
  { icon: Bot, title: "AI Mentor", desc: "A specialist tutor on demand — explains, quizzes, and coaches." },
];

const progress = [
  { title: "Foundations of AI", pct: 82, next: "Neural Networks" },
  { title: "Python for Data", pct: 64, next: "Pandas Essentials" },
  { title: "Machine Learning", pct: 41, next: "Model Evaluation" },
];

const recommended = [
  { title: "Prompt Engineering 101", level: "Beginner", time: "18 min" },
  { title: "Deep Learning Intuition", level: "Intermediate", time: "32 min" },
  { title: "MLOps Fundamentals", level: "Advanced", time: "45 min" },
  { title: "Statistics for ML", level: "Intermediate", time: "28 min" },
];

const aiFeatures = [
  { icon: Target, title: "Adaptive Learning", desc: "Content difficulty flexes with every answer you give." },
  { icon: Lightbulb, title: "Smart Recommendations", desc: "The next best lesson, always one click away." },
  { icon: RouteIcon, title: "Personalized Roadmaps", desc: "A learning path built for your goal, not the average learner." },
  { icon: MessageSquare, title: "AI Feedback", desc: "Instant, specific coaching on every attempt." },
];

const faqs = [
  { q: "What makes a tutorial 'adaptive'?", a: "Each lesson tracks your mastery signals — answers, time, hints used — and reshapes the next step so you're always at the edge of your ability." },
  { q: "Do I need to pick a level?", a: "No. Start anywhere. The system calibrates within the first few interactions and adjusts continuously." },
  { q: "Can I follow a specific goal?", a: "Yes. Set a goal like 'land a data role' or 'ace Class 12 boards' and the planner reorders content to match." },
  { q: "How is progress measured?", a: "By demonstrated mastery, not video minutes. You advance when you can solve, not when you've watched." },
  { q: "Is this available in my subjects?", a: "Adaptive tutorials cover school (Grades 10–12), university, and career upskilling tracks across 80+ topics." },
];

const related = [
  { title: "Learning Twin", to: "/features/learning-twin" as const },
  { title: "Knowledge Gap Analysis", to: "/features/knowledge-gap-analysis" as const },
  { title: "Smart Learning Paths", to: "/features/smart-learning-paths" as const },
  { title: "Learning Analytics", to: "/features/learning-analytics" as const },
];

function AdaptiveTutorialsPage() {
  return (
    <div className="relative min-h-dvh" style={{ background: "#071018" }}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 0%, rgba(239,123,36,0.18), transparent 60%), radial-gradient(60% 50% at 80% 20%, rgba(124,107,255,0.18), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 pt-24 pb-16 text-center sm:px-6 lg:px-8 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-white/85 backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            <span className="tracking-wide">Adaptive AI Tutorials</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl"
          >
            Adaptive AI Tutorials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Learn with personalized AI-powered tutorials designed to match your learning pace.
          </motion.p>
        </div>
      </section>

      {/* Featured */}
      <Section title="Featured Tutorials" eyebrow="Handpicked" icon={GraduationCap}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((f) => (
            <Card key={f.title}>
              <f.icon className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-white/65">{f.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Progress */}
      <Section title="Learning Progress" eyebrow="Your journey" icon={TrendingUp}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {progress.map((p) => (
            <Card key={p.title}>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">{p.title}</h3>
                <span className="text-sm font-medium text-cyan-300">{p.pct}%</span>
              </div>
              <Progress value={p.pct} className="mt-3 h-2 bg-white/10" />
              <p className="mt-3 text-xs text-white/60">Up next: {p.next}</p>
              <Button
                size="sm"
                className="mt-4 h-9 rounded-full bg-[linear-gradient(92deg,#F19A3E,#EF7B24_55%,#E85A9E)] text-white"
              >
                <PlayCircle className="mr-1.5 h-4 w-4" />
                Continue Learning
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Recommended */}
      <Section title="Recommended Tutorials" eyebrow="For you" icon={Lightbulb}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((r) => (
            <Card key={r.title}>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/55">
                <Gauge className="h-3.5 w-3.5" /> {r.level}
              </div>
              <h3 className="mt-3 text-base font-semibold text-white">{r.title}</h3>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-white/60">
                <Timer className="h-3.5 w-3.5" /> {r.time}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* AI Features */}
      <Section title="AI Features" eyebrow="Under the hood" icon={Bot}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiFeatures.map((f) => (
            <Card key={f.title}>
              <f.icon className="h-6 w-6 text-orange-300" />
              <h3 className="mt-4 text-base font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-white/65">{f.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section title="FAQ" eyebrow="Answers" icon={MessageSquare}>
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left text-white hover:text-white">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/70">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Related Resources */}
      <Section title="Related Resources" eyebrow="Keep exploring" icon={RouteIcon}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/40 hover:bg-white/[0.06]"
            >
              <h3 className="text-base font-semibold text-white">{r.title}</h3>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-300">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 pb-24" />
      </Section>
    </div>
  );
}

function Section({
  title,
  eyebrow,
  icon: Icon,
  children,
}: {
  title: string;
  eyebrow: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <Icon className="h-4 w-4 text-cyan-300" />
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
            {eyebrow}
          </div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]">
      {children}
    </div>
  );
}
