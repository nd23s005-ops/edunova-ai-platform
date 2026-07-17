import { motion } from "framer-motion";
import {
  Code2,
  Sigma,
  Atom,
  PenLine,
  Landmark,
  Briefcase,
  Cloud,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Mentor = {
  icon: LucideIcon;
  name: string;
  tag: string;
  body: string;
};

const mentors: Mentor[] = [
  {
    icon: Code2,
    name: "AI Coding Mentor",
    tag: "Programming",
    body: "Pair-program across multiple languages, debug code, explain algorithms, review projects, and get step-by-step coding guidance with practical examples.",
  },
  {
    icon: Sigma,
    name: "AI Mathematics Mentor",
    tag: "Mathematics",
    body: "Understand formulas, proofs, calculations, and problem-solving through personalized explanations and adaptive practice sessions.",
  },
  {
    icon: Atom,
    name: "AI Science Mentor",
    tag: "Physics • Chemistry",
    body: "Master scientific concepts with curriculum-aware lessons, visual explanations, simulations, and interactive problem solving.",
  },
  {
    icon: PenLine,
    name: "AI English Mentor",
    tag: "English • Writing",
    body: "Improve grammar, vocabulary, writing style, communication, pronunciation, and speaking confidence through guided practice.",
  },
  {
    icon: Landmark,
    name: "AI UPSC Mentor",
    tag: "Government Exams",
    body: "Prepare for UPSC Prelims and Mains with syllabus-aware guidance, answer-writing evaluation, current affairs, and mock tests.",
  },
  {
    icon: Briefcase,
    name: "AI Interview Mentor",
    tag: "Placements",
    body: "Practice technical interviews, behavioral questions, coding challenges, DSA, system design, aptitude, and HR rounds.",
  },
  {
    icon: Cloud,
    name: "AI Cloud Mentor",
    tag: "Cloud Computing",
    body: "Learn AWS, Microsoft Azure, and Google Cloud through guided labs, architecture diagrams, and real-world projects.",
  },
  {
    icon: ShieldCheck,
    name: "AI Cyber Security Mentor",
    tag: "Cyber Security",
    body: "Build cybersecurity skills with ethical hacking fundamentals, network security, penetration testing labs, and defensive strategies.",
  },
];

export function Mentors() {
  return (
    <section
      id="mentors"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "transparent" }}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-primary-glow/15 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-0 bg-grid-fade opacity-30" />
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
            <Sparkles className="h-3.5 w-3.5" /> Specialist Mentors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Specialist AI,{" "}
            <span className="text-gradient bg-[length:200%_100%] [animation:gradient-shift_6s_ease_infinite]">
              Always On
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Focused AI mentors trained for a single specialization, delivering accurate,
            context-aware guidance instead of generic responses. Every mentor helps learners
            master a specific domain through personalized explanations, practice, and feedback.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mentors.map((m, i) => {
            const { icon: Icon } = m;
            return (
              <motion.article
                key={m.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col rounded-3xl p-[1px] transition-shadow duration-500 hover:shadow-elegant"
              >
                {/* Gradient border on hover */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/50 via-highlight/40 to-accent/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                {/* Card body */}
                <div className="relative flex h-full flex-col rounded-[calc(1.5rem-1px)] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                  {/* Soft gradient wash */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[calc(1.5rem-1px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, color-mix(in oklab, var(--primary-glow) 8%, transparent), transparent 45%, color-mix(in oklab, var(--accent) 8%, transparent))",
                    }}
                    aria-hidden="true"
                  />
                  {/* Top gradient accent line */}
                  <span
                    className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="relative">
                      <span
                        className="absolute inset-0 rounded-2xl blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--primary-glow), var(--accent))",
                        }}
                        aria-hidden="true"
                      />
                      <motion.span
                        className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-highlight text-primary-foreground shadow-glow"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 4 + (i % 3) * 0.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: (i % 4) * 0.3,
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.span>
                    </div>
                    <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-accent-foreground">
                      AI Mentor
                    </span>
                  </div>

                  <div className="relative mt-5">
                    <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl">
                      {m.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      {m.tag}
                    </p>
                  </div>

                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {m.body}
                  </p>

                  <button
                    type="button"
                    className="relative mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary transition-all hover:gap-2.5"
                  >
                    Explore Mentor
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
