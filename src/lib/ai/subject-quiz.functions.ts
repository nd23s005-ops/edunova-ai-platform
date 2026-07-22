import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// ---------------------------------------------------------------
// Subject Quiz — AI-generated per subject / quiz set (Classes 6–12)
// ---------------------------------------------------------------

export const SUBJECTS = [
  { slug: "physics", label: "Physics", accent: "from-blue-500/20 to-cyan-500/10", level: "school" },
  { slug: "chemistry", label: "Chemistry", accent: "from-emerald-500/20 to-teal-500/10", level: "school" },
  { slug: "mathematics", label: "Mathematics", accent: "from-amber-500/20 to-orange-500/10", level: "school" },
  { slug: "biology", label: "Biology", accent: "from-lime-500/20 to-green-500/10", level: "school" },
  { slug: "botany", label: "Botany", accent: "from-green-500/20 to-emerald-500/10", level: "school" },
  { slug: "zoology", label: "Zoology", accent: "from-rose-500/20 to-pink-500/10", level: "school" },
  { slug: "english", label: "English", accent: "from-violet-500/20 to-fuchsia-500/10", level: "school" },
] as const;

export const COLLEGE_SUBJECTS = [
  { slug: "programming", label: "Programming Fundamentals", accent: "from-indigo-500/20 to-blue-500/10", level: "college" },
  { slug: "c-programming", label: "C Programming", accent: "from-slate-500/20 to-zinc-500/10", level: "college" },
  { slug: "java", label: "Java", accent: "from-orange-500/20 to-amber-500/10", level: "college" },
  { slug: "python", label: "Python", accent: "from-yellow-500/20 to-amber-500/10", level: "college" },
  { slug: "javascript", label: "JavaScript", accent: "from-amber-500/20 to-yellow-500/10", level: "college" },
  { slug: "react", label: "React", accent: "from-cyan-500/20 to-sky-500/10", level: "college" },
  { slug: "nodejs", label: "Node.js", accent: "from-emerald-500/20 to-green-500/10", level: "college" },
  { slug: "sql", label: "SQL", accent: "from-blue-500/20 to-indigo-500/10", level: "college" },
  { slug: "dbms", label: "DBMS", accent: "from-teal-500/20 to-cyan-500/10", level: "college" },
  { slug: "operating-systems", label: "Operating Systems", accent: "from-fuchsia-500/20 to-purple-500/10", level: "college" },
  { slug: "computer-networks", label: "Computer Networks", accent: "from-sky-500/20 to-blue-500/10", level: "college" },
  { slug: "dsa", label: "Data Structures & Algorithms", accent: "from-rose-500/20 to-red-500/10", level: "college" },
  { slug: "system-design", label: "System Design", accent: "from-purple-500/20 to-violet-500/10", level: "college" },
  { slug: "cloud-computing", label: "Cloud Computing", accent: "from-sky-500/20 to-cyan-500/10", level: "college" },
  { slug: "cyber-security", label: "Cyber Security", accent: "from-red-500/20 to-rose-500/10", level: "college" },
  { slug: "artificial-intelligence", label: "Artificial Intelligence", accent: "from-violet-500/20 to-fuchsia-500/10", level: "college" },
  { slug: "machine-learning", label: "Machine Learning", accent: "from-pink-500/20 to-rose-500/10", level: "college" },
  { slug: "prompt-engineering", label: "Prompt Engineering", accent: "from-emerald-500/20 to-teal-500/10", level: "college" },
] as const;

const ALL_SUBJECTS = [...SUBJECTS, ...COLLEGE_SUBJECTS] as ReadonlyArray<{ slug: string; label: string; accent: string; level: string }>;

export const QUIZ_SETS = [1, 2, 3, 4, 5] as const;
export const QUESTION_COUNT = 15;

export type SubjectSlug = (typeof SUBJECTS)[number]["slug"] | (typeof COLLEGE_SUBJECTS)[number]["slug"];
export type Difficulty = "easy" | "medium" | "hard" | "expert";

