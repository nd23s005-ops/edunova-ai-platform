import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { solveDoubt } from "@/lib/community/doubt-solver.functions";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/_dashboard/dashboard/community/doubt-solver")({
  component: DoubtSolverPage,
});

type Result = {
  answer: string;
  concept_summary: string;
  suggested_lessons: { title: string; reason: string }[];
  practice: { title: string; description: string }[];
  references: { title: string; url?: string }[];
};

function DoubtSolverPage() {
  const solveFn = useServerFn(solveDoubt);
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const m = useMutation({
    mutationFn: () => solveFn({ data: { question, context: context || undefined } }),
    onSuccess: (r) => setResult(r),
  });

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle className="text-base"><Sparkles className="mr-1 inline h-4 w-4" /> Ask Nova</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Textarea placeholder="What are you stuck on? Paste code, describe the concept, or ask a question." rows={6} value={question} onChange={(e) => setQuestion(e.target.value)} />
          <Textarea placeholder="Optional: extra context (course, level, what you've tried)" rows={3} value={context} onChange={(e) => setContext(e.target.value)} />
          <Button className="w-full" onClick={() => m.mutate()} disabled={!question.trim() || m.isPending}>{m.isPending ? "Thinking…" : "Solve my doubt"}</Button>
        </CardContent>
      </Card>

      <div className="lg:col-span-3">
        {!result && <p className="text-sm text-muted-foreground">Your AI answer will appear here.</p>}
        {result && (
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Answer</CardTitle></CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert"><ReactMarkdown>{result.answer}</ReactMarkdown></CardContent>
            </Card>
            {result.concept_summary && (
              <Card><CardHeader><CardTitle className="text-base">Concept summary</CardTitle></CardHeader><CardContent className="text-sm">{result.concept_summary}</CardContent></Card>
            )}
            {result.practice.length > 0 && (
              <Card><CardHeader><CardTitle className="text-base">Practice</CardTitle></CardHeader><CardContent className="space-y-2">
                {result.practice.map((p, i) => (
                  <div key={i} className="rounded border p-2 text-sm"><p className="font-medium">{p.title}</p><p className="text-xs text-muted-foreground">{p.description}</p></div>
                ))}
              </CardContent></Card>
            )}
            {result.references.length > 0 && (
              <Card><CardHeader><CardTitle className="text-base">References</CardTitle></CardHeader><CardContent className="space-y-1 text-sm">
                {result.references.map((r, i) => (
                  <p key={i}>{r.url ? <a href={r.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{r.title}</a> : r.title}</p>
                ))}
              </CardContent></Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
