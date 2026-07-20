import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { askCareerAssistant } from "@/lib/career/assistant.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, User } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export const Route = createFileRoute("/_dashboard/dashboard/career/assistant")({ component: AssistantPage });

type Msg = { role: "user" | "assistant"; content: string };

function AssistantPage() {
  const ask = useServerFn(askCareerAssistant);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const m = useMutation({
    mutationFn: (q: string) => ask({ data: { message: q, history: messages } }),
    onSuccess: (r, q) => {
      setMessages((prev) => [...prev, { role: "user", content: q }, { role: "assistant", content: r.answer }]);
      setSuggestions(r.suggestions ?? []);
      setInput("");
    },
  });

  const send = () => { if (input.trim()) m.mutate(input.trim()); };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <Card className="p-4 space-y-3 min-h-[400px] flex flex-col">
        <div className="flex-1 space-y-3 overflow-auto max-h-[60vh]">
          {messages.length === 0 ? (
            <div className="text-sm text-muted-foreground flex flex-col items-center justify-center py-12 gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Ask about resumes, career paths, roles, interview prep, jobs, or your learning plan.
            </div>
          ) : null}
          {messages.map((msg, i) => (
            <div key={i} className="flex gap-2">
              <div className="mt-0.5">{msg.role === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4 text-primary" />}</div>
              <div className="prose prose-sm dark:prose-invert max-w-none flex-1">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t pt-3">
          <Textarea rows={2} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about your career…"
                    onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send(); }} />
          <Button onClick={send} disabled={m.isPending || !input.trim()}>Send</Button>
        </div>
      </Card>

      <Card className="p-4 h-fit">
        <div className="text-sm font-medium mb-2">Suggested follow-ups</div>
        <ul className="space-y-1 text-sm">
          {suggestions.map((s, i) => (
            <li key={i}><button className="text-left hover:text-primary" onClick={() => setInput(s)}>· {s}</button></li>
          ))}
          {!suggestions.length ? <li className="text-muted-foreground text-xs">Ask a question to see follow-ups.</li> : null}
        </ul>
      </Card>
    </div>
  );
}
