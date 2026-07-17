import { Section } from "@/components/layout/Section";
import { Check } from "lucide-react";

const points = [
  {
    title: "Personalized for every learner",
    desc: "Nova AI reads each student's mastery, pace, and interests to tailor every session.",
  },
  {
    title: "Designed with educators",
    desc: "Built alongside teachers and researchers — pedagogy first, technology second.",
  },
  {
    title: "Scales from classroom to enterprise",
    desc: "One platform for a single student, a school district, or a global organization.",
  },
  {
    title: "Transparent AI you can trust",
    desc: "Explainable recommendations, human-reviewed content, and clear data practices.",
  },
];

export function WhyChoose() {
  return (
    <Section
      eyebrow="Why EduNova AI"
      align="left"
      title={<>The learning platform teachers, students, and organizations <span className="text-gradient">actually trust</span></>}
      description="We combine research-backed pedagogy with modern AI to deliver measurable outcomes — not gimmicks."
    >
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <ul className="space-y-5">
            {points.map((p) => (
              <li key={p.title} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-base font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-highlight/10 to-accent/10 p-8 shadow-elegant">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-card p-5 shadow-card">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Learner outcomes</p>
                <p className="mt-2 text-3xl font-bold">+38%</p>
                <p className="mt-1 text-xs text-muted-foreground">avg. mastery gain</p>
              </div>
              <div className="rounded-2xl bg-card p-5 shadow-card">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Teacher time saved</p>
                <p className="mt-2 text-3xl font-bold">6.2h</p>
                <p className="mt-1 text-xs text-muted-foreground">per week, on average</p>
              </div>
              <div className="col-span-2 rounded-2xl bg-card p-5 shadow-card">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Engagement</p>
                <div className="mt-3 flex items-end gap-1.5">
                  {[42, 58, 51, 66, 72, 80, 89].map((v, i) => (
                    <span
                      key={i}
                      className="w-full rounded-t-md bg-gradient-to-t from-primary to-highlight"
                      style={{ height: `${v}px` }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Weekly active learners across cohorts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
