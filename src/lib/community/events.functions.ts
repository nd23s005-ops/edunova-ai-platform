import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

type EventKind = Database["public"]["Enums"]["event_kind"];

export const listEvents = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { kind?: string; upcoming?: boolean; community_id?: string; mine?: boolean } | undefined) => i ?? {})
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    let q = supabase.from("community_events").select("*").order("starts_at", { ascending: true }).limit(50);
    if (data.upcoming) q = q.gte("starts_at", new Date().toISOString());
    if (data.kind) q = q.eq("kind", data.kind as EventKind);
    if (data.community_id) q = q.eq("community_id", data.community_id);
    if (data.mine) q = q.eq("host_id", userId);
    const { data: rows } = await q;
    return rows ?? [];
  });

export const listMyRegistrations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("event_registrations")
      .select("event:event_id(*), attended, reminded, registered_at")
      .eq("user_id", userId);
    return data ?? [];
  });

export const createEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { title: string; description?: string; kind: string; starts_at: string; ends_at?: string; meeting_link?: string; community_id?: string; tags?: string[]; is_public?: boolean }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("community_events")
      .insert({
        title: data.title,
        description: data.description ?? "",
        kind: data.kind as EventKind,
        starts_at: data.starts_at,
        ends_at: data.ends_at ?? null,
        meeting_link: data.meeting_link ?? null,
        community_id: data.community_id ?? null,
        tags: data.tags ?? [],
        is_public: data.is_public ?? true,
        host_id: userId,
      })
      .select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const registerEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { event_id: string; on: boolean }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (data.on) await supabase.from("event_registrations").upsert({ event_id: data.event_id, user_id: userId });
    else await supabase.from("event_registrations").delete().eq("event_id", data.event_id).eq("user_id", userId);
    return { ok: true };
  });
