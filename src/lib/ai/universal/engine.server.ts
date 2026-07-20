// Server-only helpers for the Universal AI Assessment Engine.
// Kept out of *.functions.ts so tss-serverfn-split does not drop them.

import type { SupabaseClient } from "@supabase/supabase-js";

export type AssessmentKind =
  | "daily"
  | "weekly"
  | "monthly"
  | "module"
  | "chapter"
  | "mock"
  | "practice"
  | "final"
  | "skill_eval"
  | "custom";

export type Difficulty = "beginner" | "basic" | "intermediate" | "advanced" | "expert";

export type QuestionType =
  | "mcq"
  | "true_false"
  | "fill_blank"
  | "match"
  | "short"
  | "long"
  | "scenario"
  | "case_study"
  | "numerical"
  | "code_output"
  | "code_debug"
  | "code_complete"
  | "code_error";

export type UniversalQuestion = {
  id: string;
  type: QuestionType;
  topic: string;
  difficulty: Difficulty;
  question: string;
  choices?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  keywords?: string[];
  pairs?: { left: string; right: string }[];
  code?: string;
  language?: string;
  explanation: string;
};

export const KIND_LABEL: Record<AssessmentKind, string> = {
  daily: "Daily Quiz",
  weekly: "Weekly Assessment",
  monthly: "Monthly Assessment",
  module: "Module Test",
  chapter: "Chapter Test",
  mock: "Mock Test",
  practice: "Practice Test",
  final: "Final Course Assessment",
  skill_eval: "Skill Evaluation",
  custom: "Custom Assessment",
};

export const KIND_DEFAULT_COUNT: Record<AssessmentKind, number> = {
  daily: 5,
  weekly: 10,
  monthly: 20,
  module: 12,
  chapter: 10,
  mock: 25,
  practice: 10,
  final: 30,
  skill_eval: 15,
  custom: 10,
};

export const KIND_DEFAULT_TIME: Record<AssessmentKind, number | null> = {
  daily: 300,
  weekly: 900,
  monthly: 1800,
  module: 900,
  chapter: 900,
  mock: 2400,
  practice: null,
  final: 3600,
  skill_eval: 1200,
  custom: null,
};

export const XP_PER_KIND: Record<AssessmentKind, number> = {
  daily: 20,
  weekly: 60,
  monthly: 120,
  module: 80,
  chapter: 60,
  mock: 150,
  practice: 15,
  final: 250,
  skill_eval: 100,
  custom: 25,
};

export function letterGrade(pct: number): string {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  return "F";
}

export function shortHash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}

export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = arr.slice();
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function normalize(s: string): string {
  return (s ?? "").toString().trim().toLowerCase().replace(/\s+/g, " ").replace(/[^\p{L}\p{N}\s]/gu, "");
}

// Adaptive difficulty from the learner's last N attempts of this kind + context
export async function adaptiveDifficulty(
  supabase: SupabaseClient,
  userId: string,
  kind: AssessmentKind,
  courseId: string | null,
  subject: string | null,
): Promise<Difficulty> {
  let q = supabase
    .from("ai_universal_attempts")
    .select("percentage, difficulty")
    .eq("user_id", userId)
    .eq("kind", kind)
    .eq("status", "submitted")
    .order("submitted_at", { ascending: false })
    .limit(5);
  if (courseId) q = q.eq("course_id", courseId);
  if (subject) q = q.eq("subject", subject);
  const { data } = await q.returns<{ percentage: number | null; difficulty: Difficulty }[]>();
  if (!data || data.length === 0) return "basic";
  const avg =
    data.reduce((sum, r) => sum + (typeof r.percentage === "number" ? r.percentage : 0), 0) /
    data.length;
  const last = data[0]?.difficulty ?? "basic";
  const order: Difficulty[] = ["beginner", "basic", "intermediate", "advanced", "expert"];
  const idx = Math.max(0, order.indexOf(last));
  if (avg >= 85 && idx < order.length - 1) return order[idx + 1];
  if (avg < 45 && idx > 0) return order[idx - 1];
  return order[idx];
}

export async function recentQuestionStems(
  supabase: SupabaseClient,
  userId: string,
  kind: AssessmentKind,
  courseId: string | null,
  subject: string | null,
  limit = 20,
): Promise<string[]> {
  let q = supabase
    .from("ai_universal_attempts")
    .select("questions")
    .eq("user_id", userId)
    .eq("kind", kind)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (courseId) q = q.eq("course_id", courseId);
  if (subject) q = q.eq("subject", subject);
  const { data } = await q.returns<{ questions: UniversalQuestion[] | null }[]>();
  const stems: string[] = [];
  for (const row of data ?? []) {
    for (const question of row.questions ?? []) if (question?.question) stems.push(question.question);
  }
  return stems.slice(0, 80);
}

