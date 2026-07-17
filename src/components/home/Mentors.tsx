import { Code2, Sigma, Atom, PenLine, Landmark, Briefcase, Cloud, ShieldCheck } from "lucide-react";

const mentors = [
  { icon: Code2, name: "AI Coding Mentor", tag: "Programming", body: "Pair-programs across languages and reviews your code with worked examples." },
  { icon: Sigma, name: "AI Mathematics Mentor", tag: "Mathematics", body: "Explains proofs, breaks down problems, and drills concepts at your pace." },
  { icon: Atom, name: "AI Science Mentor", tag: "Physics · Chemistry", body: "Grounded, curriculum-aware science tutor with visual explanations." },
  { icon: PenLine, name: "AI English Mentor", tag: "English · Writing", body: "Improves grammar, tone, and vocabulary through targeted practice." },
  { icon: Landmark, name: "AI UPSC Mentor", tag: "Government Exams", body: "Prelims + Mains prep with syllabus-aware answer writing feedback." },
  { icon: Briefcase, name: "AI Interview Mentor", tag: "Placements", body: "Mock interviews across DSA, system design, and behavioral rounds." },
  { icon: Cloud, name: "AI Cloud Mentor", tag: "Cloud Computing", body: "Guides you through AWS/GCP/Azure with hands-on labs and quizzes." },
  { icon: ShieldCheck, name: "AI Cyber Security Mentor", tag: "Cyber Security", body: "Teaches offensive + defensive fundamentals with scenario-based labs." },
];

export function Mentors() {
  return (
    <section className="relative bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Meet your AI mentors</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Specialist AI, <span className="text-gradient">always on</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Focused AI mentors trained around a single specialization — so answers stay sharp, not generic.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((m) => (
            <div
              key={m.name}
              className="group relative rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <m.icon className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  AI Mentor
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold">{m.name}</h3>
              <p className="mt-1 text-xs font-medium text-accent-foreground">{m.tag}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
