import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Clock, Loader2, Trophy, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/courses/CourseUI";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_dashboard/dashboard/mock-tests/$testId")({
  component: MockTestRunner,
});

type Test = {
  id: string;
  title: string;
  category: string;
  duration_minutes: number;
  total_questions: number;
  description: string | null;
};
type Question = {
  id: string;
  order_index: number;
  prompt: string;
  choices: string[];
  correct_index: number;
  explanation: string | null;
};

const sb = supabase as unknown as { from: (t: string) => any };

function MockTestRunner() {
  const { testId } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: test, isLoading: loadingTest } = useQuery({
    queryKey: ["mock-test", testId],
    queryFn: async () => {
      const { data, error } = await sb
        .from("mock_tests")
        .select("id, title, category, duration_minutes, total_questions, description")
        .eq("id", testId)
        .maybeSingle();
      if (error) throw error;
      return data as Test | null;
    },
  });

  const { data: questions = [], isLoading: loadingQ } = useQuery({
    queryKey: ["mock-test-questions", testId],
    queryFn: async () => {
      const { data, error } = await sb
        .from("mock_test_questions")
        .select("id, order_index, prompt, choices, correct_index, explanation")
        .eq("test_id", testId)
        .order("order_index");
      if (error) throw error;
      return (data ?? []) as Question[];
    },
  });

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!test) return;
    setRemaining(test.duration_minutes * 60);
  }, [test]);

  useEffect(() => {
    if (submitted || remaining === null) return;
    if (remaining <= 0) {
      setSubmitted(true);
      return;
    }
    const id = setTimeout(() => setRemaining((r) => (r === null ? null : r - 1)), 1000);
    return () => clearTimeout(id);
  }, [remaining, submitted]);

  const answered = Object.keys(answers).length;
  const total = questions.length;
  const score = useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce((s, q) => s + (answers[q.id] === q.correct_index ? 1 : 0), 0);
  }, [submitted, questions, answers]);

  const save = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Sign in required");
      const { error } = await sb.from("mock_test_attempts").insert({
        user_id: u.user.id,
        test_id: testId,
        answers,
        score,
        max_score: total,
        submitted_at: new Date().toISOString(),
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mock-tests", "recent-attempts"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const handleSubmit = () => {
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted && total > 0 && !save.isSuccess && !save.isPending) {
      save.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, total]);

  if (loadingTest || loadingQ) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!test) return <p className="text-sm text-muted-foreground">Test not found.</p>;

  return (
    <>
      <button
        onClick={() => navigate({ to: "/dashboard/mock-tests" })}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All mock tests
      </button>

      <DashboardHeader
        title={test.title}
        description={test.description ?? undefined}
        actions={
          !submitted && remaining !== null ? (
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
          ) : null
        }
      />

      {!submitted ? (
        <>
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{answered}/{total}</span>
            </div>
            <ProgressBar value={total > 0 ? (answered / total) * 100 : 0} />
          </div>

          <ol className="space-y-4">
            {questions.map((q, i) => (
              <li key={q.id} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <p className="mb-3 text-sm font-semibold">
                  {i + 1}. {q.prompt}
                </p>
                <div className="grid gap-2">
                  {q.choices.map((c, idx) => {
                    const selected = answers[q.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition",
                          selected
                            ? "border-primary bg-primary/10"
                            : "border-border/60 hover:border-primary/40",
                        )}
                      >
                        <span className="grid h-6 w-6 place-items-center rounded-full border border-border/60 text-xs font-medium">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{c}</span>
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Button onClick={handleSubmit} disabled={answered === 0}>
              Submit test
            </Button>
          </div>
        </>
      ) : (
        <ResultView test={test} questions={questions} answers={answers} score={score} />
      )}
    </>
  );
}

function ResultView({
  test,
  questions,
  answers,
  score,
}: {
  test: Test;
  questions: Question[];
  answers: Record<string, number>;
  score: number;
}) {
  const total = questions.length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  return (
    <>
      <section className="mb-6 rounded-2xl border border-border/60 bg-card p-6 shadow-card">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
            <Trophy className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Your score</p>
            <p className="text-3xl font-bold">
              {score}/{total} <span className="text-base font-medium text-muted-foreground">· {pct}%</span>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar value={pct} />
        </div>
      </section>

      <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Answer review</h2>
      <ol className="space-y-3">
        {questions.map((q, i) => {
          const chosen = answers[q.id];
          const correct = chosen === q.correct_index;
          return (
            <li key={q.id} className="rounded-2xl border border-border/60 bg-card p-4 text-sm">
              <div className="mb-2 flex items-start gap-2">
                {correct ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                )}
                <p className="font-medium">
                  {i + 1}. {q.prompt}
                </p>
              </div>
              <p className="ml-6 text-xs text-muted-foreground">
                Your answer:{" "}
                <span className={correct ? "text-primary" : "text-destructive"}>
                  {chosen === undefined ? "—" : q.choices[chosen]}
                </span>
                {!correct && (
                  <>
                    {" · "}Correct: <span className="text-primary">{q.choices[q.correct_index]}</span>
                  </>
                )}
              </p>
              {q.explanation && <p className="ml-6 mt-1 text-xs text-muted-foreground">{q.explanation}</p>}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex gap-2">
        <Link to="/dashboard/mock-tests">
          <Button variant="outline">Back to mock tests</Button>
        </Link>
      </div>
    </>
  );
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
