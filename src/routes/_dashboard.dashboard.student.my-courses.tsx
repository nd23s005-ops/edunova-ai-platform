import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookOpen, Compass, Loader2, PlayCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_dashboard/dashboard/student/my-courses")({
  component: MyCoursesPage,
});

type EnrolledRow = {
  id: string;
  progress: number;
  updated_at: string | null;
  course_id: string;
  courses: {
    id: string;
    title: string;
    description: string | null;
    subject: string;
  } | null;
};

type ResumeTarget = { lessonId: string; lessonTitle: string; percent: number | null };

function MyCoursesPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { data: enrollments, isLoading } = useQuery({
    queryKey: ["me", "enrollments", "with-course"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [];
      const { data, error } = await supabase
        .from("course_enrollments")
        .select(
          "id, progress, updated_at, course_id, courses:course_id (id, title, description, subject)",
        )
        .eq("user_id", u.user.id)
        .order("enrolled_at", { ascending: false });
      if (error) throw error;
      return ((data ?? []) as unknown as EnrolledRow[]).filter((r) => r.courses);
    },
  });

  // Per-course resume target: last opened lesson via lesson_reading_position;
  // falls back to the first lesson of the first chapter for fresh enrollments.
  const { data: resumeMap } = useQuery({
    queryKey: ["me", "resume-map"],
    enabled: !!enrollments && enrollments.length > 0,
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user || !enrollments) return new Map<string, ResumeTarget>();
      const courseIds = enrollments.map((e) => e.course_id);
      const map = new Map<string, ResumeTarget>();

      // 1) Preferred: last opened lesson.
      const { data: positions } = await supabase
        .from("lesson_reading_position")
        .select("course_id, lesson_id, scroll_percent, updated_at, lessons:lesson_id (title)")
        .eq("user_id", u.user.id)
        .in("course_id", courseIds)
        .order("updated_at", { ascending: false });
      type PosRow = {
        course_id: string | null;
        lesson_id: string | null;
        scroll_percent: number | null;
        lessons: { title: string | null } | null;
      };
      for (const row of (positions ?? []) as unknown as PosRow[]) {
        if (!row.course_id || !row.lesson_id || !row.lessons?.title) continue;
        if (map.has(row.course_id)) continue;
        map.set(row.course_id, {
          lessonId: row.lesson_id,
          lessonTitle: row.lessons.title,
          percent: row.scroll_percent,
        });
      }

      // 2) Fallback: first lesson of first chapter for courses without a position.
      const missing = courseIds.filter((id) => !map.has(id));
      if (missing.length > 0) {
        const { data: chapters } = await supabase
          .from("chapters")
          .select("id, course_id, order_index, lessons:lessons (id, title, order_index)")
          .in("course_id", missing)
          .order("order_index");
        type ChRow = {
          id: string;
          course_id: string;
          order_index: number;
          lessons: { id: string; title: string; order_index: number }[] | null;
        };
        const byCourse = new Map<string, ChRow[]>();
        for (const c of (chapters ?? []) as unknown as ChRow[]) {
          if (!byCourse.has(c.course_id)) byCourse.set(c.course_id, []);
          byCourse.get(c.course_id)!.push(c);
        }
        for (const [cid, chs] of byCourse.entries()) {
          const firstCh = chs.sort((a, b) => a.order_index - b.order_index)[0];
          const firstLesson = (firstCh?.lessons ?? [])
            .slice()
            .sort((a, b) => a.order_index - b.order_index)[0];
          if (firstLesson) {
            map.set(cid, {
              lessonId: firstLesson.id,
              lessonTitle: firstLesson.title,
              percent: 0,
            });
          }
        }
      }
      return map;
    },
    staleTime: 15_000,
  });

  const unenroll = useMutation({
    mutationFn: async (enrollmentId: string) => {
      const { error } = await supabase
        .from("course_enrollments")
        .delete()
        .eq("id", enrollmentId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Removed from My Courses");
      qc.invalidateQueries({ queryKey: ["me", "enrollments"] });
      qc.invalidateQueries({ queryKey: ["me", "enrollments", "with-course"] });
      qc.invalidateQueries({ queryKey: ["me", "enrollments", "slugs"] });
      qc.invalidateQueries({ queryKey: ["me", "resume-map"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function continueLearning(courseId: string) {
    const target = resumeMap?.get(courseId);
    if (target?.lessonId) {
      navigate({
        to: "/dashboard/student/courses/$courseId/lessons/$lessonId",
        params: { courseId, lessonId: target.lessonId },
      });
    } else {
      // No content yet — open the course overview, which auto-seeds the AI skeleton.
      navigate({ to: "/dashboard/student/courses/$courseId", params: { courseId } });
    }
  }

  return (
    <RoleGate allow={["student", "college_student", "professional"]}>
      <DashboardHeader
        title="My Courses"
        description="Everything you've enrolled in"
        actions={
          <Link to="/dashboard/student/browse">
            <Button variant="outline">Browse courses</Button>
          </Link>
        }
      />

      {isLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : !enrollments || enrollments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <Compass className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-semibold">No courses yet</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Browse the catalog to enroll in your first course. Content is generated by AI on demand.
          </p>
          <Link to="/dashboard/student/browse">
            <Button className="mt-5">Browse courses</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((row) => {
            const c = row.courses!;
            const percent = Math.max(0, Math.min(100, row.progress ?? 0));
            const completed = percent >= 100;
            const resume = resumeMap?.get(row.course_id);
            return (
              <div key={row.id} className="flex flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  {completed && (
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Completed
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.subject}
                </p>
                <h3 className="mt-1 text-base font-semibold leading-snug">{c.title}</h3>
                {resume?.lessonTitle && (
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                    Up next: <span className="text-foreground">{resume.lessonTitle}</span>
                  </p>
                )}
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    variant={completed ? "secondary" : "default"}
                    onClick={() => continueLearning(row.course_id)}
                  >
                    <PlayCircle className="mr-1.5 h-3.5 w-3.5" />
                    {completed ? "Review" : resume ? "Continue" : "Start"}
                  </Button>
                  <button
                    onClick={() => unenroll.mutate(row.id)}
                    disabled={unenroll.isPending}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </RoleGate>
  );
}
