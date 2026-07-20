import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BarChart3,
  BookOpen,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader, DashCard } from "@/components/dashboard/DashboardWidgets";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/courses/CourseUI";
import { toast } from "sonner";
import {
  getUniversalAttempt,
  submitUniversalAssessment,
  KIND_LABEL,
} from "@/lib/ai/universal/universal.functions";

export const Route = createFileRoute("/_dashboard/dashboard/student/ai-tests/attempts/$id")({
  component: AttemptRunner,
});

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function AttemptRunner() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const getFn = useServerFn(getUniversalAttempt);
  const submitFn = useServerFn(submitUniversalAssessment);

  const attemptQ = useQuery({
    queryKey: ["universal", "attempt", id],
    queryFn: () => getFn({ data: { attemptId: id } }),
  });

  const attempt = attemptQ.data;

  const [current, setCurrent] = useState(0);
  const [responses, setResponses] = useState<(number | string | null)[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef<number>(Date.now());

  useEffect(() => {
    if (attempt && responses.length === 0) {
      setResponses(new Array(attempt.questions.length).fill(null));
      startedAt.current = new Date(attempt.started_at).getTime() || Date.now();
    }
  }, [attempt, responses.length]);

  useEffect(() => {
    if (!attempt || attempt.status !== "in_progress") return;
    const t = setInterval(() => {
      setElapsed(Math.max(0, Math.floor((Date.now() - startedAt.current) / 1000)));
    }, 1000);
    return () => clearInterval(t);
  }, [attempt]);

  const submitMut = useMutation({
    mutationFn: (timedOut: boolean) =>
      submitFn({
        data: {
          attemptId: id,
          responses,
          timeTakenSeconds: elapsed,
          timedOut,
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["universal"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remaining = useMemo(() => {
    if (!attempt?.time_limit_seconds) return null;
    return Math.max(0, attempt.time_limit_seconds - elapsed);
  }, [attempt?.time_limit_seconds, elapsed]);

  useEffect(() => {
    if (attempt?.status === "in_progress" && remaining === 0 && !submitMut.isPending && !submitMut.data) {
      submitMut.mutate(true);
    }
  }, [remaining, attempt?.status, submitMut]);

  if (attemptQ.isLoading || !attempt) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const submitted = attempt.status !== "in_progress" || submitMut.data;
  const result = submitMut.data ?? (submitted ? (attempt as unknown as typeof submitMut.data) : null);

  if (submitted && result) {
    return <ResultsView result={result} onRetry={() => navigate({ to: "/dashboard/student/ai-tests/new" })} />;
  }

  const q = attempt.questions[current];
  const answered = responses.filter((r) => r !== null && r !== "").length;

  return (
    <>
      <button
        onClick={() => navigate({ to: "/dashboard/student/ai-tests" })}
        className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
      >
        <ArrowLeft className="h-3 w-3" /> Exit
      </button>
      <DashboardHeader
        title={`${KIND_LABEL[attempt.kind]} · ${attempt.difficulty}`}
        description={attempt.subject ? `Subject: ${attempt.subject}` : "AI-generated assessment"}
        actions={
          <div className="flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-3 py-1">
              <Clock className="h-4 w-4" />
              {remaining !== null ? formatTime(remaining) : formatTime(elapsed)}
            </span>
            <span className="text-muted-foreground">
              {answered}/{attempt.questions.length} answered
            </span>
          </div>
        }
      />

      <div className="mb-4">
        <ProgressBar value={(current / attempt.questions.length) * 100} />
      </div>

      <DashCard className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Question {current + 1} of {attempt.questions.length} · {q.topic} · {q.type}
          </span>
          <span className="capitalize">{q.difficulty}</span>
        </div>
        <div className="mb-4 whitespace-pre-wrap text-base font-medium">{q.question}</div>
        {q.code && (
          <pre className="mb-4 max-h-64 overflow-auto rounded-lg border border-border/60 bg-muted/50 p-3 text-xs">
            <code>{q.code}</code>
          </pre>
        )}

        <QuestionInput
          q={q}
          value={responses[current] ?? null}
          onChange={(v) => {
            const next = responses.slice();
            next[current] = v;
            setResponses(next);
          }}
        />

        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            disabled={current === 0}
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {current < attempt.questions.length - 1 ? (
            <Button onClick={() => setCurrent((c) => Math.min(attempt.questions.length - 1, c + 1))}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              disabled={submitMut.isPending}
              onClick={() => submitMut.mutate(false)}
            >
              {submitMut.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          )}
        </div>
      </DashCard>

      <div className="grid grid-cols-8 gap-2 sm:grid-cols-12">
        {attempt.questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`aspect-square rounded-lg border text-xs font-medium transition ${
              i === current
                ? "border-primary bg-primary/10"
                : responses[i] !== null && responses[i] !== ""
                  ? "border-emerald-500/60 bg-emerald-500/10"
                  : "border-border/60 hover:border-primary/40"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}

function QuestionInput({
  q,
  value,
  onChange,
}: {
  q: import("@/lib/ai/universal/universal.functions").UniversalQuestion;
  value: number | string | null;
  onChange: (v: number | string | null) => void;
}) {
  if (q.type === "match") {
    const pairs = q.pairs ?? [];
    let arr: string[] = [];
    try {
      arr = value && typeof value === "string" ? (JSON.parse(value) as string[]) : [];
    } catch {
      arr = [];
    }
    const rights = pairs.map((p) => p.right);
    return (
      <div className="space-y-2">
        {pairs.map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex-1 rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm">
              {p.left}
            </div>
            <select
              value={arr[i] ?? ""}
              onChange={(e) => {
                const next = arr.slice();
                next[i] = e.target.value;
                onChange(JSON.stringify(next));
              }}
              className="flex-1 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm"
            >
              <option value="">Select match…</option>
              {rights.map((r, ri) => (
                <option key={ri} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  }

  if (q.type === "short" || q.type === "long" || q.type === "code_debug" || q.type === "code_complete") {
    return (
      <textarea
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        rows={q.type === "long" ? 6 : 3}
        placeholder="Type your answer…"
        className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 font-mono text-sm"
      />
    );
  }

  if (q.type === "numerical") {
    return (
      <input
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Numerical answer"
        className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
      />
    );
  }

  // MCQ-like
  const choices = q.choices ?? [];
  return (
    <div className="space-y-2">
      {choices.map((c, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
            value === i
              ? "border-primary bg-primary/10"
              : "border-border/60 hover:border-primary/40"
          }`}
        >
          <span className="mr-2 inline-block h-6 w-6 rounded-full border border-border text-center font-medium leading-6">
            {String.fromCharCode(65 + i)}
          </span>
          {c}
        </button>
      ))}
    </div>
  );
}

function ResultsView({
  result,
  onRetry,
}: {
  result: NonNullable<ReturnType<typeof useServerFn<typeof submitUniversalAssessment>>> extends never
    ? never
    : Awaited<ReturnType<typeof submitUniversalAssessment>>;
  onRetry: () => void;
}) {
  const pct = result.percentage ?? 0;
  return (
    <>
      <DashboardHeader
        title={`${KIND_LABEL[result.kind]} · Results`}
        description={`Grade ${result.letter_grade ?? "—"} · ${result.difficulty}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onRetry}>
              <RotateCcw className="mr-2 h-4 w-4" /> New attempt
            </Button>
            <Link
              to="/dashboard/student/ai-tests/analytics"
              className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 text-sm font-medium hover:border-primary/40"
            >
              <BarChart3 className="h-4 w-4" /> Analytics
            </Link>
          </div>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <DashCard>
          <div className="text-xs text-muted-foreground">Score</div>
          <div className="text-3xl font-semibold">{pct}%</div>
          <ProgressBar value={pct} className="mt-2" />
        </DashCard>
        <DashCard>
          <div className="text-xs text-muted-foreground">Correct</div>
          <div className="text-3xl font-semibold">
            {result.per_question?.filter((p) => p.correct).length ?? 0}/{result.questions.length}
          </div>
        </DashCard>
        <DashCard>
          <div className="text-xs text-muted-foreground">Time</div>
          <div className="text-3xl font-semibold">{formatTime(result.time_taken_seconds ?? 0)}</div>
        </DashCard>
        <DashCard>
          <div className="text-xs text-muted-foreground">Accuracy</div>
          <div className="text-3xl font-semibold">{result.accuracy ?? 0}%</div>
        </DashCard>
      </div>

      {result.ai_feedback && (
        <section className="mb-8">
          <SectionHeader title="AI feedback" hint="Personalized based on your answers" />
          <div className="grid gap-4 md:grid-cols-2">
            <FeedbackCard
              icon={<Trophy className="h-4 w-4 text-emerald-500" />}
              title="Strengths"
              items={result.ai_feedback.strengths}
            />
            <FeedbackCard
              icon={<Sparkles className="h-4 w-4 text-amber-500" />}
              title="Areas to improve"
              items={result.ai_feedback.improvements}
            />
            <FeedbackCard
              icon={<BookOpen className="h-4 w-4 text-blue-500" />}
              title="Study suggestions"
              items={result.ai_feedback.study}
            />
            <FeedbackCard
              icon={<RotateCcw className="h-4 w-4 text-violet-500" />}
              title="Revision"
              items={result.ai_feedback.revision}
            />
          </div>
          {result.ai_feedback.readiness && (
            <DashCard className="mt-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Readiness</div>
              <div className="mt-1 text-sm">{result.ai_feedback.readiness}</div>
            </DashCard>
          )}
        </section>
      )}

      {result.recommendations && (
        <section className="mb-8">
          <SectionHeader title="Recommended next steps" />
          <div className="grid gap-4 md:grid-cols-2">
            <FeedbackCard title="Revisit lessons" items={result.recommendations.lessons} />
            <FeedbackCard title="Practice topics" items={result.recommendations.practice} />
            <FeedbackCard title="Mock topics" items={result.recommendations.mocks} />
            <FeedbackCard title="Mini projects" items={result.recommendations.projects} />
            <FeedbackCard title="AI tutor prompts" items={result.recommendations.tutor} />
            <FeedbackCard title="Career skills" items={result.recommendations.career_skills} />
          </div>
          {result.recommendations.next_course && (
            <DashCard className="mt-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Next course</div>
              <div className="mt-1 text-sm">{result.recommendations.next_course}</div>
            </DashCard>
          )}
        </section>
      )}

      <section className="mb-10">
        <SectionHeader title="Question-by-question review" />
        <div className="space-y-3">
          {result.questions.map((q, i) => {
            const per = result.per_question?.[i];
            const resp = result.responses?.[i];
            const learnerText =
              q.choices && typeof resp === "number"
                ? q.choices[resp]
                : typeof resp === "string"
                  ? resp
                  : "—";
            const correctText =
              q.choices && typeof q.correctIndex === "number"
                ? q.choices[q.correctIndex]
                : q.correctAnswer ?? "—";
            return (
              <DashCard key={q.id}>
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Q{i + 1} · {q.topic} · {q.type}
                  </span>
                  {per?.correct ? (
                    <span className="inline-flex items-center gap-1 text-emerald-500">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-500">
                      <XCircle className="h-3.5 w-3.5" /> Incorrect
                    </span>
                  )}
                </div>
                <div className="mb-2 text-sm font-medium">{q.question}</div>
                <div className="grid gap-2 text-xs sm:grid-cols-2">
                  <div>
                    <div className="uppercase tracking-wide text-muted-foreground">Your answer</div>
                    <div className="mt-0.5">{learnerText}</div>
                  </div>
                  <div>
                    <div className="uppercase tracking-wide text-muted-foreground">Correct answer</div>
                    <div className="mt-0.5">{correctText}</div>
                  </div>
                </div>
                {q.explanation && (
                  <div className="mt-3 rounded-lg border border-border/60 bg-muted/30 p-3 text-xs">
                    <span className="font-medium">Explanation:</span> {q.explanation}
                  </div>
                )}
              </DashCard>
            );
          })}
        </div>
      </section>
    </>
  );
}

function FeedbackCard({
  title,
  items,
  icon,
}: {
  title: string;
  items?: string[] | null;
  icon?: React.ReactNode;
}) {
  if (!items || items.length === 0) return null;
  return (
    <DashCard>
      <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold">
        {icon} {title}
      </div>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-primary">•</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </DashCard>
  );
}
