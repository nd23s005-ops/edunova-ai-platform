import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, Search, Star, Users } from "lucide-react";

export const Route = createFileRoute("/_marketing/explore")({
  head: () => ({
    meta: [
      { title: "Courses — EduNova AI" },
      { name: "description", content: "Browse thousands of adaptive courses across math, science, languages, business, and more on EduNova AI." },
      { property: "og:title", content: "EduNova AI Courses" },
      { property: "og:description", content: "Adaptive AI-powered courses for every learner." },
    ],
  }),
  component: CoursesPage,
});

const categories = ["All", "Computer Science", "Mathematics", "Science", "Languages", "Business", "Design", "Engineering"];

const courses = [
  { title: "Foundations of Machine Learning", cat: "Computer Science", level: "Intermediate", hours: 12, learners: "48.2k", rating: 4.9 },
  { title: "AP Calculus AB — Complete Path", cat: "Mathematics", level: "Advanced", hours: 24, learners: "31.7k", rating: 4.8 },
  { title: "Conversational Spanish B1", cat: "Languages", level: "Beginner", hours: 18, learners: "62.4k", rating: 4.9 },
  { title: "Financial Modeling in Excel", cat: "Business", level: "Intermediate", hours: 9, learners: "22.1k", rating: 4.7 },
  { title: "Modern Web Development", cat: "Computer Science", level: "Intermediate", hours: 30, learners: "84.5k", rating: 4.9 },
  { title: "Physics: Mechanics & Motion", cat: "Science", level: "Intermediate", hours: 15, learners: "19.3k", rating: 4.8 },
  { title: "UX Design Fundamentals", cat: "Design", level: "Beginner", hours: 11, learners: "27.8k", rating: 4.8 },
  { title: "Data Structures & Algorithms", cat: "Computer Science", level: "Advanced", hours: 28, learners: "56.9k", rating: 4.9 },
  { title: "Creative Writing Workshop", cat: "Languages", level: "Beginner", hours: 8, learners: "14.5k", rating: 4.7 },
];

function CoursesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Courses"
        title={<>Learn anything, <span className="text-gradient">adaptively</span></>}
        description="Thousands of expert-crafted courses, personalized by Nova AI to your pace and goals."
      >
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses, skills, or topics..." className="h-11 bg-background/80 pl-10 backdrop-blur" />
        </div>
      </PageHeader>

      <Section>
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                i === 0
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <div key={c.title} className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-highlight/20 to-accent/20">
                <div className="absolute inset-0 bg-grid-fade opacity-40" />
                <span className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                  {c.level}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <Badge variant="secondary" className="w-fit">{c.cat}</Badge>
                <h3 className="mt-3 line-clamp-2 text-base font-semibold">{c.title}</h3>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{c.hours}h</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{c.learners}</span>
                  <span className="flex items-center gap-1 text-accent-foreground"><Star className="h-3.5 w-3.5 fill-current text-accent" />{c.rating}</span>
                </div>
                <Button asChild variant="outline" size="sm" className="mt-5">
                  <Link to="/register">Start course</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
