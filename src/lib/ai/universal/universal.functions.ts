import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  KIND_DEFAULT_COUNT,
  KIND_DEFAULT_TIME,
  KIND_LABEL,
  XP_PER_KIND,
  adaptiveDifficulty,
  buildAssessmentPrompt,
  callGatewayJSON,
  isProgrammingContext,
  letterGrade,
  normalize,
  recentQuestionStems,
  safeParse,
  seededShuffle,
  shortHash,
  type AssessmentKind,
  type Difficulty,
  type QuestionType,
  type UniversalQuestion,
} from "./engine.server";

const KIND_VALUES: AssessmentKind[] = [
  "daily",
  "weekly",
  "monthly",
  "module",
  "chapter",
  "mock",
  "practice",
  "final",
  "skill_eval",
  "custom",
];

const StartSchema = z.object({
  kind: z.enum(KIND_VALUES as [AssessmentKind, ...AssessmentKind[]]),
  courseId: z.string().uuid().nullable().optional(),
  chapterId: z.string().uuid().nullable().optional(),
  lessonId: z.string().uuid().nullable().optional(),
  subject: z.string().max(80).nullable().optional(),
  topic: z.string().max(200).nullable().optional(),
  count: z.number().int().min(3).max(40).nullable().optional(),
  types: z.array(z.string()).max(12).nullable().optional(),
  difficulty: z
    .enum(["beginner", "basic", "intermediate", "advanced", "expert"])
    .nullable()
    .optional(),
  timeLimitSeconds: z.number().int().min(0).max(7200).nullable().optional(),
});

const DEFAULT_TYPES_TEXT: QuestionType[] = [
  "mcq",
  "true_false",
  "fill_blank",
  "short",
  "scenario",
];
const DEFAULT_TYPES_CODE: QuestionType[] = [
  "mcq",
  "code_output",
  "code_debug",
  "code_complete",
  "code_error",
];

export type UniversalAttempt = {
  id: string;
  kind: AssessmentKind;
  subject: string | null;
  topic: string | null;
  course_id: string | null;
  chapter_id: string | null;
  lesson_id: string | null;
  difficulty: Difficulty;
  time_limit_seconds: number | null;
  questions: UniversalQuestion[];
  status: string;
  started_at: string;
};

export type UniversalResult = UniversalAttempt & {
  responses: (number | string | null)[];
  per_question: { correct: boolean; awarded: number; reason?: string }[];
  score: number;
  total: number;
  percentage: number;
  letter_grade: string;
  accuracy: number;
  time_taken_seconds: number;
  topic_breakdown: Record<string, { correct: number; total: number }>;
  weak_topics: string[];
  strong_topics: string[];
  ai_feedback: {
    strengths: string[];
    improvements: string[];
    study: string[];
    revision: string[];
    readiness: string;
  } | null;
  recommendations: {
    lessons: string[];
    practice: string[];
    mocks: string[];
    projects: string[];
    tutor: string[];
    next_course: string | null;
    career_skills: string[];
  } | null;
  submitted_at: string;
};

