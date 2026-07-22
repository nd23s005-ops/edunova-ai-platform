// AI Learning Path — 10 weeks × 7 units per course, with per-unit AI content,
// weekly assessments, a final exam, and library resource attachment.
//
// Content is generated on demand via the Lovable AI Gateway and cached
// client-side by React Query. Nothing new is written to the resources
// library — we only attach existing rows from `resources`.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCareerAI, safeJson } from "@/lib/career/career.server";

// ---------- shared types ----------

export type CourseOutlineWeek = {
  index: number; // 1..10
  title: string;
  theme: string;
  units: { index: number; title: string; summary: string }[]; // 7 units
};

export type CourseOutline = {
  courseId: string;
  courseTitle: string;
  subject: string;
  isTechnical: boolean;
  weeks: CourseOutlineWeek[]; // length 10
};

export type UnitContent = {
  week: number;
  unit: number;
  title: string;
  lesson: string;              // AI Lesson
  explanation: string;         // AI Explanation
  theory: string;              // Theory
  practicalExamples: string[]; // Practical Examples
  realWorldExamples: string[]; // Real-world Examples
  notes: string[];             // AI Notes (bullets)
  summary: string;             // Summary
  keyPoints: string[];         // Key Points
  interviewQuestions: { question: string; answer: string }[]; // Important Interview Questions
  commonMistakes: string[];    // Common Mistakes
  revision: string[];          // Revision Notes
  practice: {
    mcq: { question: string; options: string[]; answerIndex: number; explanation: string }[];
    fillBlanks: { prompt: string; answer: string }[];
    shortAnswers: { question: string; sampleAnswer: string }[];
    scenarios: { title: string; description: string; hint?: string }[];
    coding?: { title: string; brief: string; starter?: string; language?: string }[]; // technical only
  };
};

export type WeeklyAssessment = {
  week: number;
  title: string;
  mcq: { question: string; options: string[]; answerIndex: number; explanation: string }[]; // 8
  short: { question: string; sampleAnswer: string }[]; // 3
  miniAssignment: { title: string; description: string; deliverables: string[] };
  revision: string[]; // recap bullets
};

export type FinalExam = {
  title: string;
  mcq: { question: string; options: string[]; answerIndex: number; explanation: string }[]; // 15
  longAnswers: { question: string; rubric: string[] }[]; // 3
  project: { title: string; brief: string; deliverables: string[]; evaluation: string[] };
};

export type AttachedResource = {
  id: string;
  title: string;
  kind: string;
  description: string | null;
  url?: string | null;
  courseTitle?: string | null;
};

// ---------- helpers ----------

function detectTechnical(subject?: string | null, title?: string | null): boolean {
  const s = `${subject ?? ""} ${title ?? ""}`;
  return /program|code|javascript|python|c\+\+|c#|c\b|java|kotlin|swift|react|node|web|data|ai|ml|generative|api|dev|software|algorithm|dsa|cyber|security|cloud|devops|sql|database|linux|networking/i.test(
    s,
  );
}

