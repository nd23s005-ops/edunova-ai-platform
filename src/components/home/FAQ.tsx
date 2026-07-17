import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does AI personalize learning?",
    a: "EduNova AI builds a Learning Twin from your quiz results, watch time, and questions asked. Every session updates the model so future lessons target exactly what you need next.",
  },
  {
    q: "Can I prepare for government exams?",
    a: "Yes. Choose your target exam and the platform generates a syllabus-aware study plan, mock papers, and analytics that mirror the real test.",
  },
  {
    q: "Can teachers create courses?",
    a: "Teachers can author lessons, assessments, and cohorts, plus see per-student progress with our classroom dashboard.",
  },
  {
    q: "Is my data secure?",
    a: "Your data is encrypted in transit and at rest. We never sell learner data and honor deletion requests within 30 days.",
  },
  {
    q: "Do you support multiple languages?",
    a: "We currently support English, தமிழ், हिन्दी, తెలుగు, മലയാളം, and ಕನ್ನಡ, with more languages on the way.",
  },
];

export function FAQ() {
  return (
    <section className="relative bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Answers, <span className="text-gradient">not marketing</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card px-5 shadow-card"
            >
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
