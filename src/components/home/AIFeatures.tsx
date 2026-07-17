import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Sparkles,
  MessagesSquare,
  ClipboardList,
  LineChart,
  Route as RouteIcon,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
  Icon: LucideIcon;
};

const features: Feature[] = [
  {
    slug: "learning-twin",
    eyebrow: "Personalized",
    title: "Learning Twin",
    body: "The Learning Twin creates a living knowledge profile for every learner. It continuously adapts future lessons, quizzes, revision plans, and recommendations based on strengths, weaknesses, learning pace, and goals.",
    Icon: Brain,
  },
  {
    slug: "knowledge-gap",
    eyebrow: "Proactive",
    title: "Knowledge Gap Analysis",
    body: "EduNova AI detects weak concepts before they become learning barriers. It analyzes quiz performance, identifies gaps, and recommends targeted revision — so nothing quietly slips through.",
    Icon: Sparkles,
  },
  {
    slug: "ai-tutor",
    eyebrow: "24/7",
    title: "AI Tutor",
    body: "An intelligent tutor that answers questions instantly with visual explanations, worked examples, interactive hints, code support, and personalized feedback — right when you need it.",
    Icon: MessagesSquare,
  },
  {
    slug: "exam-generator",
    eyebrow: "Exam-Ready",
    title: "Exam Generator",
    body: "Generate realistic exams from syllabus coverage, previous performance, learning gaps, and difficulty settings — with AI-generated explanations for every question.",
    Icon: ClipboardList,
  },
  {
    slug: "progress-analytics",
    eyebrow: "Insights",
    title: "Progress Analytics",
    body: "Track learning with intelligent dashboards showing concept mastery, study time, quiz performance, completion rates, streaks, and AI-powered recommendations.",
    Icon: LineChart,
  },
  {
    slug: "learning-paths",
    eyebrow: "Adaptive",
    title: "Smart Learning Paths",
    body: "AI automatically builds personalized roadmaps from your goals, progress, strengths, career interests, and available study time — and reroutes as you grow.",
    Icon: RouteIcon,
  },
];

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

        {/* Feature grid */}
        <div className="mt-16 grid gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const { Icon } = f;
            return (
              <motion.div
                key={f.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl border border-white/60 bg-white/70 p-7 shadow-card backdrop-blur-xl transition-shadow hover:shadow-elegant dark:border-white/10 dark:bg-card/60"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--primary-glow) 10%, transparent), transparent 45%, color-mix(in oklab, var(--accent) 10%, transparent))",
                  }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="relative inline-flex">
                    <span
                      className="absolute inset-0 rounded-2xl blur-xl opacity-70"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--primary-glow), var(--accent))",
                      }}
                      aria-hidden="true"
                    />
                    <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-highlight text-primary-foreground shadow-glow">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <span className="mt-5 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-foreground">
                    {f.eyebrow}
                  </span>

                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.body}
                  </p>

                  <Link
                    to="/features/$slug"
                    params={{ slug: f.slug }}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
