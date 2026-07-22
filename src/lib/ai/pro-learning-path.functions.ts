// Professional Upskilling AI Learning Path — 5 weeks × 7 units (35 units).
// Personalized to the working professional's role, experience, industry and goal.
// Attaches existing library resources by keyword — never creates new resources.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCareerAI, safeJson } from "@/lib/career/career.server";
import type {
  CourseOutline,
  CourseOutlineWeek,
  UnitContent,
  WeeklyAssessment,
  FinalExam,
  AttachedResource,
} from "@/lib/ai/learning-path.functions";

// Reuse UI-facing shapes so the workspace can share components.
export type ProCourseOutline = Omit<CourseOutline, "weeks"> & { weeks: CourseOutlineWeek[] };
export type ProUnitContent = UnitContent;
export type ProWeeklyAssessment = WeeklyAssessment;
export type ProFinalExam = FinalExam;
export type ProAttachedResource = AttachedResource;

const TECH_HINTS =
  /gen(erative)?\s*ai|openai|llm|agent|prompt|langchain|rag|vector|python|javascript|typescript|code|dev|ml|data|api|cloud|devops|sql|automation/i;

function isTechnicalTrack(title: string, category: string): boolean {
  return TECH_HINTS.test(`${title} ${category}`);
}

async function gatherProGrounding(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  userId: string,
  courseId: string,
) {
  const [courseRes, profileRes, enrollRes, learnerCtxRes] = await Promise.all([
    supabase
      .from("upskill_courses")
      .select("id, title, category, description, difficulty, estimated_hours, learning_objectives, prerequisites, modules")
      .eq("id", courseId)
      .maybeSingle(),
    supabase
      .from("career_profiles")
      .select("career_goal, target_roles, experience_level, bio")
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("upskill_enrollments")
      .select("progress, completed_modules")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .maybeSingle(),
    supabase
      .from("learner_context")
      .select("skill_level, career_goal, preferred_depth, interests, weak_topics")
      .eq("user_id", userId)
      .maybeSingle(),
  ]);
  if (!courseRes.data) throw new Error("Upskill course not found");
  return {
    course: courseRes.data as {
      id: string;
      title: string;
      category: string;
      description: string | null;
      difficulty: string | null;
      estimated_hours: number | null;
      learning_objectives: string[] | null;
      prerequisites: string[] | null;
      modules: Array<{ title: string; summary?: string }> | null;
    },
    profile: profileRes.data as {
      career_goal?: string | null;
      target_roles?: string[] | null;
      experience_level?: string | null;
      bio?: string | null;
    } | null,
    progress: (enrollRes.data?.progress as number | null) ?? 0,
    ctx: learnerCtxRes.data as {
      skill_level?: string | null;
      career_goal?: string | null;
      preferred_depth?: string | null;
      interests?: string[] | null;
      weak_topics?: string[] | null;
    } | null,
  };
}

function proSystem(
  course: { title: string; category: string; description: string | null; difficulty: string | null },
  profile: { career_goal?: string | null; target_roles?: string[] | null; experience_level?: string | null } | null,
  ctx: { skill_level?: string | null; career_goal?: string | null; preferred_depth?: string | null; interests?: string[] | null; weak_topics?: string[] | null } | null,
  progress: number,
) {
  return [
    `You are Nova, EduNova AI's executive upskilling coach for working professionals.`,
    `Learner is a working professional. Career goal: ${profile?.career_goal ?? ctx?.career_goal ?? "career growth"}. Experience level: ${profile?.experience_level ?? ctx?.skill_level ?? "mid-level"}. Target roles: ${(profile?.target_roles ?? []).slice(0, 4).join(", ") || "not specified"}.`,
    `Course: "${course.title}" — track ${course.category}, difficulty ${course.difficulty ?? "beginner→advanced"}, current progress ${progress}%.`,
    course.description ? `Description: ${course.description}` : "",
    ctx?.interests?.length ? `Interests: ${ctx.interests.slice(0, 5).join(", ")}.` : "",
    ctx?.weak_topics?.length ? `Reinforce weak areas: ${ctx.weak_topics.slice(0, 5).join(", ")}.` : "",
    `Tone: concise, outcome-oriented, executive-friendly. Emphasise industry relevance, business ROI, real case studies, and applied practice.`,
    `Every response must be strictly about "${course.title}". Return STRICT JSON only. No markdown fences. No extra keys.`,
  ]
    .filter(Boolean)
    .join("\n");
}

// ---------- 1) Outline: 5 × 7 = 35 units ----------

const OutlineInput = z.object({ courseId: z.string().uuid() });

