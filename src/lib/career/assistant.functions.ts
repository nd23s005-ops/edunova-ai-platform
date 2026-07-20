import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCareerAI, safeJson } from "./career.server";

const Input = z.object({
  message: z.string().min(1).max(2000),
  history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(2000) })).max(20).default([]),
});
type Reply = { answer: string; suggestions?: string[] };

export const askCareerAssistant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => Input.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    // Ground with a small snapshot of the user's career state
    const [profileRes, resumesRes, skillGapRes, roadmapRes] = await Promise.all([
      supabase.from("career_profiles").select("career_goal, target_roles, experience_level").eq("user_id", userId).maybeSingle(),
      supabase.from("resumes").select("id, ats_score").eq("user_id", userId).limit(3),
      supabase.from("skill_gap_reports").select("target_role, readiness_pct").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("career_roadmaps").select("role, progress").eq("user_id", userId).eq("status", "active").limit(3),
    ]);

    const system = [
      "You are Nova Career Assistant. You give practical career advice (learning paths, resumes, projects, interviews, jobs, internships, certifications). Keep answers concise, actionable, and grounded in the user's snapshot when relevant.",
      "Return JSON: { answer (markdown), suggestions?: string[] (up to 4 short follow-ups) }.",
    ].join("\n");
    const user = JSON.stringify({
      snapshot: { profile: profileRes.data, resumes: resumesRes.data, skill_gap: skillGapRes.data, roadmaps: roadmapRes.data },
      history: data.history,
      message: data.message,
    });
    const raw = await callCareerAI(system, user);
    const parsed = safeJson<Reply>(raw);
    if (!parsed?.answer) throw new Error("Assistant failed.");
    return parsed;
  });