export const startUniversalAssessment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => StartSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // Load learner context (skill level, weak/strong topics)
    const { data: learnerCtx } = await supabase
      .from("learner_context")
      .select("skill_level, career_goal, weak_topics, strong_topics")
      .eq("user_id", userId)
      .maybeSingle<{
        skill_level: string | null;
        career_goal: string | null;
        weak_topics: string[] | null;
        strong_topics: string[] | null;
      }>();

    // Optional course/chapter/lesson titles for grounding
    let courseTitle: string | null = null;
    let chapterTitle: string | null = null;
    let lessonTitle: string | null = null;
    let boardVal: string | null = null;
    let gradeVal: string | null = null;
    if (data.courseId) {
      const { data: course } = await supabase
        .from("courses")
        .select("title, board, grade")
        .eq("id", data.courseId)
        .maybeSingle<{ title: string; board: string | null; grade: string | null }>();
      courseTitle = course?.title ?? null;
      boardVal = course?.board ?? null;
      gradeVal = course?.grade ?? null;
    }
    if (data.chapterId) {
      const { data: chapter } = await supabase
        .from("chapters")
        .select("title")
        .eq("id", data.chapterId)
        .maybeSingle<{ title: string }>();
      chapterTitle = chapter?.title ?? null;
    }
    if (data.lessonId) {
      const { data: lesson } = await supabase
        .from("lessons")
        .select("title")
        .eq("id", data.lessonId)
        .maybeSingle<{ title: string }>();
      lessonTitle = lesson?.title ?? null;
    }

    const kind = data.kind;
    const count = data.count ?? KIND_DEFAULT_COUNT[kind];
    const timeLimit =
      typeof data.timeLimitSeconds === "number" ? data.timeLimitSeconds : KIND_DEFAULT_TIME[kind];
    const isCode = isProgrammingContext(data.subject ?? courseTitle, data.topic ?? null);
    const rawTypes = (data.types ?? []) as QuestionType[];
    const types: QuestionType[] =
      rawTypes.length > 0 ? rawTypes : isCode ? DEFAULT_TYPES_CODE : DEFAULT_TYPES_TEXT;

    const difficulty: Difficulty =
      data.difficulty ??
      (await adaptiveDifficulty(supabase, userId, kind, data.courseId ?? null, data.subject ?? null));


    const avoid = await recentQuestionStems(
      supabase,
      userId,
      kind,
      data.courseId ?? null,
      data.subject ?? null,
    );

    const { system, user } = buildAssessmentPrompt({
      kind,
      count,
      difficulty,
      types,
      subject: data.subject ?? null,
      board: boardVal,
      grade: gradeVal,
      topic: data.topic ?? null,
      courseTitle,
      chapterTitle,
      lessonTitle,
      avoid,
      learnerContext: learnerCtx ?? null,
    });

    const raw = await callGatewayJSON(system, user);
    const parsed = safeParse<{ questions?: UniversalQuestion[] }>(raw, {});
    let questions = (parsed.questions ?? []).slice(0, count).map((q, i) => ({
      ...q,
      id: q.id || `q${i + 1}`,
      difficulty: (q.difficulty as Difficulty) || difficulty,
      topic: q.topic || data.topic || data.subject || "General",
    }));

    if (questions.length < 3) {
      throw new Error("The AI could not generate enough questions. Please try again in a moment.");
    }

    // Shuffle MCQ-like choices (preserving correctIndex)
    const seed = Date.now() % 100000;
    questions = questions.map((q, idx) => {
      if (
        !q.choices ||
        typeof q.correctIndex !== "number" ||
        q.type === "match" ||
        q.type === "short" ||
        q.type === "long" ||
        q.type === "code_debug" ||
        q.type === "code_complete"
      ) {
        return q;
      }
      const order = seededShuffle(
        q.choices.map((_, i) => i),
        seed + idx,
      );
      const newChoices = order.map((i) => q.choices![i]);
      const newCorrect = order.indexOf(q.correctIndex);
      return { ...q, choices: newChoices, correctIndex: newCorrect };
    });

    const fingerprint = shortHash(questions.map((q) => q.question).join("|"));

    const { data: inserted, error } = await supabase
      .from("ai_universal_attempts")
      .insert({
        user_id: userId,
        kind,
        course_id: data.courseId ?? null,
        chapter_id: data.chapterId ?? null,
        lesson_id: data.lessonId ?? null,
        subject: data.subject ?? null,
        board: boardVal,
        grade: gradeVal,
        topic: data.topic ?? null,
        difficulty,
        question_types: types,
        time_limit_seconds: timeLimit,
        questions,
        status: "in_progress",
        fingerprint,
      })
      .select("id, started_at")
      .single<{ id: string; started_at: string }>();
    if (error || !inserted) throw new Error(error?.message ?? "Failed to start assessment");

    const attempt: UniversalAttempt = {
      id: inserted.id,
      kind,
      subject: data.subject ?? null,
      topic: data.topic ?? null,
      course_id: data.courseId ?? null,
      chapter_id: data.chapterId ?? null,
      lesson_id: data.lessonId ?? null,
      difficulty,
      time_limit_seconds: timeLimit,
      questions,
      status: "in_progress",
      started_at: inserted.started_at,
    };
    return attempt;
  });