function roleLabel(role: string | null | undefined): string {
  if (role === "college_student") return "College Student (Developer Workspace)";
  if (role === "professional") return "Working Professional (Career Growth)";
  return "School Student (Guided Classroom)";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function gatherGrounding(supabase: any, userId: string, courseId: string) {
  const [courseRes, roleRes, ctxRes, enrollRes] = await Promise.all([
    supabase
      .from("courses")
      .select("id, title, subject, description, difficulty, learning_objectives")
      .eq("id", courseId)
      .maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle(),
    supabase
      .from("learner_context")
      .select("skill_level, career_goal, preferred_depth, interests, weak_topics")
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("course_enrollments")
      .select("progress")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .maybeSingle(),
  ]);
  if (!courseRes.data) throw new Error("Course not found");
  return {
    course: courseRes.data as { id: string; title: string; subject: string | null; description: string | null; difficulty: string | null; learning_objectives: string[] | null },
    role: (roleRes.data?.role as string | null) ?? "student",
    learnerCtx: ctxRes.data as { skill_level?: string | null; career_goal?: string | null; preferred_depth?: string | null; interests?: string[] | null; weak_topics?: string[] | null } | null,
    progress: (enrollRes.data?.progress as number | null) ?? 0,
  };
}

function baseSystem(course: { title: string; subject: string | null; description: string | null; difficulty: string | null }, role: string, ctx: { skill_level?: string | null; career_goal?: string | null; preferred_depth?: string | null; interests?: string[] | null; weak_topics?: string[] | null } | null, progress: number) {
  return [
    `You are Nova, EduNova AI's course learning tutor.`,
    `Learner role: ${roleLabel(role)}.`,
    `Course: "${course.title}" — subject ${course.subject ?? ""}, difficulty ${course.difficulty ?? "Beginner → Advanced"}, current progress ${progress}%.`,
    course.description ? `Course description: ${course.description}` : "",
    ctx?.skill_level ? `Skill level: ${ctx.skill_level}.` : "",
    ctx?.career_goal ? `Career goal: ${ctx.career_goal}.` : "",
    ctx?.preferred_depth ? `Preferred depth: ${ctx.preferred_depth}.` : "",
    ctx?.interests?.length ? `Interests: ${ctx.interests.slice(0, 5).join(", ")}.` : "",
    ctx?.weak_topics?.length ? `Weak topics to reinforce: ${ctx.weak_topics.slice(0, 5).join(", ")}.` : "",
    `Every response must be strictly about "${course.title}". Never mix unrelated subjects.`,
    `Return STRICT JSON only. No markdown fences. No extra keys.`,
    `Adapt tone: school = friendly & simple, college = technical & practical, professional = concise & outcome-oriented.`,
  ]
    .filter(Boolean)
    .join("\n");
}

// ---------- 1) Course outline (10 × 7) ----------

const OutlineInput = z.object({ courseId: z.string().uuid() });

export const generateCourseOutline = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => OutlineInput.parse(v))
  .handler(async ({ data, context }): Promise<CourseOutline> => {
    const { supabase, userId } = context;
    const { course, role, learnerCtx, progress } = await gatherGrounding(supabase, userId, data.courseId);
    const isTechnical = detectTechnical(course.subject, course.title);

    const system = [
      baseSystem(course, role, learnerCtx, progress),
      `Design a full 10-week curriculum, Beginner → Advanced, with EXACTLY 10 weeks and EXACTLY 7 units per week (70 units total).`,
      `JSON schema:`,
      `{ "weeks": [ { "index": number 1..10, "title": string, "theme": string,`,
      `"units": [ { "index": number 1..7, "title": string, "summary": string } ] } ] }`,
      `Titles concise (≤80 chars). Units progressive; no duplicates. Later weeks are advanced/applied.`,
    ].join("\n");

    const user = `Generate the 10-week × 7-unit outline now for "${course.title}".`;
    const raw = await callCareerAI(system, user);
    const parsed = safeJson<{ weeks?: CourseOutlineWeek[] }>(raw);

    let weeks = Array.isArray(parsed?.weeks) ? parsed!.weeks! : [];
    // Normalize to strictly 10 × 7
    const normalized: CourseOutlineWeek[] = Array.from({ length: 10 }).map((_, wi) => {
      const w = weeks[wi];
      const units = (Array.isArray(w?.units) ? w!.units : []).slice(0, 7);
      while (units.length < 7) {
        units.push({
          index: units.length + 1,
          title: `Unit ${units.length + 1}: ${course.subject ?? course.title} — deeper dive`,
          summary: "Practice and application of this week's concepts.",
        });
      }
      return {
        index: wi + 1,
        title: (w?.title ?? `Week ${wi + 1}`).toString().slice(0, 120),
        theme: (w?.theme ?? "").toString().slice(0, 200),
        units: units.map((u, ui) => ({
          index: ui + 1,
          title: (u.title ?? `Unit ${ui + 1}`).toString().slice(0, 120),
          summary: (u.summary ?? "").toString().slice(0, 240),
        })),
      };
    });

    return {
      courseId: course.id,
      courseTitle: course.title,
      subject: course.subject ?? "",
      isTechnical,
      weeks: normalized,
    };
  });

// ---------- 2) Unit content ----------

const UnitInput = z.object({
  courseId: z.string().uuid(),
  week: z.number().int().min(1).max(10),
  unit: z.number().int().min(1).max(7),
  unitTitle: z.string().max(200).optional(),
  weekTitle: z.string().max(200).optional(),
});

