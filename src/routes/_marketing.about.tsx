import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  Accessibility,
  ArrowRight,
  Bot,
  BookOpen,
  Brain,
  Building2,
  ChartLine,
  Compass,
  GraduationCap,
  Heart,
  Layers,
  Library,
  Lightbulb,
  LineChart,
  Mail,
  MousePointerClick,
  Rocket,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TimerReset,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";

export const Route = createFileRoute("/_marketing/about")({
  head: () => ({
    meta: [
      { title: "About EduNova AI — Learn Smarter. Grow Faster." },
      {
        name: "description",
        content:
          "EduNova AI is an AI-powered adaptive learning platform for students, professionals, and organizations — combining intelligent tutoring, courses, mock tests, and analytics.",
      },
      { property: "og:title", content: "About EduNova AI" },
      {
        property: "og:description",
        content:
          "Adaptive, AI-powered learning for students, professionals, and organizations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const offerings = [
  { icon: Bot, title: "AI Learning Assistant", desc: "A context-aware tutor available inside every lesson, quiz, and course." },
  { icon: BookOpen, title: "Interactive Courses", desc: "Structured chapters, theory, illustrations, and practice — built for mastery." },
  { icon: Library, title: "Resource Library", desc: "Curated notes, references, and study material organized by subject and level." },
  { icon: Target, title: "Practice Assessments", desc: "Adaptive quizzes with auto-save, timers, and instant explanations." },
  { icon: TimerReset, title: "Mock Tests", desc: "Full-length timed tests that mirror real exam patterns and difficulty." },
  { icon: LineChart, title: "Progress Tracking", desc: "Visual progress bars, streaks, and mastery insights across every course." },
  { icon: Building2, title: "Organization Portal", desc: "Team enrollment, cohorts, and admin oversight for enterprises and institutions." },
  { icon: ChartLine, title: "Learning Analytics", desc: "Actionable dashboards that surface strengths, gaps, and next best steps." },
];

const whyChoose = [
  { icon: Sparkles, title: "Modern Learning Experience", desc: "Delightful, distraction-free interfaces designed around how learners actually study." },
  { icon: Brain, title: "Personalized Learning", desc: "Content, pace, and recommendations adapt to each learner's goals and level." },
  { icon: Zap, title: "AI-Powered Assistance", desc: "Ask questions, get explanations, and unblock instantly — inside your course." },
  { icon: Layers, title: "High-Quality Study Resources", desc: "Reviewed material across boards, subjects, and professional tracks." },
  { icon: Shield, title: "Secure Platform", desc: "Role-based access, encrypted sessions, and modern auth built in." },
  { icon: Smartphone, title: "Responsive Design", desc: "A polished experience on desktop, tablet, and mobile devices." },
  { icon: Rocket, title: "Continuous Innovation", desc: "Frequent updates and new capabilities, informed by learner feedback." },
  { icon: MousePointerClick, title: "Easy Navigation", desc: "Intuitive dashboards so learners spend time learning, not searching." },
];

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "We push the boundaries of what learning technology can do." },
  { icon: Accessibility, title: "Accessibility", desc: "Great learning should be available to everyone, everywhere." },
  { icon: Trophy, title: "Excellence", desc: "Craft, rigor, and quality in every course, feature, and interaction." },
  { icon: Compass, title: "Lifelong Learning", desc: "Curiosity doesn't retire — neither should the tools that support it." },
  { icon: ShieldCheck, title: "Security", desc: "Learner data is protected with modern, transparent practices." },
  { icon: Heart, title: "Student Success", desc: "Every decision is measured against real learner outcomes." },
];

const audiences = [
  { icon: GraduationCap, title: "Students", desc: "School and college learners preparing for exams, mastering subjects, and building strong fundamentals." },
  { icon: Building2, title: "Organizations", desc: "Companies upskilling teams with structured learning paths and analytics." },
  { icon: Library, title: "Educational Institutions", desc: "Schools and universities extending classroom learning with adaptive AI tools." },
  { icon: Users, title: "Professionals", desc: "Working professionals building new skills and advancing their careers." },
  { icon: Rocket, title: "Self Learners", desc: "Lifelong learners exploring new topics on their own schedule." },
];

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "300+", label: "Courses" },
  { value: "12K+", label: "Study Resources" },
  { value: "1.5K+", label: "Practice Tests" },
  { value: "150+", label: "Organizations" },
  { value: "2M+", label: "Learning Hours" },
];

function AboutPage() {
  const reduce = useReducedMotion();

  return (
    <>
      <PageHeader
        eyebrow="About EduNova AI"
        title={
          <>
            Learn Smarter. Grow Faster.{" "}
            <span className="text-gradient">Powered by AI.</span>
          </>
        }
        description="EduNova AI is an adaptive, AI-powered learning platform built to help every learner — from school students to working professionals — reach their full potential."
      >
        <Link
          to="/explore"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-[oklch(0.72_0.16_50)] px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[0_10px_40px_-10px_oklch(0.82_0.14_80/0.7)] transition-transform hover:scale-[1.03]"
        >
          Explore Courses
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-background"
        >
          Browse Resources
        </Link>
      </PageHeader>

      {/* About intro */}
      <Section
        eyebrow="Who we are"
        align="left"
        title={
          <>
            An AI-powered platform for{" "}
            <span className="text-gradient">modern learners.</span>
          </>
        }
        description="EduNova AI blends adaptive intelligence with beautifully crafted learning experiences. Whether you're preparing for exams, upskilling for a new role, or leading a team's learning journey, EduNova AI meets you where you are — and helps you go further."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: "Our Mission",
              body:
                "To make quality education more accessible, personalized, and engaging by combining artificial intelligence with modern learning experiences.",
            },
            {
              icon: Compass,
              title: "Our Vision",
              body:
                "To become a globally trusted AI-powered learning platform that empowers every learner to achieve their full potential.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 shadow-card"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
                style={{ background: "color-mix(in oklab, var(--primary) 25%, transparent)" }}
                aria-hidden="true"
              />
              <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 text-xl font-semibold">{c.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* What we offer */}
      <Section
        eyebrow="What we offer"
        title={<>Everything you need to <span className="text-gradient">learn and grow</span></>}
        description="A complete AI-powered toolkit for structured courses, practice, and progress."
        className="bg-muted/30"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: reduce ? 0 : (i % 4) * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Why choose */}
      <Section
        eyebrow="Why choose us"
        title={<>Built for learners who <span className="text-gradient">expect more</span></>}
        description="Thoughtful design, intelligent tools, and a platform that grows with you."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Core values */}
      <Section
        eyebrow="Our core values"
        title={<>What we <span className="text-gradient">stand for</span></>}
        className="bg-muted/30"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-6 shadow-card backdrop-blur transition hover:-translate-y-1"
            >
              <span
                className="grid h-12 w-12 place-items-center rounded-xl text-white shadow-[0_8px_24px_-8px_oklch(0.72_0.16_50/0.5)]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.82 0.16 55) 0%, oklch(0.7 0.19 40) 100%)",
                }}
              >
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Who can use */}
      <Section
        eyebrow="Who can use EduNova AI"
        title={<>Made for <span className="text-gradient">every kind of learner</span></>}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                <a.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>
      </Section>




      {/* CTA */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto w-[92%] max-w-6xl px-2 sm:w-[85%] sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative overflow-hidden rounded-[32px] px-6 py-14 text-center sm:px-12 sm:py-20"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.18 0.03 240) 0%, oklch(0.22 0.05 260) 50%, oklch(0.16 0.04 240) 100%)",
            }}
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div
                className="absolute -left-24 top-0 h-[380px] w-[380px] rounded-full blur-3xl"
                style={{ background: "color-mix(in oklab, var(--accent) 55%, transparent)" }}
              />
              <div
                className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full blur-3xl"
                style={{ background: "color-mix(in oklab, var(--primary-glow) 60%, transparent)" }}
              />
              <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                  maskImage:
                    "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 80%)",
                }}
              />
            </div>
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Start your journey
              </span>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to learn with{" "}
                <span className="text-gradient bg-[length:200%_100%] [animation:gradient-shift_6s_ease_infinite]">
                  EduNova AI
                </span>
                ?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                Explore adaptive courses, dive into curated resources, and start building the skills that matter most.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/explore"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-[oklch(0.72_0.16_50)] px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[0_10px_40px_-10px_oklch(0.82_0.14_80/0.7)] transition-transform hover:scale-[1.03]"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/resources"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/15"
                >
                  Browse Resources
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/15"
                >
                  Start Learning
                </Link>
                <a
                  href="mailto:support@edunova.ai"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/15"
                >
                  <Mail className="h-4 w-4" /> Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
