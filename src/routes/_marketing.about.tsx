import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Compass, Heart, Sparkles, Target } from "lucide-react";

export const Route = createFileRoute("/_marketing/about")({
  head: () => ({
    meta: [
      { title: "About — EduNova AI" },
      { name: "description", content: "EduNova AI is on a mission to make world-class, adaptive learning accessible to every student, teacher, and organization." },
      { property: "og:title", content: "About EduNova AI" },
      { property: "og:description", content: "Our mission: adaptive learning for everyone." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Heart, title: "Learners first", desc: "Every product decision starts with the learner in the room." },
  { icon: Sparkles, title: "AI with integrity", desc: "Transparent, explainable, and grounded in real education." },
  { icon: Target, title: "Outcomes over content", desc: "We measure mastery, not just minutes watched." },
  { icon: Compass, title: "Global by design", desc: "Learning that works across languages, cultures, and contexts." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={<>Adaptive learning for <span className="text-gradient">every learner</span></>}
        description="EduNova AI was founded by a team of educators, learning scientists, and engineers who believe every student deserves a great tutor."
      />
      <Section
        eyebrow="Our mission"
        align="left"
        title={<>Make world-class learning <span className="text-gradient">personal</span> — for everyone.</>}
        description="We're building the adaptive learning platform we wish existed when we were students — one that meets every learner exactly where they are and helps them go further than they thought possible."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
