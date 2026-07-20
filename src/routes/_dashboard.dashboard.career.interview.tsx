import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { finalizeInterview, listInterviewSessions, startInterview, submitInterviewAnswer } from "@/lib/career/interview.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";

type Kind = "hr" | "technical" | "mock";

export const Route = createFileRoute("/_dashboard/dashboard/career/interview")({ component: InterviewPage });

function InterviewPage() {
  const start = useServerFn(startInterview);
  const submit = useServerFn(submitInterviewAnswer);
  const finalize = useServerFn(finalizeInterview);
  const list = useServerFn(listInterviewSessions);
  const qc = useQueryClient();
  const [kind, setKind] = useState<Kind>("hr");
  const [topic, setTopic] = useState("Frontend");
  const [session, setSession] = useState<{ id: string; questions: string[] } | null>(null);
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedbacks, setFeedbacks] = useState<Array<{ score: number; strengths: string[]; improvements: string[]; ideal_answer: string } | null>>([]);

  const hist = useQuery({ queryKey: ["career", "interview", "history"], queryFn: () => list() });

  const sm = useMutation({
    mutationFn: () => start({ data: { kind, topic, question_count: 5 } }),
    onSuccess: (r) => { setSession({ id: r.session.id, questions: r.questions }); setIdx(0); setAnswer(""); setFeedbacks(new Array(r.questions.length).fill(null)); },
  });

  const ans = useMutation({
    mutationFn: () => submit({ data: { session_id: session!.id, question_index: idx, question: session!.questions[idx], answer } }),
    onSuccess: (r) => {
      const arr = feedbacks.slice();
      arr[idx] = r.feedback;
      setFeedbacks(arr);
      setAnswer("");
      if (idx + 1 < (session?.questions.length ?? 0)) setIdx(idx + 1);
    },
  });

  const fin = useMutation({
    mutationFn: () => finalize({ data: { session_id: session!.id } }),
    onSuccess: () => { setSession(null); qc.invalidateQueries({ queryKey: ["career", "interview", "history"] }); },
  });

  if (!session) {
    return (
      <div className="space-y-6">
        <Card className="p-4 grid gap-3 md:grid-cols-3">
          <div>
            <Label>Type</Label>
            <Select value={kind} onValueChange={(v) => setKind(v as Kind)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="mock">Mock (mixed)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2"><Label>Topic</Label><Input value={topic} onChange={(e) => setTopic(e.target.value)} /></div>
          <div className="md:col-span-3"><Button disabled={sm.isPending} onClick={() => sm.mutate()}><Sparkles className="h-4 w-4 mr-1" />Start session</Button></div>
        </Card>

        <Card className="p-4">
          <div className="text-sm font-medium mb-2">Recent sessions</div>
          {hist.isLoading ? <Skeleton className="h-24" /> : (
            <ul className="text-sm space-y-1">
              {(hist.data?.sessions ?? []).map((s) => (
                <li key={s.id} className="flex justify-between border-b pb-1">
                  <span className="capitalize">{s.kind} · {s.topic ?? "—"}</span>
                  <span className="text-muted-foreground">{s.overall_score ?? "—"}%</span>
                </li>
              ))}
              {!(hist.data?.sessions ?? []).length ? <li className="text-muted-foreground">No sessions yet.</li> : null}
            </ul>
          )}
        </Card>
      </div>
    );
  }

  const done = feedbacks.every((f) => f !== null);
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="text-xs text-muted-foreground">Question {idx + 1} of {session.questions.length}</div>
        <div className="font-medium mt-1">{session.questions[idx]}</div>
      </Card>
      <Card className="p-4 space-y-2">
        <Label>Your answer</Label>
        <Textarea rows={6} value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <div className="flex gap-2">
          <Button disabled={ans.isPending || !answer.trim()} onClick={() => ans.mutate()}>Submit</Button>
          {done ? <Button variant="outline" onClick={() => fin.mutate()} disabled={fin.isPending}><CheckCircle2 className="h-4 w-4 mr-1" />Finish</Button> : null}
        </div>
      </Card>

      {feedbacks[idx] ? (
        <Card className="p-4 space-y-2">
          <div className="text-sm font-medium">Feedback · Score {feedbacks[idx]!.score}%</div>
          <div className="text-sm"><strong>Strengths:</strong> {(feedbacks[idx]!.strengths ?? []).join(", ")}</div>
          <div className="text-sm"><strong>Improvements:</strong> {(feedbacks[idx]!.improvements ?? []).join(", ")}</div>
          <div className="text-sm"><strong>Ideal answer:</strong> {feedbacks[idx]!.ideal_answer}</div>
        </Card>
      ) : null}
    </div>
  );
}
