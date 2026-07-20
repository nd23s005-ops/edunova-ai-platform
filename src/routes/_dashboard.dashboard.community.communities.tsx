import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { COMMUNITY_CATEGORIES } from "@/lib/community/community.server";
import { listCommunities, createCommunity, joinCommunity, leaveCommunity } from "@/lib/community/communities.functions";

export const Route = createFileRoute("/_dashboard/dashboard/community/communities")({
  component: CommunitiesPage,
});

function CommunitiesPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listCommunities);
  const createFn = useServerFn(createCommunity);
  const joinFn = useServerFn(joinCommunity);
  const leaveFn = useServerFn(leaveCommunity);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const [mine, setMine] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", category: "general", visibility: "public" as "public" | "private", tags: "" });

  const list = useQuery({
    queryKey: ["community", "list", search, category, mine],
    queryFn: () => listFn({ data: { search: search || undefined, category: category || undefined, mine } }),
  });

  const create = useMutation({
    mutationFn: () => createFn({
      data: {
        name: form.name,
        description: form.description,
        category: form.category,
        visibility: form.visibility,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      },
    }),
    onSuccess: () => {
      toast.success("Community created");
      setOpen(false);
      setForm({ name: "", description: "", category: "general", visibility: "public", tags: "" });
      qc.invalidateQueries({ queryKey: ["community"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const join = useMutation({
    mutationFn: (community_id: string) => joinFn({ data: { community_id } }),
    onSuccess: () => { toast.success("Joined"); qc.invalidateQueries({ queryKey: ["community"] }); },
    onError: (e: Error) => toast.error(e.message),
  });
  const leave = useMutation({
    mutationFn: (community_id: string) => leaveFn({ data: { community_id } }),
    onSuccess: () => { toast.success("Left"); qc.invalidateQueries({ queryKey: ["community"] }); },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input placeholder="Search communities…" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        <Select value={category || "all"} onValueChange={(v) => setCategory(v === "all" ? "" : v)}>
          <SelectTrigger className="w-48"><SelectValue placeholder="All categories" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {COMMUNITY_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button variant={mine ? "default" : "outline"} onClick={() => setMine((v) => !v)} size="sm">My communities</Button>
        <div className="ml-auto">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button>Create community</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New community</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{COMMUNITY_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={form.visibility} onValueChange={(v) => setForm({ ...form, visibility: v as "public" | "private" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
              </div>
              <DialogFooter>
                <Button onClick={() => create.mutate()} disabled={!form.name || create.isPending}>{create.isPending ? "Creating…" : "Create"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {list.data?.length === 0 && <p className="text-sm text-muted-foreground">No communities found.</p>}
        {list.data?.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span>{c.name}</span>
                <Badge variant="outline">{c.member_count}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="line-clamp-2 text-sm text-muted-foreground">{c.description || "—"}</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">{c.category}</Badge>
                {c.tags.slice(0, 3).map((t) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
              </div>
              <div className="flex gap-2">
                {mine ? (
                  <Button size="sm" variant="outline" onClick={() => leave.mutate(c.id)}>Leave</Button>
                ) : (
                  <Button size="sm" onClick={() => join.mutate(c.id)}>Join</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
