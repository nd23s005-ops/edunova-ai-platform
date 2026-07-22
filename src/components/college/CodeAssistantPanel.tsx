import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { askCareerAssistant } from "@/lib/career/assistant.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Explain time complexity of quicksort with a JS example",
  "Debug this: why does my useEffect fire twice in React?",
  "How do I approach the two-sum problem in O(n)?",
  "Give me a Python snippet to reverse a linked list",
];

export function CodeAssistantPanel() {
  const ask = useServerFn(askCareerAssistant);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const m = useMutation({
    mutationFn: (q: string) => ask({ data: { message: q, history: messages.slice(-10) } }),
    onSuccess: (r, q) => {
      setMessages((prev) => [...prev, { role: "user", content: q }, { role: "assistant", content: r.answer }]);
      setInput("");
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, m.isPending]);

  const send = (q?: string) => {
    const text = (q ?? input).trim();
    if (text && !m.isPending) m.mutate(text);
  };

  return (
    <section className="rounded-2xl border border-border/60 bg-card shadow-card overflow-hidden">
      <header className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">AI Code Assistant</p>
          <h2 className="text-sm font-semibold">Ask anything about code, DSA, or design</h2>
        </div>
      </header>

      <div ref={scrollRef} className="max-h-[420px] min-h-[240px] space-y-4 overflow-auto px-4 py-4">
        {messages.length === 0 && !m.isPending ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Try one of these:
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-left text-xs hover:border-primary/50 hover:bg-primary/5"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {messages.map((msg, i) => (
          <div key={i} className="flex gap-2">
            <div className="mt-0.5 shrink-0">
              {msg.role === "user" ? (
                <User className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Bot className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none flex-1 break-words">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {m.isPending ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Bot className="h-4 w-4 text-primary animate-pulse" />
            Thinking…
          </div>
        ) : null}
        {m.isError ? (
          <p className="text-xs text-destructive">Assistant failed. Try again.</p>
        ) : null}
      </div>

      <div className="flex gap-2 border-t border-border/60 bg-background/40 p-3">
        <Textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a coding question… (Ctrl/⌘+Enter to send)"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              send();
            }
          }}
          className="resize-none"
        />
        <Button onClick={() => send()} disabled={m.isPending || !input.trim()} className="self-end">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
