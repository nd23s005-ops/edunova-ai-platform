import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  BookOpen,
  ChevronRight,
  Loader2,
  Search,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { normalizeRole, type AppRole } from "@/lib/auth/roles";
import {
  CATALOG_BY_ROLE,
  type CatalogCategory,
  type CatalogCourse,
  type CatalogScope,
} from "@/lib/courses/catalog";
import { ensureCatalogCourse } from "@/lib/courses/ensure.functions";

export const Route = createFileRoute("/_dashboard/dashboard/student/browse")({
  component: BrowseCoursesPage,
});

function BrowseCoursesPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const ensure = useServerFn(ensureCatalogCourse);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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
  const activeCat: CatalogCategory | null = useMemo(() => {
    if (!activeCategory) return categories[0] ?? null;
    return categories.find((c) => c.key === activeCategory) ?? categories[0] ?? null;
  }, [categories, activeCategory]);

  const filteredCourses = useMemo(() => {
    if (!activeCat) return [];
    const q = query.trim().toLowerCase();
    if (!q) return activeCat.courses;
    return activeCat.courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q),
    );
  }, [activeCat, query]);

  const enroll = useMutation({
    mutationFn: async (course: CatalogCourse) => {
      setPendingSlug(course.slug);
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const { courseId } = await ensure({ data: { slug: course.slug } });
      // Idempotent enrollment: ignore duplicate-key.
      const { error } = await supabase
        .from("course_enrollments")
        .insert({ user_id: u.user.id, course_id: courseId });
      if (error && !/duplicate|unique/i.test(error.message)) throw error;
      return courseId;
    },
    onSuccess: (courseId) => {
      toast.success("Enrolled — opening course");
      qc.invalidateQueries({ queryKey: ["me", "enrollments"] });
      qc.invalidateQueries({ queryKey: ["me", "enrollments", "slugs"] });
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

  const cat = activeCat!;

  return (
    <RoleGate allow={["student", "college_student", "professional"]}>
      <DashboardHeader
        title="Browse Courses"
        description={scope.description}
      />

      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-3 py-2 shadow-card">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${scope.title.toLowerCase()}…`}
          className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
        />
      </div>

      <section className="mb-8 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <div className="mb-4 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-tight">{scope.title}</h2>
            <p className="text-xs text-muted-foreground">Pick a category to see available courses.</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
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

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">{cat.description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledSlugs?.has(course.slug) ?? false;
            const isPending = pendingSlug === course.slug && (enroll.isPending || open.isPending);
            return (
              <div
                key={course.slug}
                className="group flex flex-col rounded-2xl border border-border/60 bg-background p-4 transition hover:border-primary/40 hover:shadow-card"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  {isEnrolled && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      Enrolled
                    </span>
                  )}
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
          {filteredCourses.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
              No courses match your search.
            </div>
          )}
        </div>
      </section>
    </RoleGate>
  );
}
