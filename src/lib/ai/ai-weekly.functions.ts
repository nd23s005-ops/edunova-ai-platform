import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** ISO Monday for a given date (UTC). */
function isoMonday(d = new Date()): string {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = x.getUTCDay() || 7;
  if (day !== 1) x.setUTCDate(x.getUTCDate() - (day - 1));
  return x.toISOString().slice(0, 10);
}

export type AiQuestionType =
  | "mcq"
  | "fill_blank"
  | "true_false"
  | "match"
  | "short_answer"
  | "numerical"
  | "assertion_reason"
  | "programming";

export type AiQuestion = {
  id: string;
  subject: string;
  chapter?: string;
  topic?: string;
  type: AiQuestionType;
  prompt: string;
  code?: string;
  language?: "c" | "python";
  options?: string[];
  pairs_left?: string[];
  pairs_right?: string[];
  correct: number | string | number[];
  explanation: string;
  points: number;
};

async function callAI(system: string, user: string, temperature = 0.9): Promise<unknown> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      temperature,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    if (res.status === 429) throw new Error("AI is busy right now. Please try again in a minute.");
    if (res.status === 402) throw new Error("AI credits are exhausted. Please add credits in workspace billing.");
    throw new Error(`AI error (${res.status}): ${text.slice(0, 200)}`);
  }
  const payload = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const content = payload.choices?.[0]?.message?.content ?? "{}";
  try {
    return JSON.parse(content);
  } catch {
    throw new Error("AI returned invalid JSON");
  }
}

const QUESTIONS_PER_SUBJECT = 5;

function subjectTypeMenu(subject: string): AiQuestionType[] {
  if (subject === "Computer Science") {
    return ["mcq", "fill_blank", "true_false", "programming", "short_answer", "assertion_reason"];
  }
  if (["Mathematics", "Physics", "Chemistry"].includes(subject)) {
    return ["mcq", "fill_blank", "true_false", "numerical", "short_answer", "assertion_reason", "match"];
  }
  return ["mcq", "fill_blank", "true_false", "match", "short_answer", "assertion_reason"];
}