export type SubjectQuestion = {
  id: string;
  type: "mcq" | "true_false" | "fill_blank" | "match" | "assertion_reason" | "numerical" | "short";
  topic: string;
  difficulty: Difficulty;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type SubjectAttempt = {
  id: string;
  subject: string;
  quiz_set: number;
  difficulty: string;
  questions: SubjectQuestion[];
  answers: number[];
  score: number;
  total: number;
  category_scores: Record<string, { correct: number; total: number }>;
  strengths: string[];
  weaknesses: string[];
  time_spent_seconds: number;
  ai_feedback: string | null;
  submitted_at: string | null;
  created_at: string;
};

function isSubject(v: string): v is SubjectSlug {
  return ALL_SUBJECTS.some((s) => s.slug === v);
}

function subjectLabel(slug: string) {
  return ALL_SUBJECTS.find((s) => s.slug === slug)?.label ?? slug;
}

function subjectLevel(slug: string): "school" | "college" {
  return (ALL_SUBJECTS.find((s) => s.slug === slug)?.level ?? "school") as "school" | "college";
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = arr.slice();
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Adaptive difficulty from recent attempts on this subject/set
async function pickDifficulty(
  supabase: import("@supabase/supabase-js").SupabaseClient,
  userId: string,
  subject: string,
  quizSet: number,
): Promise<Difficulty> {
  const { data } = await supabase
    .from("subject_quiz_attempts")
    .select("score, total, difficulty")
    .eq("user_id", userId)
    .eq("subject", subject)
    .eq("quiz_set", quizSet)
    .not("submitted_at", "is", null)
    .order("submitted_at", { ascending: false })
    .limit(3);
  const rows = (data ?? []) as { score: number; total: number; difficulty: string }[];
  if (rows.length === 0) return "medium";
  const avg =
    rows.reduce((s, r) => s + (r.total ? (r.score / r.total) * 100 : 0), 0) / rows.length;
  const last = rows[0].difficulty as Difficulty;
  if (avg >= 85) return last === "hard" ? "expert" : last === "expert" ? "expert" : "hard";
  if (avg >= 65) return last === "easy" ? "medium" : last === "expert" ? "hard" : last || "medium";
  if (avg <= 40) return "easy";
  return "medium";
}

async function fetchPriorQuestionStems(
  supabase: import("@supabase/supabase-js").SupabaseClient,
  userId: string,
  subject: string,
): Promise<string[]> {
  const { data } = await supabase
    .from("subject_quiz_attempts")
    .select("questions")
    .eq("user_id", userId)
    .eq("subject", subject)
    .order("created_at", { ascending: false })
    .limit(6);
  const stems: string[] = [];
  for (const row of data ?? []) {
    const qs = (row as { questions?: SubjectQuestion[] }).questions ?? [];
    for (const q of qs) if (q?.question) stems.push(q.question);
  }
  return stems.slice(0, 60);
}

async function callAI(system: string, user: string): Promise<string> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    if (res.status === 429) throw new Error("AI is busy right now. Please try again in a minute.");
    if (res.status === 402) throw new Error("AI credits are exhausted. Add credits in workspace billing.");
    throw new Error(`AI error (${res.status}): ${t.slice(0, 200)}`);
  }
  const payload = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return payload.choices?.[0]?.message?.content ?? "{}";
}

