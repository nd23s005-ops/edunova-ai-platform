import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { BookOpen, FileText, GraduationCap, Headphones, Library, Video } from "lucide-react";

export const Route = createFileRoute("/_marketing/resources")({
  head: () => ({
    meta: [
      { title: "Resources — EduNova AI" },
      { name: "description", content: "Explore the EduNova AI resource library: videos, study guides, practice sets, and full learning paths." },
      { property: "og:title", content: "EduNova AI Resource Library" },
      { property: "og:description", content: "Videos, guides, drills, and learning paths — curated by Nova AI." },
    ],
  }),
  component: ResourcesPage,
});

const kinds = [
  { icon: Video, name: "Video Lessons", count: "6,400+" },
  { icon: FileText, name: "Study Guides", count: "2,100+" },
  { icon: BookOpen, name: "Practice Sets", count: "3,800+" },
  { icon: GraduationCap, name: "Learning Paths", count: "540+" },
  { icon: Headphones, name: "Audio Lessons", count: "980+" },
  { icon: Library, name: "eBooks", count: "1,250+" },
];

function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resource Library"
        title={<>Your <span className="text-gradient">learning library</span>, curated by Nova</>}
        description="Explore videos, guides, drills, and full learning paths — updated continuously and ranked by outcomes."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kinds.map((k) => (
            <div key={k.name} className="group rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <k.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{k.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{k.count} resources</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
