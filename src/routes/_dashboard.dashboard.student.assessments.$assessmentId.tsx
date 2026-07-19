import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { DashCard, SectionHeader } from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { boardLabel } from "@/lib/syllabus/catalog";
import {
  getWeeklyAssessment,
  submitWeeklyAssessment,
} from "@/lib/ai/weekly-assessments.functions";

export const Route = createFileRoute(
  "/_dashboard/dashboard/student/assessments/$assessmentId",
)({
  component: AssessmentPage,
});

type Question = {
  id: string;
  category: number;
  category_name: string;
  position: number;
  prompt: string;
  options: string[];
};

function AssessmentPage() {
  const { assessmentId } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const get = useServerFn(getWeeklyAssessment);
  const submit = useServerFn(submitWeeklyAssessment);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["weekly-assessment", assessmentId],
    queryFn: () => get({ data: { assessmentId } }),
    staleTime: 30_000,
  });

  const mutation = useMutation({
    mutationFn: async () => submit({ data: { assessmentId, answers } }),
    onSuccess: async () => {
      toast.success("Submitted");
      await qc.invalidateQueries({ queryKey: ["weekly-assessment", assessmentId] });
      await qc.invalidateQueries({ queryKey: ["me", "weekly-assessments"] });
    },
    onError: (e: Error) => toast.error(e.message ?? "Could not submit"),
  });

  const questions = (data?.questions ?? []) as Question[];
  const attempt = data?.attempt ?? null;
  const done = !!attempt?.submitted_at;

  const grouped = useMemo(() => {
    const map = new Map<number, Question[]>();
    for (const q of questions) {
      const arr = map.get(q.category) ?? [];
      arr.push(q);
      map.set(q.category, arr);
    }
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [questions]);

  const answered = Object.keys(answers).length;
  const total = questions.length;

  if (isLoading || !data) {
    return (
      <RoleGate allow={["student"]}>
        <DashboardHeader title="Loading assessment…" description="Please wait" />
      </RoleGate>
    );
  }

  const a = data.assessment;
  const pct = done && attempt?.max_score
    ? Math.round(((attempt?.score ?? 0) / (attempt?.max_score ?? 1)) * 100)
    : 0;

  return (
    <RoleGate allow={["student"]}>
      <button
        onClick={() => navigate({ to: "/dashboard/student/assessments" })}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to assessments
      </button>
      <DashboardHeader
        title={a.title}
        description={`${boardLabel(a.board)} · Class ${a.class_level} · ${a.subject}`}
      />

      {done && (
        <DashCard className="mb-6 flex items-center gap-4 border-primary/40 bg-primary/5">
          <CheckCircle2 className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm font-semibold">
              Submitted · Score {attempt?.score}/{attempt?.max_score} ({pct}%)
            </p>
            <p className="text-xs text-muted-foreground">
              Review your answers below — correct choices are highlighted.
            </p>
          </div>
        </DashCard>
      )}

      {!done && (
        <DashCard className="mb-6 flex items-center justify-between">
          <p className="text-sm">
            Answered <span className="font-semibold text-primary">{answered}</span> of {total}
          </p>
          <Button
            onClick={() => {
              if (answered < total) {
                toast.error(`Please answer all ${total} questions before submitting.`);
                return;
              }
              mutation.mutate();
            }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting…" : "Submit assessment"}
          </Button>
        </DashCard>
      )}

      {grouped.map(([cat, qs]) => (
        <section key={cat} className="mb-8">
          <SectionHeader
            title={`Category ${cat}: ${qs[0]?.category_name ?? ""}`}
            hint={`${qs.length} questions`}
          />
          <div className="space-y-4">
            {qs.map((q, idx) => {
              const chosen = answers[q.id];
              const attemptAnswers = (attempt?.answers ?? {}) as Record<string, number>;
              const submittedChoice = done ? attemptAnswers[q.id] : undefined;
              return (
                <DashCard key={q.id}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Q{(cat - 1) * 5 + idx + 1}
                  </p>
                  <p className="mt-1 text-sm font-medium">{q.prompt}</p>
                  <div className="mt-3 grid gap-2">
                    {q.options.map((opt, i) => {
                      const isChosen = done ? submittedChoice === i : chosen === i;
                      return (
                        <label
                          key={i}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition ${
                            isChosen
                              ? "border-primary bg-primary/10"
                              : "border-border/60 hover:border-primary/40"
                          } ${done ? "cursor-default" : ""}`}
                        >
                          <input
                            type="radio"
                            className="h-4 w-4"
                            name={q.id}
                            checked={isChosen}
                            disabled={done}
                            onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                  {done && (
                    <Badge variant="secondary" className="mt-3">
                      Your choice: option {typeof submittedChoice === "number" ? submittedChoice + 1 : "—"}
                    </Badge>
                  )}
                </DashCard>
              );
            })}
          </div>
        </section>
      ))}
    </RoleGate>
  );
}
