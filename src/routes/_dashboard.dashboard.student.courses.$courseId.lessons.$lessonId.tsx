import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { EmptyContent, Markdown, Section } from "@/components/courses/CourseUI";
import { LessonEnhancerPanel } from "@/components/learning/LessonEnhancerPanel";
import { getReadingPosition, saveReadingPosition } from "@/lib/ai/engine/reading-position.functions";
import { LessonExportDialog } from "@/components/learning/LessonExportDialog";

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

  // Full course lesson sequence for linear prev/next across chapters.
  const { data: sequence } = useQuery({
    queryKey: ["course", courseId, "lesson-sequence"],
    queryFn: async () => {
      const { data } = await supabase
        .from("chapters")
        .select("id, order_index, lessons:lessons (id, title, order_index)")
        .eq("course_id", courseId)
        .order("order_index");
      type Ch = {
        id: string;
        order_index: number;
        lessons: { id: string; title: string; order_index: number }[] | null;
      };
      const chs = ((data ?? []) as unknown as Ch[]).sort((a, b) => a.order_index - b.order_index);
      const flat: { id: string; title: string; chapterId: string }[] = [];
      for (const ch of chs) {
        const ls = (ch.lessons ?? []).slice().sort((a, b) => a.order_index - b.order_index);
        for (const l of ls) flat.push({ id: l.id, title: l.title, chapterId: ch.id });
      }
      return flat;
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

      // Recompute course progress and reflect it on the enrollment row so
      // My Courses / dashboards update automatically.
      const { data: chapters } = await supabase
        .from("chapters")
        .select("id, lessons:lessons (id)")
        .eq("course_id", courseId);
      type ChL = { id: string; lessons: { id: string }[] | null };
      const allLessonIds = ((chapters ?? []) as unknown as ChL[])
        .flatMap((c) => (c.lessons ?? []).map((l) => l.id));
      const total = allLessonIds.length;
      let percent = 0;
      if (total > 0) {
        const { data: done } = await supabase
          .from("lesson_progress")
          .select("lesson_id")
          .eq("user_id", u.user.id)
          .in("lesson_id", allLessonIds);
        const doneCount = (done ?? []).length;
        percent = Math.max(0, Math.min(100, Math.round((doneCount / total) * 100)));
      }
      await supabase
        .from("course_enrollments")
        .update({ progress: percent, updated_at: new Date().toISOString() })
        .eq("user_id", u.user.id)
        .eq("course_id", courseId);
      return percent;
    },
    onSuccess: () => {
      toast.success("Lesson marked complete");
      qc.invalidateQueries({ queryKey: ["lesson", lessonId, "completed"] });
      qc.invalidateQueries({ queryKey: ["course", courseId, "progress"] });
      qc.invalidateQueries({ queryKey: ["me", "enrollments"] });
      qc.invalidateQueries({ queryKey: ["me", "enrollments", "with-course"] });
      qc.invalidateQueries({ queryKey: ["me", "resume-map"] });
      qc.invalidateQueries({ queryKey: ["me", "streak"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  // Reading position: restore on load, save throttled on scroll
  const getPos = useServerFn(getReadingPosition);
  const savePos = useServerFn(saveReadingPosition);
  const lastSavedRef = useRef<number>(-1);
  const restoredRef = useRef(false);

  useEffect(() => {
    if (restoredRef.current || !lesson) return;
    restoredRef.current = true;
    (async () => {
      try {
        const pos = await getPos({ data: { lessonId } });
        if (pos && pos.scrollPercent > 5) {
          const target = (pos.scrollPercent / 100) * (document.documentElement.scrollHeight - window.innerHeight);
          window.scrollTo({ top: target, behavior: "smooth" });
        }
      } catch {
        /* ignore */
      }
    })();
  }, [lesson, lessonId, getPos]);

  useEffect(() => {
    if (!lesson) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
        if (Math.abs(pct - lastSavedRef.current) < 5) return;
        lastSavedRef.current = pct;
        savePos({ data: { lessonId, courseId, scrollPercent: Math.max(0, Math.min(100, pct)) } }).catch(() => {});
      }, 1200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [lesson, lessonId, courseId, savePos]);

  // Per-lesson notes (device-local; also embedded in PDF export).
  const notesKey = `lesson-notes:${lessonId}`;
  const [notes, setNotes] = useState("");
  useEffect(() => {
    try {
      setNotes(window.localStorage.getItem(notesKey) ?? "");
    } catch {
      /* ignore */
    }
  }, [notesKey]);
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        window.localStorage.setItem(notesKey, notes);
      } catch {
        /* ignore */
      }
    }, 400);
    return () => clearTimeout(t);
  }, [notes, notesKey]);



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

  const idx = sequence?.findIndex((s) => s.id === lessonId) ?? -1;
  const prev = sequence && idx > 0 ? sequence[idx - 1] : undefined;
  const next = sequence && idx >= 0 ? sequence[idx + 1] : undefined;

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
          <div className="flex flex-wrap gap-2">
            <LessonExportDialog
              data={{
                lessonTitle: lesson.title,
                estimatedMinutes: lesson.estimated_minutes,
                theory: lesson.theory,
                keyNotes: lesson.key_notes,
                examples,
                practice,
                illustrations,
                notes,
              }}
            />
            <Button
              variant={completed ? "secondary" : "default"}
              disabled={complete.isPending || !!completed}
              onClick={() => complete.mutate()}
            >
              {complete.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {completed ? "Completed" : "Mark complete"}
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        <LessonEnhancerPanel lessonId={lessonId} />


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

        <Section
          title="My notes"
          description="Saved on this device. Included when you export to PDF."
        >
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Jot down key takeaways, questions to revisit, or your own summary…"
            className="min-h-[140px]"
          />
        </Section>

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
                  to: "/dashboard/student/courses/$courseId",
                  params: { courseId },
                });
              }}
            >
              Finish course
            </Button>
          )}
        </div>
      </div>
    </RoleGate>
  );
}
