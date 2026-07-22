import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { generateChallenge, submitCode } from "@/lib/career/coding.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Sparkles, Play, RefreshCw, CheckCircle2, XCircle, Terminal } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { RoleGate } from "@/components/auth/RoleGate";

export const Route = createFileRoute("/_dashboard/dashboard/college/playground")({
  head: () => ({
    meta: [
      { title: "Coding Playground — EduNova AI" },
      { name: "description", content: "Practice with AI-generated coding problems, tests, and instant feedback." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <RoleGate allow={["college_student"]}>
      <Playground />
    </RoleGate>
  ),
});

type Lang = "javascript" | "python" | "java" | "cpp" | "sql";
type Challenge = {
  id: string;
  title: string;
  prompt: string;
  topic: string;
  difficulty: string;
  starter_code?: Record<string, string> | null;
  tests?: Array<{ input: unknown; expected: unknown }> | null;
};

const STARTER_BY_LANG: Record<Lang, string> = {
  javascript: "// Write your solution here\nfunction solve(input) {\n  return input;\n}\n",
  python: "# Write your solution here\ndef solve(x):\n    return x\n",
  java: "// Write your solution here\nclass Solution {\n  public Object solve(Object input) { return input; }\n}\n",
  cpp: "// Write your solution here\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() { return 0; }\n",
  sql: "-- Write your query here\nSELECT 1;\n",
};

function Playground() {
  const gen = useServerFn(generateChallenge);
  const sub = useServerFn(submitCode);

  const [topic, setTopic] = useState("arrays");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [language, setLanguage] = useState<Lang>("javascript");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState<string>(STARTER_BY_LANG.javascript);

  const gm = useMutation({
    mutationFn: () => gen({ data: { topic, difficulty } }),
    onSuccess: (r) => {
      const c = r.challenge as unknown as Challenge;
      setChallenge(c);
      const starter = c?.starter_code?.[language];
      setCode(starter || STARTER_BY_LANG[language]);
    },
  });

  const sm = useMutation({
    mutationFn: () =>
      sub({ data: { challenge_id: challenge!.id, language, code } }),
  });

  const changeLang = (l: Lang) => {
    setLanguage(l);
    const starter = challenge?.starter_code?.[l];
    setCode(starter || STARTER_BY_LANG[l]);
  };

  const grade = sm.data?.grade;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Terminal className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Coding Playground</p>
            <h1 className="text-lg font-semibold">Practice with AI-generated problems</h1>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_180px_auto]">
          <div>
            <Label className="text-xs">Topic</Label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. arrays, graphs, DP" />
          </div>
          <div>
            <Label className="text-xs">Difficulty</Label>
            <Select value={difficulty} onValueChange={(v) => setDifficulty(v as typeof difficulty)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Language</Label>
            <Select value={language} onValueChange={(v) => changeLang(v as Lang)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="self-end">
            <Button onClick={() => gm.mutate()} disabled={gm.isPending} className="w-full">
              {gm.isPending ? <RefreshCw className="h-4 w-4 mr-1 animate-spin" /> : <Sparkles className="h-4 w-4 mr-1" />}
              {challenge ? "New problem" : "Generate problem"}
            </Button>
          </div>
        </div>
        {gm.isError ? <p className="mt-2 text-xs text-destructive">Generation failed. Try again.</p> : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {challenge?.difficulty ?? difficulty}
            </span>
            {challenge?.topic ? (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {challenge.topic}
              </span>
            ) : null}
          </div>
          <h2 className="text-base font-semibold">
            {challenge?.title ?? "Generate a problem to get started"}
          </h2>
          <div className="prose prose-sm dark:prose-invert max-w-none min-h-[160px]">
            {challenge ? <ReactMarkdown>{challenge.prompt}</ReactMarkdown> : (
              <p className="text-sm text-muted-foreground">
                Pick a topic, difficulty, and language, then click <em>Generate problem</em>. AI will produce a task
                with 3–5 test cases you can run your code against.
              </p>
            )}
          </div>

          {challenge?.tests?.length ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Test cases ({challenge.tests.length})
              </p>
              <div className="space-y-1.5">
                {challenge.tests.slice(0, 5).map((t, i) => (
                  <div key={i} className="rounded border border-border/60 bg-background/60 px-2 py-1.5 text-xs font-mono">
                    <span className="text-muted-foreground">in:</span> {JSON.stringify(t.input)}
                    <span className="mx-2 text-muted-foreground">→</span>
                    <span className="text-muted-foreground">expected:</span> {JSON.stringify(t.expected)}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </Card>

        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Editor · {language}</p>
            <Button
              size="sm"
              onClick={() => sm.mutate()}
              disabled={!challenge || sm.isPending || !code.trim()}
            >
              <Play className="h-4 w-4 mr-1" />
              {sm.isPending ? "Evaluating…" : "Run & evaluate"}
            </Button>
          </div>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={16}
            className="font-mono text-xs resize-none bg-[oklch(0.16_0.02_260)] text-[oklch(0.94_0.02_260)] border-border/60"
            spellCheck={false}
          />

          {grade ? (
            <div className={`rounded-lg border p-3 ${grade.verdict === "passed" ? "border-emerald-500/40 bg-emerald-500/5" : grade.verdict === "partial" ? "border-amber-500/40 bg-amber-500/5" : "border-destructive/40 bg-destructive/5"}`}>
              <div className="flex items-center gap-2 text-sm font-semibold">
                {grade.verdict === "passed" ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-destructive" />}
                {grade.verdict.toUpperCase()} — {grade.passed}/{grade.total} tests
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{grade.feedback}</p>
            </div>
          ) : null}
          {sm.isError ? <p className="text-xs text-destructive">Evaluation failed. Try again.</p> : null}
        </Card>
      </div>
    </div>
  );
}
