import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  Layers,
  Loader2,
  ScrollText,
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
  Markdown,
  ProgressRing,
  Section,
} from "@/components/courses/CourseUI";
import { useCourse, useCourseChapters, useCourseProgress } from "@/lib/courses/hooks";

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
  const completedCount = progress?.completedLessons.length ?? 0;
  const isEnrolled = !!enrollment;

  // Rough progress %: enrollment.progress if set, else lesson-based
  const percent = enrollment?.progress ?? 0;

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
              Continue learning
            </Button>
          ) : (
            <Button disabled={enroll.isPending} onClick={() => enroll.mutate()}>
              {enroll.isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
              Enroll
            </Button>
          )
        }
      />

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
              <Badge>{course.language}</Badge>
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