export async function callGatewayJSON(system: string, user: string): Promise<string> {
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

export function safeParse<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    const m = raw.match(/```json\s*([\s\S]*?)```/);
    if (m) {
      try {
        return JSON.parse(m[1]) as T;
      } catch {
        // fall through
      }
    }
    return fallback;
  }
}

export function isProgrammingContext(subject: string | null, topic: string | null): boolean {
  const s = `${subject ?? ""} ${topic ?? ""}`.toLowerCase();
  return /(program|code|coding|python|java\b|javascript|typescript|c\+\+|c#|go\b|rust|kotlin|swift|sql|algorithm|data structures|dsa|react|node|angular|vue)/.test(
    s,
  );
}

export function buildAssessmentPrompt(params: {
  kind: AssessmentKind;
  count: number;
  difficulty: Difficulty;
  types: QuestionType[];
  subject: string | null;
  board: string | null;
  grade: string | null;
  topic: string | null;
  courseTitle: string | null;
  chapterTitle: string | null;
  lessonTitle: string | null;
  avoid: string[];
  learnerContext: {
    skillLevel?: string | null;
    careerGoal?: string | null;
    weakTopics?: string[] | null;
    strongTopics?: string[] | null;
  } | null;
}): { system: string; user: string } {
  const contextLines: string[] = [];
  if (params.courseTitle) contextLines.push(`Course: ${params.courseTitle}.`);
  if (params.chapterTitle) contextLines.push(`Chapter: ${params.chapterTitle}.`);
  if (params.lessonTitle) contextLines.push(`Lesson: ${params.lessonTitle}.`);
  if (params.subject) contextLines.push(`Subject: ${params.subject}.`);
  if (params.topic) contextLines.push(`Topic focus: ${params.topic}.`);
  if (params.board) contextLines.push(`Board: ${params.board.toUpperCase()}.`);
  if (params.grade) contextLines.push(`Class/Grade: ${params.grade}.`);
  if (params.learnerContext?.skillLevel)
    contextLines.push(`Learner skill level: ${params.learnerContext.skillLevel}.`);
  if (params.learnerContext?.careerGoal)
    contextLines.push(`Learner career goal: ${params.learnerContext.careerGoal}.`);
  if (params.learnerContext?.weakTopics?.length)
    contextLines.push(`Weak topics to reinforce: ${params.learnerContext.weakTopics.join(", ")}.`);
  if (params.learnerContext?.strongTopics?.length)
    contextLines.push(`Strong topics to sample: ${params.learnerContext.strongTopics.join(", ")}.`);

  const system = `You are the assessment author for EduNova AI, generating a ${KIND_LABEL[params.kind]}.
${contextLines.join(" ")}
Target overall difficulty: ${params.difficulty}.
Return exactly ${params.count} FRESH questions.
Use ONLY these question types: ${params.types.join(", ")}.
Vary types across the set; do not repeat the same phrasing.

Type rules:
- mcq: 4 choices, exactly one correct, set correctIndex (0-3).
- true_false: choices ["True","False"], correctIndex 0 or 1.
- fill_blank: question contains "____"; provide 4 plausible fills; set correctIndex.
- match: pairs [{left,right}] length 4; no choices; correctAnswer omitted.
- short: 1-2 sentence expected answer in correctAnswer; keywords[] with 3-6 keywords for grading.
- long: 3-6 sentence expected answer in correctAnswer; keywords[] with 5-10 keywords.
- scenario / case_study: multiple-paragraph stem, then 4 choices with correctIndex.
- numerical: correctAnswer is the numeric string; choices optional.
- code_output: include code + language; 4 choices for the output; correctIndex.
- code_debug: include buggy code + language; short correctAnswer describing the fix; keywords[].
- code_complete: include partial code; correctAnswer is the missing snippet; keywords[].
- code_error: include code with a runtime/syntax error; 4 choices; correctIndex.

Randomize the order of correct answers across the set.
Every question MUST include a concise "explanation" field.

Avoid recreating these prior question stems (paraphrase or change scenarios): ${params.avoid.slice(0, 40).join(" || ") || "none"}.

Output STRICT JSON with this shape:
{"questions":[{"id":"q1","type":"mcq","topic":"...","difficulty":"${params.difficulty}","question":"...","choices":["a","b","c","d"],"correctIndex":0,"explanation":"..."}]}
No commentary. No markdown. Only the JSON object.`;

  const user = `Generate the assessment now.`;
  return { system, user };
}
