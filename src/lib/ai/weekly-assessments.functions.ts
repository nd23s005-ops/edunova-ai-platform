import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** ISO Monday for a given date (UTC). */
function isoMonday(d = new Date()): string {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = x.getUTCDay() || 7; // Sun=7
  if (day !== 1) x.setUTCDate(x.getUTCDate() - (day - 1));
  return x.toISOString().slice(0, 10);
}

const CATEGORY_NAMES = [
  "Concepts & Definitions",
  "Application & Problem Solving",
  "Analytical & Reasoning",
  "Real-world Scenarios",
  "Advanced / Higher-Order",
];

type Question = {
  category: number; // 1..5
  category_name: string;
  position: number; // 1..5
  prompt: string;
  options: string[];
  correct_index: number;
  explanation: string;
};

async function callAI(system: string, user: string): Promise<unknown> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
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

async function generateAssessmentQuestions(params: {
  board: string;
  classLevel: number;
  subject: string;
  seed: string;
}): Promise<Question[]> {
  const system = `You are an expert exam-question author for EduNova AI (K-12 platform).
Generate a weekly assessment for:
- Board: ${params.board}
- Class: ${params.classLevel}
- Subject: ${params.subject}

Produce EXACTLY 25 multiple-choice questions, divided into 5 categories × 5 questions each.
Category names (in order):
1. ${CATEGORY_NAMES[0]}
2. ${CATEGORY_NAMES[1]}
3. ${CATEGORY_NAMES[2]}
4. ${CATEGORY_NAMES[3]}
5. ${CATEGORY_NAMES[4]}

Rules:
- Each question has exactly 4 options.
- "correct_index" is 0-based.
- Include a concise "explanation".
- Calibrate difficulty to class ${params.classLevel} and the ${params.board} board syllabus.
- No duplicates. No unsafe content.
- Return STRICT JSON, no markdown, matching:
{ "questions": [ { "category": 1, "position": 1, "prompt": "...", "options": ["a","b","c","d"], "correct_index": 0, "explanation": "..." }, ... 25 items ] }
Seed (for variation): ${params.seed}`;

  const raw = (await callAI(system, "Generate the 25 questions now. Return JSON only.")) as {
    questions?: unknown[];
  };
  const list = Array.isArray(raw.questions) ? raw.questions : [];
  const cleaned: Question[] = [];
  const counters: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const item of list) {
    const q = item as Record<string, unknown>;
    const cat = Number(q.category);
    if (!Number.isInteger(cat) || cat < 1 || cat > 5) continue;
    if (counters[cat] >= 5) continue;
    const options = Array.isArray(q.options)
      ? (q.options as unknown[]).filter((x): x is string => typeof x === "string").slice(0, 4)
      : [];
    if (options.length !== 4) continue;
    const correct = Number(q.correct_index);
    if (!Number.isInteger(correct) || correct < 0 || correct >= 4) continue;
    const prompt = typeof q.prompt === "string" ? q.prompt : "";
    if (!prompt.trim()) continue;
    counters[cat] += 1;
    cleaned.push({
      category: cat,
      category_name: CATEGORY_NAMES[cat - 1],
      position: counters[cat],
      prompt,
      options,
      correct_index: correct,
      explanation: typeof q.explanation === "string" ? q.explanation : "",
    });
  }
  if (cleaned.length !== 25) {
    throw new Error(`AI returned ${cleaned.length}/25 valid questions. Please regenerate.`);
  }
  return cleaned;
}

