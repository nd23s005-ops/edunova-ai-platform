import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { listArticles, publishArticle, reactArticle, getArticle } from "@/lib/community/articles.functions";
import { Heart, Bookmark } from "lucide-react";

const KINDS = ["article", "tutorial", "note", "research", "snippet", "showcase", "success_story"];

export const Route = createFileRoute("/_dashboard/dashboard/community/knowledge")({
  component: KnowledgePage,
});

function KnowledgePage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listArticles);
  const pubFn = useServerFn(publishArticle);
  const reactFn = useServerFn(reactArticle);
  const getFn = useServerFn(getArticle);
  const [kind, setKind] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", summary: "", body: "", kind: "article", tags: "" });
  const [preview, setPreview] = useState<{ id: string; slug: string; title: string; body: string; kind: string; likes: number; tags: string[]; my_reactions: string[] } | null>(null);

  const list = useQuery({ queryKey: ["community", "articles", kind], queryFn: () => listFn({ data: { kind: kind || undefined } }) });
  const publish = useMutation({
    mutationFn: () => pubFn({ data: { title: form.title, summary: form.summary, body: form.body, kind: form.kind, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) } }),
    onSuccess: () => { toast.success("Published"); setOpen(false); setForm({ title: "", summary: "", body: "", kind: "article", tags: "" }); qc.invalidateQueries({ queryKey: ["community", "articles"] }); },
    onError: (e: Error) => toast.error(e.message),
  });
  const react = useMutation({
    mutationFn: (v: { article_id: string; kind: "like" | "bookmark"; on: boolean }) => reactFn({ data: v }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["community", "articles"] }); if (preview) openPreview(preview.slug); },
  });

  async function openPreview(slug: string) {
    const a = await getFn({ data: { slug } });
    if (a) setPreview(a);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Select value={kind || "all"} onValueChange={(v) => setKind(v === "all" ? "" : v)}>
          <SelectTrigger className="w-56"><SelectValue placeholder="All types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {KINDS.map((k) => <SelectItem key={k} value={k}>{k.replace("_", " ")}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="ml-auto">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button>Publish article</Button></DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader><DialogTitle>New knowledge post</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <Select value={form.kind} onValueChange={(v) => setForm({ ...form, kind: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{KINDS.map((k) => <SelectItem key={k} value={k}>{k.replace("_", " ")}</SelectItem>)}</SelectContent>
                </Select>
                <Input placeholder="Short summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
                <Textarea rows={10} placeholder="Write in markdown — code fences, headers, lists supported." value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
                <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
              </div>
              <DialogFooter><Button onClick={() => publish.mutate()} disabled={!form.title || !form.body || publish.isPending}>{publish.isPending ? "Publishing…" : "Publish"}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {list.data?.length === 0 && <p className="text-sm text-muted-foreground">No articles yet.</p>}
        {list.data?.map((a) => (
          <Card key={a.id} className="cursor-pointer transition hover:border-primary" onClick={() => openPreview(a.slug)}>
            <CardHeader><CardTitle className="flex items-center justify-between text-base"><span>{a.title}</span><Badge variant="outline">{a.kind.replace("_", " ")}</Badge></CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="line-clamp-2 text-muted-foreground">{a.summary || "—"}</p>
              <div className="flex flex-wrap gap-1">{a.tags.slice(0, 4).map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}</div>
              <p className="text-xs text-muted-foreground">❤ {a.likes}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-3xl">
          {preview && (
            <>
              <DialogHeader><DialogTitle>{preview.title}</DialogTitle></DialogHeader>
              <div className="prose prose-sm max-h-[60vh] max-w-none overflow-y-auto dark:prose-invert"><ReactMarkdown>{preview.body}</ReactMarkdown></div>
              <div className="flex gap-2 border-t pt-3">
                <Button size="sm" variant={preview.my_reactions.includes("like") ? "default" : "outline"} onClick={() => react.mutate({ article_id: preview.id, kind: "like", on: !preview.my_reactions.includes("like") })}><Heart className="mr-1 h-4 w-4" />{preview.likes}</Button>
                <Button size="sm" variant={preview.my_reactions.includes("bookmark") ? "default" : "outline"} onClick={() => react.mutate({ article_id: preview.id, kind: "bookmark", on: !preview.my_reactions.includes("bookmark") })}><Bookmark className="mr-1 h-4 w-4" />Bookmark</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
