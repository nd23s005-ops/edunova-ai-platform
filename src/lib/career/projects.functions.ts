import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCareerAI, safeJson } from "./career.server";

const RecInput = z.object({
  role: z.string().max(80).optional(),
  skills: z.array(z.string().max(60)).max(30).default([]),
  level: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
  count: z.number().int().min(1).max(10).default(5),
});
type Projects = { projects: Array<{ title: string; objective: string; features: string[]; technologies: string[]; learning_outcome: string; category?: string }> };

export const recommendProjects = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => RecInput.parse(v ?? {}))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const system =
      "You recommend concrete portfolio projects. Return JSON: { projects: [{ title, objective, features[], technologies[], learning_outcome, category }] }. Match the requested level and skills. No duplicates.";
    const raw = await callCareerAI(system, JSON.stringify(data));
    const parsed = safeJson<Projects>(raw);
    const list = parsed?.projects ?? [];
    if (!list.length) throw new Error("Could not generate projects.");
    const rows = list.slice(0, data.count).map((p) => ({
      user_id: userId,
      level: data.level,
      title: p.title.slice(0, 120),
      objective: p.objective?.slice(0, 500) ?? "",
      features: p.features as never,
      technologies: p.technologies ?? [],
      learning_outcome: p.learning_outcome?.slice(0, 400) ?? "",
      category: p.category?.slice(0, 60) ?? null,
    }));
    const { data: inserted, error } = await supabase.from("project_recommendations").insert(rows).select("*");
    if (error) throw new Error(error.message);
    return { projects: inserted ?? [] };
  });

export const listProjectRecommendations = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("project_recommendations").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(50);
    return { projects: data ?? [] };
  });

const Toggle = z.object({ id: z.string().uuid(), saved: z.boolean() });
export const toggleProjectSaved = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => Toggle.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("project_recommendations").update({ saved: data.saved }).eq("id", data.id).eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
