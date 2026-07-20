import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { listStudyGroups, createStudyGroup, joinStudyGroup, leaveStudyGroup } from "@/lib/community/study-groups.functions";

export const Route = createFileRoute("/_dashboard/dashboard/community/study-groups")({
  component: StudyGroupsPage,
});

function StudyGroupsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listStudyGroups);
  const createFn = useServerFn(createStudyGroup);
  const joinFn = useServerFn(joinStudyGroup);
  const leaveFn = useServerFn(leaveStudyGroup);
  const [search, setSearch] = useState("");
  const [mine, setMine] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", topic: "", description: "", schedule: "", meeting_link: "", is_public: true });

  const list = useQuery({ queryKey: ["community", "study-groups", search, mine], queryFn: () => listFn({ data: { search: search || undefined, mine } }) });
  const create = useMutation({
    mutationFn: () => createFn({ data: form }),
    onSuccess: () => { toast.success("Group created"); setOpen(false); setForm({ name: "", topic: "", description: "", schedule: "", meeting_link: "", is_public: true }); qc.invalidateQueries({ queryKey: ["community", "study-groups"] }); },
    onError: (e: Error) => toast.error(e.message),
  });
  const join = useMutation({ mutationFn: (id: string) => joinFn({ data: { group_id: id } }), onSuccess: () => { toast.success("Joined"); qc.invalidateQueries({ queryKey: ["community", "study-groups"] }); } });
  const leave = useMutation({ mutationFn: (id: string) => leaveFn({ data: { group_id: id } }), onSuccess: () => { toast.success("Left"); qc.invalidateQueries({ queryKey: ["community", "study-groups"] }); } });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input placeholder="Search groups…" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
        <Button size="sm" variant={mine ? "default" : "outline"} onClick={() => setMine((v) => !v)}>My groups</Button>
        <div className="ml-auto">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button>Create study group</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New study group</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Topic (e.g. DSA, System Design)" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} />
                <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <Input placeholder="Schedule (e.g. Sundays 7pm IST)" value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} />
                <Input placeholder="Meeting link (Google Meet / Zoom)" value={form.meeting_link} onChange={(e) => setForm({ ...form, meeting_link: e.target.value })} />
              </div>
              <DialogFooter><Button onClick={() => create.mutate()} disabled={!form.name || create.isPending}>{create.isPending ? "Creating…" : "Create"}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {list.data?.length === 0 && <p className="text-sm text-muted-foreground">No study groups yet.</p>}
        {list.data?.map((g) => (
          <Card key={g.id}>
            <CardHeader><CardTitle className="text-base">{g.name}</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {g.topic && <p className="text-xs text-primary">{g.topic}</p>}
              <p className="line-clamp-2 text-muted-foreground">{g.description || "—"}</p>
              {g.schedule && <p className="text-xs">📅 {g.schedule}</p>}
              {g.meeting_link && <a href={g.meeting_link} target="_blank" rel="noreferrer" className="block text-xs text-primary hover:underline">Meeting link →</a>}
              {mine ? <Button size="sm" variant="outline" onClick={() => leave.mutate(g.id)}>Leave</Button> : <Button size="sm" onClick={() => join.mutate(g.id)}>Join</Button>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
