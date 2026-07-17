import { Section } from "@/components/layout/Section";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Nova helped me jump two grade levels in math. It actually understood where I got stuck and explained things until I got it.",
    name: "Amara Okafor",
    role: "High school student, Lagos",
  },
  {
    quote:
      "I save at least six hours a week on lesson prep and get real signal on which students need support. It's transformed how I teach.",
    name: "Daniel Sørensen",
    role: "Physics teacher, Oslo",
  },
  {
    quote:
      "We rolled EduNova AI out to 3,400 employees in three weeks. Engagement is 3× our previous LMS and the analytics are finally actionable.",
    name: "Priya Raman",
    role: "Head of L&D, Fintech company",
  },
  {
    quote:
      "The adaptive paths are gold. Every learner gets what they need next — not what a static curriculum says they need.",
    name: "Marcus Bell",
    role: "District curriculum lead",
  },
];

export function Testimonials() {
  return (
    <Section
      eyebrow="Testimonials"
      title={<>Loved by learners, <span className="text-gradient">trusted by leaders</span></>}
      description="Real people using EduNova AI to change how they learn, teach, and grow."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
          >
            <div>
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
            </div>
            <figcaption className="mt-6 border-t border-border/70 pt-4">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
