import { Section } from "@/components/layout/Section";
import { BookOpen, Bot, LineChart, Rocket, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Tutor, Always On",
    desc: "24/7 personalized guidance that adapts to how each learner thinks, questions, and grows.",
  },
  {
    icon: LineChart,
    title: "Adaptive Learning Paths",
    desc: "Curriculum that reshapes itself in real time based on mastery, pace, and goals.",
  },
  {
    icon: BookOpen,
    title: "Rich Resource Library",
    desc: "Thousands of curated lessons, guides, and practice sets across every major subject.",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    desc: "Purpose-built experiences for students, teachers, organizations, and administrators.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    desc: "Enterprise-grade privacy, moderated AI, and transparent data controls by default.",
  },
  {
    icon: Rocket,
    title: "Outcomes You Can Measure",
    desc: "Real-time analytics show mastery, engagement, and progress — from student to cohort.",
  },
];

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="Features"
      title={<>Everything you need to <span className="text-gradient">learn better</span></>}
      description="A modern, AI-native platform designed around real learning — not just content delivery."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
