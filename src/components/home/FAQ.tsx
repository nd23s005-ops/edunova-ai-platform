import { Section } from "@/components/layout/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is EduNova AI?",
    a: "EduNova AI (also called Nova Learn AI) is an adaptive learning platform that combines expert-crafted courses with an AI tutor that personalizes every session for students, teachers, and organizations.",
  },
  {
    q: "Who is EduNova AI for?",
    a: "Students of any age, teachers who want to save time and reach every learner, and organizations that need to scale learning outcomes across teams or institutions.",
  },
  {
    q: "How is Nova AI different from other tutors?",
    a: "Nova adapts in real time based on mastery, pace, and interests, and it grounds every explanation in vetted learning material. You get personalization plus quality — not one at the expense of the other.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. We use enterprise-grade encryption, transparent data controls, and align with privacy standards for education. You own your data, always.",
  },
  {
    q: "Can I try EduNova AI for free?",
    a: "Absolutely. The Learner plan is free forever and includes access to 1,000+ courses and daily Nova AI tutoring.",
  },
  {
    q: "Do you support schools and organizations?",
    a: "Yes. Organizations get admin & teacher dashboards, SSO, cohort analytics, and dedicated support. Contact us for a tailored rollout.",
  },
];

export function FAQ() {
  return (
    <Section
      eyebrow="FAQ"
      title={<>Frequently asked <span className="text-gradient">questions</span></>}
      description="Everything you need to know before getting started."
    >
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="rounded-2xl border border-border/60 bg-card px-2 shadow-card">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border/60">
              <AccordionTrigger className="px-4 text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
