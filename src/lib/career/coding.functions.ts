import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCareerAI, safeJson, slugify } from "./career.server";

const ListInput = z.object({ topic: z.string().max(60).optional(), difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional() });
export const listChallenges = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => ListInput.parse(v ?? {}))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    let q = supabase.from("coding_challenges").select("*").order("created_at", { ascending: false }).limit(50);
    if (data.topic) q = q.eq("topic", data.topic);
    if (data.difficulty) q = q.eq("difficulty", data.difficulty);
    const { data: rows } = await q;
    return { challenges: rows ?? [] };
  });

const GenInput = z.object({
  topic: z.string().min(2).max(60),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
});
type Gen = { title: string; prompt: string; tests: Array<{ input: unknown; expected: unknown }>; starter_code: Record<string, string> };

export const generateChallenge = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => GenInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const system =
      "Generate a coding practice problem. Return JSON: { title, prompt (markdown), starter_code: { javascript, python }, tests: [{ input, expected }] (3-5 tests) }.";
    const raw = await callCareerAI(system, JSON.stringify(data));
    const parsed = safeJson<Gen>(raw);
    if (!parsed) throw new Error("Challenge generation failed.");
    const slug = `${slugify(parsed.title)}-${Math.random().toString(36).slice(2, 6)}`;
    const { data: row, error } = await supabase.from("coding_challenges").insert({
      slug, title: parsed.title.slice(0, 200), topic: data.topic, difficulty: data.difficulty,
      prompt: parsed.prompt, starter_code: (parsed.starter_code ?? {}) as never, tests: (parsed.tests ?? []) as never, source: "ai",
    }).select("*").single();
    if (error) throw new Error(error.message);
    return { challenge: row };
  });

const SubmitInput = z.object({
  challenge_id: z.string().uuid(),
  language: z.enum(["javascript", "python", "java", "cpp", "sql"]),
  code: z.string().min(5).max(20000),
});
type Grade = { verdict: "passed" | "failed" | "partial"; passed: number; total: number; feedback: string };

export const submitCode = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => SubmitInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: chal } = await supabase.from("coding_challenges").select("prompt, tests, title").eq("id", data.challenge_id).maybeSingle();
    if (!chal) throw new Error("Challenge not found.");
    const system =
      "You are an automated code judge. Given a coding problem, tests, and a candidate solution, mentally evaluate whether it would pass each test case. Return JSON: { verdict: 'passed'|'failed'|'partial', passed (int), total (int), feedback (<= 3 sentences) }.";
    const raw = await callCareerAI(system, JSON.stringify({ problem: chal.prompt, tests: chal.tests, language: data.language, code: data.code }));
    const parsed = safeJson<Grade>(raw);
    if (!parsed) throw new Error("Grading failed.");
    const { data: row, error } = await supabase.from("coding_submissions").insert({
      user_id: userId, challenge_id: data.challenge_id, language: data.language, code: data.code,
      verdict: parsed.verdict, passed: parsed.passed ?? 0, total: parsed.total ?? 0, ai_feedback: parsed.feedback,
    }).select("*").single();
    if (error) throw new Error(error.message);
    return { submission: row, grade: parsed };
  });

export const listSubmissions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("coding_submissions").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(50);
    const passed = (data ?? []).filter((r) => r.verdict === "passed").length;
    const total = (data ?? []).length;
    return { submissions: data ?? [], stats: { passed, total, accuracy: total ? Math.round((passed / total) * 100) : 0 } };
  });
