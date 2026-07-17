import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Badge,
  EmptyContent,
  ProgressBar,
  Section,
} from "@/components/courses/CourseUI";
import { cn } from "@/lib/utils";

export const Route = createFileRoute(
  "/_dashboard/dashboard/student/courses/$courseId/quiz/$quizId",
)({
  component: QuizPage,
});

type Question = {
  id: string;
  order_index: number;
  type: "mcq" | "true_false" | "fill_blank" | "match";
  prompt: string;
  options: unknown;
  answer: unknown;
  explanation: string | null;
  points: number;
};

type AnswersMap = Record<string, unknown>;

function normalize(v: unknown): string {
  return String(v ?? "").trim().toLowerCase();
}

function isCorrect(q: Question, given: unknown): boolean {
  if (given === undefined || given === null) return false;
  if (q.type === "mcq" || q.type === "true_false" || q.type === "fill_blank") {
    if (Array.isArray(q.answer)) {
      return (q.answer as unknown[]).some((a) => normalize(a) === normalize(given));
    }
    return normalize(q.answer) === normalize(given);
  }
  if (q.type === "match") {
    // answer is a record { leftKey: rightValue }
    if (typeof q.answer !== "object" || !q.answer || typeof given !== "object" || !given) return false;
    const ans = q.answer as Record<string, unknown>;
    const gv = given as Record<string, unknown>;
    const keys = Object.keys(ans);
    if (keys.length === 0) return false;
    return keys.every((k) => normalize(gv[k]) === normalize(ans[k]));
  }
  return false;
}

