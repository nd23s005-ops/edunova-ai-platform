import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, MessageCircle, Sparkles, Target, Wand2 } from "lucide-react";

export const Route = createFileRoute("/_marketing/ai-tutor")({
  head: () => ({
    meta: [
      { title: "Nova AI Tutor — EduNova AI" },
      { name: "description", content: "Nova is EduNova AI's always-on tutor: personalized guidance, real-time feedback, and adaptive practice for every learner." },
      { property: "og:title", content: "Meet Nova — EduNova AI Tutor" },
      { property: "og:description", content: "Your always-on, personalized AI tutor. 24/7." },
    ],
  }),
  component: AITutorPage,
});

const abilities = [
  { icon: MessageCircle, title: "Explains anything", desc: "Ask Nova to break down concepts your way — visually, step-by-step, or by analogy." },
  { icon: Target, title: "Practices with you", desc: "Adaptive drills that focus on what you haven't mastered yet — not what you already know." },
  { icon: Lightbulb, title: "Gives real feedback", desc: "Personalized hints and corrections so you learn from every mistake, instantly." },
  { icon: Wand2, title: "Plans your path", desc: "Sets goals, schedules sessions, and adapts your roadmap as you grow." },
];

function AITutorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nova AI Tutor"
        title={<>Meet <span className="text-gradient">Nova</span> — your always-on tutor</>}
        description="Personalized, patient, and available 24/7 — Nova helps every learner move from stuck to confident."
      >
        <Button asChild size="lg" className="shadow-elegant">
          <Link to="/register"><Sparkles /> Try Nova free</Link>
        </Button>
      </PageHeader>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {abilities.map((a) => (
            <div key={a.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-highlight/15 text-highlight">
                <a.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Brain className="h-3.5 w-3.5" /> Nova in action
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A tutor that <span className="text-gradient">understands you</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Nova remembers what you've learned, adapts to your pace, and grounds every explanation
              in vetted educational content. Ask questions in plain language — get answers that make sense to you.
            </p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-elegant">
            <div className="space-y-3">
              <div className="rounded-2xl rounded-tl-md bg-secondary p-3 text-sm">
                Nova, why does the derivative of sin(x) equal cos(x)?
              </div>
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-primary p-3 text-sm text-primary-foreground">
                Great question. Let me show you visually first, then formally.
              </div>
              <div className="rounded-2xl rounded-tl-md bg-secondary p-3 text-sm">
                Picture sin(x) as a wave — the slope at each point traces out cos(x)...
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