async function generateSubjectQuestions(params: {
  board: string;
  classLevel: number;
  subject: string;
  seed: string;
  avoidStems: string[];
}): Promise<AiQuestion[]> {
  const types = subjectTypeMenu(params.subject);
  const isCS = params.subject === "Computer Science";
  const languageHint = isCS
    ? `For "programming" type: use Python for classes 6-10 and C for classes 11-12 (or Python if student is likely CBSE Python track). Include "code" (the snippet) and "language" ("c" or "python"). Sub-styles: predict output, find the error, fill missing code, complete the program, basic syntax MCQs.`
    : "";

  const system = `You are an expert K-12 examination author for EduNova AI.
Generate exactly ${QUESTIONS_PER_SUBJECT} FRESH, high-quality questions for:
- Board: ${params.board}
- Class: ${params.classLevel}
- Subject: ${params.subject}

Vary question types across this list (mix at least 3 different types):
${types.map((t) => `  - ${t}`).join("\n")}

${languageHint}

Type schemas (strict):
- mcq: { type:"mcq", prompt, options:[4 strings], correct:<index 0-3>, explanation, points:1, topic }
- true_false: { type:"true_false", prompt, options:["True","False"], correct:<0|1>, explanation, points:1, topic }
- assertion_reason: { type:"assertion_reason", prompt:"Assertion (A): ...\\nReason (R): ...", options:["Both A and R are true and R is the correct explanation of A","Both A and R are true but R is not the correct explanation of A","A is true but R is false","A is false but R is true"], correct:<0-3>, explanation, points:1, topic }
- fill_blank: { type:"fill_blank", prompt:"... ____ ...", correct:"<expected phrase>", explanation, points:1, topic }
- numerical: { type:"numerical", prompt, correct:"<numeric answer, e.g. 42 or 3.14>", explanation, points:1, topic }
- short_answer: { type:"short_answer", prompt, correct:"<concise ideal answer 1-3 sentences>", explanation, points:2, topic }
- match: { type:"match", prompt:"Match Column A with Column B", pairs_left:["a1","a2","a3","a4"], pairs_right:["b1","b2","b3","b4"], correct:[<index in right for a1>,<...a2>,<...a3>,<...a4>], explanation, points:2, topic }
- programming: { type:"programming", prompt, code:"...", language:"c"|"python", options?:[...], correct:<index or expected output string>, explanation, points:2, topic }
  (If you provide options, correct is the index. Otherwise correct is the expected output string.)

Rules:
- Calibrate difficulty to Class ${params.classLevel} and the ${params.board} syllabus.
- Cover DIFFERENT topics/chapters across the ${QUESTIONS_PER_SUBJECT} questions.
- Avoid the topics/questions listed under AVOID.
- Do not repeat similar prompts.
- Return STRICT JSON only, matching: { "questions": [ ... ${QUESTIONS_PER_SUBJECT} items ... ] }
- No markdown fences, no commentary.

Seed for variation: ${params.seed}

AVOID (do not reuse these prompts or their exact scenarios):
${params.avoidStems.slice(0, 30).map((s) => `- ${s.slice(0, 140)}`).join("\n") || "- (nothing yet)"}`;

  const raw = (await callAI(system, `Generate the ${QUESTIONS_PER_SUBJECT} questions now. JSON only.`)) as {
    questions?: unknown[];
  };
  const list = Array.isArray(raw.questions) ? raw.questions : [];
  const cleaned: AiQuestion[] = [];
  for (const item of list) {
    const q = item as Record<string, unknown>;
    const type = String(q.type ?? "") as AiQuestionType;
    const prompt = typeof q.prompt === "string" ? q.prompt.trim() : "";
    if (!prompt) continue;
    if (!subjectTypeMenu(params.subject).includes(type)) continue;
    const base: AiQuestion = {
      id: crypto.randomUUID(),
      subject: params.subject,
      type,
      prompt,
      explanation: typeof q.explanation === "string" ? q.explanation : "",
      topic: typeof q.topic === "string" ? q.topic : undefined,
      points: Number(q.points) > 0 ? Number(q.points) : 1,
      correct: 0,
    };
    if (type === "mcq" || type === "true_false" || type === "assertion_reason") {
      const opts = Array.isArray(q.options)
        ? (q.options as unknown[]).filter((x): x is string => typeof x === "string")
        : [];
      const need = type === "true_false" ? 2 : type === "assertion_reason" ? 4 : 4;
      if (opts.length < need) continue;
      const correct = Number(q.correct);
      if (!Number.isInteger(correct) || correct < 0 || correct >= opts.length) continue;
      base.options = opts.slice(0, need);
      base.correct = correct;
    } else if (type === "fill_blank" || type === "numerical" || type === "short_answer") {
      if (typeof q.correct !== "string" || !q.correct.trim()) continue;
      base.correct = q.correct.trim();
    } else if (type === "match") {
      const left = Array.isArray(q.pairs_left) ? (q.pairs_left as unknown[]).filter((x): x is string => typeof x === "string") : [];
      const right = Array.isArray(q.pairs_right) ? (q.pairs_right as unknown[]).filter((x): x is string => typeof x === "string") : [];
      const correct = Array.isArray(q.correct) ? (q.correct as unknown[]).map((n) => Number(n)) : [];
      if (left.length < 3 || left.length !== right.length || correct.length !== left.length) continue;
      if (correct.some((n) => !Number.isInteger(n) || n < 0 || n >= right.length)) continue;
      base.pairs_left = left;
      base.pairs_right = right;
      base.correct = correct;
    } else if (type === "programming") {
      const code = typeof q.code === "string" ? q.code : "";
      const language = q.language === "c" || q.language === "python" ? q.language : "python";
      base.code = code;
      base.language = language;
      if (Array.isArray(q.options)) {
        const opts = (q.options as unknown[]).filter((x): x is string => typeof x === "string");
        const correct = Number(q.correct);
        if (opts.length < 2 || !Number.isInteger(correct) || correct < 0 || correct >= opts.length) continue;
        base.options = opts;
        base.correct = correct;
      } else {
        if (typeof q.correct !== "string" || !q.correct.trim()) continue;
        base.correct = q.correct.trim();
      }
    } else {
      continue;
    }
    cleaned.push(base);
    if (cleaned.length >= QUESTIONS_PER_SUBJECT) break;
  }
  if (cleaned.length < QUESTIONS_PER_SUBJECT) {
    throw new Error(`AI returned ${cleaned.length}/${QUESTIONS_PER_SUBJECT} valid questions for ${params.subject}. Please try again.`);
  }
  return cleaned;
}

