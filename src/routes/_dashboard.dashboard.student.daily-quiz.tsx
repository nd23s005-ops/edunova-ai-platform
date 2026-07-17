import { useState, useEffect, useMemo, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  Flame,
  TrendingUp,
  BookOpen,
  Compass,
  Library,
  Loader2,
} from "lucide-react";
import { RoleGate } from "@/components/auth/RoleGate";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { DashCard, SectionHeader } from "@/components/dashboard/DashboardWidgets";
import { ProgressBar } from "@/components/courses/CourseUI";
import {
  getTodaysQuiz,
  submitDailyQuiz,
  getDailyQuizStats,
  type DailyQuiz,
  type DailyAttempt,
} from "@/lib/ai/daily-quiz.functions";

const searchSchema = z.object({
  view: z.enum(["quiz", "history"]).optional(),
});

export const Route = createFileRoute("/_dashboard/dashboard/student/daily-quiz")({
  validateSearch: (s) => searchSchema.parse(s),
  component: DailyQuizPage,
});

const QUESTION_TYPE_LABEL: Record<string, string> = {
  mcq: "Multiple Choice",
  true_false: "True / False",
  fill_blank: "Fill in the Blank",
  match: "Match the Following",
  reasoning: "Logical Reasoning",
  scenario: "Scenario",
};

function DailyQuizPage() {
  const search = Route.useSearch();
  const initialView = search.view === "history" ? "history" : "quiz";
  const [view, setView] = useState<"quiz" | "history">(initialView);

  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title="AI Daily Quiz"
        description="Fresh AI-generated questions every day — tailored to your level."
      />
      <div className="mb-6 flex flex-wrap gap-2">
        <Tab active={view === "quiz"} onClick={() => setView("quiz")}>
          Today's Quiz
        </Tab>
        <Tab active={view === "history"} onClick={() => setView("history")}>
          History & Insights
        </Tab>
      </div>
      {view === "quiz" ? <QuizRunnerSection /> : <HistorySection />}
    </RoleGate>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-lg px-4 py-2 text-sm font-medium transition " +
        (active
          ? "bg-primary text-primary-foreground shadow-elegant"
          : "border border-border/70 bg-card hover:border-primary/40")
      }
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------
function QuizRunnerSection() {
  const fetchQuiz = useServerFn(getTodaysQuiz);
  const submitFn = useServerFn(submitDailyQuiz);
  const qc = useQueryClient();

  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<DailyAttempt | null>(null);
  const [startedAt, setStartedAt] = useState<number>(0);

  const quizQuery = useQuery({
    queryKey: ["daily-quiz", "today"],
    queryFn: () => fetchQuiz({ data: undefined }) as Promise<DailyQuiz>,
    enabled: phase !== "idle" || false,
    staleTime: 5 * 60_000,
    retry: 0,
  });

  const start = () => {
    setPhase("running");
    setStartedAt(Date.now());
    quizQuery.refetch();
  };

  useEffect(() => {
    if (quizQuery.data && answers.length !== quizQuery.data.questions.length) {
      setAnswers(new Array(quizQuery.data.questions.length).fill(-1));
    }
  }, [quizQuery.data, answers.length]);

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!quizQuery.data) throw new Error("Quiz not loaded");
      const time = Math.round((Date.now() - startedAt) / 1000);
      return (await submitFn({
        data: {
          quizId: quizQuery.data.id,
          answers: answers.map((a) => (a < 0 ? -1 : a)),
          timeSpentSeconds: time,
        },
      })) as DailyAttempt;
    },
    onSuccess: (att) => {
      setResult(att);
      setPhase("done");
      qc.invalidateQueries({ queryKey: ["daily-quiz"] });
    },
  });

  if (phase === "idle") {
    return (
      <StartCard onStart={start} />
    );
  }

  if (quizQuery.isLoading || (!quizQuery.data && !quizQuery.error)) {
    return (
      <DashCard className="flex flex-col items-center justify-center py-16 text-center">
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
        <h3 className="text-lg font-semibold">Nova is generating your quiz…</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Handpicking ~30 fresh questions across 17 categories.
        </p>
      </DashCard>
    );
  }

  if (quizQuery.error) {
    return (
      <DashCard className="text-center">
        <XCircle className="mx-auto mb-2 h-8 w-8 text-destructive" />
        <h3 className="text-lg font-semibold">Couldn't generate today's quiz</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {(quizQuery.error as Error).message}
        </p>
        <button
          onClick={() => quizQuery.refetch()}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Try again
        </button>
      </DashCard>
    );
  }

  if (phase === "done" && result && quizQuery.data) {
    return <ResultView quiz={quizQuery.data} attempt={result} answers={answers} />;
  }

  return (
    <QuizRunner
      quiz={quizQuery.data!}
      answers={answers}
      setAnswers={setAnswers}
      index={index}
      setIndex={setIndex}
      onSubmit={() => submitMutation.mutate()}
      submitting={submitMutation.isPending}
      submitError={submitMutation.error ? (submitMutation.error as Error).message : null}
    />
  );
}

