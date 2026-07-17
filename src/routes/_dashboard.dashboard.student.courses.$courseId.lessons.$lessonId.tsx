import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, CheckCircle2, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { EmptyContent, Markdown, Section } from "@/components/courses/CourseUI";

export const Route = createFileRoute(
  "/_dashboard/dashboard/student/courses/$courseId/lessons/$lessonId",
)({
  component: LessonPage,
});

type Illustration = { url?: string; caption?: string; alt?: string };
type Example = { title?: string; body?: string };
type Practice = { prompt?: string; answer?: string };

function LessonPage() {
  const { courseId, lessonId } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select(
          "id, chapter_id, order_index, title, theory, illustrations, examples, key_notes, practice_items, estimated_minutes",
        )
        .eq("id", lessonId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: siblings } = useQuery({
    queryKey: ["chapter", lesson?.chapter_id, "lessons-nav"],
    enabled: !!lesson?.chapter_id,
    queryFn: async () => {
      const { data } = await supabase
        .from("lessons")
        .select("id, order_index, title")
        .eq("chapter_id", lesson!.chapter_id)
        .order("order_index");
      return data ?? [];
    },
  });

  const { data: completed } = useQuery({
    queryKey: ["lesson", lessonId, "completed"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return false;
      const { data } = await supabase
        .from("lesson_progress")
        .select("id")
        .eq("user_id", u.user.id)
        .eq("lesson_id", lessonId)
        .maybeSingle();
      return !!data;
    },
  });

  const complete = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const { error } = await supabase
        .from("lesson_progress")
        .upsert(
          { user_id: u.user.id, lesson_id: lessonId, course_id: courseId },
          { onConflict: "user_id,lesson_id" },
        );
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Lesson marked complete");
      qc.invalidateQueries({ queryKey: ["lesson", lessonId, "completed"] });
      qc.invalidateQueries({ queryKey: ["course", courseId, "progress"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading || !lesson) {
    return (
      <RoleGate allow={["student"]}>
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </RoleGate>
    );
  }

  const illustrations = (Array.isArray(lesson.illustrations) ? lesson.illustrations : []) as Illustration[];
  const examples = (Array.isArray(lesson.examples) ? lesson.examples : []) as Example[];
  const practice = (Array.isArray(lesson.practice_items) ? lesson.practice_items : []) as Practice[];

  const idx = siblings?.findIndex((s) => s.id === lessonId) ?? -1;
  const prev = siblings && idx > 0 ? siblings[idx - 1] : undefined;
  const next = siblings && idx >= 0 ? siblings[idx + 1] : undefined;

  return (
    <RoleGate allow={["student"]}>
      <div className="mb-2 text-xs text-muted-foreground">
        <Link
          to="/dashboard/student/courses/$courseId/chapters/$chapterId"
          params={{ courseId, chapterId: lesson.chapter_id }}
          className="inline-flex items-center gap-1 hover:underline"
        >
          <ArrowLeft className="h-3 w-3" /> Back to chapter
        </Link>
      </div>
      <DashboardHeader
        title={lesson.title}
        description={lesson.estimated_minutes ? `~${lesson.estimated_minutes} min` : undefined}
        actions={
          <Button
            variant={completed ? "secondary" : "default"}
            disabled={complete.isPending || !!completed}
            onClick={() => complete.mutate()}
          >
            {complete.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {completed ? "Completed" : "Mark complete"}
          </Button>
        }
      />

      <div className="space-y-6">
        {lesson.theory ? (
          <Section title="Theory">
            <Markdown>{lesson.theory}</Markdown>
          </Section>
        ) : (
          <EmptyContent title="Theory coming soon" />
        )}

        {illustrations.length > 0 && (
          <Section title="Illustrations">
            <div className="grid gap-4 sm:grid-cols-2">
              {illustrations.map((im, i) => (
                <figure key={i} className="rounded-xl border border-border/60 p-2">
                  {im.url ? (
                    <img src={im.url} alt={im.alt ?? im.caption ?? ""} className="w-full rounded-lg" />
                  ) : (
                    <div className="grid aspect-video place-items-center bg-muted text-muted-foreground">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  )}
                  {im.caption && (
                    <figcaption className="mt-2 text-xs text-muted-foreground">{im.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </Section>
        )}

        {examples.length > 0 && (
          <Section title="Worked examples">
            <ol className="space-y-3">
              {examples.map((ex, i) => (
                <li key={i} className="rounded-lg border border-border/50 p-4">
                  <p className="text-sm font-medium">
                    Example {i + 1}
                    {ex.title ? `: ${ex.title}` : ""}
                  </p>
                  {ex.body && (
                    <div className="mt-2">
                      <Markdown>{ex.body}</Markdown>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </Section>
        )}

        {lesson.key_notes && (
          <Section title="Key notes">
            <Markdown>{lesson.key_notes}</Markdown>
          </Section>
        )}

        {practice.length > 0 && (
          <Section title="Practice">
            <ol className="ml-5 list-decimal space-y-2 text-sm">
              {practice.map((p, i) => (
                <li key={i}>
                  <p>{p.prompt}</p>
                  {p.answer && (
                    <details className="mt-1">
                      <summary className="cursor-pointer text-xs text-primary">Show answer</summary>
                      <p className="mt-1 text-xs text-muted-foreground">{p.answer}</p>
                    </details>
                  )}
                </li>
              ))}
            </ol>
          </Section>
        )}

        <div className="flex flex-wrap justify-between gap-2">
          {prev ? (
            <Button
              variant="outline"
              onClick={() =>
                navigate({
                  to: "/dashboard/student/courses/$courseId/lessons/$lessonId",
                  params: { courseId, lessonId: prev.id },
                })
              }
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> {prev.title}
            </Button>
          ) : (
            <span />
          )}
          {next ? (
            <Button
              onClick={() => {
                if (!completed) complete.mutate();
                navigate({
                  to: "/dashboard/student/courses/$courseId/lessons/$lessonId",
                  params: { courseId, lessonId: next.id },
                });
              }}
            >
              Next: {next.title} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (!completed) complete.mutate();
                navigate({
                  to: "/dashboard/student/courses/$courseId/chapters/$chapterId",
                  params: { courseId, chapterId: lesson.chapter_id },
                });
              }}
            >
              Back to chapter
            </Button>
          )}
        </div>
      </div>
    </RoleGate>
  );
}