const SubmitSchema = z.object({
  attemptId: z.string().uuid(),
  responses: z.array(z.union([z.number(), z.string(), z.null()])),
  timeTakenSeconds: z.number().int().min(0).max(14400),
  timedOut: z.boolean().optional(),
});

function gradeQuestion(
  q: UniversalQuestion,
  response: number | string | null,
): { correct: boolean; awarded: number; reason?: string } {
  if (response === null || response === undefined) return { correct: false, awarded: 0 };
  const isCodeSubjective = q.type === "code_debug" || q.type === "code_complete";
  if (q.type === "short" || q.type === "long" || isCodeSubjective) {
    const kws = (q.keywords ?? []).map(normalize);
    const text = normalize(String(response));
    if (kws.length === 0) {
      const expected = normalize(q.correctAnswer ?? "");
      return { correct: text.length > 0 && text.includes(expected.split(" ")[0] ?? ""), awarded: text.length > 0 ? 0.5 : 0 };
    }
    const hits = kws.filter((k) => k && text.includes(k)).length;
    const ratio = hits / kws.length;
    if (ratio >= 0.6) return { correct: true, awarded: 1, reason: `${hits}/${kws.length} keywords` };
    if (ratio >= 0.3) return { correct: false, awarded: 0.5, reason: `${hits}/${kws.length} keywords` };
    return { correct: false, awarded: 0, reason: `${hits}/${kws.length} keywords` };
  }
  if (q.type === "numerical") {
    const expected = (q.correctAnswer ?? "").toString().replace(/\s+/g, "");
    const got = String(response).replace(/\s+/g, "");
    return { correct: expected.length > 0 && expected === got, awarded: expected === got ? 1 : 0 };
  }
  if (q.type === "match") {
    // response expected as JSON stringified array of right-values in pair order
    try {
      const arr = typeof response === "string" ? (JSON.parse(response) as string[]) : [];
      const expected = (q.pairs ?? []).map((p) => p.right);
      const total = expected.length || 1;
      let hits = 0;
      for (let i = 0; i < expected.length; i++) if (normalize(arr[i] ?? "") === normalize(expected[i])) hits++;
      const ratio = hits / total;
      return { correct: ratio === 1, awarded: ratio, reason: `${hits}/${total} pairs` };
    } catch {
      return { correct: false, awarded: 0 };
    }
  }
  // MCQ-like
  if (typeof q.correctIndex === "number") {
    return { correct: Number(response) === q.correctIndex, awarded: Number(response) === q.correctIndex ? 1 : 0 };
  }
  return { correct: false, awarded: 0 };
}