function StartCard({ onStart }: { onStart: () => void }) {
  const fetchStats = useServerFn(getDailyQuizStats);
  const { data: stats } = useQuery({
    queryKey: ["daily-quiz", "stats"],
    queryFn: () => fetchStats({ data: undefined }),
    staleTime: 30_000,
  });
  const alreadyDone = stats?.todayAttempted;

  return (
    <DashCard className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_320px] lg:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AI-generated · Refreshed daily
          </div>
          <h2 className="text-2xl font-semibold">Today's Nova Daily Quiz</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            About 30 questions across 17 categories including General Knowledge, Science, Mathematics,
            Programming, AI, Reasoning, Aptitude, English, History and Geography. Difficulty adapts to
            your recent performance.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-primary/90"
            >
              <Brain className="h-4 w-4" />
              {alreadyDone ? "Start a fresh attempt" : "Start today's quiz"}
            </button>
            <Link
              to="/dashboard/student"
              className="rounded-lg border border-border/70 bg-card px-4 py-2.5 text-sm font-medium hover:border-primary/40"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <StatTile icon={<Flame className="h-4 w-4" />} label="Streak" value={`${stats?.currentStreak ?? 0}d`} />
          <StatTile icon={<Trophy className="h-4 w-4" />} label="Best" value={`${Math.round(stats?.bestScorePct ?? 0)}%`} />
          <StatTile icon={<TrendingUp className="h-4 w-4" />} label="Weekly" value={`${Math.round(stats?.weeklyAveragePct ?? 0)}%`} />
        </div>
      </div>
    </DashCard>
  );
}

function StatTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function QuizRunner({
  quiz,
  answers,
  setAnswers,
  index,
  setIndex,
  onSubmit,
  submitting,
  submitError,
}: {
  quiz: DailyQuiz;
  answers: number[];
  setAnswers: (v: number[]) => void;
  index: number;
  setIndex: (v: number) => void;
  onSubmit: () => void;
  submitting: boolean;
  submitError: string | null;
}) {
  const questions = quiz.questions;
  const q = questions[index];
  const answered = answers.filter((a) => a >= 0).length;
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    progressRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [index]);

  const setAnswer = (choice: number) => {
    const next = [...answers];
    next[index] = choice;
    setAnswers(next);
  };

  return (
    <div ref={progressRef}>
      <DashCard className="mb-4">
        <div className="mb-3 flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold uppercase tracking-wider text-muted-foreground">
            Question {index + 1} of {questions.length}
          </span>
          <span className="text-muted-foreground">
            {answered}/{questions.length} answered
          </span>
        </div>
        <ProgressBar value={((index + 1) / questions.length) * 100} />
      </DashCard>

      <DashCard>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">
            {q.category}
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
            {QUESTION_TYPE_LABEL[q.type] ?? "Question"}
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 capitalize text-muted-foreground">
            {q.difficulty}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-relaxed">{q.question}</h3>
        <div className="mt-5 grid gap-2">
          {q.choices.map((c, i) => {
            const active = answers[index] === i;
            return (
              <button
                key={i}
                onClick={() => setAnswer(i)}
                className={
                  "flex items-start gap-3 rounded-xl border p-3 text-left text-sm transition " +
                  (active
                    ? "border-primary bg-primary/5"
                    : "border-border/70 bg-card hover:border-primary/40")
                }
              >
                <span
                  className={
                    "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold " +
                    (active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground")
                  }
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{c}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
          <button
            disabled={index === 0}
            onClick={() => setIndex(Math.max(0, index - 1))}
            className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-card px-4 py-2 text-sm font-medium disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          {index < questions.length - 1 ? (
            <button
              onClick={() => setIndex(Math.min(questions.length - 1, index + 1))}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              disabled={submitting}
              onClick={onSubmit}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                <>Submit quiz</>
              )}
            </button>
          )}
        </div>
        {submitError && <p className="mt-3 text-sm text-destructive">{submitError}</p>}
      </DashCard>

      <QuestionMap
        total={questions.length}
        answers={answers}
        current={index}
        onJump={setIndex}
      />
    </div>
  );
}

function QuestionMap({
  total,
  answers,
  current,
  onJump,
}: {
  total: number;
  answers: number[];
  current: number;
  onJump: (i: number) => void;
}) {
  return (
    <DashCard className="mt-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Jump to question
      </p>
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const done = answers[i] >= 0;
          const isCur = i === current;
          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              className={
                "h-8 w-8 rounded-lg text-xs font-semibold transition " +
                (isCur
                  ? "bg-primary text-primary-foreground"
                  : done
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80")
              }
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </DashCard>
  );
}

// ---------------------------------------------------------------------------
// Result view
// ---------------------------------------------------------------------------
function ResultView({
  quiz,
  attempt,
  answers,
}: {
  quiz: DailyQuiz;
  attempt: DailyAttempt;
  answers: number[];
}) {
  const pct = attempt.total ? Math.round((attempt.score / attempt.total) * 100) : 0;

  const suggestedCategory = attempt.weaknesses[0] ?? null;

  return (
    <div className="space-y-6">
      <DashCard className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
          <div className="grid place-items-center">
            <div className="relative grid h-40 w-40 place-items-center rounded-full bg-primary/10 text-primary">
              <div className="text-center">
                <div className="text-4xl font-bold">{pct}%</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Score</div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Quiz complete
            </p>
            <h2 className="mt-1 text-2xl font-semibold">
              You scored {attempt.score} / {attempt.total}
            </h2>
            <div className="mt-3 grid grid-cols-3 gap-3 max-w-md">
              <MiniKV label="Correct" value={String(attempt.score)} tone="pos" />
              <MiniKV
                label="Incorrect"
                value={String(attempt.total - attempt.score)}
                tone="neg"
              />
              <MiniKV
                label="Time"
                value={`${Math.max(1, Math.round(attempt.time_spent_seconds / 60))}m`}
              />
            </div>
          </div>
        </div>
      </DashCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <DashCard>
          <SectionHeader title="Topic-wise performance" />
          <CategoryBars categoryScores={attempt.category_scores} />
        </DashCard>
        <DashCard>
          <SectionHeader title="AI insights" />
          <div className="grid gap-4 sm:grid-cols-2">
            <InsightBlock label="Strengths" items={attempt.strengths} tone="pos" />
            <InsightBlock label="Weak areas" items={attempt.weaknesses} tone="neg" />
          </div>
          <div className="mt-5 border-t border-border/60 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Recommended next steps
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <RecCard
                icon={<Compass className="h-4 w-4" />}
                title="Explore courses"
                subtitle={suggestedCategory ? `Boost ${suggestedCategory}` : "Discover new tracks"}
                to="/explore"
              />
              <RecCard
                icon={<Library className="h-4 w-4" />}
                title="Study resources"
                subtitle="Notes, guides & practice"
                to="/resources"
              />
              <RecCard
                icon={<BookOpen className="h-4 w-4" />}
                title="My courses"
                subtitle="Continue where you left off"
                to="/dashboard/student/my-courses"
              />
            </div>
          </div>
        </DashCard>
      </div>

      <DashCard>
        <SectionHeader title="Question-by-question review" />
        <ol className="space-y-4">
          {quiz.questions.map((q, i) => {
            const user = answers[i];
            const correct = user === q.correctIndex;
            return (
              <li
                key={q.id ?? i}
                className="rounded-xl border border-border/60 bg-card/40 p-4"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-muted-foreground">
                    Q{i + 1}
                  </span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">
                    {q.category}
                  </span>
                  <span
                    className={
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold " +
                      (correct
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-destructive/10 text-destructive")
                    }
                  >
                    {correct ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <XCircle className="h-3 w-3" />
                    )}
                    {correct ? "Correct" : "Incorrect"}
                  </span>
                </div>
                <p className="text-sm font-medium">{q.question}</p>
                <div className="mt-3 grid gap-1.5 text-sm">
                  {q.choices.map((c, ci) => {
                    const isUser = user === ci;
                    const isRight = ci === q.correctIndex;
                    return (
                      <div
                        key={ci}
                        className={
                          "flex items-start gap-2 rounded-lg border px-3 py-2 " +
                          (isRight
                            ? "border-emerald-500/50 bg-emerald-500/5"
                            : isUser
                              ? "border-destructive/50 bg-destructive/5"
                              : "border-border/60")
                        }
                      >
                        <span className="text-xs font-semibold text-muted-foreground">
                          {String.fromCharCode(65 + ci)}
                        </span>
                        <span className="flex-1">{c}</span>
                        {isRight && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        )}
                        {isUser && !isRight && (
                          <XCircle className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                    );
                  })}
                </div>
                {q.explanation && (
                  <div className="mt-3 rounded-lg bg-muted/50 p-3 text-sm">
                    <span className="font-semibold text-primary">Explanation · </span>
                    {q.explanation}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </DashCard>

      <div className="flex flex-wrap justify-center gap-2">
        <Link
          to="/dashboard/student"
          className="rounded-lg border border-border/70 bg-card px-4 py-2 text-sm font-medium hover:border-primary/40"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

function CategoryBars({
  categoryScores,
}: {
  categoryScores: Record<string, { correct: number; total: number }>;
}) {
  const entries = useMemo(
    () =>
      Object.entries(categoryScores)
        .map(([cat, s]) => ({
          cat,
          pct: s.total ? Math.round((s.correct / s.total) * 100) : 0,
          correct: s.correct,
          total: s.total,
        }))
        .sort((a, b) => b.pct - a.pct),
    [categoryScores],
  );
  if (entries.length === 0)
    return <p className="text-sm text-muted-foreground">No category data.</p>;
  return (
    <div className="space-y-3">
      {entries.map((e) => (
        <div key={e.cat}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium">{e.cat}</span>
            <span className="text-muted-foreground">
              {e.correct}/{e.total} · {e.pct}%
            </span>
          </div>
          <ProgressBar value={e.pct} />
        </div>
      ))}
    </div>
  );
}

function InsightBlock({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "pos" | "neg";
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground/70">— none —</p>
      ) : (
        <ul className="flex flex-wrap gap-1.5">
          {items.map((it) => (
            <li
              key={it}
              className={
                "rounded-full px-2 py-0.5 text-xs font-medium " +
                (tone === "pos"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400")
              }
            >
              {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MiniKV({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "pos" | "neg";
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-card p-2 text-center">
      <div
        className={
          "text-lg font-semibold " +
          (tone === "pos"
            ? "text-emerald-600 dark:text-emerald-400"
            : tone === "neg"
              ? "text-destructive"
              : "")
        }
      >
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function RecCard({
  icon,
  title,
  subtitle,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="block rounded-xl border border-border/60 bg-card p-3 transition hover:border-primary/40"
    >
      <div className="mb-1 flex items-center gap-2 text-primary">{icon}</div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// History
// ---------------------------------------------------------------------------
function HistorySection() {
  const fetchStats = useServerFn(getDailyQuizStats);
  const { data: stats, isLoading } = useQuery({
    queryKey: ["daily-quiz", "stats"],
    queryFn: () => fetchStats({ data: undefined }),
    staleTime: 30_000,
  });

  if (isLoading) {
    return (
      <DashCard className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </DashCard>
    );
  }

  if (!stats || stats.totalAttempts === 0) {
    return (
      <DashCard className="text-center">
        <Brain className="mx-auto mb-2 h-10 w-10 text-primary" />
        <h3 className="text-lg font-semibold">No attempts yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Take today's quiz to start tracking progress, streaks and AI insights.
        </p>
      </DashCard>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-4">
        <StatTile icon={<Flame className="h-4 w-4" />} label="Streak" value={`${stats.currentStreak}d`} />
        <StatTile icon={<Trophy className="h-4 w-4" />} label="Best" value={`${Math.round(stats.bestScorePct)}%`} />
        <StatTile icon={<TrendingUp className="h-4 w-4" />} label="Weekly avg" value={`${Math.round(stats.weeklyAveragePct)}%`} />
        <StatTile icon={<Sparkles className="h-4 w-4" />} label="Attempts" value={`${stats.totalAttempts}`} />
      </div>

      <DashCard>
        <SectionHeader title="AI performance insights" />
        <div className="grid gap-4 sm:grid-cols-2">
          <InsightBlock label="Consistent strengths" items={stats.aggregateStrengths} tone="pos" />
          <InsightBlock label="Areas to focus on" items={stats.aggregateWeaknesses} tone="neg" />
        </div>
      </DashCard>

      <DashCard>
        <SectionHeader title="Previous scores" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Score</th>
                <th className="py-2 pr-4">%</th>
                <th className="py-2 pr-4">Top strengths</th>
                <th className="py-2 pr-4">Focus on</th>
              </tr>
            </thead>
            <tbody>
              {stats.history.map((h) => (
                <tr key={h.id} className="border-b border-border/40 last:border-0">
                  <td className="py-2 pr-4 text-muted-foreground">
                    {new Date(h.submitted_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-2 pr-4 font-medium">
                    {h.score}/{h.total}
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className={
                        h.pct >= 75
                          ? "font-semibold text-emerald-600 dark:text-emerald-400"
                          : h.pct >= 50
                            ? "font-semibold text-amber-600 dark:text-amber-400"
                            : "font-semibold text-destructive"
                      }
                    >
                      {Math.round(h.pct)}%
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-xs text-muted-foreground">
                    {h.strengths.slice(0, 2).join(", ") || "—"}
                  </td>
                  <td className="py-2 pr-4 text-xs text-muted-foreground">
                    {h.weaknesses.slice(0, 2).join(", ") || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashCard>
    </div>
  );
}
