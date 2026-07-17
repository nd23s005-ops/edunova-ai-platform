import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";

export const Route = createFileRoute("/_marketing/community")({
  head: () => ({
    meta: [
      { title: "Community — EduNova AI" },
      { name: "description", content: "Join the EduNova AI community of learners, educators, and organizations sharing what works." },
      { property: "og:title", content: "EduNova AI Community" },
      { property: "og:description", content: "Discussions, events, and educator stories from the EduNova AI community." },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title={<>Learn together. <span className="text-gradient">Grow together.</span></>}
        description="Discussions, events, and educator stories from the EduNova AI community. More coming soon."
      />
      <Section>
        <div className="rounded-2xl border border-dashed border-border/60 bg-card/60 p-12 text-center text-muted-foreground">
          Community features are on the way. Sign up to be notified when discussions and events launch.
        </div>
      </Section>
    </>
  );
}
