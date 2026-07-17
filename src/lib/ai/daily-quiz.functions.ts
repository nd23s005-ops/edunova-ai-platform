import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// ---- Shared types (also consumed by UI) --------------------------------
export type DailyQuestion = {
  id: string;
  type: "mcq" | "true_false" | "fill_blank" | "match" | "reasoning" | "scenario";
  category: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  choices: string[]; // always 2-4 options, index-based answer
  correctIndex: number;
  explanation: string;
};

export type DailyQuiz = {
  id: string;
  quiz_date: string;
  difficulty: string;
  questions: DailyQuestion[];
};

export type DailyAttempt = {
  id: string;
  quiz_id: string;
  score: number;
  total: number;
  category_scores: Record<string, { correct: number; total: number }>;
  strengths: string[];
  weaknesses: string[];
  time_spent_seconds: number;
  submitted_at: string;
  answers: number[];
};

const CATEGORIES = [
  "General Knowledge",
  "Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Artificial Intelligence",
  "Programming",
  "Technology",
  "Current Affairs",
  "Logical Reasoning",
  "Aptitude",
  "English Grammar",
  "Vocabulary",
  "History",
  "Geography",
];

const QUESTION_COUNT = 30;

// -----------------------------------------------------------------------
// AI generation
// -----------------------------------------------------------------------
async function generateQuestionsWithAI(params: {
  grade: number | null;
  difficulty: "easy" | "medium" | "hard";
  seed: string;
}): Promise<DailyQuestion[]> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");

  const gradeLine = params.grade
    ? `The learner is in Grade ${params.grade}. Calibrate vocabulary, examples, and reasoning depth to this grade.`
    : `The learner is a school student (grades 6-12). Keep the content grade-appropriate.`;

  const system = `You are an expert quiz author for EduNova AI, a K-12 & upskilling learning platform.
Generate a fresh, high-quality daily practice quiz with exactly ${QUESTION_COUNT} questions.
${gradeLine}
Target overall difficulty: ${params.difficulty}.
Distribute questions across these categories (mix as many as possible):
${CATEGORIES.join(", ")}.
Include a variety of question TYPES:
- mcq (standard multiple choice)
- true_false (choices must be exactly ["True", "False"])
- fill_blank (question uses "____"; choices are 4 plausible fills)
- reasoning (short logical reasoning MCQ)
- scenario (short real-life scenario MCQ)
- match (question asks which pairing set is correct; choices are 4 candidate pairing lists)

Rules:
- Every question must have 2-4 "choices" and a valid "correctIndex" (0-based).
- Provide a concise, educational "explanation" for every question.
- No duplicate or near-duplicate questions.
- No offensive, unsafe, or politically biased content.
- Every question must have "topic" (short label) and "category" (from the list above).
- Return STRICT JSON matching the schema. Do not include commentary, markdown, or code fences.

Diversity seed (use to vary content across days): ${params.seed}
Return JSON with shape: { "questions": Question[] }`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: `Generate ${QUESTION_COUNT} diverse questions now. Ensure variety of categories and types. Return JSON only.`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    if (res.status === 429) throw new Error("AI is busy right now. Please try again in a minute.");
    if (res.status === 402) throw new Error("AI credits are exhausted. Please add credits in workspace billing.");
    throw new Error(`AI error (${res.status}): ${text.slice(0, 200)}`);
  }

  const payload = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = payload.choices?.[0]?.message?.content ?? "{}";
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("AI returned invalid JSON");
  }

  const raw =
    (parsed as { questions?: unknown[] }).questions ??
    (Array.isArray(parsed) ? (parsed as unknown[]) : []);
  const cleaned: DailyQuestion[] = [];
  for (let i = 0; i < raw.length && cleaned.length < QUESTION_COUNT; i++) {
    const q = raw[i] as Record<string, unknown> | null;
    if (!q || typeof q !== "object") continue;
    const question = typeof q.question === "string" ? q.question : null;
    const choicesRaw = Array.isArray(q.choices) ? (q.choices as unknown[]) : [];
    const choices = choicesRaw.filter((c): c is string => typeof c === "string").slice(0, 4);
    const correctIndex = typeof q.correctIndex === "number" ? q.correctIndex : -1;
    if (!question || choices.length < 2 || correctIndex < 0 || correctIndex >= choices.length) continue;
    const type = (typeof q.type === "string" ? q.type : "mcq") as DailyQuestion["type"];
    const allowed: DailyQuestion["type"][] = [
      "mcq",
      "true_false",
      "fill_blank",
      "match",
      "reasoning",
      "scenario",
    ];
    cleaned.push({
      id: `${Date.now()}-${i}`,
      type: allowed.includes(type) ? type : "mcq",
      category:
        typeof q.category === "string" && q.category.trim() ? q.category.trim() : "General Knowledge",
      topic: typeof q.topic === "string" ? q.topic : "",
      difficulty:
        q.difficulty === "easy" || q.difficulty === "medium" || q.difficulty === "hard"
          ? q.difficulty
          : params.difficulty,
      question,
      choices,
      correctIndex,
      explanation: typeof q.explanation === "string" ? q.explanation : "",
    });
  }
  if (cleaned.length < 10) throw new Error("Could not generate enough questions. Please try again.");
  return cleaned;
}

