import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { PricingPreview } from "@/components/home/PricingPreview";
import { FAQ } from "@/components/home/FAQ";

export const Route = createFileRoute("/_marketing/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — EduNova AI" },
      { name: "description", content: "Simple, transparent pricing for students, professionals, and organizations. Start free with EduNova AI." },
      { property: "og:title", content: "EduNova AI Pricing" },
      { property: "og:description", content: "Free forever for learners. Pro for serious study. Custom plans for organizations." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={<>Plans for every <span className="text-gradient">learner</span></>}
        description="Start free. Upgrade when you need more. Custom plans for schools and organizations."
      />
      <PricingPreview heading={false} />
      <FAQ />
    </>
  );
}
