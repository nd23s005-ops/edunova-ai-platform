import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCareerAI, safeJson } from "./career.server";

const StartInput = z.object({
  kind: z.enum(["hr", "technical", "mock"]),
  topic: z.string().max(80).optional(),
  question_count: z.number().int().min(3).max(20).default(6),
});
type QuestionSet = { questions: string[] };

export const startInterview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => StartInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const system =
      "You generate interview questions. Return JSON: { questions: string[] }. HR = behavioural + situational. Technical = questions in the topic. Mock = mixed HR + technical.";
    const raw = await callCareerAI(system, JSON.stringify(data));
    const parsed = safeJson<QuestionSet>(raw);
    const questions = parsed?.questions ?? [];
    if (!questions.length) throw new Error("Could not start interview.");
    const { data: row, error } = await supabase.from("interview_sessions").insert({
      user_id: userId, kind: data.kind, topic: data.topic ?? null,
      config: { questions } as never, status: "in_progress",
    }).select("*").single();
    if (error) throw new Error(error.message);
    return { session: row, questions };
  });

const AnswerInput = z.object({
  session_id: z.string().uuid(),
  question_index: z.number().int().min(0),
  question: z.string().max(2000),
  answer: z.string().max(6000),
});
type Feedback = { score: number; strengths: string[]; improvements: string[]; ideal_answer: string; communication_score?: number; confidence_score?: number };

export const submitInterviewAnswer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => AnswerInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const system =
      "You are an interview coach. Grade a candidate answer. Return JSON: { score (0-100), strengths[], improvements[], ideal_answer, communication_score (0-100), confidence_score (0-100) }.";
    const raw = await callCareerAI(system, JSON.stringify({ question: data.question, answer: data.answer }));
    const parsed = safeJson<Feedback>(raw);
    if (!parsed) throw new Error("Grading failed.");
    await supabase.from("interview_turns").insert({
      session_id: data.session_id, user_id: userId, turn_index: data.question_index,
      role: "user", content: data.answer, feedback: parsed as never, score: parsed.score,
    });
    return { feedback: parsed };
  });

const FinishInput = z.object({ session_id: z.string().uuid() });
export const finalizeInterview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => FinishInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: turns } = await supabase.from("interview_turns").select("score, feedback").eq("session_id", data.session_id).eq("user_id", userId);
    const scores = (turns ?? []).map((t) => Number(t.score ?? 0)).filter((n) => n > 0);
    const overall = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const comms = (turns ?? []).map((t) => Number((t.feedback as { communication_score?: number } | null)?.communication_score ?? 0)).filter((n) => n > 0);
    const conf = (turns ?? []).map((t) => Number((t.feedback as { confidence_score?: number } | null)?.confidence_score ?? 0)).filter((n) => n > 0);
    const commAvg = comms.length ? Math.round(comms.reduce((a, b) => a + b, 0) / comms.length) : null;
    const confAvg = conf.length ? Math.round(conf.reduce((a, b) => a + b, 0) / conf.length) : null;
    const { data: row, error } = await supabase.from("interview_sessions").update({
      status: "completed", overall_score: overall, communication_score: commAvg, confidence_score: confAvg, completed_at: new Date().toISOString(),
    }).eq("id", data.session_id).eq("user_id", userId).select("*").single();
    if (error) throw new Error(error.message);
    return { session: row };
  });

export const listInterviewSessions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("interview_sessions").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(30);
    return { sessions: data ?? [] };
  });
