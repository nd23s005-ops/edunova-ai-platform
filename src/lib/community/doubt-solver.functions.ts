import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCommunityAI, safeJson } from "./community.server";

type SolveResult = {
  answer: string;
  concept_summary: string;
  suggested_lessons: { title: string; reason: string }[];
  practice: { title: string; description: string }[];
  references: { title: string; url?: string }[];
};

export const solveDoubt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { question: string; context?: string }) => i)
  .handler(async ({ data }) => {
    const system = `You are Nova, an educational AI doubt solver for EduNova AI.
Return strict JSON: { "answer": string, "concept_summary": string, "suggested_lessons": [{"title": string, "reason": string}], "practice": [{"title": string, "description": string}], "references": [{"title": string, "url": string}] }
Guidelines: explain concepts clearly, include worked examples with code if programming, cite reputable references, suggest 2-3 practice problems.`;
    const raw = await callCommunityAI(system, `Question: ${data.question}\n\nContext: ${data.context ?? "(none)"}\n\nRespond as strict JSON.`);
    const parsed = safeJson<SolveResult>(raw);
    return parsed ?? {
      answer: raw,
      concept_summary: "",
      suggested_lessons: [],
      practice: [],
      references: [],
    };
  });

export const summarizeDiscussion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { discussion_id: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const [{ data: q }, { data: ans }] = await Promise.all([
      supabase.from("discussions").select("title,body,tags").eq("id", data.discussion_id).maybeSingle(),
      supabase.from("discussion_answers").select("body,upvotes,is_accepted").eq("discussion_id", data.discussion_id).order("upvotes", { ascending: false }).limit(10),
    ]);
    if (!q) throw new Error("Discussion not found");
    const system = `You summarise Q&A threads for learners. Return strict JSON: { "summary": string, "key_points": string[], "consensus": string }.`;
    const user = `QUESTION: ${q.title}\n${q.body}\n\nANSWERS:\n${(ans ?? []).map((a, i) => `#${i + 1} (up:${a.upvotes}${a.is_accepted ? ",accepted" : ""}): ${a.body}`).join("\n\n")}`;
    const raw = await callCommunityAI(system, user);
    return safeJson<{ summary: string; key_points: string[]; consensus: string }>(raw) ?? { summary: raw, key_points: [], consensus: "" };
  });

export const findSimilarQuestions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { title: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const words = data.title.split(/\s+/).filter((w) => w.length > 3).slice(0, 5);
    if (!words.length) return [];
    const pattern = words.map((w) => `%${w}%`).join("|");
    const { data: rows } = await supabase
      .from("discussions")
      .select("id,title,answer_count,upvotes")
      .or(words.map((w) => `title.ilike.%${w}%`).join(","))
      .limit(5);
    return rows ?? [];
  });
