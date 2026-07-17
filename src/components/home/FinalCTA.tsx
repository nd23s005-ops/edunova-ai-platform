import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function FinalCTA() {
  const reduce = useReducedMotion();
  return (
    <section className="relative py-20 sm:py-28" style={{ background: "#FCFAF7" }}>
      <div className="mx-auto w-[92%] max-w-6xl px-2 sm:w-[85%] sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative overflow-hidden rounded-[32px] px-6 py-16 text-center sm:px-12 sm:py-20"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.18 0.03 240) 0%, oklch(0.22 0.05 260) 50%, oklch(0.16 0.04 240) 100%)",
          }}
        >
          {/* Aurora / glows */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <motion.div
              className="absolute -left-24 top-0 h-[380px] w-[380px] rounded-full blur-3xl"
              style={{ background: "color-mix(in oklab, var(--accent) 55%, transparent)" }}
              animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full blur-3xl"
              style={{ background: "color-mix(in oklab, var(--primary-glow) 60%, transparent)" }}
              animate={reduce ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.55, 0.8, 0.55] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{ background: "color-mix(in oklab, var(--highlight) 45%, transparent)" }}
              animate={reduce ? undefined : { scale: [1, 1.2, 1], opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* neural grid */}
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
                maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 80%)",
              }}
            />

            {/* particles */}
            {!reduce &&
              Array.from({ length: 14 }).map((_, i) => {
                const left = (i * 73) % 100;
                const top = (i * 41) % 100;
                return (
                  <motion.span
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                    style={{ left: `${left}%`, top: `${top}%` }}
                    animate={{ y: [0, -20, 0], opacity: [0.2, 0.9, 0.2] }}
                    transition={{
                      duration: 4 + (i % 5),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.25,
                    }}
                  />
                );
              })}

            {/* glass overlay */}
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[2px]" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Ready when you are
            </span>

            <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Start your{" "}
              <span className="text-gradient bg-[length:200%_100%] [animation:gradient-shift_6s_ease_infinite]">
                AI learning
              </span>{" "}
              journey today
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Adaptive lessons, specialist AI mentors, personalized learning paths, and intelligent
              analytics — all in one platform.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/register"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent to-[oklch(0.72_0.16_50)] px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[0_10px_40px_-10px_oklch(0.82_0.14_80/0.7)] transition-transform hover:scale-[1.03]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/explore"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
