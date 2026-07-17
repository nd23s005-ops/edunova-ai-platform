import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getMockTestCategory, type MockTestCategory } from "./mock-tests.catalog";

export type MockQuestion = {
  id: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type GeneratedMockTest = {
  categoryId: string;
  categoryName: string;
  difficulty: "easy" | "medium" | "hard";
  questions: MockQuestion[];
};

export type MockAttempt = {
  id: string;
  category_id: string;
  category_name: string;
  difficulty: string;
  score: number;
  total: number;
  time_spent_seconds: number;
  category_scores: Record<string, { correct: number; total: number }>;
  strengths: string[];
  weaknesses: string[];
  ai_feedback: string | null;
  submitted_at: string;
  questions: MockQuestion[];
  answers: number[];
};

const QUESTION_COUNT = 30;

async function pickDifficulty(
  supabase: import("@supabase/supabase-js").SupabaseClient,
  userId: string,
  categoryId: string,
  base: MockTestCategory["difficulty"],
): Promise<"easy" | "medium" | "hard"> {
  if (base !== "mixed") return base;
  const { data } = await supabase
    .from("ai_mock_test_attempts")
    .select("score, total")
    .eq("user_id", userId)
    .eq("category_id", categoryId)
    .order("submitted_at", { ascending: false })
    .limit(3);
  const rows = data ?? [];
  if (rows.length === 0) return "medium";
  const avg =
    rows.reduce(
      (sum: number, r: { score: number; total: number }) =>
        sum + (r.total ? (r.score / r.total) * 100 : 0),
      0,
    ) / rows.length;
  if (avg >= 80) return "hard";
  if (avg <= 45) return "easy";
  return "medium";
}

async function generateMockQuestions(params: {
  category: MockTestCategory;
  difficulty: "easy" | "medium" | "hard";
  seed: string;
}): Promise<MockQuestion[]> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");

  const { category, difficulty, seed } = params;

  const system = `You are an expert exam author for EduNova AI's Mock Test Center.
Generate a fresh, non-repetitive mock test of exactly ${QUESTION_COUNT} multiple-choice questions
for the category: "${category.name}".
Cover these subtopics (mix all of them across the 30 questions):
${category.subtopics.map((s) => `- ${s}`).join("\n")}

Target difficulty: ${difficulty}. Vary difficulty across questions (mix easy/medium/hard) but keep the overall level ${difficulty}.

Rules:
- Each question is a standard MCQ with exactly 4 choices.
- Exactly one correct answer per question; provide 0-based "correctIndex".
- Randomize the position of the correct answer across the 30 questions (do NOT always put it at index 0).
- Provide a concise, educational "explanation" for every question.
- No duplicates or near-duplicates. No offensive, unsafe, or politically biased content.
- Every question must include "topic" (a short subtopic label from the list above) and "difficulty" (easy/medium/hard).
- Return STRICT JSON, no markdown, no code fences.

Diversity seed (use to keep sets unique across attempts): ${seed}

Return JSON with the shape: { "questions": Question[] } where Question = {
  "topic": string, "difficulty": "easy"|"medium"|"hard",
  "question": string, "choices": string[4],
  "correctIndex": 0..3, "explanation": string
}`;

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
          content: `Generate ${QUESTION_COUNT} fresh MCQs now for "${category.name}". Return JSON only.`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    if (res.status === 429) throw new Error("AI is busy. Please try again in a minute.");
    if (res.status === 402) throw new Error("AI credits exhausted. Please add credits in workspace billing.");
    throw new Error(`AI error (${res.status}): ${text.slice(0, 200)}`);
  }

  const payload = (await res.json()) as { choices?: { message?: { content?: string } }[] };
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
  const cleaned: MockQuestion[] = [];
  for (let i = 0; i < raw.length && cleaned.length < QUESTION_COUNT; i++) {
    const q = raw[i] as Record<string, unknown> | null;
    if (!q || typeof q !== "object") continue;
    const question = typeof q.question === "string" ? q.question : null;
    const choicesRaw = Array.isArray(q.choices) ? (q.choices as unknown[]) : [];
    const choices = choicesRaw.filter((c): c is string => typeof c === "string").slice(0, 4);
    const correctIndex = typeof q.correctIndex === "number" ? q.correctIndex : -1;
    if (!question || choices.length !== 4 || correctIndex < 0 || correctIndex > 3) continue;
    const diff = q.difficulty;
    cleaned.push({
      id: `q-${i}-${Math.random().toString(36).slice(2, 8)}`,
      topic: typeof q.topic === "string" ? q.topic : category.subtopics[0],
      difficulty: diff === "easy" || diff === "medium" || diff === "hard" ? diff : difficulty,
      question,
      choices,
      correctIndex,
      explanation: typeof q.explanation === "string" ? q.explanation : "",
    });
  }
  if (cleaned.length < 15) throw new Error("Could not generate enough questions. Please try again.");
  // Shuffle question order for randomization across users.
  for (let i = cleaned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cleaned[i], cleaned[j]] = [cleaned[j], cleaned[i]];
  }
  return cleaned;
}

