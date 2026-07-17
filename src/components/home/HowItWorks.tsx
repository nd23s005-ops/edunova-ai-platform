import { UserPlus, Sparkles, ClipboardList, TrendingUp } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Sign Up", body: "Create your free account in seconds." },
  { icon: Sparkles, title: "Learn with AI", body: "Adaptive lessons tuned to your pace." },
  { icon: ClipboardList, title: "Practice & Analyze", body: "Quizzes and analytics reveal gaps." },
  { icon: TrendingUp, title: "Improve Continuously", body: "Your learning plan updates every day." },
];

export function HowItWorks() {
  return (
    <section className="relative bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            From sign-up to <span className="text-gradient">mastery in four steps</span>
          </h2>
        </div>

        <ol className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Step {i + 1}
              </span>
              <span className="mt-3 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
