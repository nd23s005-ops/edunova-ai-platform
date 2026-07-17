import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, Sparkles, Clock, Layers, Star, ArrowRight, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { normalizeRole } from "@/lib/auth/roles";

export const Route = createFileRoute("/_dashboard/dashboard/upskilling/")({
  component: UpskillingHub,
});

type UpskillCourse = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string | null;
  difficulty: string;
  estimated_hours: number | null;
  audience: string[];
  is_featured: boolean;
  created_at: string;
};

const DIFFICULTIES = ["all", "beginner", "intermediate", "advanced"] as const;

const FEATURED_SKILLS: string[] = [
  "Python Programming",
  "Java Programming",
  "JavaScript",
  "HTML & CSS",
  "React.js",
  "Node.js",
  "Full Stack MERN Development",
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "SQL & Databases",
  "Cloud Computing (AWS)",
  "Cyber Security",
  "UI/UX Design",
  "Git & GitHub",
  "Communication Skills",
  "Resume Building",
  "Interview Preparation",
  "Aptitude & Logical Reasoning",
];

function matchesFeatured(course: { title: string; category: string }): boolean {
  const hay = `${course.title} ${course.category}`.toLowerCase();
  return FEATURED_SKILLS.some((s) => {
    const needle = s.toLowerCase();
    if (hay.includes(needle)) return true;
    // Fallback: match first significant token (e.g. "Python" from "Python Programming")
    const token = needle.split(/[^a-z0-9+.#]+/).filter((t) => t.length > 2)[0];
    return token ? hay.includes(token) : false;
  });
}

function UpskillingHub() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>("all");
  const [duration, setDuration] = useState<"all" | "short" | "medium" | "long">("all");

  const { data: role } = useQuery({
    queryKey: ["me", "role-normalized"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id).maybeSingle();
      return normalizeRole((data?.role as string | undefined) ?? null);
    },
    staleTime: 60_000,
  });

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["upskill-courses"],
    queryFn: async () => {
      const { data, error } = await (supabase as unknown as {
        from: (t: string) => {
          select: (s: string) => {
            eq: (k: string, v: unknown) => { order: (c: string, o: { ascending: boolean }) => Promise<{ data: UpskillCourse[] | null; error: unknown }> };
          };
        };
      })
        .from("upskill_courses")
        .select("id, slug, title, category, description, difficulty, estimated_hours, audience, is_featured, created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as UpskillCourse[];
    },
  });

  const { data: enrolledIds = new Set<string>() } = useQuery({
    queryKey: ["upskill-enrollments-ids"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return new Set<string>();
      const { data } = await (supabase as unknown as {
        from: (t: string) => { select: (s: string) => { eq: (k: string, v: string) => Promise<{ data: { course_id: string }[] | null }> } };
      })
        .from("upskill_enrollments")
        .select("course_id")
        .eq("user_id", u.user.id);
      return new Set((data ?? []).map((r) => r.course_id));
    },
  });

  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => set.add(c.category));
    return ["all", ...Array.from(set).sort()];
  }, [courses]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return courses.filter((c) => {
      if (role && !c.audience.includes(role)) return false;
      if (category !== "all" && c.category !== category) return false;
      if (difficulty !== "all" && c.difficulty !== difficulty) return false;
      const hrs = c.estimated_hours ?? 0;
      if (duration === "short" && hrs > 10) return false;
      if (duration === "medium" && (hrs <= 10 || hrs > 20)) return false;
      if (duration === "long" && hrs <= 20) return false;
      if (s && !`${c.title} ${c.category} ${c.description ?? ""}`.toLowerCase().includes(s)) return false;
      return true;
    });
  }, [courses, role, category, difficulty, duration, search]);

  const featured = filtered.filter((c) => c.is_featured).slice(0, 3);
  const recent = [...filtered].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 4);

  return (
    <>
      <DashboardHeader
        title="Upskilling Hub"
        description="Career-ready courses across programming, AI, design, communication and more."
        actions={
          <Link to="/dashboard/mock-tests">
            <Button variant="outline" size="sm" className="gap-2">
              <Layers className="h-4 w-4" /> Mock tests
            </Button>
          </Link>
        }
      />

      <div className="mb-6 rounded-2xl border border-border/60 bg-card p-4 shadow-card">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, categories, skills…"
              className="pl-9"
              aria-label="Search upskilling courses"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={category} onChange={setCategory} options={categories} />
            <Select
              value={difficulty}
              onChange={(v) => setDifficulty(v as typeof difficulty)}
              options={DIFFICULTIES as unknown as string[]}
            />
            <Select
              value={duration}
              onChange={(v) => setDuration(v as typeof duration)}
              options={["all", "short", "medium", "long"]}
              labels={{ all: "Any duration", short: "≤ 10h", medium: "10–20h", long: "> 20h" }}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading courses…</p>
      ) : (
        <>
          {featured.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" /> Featured for you
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {featured.map((c) => (
                  <CourseCard key={c.id} course={c} enrolled={enrolledIds.has(c.id)} featured />
                ))}
              </div>
            </section>
          )}

          {recent.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Star className="h-4 w-4 text-primary" /> Recently added
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {recent.map((c) => (
                  <CourseCard key={c.id} course={c} enrolled={enrolledIds.has(c.id)} compact />
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <BookOpen className="h-4 w-4 text-primary" /> All courses ({filtered.length})
            </h2>
            {filtered.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No courses match your filters.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((c) => (
                  <CourseCard key={c.id} course={c} enrolled={enrolledIds.has(c.id)} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}

function Select({
  value,
  onChange,
  options,
  labels,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  labels?: Record<string, string>;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 rounded-md border border-border/60 bg-background px-3 text-sm capitalize"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {labels?.[o] ?? o}
        </option>
      ))}
    </select>
  );
}

function CourseCard({
  course,
  enrolled,
  featured,
  compact,
}: {
  course: UpskillCourse;
  enrolled: boolean;
  featured?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      to="/dashboard/upskilling/$courseId"
      params={{ courseId: course.id }}
      className={cn(
        "group flex flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:border-primary/40 hover:shadow-elegant",
        featured && "ring-1 ring-primary/20",
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
          {course.category}
        </span>
        <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
          {course.difficulty}
        </span>
      </div>
      <h3 className="text-base font-semibold leading-snug group-hover:text-primary">{course.title}</h3>
      {!compact && course.description && (
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
      )}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {course.estimated_hours ?? "—"}h
        </span>
        <span className={cn("inline-flex items-center gap-1 font-medium", enrolled ? "text-primary" : "text-foreground")}>
          {enrolled ? "Continue" : "View"} <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
