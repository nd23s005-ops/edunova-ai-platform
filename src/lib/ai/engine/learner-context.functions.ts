import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { shortHash } from "./ai.server";

export type CourseLevel = "beginner" | "basic" | "intermediate" | "advanced" | "expert" | "industry_ready";

export type LearnerContext = {
  userId: string;
  role: string | null;
  skillLevel: CourseLevel;
  careerGoal: string | null;
  learningSpeed: string;
  preferredDepth: string;
  interests: string[];
  weakTopics: string[];
  strongTopics: string[];
  contextHash: string;
};

const LEVELS: CourseLevel[] = ["beginner", "basic", "intermediate", "advanced", "expert", "industry_ready"];
function isLevel(v: unknown): v is CourseLevel {
  return typeof v === "string" && (LEVELS as string[]).includes(v);
}

export const getLearnerContext = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<LearnerContext> => {
    const { supabase, userId } = context;

    const [{ data: ctxRow }, { data: roleRow }] = await Promise.all([
      supabase
        .from("learner_context")
        .select("skill_level, career_goal, learning_speed, preferred_depth, interests, weak_topics, strong_topics, context_hash")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle(),
    ]);

    // Derive weak/strong topics from recent quiz + weekly attempts if we have none stored.
    let weak: string[] = ctxRow?.weak_topics ?? [];
    let strong: string[] = ctxRow?.strong_topics ?? [];
    if (weak.length === 0 && strong.length === 0) {
      const { data: subj } = await supabase
        .from("subject_quiz_attempts")
        .select("weaknesses, strengths")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);
      for (const a of subj ?? []) {
        if (Array.isArray(a.weaknesses)) weak.push(...(a.weaknesses as string[]));
        if (Array.isArray(a.strengths)) strong.push(...(a.strengths as string[]));
      }
      weak = Array.from(new Set(weak)).slice(0, 12);
      strong = Array.from(new Set(strong)).slice(0, 12);
    }

    const skillLevel: CourseLevel = isLevel(ctxRow?.skill_level) ? ctxRow!.skill_level as CourseLevel : "beginner";
    const careerGoal = ctxRow?.career_goal ?? null;
    const learningSpeed = ctxRow?.learning_speed ?? "balanced";
    const preferredDepth = ctxRow?.preferred_depth ?? "balanced";
    const interests: string[] = ctxRow?.interests ?? [];

    const hash =
      ctxRow?.context_hash ??
      shortHash(
        [skillLevel, careerGoal ?? "", learningSpeed, preferredDepth, interests.join(","), weak.join(","), strong.join(",")].join("|"),
      );

    return {
      userId,
      role: (roleRow?.role as string | undefined) ?? null,
      skillLevel,
      careerGoal,
      learningSpeed,
      preferredDepth,
      interests,
      weakTopics: weak,
      strongTopics: strong,
      contextHash: hash,
    };
  });

const UpdateInput = z.object({
  skillLevel: z.enum(["beginner", "basic", "intermediate", "advanced", "expert", "industry_ready"]).optional(),
  careerGoal: z.string().max(200).nullable().optional(),
  learningSpeed: z.enum(["slow", "balanced", "fast"]).optional(),
  preferredDepth: z.enum(["concise", "balanced", "deep"]).optional(),
  interests: z.array(z.string().max(60)).max(20).optional(),
});

export const updateLearnerContext = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => UpdateInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const merged = shortHash(JSON.stringify(data) + "|" + Date.now().toString(36));
    const payload = {
      user_id: userId,
      skill_level: data.skillLevel ?? "beginner",
      career_goal: data.careerGoal ?? null,
      learning_speed: data.learningSpeed ?? "balanced",
      preferred_depth: data.preferredDepth ?? "balanced",
      interests: data.interests ?? [],
      context_hash: merged,
    };
    const { error } = await supabase
      .from("learner_context")
      .upsert(payload, { onConflict: "user_id" });
    if (error) throw new Error(error.message);
    return { ok: true, contextHash: merged };
  });
