import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { listDiscussions, createDiscussion } from "@/lib/community/discussions.functions";
import { findSimilarQuestions } from "@/lib/community/doubt-solver.functions";

export const Route = createFileRoute("/_dashboard/dashboard/community/discussions")({
  component: DiscussionsPage,
});

function DiscussionsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listDiscussions);
  const createFn = useServerFn(createDiscussion);
  const similarFn = useServerFn(findSimilarQuestions);
  const [search, setSearch] = useState("");
  const [unansweredOnly, setUnansweredOnly] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", tags: "" });
  const [similar, setSimilar] = useState<{ id: string; title: string }[]>([]);

  const list = useQuery({
    queryKey: ["community", "discussions", search, unansweredOnly],
    queryFn: () => listFn({ data: { search: search || undefined, unanswered: unansweredOnly || undefined } }),
  });

  const create = useMutation({
    mutationFn: () => createFn({ data: { title: form.title, body: form.body, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) } }),
    onSuccess: () => {
      toast.success("Question posted");
      setOpen(false);
      setForm({ title: "", body: "", tags: "" });
      setSimilar([]);
      qc.invalidateQueries({ queryKey: ["community", "discussions"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function checkSimilar(title: string) {
    if (title.length < 12) { setSimilar([]); return; }
    try {
      const res = await similarFn({ data: { title } });
      setSimilar(res);
    } catch { /* noop */ }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input placeholder="Search questions…" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
        <Button size="sm" variant={unansweredOnly ? "default" : "outline"} onClick={() => setUnansweredOnly((v) => !v)}>Unanswered</Button>
        <div className="ml-auto">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button>Ask a question</Button></DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader><DialogTitle>Ask a new question</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => { setForm({ ...form, title: e.target.value }); void checkSimilar(e.target.value); }}
                />
                {similar.length > 0 && (
                  <div className="rounded border border-amber-500/40 bg-amber-500/5 p-3 text-xs">
                    <p className="mb-1 font-semibold">Similar questions already asked:</p>
                    <ul className="list-disc space-y-1 pl-4">
                      {similar.map((s) => (
                        <li key={s.id}><Link to="/dashboard/community/discussions/$id" params={{ id: s.id }} className="text-primary hover:underline">{s.title}</Link></li>
                      ))}
                    </ul>
                  </div>
                )}
                <Textarea placeholder="Describe your question in detail. Use markdown for code fences." rows={8} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
                <Input placeholder="Tags (comma separated: react, typescript)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
              </div>
              <DialogFooter>
                <Button onClick={() => create.mutate()} disabled={!form.title || !form.body || create.isPending}>{create.isPending ? "Posting…" : "Post"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-3">
        {list.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {list.data?.length === 0 && <p className="text-sm text-muted-foreground">No questions yet — start the first one.</p>}
        {list.data?.map((d) => (
          <Card key={d.id}>
            <CardContent className="pt-4">
              <Link to="/dashboard/community/discussions/$id" params={{ id: d.id }} className="block">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium hover:text-primary">{d.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{d.body}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {d.tags.map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                    </div>
                  </div>
                  <div className="shrink-0 text-right text-xs text-muted-foreground">
                    <p>▲ {d.upvotes}</p>
                    <p>{d.answer_count} answers</p>
                    <p>{d.views} views</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
