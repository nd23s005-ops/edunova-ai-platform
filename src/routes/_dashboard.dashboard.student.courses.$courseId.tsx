import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  FileText,
  GraduationCap,
  Layers,
  Loader2,
  PartyPopper,
  ScrollText,
  Sparkles,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  BOARD_LABEL,
  DIFFICULTY_LABEL,
  Badge,
  EmptyContent,
  ProgressBar,
  ProgressRing,
  Section,
} from "@/components/courses/CourseUI";
import {
  useCourse,
  useCourseChapters,
  useCourseProgress,
  useCourseQuizAssignments,
  useCourseTotalLessons,
  useNextCourseRecommendation,
} from "@/lib/courses/hooks";


export const Route = createFileRoute(
  "/_dashboard/dashboard/student/courses/$courseId",
)({
  component: CourseOverviewPage,
});

function CourseOverviewPage() {
  const { courseId } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: course, isLoading } = useCourse(courseId);
  const { data: chapters } = useCourseChapters(courseId);
  const { data: progress } = useCourseProgress(courseId);
  const { data: totalLessons } = useCourseTotalLessons(courseId);
  const { data: qa } = useCourseQuizAssignments(courseId);
  const { data: nextCourse } = useNextCourseRecommendation(courseId);

  const { data: enrollment } = useQuery({
    queryKey: ["me", "enrollment", courseId],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("course_enrollments")
        .select("id, progress")
        .eq("user_id", u.user.id)
        .eq("course_id", courseId)
        .maybeSingle();
      return data;
    },
  });

  const { data: resources } = useQuery({
    queryKey: ["course", courseId, "resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("id, kind, title, description, url, order_index")
        .eq("course_id", courseId)
        .order("order_index");
      if (error) throw error;
      return data ?? [];
    },
  });

  const enroll = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const { error } = await supabase
        .from("course_enrollments")
        .insert({ user_id: u.user.id, course_id: courseId });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Enrolled");
      qc.invalidateQueries({ queryKey: ["me", "enrollment", courseId] });
      qc.invalidateQueries({ queryKey: ["me", "enrollments"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const completedCount = progress?.completedLessons.length ?? 0;
  const total = totalLessons ?? 0;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const isEnrolled = !!enrollment;
  const isCompleted = total > 0 && completedCount >= total;

  // Sync computed progress back to enrollment row so tiles elsewhere stay in sync.
  useEffect(() => {
    if (!enrollment || total === 0) return;
    if ((enrollment.progress ?? 0) === percent) return;
    supabase
      .from("course_enrollments")
      .update({ progress: percent })
      .eq("id", enrollment.id)
      .then(() => {
        qc.invalidateQueries({ queryKey: ["me", "enrollments"] });
        qc.invalidateQueries({ queryKey: ["me", "enrollment", courseId] });
      });
  }, [percent, total, enrollment, courseId, qc]);

  if (isLoading) {
    return (
      <RoleGate allow={["student"]}>
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </RoleGate>
    );
  }

  if (!course) {
    return (
      <RoleGate allow={["student"]}>
        <EmptyContent title="Course not found" hint="It may have been unpublished." />
      </RoleGate>
    );
  }

  const objectives = Array.isArray(course.learning_objectives)
    ? (course.learning_objectives as string[])
    : [];
  const weekly = Array.isArray(course.weekly_plan)
    ? (course.weekly_plan as Array<{ week?: number; title?: string; focus?: string }>)
    : [];

  const completedQuizIds = new Set((progress?.quizAttempts ?? []).map((a) => a.quiz_id));
  const submittedAssignmentIds = new Set(
    (progress?.assignments ?? []).filter((a) => a.status === "submitted" || a.status === "graded").map((a) => a.assignment_id),
  );
  const chapterById = new Map((qa?.chapters ?? []).map((c) => [c.id, c] as const));
  const upcomingQuizzes = (qa?.quizzes ?? []).filter((q) => !completedQuizIds.has(q.id));
  const upcomingAssignments = (qa?.assignments ?? []).filter((a) => !submittedAssignmentIds.has(a.id));


  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title={course.title}
        description={`${course.subject} · ${BOARD_LABEL[course.board] ?? course.board} · Class ${
          course.class_min === course.class_max ? course.class_min : `${course.class_min}–${course.class_max}`
        }`}
        actions={
          isEnrolled ? (
            <Button
              variant={isCompleted ? "secondary" : "default"}
              onClick={() => {
                const firstChapter = chapters?.[0];
                if (firstChapter) {
                  navigate({
                    to: "/dashboard/student/courses/$courseId/chapters/$chapterId",
                    params: { courseId, chapterId: firstChapter.id },
                  });
                } else {
                  toast("Chapters coming soon");
                }
              }}
            >
              {isCompleted ? "Review course" : "Continue learning"}
            </Button>
          ) : (
            <Button disabled={enroll.isPending} onClick={() => enroll.mutate()}>
              {enroll.isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
              Enroll
            </Button>
          )
        }
      />

      {isEnrolled && (
        <div className="mb-6 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Course progress
              </p>
              <p className="mt-1 text-sm font-medium">
                {completedCount} of {total || "—"} lessons completed
              </p>
            </div>
            <p className="font-display text-2xl font-bold text-primary">{percent}%</p>
          </div>
          <div className="mt-3">
            <ProgressBar value={percent} />
          </div>
          {isCompleted && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" /> Course completed
            </p>
          )}
        </div>
      )}

      {isEnrolled && isCompleted && (
        <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/5 p-6 shadow-card">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
              <PartyPopper className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-display text-lg font-bold">You finished this course</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Nice work. Here is what to do next to keep the momentum going.
              </p>
            </div>
          </div>

          {nextCourse ? (
            <div className="mt-5 rounded-xl border border-border/60 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="mr-1 inline h-3 w-3" /> Recommended next course
              </p>
              <p className="mt-1 text-sm font-semibold">{nextCourse.title}</p>
              <p className="text-xs text-muted-foreground">
                {nextCourse.subject} · {DIFFICULTY_LABEL[nextCourse.difficulty] ?? nextCourse.difficulty}
                {nextCourse.estimated_hours ? ` · ~${nextCourse.estimated_hours}h` : ""}
              </p>
              {nextCourse.description && (
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{nextCourse.description}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    navigate({
                      to: "/dashboard/student/courses/$courseId",
                      params: { courseId: nextCourse.id },
                    })
                  }
                >
                  Continue learning
                </Button>
                <Link to="/dashboard/student/browse">
                  <Button size="sm" variant="outline">
                    Browse more
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
              No further courses queued for your board and class yet.{" "}
              <Link to="/dashboard/student/browse" className="font-medium text-primary hover:underline">
                Browse catalog →
              </Link>
            </div>
          )}

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <NextStepList
              icon={<ClipboardList className="h-4 w-4" />}
              title="Upcoming quizzes"
              empty="All quizzes done"
              items={upcomingQuizzes.slice(0, 4).map((q) => ({
                key: q.id,
                label: q.title,
                sub: chapterById.get(q.chapter_id)?.title,
              }))}
            />
            <NextStepList
              icon={<ScrollText className="h-4 w-4" />}
              title="Upcoming assignments"
              empty="All assignments submitted"
              items={upcomingAssignments.slice(0, 4).map((a) => ({
                key: a.id,
                label: a.title,
                sub: chapterById.get(a.chapter_id)?.title,
              }))}
            />
            <NextStepList
              icon={<FileText className="h-4 w-4" />}
              title="Recommended resources"
              empty="No resources yet"
              items={(resources ?? []).slice(0, 4).map((r) => ({
                key: r.id,
                label: r.title,
                sub: r.kind.replace("_", " "),
              }))}
            />
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Section title="Overview">
            <div className="flex flex-wrap gap-2">
              <Badge tone="primary">{DIFFICULTY_LABEL[course.difficulty] ?? course.difficulty}</Badge>
              {course.estimated_hours && (
                <Badge>
                  <Clock className="mr-1 h-3 w-3" />
                  ~{course.estimated_hours}h
                </Badge>
              )}
              
            </div>
            {course.description && (
              <p className="mt-4 text-sm text-muted-foreground">{course.description}</p>
            )}
            {objectives.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4" /> Learning objectives
                </p>
                <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                  {objectives.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>
            )}
          </Section>

          {weekly.length > 0 && (
            <Section title="Weekly plan">
              <ul className="space-y-2">
                {weekly.map((w, i) => (
                  <li key={i} className="flex gap-3 rounded-lg border border-border/50 p-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      W{w.week ?? i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{w.title ?? `Week ${i + 1}`}</p>
                      {w.focus && <p className="text-xs text-muted-foreground">{w.focus}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section title="Chapters" description={`${chapters?.length ?? 0} chapters`}>
            {!chapters || chapters.length === 0 ? (
              <EmptyContent
                title="Syllabus coming soon"
                hint="Chapters for this course will appear here once the syllabus is published."
              />
            ) : (
              <ul className="space-y-2">
                {chapters.map((c, i) => (
                  <li key={c.id}>
                    <Link
                      to="/dashboard/student/courses/$courseId/chapters/$chapterId"
                      params={{ courseId, chapterId: c.id }}
                      className="flex items-center gap-3 rounded-xl border border-border/60 p-4 transition hover:bg-muted/40"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{c.title}</p>
                        {c.intro && (
                          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{c.intro}</p>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>

        <div className="space-y-6">
          <Section title="Your progress">
            <div className="flex items-center gap-4">
              <ProgressRing value={percent} />
              <div className="text-sm">
                <p className="font-medium">{completedCount} lessons completed</p>
                <p className="text-xs text-muted-foreground">
                  {progress?.quizAttempts.length ?? 0} quiz attempts ·{" "}
                  {progress?.assignments.length ?? 0} assignments
                </p>
              </div>
            </div>
          </Section>

          <Section title="Resources" description="Notes, worksheets, and more">
            {!resources || resources.length === 0 ? (
              <EmptyContent title="No resources yet" />
            ) : (
              <ul className="space-y-2">
                {resources.map((r) => (
                  <li key={r.id}>
                    <a
                      href={r.url ?? "#"}
                      target={r.url ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex items-start gap-3 rounded-lg border border-border/50 p-3 hover:bg-muted/40"
                    >
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.kind.replace("_", " ")}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section title="AI Learning Assistant">
            <p className="text-sm text-muted-foreground">
              Nova knows your class, board, and current lesson. Ask for explanations, examples, or
              practice questions from the floating chat.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <Badge tone="primary"><GraduationCap className="mr-1 h-3 w-3" />Explain</Badge>
              <Badge tone="primary"><Layers className="mr-1 h-3 w-3" />Summarize</Badge>
              <Badge tone="primary"><BookOpen className="mr-1 h-3 w-3" />Practice</Badge>
              <Badge tone="primary"><ScrollText className="mr-1 h-3 w-3" />Revision</Badge>
            </div>
          </Section>
        </div>
      </div>
    </RoleGate>
  );
}
