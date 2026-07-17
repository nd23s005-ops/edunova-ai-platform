import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Badge, EmptyContent, Markdown, Section } from "@/components/courses/CourseUI";

export const Route = createFileRoute(
  "/_dashboard/dashboard/student/courses/$courseId/assignments/$assignmentId",
)({
  component: AssignmentPage,
});

type AQ = {
  id: string;
  order_index: number;
  type: "short" | "long" | "worksheet";
  prompt: string;
  rubric: string | null;
};

function AssignmentPage() {
  const { courseId, assignmentId } = Route.useParams();
  const qc = useQueryClient();

  const { data: assignment, isLoading } = useQuery({
    queryKey: ["assignment", assignmentId],
    queryFn: async () => {
      const { data } = await supabase
        .from("assignments")
        .select("id, chapter_id, title, instructions")
        .eq("id", assignmentId)
        .maybeSingle();
      return data;
    },
  });

  const { data: questions } = useQuery({
    queryKey: ["assignment", assignmentId, "questions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assignment_questions")
        .select("id, order_index, type, prompt, rubric")
        .eq("assignment_id", assignmentId)
        .order("order_index");
      if (error) throw error;
      return (data ?? []) as AQ[];
    },
  });

  const { data: submission } = useQuery({
    queryKey: ["assignment", assignmentId, "submission"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("assignment_submissions")
        .select("id, answers, status, submitted_at")
        .eq("user_id", u.user.id)
        .eq("assignment_id", assignmentId)
        .maybeSingle();
      return data;
    },
  });

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    if (submission) {
      setSubmissionId(submission.id);
      setAnswers((submission.answers as Record<string, string>) ?? {});
    }
  }, [submission]);

  // Ensure a draft exists
  useEffect(() => {
    if (!assignment || submissionId) return;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data, error } = await supabase
        .from("assignment_submissions")
        .upsert(
          {
            user_id: u.user.id,
            assignment_id: assignmentId,
            course_id: courseId,
            answers: {},
            status: "draft",
          },
          { onConflict: "user_id,assignment_id" },
        )
        .select("id")
        .single();
      if (!error && data) setSubmissionId(data.id);
    })();
  }, [assignment, submissionId, assignmentId, courseId]);

  // Autosave
  useEffect(() => {
    if (!submissionId || submission?.status === "submitted") return;
    const t = setTimeout(async () => {
      await supabase
        .from("assignment_submissions")
        .update({ answers: answers as never })
        .eq("id", submissionId);
    }, 700);
    return () => clearTimeout(t);
  }, [answers, submissionId, submission?.status]);

  const submit = useMutation({
    mutationFn: async () => {
      if (!submissionId) throw new Error("No submission");
      const { error } = await supabase
        .from("assignment_submissions")
        .update({
          answers: answers as never,
          status: "submitted",
          submitted_at: new Date().toISOString(),
        })
        .eq("id", submissionId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Assignment submitted");
      qc.invalidateQueries({ queryKey: ["assignment", assignmentId, "submission"] });
      qc.invalidateQueries({ queryKey: ["course", courseId, "progress"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading || !assignment) {
    return (
      <RoleGate allow={["student"]}>
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </RoleGate>
    );
  }

  const isSubmitted = submission?.status === "submitted";

  return (
    <RoleGate allow={["student"]}>
      <div className="mb-2 text-xs text-muted-foreground">
        <Link
          to="/dashboard/student/courses/$courseId/chapters/$chapterId"
          params={{ courseId, chapterId: assignment.chapter_id }}
          className="inline-flex items-center gap-1 hover:underline"
        >
          <ArrowLeft className="h-3 w-3" /> Back to chapter
        </Link>
      </div>
      <DashboardHeader
        title={assignment.title}
        actions={isSubmitted ? <Badge tone="success">Submitted</Badge> : undefined}
      />

      {assignment.instructions && (
        <div className="mb-4">
          <Section title="Instructions">
            <Markdown>{assignment.instructions}</Markdown>
          </Section>
        </div>
      )}

      {!questions || questions.length === 0 ? (
        <EmptyContent title="Questions coming soon" />
      ) : (
        <div className="space-y-4">
          {questions.map((q, i) => (
            <Section key={q.id} title={`Q${i + 1}. ${q.prompt}`}>
              {q.type === "short" ? (
                <input
                  type="text"
                  disabled={isSubmitted}
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
                  placeholder="Short answer"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              ) : (
                <textarea
                  disabled={isSubmitted}
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
                  rows={q.type === "long" ? 6 : 4}
                  placeholder={q.type === "worksheet" ? "Work through the problem here" : "Your answer"}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              )}
              {q.rubric && (
                <p className="mt-2 text-xs text-muted-foreground">
                  <b>Rubric:</b> {q.rubric}
                </p>
              )}
            </Section>
          ))}

          {!isSubmitted && (
            <div className="flex justify-end">
              <Button disabled={submit.isPending} onClick={() => submit.mutate()}>
                {submit.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <CheckCircle2 className="mr-2 h-4 w-4" /> Submit assignment
              </Button>
            </div>
          )}
        </div>
      )}
    </RoleGate>
  );
}
