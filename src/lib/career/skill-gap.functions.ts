import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCareerAI, safeJson } from "./career.server";

const Input = z.object({
  targetRole: z.string().min(2).max(80),
  currentSkills: z.array(z.string().max(60)).max(50).default([]),
});

type Report = {
  readiness_pct: number;
  strong_skills: string[];
  weak_skills: string[];
  missing_skills: string[];
  estimated_learning_hours: number;
  recommendations: Array<{ area: string; action: string }>;
  summary: string;
};

export const analyzeSkillGap = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => Input.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const system =
      "You are an industry skills analyst. Given a target role and current skills list, return JSON: { readiness_pct (0-100), strong_skills[], weak_skills[], missing_skills[], estimated_learning_hours (int), recommendations: [{ area, action }], summary (<= 3 sentences) }.";
    const raw = await callCareerAI(system, JSON.stringify(data));
    const parsed = safeJson<Report>(raw);
    if (!parsed) throw new Error("Analysis failed. Please retry.");

    const { data: row, error } = await supabase
      .from("skill_gap_reports")
      .insert({
        user_id: userId,
        target_role: data.targetRole,
        current_skills: data.currentSkills as never,
        strong_skills: parsed.strong_skills as never,
        weak_skills: parsed.weak_skills as never,
        missing_skills: parsed.missing_skills as never,
        readiness_pct: parsed.readiness_pct,
        estimated_learning_hours: parsed.estimated_learning_hours,
        recommendations: parsed.recommendations as never,
        ai_summary: parsed.summary,
      })
      .select("*").single();
    if (error) throw new Error(error.message);
    return { report: row };
  });

export const listSkillGapReports = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("skill_gap_reports").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(10);
    return { reports: data ?? [] };
  });
