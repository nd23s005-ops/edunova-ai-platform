import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listStudyGroups = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { search?: string; mine?: boolean } | undefined) => i ?? {})
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (data.mine) {
      const { data: rows } = await supabase
        .from("study_group_members")
        .select("group:group_id(*)")
        .eq("user_id", userId);
      return (rows ?? []).map((r) => r.group).filter(Boolean);
    }
    let q = supabase.from("study_groups").select("*").order("created_at", { ascending: false }).limit(50);
    if (data.search) q = q.ilike("name", `%${data.search}%`);
    const { data: rows } = await q;
    return rows ?? [];
  });

export const createStudyGroup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { name: string; description?: string; topic?: string; is_public?: boolean; schedule?: string; meeting_link?: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("study_groups")
      .insert({
        name: data.name,
        description: data.description ?? "",
        topic: data.topic ?? "",
        owner_id: userId,
        is_public: data.is_public ?? true,
        schedule: data.schedule ?? null,
        meeting_link: data.meeting_link ?? null,
      })
      .select().single();
    if (error) throw new Error(error.message);
    await supabase.from("study_group_members").insert({ group_id: row.id, user_id: userId, role: "owner" });
    return row;
  });

export const joinStudyGroup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { group_id: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await supabase.from("study_group_members").upsert({ group_id: data.group_id, user_id: userId }, { onConflict: "group_id,user_id" });
    return { ok: true };
  });

export const leaveStudyGroup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { group_id: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await supabase.from("study_group_members").delete().eq("group_id", data.group_id).eq("user_id", userId);
    return { ok: true };
  });

export const addStudyGroupResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { group_id: string; title: string; url: string; kind?: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { data: g } = await supabase.from("study_groups").select("resources").eq("id", data.group_id).maybeSingle();
    const resources = Array.isArray(g?.resources) ? g!.resources : [];
    resources.push({ title: data.title, url: data.url, kind: data.kind ?? "link", added_at: new Date().toISOString() });
    await supabase.from("study_groups").update({ resources }).eq("id", data.group_id);
    return { ok: true };
  });
