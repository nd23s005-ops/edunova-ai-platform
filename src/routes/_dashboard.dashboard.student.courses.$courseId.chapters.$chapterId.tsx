import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ClipboardList, Loader2, PlayCircle, Target } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { supabase } from "@/integrations/supabase/client";
import {
  Badge,
  EmptyContent,
  Markdown,
  Section,
} from "@/components/courses/CourseUI";
import { useChapterLessons, useCourseChapters, useCourseProgress } from "@/lib/courses/hooks";

export const Route = createFileRoute(
  "/_dashboard/dashboard/student/courses/$courseId/chapters/$chapterId",
)({
  component: ChapterPage,
});

function ChapterPage() {
  const { courseId, chapterId } = Route.useParams();

  const { data: chapters } = useCourseChapters(courseId);
  const chapter = chapters?.find((c) => c.id === chapterId);
  const idx = chapters?.findIndex((c) => c.id === chapterId) ?? -1;
  const nextChapter = chapters && idx >= 0 ? chapters[idx + 1] : undefined;

  const { data: lessons, isLoading } = useChapterLessons(chapterId);
  const { data: progress } = useCourseProgress(courseId);
  const completedSet = new Set(progress?.completedLessons ?? []);

  const { data: quiz } = useQuery({
    queryKey: ["chapter", chapterId, "quiz"],
    queryFn: async () => {
      const { data } = await supabase
        .from("quizzes")
        .select("id, title, time_limit_seconds, pass_score")
        .eq("chapter_id", chapterId)
        .maybeSingle();
      return data;
    },
  });

  const { data: assignment } = useQuery({
    queryKey: ["chapter", chapterId, "assignment"],
    queryFn: async () => {
      const { data } = await supabase
        .from("assignments")
        .select("id, title, instructions")
        .eq("chapter_id", chapterId)
        .maybeSingle();
      return data;
    },
  });

  if (isLoading || !chapter) {
    return (
      <RoleGate allow={["student"]}>
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </RoleGate>
    );
  }

  return (
    <RoleGate allow={["student"]}>
      <div className="mb-2 text-xs text-muted-foreground">
        <Link to="/dashboard/student/courses/$courseId" params={{ courseId }} className="hover:underline">
          Course
        </Link>
        <span className="mx-1">/</span>
        <span>Chapter {idx + 1}</span>
      </div>
      <DashboardHeader title={chapter.title} description={chapter.intro ?? undefined} />

      <div className="space-y-6">
        <Section title="Lessons" description={`${lessons?.length ?? 0} lessons in this chapter`}>
          {!lessons || lessons.length === 0 ? (
            <EmptyContent title="Lessons coming soon" />
          ) : (
            <ul className="space-y-2">
              {lessons.map((l, i) => {
                const done = completedSet.has(l.id);
                return (
                  <li key={l.id}>
                    <Link
                      to="/dashboard/student/courses/$courseId/lessons/$lessonId"
                      params={{ courseId, lessonId: l.id }}
                      className="flex items-center gap-3 rounded-xl border border-border/60 p-4 transition hover:bg-muted/40"
                    >
                      <PlayCircle className={done ? "h-5 w-5 text-emerald-500" : "h-5 w-5 text-primary"} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          Lesson {i + 1}: {l.title}
                        </p>
                        {l.estimated_minutes && (
                          <p className="text-xs text-muted-foreground">~{l.estimated_minutes} min</p>
                        )}
                      </div>
                      {done && <Badge tone="success">Done</Badge>}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Section>

        <div className="grid gap-4 sm:grid-cols-2">
          <Section
            title="Chapter quiz"
            description={quiz ? `Pass mark: ${quiz.pass_score}%` : "No quiz yet"}
          >
            {quiz ? (
              <Link
                to="/dashboard/student/courses/$courseId/quiz/$quizId"
                params={{ courseId, quizId: quiz.id }}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                <Target className="h-4 w-4" /> Start quiz
              </Link>
            ) : (
              <EmptyContent title="Quiz coming soon" />
            )}
          </Section>

          <Section title="Assignment">
            {assignment ? (
              <Link
                to="/dashboard/student/courses/$courseId/assignments/$assignmentId"
                params={{ courseId, assignmentId: assignment.id }}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                <ClipboardList className="h-4 w-4" /> Open assignment
              </Link>
            ) : (
              <EmptyContent title="Assignment coming soon" />
            )}
          </Section>
        </div>

        {chapter.summary && (
          <Section title="Chapter summary">
            <Markdown>{chapter.summary}</Markdown>
          </Section>
        )}

        {nextChapter && (
          <div className="flex justify-end">
            <Link
              to="/dashboard/student/courses/$courseId/chapters/$chapterId"
              params={{ courseId, chapterId: nextChapter.id }}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Next chapter: {nextChapter.title} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </RoleGate>
  );
}
