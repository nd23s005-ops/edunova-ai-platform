import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCommunityAI, safeJson } from "./community.server";

export const listMentors = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { skill?: string; search?: string } | undefined) => i ?? {})
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    let q = supabase.from("mentor_profiles").select("*").eq("is_accepting", true).order("rating", { ascending: false }).limit(50);
    if (data.skill) q = q.contains("expertise", [data.skill]);
    if (data.search) q = q.ilike("headline", `%${data.search}%`);
    const { data: rows } = await q;
    return rows ?? [];
  });

export const getMyMentorProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("mentor_profiles").select("*").eq("user_id", userId).maybeSingle();
    return data;
  });

export const upsertMentorProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { headline: string; bio?: string; expertise?: string[]; years_experience?: number; hourly_rate?: number; is_accepting?: boolean; linkedin_url?: string | null }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("mentor_profiles")
      .upsert({
        user_id: userId,
        headline: data.headline,
        bio: data.bio ?? "",
        expertise: data.expertise ?? [],
        years_experience: data.years_experience ?? 0,
        hourly_rate: data.hourly_rate ?? 0,
        is_accepting: data.is_accepting ?? true,
        linkedin_url: data.linkedin_url ?? null,
      })
      .select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const requestMentorship = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { mentor_id: string; goals: string; message: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("mentorships")
      .insert({ mentor_id: data.mentor_id, learner_id: userId, goals: data.goals, message: data.message })
      .select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const respondToMentorship = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { mentorship_id: string; status: "active" | "declined" | "completed" | "cancelled" }) => i)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { error } = await supabase.from("mentorships").update({ status: data.status }).eq("id", data.mentorship_id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listMyMentorships = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("mentorships")
      .select("*")
      .or(`mentor_id.eq.${userId},learner_id.eq.${userId}`)
      .order("created_at", { ascending: false });
    return data ?? [];
  });

export const scheduleSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { mentorship_id: string; scheduled_at: string; duration_minutes?: number; topic?: string; meeting_link?: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: m } = await supabase.from("mentorships").select("mentor_id,learner_id,status").eq("id", data.mentorship_id).maybeSingle();
    if (!m || (m.mentor_id !== userId && m.learner_id !== userId)) throw new Error("Not authorized");
    const { data: row, error } = await supabase
      .from("mentor_sessions")
      .insert({
        mentorship_id: data.mentorship_id,
        mentor_id: m.mentor_id,
        learner_id: m.learner_id,
        scheduled_at: data.scheduled_at,
        duration_minutes: data.duration_minutes ?? 60,
        topic: data.topic ?? "",
        meeting_link: data.meeting_link ?? null,
      })
      .select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const rateSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { session_id: string; rating: number; feedback: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: s } = await supabase.from("mentor_sessions").select("mentor_id,learner_id").eq("id", data.session_id).maybeSingle();
    if (!s || s.learner_id !== userId) throw new Error("Only the learner can rate.");
    await supabase.from("mentor_sessions").update({ learner_rating: data.rating, learner_feedback: data.feedback, status: "completed" }).eq("id", data.session_id);
    // Recompute mentor rating
    const { data: all } = await supabase.from("mentor_sessions").select("learner_rating").eq("mentor_id", s.mentor_id).not("learner_rating", "is", null);
    const ratings = (all ?? []).map((r) => Number(r.learner_rating) || 0).filter(Boolean);
    const avg = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
    await supabase.from("mentor_profiles").update({ rating: avg, session_count: ratings.length }).eq("user_id", s.mentor_id);
    return { ok: true };
  });

export const recommendMentors = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { goals: string; skills?: string[] }) => i)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { data: mentors } = await supabase.from("mentor_profiles").select("user_id,headline,expertise,rating,years_experience").eq("is_accepting", true).limit(50);
    const system = `Rank mentors for a learner's goals. Return strict JSON: { "matches": [{ "user_id": string, "reason": string, "score": number }] }, top 5 only, score 0-100.`;
    const raw = await callCommunityAI(system, `Goals: ${data.goals}\nSkills: ${(data.skills ?? []).join(", ")}\n\nMentors:\n${JSON.stringify(mentors ?? [])}`);
    return safeJson<{ matches: { user_id: string; reason: string; score: number }[] }>(raw) ?? { matches: [] };
  });
