import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const transport = new DefaultChatTransport({ api: "/api/chat" });

export function ChatWindow({
  variant = "panel",
  chatId = "nova-global",
}: {
  variant?: "panel" | "page";
  chatId?: string;
}) {
  const { messages, sendMessage, status, error } = useChat({
    id: chatId,
    transport,
  });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden",
        variant === "panel"
          ? "h-[560px] max-h-[75vh] w-[92vw] max-w-[400px] rounded-2xl border border-border/60 bg-card/95 shadow-2xl backdrop-blur-xl"
          : "h-[calc(100dvh-8rem)] w-full rounded-2xl border border-border/60 bg-card",
      )}
    >
      <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 py-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">Nova AI Assistant</p>
          <p className="text-[11px] text-muted-foreground">EduNova AI · Ask anything academic</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="mx-auto max-w-xs pt-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">Hi, I'm Nova</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Ask me to explain a concept, solve a doubt, summarize a topic, or plan your study week.
            </p>
          </div>
        )}
        {messages.map((m: UIMessage) => (
          <MessageRow key={m.id} message={m} />
        ))}
        {busy && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-primary" />
            Nova is thinking…
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            Something went wrong. Please try again.
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="border-t border-border/60 bg-background/60 p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void onSubmit(e as unknown as React.FormEvent);
              }
            }}
            placeholder="Ask Nova anything…"
            rows={1}
            className="flex-1 resize-none rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md transition hover:bg-primary/90 disabled:opacity-50"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

function MessageRow({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const text = message.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("");

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground",
        )}
      >
        {text || <span className="text-muted-foreground">…</span>}
      </div>
    </div>
  );
}