// ─────────────────────────────────────────────────────────────
// listAiWeeklyAttempts
// ─────────────────────────────────────────────────────────────
export const listAiWeeklyAttempts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("ai_weekly_attempts")
      .select("id, board, class_level, subjects, week_start, score, max_score, time_taken_seconds, submitted_at, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(60);
    return data ?? [];
  });

// ─────────────────────────────────────────────────────────────
// startAiWeeklyAssessment
// ─────────────────────────────────────────────────────────────
const startSchema = z.object({
  subjects: z.array(z.string().min(2)).min(1).max(8),
});

export const startAiWeeklyAssessment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => startSchema.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: profile } = await supabase
      .from("student_profiles")
      .select("current_class, board")
      .eq("user_id", userId)
      .maybeSingle();

    const classLevel = profile?.current_class;
    const board = profile?.board;
    if (!classLevel || !board) {
      throw new Error("Please complete your syllabus (class & board) in your profile first.");
    }
    if (classLevel < 6 || classLevel > 12) {
      throw new Error("Weekly assessments are available for classes 6–12.");
    }

    // Collect stems from recent attempts (last 6) to avoid repeats.
    const { data: recent } = await supabase
      .from("ai_weekly_attempts")
      .select("questions")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(6);
    const stemsBySubject = new Map<string, string[]>();
    for (const row of recent ?? []) {
      const qs = Array.isArray(row.questions) ? (row.questions as AiQuestion[]) : [];
      for (const q of qs) {
        const arr = stemsBySubject.get(q.subject) ?? [];
        arr.push(q.prompt);
        stemsBySubject.set(q.subject, arr);
      }
    }

    const seed = `${userId.slice(0, 8)}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Generate per-subject in parallel.
    const perSubject = await Promise.all(
      data.subjects.map((subject) =>
        generateSubjectQuestions({
          board,
          classLevel,
          subject,
          seed: `${seed}-${subject}`,
          avoidStems: stemsBySubject.get(subject) ?? [],
        }),
      ),
    );

    const allQuestions: AiQuestion[] = perSubject.flat();
    const maxScore = allQuestions.reduce((a, q) => a + (q.points || 1), 0);

    const { data: inserted, error } = await supabase
      .from("ai_weekly_attempts")
      .insert({
        user_id: userId,
        board,
        class_level: classLevel,
        subjects: data.subjects,
        week_start: isoMonday(),
        questions: allQuestions,
        max_score: maxScore,
      })
      .select("id")
      .single();
    if (error || !inserted) throw error ?? new Error("Failed to create attempt");
    return { attemptId: inserted.id };
  });

// ─────────────────────────────────────────────────────────────
// getAiWeeklyAttempt
// ─────────────────────────────────────────────────────────────
const getSchema = z.object({ attemptId: z.string().uuid() });

export const getAiWeeklyAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => getSchema.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row } = await supabase
      .from("ai_weekly_attempts")
      .select("*")
      .eq("id", data.attemptId)
      .eq("user_id", userId)
      .maybeSingle();
    if (!row) throw new Error("Attempt not found");
    const submitted = !!row.submitted_at;
    // Strip correct answers until submitted.
    const questions = ((row.questions as AiQuestion[] | null) ?? []).map((q) => {
      if (submitted) return q;
      const { correct: _c, explanation: _e, ...rest } = q;
      return rest as Omit<AiQuestion, "correct" | "explanation">;
    });
    return {
      id: row.id,
      board: row.board,
      class_level: row.class_level,
      subjects: row.subjects,
      week_start: row.week_start,
      started_at: row.started_at,
      submitted_at: row.submitted_at,
      score: row.score,
      max_score: row.max_score,
      time_taken_seconds: row.time_taken_seconds,
      answers: row.answers,
      results: row.results,
      ai_feedback: row.ai_feedback,
      submitted,
      questions,
    };
  });

// ─────────────────────────────────────────────────────────────
// submitAiWeeklyAssessment
// ─────────────────────────────────────────────────────────────
const submitSchema = z.object({
  attemptId: z.string().uuid(),
  answers: z.record(z.string(), z.any()),
  timeTakenSeconds: z.number().int().nonnegative().optional(),
});

function normalizeText(s: unknown): string {
  return String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

function numericEqual(a: string, b: string): boolean {
  const x = Number(a.replace(/[, ]/g, ""));
  const y = Number(b.replace(/[, ]/g, ""));
  if (!Number.isFinite(x) || !Number.isFinite(y)) return normalizeText(a) === normalizeText(b);
  const tol = Math.max(0.01, Math.abs(y) * 0.02);
  return Math.abs(x - y) <= tol;
}

type PerQuestionResult = {
  question_id: string;
  correct: boolean;
  partial?: number; // 0..1 for short answers
  awarded: number;
  points: number;
  correct_answer: unknown;
  student_answer: unknown;
  explanation: string;
  ai_note?: string;
};

export const submitAiWeeklyAssessment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => submitSchema.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row } = await supabase
      .from("ai_weekly_attempts")
      .select("*")
      .eq("id", data.attemptId)
      .eq("user_id", userId)
      .maybeSingle();
    if (!row) throw new Error("Attempt not found");
    if (row.submitted_at) throw new Error("This attempt has already been submitted.");

    const questions = (row.questions as AiQuestion[]) ?? [];
    const results: PerQuestionResult[] = [];
    const aiEvalQueue: { q: AiQuestion; studentAnswer: string }[] = [];

    for (const q of questions) {
      const points = q.points || 1;
      const student = data.answers[q.id];
      const base: PerQuestionResult = {
        question_id: q.id,
        correct: false,
        awarded: 0,
        points,
        correct_answer: q.correct,
        student_answer: student ?? null,
        explanation: q.explanation,
      };
      if (student === undefined || student === null || student === "") {
        results.push(base);
        continue;
      }
      if (q.type === "mcq" || q.type === "true_false" || q.type === "assertion_reason") {
        const idx = Number(student);
        if (Number.isInteger(idx) && idx === (q.correct as number)) {
          base.correct = true;
          base.awarded = points;
        }
      } else if (q.type === "fill_blank") {
        if (normalizeText(student) === normalizeText(q.correct)) {
          base.correct = true;
          base.awarded = points;
        }
      } else if (q.type === "numerical") {
        if (numericEqual(String(student), String(q.correct))) {
          base.correct = true;
          base.awarded = points;
        }
      } else if (q.type === "match") {
        const arr = Array.isArray(student) ? (student as unknown[]).map((n) => Number(n)) : [];
        const correct = q.correct as number[];
        if (arr.length === correct.length && arr.every((n, i) => n === correct[i])) {
          base.correct = true;
          base.awarded = points;
        }
      } else if (q.type === "programming") {
        if (Array.isArray(q.options)) {
          const idx = Number(student);
          if (Number.isInteger(idx) && idx === (q.correct as number)) {
            base.correct = true;
            base.awarded = points;
          }
        } else {
          const s = normalizeText(student).replace(/[;\s]+/g, "");
          const c = normalizeText(q.correct).replace(/[;\s]+/g, "");
          if (s && s === c) {
            base.correct = true;
            base.awarded = points;
          } else {
            aiEvalQueue.push({ q, studentAnswer: String(student) });
          }
        }
      } else if (q.type === "short_answer") {
        aiEvalQueue.push({ q, studentAnswer: String(student) });
      }
      results.push(base);
    }

    // AI grading pass for short answers & non-MCQ programming.
    if (aiEvalQueue.length > 0) {
      const gradingSystem = `You are a fair K-12 grader. For each question, return a partial credit score from 0.0 to 1.0 based on correctness of the student answer versus the reference answer, plus a one-line note. Return STRICT JSON: { "grades": [ { "id": "<question_id>", "score": 0.0-1.0, "note": "..." } ] }`;
      const payload = {
        items: aiEvalQueue.map(({ q, studentAnswer }) => ({
          id: q.id,
          subject: q.subject,
          type: q.type,
          prompt: q.prompt,
          code: q.code,
          reference_answer: q.correct,
          student_answer: studentAnswer,
        })),
      };
      try {
        const graded = (await callAI(gradingSystem, JSON.stringify(payload), 0.2)) as {
          grades?: { id: string; score: number; note?: string }[];
        };
        const map = new Map<string, { score: number; note?: string }>();
        for (const g of graded.grades ?? []) {
          if (typeof g.id === "string") map.set(g.id, { score: Number(g.score) || 0, note: g.note });
        }
        for (const r of results) {
          const g = map.get(r.question_id);
          if (!g) continue;
          const partial = Math.max(0, Math.min(1, g.score));
          r.partial = partial;
          r.awarded = Math.round(partial * r.points * 100) / 100;
          r.correct = partial >= 0.75;
          if (g.note) r.ai_note = g.note;
        }
      } catch (e) {
        // Leave AI-graded items at 0 if grading fails; do not block submit.
        console.error("AI grading failed:", (e as Error).message);
      }
    }

    const score = results.reduce((a, r) => a + r.awarded, 0);
    const maxScore = results.reduce((a, r) => a + r.points, 0);

    // Per-subject aggregates.
    const bySubject: Record<string, { correct: number; total: number; awarded: number; possible: number }> = {};
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const r = results[i];
      const s = (bySubject[q.subject] ??= { correct: 0, total: 0, awarded: 0, possible: 0 });
      s.total += 1;
      s.possible += r.points;
      s.awarded += r.awarded;
      if (r.correct) s.correct += 1;
    }

    // Final AI feedback pass.
    let aiFeedback: unknown = null;
    try {
      const fbSystem = `You are a supportive learning coach for Class ${row.class_level} (${row.board}). Given per-question results, return STRICT JSON:
{
  "summary": "2-3 sentence performance summary",
  "grade": "A+|A|B+|B|C|D|E",
  "weak_topics": ["..."],
  "strong_topics": ["..."],
  "recommendations": ["3-5 actionable revision items"],
  "encouragement": "one short motivating line"
}
Grade thresholds by %: A+ >=90, A 80-89, B+ 70-79, B 60-69, C 50-59, D 40-49, E <40.`;
      const fbPayload = {
        percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
        subject_breakdown: bySubject,
        items: questions.map((q, i) => ({
          subject: q.subject,
          topic: q.topic ?? null,
          type: q.type,
          correct: results[i].correct,
          awarded: results[i].awarded,
          points: results[i].points,
        })),
      };
      aiFeedback = await callAI(fbSystem, JSON.stringify(fbPayload), 0.5);
    } catch (e) {
      aiFeedback = { summary: "Feedback unavailable this time — please review your answers below.", error: (e as Error).message };
    }

    const { error: uerr } = await supabase
      .from("ai_weekly_attempts")
      .update({
        answers: data.answers,
        results: { per_question: results, by_subject: bySubject },
        score,
        max_score: maxScore,
        time_taken_seconds: data.timeTakenSeconds ?? null,
        ai_feedback: aiFeedback,
        submitted_at: new Date().toISOString(),
      })
      .eq("id", data.attemptId)
      .eq("user_id", userId);
    if (uerr) throw uerr;

    return { ok: true };
  });
