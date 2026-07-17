import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Play, GraduationCap, Brain, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Users, label: "Active Learners", value: "1.2M+" },
  { icon: GraduationCap, label: "Expert Courses", value: "8,400+" },
  { icon: Brain, label: "AI Sessions Daily", value: "320K" },
  { icon: Trophy, label: "Skill Certifications", value: "540+" },
];

const trustedLogos = [
  "Stanford Online",
  "MIT OpenCourse",
  "Cambridge Prep",
  "Coursera Partners",
  "OECD Learning",
  "UNICEF Edu",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Introducing Nova Learn AI
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Learn Smarter.{" "}
              <span className="text-gradient">Grow Faster.</span>{" "}
              Powered by AI.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              EduNova AI is the adaptive learning platform that personalizes every lesson, tutor session,
              and assessment — helping students master skills, teachers save hours, and organizations
              scale learning outcomes measurably.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="shadow-elegant">
                <Link to="/register">
                  Get Started Free
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/ai-tutor">
                  <Play />
                  See AI Tutor in action
                </Link>
              </Button>
            </div>

            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Trusted by students & organizations worldwide
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                {trustedLogos.map((name) => (
                  <span
                    key={name}
                    className="text-sm font-semibold text-muted-foreground/80"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/30 via-highlight/20 to-accent/30 blur-3xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-elegant">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Brain className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Nova AI Tutor</p>
                      <p className="text-xs text-muted-foreground">Personalized session</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-success">
                    Live
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl rounded-tl-md bg-secondary p-3 text-sm">
                    Let's break down quadratic equations step by step. Ready?
                  </div>
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-primary p-3 text-sm text-primary-foreground">
                    Yes — start with the discriminant, please.
                  </div>
                  <div className="rounded-2xl rounded-tl-md bg-secondary p-3 text-sm">
                    Great. The discriminant Δ = b² − 4ac. Try one:
                    <span className="mt-2 block font-mono text-xs text-muted-foreground">
                      2x² + 3x − 5 = 0
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl border border-border/70 bg-secondary/50 p-2 text-center text-xs">
                  <div>
                    <p className="font-semibold text-foreground">Mastery</p>
                    <p className="text-primary">78%</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Streak</p>
                    <p className="text-accent-foreground">12 days</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Next</p>
                    <p className="text-highlight">Calculus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-card backdrop-blur transition hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                  <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
