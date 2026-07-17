import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { WhySix } from "@/components/home/WhySix";
import { Categories } from "@/components/home/Categories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AIFeatures } from "@/components/home/AIFeatures";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export const Route = createFileRoute("/_marketing/")({
  head: () => ({
    meta: [
      { title: "EduNova AI — Learn faster with an AI that adapts to you" },
      {
        name: "description",
        content:
          "EduNova AI is an AI-powered self-learning platform that blends adaptive lessons and an always-on AI tutor into one warm, calm space for students, professionals, and organizations.",
      },
      { property: "og:title", content: "EduNova AI — Adaptive AI Learning" },
      {
        property: "og:description",
        content:
          "Adaptive lessons, specialist AI mentors, and analytics that actually help — for students, professionals, and organizations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="dark" style={{ background: "#071018", color: "#F5F7FA" }}>
      <Hero />
      <WhySix />
      <Categories />
      <HowItWorks />
      <AIFeatures />
      <FAQ />
      <FinalCTA />
    </div>
  );

}

