import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCareerAI, safeJson } from "./career.server";

const GenInput = z.object({
  role: z.string().min(2).max(80),
  currentLevel: z.string().max(60).optional(),
  targetMonths: z.number().int().min(1).max(36).default(6),
});

type Roadmap = {
  role: string;
  milestones: Array<{
    title: string;
    duration_weeks: number;
    skills: string[];
    resources: string[];
    projects: string[];
    outcome: string;
  }>;
};

export const generateRoadmap = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => GenInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const system =
      "You are a career mentor. Create a personalised roadmap as JSON: { role, milestones: [{ title, duration_weeks (1-16), skills[], resources[], projects[], outcome }] }. 6-10 milestones ordered from fundamentals to advanced, realistic for the target months.";
    const raw = await callCareerAI(system, JSON.stringify(data));
    const parsed = safeJson<Roadmap>(raw);
    if (!parsed || !Array.isArray(parsed.milestones)) throw new Error("Roadmap generation failed. Please retry.");

    const { data: row, error } = await supabase
      .from("career_roadmaps")
      .insert({
        user_id: userId,
        role: data.role,
        milestones: parsed.milestones as never,
        status: "active",
        progress: 0,
      })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return { roadmap: row };
  });

export const listRoadmaps = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("career_roadmaps").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    return { roadmaps: data ?? [] };
  });

const UpdateInput = z.object({ id: z.string().uuid(), progress: z.number().min(0).max(100), status: z.enum(["draft", "active", "completed", "archived"]).optional() });

export const updateRoadmap = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => UpdateInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const patch: Record<string, unknown> = { progress: data.progress };
    if (data.status) patch.status = data.status;
    const { error } = await supabase.from("career_roadmaps").update(patch as never).eq("id", data.id).eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
