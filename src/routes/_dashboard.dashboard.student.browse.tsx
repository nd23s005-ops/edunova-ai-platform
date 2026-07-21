import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  BookOpen,
  ChevronRight,
  Filter,
  GraduationCap,
  Loader2,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { normalizeRole } from "@/lib/auth/roles";
import {
  CATALOG_BY_ROLE,
  type CatalogCategory,
  type CatalogCourse,
  type CatalogScope,
} from "@/lib/courses/catalog";
import { ensureCatalogCourse, seedCourseSkeleton } from "@/lib/courses/ensure.functions";

export const Route = createFileRoute("/_dashboard/dashboard/student/browse")({
  component: BrowseCoursesPage,
});

type Difficulty = "all" | "beginner" | "intermediate" | "advanced";
type SortMode = "curated" | "az" | "za";

function BrowseCoursesPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const ensure = useServerFn(ensureCatalogCourse);
  const seedFn = useServerFn(seedCourseSkeleton);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [sortMode, setSortMode] = useState<SortMode>("curated");
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["me", "role"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.user.id)
        .maybeSingle();
      return normalizeRole((data?.role as string | undefined) ?? null);
    },
    staleTime: 60_000,
  });

  const { data: enrolledSlugs } = useQuery({
    queryKey: ["me", "enrollments", "slugs"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return new Set<string>();
      const { data } = await supabase
        .from("course_enrollments")
        .select("courses:course_id (slug)")
        .eq("user_id", u.user.id);
      const set = new Set<string>();
      for (const row of (data ?? []) as Array<{ courses: { slug: string | null } | null }>) {
        if (row.courses?.slug) set.add(row.courses.slug);
      }
      return set;
    },
    staleTime: 15_000,
  });

  const scope: CatalogScope | null = useMemo(() => {
    if (!role) return null;
    if (role === "student") return CATALOG_BY_ROLE.student;
    if (role === "college_student") return CATALOG_BY_ROLE.college_student;
    if (role === "professional") return CATALOG_BY_ROLE.professional;
    return null;
  }, [role]);

  const categories: CatalogCategory[] = scope?.categories ?? [];
  const q = query.trim().toLowerCase();
  const globalSearch = q.length >= 2;

  // Build the working set: either all categories (global search) or the active one.
  const workingCategories: CatalogCategory[] = useMemo(() => {
    if (globalSearch) return categories;
    if (!activeCategory) return categories[0] ? [categories[0]] : [];
    const hit = categories.find((c) => c.key === activeCategory);
    return hit ? [hit] : categories[0] ? [categories[0]] : [];
  }, [categories, activeCategory, globalSearch]);

  function matches(c: CatalogCourse): boolean {
    if (difficulty !== "all" && c.difficulty !== difficulty) return false;
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.subject.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }

  function sortCourses(list: CatalogCourse[]): CatalogCourse[] {
    if (sortMode === "curated") return list;
    const sorted = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return sortMode === "za" ? sorted.reverse() : sorted;
  }

  const filteredSections = useMemo(() => {
    return workingCategories
      .map((cat) => ({ cat, courses: sortCourses(cat.courses.filter(matches)) }))
      .filter((s) => s.courses.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingCategories, q, difficulty, sortMode]);

  const totalMatches = filteredSections.reduce((n, s) => n + s.courses.length, 0);
  const activeFilterCount = (difficulty !== "all" ? 1 : 0) + (sortMode !== "curated" ? 1 : 0);

  const enroll = useMutation({
    mutationFn: async (course: CatalogCourse) => {
      setPendingSlug(course.slug);
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const { courseId } = await ensure({ data: { slug: course.slug } });
      const { error } = await supabase
        .from("course_enrollments")
        .insert({ user_id: u.user.id, course_id: courseId });
      if (error && !/duplicate|unique/i.test(error.message)) throw error;
      // Materialize chapters + mapped library resources so My Courses and
      // the Resources page reflect the enrollment immediately. Idempotent.
      try {
        await seedFn({ data: { courseId } });
      } catch {
        // Non-fatal — the course page retries on open.
      }
      return courseId;
    },
    onSuccess: (courseId) => {
      toast.success("Enrolled — opening course");
      qc.invalidateQueries({ queryKey: ["me", "enrollments"] });
      qc.invalidateQueries({ queryKey: ["me", "enrollments", "slugs"] });
      qc.invalidateQueries({ queryKey: ["me", "resources", "enrolled"] });
      navigate({ to: "/dashboard/student/courses/$courseId", params: { courseId } });
    },
    onError: (e: Error) => toast.error(e.message),
    onSettled: () => setPendingSlug(null),
  });

  const open = useMutation({
    mutationFn: async (course: CatalogCourse) => {
      setPendingSlug(course.slug);
      const { courseId } = await ensure({ data: { slug: course.slug } });
      return courseId;
    },
    onSuccess: (courseId) => {
      navigate({ to: "/dashboard/student/courses/$courseId", params: { courseId } });
    },
    onError: (e: Error) => toast.error(e.message),
    onSettled: () => setPendingSlug(null),
  });

  if (roleLoading || !scope) {
    return (
      <RoleGate allow={["student", "college_student", "professional"]}>
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </RoleGate>
    );
  }

  return (
    <RoleGate allow={["student", "college_student", "professional"]}>
      <DashboardHeader title="Browse Courses" description={scope.description} />

      {/* Search + filters */}
      <div className="mb-4 rounded-2xl border border-border/60 bg-card p-3 shadow-card">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-background px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search across all ${scope.title.toLowerCase()}…`}
              className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-muted"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-1 rounded-xl border border-border/60 bg-background p-1">
            <Filter className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
            {(["all", "beginner", "intermediate", "advanced"] as Difficulty[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition",
                  difficulty === d
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1 rounded-xl border border-border/60 bg-background p-1">
            {(
              [
                { key: "curated", label: "Curated" },
                { key: "az", label: "A–Z" },
                { key: "za", label: "Z–A" },
              ] as { key: SortMode; label: string }[]
            ).map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSortMode(s.key)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-medium transition",
                  sortMode === s.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
          <span>
            {globalSearch
              ? `${totalMatches} match${totalMatches === 1 ? "" : "es"} across all categories`
              : `${totalMatches} course${totalMatches === 1 ? "" : "s"} in this category`}
          </span>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setDifficulty("all");
                setSortMode("curated");
              }}
              className="font-medium text-primary hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Category chips (hidden while searching globally) */}
      {!globalSearch && (
        <div className="mb-6 rounded-2xl border border-border/60 bg-card p-4 shadow-card">
          <div className="mb-3 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-tight">{scope.title}</h2>
              <p className="text-xs text-muted-foreground">
                Pick a category — or start typing to search everything.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setActiveCategory(c.key)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                  (activeCategory ?? categories[0]?.key) === c.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/60 bg-background hover:border-primary/40",
                )}
              >
                <span className="mr-1">{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {filteredSections.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
          No courses match your search{difficulty !== "all" ? ` at ${difficulty} level` : ""}.
        </div>
      ) : (
        filteredSections.map((section) => (
          <section
            key={section.cat.key}
            className="mb-6 rounded-2xl border border-border/60 bg-card p-5 shadow-card"
          >
            <div className="mb-4 flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold">
                  <span className="mr-1">{section.cat.emoji}</span>
                  {section.cat.label}
                </h3>
                <p className="text-xs text-muted-foreground">{section.cat.description}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {section.courses.length} course{section.courses.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.courses.map((course) => {
                const isEnrolled = enrolledSlugs?.has(course.slug) ?? false;
                const isPending =
                  pendingSlug === course.slug && (enroll.isPending || open.isPending);
                return (
                  <div
                    key={course.slug}
                    className="group flex flex-col rounded-2xl border border-border/60 bg-background p-4 transition hover:border-primary/40 hover:shadow-card"
                  >
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {isEnrolled && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                            Enrolled
                          </span>
                        )}
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
                          {course.difficulty}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {course.subject}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug">{course.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-xs text-muted-foreground">
                      {course.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Sparkles className="h-3 w-3" /> AI-generated
                      </span>
                      {isEnrolled ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled={isPending}
                          onClick={() => open.mutate(course)}
                        >
                          {isPending ? (
                            <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                          ) : (
                            <ChevronRight className="mr-1 h-3.5 w-3.5" />
                          )}
                          Open
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled={isPending}
                          onClick={() => enroll.mutate(course)}
                        >
                          {isPending && <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />}
                          Enroll
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}
    </RoleGate>
  );
}
