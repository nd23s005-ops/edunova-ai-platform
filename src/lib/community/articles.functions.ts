import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { slugify } from "./community.server";
import type { Database } from "@/integrations/supabase/types";

type ArticleKind = Database["public"]["Enums"]["article_kind"];

export const listArticles = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { search?: string; kind?: string; mine?: boolean; tag?: string } | undefined) => i ?? {})
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    let q = supabase.from("knowledge_articles").select("*").eq("is_published", true).order("created_at", { ascending: false }).limit(50);
    if (data.mine) q = supabase.from("knowledge_articles").select("*").eq("author_id", userId).order("created_at", { ascending: false }).limit(50);
    if (data.search) q = q.ilike("title", `%${data.search}%`);
    if (data.kind) q = q.eq("kind", data.kind as ArticleKind);
    if (data.tag) q = q.contains("tags", [data.tag]);
    const { data: rows } = await q;
    return rows ?? [];
  });

export const getArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { slug: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: a } = await supabase.from("knowledge_articles").select("*").eq("slug", data.slug).maybeSingle();
    if (!a) return null;
    await supabase.from("knowledge_articles").update({ views: (a.views ?? 0) + 1 }).eq("id", a.id);
    const { data: liked } = await supabase.from("article_reactions").select("kind").eq("article_id", a.id).eq("user_id", userId);
    return { ...a, my_reactions: (liked ?? []).map((r) => r.kind) };
  });

export const publishArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { id?: string; title: string; summary?: string; body: string; kind: string; tags?: string[]; cover_url?: string | null; community_id?: string | null; is_published?: boolean }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (data.id) {
      const { data: row, error } = await supabase.from("knowledge_articles")
        .update({
          title: data.title, summary: data.summary ?? "", body: data.body, kind: data.kind as ArticleKind,
          tags: data.tags ?? [], cover_url: data.cover_url ?? null, community_id: data.community_id ?? null,
          is_published: data.is_published ?? true,
        })
        .eq("id", data.id).eq("author_id", userId)
        .select().single();
      if (error) throw new Error(error.message);
      return row;
    }
    const slug = `${slugify(data.title)}-${Math.random().toString(36).slice(2, 6)}`;
    const { data: row, error } = await supabase.from("knowledge_articles").insert({
      slug, author_id: userId,
      title: data.title, summary: data.summary ?? "", body: data.body, kind: data.kind as ArticleKind,
      tags: data.tags ?? [], cover_url: data.cover_url ?? null, community_id: data.community_id ?? null,
      is_published: data.is_published ?? true,
    }).select().single();
    if (error) throw new Error(error.message);
    await supabase.from("community_xp_events").insert({ user_id: userId, amount: 20, reason: "article_published", reference_type: "article", reference_id: row.id });
    return row;
  });

export const reactArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { article_id: string; kind: "like" | "bookmark" | "share"; on: boolean }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (data.on) {
      await supabase.from("article_reactions").upsert({ user_id: userId, article_id: data.article_id, kind: data.kind });
      if (data.kind === "like") {
        const { data: a } = await supabase.from("knowledge_articles").select("likes").eq("id", data.article_id).maybeSingle();
        await supabase.from("knowledge_articles").update({ likes: (a?.likes ?? 0) + 1 }).eq("id", data.article_id);
      }
    } else {
      await supabase.from("article_reactions").delete().eq("user_id", userId).eq("article_id", data.article_id).eq("kind", data.kind);
      if (data.kind === "like") {
        const { data: a } = await supabase.from("knowledge_articles").select("likes").eq("id", data.article_id).maybeSingle();
        await supabase.from("knowledge_articles").update({ likes: Math.max(0, (a?.likes ?? 0) - 1) }).eq("id", data.article_id);
      }
    }
    return { ok: true };
  });
