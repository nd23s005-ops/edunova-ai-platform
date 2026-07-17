import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";

const FEATURE_TITLES: Record<string, { title: string; description: string }> = {
  "learning-twin": {
    title: "AI Learning Twin",
    description: "A private, evolving representation of your knowledge — updated after every lesson, quiz, and question.",
  },
  "knowledge-gap": {
    title: "Knowledge Gap Analysis",
    description: "Continuously analyzes responses to spot fragile concepts and prescribes targeted reinforcement.",
  },
  "adaptive-recommendations": {
    title: "Adaptive Recommendations",
    description: "A recommender that respects your goals, energy, and calendar to sequence the next best lesson.",
  },
  "ai-tutor": {
    title: "AI Tutor",
    description: "A patient tutor that meets you at your level and adapts explanations until it clicks.",
  },
  "exam-generator": {
    title: "Exam Generator",
    description: "Realistic mock exams based on your syllabus, performance, and target difficulty.",
  },
  "progress-analytics": {
    title: "Progress Analytics",
    description: "Analytics designed to be read at a glance — streaks, mastery, and time on task.",
  },
};

export const Route = createFileRoute("/_marketing/features/$slug")({
  loader: ({ params }) => {
    const info = FEATURE_TITLES[params.slug];
    if (!info) throw notFound();
    return info;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — EduNova AI` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.title} — EduNova AI` },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "Feature — EduNova AI" }, { name: "robots", content: "noindex" }],
  }),
  component: FeatureDetailPage,
  notFoundComponent: FeatureNotFound,
});

function FeatureDetailPage() {
  const info = Route.useLoaderData();
  return (
    <>
      <PageHeader
        eyebrow="Feature"
        title={<>{info.title}</>}
        description={info.description}
      />
      <Section>
        <div className="rounded-2xl border border-dashed border-border/60 bg-card/60 p-12 text-center text-muted-foreground">
          Deep-dive content for this feature is coming next. This page is reserved and routed.
        </div>
      </Section>
    </>
  );
}

function FeatureNotFound() {
  return (
    <PageHeader
      eyebrow="Not found"
      title={<>This feature <span className="text-gradient">doesn't exist</span></>}
      description="Check the URL, or head back to the homepage to explore what's available."
    />
  );
}
