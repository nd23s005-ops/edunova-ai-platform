import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { BookOpen, FileText, Filter, Loader2, Search, X } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

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
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<string>("all");
  const [courseId, setCourseId] = useState<string>("all");

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
  const courseOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const r of rows) map.set(r.course_id, r.course_title);
    return Array.from(map, ([id, title]) => ({ id, title })).sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }, [rows]);

  const kinds = useMemo(() => {
    const set = new Set<string>();
    for (const r of rows) set.add(r.kind);
    return Array.from(set).sort();
  }, [rows]);

  const q = query.trim().toLowerCase();
  const filtered = rows.filter((r) => {
    if (kind !== "all" && r.kind !== kind) return false;
    if (courseId !== "all" && r.course_id !== courseId) return false;
    if (!q) return true;
    return (
      r.title.toLowerCase().includes(q) ||
      (r.description ?? "").toLowerCase().includes(q) ||
      r.course_title.toLowerCase().includes(q) ||
      (KIND_LABEL[r.kind] ?? r.kind).toLowerCase().includes(q)
    );
  });

  return (
    <RoleGate allow={["student", "college_student", "professional"]}>
      <DashboardHeader
        title="Resources"
        description="Notes, cheat sheets, mind maps, and practice sets from every course you've enrolled in."
      />

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

        {courseOptions.length > 1 && (
          <div className="mt-2 flex flex-wrap items-center gap-1 rounded-xl px-1">
            <FilterChip active={courseId === "all"} onClick={() => setCourseId("all")}>
              All courses
            </FilterChip>
            {courseOptions.map((c) => (
              <FilterChip
                key={c.id}
                active={courseId === c.id}
                onClick={() => setCourseId(c.id)}
              >
                {c.title}
              </FilterChip>
            ))}
          </div>
        )}

        <div className="mt-2 px-1 text-xs text-muted-foreground">
          {filtered.length} of {rows.length} resource{rows.length === 1 ? "" : "s"}
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
          {filtered.map((r) => (
            <a
              key={r.id}
              href={r.url ?? "#"}
              target={r.url ? "_blank" : undefined}
              rel="noreferrer"
              className={cn(
                "group flex flex-col rounded-2xl border border-border/60 bg-card p-4 transition hover:border-primary/40 hover:shadow-card",
                !r.url && "pointer-events-none opacity-70",
              )}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
                  {KIND_LABEL[r.kind] ?? r.kind}
                </span>
              </div>
              <h3 className="text-sm font-semibold leading-snug">{r.title}</h3>
              {r.description && (
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.description}</p>
              )}
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <BookOpen className="h-3 w-3" />
                <span className="truncate">{r.course_title}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </RoleGate>
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
