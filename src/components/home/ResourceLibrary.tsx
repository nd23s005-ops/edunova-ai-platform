import { Link } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpenCheck, FileText, GraduationCap, Video } from "lucide-react";

const resources = [
  {
    icon: Video,
    kind: "Video Course",
    title: "Foundations of Machine Learning",
    meta: "12 modules · 8h 40m",
  },
  {
    icon: FileText,
    kind: "Study Guide",
    title: "AP Calculus Mastery Guide",
    meta: "PDF · 84 pages",
  },
  {
    icon: BookOpenCheck,
    kind: "Practice Set",
    title: "IELTS Academic Writing Drills",
    meta: "40 exercises · Adaptive",
  },
  {
    icon: GraduationCap,
    kind: "Learning Path",
    title: "Become a Full-Stack Developer",
    meta: "24 weeks · Certificate",
  },
];

export function ResourceLibrary() {
  return (
    <Section
      eyebrow="Resource Library"
      title={<>A world-class library, curated by <span className="text-gradient">Nova AI</span></>}
      description="Every resource is aligned to real learning outcomes, ranked and updated continuously."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {resources.map((r) => (
              <div
                key={r.title}
                className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <r.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">{r.kind}</p>
                  <h3 className="mt-1 truncate text-base font-semibold">{r.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{r.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="flex h-full flex-col justify-between rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-highlight/10 to-accent/10 p-6 shadow-card">
            <div>
              <h3 className="text-xl font-semibold">10,000+ resources at your fingertips</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Videos, guides, drills, quizzes and full learning paths — searchable, adaptive, and always up to date.
              </p>
            </div>
            <Button asChild className="mt-6 shadow-elegant">
              <Link to="/resources">
                Explore the library <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
