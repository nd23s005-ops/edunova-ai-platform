import { Link } from "@tanstack/react-router";

const categories = [
  "School Education",
  "College Education",
  "Programming",
  "Artificial Intelligence",
  "Cloud Computing",
  "Cyber Security",
  "Government Exams",
  "Placement Prep",
  "Communication",
  "Data Science",
];

export function Categories() {
  return (
    <section className="relative bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Learning Categories</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pick a path. Or <span className="text-gradient">chart your own.</span>
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map((c) => (
            <Link
              key={c}
              to="/explore"
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-card"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
