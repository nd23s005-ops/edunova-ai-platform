import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getDiscussion, answerDiscussion, voteTarget, acceptAnswer, addComment, toggleBookmarkDiscussion } from "@/lib/community/discussions.functions";
import { solveDoubt, summarizeDiscussion } from "@/lib/community/doubt-solver.functions";
import { ChevronUp, ChevronDown, Bookmark, Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_dashboard/dashboard/community/discussions/$id")({
  component: ThreadPage,
});

type Comment = { id: string; body: string; author_id: string; discussion_id: string | null; answer_id: string | null };

function ThreadPage() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const getFn = useServerFn(getDiscussion);
  const ansFn = useServerFn(answerDiscussion);
  const voteFn = useServerFn(voteTarget);
  const acceptFn = useServerFn(acceptAnswer);
  const commentFn = useServerFn(addComment);
  const bookmarkFn = useServerFn(toggleBookmarkDiscussion);
  const solveFn = useServerFn(solveDoubt);
  const summaryFn = useServerFn(summarizeDiscussion);

  const [answerBody, setAnswerBody] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  const q = useQuery({ queryKey: ["community", "discussion", id], queryFn: () => getFn({ data: { id } }) });

  const submitAnswer = useMutation({
    mutationFn: (body: string) => ansFn({ data: { discussion_id: id, body } }),
    onSuccess: () => { toast.success("Answer posted"); setAnswerBody(""); qc.invalidateQueries({ queryKey: ["community", "discussion", id] }); },
    onError: (e: Error) => toast.error(e.message),
  });
  const vote = useMutation({
    mutationFn: (v: { t: "discussion" | "answer"; id: string; value: -1 | 0 | 1 }) => voteFn({ data: { target_type: v.t, target_id: v.id, value: v.value } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["community", "discussion", id] }),
  });
  const accept = useMutation({
    mutationFn: (answer_id: string) => acceptFn({ data: { discussion_id: id, answer_id } }),
    onSuccess: () => { toast.success("Marked as accepted"); qc.invalidateQueries({ queryKey: ["community", "discussion", id] }); },
    onError: (e: Error) => toast.error(e.message),
  });
  const bookmark = useMutation({
    mutationFn: (on: boolean) => bookmarkFn({ data: { discussion_id: id, on } }),
  });
  const solve = useMutation({
    mutationFn: () => solveFn({ data: { question: `${q.data?.discussion.title}\n\n${q.data?.discussion.body}` } }),
    onSuccess: (res) => setAiAnswer(res.answer),
    onError: (e: Error) => toast.error(e.message),
  });
  const summarize = useMutation({
    mutationFn: () => summaryFn({ data: { discussion_id: id } }),
    onSuccess: (res) => setSummary(res.summary),
    onError: (e: Error) => toast.error(e.message),
  });

  if (q.isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!q.data) return <p className="text-sm text-muted-foreground">Not found. <Link to="/dashboard/community/discussions" className="text-primary">← Back</Link></p>;
  const data = q.data;
  const d = data.discussion;
  const myVote = data.my_vote;

  return (
    <div className="space-y-6">
      <Link to="/dashboard/community/discussions" className="text-xs text-muted-foreground hover:text-foreground">← All discussions</Link>
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1">
              <button aria-label="Upvote" onClick={() => vote.mutate({ t: "discussion", id: d.id, value: q.data.my_vote === 1 ? 0 : 1 })}><ChevronUp className={`h-6 w-6 ${q.data.my_vote === 1 ? "text-primary" : ""}`} /></button>
              <span className="text-sm font-semibold">{d.upvotes - d.downvotes}</span>
              <button aria-label="Downvote" onClick={() => vote.mutate({ t: "discussion", id: d.id, value: q.data.my_vote === -1 ? 0 : -1 })}><ChevronDown className={`h-6 w-6 ${q.data.my_vote === -1 ? "text-primary" : ""}`} /></button>
              <button aria-label="Bookmark" onClick={() => bookmark.mutate(true)}><Bookmark className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold">{d.title}</h1>
              <div className="mt-2 flex flex-wrap gap-1">{d.tags.map((t: string) => <Badge key={t} variant="secondary">{t}</Badge>)}</div>
              <div className="prose prose-sm mt-4 max-w-none dark:prose-invert"><ReactMarkdown>{d.body}</ReactMarkdown></div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => solve.mutate()} disabled={solve.isPending}><Sparkles className="mr-1 h-4 w-4" />{solve.isPending ? "Solving…" : "AI Doubt Solver"}</Button>
                {d.answer_count > 1 && <Button size="sm" variant="outline" onClick={() => summarize.mutate()} disabled={summarize.isPending}>{summarize.isPending ? "Summarising…" : "Summarise thread"}</Button>}
              </div>
              {aiAnswer && <div className="mt-4 rounded border border-primary/40 bg-primary/5 p-3 text-sm"><p className="mb-1 font-semibold">AI answer</p><div className="prose prose-sm dark:prose-invert"><ReactMarkdown>{aiAnswer}</ReactMarkdown></div></div>}
              {summary && <div className="mt-4 rounded border p-3 text-sm"><p className="mb-1 font-semibold">Thread summary</p><p className="text-muted-foreground">{summary}</p></div>}
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold">{q.data.answers.length} answers</h2>
        <div className="space-y-3">
          {q.data.answers.map((a: { id: string; body: string; upvotes: number; downvotes: number; is_accepted: boolean; is_ai: boolean; author_id: string }) => (
            <Card key={a.id} className={a.is_accepted ? "border-emerald-500" : ""}>
              <CardContent className="pt-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <button aria-label="Upvote" onClick={() => vote.mutate({ t: "answer", id: a.id, value: 1 })}><ChevronUp className="h-5 w-5" /></button>
                    <span className="text-xs">{a.upvotes - a.downvotes}</span>
                    <button aria-label="Downvote" onClick={() => vote.mutate({ t: "answer", id: a.id, value: -1 })}><ChevronDown className="h-5 w-5" /></button>
                  </div>
                  <div className="min-w-0 flex-1">
                    {a.is_accepted && <Badge className="mb-2 bg-emerald-600"><Check className="mr-1 h-3 w-3" />Accepted</Badge>}
                    {a.is_ai && <Badge variant="secondary" className="mb-2 ml-1">AI</Badge>}
                    <div className="prose prose-sm max-w-none dark:prose-invert"><ReactMarkdown>{a.body}</ReactMarkdown></div>
                    {!a.is_accepted && d.author_id && (
                      <Button size="sm" variant="ghost" className="mt-2" onClick={() => accept.mutate(a.id)}>Mark accepted</Button>
                    )}
                    <CommentsBlock answerId={a.id} comments={q.data.comments.filter((c: Comment) => c.answer_id === a.id)} onAdd={(body) => commentFn({ data: { answer_id: a.id, body } }).then(() => qc.invalidateQueries({ queryKey: ["community", "discussion", id] }))} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="pt-4">
          <p className="mb-2 text-sm font-semibold">Your answer</p>
          <Textarea rows={6} value={answerBody} onChange={(e) => setAnswerBody(e.target.value)} placeholder="Write a clear, helpful answer. Markdown supported." />
          <Button className="mt-3" onClick={() => submitAnswer.mutate(answerBody)} disabled={!answerBody.trim() || submitAnswer.isPending}>{submitAnswer.isPending ? "Posting…" : "Post answer"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function CommentsBlock({ comments, onAdd }: { answerId: string; comments: Comment[]; onAdd: (body: string) => Promise<void> }) {
  const [body, setBody] = useState("");
  return (
    <div className="mt-3 border-t pt-2">
      {comments.map((c) => <p key={c.id} className="text-xs text-muted-foreground">↳ {c.body}</p>)}
      <div className="mt-2 flex gap-2">
        <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Add a comment…" className="flex-1 rounded border bg-transparent px-2 py-1 text-xs" />
        <Button size="sm" variant="ghost" onClick={async () => { if (body.trim()) { await onAdd(body); setBody(""); } }}>Reply</Button>
      </div>
    </div>
  );
}
