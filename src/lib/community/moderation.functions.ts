import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCommunityAI, safeJson } from "./community.server";
import type { Json } from "@/integrations/supabase/types";

type Flags = {
  spam: number; toxicity: number; harassment: number; hate: number;
  harmful: number; duplicate_probability: number; summary: string;
};

const EMPTY_FLAGS: Flags = {
  spam: 0, toxicity: 0, harassment: 0, hate: 0, harmful: 0,
  duplicate_probability: 0, summary: "",
};

async function runAIModerationOnContent(text: string): Promise<Flags> {
  if (!text.trim()) return EMPTY_FLAGS;
  try {
    const system = `Classify content for community moderation. Return strict JSON: { "spam": number, "toxicity": number, "harassment": number, "hate": number, "harmful": number, "duplicate_probability": number, "summary": string } — all scores 0-1.`;
    const raw = await callCommunityAI(system, text.slice(0, 4000));
    const parsed = safeJson<Partial<Flags>>(raw);
    return { ...EMPTY_FLAGS, ...(parsed ?? {}) };
  } catch {
    return EMPTY_FLAGS;
  }
}

export const reportContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { target_type: string; target_id: string; reason: string; details?: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const flags = await runAIModerationOnContent(data.details ?? "");
    const { data: row, error } = await supabase.from("moderation_reports").insert({
      reporter_id: userId, target_type: data.target_type, target_id: data.target_id, reason: data.reason,
      details: data.details ?? "", ai_flags: flags as unknown as Json,
    }).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const listReports = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const { data } = await supabase.from("moderation_reports").select("*").order("created_at", { ascending: false }).limit(100);
    return data ?? [];
  });

export const resolveReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { id: string; status: "resolved" | "dismissed" | "reviewing"; note?: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("moderation_reports").update({
      status: data.status, resolved_by: userId, resolution_note: data.note ?? "",
    }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const scanText = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { text: string }) => i)
  .handler(async ({ data }): Promise<Flags> => runAIModerationOnContent(data.text));

