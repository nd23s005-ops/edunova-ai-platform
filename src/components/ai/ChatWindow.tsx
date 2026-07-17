import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  assistantGreeting,
  assistantQuickPrompts,
  useAssistantContext,
  type AssistantContext,
} from "@/lib/ai/useAssistantContext";

export function ChatWindow({
  variant = "panel",
  chatId = "nova-global",
}: {
  variant?: "panel" | "page";
  chatId?: string;
}) {
  const context = useAssistantContext();

  // Rebuild transport whenever context surface changes so every request carries fresh context.
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: () => ({ context: serializeContext(context) }),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context.surface, context.role, context.student?.currentClass, context.student?.board],
  );

  const { messages, sendMessage, status, error, setMessages } = useChat({
    id: chatId,
    transport,
  });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  // Reset chat when navigating between surfaces so each context starts fresh.
  useEffect(() => {
    setMessages([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.surface]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const greeting = assistantGreeting(context);
  const quickPrompts = assistantQuickPrompts(context);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    await sendMessage({ text: trimmed });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await send(input);
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
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Nova AI Assistant</p>
          <p className="truncate text-[11px] text-muted-foreground">{surfaceLabel(context)}</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="pt-2">
            <div className="mx-auto max-w-xs text-center">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium">{greeting.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{greeting.subtitle}</p>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => void send(prompt)}
                  className="rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition hover:border-primary/50 hover:bg-primary/5"
                >
                  {prompt}
                </button>
              ))}
            </div>
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

function serializeContext(ctx: AssistantContext) {
  return {
    surface: ctx.surface,
    pathname: ctx.pathname,
    role: ctx.role,
    signedIn: ctx.signedIn,
    student: ctx.student
      ? {
          currentClass: ctx.student.currentClass,
          board: ctx.student.board,
          language: ctx.student.language,
          schoolName: ctx.student.schoolName,
        }
      : null,
  };
}

function surfaceLabel(ctx: AssistantContext): string {
  switch (ctx.surface) {
    case "home":
      return "Website guide";
    case "explore":
      return "Course advisor";
    case "community":
      return "Community guide";
    case "dashboard_student":
      return "Personal learning assistant";
    case "dashboard_teacher":
      return "Teaching assistant";
    case "dashboard_organization":
      return "Organization assistant";
    case "dashboard_admin":
      return "Platform admin assistant";
    case "dashboard_professional":
      return "Upskilling assistant";
    case "auth":
    case "onboarding":
      return "Onboarding assistant";
    default:
      return "EduNova AI · Nova";
  }
}

function MessageRow({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const text = message.parts.map((p) => (p.type === "text" ? p.text : "")).join("");

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
        )}
      >
        {text || <span className="text-muted-foreground">…</span>}
      </div>
    </div>
  );
}
