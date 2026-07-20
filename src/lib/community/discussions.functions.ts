import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listDiscussions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { community_id?: string; search?: string; tag?: string; unanswered?: boolean; mine?: boolean } | undefined) => i ?? {})
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    let q = supabase.from("discussions").select("*").order("created_at", { ascending: false }).limit(50);
    if (data.community_id) q = q.eq("community_id", data.community_id);
    if (data.search) q = q.ilike("title", `%${data.search}%`);
    if (data.tag) q = q.contains("tags", [data.tag]);
    if (data.unanswered) q = q.eq("answer_count", 0);
    if (data.mine) q = q.eq("author_id", userId);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const getDiscussion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { id: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: q } = await supabase.from("discussions").select("*").eq("id", data.id).maybeSingle();
    if (!q) return null;
    await supabase.from("discussions").update({ views: (q.views ?? 0) + 1 }).eq("id", data.id);
    const [ansRes, commRes, voteRes] = await Promise.all([
      supabase.from("discussion_answers").select("*").eq("discussion_id", data.id).order("upvotes", { ascending: false }),
      supabase.from("discussion_comments").select("*").eq("discussion_id", data.id).order("created_at"),
      supabase.from("discussion_votes").select("*").eq("user_id", userId).eq("target_type", "discussion").eq("target_id", data.id).maybeSingle(),
    ]);
    return {
      discussion: q,
      answers: ansRes.data ?? [],
      comments: commRes.data ?? [],
      my_vote: voteRes.data?.value ?? 0,
    };
  });

export const createDiscussion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { community_id?: string | null; title: string; body: string; tags?: string[] }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("discussions")
      .insert({
        community_id: data.community_id ?? null,
        author_id: userId,
        title: data.title,
        body: data.body,
        tags: data.tags ?? [],
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await supabase.from("community_xp_events").insert({ user_id: userId, amount: 5, reason: "question_posted", reference_type: "discussion", reference_id: row.id });
    return row;
  });

export const answerDiscussion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { discussion_id: string; body: string; is_ai?: boolean }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("discussion_answers")
      .insert({ discussion_id: data.discussion_id, author_id: userId, body: data.body, is_ai: data.is_ai ?? false })
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (!data.is_ai) {
      await supabase.from("community_xp_events").insert({ user_id: userId, amount: 10, reason: "answer_posted", reference_type: "answer", reference_id: row.id });
    }
    return row;
  });

export const acceptAnswer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { discussion_id: string; answer_id: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: d } = await supabase.from("discussions").select("author_id").eq("id", data.discussion_id).maybeSingle();
    if (d?.author_id !== userId) throw new Error("Only the author can accept an answer.");
    await supabase.from("discussion_answers").update({ is_accepted: false }).eq("discussion_id", data.discussion_id);
    await supabase.from("discussion_answers").update({ is_accepted: true }).eq("id", data.answer_id);
    await supabase.from("discussions").update({ accepted_answer_id: data.answer_id, status: "resolved" }).eq("id", data.discussion_id);
    const { data: ans } = await supabase.from("discussion_answers").select("author_id").eq("id", data.answer_id).maybeSingle();
    if (ans?.author_id) {
      await supabase.from("community_xp_events").insert({ user_id: ans.author_id, amount: 25, reason: "answer_accepted", reference_type: "answer", reference_id: data.answer_id });
    }
    return { ok: true };
  });

export const voteTarget = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { target_type: "discussion" | "answer"; target_id: string; value: -1 | 0 | 1 }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const table = data.target_type === "discussion" ? "discussions" : "discussion_answers";
    const { data: existing } = await supabase
      .from("discussion_votes")
      .select("value")
      .eq("user_id", userId).eq("target_type", data.target_type).eq("target_id", data.target_id)
      .maybeSingle();
    const prev = existing?.value ?? 0;
    if (data.value === 0) {
      await supabase.from("discussion_votes").delete().eq("user_id", userId).eq("target_type", data.target_type).eq("target_id", data.target_id);
    } else {
      await supabase.from("discussion_votes").upsert({ user_id: userId, target_type: data.target_type, target_id: data.target_id, value: data.value });
    }
    const upDelta = (data.value === 1 ? 1 : 0) - (prev === 1 ? 1 : 0);
    const downDelta = (data.value === -1 ? 1 : 0) - (prev === -1 ? 1 : 0);
    const { data: row } = await supabase.from(table).select("upvotes,downvotes").eq("id", data.target_id).maybeSingle();
    if (row) {
      await supabase.from(table)
        .update({ upvotes: Math.max(0, (row.upvotes ?? 0) + upDelta), downvotes: Math.max(0, (row.downvotes ?? 0) + downDelta) })
        .eq("id", data.target_id);
    }
    return { ok: true };
  });

export const addComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { discussion_id?: string; answer_id?: string; body: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("discussion_comments")
      .insert({ discussion_id: data.discussion_id ?? null, answer_id: data.answer_id ?? null, author_id: userId, body: data.body })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const toggleBookmarkDiscussion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { discussion_id: string; on: boolean }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (data.on) await supabase.from("discussion_bookmarks").upsert({ user_id: userId, discussion_id: data.discussion_id });
    else await supabase.from("discussion_bookmarks").delete().eq("user_id", userId).eq("discussion_id", data.discussion_id);
    return { ok: true };
  });
