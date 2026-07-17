import { Link } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import {
  Atom,
  Calculator,
  Code2,
  Globe2,
  Languages,
  LineChart,
  Microscope,
  Palette,
} from "lucide-react";

const categories = [
  { icon: Code2, name: "Computer Science", count: "1,240 courses", tint: "from-primary/15 to-primary/5" },
  { icon: Calculator, name: "Mathematics", count: "980 courses", tint: "from-highlight/15 to-highlight/5" },
  { icon: Microscope, name: "Science", count: "1,100 courses", tint: "from-accent/25 to-accent/5" },
  { icon: Languages, name: "Languages", count: "720 courses", tint: "from-success/15 to-success/5" },
  { icon: LineChart, name: "Business", count: "640 courses", tint: "from-primary/15 to-primary/5" },
  { icon: Palette, name: "Design & Arts", count: "410 courses", tint: "from-accent/25 to-accent/5" },
  { icon: Atom, name: "Engineering", count: "530 courses", tint: "from-highlight/15 to-highlight/5" },
  { icon: Globe2, name: "Humanities", count: "380 courses", tint: "from-success/15 to-success/5" },
];

export function CourseCategories() {
  return (
    <Section
      eyebrow="Course Categories"
      title={<>Explore learning across <span className="text-gradient">every discipline</span></>}
      description="From foundational skills to advanced specializations, every path is powered by adaptive AI."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.name}
            to="/courses"
            className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${c.tint} p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-background text-primary shadow-card">
              <c.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-base font-semibold">{c.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{c.count}</p>
            <span className="mt-4 inline-flex text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
              Browse →
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