// ---------------- generateMockTest ----------------
const generateSchema = z.object({ categoryId: z.string().min(1) });

export const generateMockTest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => generateSchema.parse(data))
  .handler(async ({ data, context }): Promise<GeneratedMockTest> => {
    const category = getMockTestCategory(data.categoryId);
    if (!category) throw new Error("Unknown category");
    const difficulty = await pickDifficulty(
      context.supabase,
      context.userId,
      category.id,
      category.difficulty,
    );
    const seed = `${context.userId.slice(0, 8)}-${category.id}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const questions = await generateMockQuestions({ category, difficulty, seed });
    return {
      categoryId: category.id,
      categoryName: category.name,
      difficulty,
      questions,
    };
  });

// ---------------- submitMockTest ----------------
const submitSchema = z.object({
  categoryId: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  questions: z.array(
    z.object({
      id: z.string(),
      topic: z.string(),
      difficulty: z.enum(["easy", "medium", "hard"]),
      question: z.string(),
      choices: z.array(z.string()),
      correctIndex: z.number().int(),
      explanation: z.string(),
    }),
  ),
  answers: z.array(z.number().int()),
  timeSpentSeconds: z.number().int().nonnegative().default(0),
});

async function generateAIFeedback(params: {
  categoryName: string;
  pct: number;
  strengths: string[];
  weaknesses: string[];
}): Promise<string> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) return "";
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "You are a supportive study coach for EduNova AI. Write concise, encouraging feedback (max 90 words) with 2-3 actionable next steps for the student.",
          },
          {
            role: "user",
            content: `Category: ${params.categoryName}
Score: ${params.pct}%
Strong topics: ${params.strengths.join(", ") || "none yet"}
Weak topics: ${params.weaknesses.join(", ") || "none identified"}
Give personalised feedback and 2-3 next study steps.`,
          },
        ],
      }),
    });
    if (!res.ok) return "";
    const j = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return j.choices?.[0]?.message?.content?.trim() ?? "";
  } catch {
    return "";
  }
}

export const submitMockTest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => submitSchema.parse(data))
  .handler(async ({ data, context }): Promise<MockAttempt> => {
    const category = getMockTestCategory(data.categoryId);
    if (!category) throw new Error("Unknown category");
    const total = data.questions.length;
    const categoryScores: Record<string, { correct: number; total: number }> = {};
    let score = 0;
    for (let i = 0; i < total; i++) {
      const q = data.questions[i];
      const bucket = (categoryScores[q.topic] ??= { correct: 0, total: 0 });
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
    const pct = total ? Math.round((score / total) * 100) : 0;

    const feedback = await generateAIFeedback({
      categoryName: category.name,
      pct,
      strengths,
      weaknesses,
    });

    const { data: inserted, error } = await context.supabase
      .from("ai_mock_test_attempts")
      .insert({
        user_id: context.userId,
        category_id: category.id,
        category_name: category.name,
        difficulty: data.difficulty,
        questions: data.questions,
        answers: data.answers,
        score,
        total,
        time_spent_seconds: data.timeSpentSeconds,
        category_scores: categoryScores,
        strengths,
        weaknesses,
        ai_feedback: feedback || null,
      })
      .select(
        "id, category_id, category_name, difficulty, score, total, time_spent_seconds, category_scores, strengths, weaknesses, ai_feedback, submitted_at, questions, answers",
      )
      .single();
    if (error) throw error;
    return inserted as unknown as MockAttempt;
  });

// ---------------- getMockTestStats ----------------
export type MockTestStats = {
  totalAttempts: number;
  bestScorePct: number;
  averageScorePct: number;
  attemptsThisWeek: number;
  attemptsThisMonth: number;
  weeklyAveragePct: number;
  perCategory: {
    categoryId: string;
    categoryName: string;
    attempts: number;
    bestPct: number;
    lastPct: number;
    lastAt: string;
  }[];
  history: {
    id: string;
    category_id: string;
    category_name: string;
    score: number;
    total: number;
    pct: number;
    difficulty: string;
    time_spent_seconds: number;
    submitted_at: string;
  }[];
  trend: { date: string; pct: number }[];
};

export const getMockTestStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MockTestStats> => {
    const { data } = await context.supabase
      .from("ai_mock_test_attempts")
      .select("id, category_id, category_name, score, total, difficulty, time_spent_seconds, submitted_at")
      .eq("user_id", context.userId)
      .order("submitted_at", { ascending: false })
      .limit(60);

    type Row = {
      id: string;
      category_id: string;
      category_name: string;
      score: number;
      total: number;
      difficulty: string;
      time_spent_seconds: number;
      submitted_at: string;
    };
    const rows = (data ?? []) as Row[];
    const pctOf = (r: Row) => (r.total ? (r.score / r.total) * 100 : 0);

    const now = Date.now();
    const weekAgo = now - 7 * 24 * 3600 * 1000;
    const monthAgo = now - 30 * 24 * 3600 * 1000;
    const weekRows = rows.filter((r) => new Date(r.submitted_at).getTime() >= weekAgo);
    const monthRows = rows.filter((r) => new Date(r.submitted_at).getTime() >= monthAgo);

    const best = rows.length ? Math.round(Math.max(...rows.map(pctOf)) * 10) / 10 : 0;
    const avg = rows.length
      ? Math.round((rows.reduce((a, r) => a + pctOf(r), 0) / rows.length) * 10) / 10
      : 0;
    const weeklyAvg = weekRows.length
      ? Math.round((weekRows.reduce((a, r) => a + pctOf(r), 0) / weekRows.length) * 10) / 10
      : 0;

    const catMap = new Map<
      string,
      { categoryId: string; categoryName: string; attempts: number; best: number; lastPct: number; lastAt: string }
    >();
    rows.forEach((r) => {
      const p = pctOf(r);
      const c = catMap.get(r.category_id);
      if (!c) {
        catMap.set(r.category_id, {
          categoryId: r.category_id,
          categoryName: r.category_name,
          attempts: 1,
          best: p,
          lastPct: p,
          lastAt: r.submitted_at,
        });
      } else {
        c.attempts += 1;
        c.best = Math.max(c.best, p);
        if (new Date(r.submitted_at).getTime() > new Date(c.lastAt).getTime()) {
          c.lastAt = r.submitted_at;
          c.lastPct = p;
        }
      }
    });
    const perCategory = Array.from(catMap.values())
      .sort((a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime())
      .map((c) => ({
        categoryId: c.categoryId,
        categoryName: c.categoryName,
        attempts: c.attempts,
        bestPct: Math.round(c.best * 10) / 10,
        lastPct: Math.round(c.lastPct * 10) / 10,
        lastAt: c.lastAt,
      }));

    return {
      totalAttempts: rows.length,
      bestScorePct: best,
      averageScorePct: avg,
      attemptsThisWeek: weekRows.length,
      attemptsThisMonth: monthRows.length,
      weeklyAveragePct: weeklyAvg,
      perCategory,
      history: rows.slice(0, 20).map((r) => ({
        id: r.id,
        category_id: r.category_id,
        category_name: r.category_name,
        score: r.score,
        total: r.total,
        pct: Math.round(pctOf(r) * 10) / 10,
        difficulty: r.difficulty,
        time_spent_seconds: r.time_spent_seconds,
        submitted_at: r.submitted_at,
      })),
      trend: rows
        .slice(0, 20)
        .reverse()
        .map((r) => ({
          date: r.submitted_at.slice(0, 10),
          pct: Math.round(pctOf(r) * 10) / 10,
        })),
    };
  });

// ---------------- getMockAttempt ----------------
const attemptSchema = z.object({ attemptId: z.string().uuid() });

export const getMockAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => attemptSchema.parse(d))
  .handler(async ({ data, context }): Promise<MockAttempt> => {
    const { data: row, error } = await context.supabase
      .from("ai_mock_test_attempts")
      .select(
        "id, category_id, category_name, difficulty, score, total, time_spent_seconds, category_scores, strengths, weaknesses, ai_feedback, submitted_at, questions, answers",
      )
      .eq("user_id", context.userId)
      .eq("id", data.attemptId)
      .maybeSingle();
    if (error) throw error;
    if (!row) throw new Error("Attempt not found");
    return row as unknown as MockAttempt;
  });