function todayISO(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(
    d.getUTCDate(),
  ).padStart(2, "0")}`;
}

async function pickDifficulty(
  supabase: import("@supabase/supabase-js").SupabaseClient,
  userId: string,
): Promise<"easy" | "medium" | "hard"> {
  const { data } = await supabase
    .from("daily_quiz_attempts")
    .select("score, total")
    .eq("user_id", userId)
    .order("submitted_at", { ascending: false })
    .limit(3);
  const rows = data ?? [];
  if (rows.length === 0) return "medium";
  const avg =
    rows.reduce((sum, r) => sum + (r.total ? (r.score / r.total) * 100 : 0), 0) / rows.length;
  if (avg >= 80) return "hard";
  if (avg <= 45) return "easy";
  return "medium";
}

// -----------------------------------------------------------------------
// getTodaysQuiz — returns today's quiz (creates it on demand)
// -----------------------------------------------------------------------
export const getTodaysQuiz = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const today = todayISO();

    const { data: existing } = await supabase
      .from("daily_quizzes")
      .select("id, quiz_date, difficulty, questions")
      .eq("user_id", userId)
      .eq("quiz_date", today)
      .maybeSingle();

    if (existing) {
      return existing as unknown as DailyQuiz;
    }

    // Student grade for adaptive difficulty
    const { data: sp } = await supabase
      .from("student_profiles")
      .select("current_class")
      .eq("user_id", userId)
      .maybeSingle();

    const difficulty = await pickDifficulty(supabase, userId);
    const seed = `${userId.slice(0, 8)}-${today}-${Math.floor(Math.random() * 1e6)}`;
    const questions = await generateQuestionsWithAI({
      grade: sp?.current_class ?? null,
      difficulty,
      seed,
    });

    const { data: inserted, error } = await supabase
      .from("daily_quizzes")
      .insert({
        user_id: userId,
        quiz_date: today,
        difficulty,
        questions,
      })
      .select("id, quiz_date, difficulty, questions")
      .single();
    if (error) throw error;
    return inserted as unknown as DailyQuiz;
  });

// -----------------------------------------------------------------------
// submitDailyQuiz
// -----------------------------------------------------------------------
const submitSchema = z.object({
  quizId: z.string().uuid(),
  answers: z.array(z.number().int()),
  timeSpentSeconds: z.number().int().nonnegative().default(0),
});

export const submitDailyQuiz = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => submitSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: quiz, error: qerr } = await supabase
      .from("daily_quizzes")
      .select("id, questions")
      .eq("id", data.quizId)
      .eq("user_id", userId)
      .maybeSingle();
    if (qerr) throw qerr;
    if (!quiz) throw new Error("Quiz not found");

    const questions = quiz.questions as unknown as DailyQuestion[];
    const total = questions.length;
    const categoryScores: Record<string, { correct: number; total: number }> = {};
    let score = 0;
    for (let i = 0; i < total; i++) {
      const q = questions[i];
      const bucket = (categoryScores[q.category] ??= { correct: 0, total: 0 });
      bucket.total += 1;
      if (data.answers[i] === q.correctIndex) {
        score += 1;
        bucket.correct += 1;
      }
    }

    const perf = Object.entries(categoryScores).map(([cat, s]) => ({
      cat,
      pct: s.total ? s.correct / s.total : 0,
    }));
    const strengths = perf
      .filter((p) => p.pct >= 0.75)
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 5)
      .map((p) => p.cat);
    const weaknesses = perf
      .filter((p) => p.pct < 0.5)
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 5)
      .map((p) => p.cat);

    const { data: attempt, error } = await supabase
      .from("daily_quiz_attempts")
      .insert({
        quiz_id: data.quizId,
        user_id: userId,
        answers: data.answers,
        score,
        total,
        category_scores: categoryScores,
        strengths,
        weaknesses,
        time_spent_seconds: data.timeSpentSeconds,
      })
      .select("id, quiz_id, score, total, category_scores, strengths, weaknesses, time_spent_seconds, submitted_at, answers")
      .single();
    if (error) throw error;
    return attempt as unknown as DailyAttempt;
  });

// -----------------------------------------------------------------------
// getQuizStats — summary for dashboard widget + history
// -----------------------------------------------------------------------
export type QuizStats = {
  bestScorePct: number;
  currentStreak: number;
  weeklyAveragePct: number;
  attemptsThisWeek: number;
  totalAttempts: number;
  todayAttempted: boolean;
  todayAttemptId: string | null;
  history: {
    id: string;
    submitted_at: string;
    score: number;
    total: number;
    pct: number;
    strengths: string[];
    weaknesses: string[];
  }[];
  aggregateStrengths: string[];
  aggregateWeaknesses: string[];
};

export const getDailyQuizStats = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<QuizStats> => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("daily_quiz_attempts")
      .select("id, quiz_id, score, total, submitted_at, strengths, weaknesses, category_scores")
      .eq("user_id", userId)
      .order("submitted_at", { ascending: false })
      .limit(30);
    const rows = data ?? [];
    const today = todayISO();

    // today's attempt (based on latest quiz for today)
    const { data: todayQuiz } = await supabase
      .from("daily_quizzes")
      .select("id")
      .eq("user_id", userId)
      .eq("quiz_date", today)
      .maybeSingle();
    const todayAttempt = todayQuiz ? rows.find((r) => r.quiz_id === todayQuiz.id) ?? null : null;

    // streak: consecutive days ending today or yesterday
    const days = new Set(
      rows.map((r) => new Date(r.submitted_at).toISOString().slice(0, 10)),
    );
    let streak = 0;
    const cursor = new Date();
    // if no attempt today, streak counted from yesterday
    if (!days.has(today)) cursor.setUTCDate(cursor.getUTCDate() - 1);
    for (;;) {
      const key = cursor.toISOString().slice(0, 10);
      if (days.has(key)) {
        streak += 1;
        cursor.setUTCDate(cursor.getUTCDate() - 1);
      } else break;
    }

    // weekly window (7 days)
    const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
    const weekRows = rows.filter((r) => new Date(r.submitted_at).getTime() >= weekAgo);
    const weeklyAvg =
      weekRows.length > 0
        ? Math.round(
            (weekRows.reduce((a, r) => a + (r.total ? (r.score / r.total) * 100 : 0), 0) /
              weekRows.length) *
              10,
          ) / 10
        : 0;

    const best =
      rows.length > 0
        ? Math.round(
            Math.max(...rows.map((r) => (r.total ? (r.score / r.total) * 100 : 0))) * 10,
          ) / 10
        : 0;

    // aggregate strengths / weaknesses across last 10 attempts
    const strengthCount: Record<string, number> = {};
    const weaknessCount: Record<string, number> = {};
    rows.slice(0, 10).forEach((r) => {
      (r.strengths ?? []).forEach((s: string) => (strengthCount[s] = (strengthCount[s] ?? 0) + 1));
      (r.weaknesses ?? []).forEach((s: string) => (weaknessCount[s] = (weaknessCount[s] ?? 0) + 1));
    });
    const aggStrengths = Object.entries(strengthCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map((x) => x[0]);
    const aggWeaknesses = Object.entries(weaknessCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map((x) => x[0]);

    return {
      bestScorePct: best,
      currentStreak: streak,
      weeklyAveragePct: weeklyAvg,
      attemptsThisWeek: weekRows.length,
      totalAttempts: rows.length,
      todayAttempted: !!todayAttempt,
      todayAttemptId: todayAttempt?.id ?? null,
      history: rows.slice(0, 10).map((r) => ({
        id: r.id,
        submitted_at: r.submitted_at,
        score: r.score,
        total: r.total,
        pct: r.total ? Math.round((r.score / r.total) * 1000) / 10 : 0,
        strengths: r.strengths ?? [],
        weaknesses: r.weaknesses ?? [],
      })),
      aggregateStrengths: aggStrengths,
      aggregateWeaknesses: aggWeaknesses,
    };
  });