// ─────────────────────────────────────────────────────────────
// listWeeklyAssessments
// ─────────────────────────────────────────────────────────────
export const listWeeklyAssessments = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("weekly_assessments")
      .select("id, board, class_level, subject, week_start, title, created_at")
      .eq("user_id", userId)
      .order("week_start", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(50);
    const rows = data ?? [];
    const ids = rows.map((r) => r.id);
    let attempts: {
      assessment_id: string;
      id: string;
      score: number;
      max_score: number;
      submitted_at: string | null;
    }[] = [];
    if (ids.length > 0) {
      const { data: att } = await supabase
        .from("weekly_assessment_attempts")
        .select("id, assessment_id, score, max_score, submitted_at")
        .in("assessment_id", ids)
        .eq("user_id", userId);
      attempts = (att ?? []) as typeof attempts;
    }
    const byAssessment = new Map<string, (typeof attempts)[number]>();
    for (const a of attempts) {
      const existing = byAssessment.get(a.assessment_id);
      if (!existing || (a.submitted_at ?? "") > (existing.submitted_at ?? "")) {
        byAssessment.set(a.assessment_id, a);
      }
    }
    return rows.map((r) => ({ ...r, attempt: byAssessment.get(r.id) ?? null }));
  });

// ─────────────────────────────────────────────────────────────
// generateWeeklyAssessment (idempotent per user × week × subject)
// ─────────────────────────────────────────────────────────────
const genSchema = z.object({
  board: z.string().min(2),
  classLevel: z.number().int().min(1).max(12),
  subject: z.string().min(2),
});

export const generateWeeklyAssessment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => genSchema.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const weekStart = isoMonday();

    const { data: existing } = await supabase
      .from("weekly_assessments")
      .select("id")
      .eq("user_id", userId)
      .eq("board", data.board)
      .eq("class_level", data.classLevel)
      .eq("subject", data.subject)
      .eq("week_start", weekStart)
      .maybeSingle();

    if (existing) return { id: existing.id, created: false };

    const seed = `${userId.slice(0, 8)}-${weekStart}-${data.subject}`;
    const questions = await generateAssessmentQuestions({
      board: data.board,
      classLevel: data.classLevel,
      subject: data.subject,
      seed,
    });

    const title = `${data.subject} · Class ${data.classLevel} · Week of ${weekStart}`;
    const { data: inserted, error } = await supabase
      .from("weekly_assessments")
      .insert({
        user_id: userId,
        board: data.board,
        class_level: data.classLevel,
        subject: data.subject,
        week_start: weekStart,
        title,
      })
      .select("id")
      .single();
    if (error || !inserted) throw error ?? new Error("Failed to create assessment");

    const rows = questions.map((q) => ({
      assessment_id: inserted.id,
      category: q.category,
      position: q.position,
      category_name: q.category_name,
      prompt: q.prompt,
      options: q.options,
      correct_index: q.correct_index,
      explanation: q.explanation,
    }));
    const { error: qerr } = await supabase.from("weekly_assessment_questions").insert(rows);
    if (qerr) {
      await supabase.from("weekly_assessments").delete().eq("id", inserted.id);
      throw qerr;
    }
    return { id: inserted.id, created: true };
  });

// ─────────────────────────────────────────────────────────────
// getWeeklyAssessment (questions without correct answers)
// ─────────────────────────────────────────────────────────────
const idSchema = z.object({ assessmentId: z.string().uuid() });

export const getWeeklyAssessment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => idSchema.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: a } = await supabase
      .from("weekly_assessments")
      .select("id, board, class_level, subject, week_start, title")
      .eq("id", data.assessmentId)
      .eq("user_id", userId)
      .maybeSingle();
    if (!a) throw new Error("Assessment not found");
    const { data: qs } = await supabase
      .from("weekly_assessment_questions")
      .select("id, category, category_name, position, prompt, options")
      .eq("assessment_id", a.id)
      .order("category")
      .order("position");
    const { data: attempt } = await supabase
      .from("weekly_assessment_attempts")
      .select("id, score, max_score, category_scores, submitted_at, answers")
      .eq("assessment_id", a.id)
      .eq("user_id", userId)
      .order("submitted_at", { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle();
    return { assessment: a, questions: qs ?? [], attempt: attempt ?? null };
  });

// ─────────────────────────────────────────────────────────────
// submitWeeklyAssessment
// ─────────────────────────────────────────────────────────────
const submitSchema = z.object({
  assessmentId: z.string().uuid(),
  answers: z.record(z.string(), z.number().int()), // questionId -> chosen index
});

