import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callGatewayJSON, safeParse, shortHash } from "./ai.server";

export type LessonContent = {
  intro: string;
  concepts: { title: string; body: string }[];
  steps: string[];
  examples: { title: string; body: string }[];
  visualDescription: string;
  useCases: string[];
  summary: string;
  keyTakeaways: string[];
  generatedAt: string;
  contextHash: string | null;
};

const MODEL = "google/gemini-3-flash-preview";
const Input = z.object({ lessonId: z.string().uuid(), refresh: z.boolean().optional() });

function asTitleBody(v: unknown, max = 6): { title: string; body: string }[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => {
      if (typeof x === "string") return { title: "", body: x };
      if (x && typeof x === "object") {
        const o = x as Record<string, unknown>;
        return { title: String(o.title ?? ""), body: String(o.body ?? o.text ?? o.description ?? "") };
      }
      return { title: "", body: "" };
    })
    .filter((x) => x.body)
    .slice(0, max);
}

function asStrings(v: unknown, max = 10): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((s): s is string => typeof s === "string" && s.length > 0).slice(0, max);
}

export const getOrGenerateLessonContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => Input.parse(v))
  .handler(async ({ data, context }): Promise<LessonContent> => {
    const { supabase, userId } = context;

    // Learner context (inline, single query)
    const { data: ctx } = await supabase
      .from("learner_context")
      .select("skill_level, career_goal, learning_speed, preferred_depth, interests, weak_topics, context_hash")
      .eq("user_id", userId)
      .maybeSingle();
    const contextHash =
      ctx?.context_hash ??
      shortHash([ctx?.skill_level ?? "beginner", ctx?.preferred_depth ?? "balanced", (ctx?.interests ?? []).join(",")].join("|"));

    if (!data.refresh) {
      const { data: cached } = await supabase
        .from("ai_lesson_content")
        .select("*")
        .eq("user_id", userId)
        .eq("lesson_id", data.lessonId)
        .maybeSingle();
      if (cached && cached.context_hash === contextHash) {
        return {
          intro: cached.intro,
          concepts: cached.concepts as { title: string; body: string }[],
          steps: cached.steps as string[],
          examples: cached.examples as { title: string; body: string }[],
          visualDescription: cached.visual_description ?? "",
          useCases: cached.use_cases as string[],
          summary: cached.summary ?? "",
          keyTakeaways: cached.key_takeaways as string[],
          generatedAt: cached.updated_at,
          contextHash: cached.context_hash,
        };
      }
    }

    const { data: lesson, error } = await supabase
      .from("lessons")
      .select("title, theory, key_notes, chapter_id, estimated_minutes, chapters:chapter_id (title, courses:course_id (title, subject, difficulty))")
      .eq("id", data.lessonId)
      .maybeSingle();
    if (error || !lesson) throw new Error("Lesson not found");

    const chapter = (lesson.chapters as unknown as { title?: string; courses?: { title?: string; subject?: string; difficulty?: string } } | null) ?? null;
    const course = chapter?.courses ?? null;

    const learnerLine = [
      `Skill level: ${ctx?.skill_level ?? "beginner"}.`,
      `Pace: ${ctx?.learning_speed ?? "balanced"}. Depth: ${ctx?.preferred_depth ?? "balanced"}.`,
      ctx?.career_goal ? `Career goal: ${ctx.career_goal}.` : "",
      ctx?.weak_topics?.length ? `Reinforce these weak topics if relevant: ${ctx.weak_topics.slice(0, 6).join(", ")}.` : "",
    ].filter(Boolean).join(" ");

    const system = `You are Nova, EduNova AI's lesson enhancer. Rewrite this lesson as a personalized, structured breakdown.

Learner: ${learnerLine}
Course: ${course?.title ?? ""} (${course?.subject ?? ""}, ${course?.difficulty ?? ""}). Chapter: ${chapter?.title ?? ""}. Lesson: "${lesson.title}".
Existing theory (may be partial): ${(lesson.theory ?? "").slice(0, 1200)}

Return STRICT JSON only, no markdown, matching:
{
  "intro": string (2-3 sentences hooking the learner),
  "concepts": [{ "title": string, "body": string (2-4 sentences) }] (3-5 items),
  "steps": string[] (4-7 step-by-step how-it-works items),
  "examples": [{ "title": string, "body": string }] (2-3 concrete worked examples),
  "visualDescription": string (describe the ideal diagram in 2 sentences; no image url),
  "useCases": string[] (3-5 real-world use cases),
  "summary": string (3-4 sentence wrap-up),
  "keyTakeaways": string[] (4-6 short bullet takeaways)
}
Adapt vocabulary, examples and depth to the learner. No unsafe content. No code fences.`;

    const raw = await callGatewayJSON(system, `Generate the enhanced lesson JSON now.`, MODEL);
    const parsed = safeParse<Record<string, unknown>>(raw) ?? {};

    const result: LessonContent = {
      intro: typeof parsed.intro === "string" ? parsed.intro : "",
      concepts: asTitleBody(parsed.concepts, 6),
      steps: asStrings(parsed.steps, 10),
      examples: asTitleBody(parsed.examples, 4),
      visualDescription: typeof parsed.visualDescription === "string" ? parsed.visualDescription : "",
      useCases: asStrings(parsed.useCases, 6),
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      keyTakeaways: asStrings(parsed.keyTakeaways, 8),
      generatedAt: new Date().toISOString(),
      contextHash,
    };
    if (!result.intro && result.concepts.length === 0) throw new Error("AI returned empty content");

    await supabase.from("ai_lesson_content").upsert(
      {
        user_id: userId,
        lesson_id: data.lessonId,
        intro: result.intro,
        concepts: result.concepts,
        steps: result.steps,
        examples: result.examples,
        visual_description: result.visualDescription,
        use_cases: result.useCases,
        summary: result.summary,
        key_takeaways: result.keyTakeaways,
        model: MODEL,
        context_hash: contextHash,
      },
      { onConflict: "user_id,lesson_id" },
    );

    return result;
  });