export const generateUnitContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => UnitInput.parse(v))
  .handler(async ({ data, context }): Promise<UnitContent> => {
    const { supabase, userId } = context;
    const { course, role, learnerCtx, progress } = await gatherGrounding(supabase, userId, data.courseId);
    const isTechnical = detectTechnical(course.subject, course.title);

    const system = [
      baseSystem(course, role, learnerCtx, progress),
      `Produce a single learning UNIT for Week ${data.week}, Unit ${data.unit}${data.unitTitle ? ` ("${data.unitTitle}")` : ""}${data.weekTitle ? `, week theme "${data.weekTitle}"` : ""}.`,
      `Return STRICT JSON matching this schema:`,
      `{`,
      `  "title": string,`,
      `  "lesson": string,             // 4-8 paragraphs, teaching the concept from scratch`,
      `  "explanation": string,        // simpler restatement in 2-3 paragraphs`,
      `  "theory": string,             // formal definitions & principles (2-4 paragraphs)`,
      `  "practicalExamples": string[],// 3-5 concrete worked examples (markdown ok)`,
      `  "realWorldExamples": string[],// 3-5 industry / everyday scenarios`,
      `  "notes": string[],            // 6-10 bullet AI study notes`,
      `  "summary": string,            // 3-5 sentence summary`,
      `  "keyPoints": string[],        // 5-8 bullets`,
      `  "interviewQuestions": [ { "question": string, "answer": string } ],  // 4-6 items`,
      `  "commonMistakes": string[],   // 4-6 bullets`,
      `  "revision": string[],         // 5-8 rapid revision bullets`,
      `  "practice": {`,
      `    "mcq":         [ { "question": string, "options": string[4], "answerIndex": number, "explanation": string } ],  // 4-6`,
      `    "fillBlanks":  [ { "prompt": string, "answer": string } ],  // 3-5, use ___ for the blank`,
      `    "shortAnswers":[ { "question": string, "sampleAnswer": string } ],  // 2-3`,
      `    "scenarios":   [ { "title": string, "description": string, "hint": string } ],  // 2-3`,
      isTechnical
        ? `    ,"coding":    [ { "title": string, "brief": string, "starter": string, "language": string } ]  // 2-3 coding problems`
        : ``,
      `  }`,
      `}`,
      `Everything must relate strictly to "${course.title}". Progressive difficulty for week ${data.week}/10.`,
    ]
      .filter(Boolean)
      .join("\n");

    const user = `Generate Week ${data.week}, Unit ${data.unit} content now.`;
    const raw = await callCareerAI(system, user);
    const parsed = safeJson<Partial<UnitContent>>(raw);
    if (!parsed || typeof parsed !== "object") throw new Error("AI returned invalid unit content");

    return {
      week: data.week,
      unit: data.unit,
      title: (parsed.title ?? data.unitTitle ?? `Week ${data.week} · Unit ${data.unit}`).toString(),
      lesson: parsed.lesson ?? "",
      explanation: parsed.explanation ?? "",
      theory: parsed.theory ?? "",
      practicalExamples: Array.isArray(parsed.practicalExamples) ? parsed.practicalExamples.slice(0, 6) : [],
      realWorldExamples: Array.isArray(parsed.realWorldExamples) ? parsed.realWorldExamples.slice(0, 6) : [],
      notes: Array.isArray(parsed.notes) ? parsed.notes.slice(0, 12) : [],
      summary: parsed.summary ?? "",
      keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints.slice(0, 10) : [],
      interviewQuestions: Array.isArray(parsed.interviewQuestions)
        ? parsed.interviewQuestions.slice(0, 8).map((q) => ({ question: String(q.question ?? ""), answer: String(q.answer ?? "") }))
        : [],
      commonMistakes: Array.isArray(parsed.commonMistakes) ? parsed.commonMistakes.slice(0, 8) : [],
      revision: Array.isArray(parsed.revision) ? parsed.revision.slice(0, 10) : [],
      practice: {
        mcq: Array.isArray(parsed.practice?.mcq) ? parsed.practice!.mcq.slice(0, 8) : [],
        fillBlanks: Array.isArray(parsed.practice?.fillBlanks) ? parsed.practice!.fillBlanks.slice(0, 6) : [],
        shortAnswers: Array.isArray(parsed.practice?.shortAnswers) ? parsed.practice!.shortAnswers.slice(0, 5) : [],
        scenarios: Array.isArray(parsed.practice?.scenarios) ? parsed.practice!.scenarios.slice(0, 5) : [],
        coding: Array.isArray(parsed.practice?.coding) ? parsed.practice!.coding.slice(0, 5) : undefined,
      },
    };
  });

// ---------- 3) Weekly assessment ----------

const WeekInput = z.object({
  courseId: z.string().uuid(),
  week: z.number().int().min(1).max(10),
  weekTitle: z.string().max(200).optional(),
});

