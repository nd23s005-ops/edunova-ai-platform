import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callGatewayJSON, safeParse, shortHash } from "./ai.server";

export type CourseOverview = {
  overview: string;
  objectives: string[];
  skills: string[];
  industryRelevance: string;
  careerOpportunities: string[];
  outcomes: string[];
  prerequisites: string[];
  generatedAt: string;
  contextHash: string | null;
};

const Input = z.object({ courseId: z.string().uuid(), refresh: z.boolean().optional() });

const MODEL = "google/gemini-3-flash-preview";

function asStrings(v: unknown, max = 10): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => (typeof x === "string" ? x : typeof x === "object" && x && "title" in x ? String((x as { title: unknown }).title) : "")).filter(Boolean).slice(0, max);
}

export const getOrGenerateCourseOverview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => Input.parse(v))
  .handler(async ({ data, context }): Promise<CourseOverview> => {
    const { supabase, userId } = context;

    // Load learner context inline (avoid cross-fn call so we stay in one RLS pass)
    const { data: ctx } = await supabase
      .from("learner_context")
      .select("skill_level, career_goal, learning_speed, preferred_depth, interests, weak_topics, strong_topics, context_hash")
      .eq("user_id", userId)
      .maybeSingle();

    const contextHash =
      ctx?.context_hash ??
      shortHash([
        ctx?.skill_level ?? "beginner",
        ctx?.career_goal ?? "",
        ctx?.learning_speed ?? "balanced",
        (ctx?.interests ?? []).join(","),
      ].join("|"));

    // Try cache
    if (!data.refresh) {
      const { data: cached } = await supabase
        .from("ai_course_overviews")
        .select("*")
        .eq("user_id", userId)
        .eq("course_id", data.courseId)
        .maybeSingle();
      if (cached && cached.context_hash === contextHash) {
        return {
          overview: cached.overview,
          objectives: cached.objectives as string[],
          skills: cached.skills as string[],
          industryRelevance: cached.industry_relevance ?? "",
          careerOpportunities: cached.career_opportunities as string[],
          outcomes: cached.outcomes as string[],
          prerequisites: cached.prerequisites as string[],
          generatedAt: cached.updated_at,
          contextHash: cached.context_hash,
        };
      }
    }

    // Fetch course
    const { data: course, error } = await supabase
      .from("courses")
      .select("title, subject, description, difficulty, board, class_min, class_max, estimated_hours")
      .eq("id", data.courseId)
      .maybeSingle();
    if (error || !course) throw new Error("Course not found");

    const learnerLine = [
      `Skill level: ${ctx?.skill_level ?? "beginner"}.`,
      ctx?.career_goal ? `Career goal: ${ctx.career_goal}.` : "",
      `Learning pace: ${ctx?.learning_speed ?? "balanced"}.`,
      `Preferred depth: ${ctx?.preferred_depth ?? "balanced"}.`,
      ctx?.interests?.length ? `Interests: ${ctx.interests.join(", ")}.` : "",
      ctx?.weak_topics?.length ? `Weak topics to reinforce: ${ctx.weak_topics.join(", ")}.` : "",
      ctx?.strong_topics?.length ? `Strong topics: ${ctx.strong_topics.join(", ")}.` : "",
    ].filter(Boolean).join(" ");

    const system = `You are Nova, EduNova AI's learning designer. Generate a personalized course overview.

Learner: ${learnerLine}
Course: "${course.title}" — Subject: ${course.subject}. Difficulty: ${course.difficulty}. Board: ${course.board}. Grade range: ${course.class_min}-${course.class_max}. ${course.description ? `Description: ${course.description}.` : ""}

Return STRICT JSON only, no code fences, matching this exact shape:
{
  "overview": string (120-220 words, second-person, engaging, tailored to the learner),
  "objectives": string[] (5-7 specific learning objectives),
  "skills": string[] (6-10 concrete skills gained),
  "industryRelevance": string (2-3 sentences explaining why this matters in industry),
  "careerOpportunities": string[] (4-6 career paths this enables),
  "outcomes": string[] (4-6 learning outcomes phrased as "You will..."),
  "prerequisites": string[] (2-4 prerequisites; empty array if none required)
}

Keep each list item concise (under 120 chars). No markdown. Personalize using the learner's context.`;

    const raw = await callGatewayJSON(system, `Generate the overview JSON now.`, MODEL);
    const parsed = safeParse<Record<string, unknown>>(raw) ?? {};

    const result: CourseOverview = {
      overview: typeof parsed.overview === "string" ? parsed.overview : "",
      objectives: asStrings(parsed.objectives, 8),
      skills: asStrings(parsed.skills, 12),
      industryRelevance: typeof parsed.industryRelevance === "string" ? parsed.industryRelevance : "",
      careerOpportunities: asStrings(parsed.careerOpportunities, 8),
      outcomes: asStrings(parsed.outcomes, 8),
      prerequisites: asStrings(parsed.prerequisites, 6),
      generatedAt: new Date().toISOString(),
      contextHash,
    };

    if (!result.overview) throw new Error("AI returned an empty overview");

    await supabase.from("ai_course_overviews").upsert(
      {
        user_id: userId,
        course_id: data.courseId,
        overview: result.overview,
        objectives: result.objectives,
        skills: result.skills,
        industry_relevance: result.industryRelevance,
        career_opportunities: result.careerOpportunities,
        outcomes: result.outcomes,
        prerequisites: result.prerequisites,
        model: MODEL,
        context_hash: contextHash,
      },
      { onConflict: "user_id,course_id" },
    );

    return result;
  });
