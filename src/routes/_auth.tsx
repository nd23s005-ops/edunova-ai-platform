import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { Sparkles, Clock, Users, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

const VALUES = [
  {
    icon: Sparkles,
    title: "Personalized Learning",
    desc: "AI adapts to every learner.",
  },
  {
    icon: Clock,
    title: "Learn at Your Pace",
    desc: "Study anytime, anywhere.",
  },
  {
    icon: Users,
    title: "Built for Every Learner",
    desc: "Students, professionals, and organizations.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Privacy First",
    desc: "Your learning data stays protected.",
  },
];

function AuthLayout() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col justify-between px-6 py-8 sm:px-10">
        <Logo />
        <div className="mx-auto w-full max-w-md py-12">
          <Outlet />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} EduNova AI — Nova Learn AI
        </p>
      </div>

      <div className="relative hidden overflow-hidden bg-hero-gradient lg:block">
        <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
        {/* Floating glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-[pulse_9s_ease-in-out_infinite]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-[pulse_11s_ease-in-out_infinite]"
        />

        <div className="relative flex h-full flex-col justify-between gap-10 p-12 text-foreground">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur transition hover:bg-background animate-fade-in"
          >
            ← Back to homepage
          </Link>

          <div className="max-w-lg space-y-8 animate-fade-in">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                EduNova AI
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
                Learning should adapt to you,
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  not the other way around.
                </span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                EduNova AI is built to make self-learning more personal, practical, and intelligent.
                Whether you're a student, professional, or organization, our AI-powered
                platform helps you learn with clarity, confidence, and purpose.
              </p>
            </div>

            <figure className="rounded-2xl border border-border/60 bg-background/50 p-5 backdrop-blur">
              <blockquote className="text-base font-medium italic leading-relaxed sm:text-lg">
                "The beautiful thing about learning is that no one can take it away from you."
              </blockquote>
              <figcaption className="mt-3 text-xs font-semibold text-muted-foreground">
                — B.B. King
              </figcaption>
            </figure>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Our Mission
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                To build an AI-powered learning platform that makes quality education
                accessible, personalized, and engaging for everyone.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 animate-fade-in">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border/60 bg-background/60 p-4 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-background/80"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm font-semibold">{title}</p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