function QuizPage() {
  const { courseId, quizId } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: quiz, isLoading: quizLoading } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async () => {
      const { data } = await supabase
        .from("quizzes")
        .select("id, chapter_id, title, time_limit_seconds, pass_score")
        .eq("id", quizId)
        .maybeSingle();
      return data;
    },
  });

  const { data: questions } = useQuery({
    queryKey: ["quiz", quizId, "questions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_questions")
        .select("id, order_index, type, prompt, options, answer, explanation, points")
        .eq("quiz_id", quizId)
        .order("order_index");
      if (error) throw error;
      return (data ?? []) as Question[];
    },
  });

  // Load or create attempt
  const { data: attempt } = useQuery({
    queryKey: ["quiz", quizId, "attempt"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("quiz_attempts")
        .select("id, answers, score, max_score, submitted_at, time_taken_seconds")
        .eq("user_id", u.user.id)
        .eq("quiz_id", quizId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data;
    },
  });

  const [answers, setAnswers] = useState<AnswersMap>({});
  const [current, setCurrent] = useState(0);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);

  // Hydrate answers from existing draft attempt (not yet submitted)
  useEffect(() => {
    if (attempt && !attempt.submitted_at) {
      setAttemptId(attempt.id);
      setAnswers((attempt.answers as AnswersMap) ?? {});
    } else if (attempt?.submitted_at) {
      setAttemptId(attempt.id);
      setAnswers((attempt.answers as AnswersMap) ?? {});
      setSubmitted(true);
    }
  }, [attempt]);

  // Ensure attempt exists
  useEffect(() => {
    if (!quiz || submitted || attemptId) return;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data, error } = await supabase
        .from("quiz_attempts")
        .insert({ user_id: u.user.id, quiz_id: quizId, course_id: courseId, answers: {} })
        .select("id")
        .single();
      if (!error && data) setAttemptId(data.id);
    })();
  }, [quiz, submitted, attemptId, quizId, courseId]);

  // Timer
  useEffect(() => {
    if (submitted) return;
    startRef.current = Date.now();
    const t = setInterval(() => {
      if (startRef.current) setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [submitted]);

  // Autosave answers (debounced)
  useEffect(() => {
    if (!attemptId || submitted) return;
    const t = setTimeout(async () => {
      await supabase.from("quiz_attempts").update({ answers: answers as never }).eq("id", attemptId);
    }, 600);
    return () => clearTimeout(t);
  }, [answers, attemptId, submitted]);

  const totalPoints = useMemo(
    () => (questions ?? []).reduce((s, q) => s + (q.points ?? 1), 0),
    [questions],
  );

  const submit = useMutation({
    mutationFn: async () => {
      if (!questions || !attemptId) return;
      let score = 0;
      for (const q of questions) {
        if (isCorrect(q, answers[q.id])) score += q.points ?? 1;
      }
      const percent = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;
      const { error } = await supabase
        .from("quiz_attempts")
        .update({
          answers: answers as never,
          score: percent,
          max_score: 100,
          time_taken_seconds: elapsed,
          submitted_at: new Date().toISOString(),
        })
        .eq("id", attemptId);
      if (error) throw error;
      return percent;
    },
    onSuccess: (percent) => {
      setSubmitted(true);
      toast.success(`Quiz submitted — ${percent}%`);
      qc.invalidateQueries({ queryKey: ["quiz", quizId, "attempt"] });
      qc.invalidateQueries({ queryKey: ["course", courseId, "progress"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  // Auto-submit on timer expiry
  const timeLeft =
    quiz?.time_limit_seconds ? Math.max(0, quiz.time_limit_seconds - elapsed) : null;
  useEffect(() => {
    if (timeLeft === 0 && !submitted && attemptId) submit.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  if (quizLoading || !quiz) {
    return (
      <RoleGate allow={["student"]}>
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </RoleGate>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <RoleGate allow={["student"]}>
        <DashboardHeader title={quiz.title} />
        <EmptyContent title="Questions coming soon" />
      </RoleGate>
    );
  }

  const q = questions[current];
  const answered = questions.filter((qq) => answers[qq.id] !== undefined).length;
  const percentComplete = Math.round((answered / questions.length) * 100);

  if (submitted) {
    const scored = attempt?.score ?? null;
    const passed = scored !== null && scored >= quiz.pass_score;
    return (
      <RoleGate allow={["student"]}>
        <DashboardHeader title={`${quiz.title} — Results`} />
        <Section title={`You scored ${scored ?? "…"}%`} description={passed ? "Passed 🎉" : "Keep practicing"}>
          <ProgressBar value={scored ?? 0} className="mb-6" />
          <ol className="space-y-4">
            {questions.map((qq, i) => {
              const ok = isCorrect(qq, answers[qq.id]);
              return (
                <li key={qq.id} className="rounded-lg border border-border/60 p-4">
                  <div className="flex items-start gap-2">
                    {ok ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="mt-0.5 h-4 w-4 text-destructive" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">
                        Q{i + 1}. {qq.prompt}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Your answer: <b>{String(answers[qq.id] ?? "—")}</b>
                        {!ok && (
                          <>
                            {" · "}Correct: <b>{JSON.stringify(qq.answer)}</b>
                          </>
                        )}
                      </p>
                      {qq.explanation && (
                        <p className="mt-1 text-xs text-muted-foreground">{qq.explanation}</p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="mt-6 flex gap-2">
            <Link
              to="/dashboard/student/courses/$courseId/chapters/$chapterId"
              params={{ courseId, chapterId: quiz.chapter_id }}
              className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Back to chapter
            </Link>
          </div>
        </Section>
      </RoleGate>
    );
  }

  const setAnswer = (v: unknown) => setAnswers((prev) => ({ ...prev, [q.id]: v }));

  return (
    <RoleGate allow={["student"]}>
      <div className="mb-2 text-xs text-muted-foreground">
        <Link
          to="/dashboard/student/courses/$courseId/chapters/$chapterId"
          params={{ courseId, chapterId: quiz.chapter_id }}
          className="inline-flex items-center gap-1 hover:underline"
        >
          <ArrowLeft className="h-3 w-3" /> Back to chapter
        </Link>
      </div>
      <DashboardHeader
        title={quiz.title}
        description={`Question ${current + 1} of ${questions.length}`}
        actions={
          timeLeft !== null ? (
            <Badge tone={timeLeft < 30 ? "warning" : "primary"}>
              <Clock className="mr-1 h-3 w-3" />
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </Badge>
          ) : (
            <Badge>
              <Clock className="mr-1 h-3 w-3" />
              {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
            </Badge>
          )
        }
      />

      <ProgressBar value={percentComplete} className="mb-4" />
      <div className="mb-4 flex flex-wrap gap-1">
        {questions.map((qq, i) => (
          <button
            key={qq.id}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-7 w-7 rounded-md border text-xs font-medium",
              i === current
                ? "border-primary bg-primary text-primary-foreground"
                : answers[qq.id] !== undefined
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600"
                  : "border-border bg-card text-muted-foreground",
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <Section title={`Q${current + 1}. ${q.prompt}`}>
        <QuestionInput q={q} value={answers[q.id]} onChange={setAnswer} />

        <div className="mt-6 flex justify-between gap-2">
          <Button
            variant="outline"
            disabled={current === 0}
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {current < questions.length - 1 ? (
            <Button onClick={() => setCurrent((c) => c + 1)}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              disabled={submit.isPending}
              onClick={() => submit.mutate()}
            >
              {submit.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit quiz
            </Button>
          )}
        </div>
      </Section>
    </RoleGate>
  );
}

function QuestionInput({
  q,
  value,
  onChange,
}: {
  q: Question;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (q.type === "mcq") {
    const opts = (Array.isArray(q.options) ? q.options : []) as string[];
    return (
      <div className="space-y-2">
        {opts.map((o, i) => (
          <label
            key={i}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition",
              value === o ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40",
            )}
          >
            <input
              type="radio"
              className="h-4 w-4"
              checked={value === o}
              onChange={() => onChange(o)}
            />
            <span>{o}</span>
          </label>
        ))}
      </div>
    );
  }
  if (q.type === "true_false") {
    return (
      <div className="flex gap-2">
        {["True", "False"].map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={cn(
              "flex-1 rounded-lg border p-3 text-sm font-medium transition",
              value === o ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    );
  }
  if (q.type === "fill_blank") {
    return (
      <input
        type="text"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer"
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    );
  }
  if (q.type === "match") {
    // options: [{ left, rights: [...] }] and answer: { left: right }
    const opts = (Array.isArray(q.options) ? q.options : []) as Array<{
      left: string;
      rights: string[];
    }>;
    const current = (typeof value === "object" && value ? value : {}) as Record<string, string>;
    return (
      <div className="space-y-2">
        {opts.map((row) => (
          <div key={row.left} className="flex flex-wrap items-center gap-2 rounded-lg border border-border p-3 text-sm">
            <span className="min-w-[8rem] font-medium">{row.left}</span>
            <span className="text-muted-foreground">→</span>
            <select
              value={current[row.left] ?? ""}
              onChange={(e) => onChange({ ...current, [row.left]: e.target.value })}
              className="rounded-md border border-border bg-background px-2 py-1"
            >
              <option value="">— Select —</option>
              {row.rights.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
