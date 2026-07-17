import { Link } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const PLANS = [
  {
    name: "Learner",
    price: "$0",
    cadence: "forever",
    description: "Everything a curious student needs to get started with AI-guided learning.",
    features: [
      "Access to 1,000+ free courses",
      "Basic Nova AI Tutor (daily quota)",
      "Community discussions",
      "Progress tracking",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "/ month",
    description: "Unlimited adaptive learning for serious students and self-learners.",
    features: [
      "All courses & resources",
      "Unlimited Nova AI Tutor",
      "Adaptive learning paths",
      "Practice sets & mock exams",
      "Certificates of completion",
    ],
    cta: "Start Pro trial",
    featured: true,
  },
  {
    name: "Organizations",
    price: "Custom",
    cadence: "",
    description: "For schools, universities, and companies scaling learning to teams.",
    features: [
      "Everything in Pro",
      "Teacher & admin dashboards",
      "SSO & advanced security",
      "Cohort analytics & reporting",
      "Dedicated success manager",
    ],
    cta: "Talk to sales",
    featured: false,
  },
] as const;

export function PricingPreview({ heading = true }: { heading?: boolean }) {
  return (
    <Section
      eyebrow={heading ? "Pricing" : undefined}
      title={heading ? <>Simple pricing that <span className="text-gradient">grows with you</span></> : undefined}
      description={heading ? "Start free. Upgrade when you're ready. Every plan includes core adaptive learning." : undefined}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-3xl border p-8 transition",
              plan.featured
                ? "border-primary/60 bg-card shadow-elegant lg:-translate-y-2"
                : "border-border/60 bg-card shadow-card hover:-translate-y-1 hover:shadow-elegant",
            )}
          >
            {plan.featured && (
              <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
              {plan.cadence && (
                <span className="text-sm text-muted-foreground">{plan.cadence}</span>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              className="mt-8"
              variant={plan.featured ? "default" : "outline"}
            >
              <Link to={plan.name === "Organizations" ? "/contact" : "/register"}>{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}