export const submitUniversalAssessment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SubmitSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: attempt, error: readErr } = await supabase
      .from("ai_universal_attempts")
      .select("*")
      .eq("id", data.attemptId)
      .eq("user_id", userId)
      .single<{
        id: string;
        kind: AssessmentKind;
        difficulty: Difficulty;
        subject: string | null;
        topic: string | null;
        course_id: string | null;
        chapter_id: string | null;
        lesson_id: string | null;
        started_at: string;
        time_limit_seconds: number | null;
        questions: UniversalQuestion[];
        status: string;
      }>();
    if (readErr || !attempt) throw new Error(readErr?.message ?? "Attempt not found");
    if (attempt.status === "submitted") throw new Error("Assessment already submitted");

    const responses = data.responses.slice(0, attempt.questions.length);
    while (responses.length < attempt.questions.length) responses.push(null);

    const per: { correct: boolean; awarded: number; reason?: string }[] = [];
    const topicMap = new Map<string, { correct: number; total: number }>();
    let score = 0;
    let correctCount = 0;
    for (let i = 0; i < attempt.questions.length; i++) {
      const q = attempt.questions[i];
      const graded = gradeQuestion(q, responses[i] ?? null);
      per.push(graded);
      score += graded.awarded;
      if (graded.correct) correctCount++;
      const t = q.topic || "General";
      const bucket = topicMap.get(t) ?? { correct: 0, total: 0 };
      bucket.total += 1;
      if (graded.correct) bucket.correct += 1;
      topicMap.set(t, bucket);
    }
    const total = attempt.questions.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const topicBreakdown: Record<string, { correct: number; total: number }> = {};
    const weak: string[] = [];
    const strong: string[] = [];
    for (const [t, b] of topicMap) {
      topicBreakdown[t] = b;
      const pct = b.total ? (b.correct / b.total) * 100 : 0;
      if (pct < 50) weak.push(t);
      else if (pct >= 80) strong.push(t);
    }

    // AI feedback + recommendations
    let aiFeedback: UniversalResult["ai_feedback"] = null;
    let recommendations: UniversalResult["recommendations"] = null;
    try {
      const summary = attempt.questions
        .map((q, i) => {
          const g = per[i];
          return `Q${i + 1} [${q.topic}] ${g.correct ? "✓" : "✗"} type=${q.type} diff=${q.difficulty}`;
        })
        .join("\n");
      const system = `You are the EduNova AI learning coach. Return STRICT JSON only.`;
      const user = `A learner just finished a ${KIND_LABEL[attempt.kind]} (${percentage}% / grade ${letterGrade(
        percentage,
      )}). Difficulty band: ${attempt.difficulty}. Subject: ${attempt.subject ?? "general"}.
Weak topics: ${weak.join(", ") || "none"}. Strong topics: ${strong.join(", ") || "none"}.
Per-question outcome:
${summary}

Return this JSON exactly:
{
  "feedback": {
    "strengths": ["..."],
    "improvements": ["..."],
    "study": ["..."],
    "revision": ["..."],
    "readiness": "one short sentence on readiness for the next level"
  },
  "recommendations": {
    "lessons": ["specific lesson titles to revisit"],
    "practice": ["practice topics"],
    "mocks": ["mock test topics"],
    "projects": ["1-2 mini project ideas"],
    "tutor": ["AI tutor prompts to try"],
    "next_course": "one recommended next course or null",
    "career_skills": ["career-aligned skills to build"]
  }
}
Keep every list to at most 5 concise items.`;
      const raw = await callGatewayJSON(system, user);
      const parsed = safeParse<{
        feedback?: UniversalResult["ai_feedback"];
        recommendations?: UniversalResult["recommendations"];
      }>(raw, {});
      aiFeedback = parsed.feedback ?? null;
      recommendations = parsed.recommendations ?? null;
    } catch {
      // Non-fatal — leave nulls
    }

    const submittedAt = new Date().toISOString();
    const { error: updErr } = await supabase
      .from("ai_universal_attempts")
      .update({
        responses,
        per_question: per,
        topic_breakdown: topicBreakdown,
        weak_topics: weak,
        strong_topics: strong,
        ai_feedback: aiFeedback,
        recommendations,
        score,
        total,
        percentage,
        letter_grade: letterGrade(percentage),
        accuracy,
        time_taken_seconds: data.timeTakenSeconds,
        submitted_at: submittedAt,
        status: data.timedOut ? "timed_out" : "submitted",
      })
      .eq("id", attempt.id)
      .eq("user_id", userId);
    if (updErr) throw new Error(updErr.message);

    // Award XP
    const xpPoints = Math.round(XP_PER_KIND[attempt.kind] * (percentage / 100 + 0.1));
    if (xpPoints > 0) {
      await supabase.from("learner_xp_events").insert({
        user_id: userId,
        source: `assessment:${attempt.kind}`,
        points: xpPoints,
        related_attempt_id: attempt.id,
        meta: { percentage, kind: attempt.kind },
      });
    }

    // Achievement checks (unique via code)
    const achievements: { code: string; title: string; description: string; tier: string }[] = [];
    if (percentage === 100)
      achievements.push({
        code: "perfect_score_first",
        title: "Perfect Score",
        description: "Scored 100% on an AI assessment.",
        tier: "gold",
      });
    if (percentage >= 90)
      achievements.push({
        code: `top_performer_${attempt.kind}`,
        title: `${KIND_LABEL[attempt.kind]} — Top Performer`,
        description: `Scored 90% or higher on a ${KIND_LABEL[attempt.kind]}.`,
        tier: "silver",
      });
    // 3-day streak check
    const since = new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString();
    const { data: streakRows } = await supabase
      .from("ai_universal_attempts")
      .select("submitted_at")
      .eq("user_id", userId)
      .eq("status", "submitted")
      .gte("submitted_at", since)
      .order("submitted_at", { ascending: false })
      .returns<{ submitted_at: string }[]>();
    const days = new Set<string>();
    for (const r of streakRows ?? []) if (r.submitted_at) days.add(r.submitted_at.slice(0, 10));
    if (days.size >= 3)
      achievements.push({
        code: "streak_3",
        title: "3-Day Streak",
        description: "Completed assessments on 3 different days.",
        tier: "bronze",
      });
    for (const a of achievements) {
      await supabase
        .from("learner_achievements")
        .insert({
          user_id: userId,
          code: a.code,
          title: a.title,
          description: a.description,
          tier: a.tier,
        })
        .then(() => undefined, () => undefined);
    }

    // Update readiness snapshot (per course, and global)
    async function upsertReadiness(courseId: string | null) {
      let q = supabase
        .from("ai_universal_attempts")
        .select("percentage, kind, difficulty")
        .eq("user_id", userId)
        .eq("status", "submitted")
        .order("submitted_at", { ascending: false })
        .limit(20);
      if (courseId) q = q.eq("course_id", courseId);
      const { data: rows } = await q.returns<
        { percentage: number | null; kind: string; difficulty: Difficulty }[]
      >();
      if (!rows || rows.length === 0) return;
      const avg = rows.reduce((s, r) => s + (r.percentage ?? 0), 0) / rows.length;
      const finalRows = rows.filter((r) => r.kind === "final");
      const mockRows = rows.filter((r) => r.kind === "mock");
      const skillRows = rows.filter((r) => r.kind === "skill_eval");
      const finalAvg = finalRows.length
        ? finalRows.reduce((s, r) => s + (r.percentage ?? 0), 0) / finalRows.length
        : avg;
      const mockAvg = mockRows.length
        ? mockRows.reduce((s, r) => s + (r.percentage ?? 0), 0) / mockRows.length
        : avg;
      const skillAvg = skillRows.length
        ? skillRows.reduce((s, r) => s + (r.percentage ?? 0), 0) / skillRows.length
        : null;
      const level =
        avg >= 85 ? "expert" : avg >= 70 ? "advanced" : avg >= 55 ? "intermediate" : avg >= 40 ? "basic" : "beginner";
      await supabase.from("learner_readiness").upsert(
        {
          user_id: userId,
          course_id: courseId,
          skill_level: level,
          confidence: Math.round(avg),
          completion_readiness: Math.round(finalAvg),
          certification_readiness: Math.round((finalAvg + mockAvg) / 2),
          interview_readiness: skillAvg !== null ? Math.round(skillAvg) : null,
          computed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,course_id" },
      );
    }
    await upsertReadiness(attempt.course_id);
    if (attempt.course_id) await upsertReadiness(null);

    const result: UniversalResult = {
      id: attempt.id,
      kind: attempt.kind,
      subject: attempt.subject,
      topic: attempt.topic,
      course_id: attempt.course_id,
      chapter_id: attempt.chapter_id,
      lesson_id: attempt.lesson_id,
      difficulty: attempt.difficulty,
      time_limit_seconds: attempt.time_limit_seconds,
      questions: attempt.questions,
      status: data.timedOut ? "timed_out" : "submitted",
      started_at: attempt.started_at,
      responses,
      per_question: per,
      score,
      total,
      percentage,
      letter_grade: letterGrade(percentage),
      accuracy,
      time_taken_seconds: data.timeTakenSeconds,
      topic_breakdown: topicBreakdown,
      weak_topics: weak,
      strong_topics: strong,
      ai_feedback: aiFeedback,
      recommendations,
      submitted_at: submittedAt,
    };
    return result;
  });

