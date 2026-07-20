import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { slugify } from "./community.server";

export const listCommunities = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { search?: string; category?: string; mine?: boolean } | undefined) => i ?? {})
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (data.mine) {
      const { data: rows } = await supabase
        .from("community_members")
        .select("communities:community_id(*)")
        .eq("user_id", userId);
      return (rows ?? []).map((r) => r.communities).filter(Boolean);
    }
    let q = supabase.from("communities").select("*").order("member_count", { ascending: false }).limit(50);
    if (data.search) q = q.ilike("name", `%${data.search}%`);
    if (data.category) q = q.eq("category", data.category);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const getCommunity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { slug: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: c, error } = await supabase.from("communities").select("*").eq("slug", data.slug).maybeSingle();
    if (error) throw new Error(error.message);
    if (!c) return null;
    const { data: mem } = await supabase
      .from("community_members")
      .select("role")
      .eq("community_id", c.id)
      .eq("user_id", userId)
      .maybeSingle();
    return { ...c, my_role: mem?.role ?? null };
  });

export const createCommunity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: {
    name: string;
    description?: string;
    category: string;
    visibility?: "public" | "private" | "unlisted";
    tags?: string[];
    cover_url?: string | null;
    guidelines?: string;
  }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const slug = `${slugify(data.name)}-${Math.random().toString(36).slice(2, 6)}`;
    const { data: row, error } = await supabase
      .from("communities")
      .insert({
        slug,
        name: data.name,
        description: data.description ?? "",
        category: data.category,
        visibility: data.visibility ?? "public",
        tags: data.tags ?? [],
        cover_url: data.cover_url ?? null,
        guidelines: data.guidelines ?? "",
        owner_id: userId,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await supabase.from("community_members").insert({ community_id: row.id, user_id: userId, role: "owner" });
    return row;
  });

export const joinCommunity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { community_id: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("community_members")
      .upsert({ community_id: data.community_id, user_id: userId, role: "member" }, { onConflict: "community_id,user_id" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const leaveCommunity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { community_id: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("community_members")
      .delete()
      .eq("community_id", data.community_id)
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const toggleFollow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { community_id: string; on: boolean }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (data.on) {
      await supabase.from("community_follows").upsert({ user_id: userId, community_id: data.community_id });
    } else {
      await supabase.from("community_follows").delete().eq("user_id", userId).eq("community_id", data.community_id);
    }
    return { ok: true };
  });

export const listMyMemberships = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("community_members")
      .select("role, community:community_id(id,slug,name,category,visibility,member_count,cover_url)")
      .eq("user_id", userId);
    return data ?? [];
  });