async function generateQuestions(params: {
  subject: string;
  quizSet: number;
  grade: number | null;
  board: string | null;
  difficulty: Difficulty;
  avoid: string[];
  seed: string;
}): Promise<SubjectQuestion[]> {
  const gradeLine = params.grade
    ? `Learner is in Class ${params.grade}.`
    : `Learner is a school student (Classes 6-12).`;
  const boardLine = params.board
    ? `Follow the ${params.board.toUpperCase()} board syllabus.`
    : `Follow CBSE or common state-board syllabus.`;

  const system = `You are an expert quiz author for EduNova AI for ${subjectLabel(params.subject)} (Classes 6–12).
${gradeLine} ${boardLine}
Generate a FRESH quiz of exactly ${QUESTION_COUNT} questions for "${subjectLabel(params.subject)} — Quiz Set ${params.quizSet}".
Target overall difficulty: ${params.difficulty}.
Cover a MIX of chapters typical for ${subjectLabel(params.subject)} at this class range. Vary chapters between attempts.

Use a variety of question TYPES:
- mcq (standard multiple choice, 4 options)
- true_false (choices exactly ["True", "False"])
- fill_blank (question contains "____"; 4 plausible fills)
- match (question describes the pairs to match; 4 candidate pairing sets as choices)
- assertion_reason (choices exactly ["Both A and R are true and R explains A","Both A and R are true but R does not explain A","A is true, R is false","A is false, R is true"])
- numerical (numerical problem, 4 numeric options — only for Physics/Chemistry/Math where applicable)
- short (short analytical MCQ)

Hard rules:
- Every question must have 2-4 "choices" and a valid 0-based "correctIndex".
- Every question needs a concise educational "explanation".
- Every question needs a "topic" (short chapter/topic label) and "difficulty" (easy|medium|hard|expert).
- Do NOT repeat, near-duplicate, or paraphrase any of the AVOID_LIST questions.
- Use different numerical values, contexts and scenarios than any recent attempt.
- No unsafe or biased content.
- Return STRICT JSON only. No commentary, no markdown, no code fences.

Diversity seed: ${params.seed}
AVOID_LIST (do not reuse these questions or trivial paraphrases):
${params.avoid.slice(0, 40).map((q, i) => `${i + 1}. ${q}`).join("\n") || "(none)"}

Return JSON shape: { "questions": Question[] }`;

  const content = await callAI(
    system,
    `Generate ${QUESTION_COUNT} fresh diverse questions now for ${subjectLabel(params.subject)} Quiz Set ${params.quizSet}. Return JSON only.`,
  );

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("AI returned invalid JSON");
  }
  const rawList =
    (parsed as { questions?: unknown[] }).questions ??
    (Array.isArray(parsed) ? (parsed as unknown[]) : []);

  const allowedTypes: SubjectQuestion["type"][] = [
    "mcq",
    "true_false",
    "fill_blank",
    "match",
    "assertion_reason",
    "numerical",
    "short",
  ];
  const allowedDiff: Difficulty[] = ["easy", "medium", "hard", "expert"];

  const cleaned: SubjectQuestion[] = [];
  const now = Date.now();
  for (let i = 0; i < rawList.length && cleaned.length < QUESTION_COUNT; i++) {
    const q = rawList[i] as Record<string, unknown> | null;
    if (!q || typeof q !== "object") continue;
    const question = typeof q.question === "string" ? q.question : null;
    const choicesRaw = Array.isArray(q.choices) ? (q.choices as unknown[]) : [];
    const choices = choicesRaw.filter((c): c is string => typeof c === "string").slice(0, 4);
    let correctIndex = typeof q.correctIndex === "number" ? q.correctIndex : -1;
    if (!question || choices.length < 2 || correctIndex < 0 || correctIndex >= choices.length) continue;
    const type = (typeof q.type === "string" ? q.type : "mcq") as SubjectQuestion["type"];
    const diff = (typeof q.difficulty === "string" ? q.difficulty : params.difficulty) as Difficulty;

    // shuffle options per attempt
    if (choices.length > 2 && type !== "true_false" && type !== "assertion_reason") {
      const indices = choices.map((_, idx) => idx);
      const shuffled = shuffle(indices, now + i);
      const newChoices = shuffled.map((idx) => choices[idx]);
      correctIndex = shuffled.indexOf(correctIndex);
      choices.splice(0, choices.length, ...newChoices);
    }

    cleaned.push({
      id: `${now}-${i}-${Math.floor(Math.random() * 1e6)}`,
      type: allowedTypes.includes(type) ? type : "mcq",
      topic: typeof q.topic === "string" && q.topic.trim() ? q.topic.trim() : subjectLabel(params.subject),
      difficulty: allowedDiff.includes(diff) ? diff : params.difficulty,
      question,
      choices,
      correctIndex,
      explanation: typeof q.explanation === "string" ? q.explanation : "",
    });
  }
  if (cleaned.length < 8) throw new Error("Could not generate enough questions. Please try again.");
  return shuffle(cleaned, now).slice(0, QUESTION_COUNT);
}

// ---------------------------------------------------------------
// startSubjectQuiz — generates fresh questions & creates attempt row
// ---------------------------------------------------------------
const startSchema = z.object({
  subject: z.string().min(1),
  quizSet: z.number().int().min(1).max(5),
});