const AttemptIdSchema = z.object({ attemptId: z.string().uuid() });

export const getUniversalAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => AttemptIdSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("ai_universal_attempts")
      .select("*")
      .eq("id", data.attemptId)
      .eq("user_id", userId)
      .maybeSingle<UniversalResult & { status: string }>();
    if (error) throw new Error(error.message);
    return row;
  });

export type UniversalHistoryItem = {
  id: string;
  kind: AssessmentKind;
  subject: string | null;
  topic: string | null;
  difficulty: Difficulty;
  score: number | null;
  total: number | null;
  percentage: number | null;
  letter_grade: string | null;
  time_taken_seconds: number | null;
  submitted_at: string | null;
  created_at: string;
  status: string;
};

export const listUniversalHistory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: unknown) =>
      z
        .object({ limit: z.number().int().min(1).max(200).optional() })
        .parse(input ?? {}),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: rows } = await supabase
      .from("ai_universal_attempts")
      .select(
        "id, kind, subject, topic, difficulty, score, total, percentage, letter_grade, time_taken_seconds, submitted_at, created_at, status",
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(data.limit ?? 50)
      .returns<UniversalHistoryItem[]>();
    return rows ?? [];
  });

export type UniversalAnalytics = {
  totalAttempts: number;
  submittedAttempts: number;
  averagePercentage: number;
  highestPercentage: number;
  totalTimeMinutes: number;
  streakDays: number;
  xpTotal: number;
  byKind: { kind: AssessmentKind; count: number; avg: number }[];
  bySubject: { subject: string; count: number; avg: number }[];
  daily: { day: string; count: number; avg: number }[];
  weakTopics: { topic: string; count: number }[];
  strongTopics: { topic: string; count: number }[];
  achievements: { code: string; title: string; tier: string; awarded_at: string }[];
  readiness: {
    skill_level: string;
    confidence: number;
    completion_readiness: number;
    certification_readiness: number;
    interview_readiness: number | null;
  } | null;
};

