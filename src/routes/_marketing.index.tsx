import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { WhyChoose } from "@/components/home/WhyChoose";
import { AIExperience } from "@/components/home/AIExperience";
import { CourseCategories } from "@/components/home/CourseCategories";
import { ResourceLibrary } from "@/components/home/ResourceLibrary";
import { Testimonials } from "@/components/home/Testimonials";
import { PricingPreview } from "@/components/home/PricingPreview";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";

export const Route = createFileRoute("/_marketing/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <WhyChoose />
      <AIExperience />
      <CourseCategories />
      <ResourceLibrary />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <CTA />
    </>
  );
}
