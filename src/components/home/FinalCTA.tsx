import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-fade opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Start your <span className="text-gradient">AI learning journey</span> today
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">
          Adaptive lessons, specialist AI mentors, and analytics that actually help.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="shadow-elegant">
            <Link to="/register">
              Get started free
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/explore">Explore the platform</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