export const getUniversalAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const { data: rows } = await supabase
      .from("ai_universal_attempts")
      .select(
        "kind, subject, percentage, time_taken_seconds, submitted_at, weak_topics, strong_topics, status",
      )
      .eq("user_id", userId)
      .order("submitted_at", { ascending: false })
      .limit(500)
      .returns<
        {
          kind: AssessmentKind;
          subject: string | null;
          percentage: number | null;
          time_taken_seconds: number | null;
          submitted_at: string | null;
          weak_topics: string[] | null;
          strong_topics: string[] | null;
          status: string;
        }[]
      >();
    const list = rows ?? [];
    const submitted = list.filter((r) => r.status === "submitted" || r.status === "timed_out");

    const byKindMap = new Map<AssessmentKind, { count: number; sum: number }>();
    const bySubjectMap = new Map<string, { count: number; sum: number }>();
    const dayMap = new Map<string, { count: number; sum: number }>();
    const weakMap = new Map<string, number>();
    const strongMap = new Map<string, number>();
    let totalTime = 0;
    let highest = 0;
    let sumPct = 0;
    for (const r of submitted) {
      const pct = r.percentage ?? 0;
      totalTime += r.time_taken_seconds ?? 0;
      sumPct += pct;
      if (pct > highest) highest = pct;
      const bk = byKindMap.get(r.kind) ?? { count: 0, sum: 0 };
      bk.count += 1;
      bk.sum += pct;
      byKindMap.set(r.kind, bk);
      if (r.subject) {
        const bs = bySubjectMap.get(r.subject) ?? { count: 0, sum: 0 };
        bs.count += 1;
        bs.sum += pct;
        bySubjectMap.set(r.subject, bs);
      }
      if (r.submitted_at) {
        const day = r.submitted_at.slice(0, 10);
        const d = dayMap.get(day) ?? { count: 0, sum: 0 };
        d.count += 1;
        d.sum += pct;
        dayMap.set(day, d);
      }
      for (const t of r.weak_topics ?? []) weakMap.set(t, (weakMap.get(t) ?? 0) + 1);
      for (const t of r.strong_topics ?? []) strongMap.set(t, (strongMap.get(t) ?? 0) + 1);
    }

    // Streak
    const days = Array.from(dayMap.keys()).sort().reverse();
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(today.getTime() - i * 24 * 3600 * 1000).toISOString().slice(0, 10);
      if (days.includes(d)) streak += 1;
      else if (i > 0) break;
    }

    const { data: xpRows } = await supabase
      .from("learner_xp_events")
      .select("points")
      .eq("user_id", userId)
      .returns<{ points: number }[]>();
    const xpTotal = (xpRows ?? []).reduce((s, r) => s + r.points, 0);

    const { data: achRows } = await supabase
      .from("learner_achievements")
      .select("code, title, tier, awarded_at")
      .eq("user_id", userId)
      .order("awarded_at", { ascending: false })
      .returns<{ code: string; title: string; tier: string; awarded_at: string }[]>();

    const { data: readiness } = await supabase
      .from("learner_readiness")
      .select(
        "skill_level, confidence, completion_readiness, certification_readiness, interview_readiness",
      )
      .eq("user_id", userId)
      .is("course_id", null)
      .maybeSingle<UniversalAnalytics["readiness"]>();

    const analytics: UniversalAnalytics = {
      totalAttempts: list.length,
      submittedAttempts: submitted.length,
      averagePercentage: submitted.length ? Math.round(sumPct / submitted.length) : 0,
      highestPercentage: Math.round(highest),
      totalTimeMinutes: Math.round(totalTime / 60),
      streakDays: streak,
      xpTotal,
      byKind: Array.from(byKindMap.entries()).map(([kind, v]) => ({
        kind,
        count: v.count,
        avg: Math.round(v.sum / Math.max(1, v.count)),
      })),
      bySubject: Array.from(bySubjectMap.entries()).map(([subject, v]) => ({
        subject,
        count: v.count,
        avg: Math.round(v.sum / Math.max(1, v.count)),
      })),
      daily: Array.from(dayMap.entries())
        .sort(([a], [b]) => (a < b ? -1 : 1))
        .slice(-30)
        .map(([day, v]) => ({
          day,
          count: v.count,
          avg: Math.round(v.sum / Math.max(1, v.count)),
        })),
      weakTopics: Array.from(weakMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([topic, count]) => ({ topic, count })),
      strongTopics: Array.from(strongMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([topic, count]) => ({ topic, count })),
      achievements: achRows ?? [],
      readiness: readiness ?? null,
    };
    return analytics;
  });

export { KIND_LABEL, KIND_DEFAULT_COUNT, KIND_DEFAULT_TIME } from "./engine.server";
export type {
  AssessmentKind,
  Difficulty,
  QuestionType,
  UniversalQuestion,
} from "./engine.server";
