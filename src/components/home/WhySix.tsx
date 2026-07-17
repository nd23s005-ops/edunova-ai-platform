import { Brain, Map, ClipboardCheck, Route, BarChart3 } from "lucide-react";

const items = [
  { icon: Brain, title: "AI Learning Twin", body: "A digital twin of your knowledge — always learning with you." },
  { icon: Map, title: "Knowledge Gap Mapper", body: "Pinpoints missing concepts before they slow you down." },
  { icon: ClipboardCheck, title: "AI Exam Simulator", body: "Realistic mock exams generated for your syllabus." },
  { icon: Route, title: "Personalized Paths", body: "Lesson plans that adapt after every attempt." },
  { icon: BarChart3, title: "Smart Analytics", body: "See progress, blockers, and momentum at a glance." },
];

export function WhySix() {
  return (
    <section className="relative bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why EduNova AI</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Built for how humans <span className="text-gradient">actually learn</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Intelligent systems working together in one warm learning space.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <div
              key={i.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <i.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
