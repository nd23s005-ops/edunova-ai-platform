import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookOpen, Loader2, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_dashboard/dashboard/student/browse")({
  component: BrowseCoursesPage,
});

const BOARD_LABEL: Record<string, string> = {
  state_board: "State Board",
  cbse: "CBSE",
  icse: "ICSE",
  cambridge: "Cambridge",
  ib: "IB",
  nios: "NIOS",
  other: "Other",
};

type Course = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  board: string;
  class_min: number;
  class_max: number;
  language: string;
  cover_url: string | null;
  difficulty: string | null;
  estimated_hours: number | null;
};

function BrowseCoursesPage() {
  const qc = useQueryClient();
  const [query, setQuery] = useState("");

  const { data: profile } = useQuery({
    queryKey: ["me", "student_profile"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("student_profiles")
        .select("current_class, board, language")
        .eq("user_id", u.user.id)
        .maybeSingle();
      return data;
    },
    staleTime: 60_000,
  });

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses", "for-profile", profile?.board, profile?.current_class],
    enabled: !!profile,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, description, subject, board, class_min, class_max, language, cover_url, difficulty, estimated_hours")
        .eq("board", profile!.board)
        .lte("class_min", profile!.current_class)
        .gte("class_max", profile!.current_class)
        .eq("is_published", true)
        .order("subject");
      if (error) throw error;
      return (data ?? []) as Course[];
    },
  });

  const { data: enrolledIds } = useQuery({
    queryKey: ["me", "enrollments", "ids"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return new Set<string>();
      const { data } = await supabase
        .from("course_enrollments")
        .select("course_id")
        .eq("user_id", u.user.id);
      return new Set((data ?? []).map((r) => r.course_id));
    },
    staleTime: 30_000,
  });

  const enroll = useMutation({
    mutationFn: async (courseId: string) => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const { error } = await supabase
        .from("course_enrollments")
        .insert({ user_id: u.user.id, course_id: courseId });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Enrolled");
      qc.invalidateQueries({ queryKey: ["me", "enrollments"] });
      qc.invalidateQueries({ queryKey: ["me", "enrollments", "ids"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = useMemo(() => {
    if (!courses) return [];
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        (c.description ?? "").toLowerCase().includes(q),
    );
  }, [courses, query]);

  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title="Browse Courses"
        description={
          profile
            ? `Showing courses for ${BOARD_LABEL[profile.board] ?? profile.board} · Class ${profile.current_class}`
            : "Loading your profile…"
        }
      />

      <div className="mb-6 flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 shadow-card">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, subject, or description"
          className="border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>

      {isLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState board={profile?.board} classNum={profile?.current_class} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const enrolled = enrolledIds?.has(c.id);
            return (
              <div key={c.id} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.subject} · Class {c.class_min === c.class_max ? c.class_min : `${c.class_min}–${c.class_max}`}
                </p>
                <h3 className="mt-1 text-base font-semibold">{c.title}</h3>
                {c.description && (
                  <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{c.description}</p>
                )}
                <div className="mt-4">
                  {enrolled ? (
                    <Link
                      to="/dashboard/student/my-courses"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View in My Courses →
                    </Link>
                  ) : (
                    <Button
                      size="sm"
                      disabled={enroll.isPending}
                      onClick={() => enroll.mutate(c.id)}
                    >
                      {enroll.isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
                      Enroll
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </RoleGate>
  );
}

function EmptyState({ board, classNum }: { board?: string; classNum?: number }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
      <Sparkles className="mx-auto h-6 w-6 text-muted-foreground" />
      <p className="mt-3 text-sm font-semibold">No courses match your profile yet</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
        {board && classNum
          ? `We're adding courses for ${BOARD_LABEL[board] ?? board} · Class ${classNum}. Check back soon.`
          : "Complete your student profile to see personalized courses."}
      </p>
    </div>
  );
}
