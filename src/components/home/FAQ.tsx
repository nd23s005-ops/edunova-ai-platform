import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does AI personalize learning?",
    a: "EduNova AI builds a personalized learning profile for every learner. It continuously adapts lessons, quizzes, explanations, recommendations, and revision plans based on your strengths, weaknesses, learning speed, goals, and progress.",
  },
  {
    q: "Can I prepare for competitive exams?",
    a: "Yes. Dedicated AI Mentors support UPSC, SSC, Banking, TNPSC, NEET, JEE, GATE, CAT, placement preparation, aptitude, interview practice, and many other competitive exams with syllabus-aware guidance.",
  },
  {
    q: "Can teachers create courses?",
    a: "Teachers can build structured courses, upload notes, PDFs, videos, assignments, quizzes, coding exercises, and monitor student performance through their dedicated dashboard.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use encrypted authentication, secure cloud storage, role-based permissions, and industry-standard security practices to protect all learning data and personal information.",
  },
  {
    q: "Do you support multiple languages?",
    a: "Yes. EduNova AI is designed to support multilingual learning with AI-powered explanations, translated resources, and localized educational content.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden py-24 sm:py-32" style={{ background: "#FCFAF7" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary-glow/10 blur-3xl" />
        <div className="absolute inset-0 bg-grid-fade opacity-25" />
      </div>

      <div className="relative mx-auto w-full max-w-[850px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur"
          >
            <MessageCircle className="h-3.5 w-3.5" /> FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Answers,{" "}
            <span className="text-gradient bg-[length:200%_100%] [animation:gradient-shift_6s_ease_infinite]">
              not marketing
            </span>
            .
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground"
          >
            Everything you need to know about EduNova AI, our AI mentors, courses, privacy,
            organizations, and learning experience.
          </motion.p>
        </div>

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <AccordionItem
                value={`item-${i}`}
                className="overflow-hidden rounded-[18px] border border-white/60 bg-white/80 px-6 shadow-card backdrop-blur-xl transition-shadow hover:shadow-elegant"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline sm:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