export const generateWeeklyAssessment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => WeekInput.parse(v))
  .handler(async ({ data, context }): Promise<WeeklyAssessment> => {
    const { supabase, userId } = context;
    const { course, role, learnerCtx, progress } = await gatherGrounding(supabase, userId, data.courseId);
    const system = [
      baseSystem(course, role, learnerCtx, progress),
      `Produce a Weekly Assessment for Week ${data.week}${data.weekTitle ? ` ("${data.weekTitle}")` : ""}.`,
      `JSON schema:`,
      `{`,
      `  "title": string,`,
      `  "mcq":  [ { "question": string, "options": string[4], "answerIndex": number, "explanation": string } ], // 8`,
      `  "short":[ { "question": string, "sampleAnswer": string } ], // 3`,
      `  "miniAssignment": { "title": string, "description": string, "deliverables": string[] },`,
      `  "revision": string[]  // 6-10 rapid recap bullets`,
      `}`,
    ].join("\n");
    const user = `Generate the Week ${data.week} assessment for "${course.title}".`;
    const raw = await callCareerAI(system, user);
    const parsed = safeJson<Partial<WeeklyAssessment>>(raw);
    return {
      week: data.week,
      title: parsed?.title ?? `Week ${data.week} Assessment`,
      mcq: Array.isArray(parsed?.mcq) ? parsed!.mcq!.slice(0, 12) : [],
      short: Array.isArray(parsed?.short) ? parsed!.short!.slice(0, 5) : [],
      miniAssignment: parsed?.miniAssignment ?? { title: "Mini Assignment", description: "", deliverables: [] },
      revision: Array.isArray(parsed?.revision) ? parsed!.revision!.slice(0, 12) : [],
    };
  });

// ---------- 4) Final exam ----------

const FinalInput = z.object({ courseId: z.string().uuid() });

export const generateFinalExam = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => FinalInput.parse(v))
  .handler(async ({ data, context }): Promise<FinalExam> => {
    const { supabase, userId } = context;
    const { course, role, learnerCtx, progress } = await gatherGrounding(supabase, userId, data.courseId);
    const system = [
      baseSystem(course, role, learnerCtx, progress),
      `Produce the FINAL EXAM covering all 10 weeks of "${course.title}".`,
      `JSON schema:`,
      `{`,
      `  "title": string,`,
      `  "mcq":  [ { "question": string, "options": string[4], "answerIndex": number, "explanation": string } ], // 15`,
      `  "longAnswers": [ { "question": string, "rubric": string[] } ], // 3`,
      `  "project": { "title": string, "brief": string, "deliverables": string[], "evaluation": string[] }`,
      `}`,
    ].join("\n");
    const user = `Generate the comprehensive final exam for "${course.title}".`;
    const raw = await callCareerAI(system, user);
    const parsed = safeJson<Partial<FinalExam>>(raw);
    return {
      title: parsed?.title ?? `${course.title} — Final Exam`,
      mcq: Array.isArray(parsed?.mcq) ? parsed!.mcq!.slice(0, 20) : [],
      longAnswers: Array.isArray(parsed?.longAnswers) ? parsed!.longAnswers!.slice(0, 5) : [],
      project: parsed?.project ?? { title: "Capstone Project", brief: "", deliverables: [], evaluation: [] },
    };
  });

// ---------- 5) Attach existing library resources ----------

const ResourcesInput = z.object({ courseId: z.string().uuid() });

export const listCourseResources = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => ResourcesInput.parse(v))
  .handler(async ({ data, context }): Promise<AttachedResource[]> => {
    const { supabase } = context;
    // Only pull existing rows from the library — never insert new ones.
    const { data: rows } = await supabase
      .from("resources")
      .select("id, title, kind, description, url, course_id, order_index, courses:course_id(title)")
      .eq("course_id", data.courseId)
      .order("order_index");
    return (rows ?? []).map((r: any) => ({
      id: r.id,
      title: r.title,
      kind: r.kind ?? "note",
      description: r.description ?? null,
      url: r.url ?? null,
      courseTitle: r.courses?.title ?? null,
    }));
  });

// ---------- 6) Persist progress ----------

const ProgressInput = z.object({
  courseId: z.string().uuid(),
  completedUnits: z.number().int().min(0).max(70),
});

export const saveCourseProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => ProgressInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const pct = Math.round((data.completedUnits / 70) * 100);
    await supabase
      .from("course_enrollments")
      .update({ progress: pct })
      .eq("user_id", userId)
      .eq("course_id", data.courseId);
    return { progress: pct };
  });