export const submitWeeklyAssessment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => submitSchema.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: a } = await supabase
      .from("weekly_assessments")
      .select("id")
      .eq("id", data.assessmentId)
      .eq("user_id", userId)
      .maybeSingle();
    if (!a) throw new Error("Assessment not found");
    const { data: qs } = await supabase
      .from("weekly_assessment_questions")
      .select("id, category, correct_index")
      .eq("assessment_id", a.id);
    const questions = qs ?? [];
    let score = 0;
    const categoryScores: Record<string, { correct: number; total: number }> = {};
    for (const q of questions) {
      const cat = String(q.category);
      const bucket = (categoryScores[cat] ??= { correct: 0, total: 0 });
      bucket.total += 1;
      const chosen = data.answers[q.id];
      if (typeof chosen === "number" && chosen === q.correct_index) {
        score += 1;
        bucket.correct += 1;
      }
    }
    const { data: attempt, error } = await supabase
      .from("weekly_assessment_attempts")
      .insert({
        assessment_id: a.id,
        user_id: userId,
        answers: data.answers,
        score,
        max_score: questions.length,
        category_scores: categoryScores,
        submitted_at: new Date().toISOString(),
      })
      .select("id, score, max_score, category_scores, submitted_at")
      .single();
    if (error) throw error;
    return attempt;
  });

