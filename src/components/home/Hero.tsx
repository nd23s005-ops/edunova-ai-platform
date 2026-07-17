import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AIBackground } from "./AIBackground";

const HEADLINE_LINE_1 = "Learn faster with an";
const HEADLINE_HIGHLIGHT = "AI that adapts";
const HEADLINE_LINE_3 = "to you.";

function Words({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? { opacity: 0 } : { y: "110%", opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { y: "0%", opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.06 }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden" style={{ background: "#071018" }}>
      <AIBackground />

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-4 pt-20 pb-40 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.a
          href="#features"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-white/85 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl transition hover:border-cyan-300/40 hover:text-white"
        >
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-70 ${reduce ? "" : "animate-ping"}`} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
          </span>
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
          <span className="tracking-wide">New · Adaptive AI Tutor</span>
          <ArrowRight className="h-3.5 w-3.5 -translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </motion.a>

        {/* Headline */}
        <h1 className="mt-8 max-w-5xl font-display text-[42px] font-semibold leading-[1.04] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl xl:text-[88px]">
          <span className="block">
            <Words text={HEADLINE_LINE_1} delay={0.15} />
          </span>
          <span className="mt-2 block">
            <span className="relative inline-block">
              <motion.span
                aria-hidden="true"
                className="absolute -inset-x-3 -inset-y-1 -z-10 rounded-2xl bg-[linear-gradient(90deg,rgba(239,123,36,0.35),rgba(120,220,225,0.25),transparent)] blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              />
              <span className="bg-[linear-gradient(92deg,#F19A3E_0%,#EF7B24_35%,#E85A9E_65%,#7C6BFF_100%)] bg-[length:220%_100%] bg-clip-text text-transparent [animation:gradient-shift_8s_ease_infinite]">
                <Words text={HEADLINE_HIGHLIGHT} delay={0.45} />
              </span>
            </span>{" "}
            <Words text={HEADLINE_LINE_3} delay={0.75} />
          </span>
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: "easeOut" }}
          className="mx-auto mt-7 max-w-[680px] text-balance text-base leading-relaxed text-white/70 sm:text-lg"
        >
          EduNova AI is a next-generation learning platform where adaptive lessons, specialist AI
          mentors, and calm teacher tools work together — so every learner moves forward at their
          own pace.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group relative h-12 overflow-hidden rounded-full border-0 bg-[linear-gradient(92deg,#F19A3E,#EF7B24_55%,#E85A9E)] px-7 text-base font-semibold text-white shadow-[0_10px_40px_-10px_rgba(239,123,36,0.7)] transition-all hover:shadow-[0_16px_60px_-10px_rgba(239,123,36,0.9)] hover:-translate-y-0.5"
          >
            <Link to="/" hash="features">
              <span className="relative z-10 flex items-center gap-2">
                Explore Features
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="ghost"
            className="group h-12 rounded-full px-6 text-base font-medium text-white/85 hover:bg-white/[0.06] hover:text-white"
          >
            <a href="https://docs.lovable.dev/" target="_blank" rel="noreferrer">
              <span className="relative">
                Read Documentation
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </a>
          </Button>
        </motion.div>

        {/* Trust footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-[0.22em] text-white/55"
        >
          <span>Schools</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>Universities</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>Educators</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>Exam Aspirants</span>
        </motion.div>
      </div>

      {/* Smooth transition to light section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48">
        {/* Soft glow accent */}
        <div
          className="absolute inset-x-0 bottom-16 h-24 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(239,123,36,0.18), transparent 70%)",
          }}
        />
        {/* Gradient fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(7,16,24,0) 0%, rgba(7,16,24,0.4) 35%, rgba(252,250,247,0.75) 78%, #FCFAF7 100%)",
          }}
        />
        {/* Curved divider */}
        <svg
          className="absolute inset-x-0 bottom-0 h-16 w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,80 C240,20 480,0 720,20 C960,40 1200,70 1440,30 L1440,80 L0,80 Z"
            fill="#FCFAF7"
          />
        </svg>
      </div>
    </section>
  );
}

