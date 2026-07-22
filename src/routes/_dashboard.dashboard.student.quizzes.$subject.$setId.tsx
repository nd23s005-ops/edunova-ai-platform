import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Loader2,
  RotateCcw,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader, DashCard } from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import { ProgressBar } from "@/components/courses/CourseUI";
import {
  SUBJECTS,
  COLLEGE_SUBJECTS,
  startSubjectQuiz,
  submitSubjectQuiz,
  getSubjectQuizHistory,
  type SubjectAttempt,
  type SubjectHistoryItem,
} from "@/lib/ai/subject-quiz.functions";

const ALL = [...SUBJECTS, ...COLLEGE_SUBJECTS];

export const Route = createFileRoute("/_dashboard/dashboard/student/quizzes/$subject/$setId")({
  beforeLoad: ({ params }) => {
    const setNum = Number(params.setId);
    if (!ALL.some((s) => s.slug === params.subject)) throw notFound();
    if (!Number.isInteger(setNum) || setNum < 1 || setNum > 5) throw notFound();
  },
  component: TakeQuiz,
});

function TakeQuiz() {
  const { subject, setId } = Route.useParams();
  const quizSet = Number(setId);
  const label = SUBJECTS.find((s) => s.slug === subject)?.label ?? subject;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const startFn = useServerFn(startSubjectQuiz);
  const submitFn = useServerFn(submitSubjectQuiz);
  const historyFn = useServerFn(getSubjectQuizHistory);

  const [attempt, setAttempt] = useState<SubjectAttempt | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<SubjectAttempt | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef<number>(0);

  const startMut = useMutation({
    mutationFn: () => startFn({ data: { subject, quizSet } }),
    onSuccess: (data) => {
      setAttempt(data);
      setAnswers(new Array(data.questions.length).fill(-1));
      setCurrent(0);
      setResult(null);
      setElapsed(0);
      startedAt.current = Date.now();
    },
  });

  const submitMut = useMutation({
    mutationFn: (payload: { attemptId: string; answers: number[]; timeSpentSeconds: number }) =>
      submitFn({ data: payload }),
    onSuccess: (data) => {
      setResult(data);
      setAttempt(null);
      qc.invalidateQueries({ queryKey: ["subject-quiz-history", subject] });
    },
  });

  const { data: history } = useQuery<SubjectHistoryItem[]>({
    queryKey: ["subject-quiz-history", subject, quizSet],
    queryFn: () => historyFn({ data: { subject, quizSet } }),
    staleTime: 15_000,
  });

  // Timer while active
  useEffect(() => {
    if (!attempt) return;
    const t = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [attempt]);

  const q = attempt?.questions[current];
  const answeredCount = answers.filter((a) => a >= 0).length;
  const total = attempt?.questions.length ?? 0;
  const progressPct = total ? Math.round((answeredCount / total) * 100) : 0;

  function selectAnswer(idx: number) {
    if (!attempt) return;
    setAnswers((prev) => {
      const next = prev.slice();
      next[current] = idx;
      return next;
    });
  }

  function submit() {
    if (!attempt) return;
    submitMut.mutate({
      attemptId: attempt.id,
      answers,
      timeSpentSeconds: Math.floor((Date.now() - startedAt.current) / 1000),
    });
  }

  const bestPct = useMemo(() => {
    const arr = history ?? [];
    if (arr.length === 0) return 0;
    return Math.max(...arr.map((h) => h.pct));
  }, [history]);
  const avgPct = useMemo(() => {
    const arr = history ?? [];
    if (arr.length === 0) return 0;
    return Math.round((arr.reduce((s, h) => s + h.pct, 0) / arr.length) * 10) / 10;
  }, [history]);

  // ------------- Results view -------------
  if (result) {
    const pct = result.total ? Math.round((result.score / result.total) * 100) : 0;
    const prev = (history ?? []).filter((h) => h.id !== result.id);
    const prevBest = prev.length ? Math.max(...prev.map((h) => h.pct)) : 0;
    const improvement = prevBest ? Math.round((pct - prevBest) * 10) / 10 : 0;
    const grade = pct >= 90 ? "A+" : pct >= 80 ? "A" : pct >= 70 ? "B" : pct >= 60 ? "C" : pct >= 50 ? "D" : "F";

    return (
      <RoleGate allow={["student", "college_student"]}>
        <div className="mb-4">
          <Link
            to="/dashboard/student/quizzes/$subject"
            params={{ subject }}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> {label} quiz sets
          </Link>
        </div>
        <DashboardHeader
          title={`Results · ${label} Quiz Set ${quizSet}`}
          description="AI evaluated your answers and generated personalized feedback."
        />

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatMini label="Score" value={`${result.score}/${result.total}`} icon={<Trophy className="h-4 w-4" />} />
          <StatMini label="Percentage" value={`${pct}%`} icon={<TrendingUp className="h-4 w-4" />} />
          <StatMini label="Grade" value={grade} />
          <StatMini
            label="Time"
            value={`${Math.floor(result.time_spent_seconds / 60)}m ${result.time_spent_seconds % 60}s`}
            icon={<Clock className="h-4 w-4" />}
          />
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-3">
          <DashCard>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Best score</p>
            <p className="mt-1 text-2xl font-bold">{Math.max(bestPct, pct)}%</p>
          </DashCard>
          <DashCard>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Average</p>
            <p className="mt-1 text-2xl font-bold">
              {avgPct ? `${avgPct}%` : `${pct}%`}
            </p>
          </DashCard>
          <DashCard>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Change vs best</p>
            <p className={`mt-1 text-2xl font-bold ${improvement >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {prev.length ? (improvement >= 0 ? "+" : "") + improvement + "%" : "First attempt"}
            </p>
          </DashCard>
        </div>

        {result.ai_feedback && (
          <DashCard className="mb-6 border-primary/30 bg-primary/5">
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> AI Feedback
            </div>
            <p className="text-sm leading-relaxed">{result.ai_feedback}</p>
          </DashCard>
        )}

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <DashCard>
            <p className="mb-3 text-sm font-semibold">Strong topics</p>
            {result.strengths.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {result.strengths.map((s) => (
                  <span key={s} className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Keep practicing to build stronger areas.</p>
            )}
          </DashCard>
          <DashCard>
            <p className="mb-3 text-sm font-semibold">Focus areas</p>
            {result.weaknesses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {result.weaknesses.map((s) => (
                  <span key={s} className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-600">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No major weak areas — well done!</p>
            )}
          </DashCard>
        </div>

        <SectionHeader title="Question review" />
        <div className="mb-6 space-y-3">
          {result.questions.map((qq, i) => {
            const chosen = result.answers[i];
            const correct = chosen === qq.correctIndex;
            return (
              <DashCard key={qq.id}>
                <div className="mb-2 flex items-start gap-2">
                  {correct ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">
                      Q{i + 1} · {qq.topic} · {qq.difficulty}
                    </p>
                    <p className="mt-1 text-sm font-medium">{qq.question}</p>
                  </div>
                </div>
                <div className="ml-7 space-y-1.5">
                  {qq.choices.map((c, ci) => (
                    <div
                      key={ci}
                      className={`rounded-lg border px-3 py-2 text-sm ${
                        ci === qq.correctIndex
                          ? "border-emerald-500/40 bg-emerald-500/5"
                          : ci === chosen
                            ? "border-rose-500/40 bg-rose-500/5"
                            : "border-border/60"
                      }`}
                    >
                      {c}
                    </div>
                  ))}
                  {qq.explanation && (
                    <p className="mt-2 rounded-lg bg-muted/50 p-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      {qq.explanation}
                    </p>
                  )}
                </div>
              </DashCard>
            );
          })}
        </div>

        {prev.length > 0 && (
          <>
            <SectionHeader title="Previous attempts" />
            <div className="mb-6 space-y-2">
              {prev.slice(0, 5).map((h) => (
                <DashCard key={h.id} className="flex items-center justify-between text-sm">
                  <span>{new Date(h.submitted_at ?? h.created_at).toLocaleString()}</span>
                  <span className="font-semibold">
                    {h.score}/{h.total} ({h.pct}%)
                  </span>
                </DashCard>
              ))}
            </div>
          </>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => startMut.mutate()}
            disabled={startMut.isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-primary/90 disabled:opacity-60"
          >
            {startMut.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
            Retake with fresh questions
          </button>
          <button
            onClick={() => navigate({ to: "/dashboard/student/quizzes/$subject", params: { subject } })}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted"
          >
            Back to {label}
          </button>
        </div>
      </RoleGate>
    );
  }

  // ------------- Active quiz view -------------
  if (attempt && q) {
    const chosen = answers[current];
    return (
      <RoleGate allow={["student", "college_student"]}>
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/dashboard/student/quizzes/$subject"
            params={{ subject }}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Exit quiz
          </Link>
          <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-sm">
            <Clock className="h-4 w-4" />
            {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
          </div>
        </div>

        <DashboardHeader
          title={`${label} · Quiz Set ${quizSet}`}
          description={`Difficulty: ${attempt.difficulty} · Question ${current + 1} of ${total}`}
        />

        <div className="mb-6">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Answered {answeredCount}/{total}</span>
            <span className="font-semibold text-primary">{progressPct}%</span>
          </div>
          <ProgressBar value={progressPct} />
        </div>

        <DashCard className="mb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {q.topic} · {q.type.replace("_", " ")} · {q.difficulty}
          </p>
          <p className="mt-2 text-lg font-semibold leading-relaxed">{q.question}</p>
          <div className="mt-5 space-y-2">
            {q.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                  chosen === i
                    ? "border-primary bg-primary/10 font-semibold text-primary"
                    : "border-border/60 hover:border-primary/40 hover:bg-muted/50"
                }`}
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {c}
              </button>
            ))}
          </div>
        </DashCard>

        <div className="mb-6 flex flex-wrap gap-2">
          {attempt.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`grid h-9 w-9 place-items-center rounded-lg border text-xs font-semibold transition ${
                i === current
                  ? "border-primary bg-primary text-primary-foreground"
                  : answers[i] >= 0
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700"
                    : "border-border/60 hover:border-primary/40"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>
          {current < total - 1 ? (
            <button
              onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-primary/90"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={submitMut.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-primary/90 disabled:opacity-60"
            >
              {submitMut.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              Submit quiz
            </button>
          )}
        </div>
        {submitMut.error && (
          <p className="mt-4 rounded-lg border border-rose-500/40 bg-rose-500/5 p-3 text-sm text-rose-600">
            {(submitMut.error as Error).message}
          </p>
        )}
      </RoleGate>
    );
  }

  // ------------- Start screen -------------
  return (
    <RoleGate allow={["student", "college_student"]}>
      <div className="mb-4">
        <Link
          to="/dashboard/student/quizzes/$subject"
          params={{ subject }}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> {label} quiz sets
        </Link>
      </div>
      <DashboardHeader
        title={`${label} · Quiz Set ${quizSet}`}
        description="A fresh AI-generated quiz will be created for this attempt — no repeats."
      />

      <DashCard className="mb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Questions</p>
            <p className="mt-1 text-xl font-bold">15</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Best score</p>
            <p className="mt-1 text-xl font-bold">{bestPct ? `${bestPct}%` : "—"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Attempts</p>
            <p className="mt-1 text-xl font-bold">{history?.length ?? 0}</p>
          </div>
        </div>
        <button
          onClick={() => startMut.mutate()}
          disabled={startMut.isPending}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-primary/90 disabled:opacity-60"
        >
          {startMut.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Generating fresh questions…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Start quiz
            </>
          )}
        </button>
        {startMut.error && (
          <p className="mt-3 rounded-lg border border-rose-500/40 bg-rose-500/5 p-3 text-sm text-rose-600">
            {(startMut.error as Error).message}
          </p>
        )}
      </DashCard>

      {history && history.length > 0 && (
        <>
          <SectionHeader title="Your previous attempts on this set" />
          <div className="space-y-2">
            {history.map((h) => (
              <DashCard key={h.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">
                    {h.score}/{h.total} ({h.pct}%)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(h.submitted_at ?? h.created_at).toLocaleString()} · {h.difficulty}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {Math.round(h.time_spent_seconds / 60)}m
                </span>
              </DashCard>
            ))}
          </div>
        </>
      )}
    </RoleGate>
  );
}

function StatMini({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <DashCard>
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        {icon && <span className="text-primary">{icon}</span>}
      </div>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </DashCard>
  );
}