// ─────────────────────────────────────────────────────────────
// getWeeklyProgress — aggregates for the tracker page
// ─────────────────────────────────────────────────────────────
export const getWeeklyProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const weekStart = isoMonday();
    const weekAgo = new Date(Date.now() - 7 * 86400_000).toISOString();
    const fourWeeksAgo = new Date(Date.now() - 28 * 86400_000).toISOString();

    const [studyRes, lessonRes, quizRes, mockRes, weeklyAttemptsRes] = await Promise.all([
      supabase
        .from("study_sessions")
        .select("minutes, started_at, subject")
        .eq("user_id", userId)
        .gte("started_at", fourWeeksAgo),
      supabase
        .from("lesson_progress")
        .select("id, completed_at")
        .eq("user_id", userId)
        .not("completed_at", "is", null)
        .gte("completed_at", fourWeeksAgo),
      supabase
        .from("quiz_attempts")
        .select("score, max_score, submitted_at")
        .eq("user_id", userId)
        .not("submitted_at", "is", null)
        .gte("submitted_at", fourWeeksAgo),
      supabase
        .from("mock_test_attempts")
        .select("score, submitted_at")
        .eq("user_id", userId)
        .not("submitted_at", "is", null)
        .gte("submitted_at", fourWeeksAgo),
      supabase
        .from("weekly_assessment_attempts")
        .select("score, max_score, category_scores, submitted_at, assessment_id")
        .eq("user_id", userId)
        .not("submitted_at", "is", null)
        .gte("submitted_at", fourWeeksAgo),
    ]);

    const study = studyRes.data ?? [];
    const lessons = lessonRes.data ?? [];
    const quizzes = quizRes.data ?? [];
    const mocks = mockRes.data ?? [];
    const weekly = weeklyAttemptsRes.data ?? [];

    // Bucket by ISO week (last 4 weeks)
    const weeks: { label: string; start: string; hours: number; lessons: number; assessments: number }[] = [];
    for (let i = 3; i >= 0; i--) {
      const start = new Date(Date.now() - i * 7 * 86400_000);
      const monday = isoMonday(start);
      weeks.push({ label: monday.slice(5), start: monday, hours: 0, lessons: 0, assessments: 0 });
    }
    const weekIndex = (iso: string) => weeks.findIndex((w) => iso >= w.start);
    for (const s of study) {
      const idx = weekIndex(new Date(s.started_at).toISOString());
      if (idx >= 0) weeks[idx].hours += (s.minutes ?? 0) / 60;
    }
    for (const l of lessons) {
      const idx = weekIndex(new Date(l.completed_at as string).toISOString());
      if (idx >= 0) weeks[idx].lessons += 1;
    }
    for (const w of weekly) {
      const idx = weekIndex(new Date(w.submitted_at as string).toISOString());
      if (idx >= 0) weeks[idx].assessments += 1;
    }
    for (const w of weeks) w.hours = Math.round(w.hours * 10) / 10;

    // This-week totals
    const thisWeekStudy = study.filter((s) => s.started_at >= weekAgo);
    const totalMinutes = thisWeekStudy.reduce((a, s) => a + (s.minutes ?? 0), 0);
    const lessonsThisWeek = lessons.filter((l) => (l.completed_at as string) >= weekAgo).length;

    // Subject-wise progress from category_scores aggregated across weekly attempts
    const catAgg: Record<string, { correct: number; total: number }> = {};
    for (const a of weekly) {
      const cs = (a.category_scores ?? {}) as Record<string, { correct: number; total: number }>;
      for (const [k, v] of Object.entries(cs)) {
        const b = (catAgg[k] ??= { correct: 0, total: 0 });
        b.correct += v.correct ?? 0;
        b.total += v.total ?? 0;
      }
    }
    const CAT_NAME = [
      "Concepts",
      "Application",
      "Reasoning",
      "Scenarios",
      "Advanced",
    ];
    const categoryPerformance = Object.entries(catAgg).map(([k, v]) => ({
      label: CAT_NAME[Number(k) - 1] ?? `Category ${k}`,
      pct: v.total ? Math.round((v.correct / v.total) * 100) : 0,
    }));

    // Weak / strong topics
    const strong = categoryPerformance
      .filter((c) => c.pct >= 75)
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 3)
      .map((c) => c.label);
    const weak = categoryPerformance
      .filter((c) => c.pct < 60)
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 3)
      .map((c) => c.label);

    // Mock test performance
    const mockScores = mocks.map((m) => Number(m.score ?? 0));
    const mockAvg = mockScores.length
      ? Math.round(mockScores.reduce((a, b) => a + b, 0) / mockScores.length)
      : 0;

    // Assessment average this window
    const assAvg = weekly.length
      ? Math.round(
          (weekly.reduce((a, w) => a + (w.max_score ? (w.score / w.max_score) * 100 : 0), 0) /
            weekly.length) *
            10,
        ) / 10
      : 0;

    // Streak: distinct days with any activity
    const activityDays = new Set<string>();
    for (const s of study) activityDays.add(new Date(s.started_at).toISOString().slice(0, 10));
    for (const l of lessons) activityDays.add(new Date(l.completed_at as string).toISOString().slice(0, 10));
    for (const q of quizzes) activityDays.add(new Date(q.submitted_at as string).toISOString().slice(0, 10));
    let streak = 0;
    const cursor = new Date();
    for (;;) {
      const key = cursor.toISOString().slice(0, 10);
      if (activityDays.has(key)) {
        streak += 1;
        cursor.setUTCDate(cursor.getUTCDate() - 1);
      } else break;
    }

    // Overall completion — rough proxy: lessons completed vs a target of 40 / month
    const overallPct = Math.min(100, Math.round((lessons.length / 40) * 100));

    return {
      weekStart,
      totalHoursThisWeek: Math.round((totalMinutes / 60) * 10) / 10,
      lessonsThisWeek,
      assessmentAveragePct: assAvg,
      mockAverage: mockAvg,
      streak,
      weeks,
      categoryPerformance,
      strong,
      weak,
      overallPct,
    };
  });

// ─────────────────────────────────────────────────────────────
// logStudySession — small helper used by lesson/reader surfaces
// ─────────────────────────────────────────────────────────────
const logSchema = z.object({
  minutes: z.number().int().min(1).max(600),
  subject: z.string().optional(),
});

export const logStudySession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => logSchema.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("study_sessions").insert({
      user_id: userId,
      minutes: data.minutes,
      subject: data.subject ?? null,
    });
    if (error) throw error;
    return { ok: true };
  });
