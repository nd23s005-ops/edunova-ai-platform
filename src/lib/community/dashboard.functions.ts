import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCommunityAI, safeJson } from "./community.server";

export const getCommunitySnapshot = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [members, myQuestions, unanswered, upcomingEvents, mentors, articles, xp] = await Promise.all([
      supabase.from("community_members").select("community_id,role").eq("user_id", userId),
      supabase.from("discussions").select("id,title,answer_count,created_at").eq("author_id", userId).order("created_at", { ascending: false }).limit(5),
      supabase.from("discussions").select("id,title,tags,created_at").eq("answer_count", 0).order("created_at", { ascending: false }).limit(5),
      supabase.from("community_events").select("id,title,kind,starts_at").gte("starts_at", new Date().toISOString()).order("starts_at").limit(5),
      supabase.from("mentor_profiles").select("user_id,headline,expertise,rating").eq("is_accepting", true).order("rating", { ascending: false }).limit(5),
      supabase.from("knowledge_articles").select("id,slug,title,likes,kind,created_at").eq("is_published", true).order("created_at", { ascending: false }).limit(5),
      supabase.from("community_xp_events").select("amount").eq("user_id", userId),
    ]);
    return {
      joined_count: members.data?.length ?? 0,
      my_questions: myQuestions.data ?? [],
      unanswered_questions: unanswered.data ?? [],
      upcoming_events: upcomingEvents.data ?? [],
      recommended_mentors: mentors.data ?? [],
      trending_articles: articles.data ?? [],
      total_xp: (xp.data ?? []).reduce((n, r) => n + (r.amount ?? 0), 0),
    };
  });

export const recommendCommunities = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: profile }, { data: joined }] = await Promise.all([
      supabase.from("profiles").select("full_name,interests,country").eq("id", userId).maybeSingle(),
      supabase.from("community_members").select("community_id").eq("user_id", userId),
    ]);
    const joinedIds = (joined ?? []).map((r) => r.community_id);
    let q = supabase.from("communities").select("id,slug,name,description,category,tags,member_count").eq("visibility", "public").order("member_count", { ascending: false }).limit(30);
    if (joinedIds.length) q = q.not("id", "in", `(${joinedIds.join(",")})`);
    const { data: pool } = await q;
    if (!pool || pool.length === 0) return [];
    try {
      const system = `Recommend the best communities for a learner. Return strict JSON: { "matches": [{ "community_id": string, "reason": string, "score": number }] }, top 6, score 0-100.`;
      const raw = await callCommunityAI(system, `Learner profile: ${JSON.stringify(profile ?? {})}\n\nCandidate communities:\n${JSON.stringify(pool)}`);
      const parsed = safeJson<{ matches: { community_id: string; reason: string; score: number }[] }>(raw);
      const byId = new Map(pool.map((c) => [c.id, c]));
      return (parsed?.matches ?? []).map((m) => ({ ...m, community: byId.get(m.community_id) })).filter((r) => r.community);
    } catch {
      return pool.slice(0, 6).map((c) => ({ community_id: c.id, reason: "Popular in your category", score: 50, community: c }));
    }
  });
