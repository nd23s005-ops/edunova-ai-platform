import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  Clock,
  Loader2,
  Trophy,
  CheckCircle2,
  XCircle,
  Sparkles,
  Play,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Target,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/courses/CourseUI";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getMockTestCategory } from "@/lib/ai/mock-tests.catalog";
import {
  generateMockTest,
  submitMockTest,
  type GeneratedMockTest,
  type MockAttempt,
} from "@/lib/ai/mock-tests.functions";

export const Route = createFileRoute("/_dashboard/dashboard/mock-tests/ai/$categoryId")({
  component: AIMockRunner,
});

type Phase = "start" | "running" | "result";

function AIMockRunner() {
  const { categoryId } = Route.useParams();
  const navigate = useNavigate();
  const category = getMockTestCategory(categoryId);

  const genFn = useServerFn(generateMockTest);
  const submitFn = useServerFn(submitMockTest);

  const [phase, setPhase] = useState<Phase>("start");
  const [test, setTest] = useState<GeneratedMockTest | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [current, setCurrent] = useState(0);
  const [remaining, setRemaining] = useState<number | null>(null);
  const startedAt = useRef<number | null>(null);
  const [result, setResult] = useState<MockAttempt | null>(null);

  const generate = useMutation({
    mutationFn: () => genFn({ data: { categoryId } }),
    onSuccess: (t) => {
      setTest(t);
      setAnswers({});
      setCurrent(0);
      startedAt.current = Date.now();
      setRemaining((category?.durationMinutes ?? 30) * 60);
      setPhase("running");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const submit = useMutation({
    mutationFn: async () => {
      if (!test || !category) throw new Error("Missing test");
      const answerArr = test.questions.map((_, i) => (answers[i] ?? -1));
      const timeSpent = startedAt.current
        ? Math.floor((Date.now() - startedAt.current) / 1000)
        : 0;
      return submitFn({
        data: {
          categoryId: category.id,
          difficulty: test.difficulty,
          questions: test.questions,
          answers: answerArr,
          timeSpentSeconds: timeSpent,
        },
      });
    },
    onSuccess: (r) => {
      setResult(r);
      setPhase("result");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  // Countdown
  useEffect(() => {
    if (phase !== "running" || remaining === null) return;
    if (remaining <= 0) {
      submit.mutate();
      return;
    }
    const id = setTimeout(() => setRemaining((r) => (r === null ? null : r - 1)), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, phase]);

  if (!category) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Category not found.
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => navigate({ to: "/dashboard/mock-tests/ai" })}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> AI Mock Test Center
      </button>

      {phase === "start" && (
        <StartScreen
          categoryName={category.name}
          emoji={category.emoji}
          description={category.description}
          subtopics={category.subtopics}
          durationMinutes={category.durationMinutes}
          questionCount={category.questionCount}
          isLoading={generate.isPending}
          onStart={() => generate.mutate()}
        />
      )}

      {phase === "running" && test && (
        <RunnerScreen
          test={test}
          category={category}
          current={current}
          setCurrent={setCurrent}
          answers={answers}
          setAnswers={setAnswers}
          remaining={remaining ?? 0}
          submitting={submit.isPending}
          onSubmit={() => submit.mutate()}
        />
      )}

      {phase === "result" && result && (
        <ResultScreen result={result} onRetake={() => generate.mutate()} retaking={generate.isPending} />
      )}
    </>
  );
}

function StartScreen({
  categoryName,
  emoji,
  description,
  subtopics,
  durationMinutes,
  questionCount,
  isLoading,
  onStart,
}: {
  categoryName: string;
  emoji: string;
  description: string;
  subtopics: string[];
  durationMinutes: number;
  questionCount: number;
  isLoading: boolean;
  onStart: () => void;
}) {
  return (
    <>
      <DashboardHeader
        title={
          <span className="inline-flex items-center gap-2">
            <span aria-hidden>{emoji}</span> {categoryName}
          </span>
        }
        description={description}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Questions</div>
          <p className="mt-1 text-2xl font-bold">{questionCount}</p>
          <p className="text-xs text-muted-foreground">MCQs · 1 mark each</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Duration</div>
          <p className="mt-1 text-2xl font-bold">{durationMinutes} min</p>
          <p className="text-xs text-muted-foreground">Auto-submits when time is up</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Format</div>
          <p className="mt-1 text-2xl font-bold">AI-generated</p>
          <p className="text-xs text-muted-foreground">Fresh questions every attempt</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Topics covered</h3>
        <div className="flex flex-wrap gap-2">
          {subtopics.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs text-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse items-stretch gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-muted-foreground">
          Difficulty adapts to your recent performance. You'll get personalised AI feedback after submitting.
        </p>
        <Button onClick={onStart} disabled={isLoading} size="lg" className="md:min-w-[180px]">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparing test…
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" /> Start test
            </>
          )}
        </Button>
      </div>
    </>
  );
}

function RunnerScreen({
  test,
  category,
  current,
  setCurrent,
  answers,
  setAnswers,
  remaining,
  submitting,
  onSubmit,
}: {
  test: GeneratedMockTest;
  category: { name: string; emoji: string };
  current: number;
  setCurrent: (n: number) => void;
  answers: Record<number, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  remaining: number;
  submitting: boolean;
  onSubmit: () => void;
}) {
  const q = test.questions[current];
  const total = test.questions.length;
  const answered = Object.keys(answers).length;

  return (
    <>
      <DashboardHeader
        title={
          <span className="inline-flex items-center gap-2">
            <span aria-hidden>{category.emoji}</span> {category.name}
          </span>
        }
        description={`Question ${current + 1} of ${total} · ${test.difficulty} difficulty`}
        actions={
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium",
              remaining < 60
                ? "border-destructive/40 bg-destructive/10 text-destructive"
                : "border-border/60 bg-card text-muted-foreground",
            )}
          >
            <Clock className="h-4 w-4" /> {formatTime(remaining)}
          </span>
        }
      />

      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>
            {answered}/{total} answered
          </span>
        </div>
        <ProgressBar value={total > 0 ? (answered / total) * 100 : 0} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{q.topic}</span>
            <span className="rounded-full border border-border/60 px-2 py-0.5 capitalize">
              {q.difficulty}
            </span>
          </div>
          <p className="text-base font-semibold leading-relaxed">
            {current + 1}. {q.question}
          </p>
          <div className="mt-4 grid gap-2">
            {q.choices.map((c, idx) => {
              const selected = answers[current] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setAnswers((a) => ({ ...a, [current]: idx }))}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition",
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-border/60 hover:border-primary/40",
                  )}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border/60 text-xs font-medium">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{c}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              disabled={current === 0}
              onClick={() => setCurrent(Math.max(0, current - 1))}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Previous
            </Button>
            {current < total - 1 ? (
              <Button onClick={() => setCurrent(Math.min(total - 1, current + 1))}>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={onSubmit} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>Submit test</>
                )}
              </Button>
            )}
          </div>
        </div>

        <aside className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Question map
          </h4>
          <div className="grid grid-cols-6 gap-1.5 lg:grid-cols-5">
            {test.questions.map((_, i) => {
              const isAnswered = answers[i] !== undefined;
              const isCurrent = i === current;
              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-md border text-xs font-medium transition",
                    isCurrent
                      ? "border-primary bg-primary text-primary-foreground"
                      : isAnswered
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border/60 text-muted-foreground hover:border-primary/40",
                  )}
                  aria-label={`Question ${i + 1}${isAnswered ? " (answered)" : ""}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={onSubmit}
            disabled={submitting || answered === 0}
          >
            Submit early
          </Button>
        </aside>
      </div>
    </>
  );
}

function ResultScreen({
  result,
  onRetake,
  retaking,
}: {
  result: MockAttempt;
  onRetake: () => void;
  retaking: boolean;
}) {
  const total = result.total;
  const pct = total > 0 ? Math.round((result.score / total) * 100) : 0;
  const correct = result.score;
  const incorrect = total - correct;
  const minutes = Math.floor(result.time_spent_seconds / 60);
  const seconds = result.time_spent_seconds % 60;

  const topicRows = useMemo(() => {
    return Object.entries(result.category_scores).map(([topic, s]) => ({
      topic,
      correct: s.correct,
      total: s.total,
      pct: s.total ? Math.round((s.correct / s.total) * 100) : 0,
    }));
  }, [result.category_scores]);

  return (
    <>
      <DashboardHeader
        title={
          <span className="inline-flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" /> {result.category_name} — Results
          </span>
        }
        description={`Submitted ${new Date(result.submitted_at).toLocaleString()}`}
      />

      <section className="mb-6 rounded-2xl border border-border/60 bg-card p-6 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Your score</p>
            <p className="text-4xl font-bold">
              {result.score}/{total}
              <span className="ml-2 text-lg font-medium text-muted-foreground">· {pct}%</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 md:min-w-[400px]">
            <ResultTile label="Correct" value={correct} tone="pos" />
            <ResultTile label="Incorrect" value={incorrect} tone="neg" />
            <ResultTile
              label="Time"
              value={`${minutes}m ${String(seconds).padStart(2, "0")}s`}
            />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar value={pct} />
        </div>
      </section>

      {result.ai_feedback && (
        <section className="mb-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-primary" /> AI feedback
          </h3>
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
            {result.ai_feedback}
          </p>
        </section>
      )}

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Target className="h-4 w-4 text-primary" /> Strengths
          </h3>
          {result.strengths.length ? (
            <div className="flex flex-wrap gap-2">
              {result.strengths.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Keep practising to reveal strong topics.</p>
          )}
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <BookOpen className="h-4 w-4 text-destructive" /> Areas to improve
          </h3>
          {result.weaknesses.length ? (
            <div className="flex flex-wrap gap-2">
              {result.weaknesses.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-destructive/40 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Great — no weak topics in this attempt.</p>
          )}
        </div>
      </div>

      <section className="mb-6 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <h3 className="mb-3 text-sm font-semibold">Topic-wise performance</h3>
        <ul className="space-y-2">
          {topicRows.map((r) => (
            <li key={r.topic} className="grid grid-cols-[1fr_auto] gap-3 text-sm">
              <div>
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{r.topic}</span>
                  <span>
                    {r.correct}/{r.total} · {r.pct}%
                  </span>
                </div>
                <ProgressBar value={r.pct} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Answer review</h3>
      <ol className="space-y-3">
        {result.questions.map((q, i) => {
          const chosen = result.answers[i];
          const correct = chosen === q.correctIndex;
          return (
            <li
              key={q.id + i}
              className="rounded-2xl border border-border/60 bg-card p-4 text-sm"
            >
              <div className="mb-2 flex items-start gap-2">
                {correct ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                )}
                <p className="font-medium">
                  {i + 1}. {q.question}
                </p>
              </div>
              <p className="ml-6 text-xs text-muted-foreground">
                Your answer:{" "}
                <span className={correct ? "text-primary" : "text-destructive"}>
                  {chosen === -1 || chosen === undefined ? "—" : q.choices[chosen]}
                </span>
                {!correct && (
                  <>
                    {" · "}Correct:{" "}
                    <span className="text-primary">{q.choices[q.correctIndex]}</span>
                  </>
                )}
              </p>
              {q.explanation && (
                <p className="ml-6 mt-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Explanation:</span> {q.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button onClick={onRetake} disabled={retaking}>
          {retaking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparing…
            </>
          ) : (
            <>Retake with new questions</>
          )}
        </Button>
        <Link to="/dashboard/mock-tests/ai">
          <Button variant="outline">Back to AI Mock Center</Button>
        </Link>
        <Link to="/dashboard/student/browse">
          <Button variant="ghost">Explore courses</Button>
        </Link>
        <Link to="/dashboard/resources">
          <Button variant="ghost">Browse resources</Button>
        </Link>
      </div>
    </>
  );
}

function ResultTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  tone?: "pos" | "neg";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-3 text-center",
        tone === "pos"
          ? "border-primary/30 bg-primary/5"
          : tone === "neg"
            ? "border-destructive/30 bg-destructive/5"
            : "border-border/60 bg-background",
      )}
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
