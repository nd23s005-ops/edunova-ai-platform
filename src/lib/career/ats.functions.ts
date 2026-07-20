import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCareerAI, safeJson } from "./career.server";

const Input = z.object({
  resume_id: z.string().uuid().optional(),
  jd_text: z.string().min(50).max(20000),
  resume_text: z.string().max(20000).optional(),
});

type AtsResult = {
  score: number;
  keywords_matched: string[];
  keywords_missing: string[];
  suggestions: Array<{ area: string; action: string }>;
  summary: string;
};

export const analyzeAts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => Input.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    let resumeText = data.resume_text ?? "";
    if (!resumeText && data.resume_id) {
      const { data: r } = await supabase
        .from("resumes").select("sections").eq("id", data.resume_id).eq("user_id", userId).maybeSingle();
      resumeText = JSON.stringify(r?.sections ?? {});
    }
    if (!resumeText) throw new Error("Provide a resume or resume text.");

    const system =
      "You are an ATS analyzer. Compare resume vs job description. Return JSON: { score (0-100), keywords_matched: string[] (max 30), keywords_missing: string[] (max 30), suggestions: [{ area, action }] (max 8), summary (<= 3 sentences) }.";
    const raw = await callCareerAI(system, JSON.stringify({ resume: resumeText.slice(0, 8000), jd: data.jd_text }));
    const parsed = safeJson<AtsResult>(raw);
    if (!parsed) throw new Error("ATS analysis failed.");

    const { data: row, error } = await supabase
      .from("ats_reports")
      .insert({
        user_id: userId,
        resume_id: data.resume_id ?? null,
        jd_text: data.jd_text.slice(0, 5000),
        score: parsed.score,
        keywords_matched: parsed.keywords_matched as never,
        keywords_missing: parsed.keywords_missing as never,
        suggestions: parsed.suggestions as never,
        ai_summary: parsed.summary,
      })
      .select("*").single();
    if (error) throw new Error(error.message);

    if (data.resume_id) {
      await supabase.from("resumes").update({ ats_score: parsed.score }).eq("id", data.resume_id).eq("user_id", userId);
    }
    return { report: row };
  });

export const listAtsReports = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("ats_reports").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20);
    return { reports: data ?? [] };
  });
