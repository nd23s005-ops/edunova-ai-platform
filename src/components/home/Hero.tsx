import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const trust = ["Schools", "Colleges", "Universities", "Organizations", "Govt. Exam Aspirants"];

const introCards = [
  {
    icon: Sparkles,
    title: "Adaptive AI tutor",
    body: "Personalized guidance that adjusts to how each student learns best.",
  },
  {
    icon: BookOpen,
    title: "Structured courses",
    body: "Lessons, checkpoints, and progress tracking that actually stick.",
  },
  {
    icon: Users,
    title: "For students & teachers",
    body: "Role-based dashboards designed for classrooms of any size.",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient hero background */}
      <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-fade opacity-70" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-24 h-2 w-2 rounded-full bg-primary/70 blur-[2px]" />
        <div className="absolute right-1/4 top-40 h-1.5 w-1.5 rounded-full bg-accent/80 blur-[1px]" />
        <div className="absolute left-1/3 bottom-24 h-1.5 w-1.5 rounded-full bg-highlight/80 blur-[1px]" />
        <div className="absolute right-1/3 bottom-40 h-2 w-2 rounded-full bg-primary/60 blur-[2px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            New: Adaptive AI tutor
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Learn faster with an <span className="text-gradient">AI that adapts</span> to you.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            EduNova AI blends adaptive lessons, an always-on tutor, and teacher tools into one warm,
            calm learning space for students and educators alike.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="shadow-elegant">
              <Link to="/" hash="features">
                Explore features
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://docs.lovable.dev/" target="_blank" rel="noreferrer">
                Read the docs
              </a>
            </Button>
          </div>
        </div>

        <div id="features" className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {introCards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by learners and educators
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {trust.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
