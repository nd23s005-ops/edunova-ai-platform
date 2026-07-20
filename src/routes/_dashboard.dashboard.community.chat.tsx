import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { listMyConversations, listMessages, sendMessage } from "@/lib/community/chat.functions";
import { Send } from "lucide-react";

export const Route = createFileRoute("/_dashboard/dashboard/community/chat")({
  component: ChatPage,
});

type ConvRow = { conversation: { id: string; kind: string; title: string | null; last_message_at: string } | null };
type Msg = { id: string; body: string; sender_id: string; created_at: string; conversation_id: string };

function ChatPage() {
  const qc = useQueryClient();
  const convFn = useServerFn(listMyConversations);
  const msgFn = useServerFn(listMessages);
  const sendFn = useServerFn(sendMessage);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const conv = useQuery({ queryKey: ["community", "conversations"], queryFn: () => convFn() });
  const messages = useQuery({
    queryKey: ["community", "messages", activeId],
    queryFn: () => msgFn({ data: { conversation_id: activeId! } }),
    enabled: !!activeId,
  });

  // Realtime listener for the active conversation.
  useEffect(() => {
    if (!activeId) return;
    const ch = supabase
      .channel(`chat-${activeId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages", filter: `conversation_id=eq.${activeId}` }, () => {
        qc.invalidateQueries({ queryKey: ["community", "messages", activeId] });
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [activeId, qc]);

  const send = useMutation({
    mutationFn: () => sendFn({ data: { conversation_id: activeId!, body: draft } }),
    onSuccess: () => { setDraft(""); qc.invalidateQueries({ queryKey: ["community", "messages", activeId] }); },
  });

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <Card className="lg:col-span-1">
        <CardContent className="max-h-[70vh] space-y-1 overflow-y-auto pt-4">
          <p className="mb-2 text-xs uppercase text-muted-foreground">Conversations</p>
          {conv.data?.length === 0 && <p className="text-xs text-muted-foreground">No conversations yet.</p>}
          {conv.data?.map((c: ConvRow) => c.conversation && (
            <button
              key={c.conversation.id}
              onClick={() => setActiveId(c.conversation!.id)}
              className={`block w-full rounded px-2 py-2 text-left text-sm hover:bg-accent ${activeId === c.conversation.id ? "bg-accent" : ""}`}
            >
              <p className="font-medium">{c.conversation.title || c.conversation.kind}</p>
              <p className="text-xs text-muted-foreground">{new Date(c.conversation.last_message_at).toLocaleString()}</p>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardContent className="flex h-[70vh] flex-col pt-4">
          <div className="flex-1 space-y-2 overflow-y-auto">
            {!activeId && <p className="text-sm text-muted-foreground">Select a conversation to start chatting.</p>}
            {messages.data?.map((m: Msg) => (
              <div key={m.id} className="rounded border p-2 text-sm">
                <p className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleTimeString()}</p>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
          {activeId && (
            <div className="mt-3 flex gap-2 border-t pt-3">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) send.mutate(); }}
                placeholder="Message…"
                className="flex-1 rounded border bg-transparent px-3 py-2 text-sm"
              />
              <Button size="sm" onClick={() => send.mutate()} disabled={!draft.trim() || send.isPending}><Send className="h-4 w-4" /></Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
