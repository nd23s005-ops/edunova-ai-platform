import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCareerAI, safeJson } from "./career.server";

const OpInput = z.object({
  kind: z.enum(["job", "internship"]),
  skills: z.array(z.string().max(60)).max(30).default([]),
  role: z.string().max(80).optional(),
  location: z.string().max(80).optional(),
  mode: z.enum(["remote", "hybrid", "onsite", "any"]).default("any"),
  count: z.number().int().min(3).max(15).default(8),
});
type Feed = { items: Array<{ title: string; company: string; location?: string; mode?: string; skills: string[]; description?: string; stipend?: string; salary?: string; ai_match_score: number; url?: string; employment_type?: string; duration?: string }> };

export const recommendOpportunities = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => OpInput.parse(v ?? {}))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const system =
      "You are a career opportunity curator. Return JSON: { items: [{ title, company, location, mode, skills[], description (<= 2 sentences), ai_match_score (0-100), url (optional), employment_type (job only), duration (internship only), stipend (internship optional), salary (job optional) }] }. Use realistic Indian/global companies (mix). Score by fit to given skills. Do not invent live URLs; use placeholder URLs like https://example.com/jobs/<slug>.";
    const raw = await callCareerAI(system, JSON.stringify(data));
    const parsed = safeJson<Feed>(raw);
    const list = parsed?.items ?? [];
    if (!list.length) throw new Error("No opportunities generated.");

    if (data.kind === "job") {
      const rows = list.slice(0, data.count).map((j) => ({
        user_id: userId, source: "ai", title: j.title.slice(0, 200), company: j.company?.slice(0, 120) ?? null,
        location: j.location?.slice(0, 120) ?? null, mode: j.mode?.slice(0, 20) ?? null,
        employment_type: j.employment_type?.slice(0, 40) ?? null, salary_range: j.salary?.slice(0, 60) ?? null,
        skills: j.skills ?? [], description: j.description?.slice(0, 1000) ?? null,
        url: j.url?.slice(0, 500) ?? null, ai_match_score: j.ai_match_score ?? 0,
      }));
      const { data: inserted, error } = await supabase.from("jobs").insert(rows).select("*");
      if (error) throw new Error(error.message);
      return { items: inserted ?? [] };
    } else {
      const rows = list.slice(0, data.count).map((j) => ({
        user_id: userId, source: "ai", title: j.title.slice(0, 200), company: j.company?.slice(0, 120) ?? null,
        location: j.location?.slice(0, 120) ?? null, mode: j.mode?.slice(0, 20) ?? null,
        duration: j.duration?.slice(0, 40) ?? null, stipend: j.stipend?.slice(0, 60) ?? null,
        skills: j.skills ?? [], description: j.description?.slice(0, 1000) ?? null,
        url: j.url?.slice(0, 500) ?? null, ai_match_score: j.ai_match_score ?? 0,
      }));
      const { data: inserted, error } = await supabase.from("internships").insert(rows).select("*");
      if (error) throw new Error(error.message);
      return { items: inserted ?? [] };
    }
  });

const ListInput = z.object({ kind: z.enum(["job", "internship"]) });
export const listOpportunities = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => ListInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const table = data.kind === "job" ? "jobs" : "internships";
    const { data: rows } = await supabase.from(table).select("*").eq("user_id", userId).order("ai_match_score", { ascending: false }).limit(50);
    return { items: rows ?? [] };
  });

const AppInput = z.object({
  kind: z.enum(["job", "internship"]),
  target_id: z.string().uuid().optional(),
  manual_title: z.string().max(200).optional(),
  manual_company: z.string().max(200).optional(),
  status: z.enum(["saved", "applied", "interview", "offer", "rejected", "withdrawn"]).default("saved"),
  notes: z.string().max(2000).optional(),
});
export const upsertApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => AppInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const table = data.kind === "job" ? "job_applications" : "internship_applications";
    const idCol = data.kind === "job" ? "job_id" : "internship_id";
    const applied_at = data.status !== "saved" ? new Date().toISOString() : null;
    const { data: row, error } = await supabase.from(table).insert({
      user_id: userId,
      [idCol]: data.target_id ?? null,
      manual_title: data.manual_title ?? null,
      manual_company: data.manual_company ?? null,
      status: data.status,
      notes: data.notes ?? null,
      applied_at,
    } as never).select("*").single();
    if (error) throw new Error(error.message);
    return { application: row };
  });

export const listApplications = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => ListInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const table = data.kind === "job" ? "job_applications" : "internship_applications";
    const { data: rows } = await supabase.from(table).select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(50);
    return { applications: rows ?? [] };
  });
