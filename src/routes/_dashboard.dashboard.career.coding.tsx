import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateChallenge, listChallenges, listSubmissions, submitCode } from "@/lib/career/coding.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Trophy } from "lucide-react";
import { useState } from "react";

type Level = "beginner" | "intermediate" | "advanced";
type Lang = "javascript" | "python" | "java" | "cpp" | "sql";

export const Route = createFileRoute("/_dashboard/dashboard/career/coding")({ component: CodingPage });

function CodingPage() {
  const list = useServerFn(listChallenges);
  const gen = useServerFn(generateChallenge);
  const sub = useServerFn(submitCode);
  const subs = useServerFn(listSubmissions);
  const qc = useQueryClient();

  const [topic, setTopic] = useState("Arrays");
  const [difficulty, setDifficulty] = useState<Level>("beginner");
  const q = useQuery({ queryKey: ["career", "challenges", topic, difficulty], queryFn: () => list({ data: { topic, difficulty } }) });
  const submissions = useQuery({ queryKey: ["career", "submissions"], queryFn: () => subs() });

  const [active, setActive] = useState<{ id: string; title: string; prompt: string } | null>(null);
  const [lang, setLang] = useState<Lang>("javascript");
  const [code, setCode] = useState("");

  const gm = useMutation({
    mutationFn: () => gen({ data: { topic, difficulty } }),
    onSuccess: (r) => { qc.invalidateQueries({ queryKey: ["career", "challenges"] }); setActive({ id: r.challenge.id, title: r.challenge.title, prompt: r.challenge.prompt }); },
  });
  const sm = useMutation({
    mutationFn: () => sub({ data: { challenge_id: active!.id, language: lang, code } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["career", "submissions"] }),
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="space-y-3">
        <Card className="p-3 space-y-2">
          <Label>Topic</Label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
          <Label>Difficulty</Label>
          <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Level)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {(["beginner", "intermediate", "advanced"] as const).map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={() => gm.mutate()} disabled={gm.isPending} size="sm" className="w-full"><Sparkles className="h-4 w-4 mr-1" />New challenge</Button>
        </Card>
        <Card className="p-3">
          <div className="text-sm font-medium mb-2 flex items-center gap-2"><Trophy className="h-4 w-4" /> Stats</div>
          <div className="text-xs text-muted-foreground">Solved: {submissions.data?.stats.passed ?? 0} / {submissions.data?.stats.total ?? 0} · {submissions.data?.stats.accuracy ?? 0}%</div>
        </Card>
        <Card className="p-3">
          <div className="text-sm font-medium mb-2">Challenges</div>
          {q.isLoading ? <Skeleton className="h-40" /> : (
            <ul className="space-y-1 max-h-96 overflow-auto">
              {(q.data?.challenges ?? []).map((c) => (
                <li key={c.id} className={`text-sm rounded px-2 py-1 cursor-pointer ${active?.id === c.id ? "bg-primary/10" : "hover:bg-muted"}`}
                    onClick={() => setActive({ id: c.id, title: c.title, prompt: c.prompt })}>
                  {c.title} <Badge variant="outline" className="ml-1 text-[10px]">{c.difficulty}</Badge>
                </li>
              ))}
              {!(q.data?.challenges ?? []).length ? <li className="text-xs text-muted-foreground">No challenges yet. Generate one.</li> : null}
            </ul>
          )}
        </Card>
      </div>

      <div className="space-y-4">
        {active ? (
          <>
            <Card className="p-4">
              <div className="font-medium">{active.title}</div>
              <pre className="whitespace-pre-wrap text-sm mt-2">{active.prompt}</pre>
            </Card>
            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Label>Language</Label>
                <Select value={lang} onValueChange={(v) => setLang(v as Lang)}>
                  <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(["javascript", "python", "java", "cpp", "sql"] as const).map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Textarea rows={14} value={code} onChange={(e) => setCode(e.target.value)} className="font-mono text-xs" placeholder="Write your solution here…" />
              <Button onClick={() => sm.mutate()} disabled={sm.isPending || !code.trim()}>Submit</Button>
              {sm.data ? (
                <div className="text-sm">Verdict: <Badge>{sm.data.grade.verdict}</Badge> · {sm.data.grade.passed}/{sm.data.grade.total} tests</div>
              ) : null}
              {sm.data?.grade.feedback ? <p className="text-xs text-muted-foreground">{sm.data.grade.feedback}</p> : null}
            </Card>
          </>
        ) : <Card className="p-6 text-sm text-muted-foreground">Pick a challenge on the left or generate one.</Card>}
      </div>
    </div>
  );
}
