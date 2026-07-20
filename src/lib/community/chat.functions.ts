import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

type ChatAttachments = Database["public"]["Tables"]["chat_messages"]["Insert"]["attachments"];

export const listMyConversations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("chat_participants")
      .select("last_read_at, conversation:conversation_id(id,kind,title,last_message_at,created_by,community_id,study_group_id)")
      .eq("user_id", userId)
      .order("last_read_at", { ascending: false })
      .limit(100);
    return data ?? [];
  });

export const createConversation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { kind: "direct" | "group" | "community" | "study_group" | "course"; title?: string; participant_ids: string[]; community_id?: string; study_group_id?: string }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: conv, error } = await supabase
      .from("chat_conversations")
      .insert({
        kind: data.kind,
        title: data.title ?? null,
        created_by: userId,
        community_id: data.community_id ?? null,
        study_group_id: data.study_group_id ?? null,
      })
      .select().single();
    if (error) throw new Error(error.message);
    const uniqueIds = Array.from(new Set([userId, ...data.participant_ids]));
    await supabase.from("chat_participants").insert(uniqueIds.map((uid) => ({ conversation_id: conv.id, user_id: uid })));
    return conv;
  });

export const listMessages = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { conversation_id: string; limit?: number }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: rows } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("conversation_id", data.conversation_id)
      .order("created_at", { ascending: true })
      .limit(data.limit ?? 100);
    await supabase.from("chat_participants").update({ last_read_at: new Date().toISOString() })
      .eq("conversation_id", data.conversation_id).eq("user_id", userId);
    return rows ?? [];
  });

export const sendMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { conversation_id: string; body: string; attachments?: unknown[] }) => i)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("chat_messages")
      .insert({ conversation_id: data.conversation_id, sender_id: userId, body: data.body, attachments: (data.attachments ?? []) as unknown as Database["public"]["Tables"]["chat_messages"]["Insert"]["attachments"] })
      .select().single();
    if (error) throw new Error(error.message);
    await supabase.from("chat_conversations").update({ last_message_at: new Date().toISOString() }).eq("id", data.conversation_id);
    return row;
  });
