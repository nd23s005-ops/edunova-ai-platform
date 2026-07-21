import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Check,
  CheckCircle2,
  FileText,
  Filter,
  Loader2,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { recommendNextResource } from "@/lib/courses/resource-recommend.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/_dashboard/dashboard/student/resources")({
  component: DashboardResourcesPage,
});

const KIND_LABEL: Record<string, string> = {
  notes: "Notes",
  pdf: "PDF",
  worksheet: "Worksheet",
  formula_sheet: "Formula Sheet",
  question_bank: "Practice Questions",
  pyq: "Interview Questions",
  mindmap: "Mind Map",
  cheatsheet: "Cheat Sheet",
};

type Row = {
  id: string;
  kind: string;
  title: string;
  description: string | null;
  url: string | null;
  order_index: number;
  course_id: string;
  course_title: string;
  course_slug: string | null;
};

function DashboardResourcesPage() {
  const qc = useQueryClient();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<string>("all");
  const [courseId, setCourseId] = useState<string>("all");
  const [savedOnly, setSavedOnly] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["me", "resources", "enrolled"],
    queryFn: async (): Promise<Row[]> => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [];
      const { data: enroll } = await supabase
        .from("course_enrollments")
        .select("course_id, courses:course_id (id, title, slug)")
        .eq("user_id", u.user.id);
      const courses = (enroll ?? [])
        .map((r) => (r as { courses: { id: string; title: string; slug: string | null } | null }).courses)
        .filter((c): c is { id: string; title: string; slug: string | null } => !!c);
      if (courses.length === 0) return [];
      const ids = courses.map((c) => c.id);
      const { data: res } = await supabase
        .from("resources")
        .select("id, kind, title, description, url, order_index, course_id")
        .in("course_id", ids)
        .order("order_index");
      const titleById = new Map(courses.map((c) => [c.id, c] as const));
      return (res ?? []).map((r) => {
        const c = titleById.get(r.course_id as string);
        return {
          id: r.id as string,
          kind: r.kind as string,
          title: r.title as string,
          description: (r.description as string | null) ?? null,
          url: (r.url as string | null) ?? null,
          order_index: (r.order_index as number) ?? 0,
          course_id: r.course_id as string,
          course_title: c?.title ?? "Course",
          course_slug: c?.slug ?? null,
        };
      });
    },
  });

  const rows = data ?? [];

  const { data: bookmarks } = useQuery({
    queryKey: ["me", "resource-bookmarks"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return new Set<string>();
      const { data } = await supabase
        .from("resource_bookmarks")
        .select("resource_id")
        .eq("user_id", u.user.id);
      return new Set((data ?? []).map((r) => r.resource_id as string));
    },
  });

  const { data: completed } = useQuery({
    queryKey: ["me", "resource-completions"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return new Set<string>();
      const { data } = await supabase
        .from("resource_completions")
        .select("resource_id")
        .eq("user_id", u.user.id);
      return new Set((data ?? []).map((r) => r.resource_id as string));
    },
  });

  const bookmarkSet = bookmarks ?? new Set<string>();
  const completedSet = completed ?? new Set<string>();

  const bookmarkMut = useMutation({
    mutationFn: async ({ resourceId, on }: { resourceId: string; on: boolean }) => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Sign in required");
      if (on) {
        const { error } = await supabase
          .from("resource_bookmarks")
          .insert({ user_id: u.user.id, resource_id: resourceId });
        if (error && !/duplicate|unique/i.test(error.message)) throw error;
      } else {
        const { error } = await supabase
          .from("resource_bookmarks")
          .delete()
          .eq("user_id", u.user.id)
          .eq("resource_id", resourceId);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me", "resource-bookmarks"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const completeMut = useMutation({
    mutationFn: async ({ resourceId, on }: { resourceId: string; on: boolean }) => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Sign in required");
      if (on) {
        const { error } = await supabase
          .from("resource_completions")
          .insert({ user_id: u.user.id, resource_id: resourceId });
        if (error && !/duplicate|unique/i.test(error.message)) throw error;
      } else {
        const { error } = await supabase
          .from("resource_completions")
          .delete()
          .eq("user_id", u.user.id)
          .eq("resource_id", resourceId);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me", "resource-completions"] });
      qc.invalidateQueries({ queryKey: ["me", "resource-recommendation"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const courseProgress = useMemo(() => {
    const totals = new Map<string, { title: string; total: number; done: number }>();
    for (const r of rows) {
      const cur = totals.get(r.course_id) ?? { title: r.course_title, total: 0, done: 0 };
      cur.total += 1;
      if (completedSet.has(r.id)) cur.done += 1;
      totals.set(r.course_id, cur);
    }
    return totals;
  }, [rows, completedSet]);

  const courseOptions = useMemo(
    () =>
      Array.from(courseProgress, ([id, v]) => ({ id, title: v.title })).sort((a, b) =>
        a.title.localeCompare(b.title),
      ),
    [courseProgress],
  );

  const kinds = useMemo(() => {
    const set = new Set<string>();
    for (const r of rows) set.add(r.kind);
    return Array.from(set).sort();
  }, [rows]);

  const q = query.trim().toLowerCase();
  const filtered = rows.filter((r) => {
    if (kind !== "all" && r.kind !== kind) return false;
    if (courseId !== "all" && r.course_id !== courseId) return false;
    if (savedOnly && !bookmarkSet.has(r.id)) return false;
    if (!q) return true;
    return (
      r.title.toLowerCase().includes(q) ||
      (r.description ?? "").toLowerCase().includes(q) ||
      r.course_title.toLowerCase().includes(q) ||
      (KIND_LABEL[r.kind] ?? r.kind).toLowerCase().includes(q)
    );
  });

  const recommendFn = useServerFn(recommendNextResource);
  const { data: recommendation, isFetching: recLoading } = useQuery({
    queryKey: ["me", "resource-recommendation"],
    queryFn: () => recommendFn(),
    enabled: rows.length > 0,
    staleTime: 60_000,
  });

  return (
    <RoleGate allow={["student", "college_student", "professional"]}>
      <DashboardHeader
        title="Resources"
        description="Notes, cheat sheets, mind maps, and practice sets from every course you've enrolled in."
      />

      {rows.length > 0 && (
        <RecommendationCard
          data={recommendation}
          loading={recLoading}
          onOpen={(id) => completeMut.mutate({ resourceId: id, on: false })}
          resources={rows}
        />
      )}

      {courseOptions.length > 0 && (
        <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {courseOptions.map((c) => {
            const p = courseProgress.get(c.id)!;
            const pct = p.total === 0 ? 0 : Math.round((p.done / p.total) * 100);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCourseId(courseId === c.id ? "all" : c.id)}
                className={cn(
                  "rounded-2xl border bg-card p-3 text-left transition hover:border-primary/40",
                  courseId === c.id ? "border-primary/60 shadow-card" : "border-border/60",
                )}
              >
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{p.title}</p>
                  <span className="text-xs font-medium text-muted-foreground">
                    {p.done}/{p.total}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">{pct}% complete</p>
              </button>
            );
          })}
        </div>
      )}

      <div className="mb-4 rounded-2xl border border-border/60 bg-card p-3 shadow-card">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-background px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across all your resources…"
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

          <button
            type="button"
            onClick={() => setSavedOnly((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition",
              savedOnly
                ? "border-primary/60 bg-primary/10 text-primary"
                : "border-border/60 bg-background text-muted-foreground hover:text-foreground",
            )}
          >
            <Bookmark className={cn("h-3.5 w-3.5", savedOnly && "fill-current")} />
            Saved only
          </button>

          <div className="flex items-center gap-1 rounded-xl border border-border/60 bg-background p-1">
            <Filter className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
            <FilterChip active={kind === "all"} onClick={() => setKind("all")}>
              All types
            </FilterChip>
            {kinds.map((k) => (
              <FilterChip key={k} active={kind === k} onClick={() => setKind(k)}>
                {KIND_LABEL[k] ?? k}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="mt-2 px-1 text-xs text-muted-foreground">
          {filtered.length} of {rows.length} resource{rows.length === 1 ? "" : "s"}
          {savedOnly && ` • ${bookmarkSet.size} saved`}
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
          Enroll in a course to unlock its notes, cheat sheets, and practice sets.{" "}
          <Link to="/dashboard/student/browse" className="font-medium text-primary hover:underline">
            Browse courses →
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
          No resources match your filters.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => {
            const isDone = completedSet.has(r.id);
            const isSaved = bookmarkSet.has(r.id);
            return (
              <div
                key={r.id}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-border/60 bg-card p-4 transition hover:border-primary/40 hover:shadow-card",
                  isDone && "bg-primary/5",
                )}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                    {isDone ? <CheckCircle2 className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
                      {KIND_LABEL[r.kind] ?? r.kind}
                    </span>
                    <button
                      type="button"
                      onClick={() => bookmarkMut.mutate({ resourceId: r.id, on: !isSaved })}
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-md transition",
                        isSaved ? "text-primary" : "text-muted-foreground hover:text-foreground",
                      )}
                      aria-label={isSaved ? "Remove bookmark" : "Save resource"}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="h-4 w-4 fill-current" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <a
                  href={r.url ?? "#"}
                  target={r.url ? "_blank" : undefined}
                  rel="noreferrer"
                  className={cn("flex-1", !r.url && "pointer-events-none opacity-70")}
                >
                  <h3 className="text-sm font-semibold leading-snug">{r.title}</h3>
                  {r.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.description}</p>
                  )}
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <BookOpen className="h-3 w-3" />
                    <span className="truncate">{r.course_title}</span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => completeMut.mutate({ resourceId: r.id, on: !isDone })}
                  className={cn(
                    "mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition",
                    isDone
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border/60 text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Check className="h-3.5 w-3.5" />
                  {isDone ? "Completed" : "Mark complete"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </RoleGate>
  );
}

function RecommendationCard({
  data,
  loading,
  resources,
}: {
  data: {
    resourceId: string | null;
    title: string;
    reason: string;
    kind: string | null;
    courseTitle: string | null;
  } | null | undefined;
  loading: boolean;
  onOpen: (id: string) => void;
  resources: Row[];
}) {
  if (loading && !data) {
    return (
      <div className="mb-4 flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Finding what to study next…</p>
      </div>
    );
  }
  if (!data || !data.resourceId) return null;
  const target = resources.find((r) => r.id === data.resourceId);
  return (
    <div className="mb-4 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Suggested next
        </p>
      </div>
      <h3 className="text-base font-semibold">{data.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {data.courseTitle && <span className="font-medium">{data.courseTitle} · </span>}
        {data.reason}
      </p>
      {target?.url && (
        <Button asChild size="sm" className="mt-3">
          <a href={target.url} target="_blank" rel="noreferrer">
            Open resource
          </a>
        </Button>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-2.5 py-1 text-xs font-medium transition",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