export const generateProCourseOutline = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => OutlineInput.parse(v))
  .handler(async ({ data, context }): Promise<ProCourseOutline> => {
    const { supabase, userId } = context;
    const { course, profile, ctx, progress } = await gatherProGrounding(supabase, userId, data.courseId);
    const isTechnical = isTechnicalTrack(course.title, course.category);

    const system = [
      proSystem(course, profile, ctx, progress),
      `Design a 5-WEEK executive upskilling curriculum with EXACTLY 5 weeks and EXACTLY 7 units per week (35 units total).`,
      `Structure the arc from foundations → applied practice → advanced/real-world → capstone readiness across the 5 weeks.`,
      `JSON schema:`,
      `{ "weeks": [ { "index": number 1..5, "title": string, "theme": string,`,
      `"units": [ { "index": number 1..7, "title": string, "summary": string } ] } ] }`,
      `Titles concise (≤80 chars). Units progressive; no duplicates.`,
    ].join("\n");
    const user = `Generate the 5-week × 7-unit executive outline for "${course.title}".`;

    const raw = await callCareerAI(system, user);
    const parsed = safeJson<{ weeks?: CourseOutlineWeek[] }>(raw);
    const weeksIn = Array.isArray(parsed?.weeks) ? parsed!.weeks! : [];

    const weeks: CourseOutlineWeek[] = Array.from({ length: 5 }).map((_, wi) => {
      const w = weeksIn[wi];
      const units = (Array.isArray(w?.units) ? w!.units : []).slice(0, 7);
      while (units.length < 7) {
        units.push({
          index: units.length + 1,
          title: `Unit ${units.length + 1}: ${course.category} — applied practice`,
          summary: "Apply the week's concepts to a workplace scenario.",
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
      subject: course.category,
      isTechnical,
      weeks,
    };
  });

// ---------- 2) Unit content ----------

const UnitInput = z.object({
  courseId: z.string().uuid(),
  week: z.number().int().min(1).max(5),
  unit: z.number().int().min(1).max(7),
  unitTitle: z.string().max(200).optional(),
  weekTitle: z.string().max(200).optional(),
});

export const generateProUnitContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => UnitInput.parse(v))
  .handler(async ({ data, context }): Promise<ProUnitContent> => {
    const { supabase, userId } = context;
    const { course, profile, ctx, progress } = await gatherProGrounding(supabase, userId, data.courseId);
    const isTechnical = isTechnicalTrack(course.title, course.category);

    const system = [
      proSystem(course, profile, ctx, progress),
      `Produce a single professional UNIT for Week ${data.week}, Unit ${data.unit}${data.unitTitle ? ` ("${data.unitTitle}")` : ""}${data.weekTitle ? `, week theme "${data.weekTitle}"` : ""}.`,
      `Return STRICT JSON with this schema (keys mapped for the executive workspace):`,
      `{`,
      `  "title": string,`,
      `  "lesson": string,             // Learning Objectives + main lesson (4-7 paragraphs, start with an "Objectives:" bulleted line list)`,
      `  "explanation": string,        // Practical Concepts explained plainly (2-3 paragraphs)`,
      `  "theory": string,             // Theory / frameworks (2-4 paragraphs)`,
      `  "practicalExamples": string[],// 3-5 Industry Use Cases (markdown ok)`,
      `  "realWorldExamples": string[],// 3-5 Real Business Examples with company/context`,
      `  "notes": string[],            // 6-10 AI-generated study notes`,
      `  "summary": string,            // 3-5 sentence summary`,
      `  "keyPoints": string[],        // 5-8 Key Takeaways`,
      `  "interviewQuestions": [ { "question": string, "answer": string } ],  // 4-6 Best Practices framed as Q&A`,
      `  "commonMistakes": string[],   // 4-6 Common Mistakes`,
      `  "revision": string[],         // 5-8 Revision Notes`,
      `  "practice": {`,
      `    "mcq":         [ { "question": string, "options": string[4], "answerIndex": number, "explanation": string } ], // 4-6`,
      `    "fillBlanks":  [ { "prompt": string, "answer": string } ],  // 3-5`,
      `    "shortAnswers":[ { "question": string, "sampleAnswer": string } ],  // 2-3`,
      `    "scenarios":   [ { "title": string, "description": string, "hint": string } ],  // 2-3 real business scenarios / case studies`,
      isTechnical
        ? `    ,"coding":    [ { "title": string, "brief": string, "starter": string, "language": string } ]  // 2-3 live coding tasks / debugging exercises / mini projects`
        : ``,
      `  }`,
      `}`,
      isTechnical
        ? `Include hands-on coding tasks, debugging exercises, and at least one mini project idea in the practice section.`
        : `Include templates, frameworks, and practical assignment ideas in scenarios and short answers.`,
      `Everything must relate strictly to "${course.title}". Difficulty scales with week ${data.week}/5.`,
    ]
      .filter(Boolean)
      .join("\n");

    const user = `Generate Week ${data.week}, Unit ${data.unit} content now.`;
    const raw = await callCareerAI(system, user);
    const parsed = safeJson<Partial<ProUnitContent>>(raw);
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
        ? parsed.interviewQuestions
            .slice(0, 8)
            .map((q) => ({ question: String(q.question ?? ""), answer: String(q.answer ?? "") }))
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
  week: z.number().int().min(1).max(5),
  weekTitle: z.string().max(200).optional(),
});

export const generateProWeeklyAssessment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => WeekInput.parse(v))
  .handler(async ({ data, context }): Promise<ProWeeklyAssessment> => {
    const { supabase, userId } = context;
    const { course, profile, ctx, progress } = await gatherProGrounding(supabase, userId, data.courseId);
    const system = [
      proSystem(course, profile, ctx, progress),
      `Produce a Weekly Assessment for Week ${data.week}${data.weekTitle ? ` ("${data.weekTitle}")` : ""}.`,
      `Include a weekly quiz, quick test, a practical assignment, and revision — with AI feedback framing.`,
      `JSON schema:`,
      `{`,
      `  "title": string,`,
      `  "mcq":  [ { "question": string, "options": string[4], "answerIndex": number, "explanation": string } ], // 8`,
      `  "short":[ { "question": string, "sampleAnswer": string } ], // 3 (case-study style)`,
      `  "miniAssignment": { "title": string, "description": string, "deliverables": string[] }, // practical assignment / case study`,
      `  "revision": string[]  // 6-10 rapid recap bullets`,
      `}`,
    ].join("\n");
    const user = `Generate the Week ${data.week} assessment for "${course.title}".`;
    const raw = await callCareerAI(system, user);
    const parsed = safeJson<Partial<ProWeeklyAssessment>>(raw);
    return {
      week: data.week,
      title: parsed?.title ?? `Week ${data.week} Assessment`,
      mcq: Array.isArray(parsed?.mcq) ? parsed!.mcq!.slice(0, 12) : [],
      short: Array.isArray(parsed?.short) ? parsed!.short!.slice(0, 5) : [],
      miniAssignment: parsed?.miniAssignment ?? { title: "Practical Assignment", description: "", deliverables: [] },
      revision: Array.isArray(parsed?.revision) ? parsed!.revision!.slice(0, 12) : [],
    };
  });

// ---------- 4) Final capstone (Week 5) ----------

const FinalInput = z.object({ courseId: z.string().uuid() });

export const generateProFinalCapstone = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => FinalInput.parse(v))
  .handler(async ({ data, context }): Promise<ProFinalExam> => {
    const { supabase, userId } = context;
    const { course, profile, ctx, progress } = await gatherProGrounding(supabase, userId, data.courseId);
    const system = [
      proSystem(course, profile, ctx, progress),
      `Produce the FINAL Week-5 Capstone: comprehensive assessment + capstone project + practical evaluation + course completion test.`,
      `Design the project to be a realistic professional deliverable the learner could show in a portfolio or performance review.`,
      `JSON schema:`,
      `{`,
      `  "title": string,`,
      `  "mcq":  [ { "question": string, "options": string[4], "answerIndex": number, "explanation": string } ], // 15`,
      `  "longAnswers": [ { "question": string, "rubric": string[] } ], // 3 practical evaluation prompts`,
      `  "project": { "title": string, "brief": string, "deliverables": string[], "evaluation": string[] } // capstone`,
      `}`,
    ].join("\n");
    const user = `Generate the final capstone for "${course.title}".`;
    const raw = await callCareerAI(system, user);
    const parsed = safeJson<Partial<ProFinalExam>>(raw);
    return {
      title: parsed?.title ?? `${course.title} — Capstone Assessment`,
      mcq: Array.isArray(parsed?.mcq) ? parsed!.mcq!.slice(0, 20) : [],
      longAnswers: Array.isArray(parsed?.longAnswers) ? parsed!.longAnswers!.slice(0, 5) : [],
      project: parsed?.project ?? { title: "Capstone Project", brief: "", deliverables: [], evaluation: [] },
    };
  });

// ---------- 5) Attach library resources by keyword ----------

const ResourcesInput = z.object({ courseId: z.string().uuid() });

export const listProCourseResources = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => ResourcesInput.parse(v))
  .handler(async ({ data, context }): Promise<ProAttachedResource[]> => {
    const { supabase } = context;
    // Look up the upskill course, then match existing library resources by keyword.
    const { data: course } = await supabase
      .from("upskill_courses")
      .select("title, category")
      .eq("id", data.courseId)
      .maybeSingle();
    if (!course) return [];

    const tokens = `${(course as { title: string }).title} ${(course as { category: string }).category}`
      .toLowerCase()
      .split(/[^a-z0-9+.#]+/)
      .filter((t) => t.length > 2);
    const uniq = Array.from(new Set(tokens)).slice(0, 6);
    if (uniq.length === 0) return [];

    const ors = uniq
      .flatMap((t) => [`title.ilike.%${t}%`, `description.ilike.%${t}%`])
      .join(",");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: rows } = await (supabase as any)
      .from("resources")
      .select("id, title, kind, description, url")
      .or(ors)
      .limit(40);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((rows as any[]) ?? []).map((r) => ({
      id: r.id,
      title: r.title,
      kind: r.kind ?? "note",
      description: r.description ?? null,
      url: r.url ?? null,
      courseTitle: null,
    }));
  });

// ---------- 6) Persist progress ----------

const ProgressInput = z.object({
  courseId: z.string().uuid(),
  completedUnits: z.number().int().min(0).max(35),
});

export const saveProCourseProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => ProgressInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const pct = Math.round((data.completedUnits / 35) * 100);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("upskill_enrollments")
      .update({
        progress: pct,
        status: pct >= 100 ? "completed" : "active",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("course_id", data.courseId);
    return { progress: pct };
  });
