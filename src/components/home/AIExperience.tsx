import { Section } from "@/components/layout/Section";
import { Brain, MessageSquare, Route, Target } from "lucide-react";

const steps = [
  {
    icon: Target,
    step: "01",
    title: "Set your goals",
    desc: "Tell Nova what you want to learn, master, or teach. It builds a plan tailored to you.",
  },
  {
    icon: Route,
    step: "02",
    title: "Follow adaptive paths",
    desc: "Your curriculum evolves as you progress — no more one-size-fits-all lessons.",
  },
  {
    icon: MessageSquare,
    step: "03",
    title: "Learn with your AI tutor",
    desc: "Ask questions, get feedback, and practice with Nova — anywhere, any time.",
  },
  {
    icon: Brain,
    step: "04",
    title: "Master. Measure. Repeat.",
    desc: "Track mastery in real time and level up with data-driven recommendations.",
  },
];

export function AIExperience() {
  return (
    <Section
      eyebrow="AI Learning Experience"
      title={<>Meet <span className="text-gradient">Nova</span> — your always-on learning companion</>}
      description="A four-step adaptive loop that turns curiosity into mastery."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div
            key={s.title}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
          >
            <span className="absolute right-4 top-4 text-4xl font-bold text-secondary">{s.step}</span>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-highlight/15 text-highlight">
              <s.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-base font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
