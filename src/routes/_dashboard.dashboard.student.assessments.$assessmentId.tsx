import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, ArrowLeft, Clock, Sparkles, XCircle, Lightbulb } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { DashCard, SectionHeader } from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { boardLabel } from "@/lib/syllabus/catalog";
import {
  getAiWeeklyAttempt,
  submitAiWeeklyAssessment,
  type AiQuestion,
} from "@/lib/ai/ai-weekly.functions";

export const Route = createFileRoute(
  "/_dashboard/dashboard/student/assessments/$assessmentId",
)({
  component: AttemptPage,
});

type LoadedQuestion = AiQuestion | Omit<AiQuestion, "correct" | "explanation">;
type AnswerValue = number | string | number[];

function AttemptPage() {
  const { assessmentId } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const get = useServerFn(getAiWeeklyAttempt);
  const submit = useServerFn(submitAiWeeklyAssessment);

  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["ai-weekly-attempt", assessmentId],
    queryFn: () => get({ data: { attemptId: assessmentId } }),
    staleTime: 30_000,
  });

  // Prefill answers if reviewing a submitted attempt.
  useEffect(() => {
    if (data?.submitted && data.answers) {
      setAnswers(data.answers as Record<string, AnswerValue>);
    }
  }, [data?.submitted, data?.answers]);

  const mutation = useMutation({
    mutationFn: async () =>
      submit({
        data: {
          attemptId: assessmentId,
          answers,
          timeTakenSeconds: Math.floor((Date.now() - startedAt) / 1000),
        },
      }),
    onSuccess: async () => {
      toast.success("Submitted — AI is evaluating your answers");
      await qc.invalidateQueries({ queryKey: ["ai-weekly-attempt", assessmentId] });
      await qc.invalidateQueries({ queryKey: ["me", "ai-weekly-attempts"] });
    },
    onError: (e: Error) => toast.error(e.message ?? "Could not submit"),
  });

  const questions = (data?.questions ?? []) as LoadedQuestion[];
  const done = !!data?.submitted;

  const bySubject = useMemo(() => {
    const map = new Map<string, LoadedQuestion[]>();
    for (const q of questions) {
      const arr = map.get(q.subject) ?? [];
      arr.push(q);
      map.set(q.subject, arr);
    }
    return Array.from(map.entries());
  }, [questions]);

  const answered = questions.filter((q) => {
    const v = answers[q.id];
    if (v === undefined || v === null || v === "") return false;
    if (Array.isArray(v)) return v.length === (q as AiQuestion).pairs_left?.length;
    return true;
  }).length;

  const total = questions.length;
  const elapsed = Math.floor((now - startedAt) / 1000);

  if (isLoading || !data) {
    return (
      <RoleGate allow={["student"]}>
        <DashboardHeader title="Loading assessment…" description="Fetching your fresh AI-generated questions" />
      </RoleGate>
    );
  }

  const results = (data.results as { per_question?: Array<{ question_id: string; correct: boolean; awarded: number; points: number; correct_answer: unknown; ai_note?: string }>; by_subject?: Record<string, { correct: number; total: number; awarded: number; possible: number }> } | null) ?? null;
  const perQ = new Map((results?.per_question ?? []).map((r) => [r.question_id, r]));
  const feedback = data.ai_feedback as null | {
    summary?: string;
    grade?: string;
    weak_topics?: string[];
    strong_topics?: string[];
    recommendations?: string[];
    encouragement?: string;
  };
  const pct = done && Number(data.max_score) > 0
    ? Math.round((Number(data.score) / Number(data.max_score)) * 100)
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
        title={`Weekly Assessment · Week of ${data.week_start}`}
        description={`${boardLabel(data.board)} · Class ${data.class_level} · ${(data.subjects ?? []).join(", ")}`}
      />

      {done ? (
        <>
          <DashCard className="mb-6 border-primary/40 bg-primary/5">
            <div className="flex flex-wrap items-center gap-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <div className="flex-1">
                <p className="text-2xl font-semibold">
                  {data.score}/{data.max_score} · {pct}%
                  {feedback?.grade && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-0.5 text-sm font-semibold text-primary">
                      Grade {feedback.grade}
                    </span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  Time taken: {Math.floor((data.time_taken_seconds ?? 0) / 60)}m {(data.time_taken_seconds ?? 0) % 60}s
                </p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>Correct: {results?.per_question?.filter((r) => r.correct).length ?? 0}</p>
                <p>Incorrect: {results?.per_question?.filter((r) => !r.correct && r.awarded < r.points).length ?? 0}</p>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={pct} />
            </div>
          </DashCard>

          {feedback && (
            <DashCard className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="mr-1 inline h-3.5 w-3.5" /> AI feedback
              </p>
              {feedback.summary && <p className="mt-2 text-sm">{feedback.summary}</p>}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {feedback.strong_topics && feedback.strong_topics.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Strong topics</p>
                    <ul className="mt-1 list-disc pl-5 text-sm">
                      {feedback.strong_topics.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>
                )}
                {feedback.weak_topics && feedback.weak_topics.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Areas to revise</p>
                    <ul className="mt-1 list-disc pl-5 text-sm">
                      {feedback.weak_topics.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>
                )}
              </div>
              {feedback.recommendations && feedback.recommendations.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Recommended next steps</p>
                  <ul className="mt-1 list-disc pl-5 text-sm">
                    {feedback.recommendations.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              )}
              {feedback.encouragement && (
                <p className="mt-4 rounded-lg bg-primary/10 px-3 py-2 text-sm italic text-primary">{feedback.encouragement}</p>
              )}
            </DashCard>
          )}

          {results?.by_subject && (
            <DashCard className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Subject-wise performance</p>
              <div className="mt-3 space-y-3">
                {Object.entries(results.by_subject).map(([subj, s]) => {
                  const p = s.possible > 0 ? Math.round((s.awarded / s.possible) * 100) : 0;
                  return (
                    <div key={subj}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{subj}</span>
                        <span className="text-muted-foreground">{s.awarded}/{s.possible} · {p}%</span>
                      </div>
                      <Progress value={p} className="mt-1" />
                    </div>
                  );
                })}
              </div>
            </DashCard>
          )}
        </>
      ) : (
        <DashCard className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm">
              Answered <span className="font-semibold text-primary">{answered}</span> of {total}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {Math.floor(elapsed / 60)}m {elapsed % 60}s
            </p>
          </div>
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
            {mutation.isPending ? "Evaluating…" : "Submit assessment"}
          </Button>
        </DashCard>
      )}

      {bySubject.map(([subject, qs]) => (
        <section key={subject} className="mb-8">
          <SectionHeader title={subject} hint={`${qs.length} questions`} />
          <div className="space-y-4">
            {qs.map((q, idx) => (
              <QuestionCard
                key={q.id}
                q={q}
                idx={idx + 1}
                value={answers[q.id]}
                setValue={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
                done={done}
                result={perQ.get(q.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </RoleGate>
  );
}

function QuestionCard({
  q,
  idx,
  value,
  setValue,
  done,
  result,
}: {
  q: LoadedQuestion;
  idx: number;
  value: AnswerValue | undefined;
  setValue: (v: AnswerValue) => void;
  done: boolean;
  result?: { correct: boolean; awarded: number; points: number; correct_answer: unknown; ai_note?: string };
}) {
  const explanation = (q as AiQuestion).explanation;
  const typeLabel: Record<string, string> = {
    mcq: "MCQ",
    true_false: "True / False",
    assertion_reason: "Assertion & Reason",
    fill_blank: "Fill in the blank",
    numerical: "Numerical",
    short_answer: "Short answer",
    match: "Match the following",
    programming: "Programming",
  };

  return (
    <DashCard>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Q{idx}</span>
        <Badge variant="secondary" className="text-[10px]">{typeLabel[q.type] ?? q.type}</Badge>
        {q.topic && <Badge variant="outline" className="text-[10px]">{q.topic}</Badge>}
        {done && result && (
          result.correct ? (
            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="mr-1 h-3 w-3" />+{result.awarded}</Badge>
          ) : result.awarded > 0 ? (
            <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300">Partial +{result.awarded}/{result.points}</Badge>
          ) : (
            <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-300"><XCircle className="mr-1 h-3 w-3" />0/{result.points}</Badge>
          )
        )}
      </div>
      <p className="whitespace-pre-wrap text-sm font-medium">{q.prompt}</p>

      {q.type === "programming" && q.code && (
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-3 font-mono text-xs">
          <code>{q.code}</code>
        </pre>
      )}

      <div className="mt-3">
        {(q.type === "mcq" || q.type === "true_false" || q.type === "assertion_reason" || (q.type === "programming" && Array.isArray(q.options))) && (
          <div className="grid gap-2">
            {(q.options ?? []).map((opt, i) => {
              const isChosen = value === i;
              const isCorrect = done && result && Number(result.correct_answer) === i;
              const isWrongPick = done && isChosen && !isCorrect;
              return (
                <label
                  key={i}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 text-sm transition ${
                    isCorrect
                      ? "border-emerald-500 bg-emerald-500/10"
                      : isWrongPick
                      ? "border-rose-500 bg-rose-500/10"
                      : isChosen
                      ? "border-primary bg-primary/10"
                      : "border-border/60 hover:border-primary/40"
                  } ${done ? "cursor-default" : ""}`}
                >
                  <input
                    type="radio"
                    className="mt-0.5 h-4 w-4"
                    name={q.id}
                    checked={isChosen}
                    disabled={done}
                    onChange={() => setValue(i)}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        )}

        {(q.type === "fill_blank" || q.type === "numerical") && (
          <Input
            value={typeof value === "string" || typeof value === "number" ? String(value) : ""}
            onChange={(e) => setValue(e.target.value)}
            placeholder={q.type === "numerical" ? "Enter your numeric answer" : "Type your answer"}
            disabled={done}
          />
        )}

        {q.type === "short_answer" && (
          <Textarea
            value={typeof value === "string" ? value : ""}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your answer (1–3 sentences)"
            rows={3}
            disabled={done}
          />
        )}

        {q.type === "programming" && !Array.isArray(q.options) && (
          <Textarea
            value={typeof value === "string" ? value : ""}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter expected output or the corrected code"
            rows={4}
            className="font-mono text-xs"
            disabled={done}
          />
        )}

        {q.type === "match" && q.pairs_left && q.pairs_right && (
          <div className="grid gap-2">
            {q.pairs_left.map((left, i) => {
              const arr = Array.isArray(value) ? (value as number[]) : [];
              const chosen = arr[i];
              return (
                <div key={i} className="flex flex-col gap-1 rounded-lg border border-border/60 p-2 sm:flex-row sm:items-center sm:gap-3">
                  <span className="min-w-[40%] text-sm font-medium">{i + 1}. {left}</span>
                  <select
                    className="rounded-md border border-border/60 bg-background px-2 py-1 text-sm"
                    value={chosen ?? ""}
                    disabled={done}
                    onChange={(e) => {
                      const next = [...arr];
                      while (next.length < q.pairs_left!.length) next.push(-1);
                      next[i] = Number(e.target.value);
                      setValue(next);
                    }}
                  >
                    <option value="">Select match…</option>
                    {q.pairs_right!.map((right, j) => (
                      <option key={j} value={j}>{String.fromCharCode(65 + j)}. {right}</option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {done && (
        <div className="mt-4 rounded-lg border border-border/60 bg-muted/30 p-3">
          <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Lightbulb className="h-3.5 w-3.5" /> Solution
          </p>
          <p className="mt-1 text-sm">
            <span className="font-semibold">Correct answer: </span>
            <CorrectAnswer q={q} correct={result?.correct_answer} />
          </p>
          {explanation && <p className="mt-1 text-sm text-muted-foreground">{explanation}</p>}
          {result?.ai_note && (
            <p className="mt-2 text-xs italic text-muted-foreground">AI note: {result.ai_note}</p>
          )}
        </div>
      )}
    </DashCard>
  );
}

function CorrectAnswer({ q, correct }: { q: LoadedQuestion; correct: unknown }) {
  if (correct === undefined || correct === null) return <span>—</span>;
  if ((q.type === "mcq" || q.type === "true_false" || q.type === "assertion_reason" || (q.type === "programming" && Array.isArray(q.options))) && q.options) {
    const idx = Number(correct);
    return <span>{q.options[idx] ?? String(idx)}</span>;
  }
  if (q.type === "match" && q.pairs_right && Array.isArray(correct)) {
    return (
      <span>
        {(correct as number[]).map((r, i) => `${i + 1}→${String.fromCharCode(65 + r)}`).join(", ")}
      </span>
    );
  }
  return <span>{String(correct)}</span>;
}
