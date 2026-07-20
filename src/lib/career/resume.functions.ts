import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCareerAI, safeJson } from "./career.server";

const CreateInput = z.object({ title: z.string().min(1).max(120).default("My Resume"), template: z.string().max(40).default("modern") });

export const createResume = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => CreateInput.parse(v ?? {}))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("resumes")
      .insert({
        user_id: userId, title: data.title, template: data.template,
        sections: {
          personal: {}, objective: "", education: [], skills: [], experience: [],
          projects: [], certifications: [], achievements: [], languages: [], interests: [],
        } as never,
      })
      .select("*").single();
    if (error) throw new Error(error.message);
    return { resume: row };
  });

export const listResumes = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("resumes").select("*").eq("user_id", userId).order("updated_at", { ascending: false });
    return { resumes: data ?? [] };
  });

const GetInput = z.object({ id: z.string().uuid() });
export const getResume = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => GetInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row } = await supabase.from("resumes").select("*").eq("id", data.id).eq("user_id", userId).maybeSingle();
    return { resume: row };
  });

const SaveInput = z.object({
  id: z.string().uuid(),
  title: z.string().max(120).optional(),
  template: z.string().max(40).optional(),
  sections: z.record(z.string(), z.unknown()),
  create_version: z.boolean().default(false),
  version_note: z.string().max(200).optional(),
});
export const saveResume = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => SaveInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const patch: Record<string, unknown> = { sections: data.sections };
    if (data.title) patch.title = data.title;
    if (data.template) patch.template = data.template;
    const { data: row, error } = await supabase
      .from("resumes").update(patch).eq("id", data.id).eq("user_id", userId).select("*").single();
    if (error) throw new Error(error.message);
    if (data.create_version) {
      await supabase.from("resume_versions").insert({
        resume_id: data.id, user_id: userId, snapshot: data.sections as never, note: data.version_note ?? null,
      });
    }
    return { resume: row };
  });

const DelInput = z.object({ id: z.string().uuid() });
export const deleteResume = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => DelInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("resumes").delete().eq("id", data.id).eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const SuggestInput = z.object({
  section: z.enum(["objective", "experience", "projects", "skills", "achievements"]),
  content: z.string().max(4000),
  role: z.string().max(80).optional(),
});
type Suggestion = { improved: string; tips: string[] };
export const suggestSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => SuggestInput.parse(v))
  .handler(async ({ data }) => {
    const system =
      "You are a resume writing coach. Return JSON: { improved (string, ATS-friendly, quantified bullets when applicable), tips: string[] (max 5) }. Preserve facts, do not invent employers, degrees, or dates.";
    const raw = await callCareerAI(system, JSON.stringify(data));
    const parsed = safeJson<Suggestion>(raw);
    if (!parsed) throw new Error("Suggestion failed.");
    return parsed;
  });

const VerInput = z.object({ resume_id: z.string().uuid() });
export const listResumeVersions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => VerInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: rows } = await supabase
      .from("resume_versions").select("id, note, created_at")
      .eq("resume_id", data.resume_id).eq("user_id", userId)
      .order("created_at", { ascending: false }).limit(30);
    return { versions: rows ?? [] };
  });