export const startSubjectQuiz = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => startSchema.parse(d))
  .handler(async ({ data, context }): Promise<SubjectAttempt> => {
    const { supabase, userId } = context;
    if (!isSubject(data.subject)) throw new Error("Unknown subject");

    const { data: sp } = await supabase
      .from("student_profiles")
      .select("current_class, board")
      .eq("user_id", userId)
      .maybeSingle();

    const difficulty = await pickDifficulty(supabase, userId, data.subject, data.quizSet);
    const avoid = await fetchPriorQuestionStems(supabase, userId, data.subject);
    const seed = `${userId.slice(0, 8)}-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;

    const questions = await generateQuestions({
      subject: data.subject,
      quizSet: data.quizSet,
      grade: sp?.current_class ?? null,
      board: sp?.board ?? null,
      difficulty,
      avoid,
      seed,
    });

    const { data: inserted, error } = await supabase
      .from("subject_quiz_attempts")
      .insert({
        user_id: userId,
        subject: data.subject,
        quiz_set: data.quizSet,
        difficulty,
        questions,
        answers: [],
        total: questions.length,
      })
      .select("*")
      .single();
    if (error) throw error;
    return inserted as unknown as SubjectAttempt;
  });

// ---------------------------------------------------------------
// submitSubjectQuiz — evaluate + persist score
// ---------------------------------------------------------------
const submitSchema = z.object({
  attemptId: z.string().uuid(),
  answers: z.array(z.number().int()),
  timeSpentSeconds: z.number().int().nonnegative().default(0),
});

export const submitSubjectQuiz = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => submitSchema.parse(d))
  .handler(async ({ data, context }): Promise<SubjectAttempt> => {
    const { supabase, userId } = context;
    const { data: row, error: rerr } = await supabase
      .from("subject_quiz_attempts")
      .select("*")
      .eq("id", data.attemptId)
      .eq("user_id", userId)
      .maybeSingle();
    if (rerr) throw rerr;
    if (!row) throw new Error("Attempt not found");

    const questions = (row.questions ?? []) as SubjectQuestion[];
    const total = questions.length;
    const categoryScores: Record<string, { correct: number; total: number }> = {};
    let score = 0;
    for (let i = 0; i < total; i++) {
      const q = questions[i];
      const topic = q.topic || "General";
      const bucket = (categoryScores[topic] ??= { correct: 0, total: 0 });
      bucket.total += 1;
      if (data.answers[i] === q.correctIndex) {
        score += 1;
        bucket.correct += 1;
      }
    }

    const perf = Object.entries(categoryScores).map(([t, s]) => ({
      t,
      pct: s.total ? s.correct / s.total : 0,
    }));
    const strengths = perf.filter((p) => p.pct >= 0.75).sort((a, b) => b.pct - a.pct).slice(0, 5).map((p) => p.t);
    const weaknesses = perf.filter((p) => p.pct < 0.5).sort((a, b) => a.pct - b.pct).slice(0, 5).map((p) => p.t);

    // AI feedback (best-effort; failures don't block scoring)
    let ai_feedback: string | null = null;
    try {
      const pct = total ? Math.round((score / total) * 100) : 0;
      const content = await callAI(
        `You are a supportive learning coach. Return JSON: { "feedback": "3-5 sentence personalized feedback for the learner, plain text, no markdown" }.`,
        `Subject: ${subjectLabel(row.subject)} — Quiz Set ${row.quiz_set}. Score ${score}/${total} (${pct}%). Strong topics: ${strengths.join(", ") || "none"}. Weak topics: ${weaknesses.join(", ") || "none"}. Suggest what to revise next.`,
      );
      const parsed = JSON.parse(content) as { feedback?: string };
      if (typeof parsed.feedback === "string") ai_feedback = parsed.feedback.trim();
    } catch {
      ai_feedback = null;
    }

    const { data: updated, error } = await supabase
      .from("subject_quiz_attempts")
      .update({
        answers: data.answers,
        score,
        total,
        category_scores: categoryScores,
        strengths,
        weaknesses,
        time_spent_seconds: data.timeSpentSeconds,
        ai_feedback,
        submitted_at: new Date().toISOString(),
      })
      .eq("id", data.attemptId)
      .eq("user_id", userId)
      .select("*")
      .single();
    if (error) throw error;
    return updated as unknown as SubjectAttempt;
  });

// ---------------------------------------------------------------
// getSubjectQuizHistory
// ---------------------------------------------------------------
const historySchema = z.object({
  subject: z.string().min(1),
  quizSet: z.number().int().min(1).max(5).optional(),
});

export type SubjectHistoryItem = {
  id: string;
  subject: string;
  quiz_set: number;
  score: number;
  total: number;
  pct: number;
  difficulty: string;
  time_spent_seconds: number;
  ai_feedback: string | null;
  strengths: string[];
  weaknesses: string[];
  submitted_at: string | null;
  created_at: string;
};

export const getSubjectQuizHistory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => historySchema.parse(d))
  .handler(async ({ data, context }): Promise<SubjectHistoryItem[]> => {
    const { supabase, userId } = context;
    let q = supabase
      .from("subject_quiz_attempts")
      .select(
        "id, subject, quiz_set, score, total, difficulty, time_spent_seconds, ai_feedback, strengths, weaknesses, submitted_at, created_at",
      )
      .eq("user_id", userId)
      .eq("subject", data.subject)
      .not("submitted_at", "is", null)
      .order("submitted_at", { ascending: false })
      .limit(20);
    if (data.quizSet) q = q.eq("quiz_set", data.quizSet);
    const { data: rows, error } = await q;
    if (error) throw error;
    return (rows ?? []).map((r) => ({
      id: r.id as string,
      subject: r.subject as string,
      quiz_set: r.quiz_set as number,
      score: r.score as number,
      total: r.total as number,
      pct: r.total ? Math.round(((r.score as number) / (r.total as number)) * 1000) / 10 : 0,
      difficulty: r.difficulty as string,
      time_spent_seconds: r.time_spent_seconds as number,
      ai_feedback: (r.ai_feedback as string) ?? null,
      strengths: (r.strengths as string[]) ?? [],
      weaknesses: (r.weaknesses as string[]) ?? [],
      submitted_at: (r.submitted_at as string) ?? null,
      created_at: r.created_at as string,
    }));
  });
