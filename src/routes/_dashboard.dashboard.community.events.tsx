import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { listEvents, createEvent, registerEvent } from "@/lib/community/events.functions";

const KINDS = [
  { v: "live_class", label: "Live class" },
  { v: "workshop", label: "Workshop" },
  { v: "webinar", label: "Webinar" },
  { v: "contest", label: "Coding contest" },
  { v: "hackathon", label: "Hackathon" },
  { v: "career", label: "Career event" },
  { v: "qa", label: "Q&A session" },
];

export const Route = createFileRoute("/_dashboard/dashboard/community/events")({
  component: EventsPage,
});

function EventsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listEvents);
  const createFn = useServerFn(createEvent);
  const regFn = useServerFn(registerEvent);
  const [kind, setKind] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", kind: "live_class", starts_at: "", ends_at: "", meeting_link: "", tags: "" });

  const list = useQuery({ queryKey: ["community", "events", kind], queryFn: () => listFn({ data: { upcoming: true, kind: kind || undefined } }) });

  const create = useMutation({
    mutationFn: () => createFn({ data: {
      title: form.title, description: form.description, kind: form.kind,
      starts_at: new Date(form.starts_at).toISOString(),
      ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : undefined,
      meeting_link: form.meeting_link || undefined,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    } }),
    onSuccess: () => { toast.success("Event created"); setOpen(false); qc.invalidateQueries({ queryKey: ["community", "events"] }); },
    onError: (e: Error) => toast.error(e.message),
  });
  const register = useMutation({
    mutationFn: (v: { id: string; on: boolean }) => regFn({ data: { event_id: v.id, on: v.on } }),
    onSuccess: () => { toast.success("Registration updated"); qc.invalidateQueries({ queryKey: ["community", "events"] }); },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Select value={kind || "all"} onValueChange={(v) => setKind(v === "all" ? "" : v)}>
          <SelectTrigger className="w-56"><SelectValue placeholder="All events" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All event types</SelectItem>
            {KINDS.map((k) => <SelectItem key={k.v} value={k.v}>{k.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="ml-auto">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button>Host event</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Host a new event</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <Select value={form.kind} onValueChange={(v) => setForm({ ...form, kind: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{KINDS.map((k) => <SelectItem key={k.v} value={k.v}>{k.label}</SelectItem>)}</SelectContent>
                </Select>
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs">Starts at<Input type="datetime-local" value={form.starts_at} onChange={(e) => setForm({ ...form, starts_at: e.target.value })} /></label>
                  <label className="text-xs">Ends at<Input type="datetime-local" value={form.ends_at} onChange={(e) => setForm({ ...form, ends_at: e.target.value })} /></label>
                </div>
                <Input placeholder="Meeting link (Zoom / Google Meet)" value={form.meeting_link} onChange={(e) => setForm({ ...form, meeting_link: e.target.value })} />
                <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
              </div>
              <DialogFooter><Button onClick={() => create.mutate()} disabled={!form.title || !form.starts_at || create.isPending}>{create.isPending ? "Creating…" : "Publish"}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {list.data?.length === 0 && <p className="text-sm text-muted-foreground">No upcoming events. Host one!</p>}
        {list.data?.map((e) => (
          <Card key={e.id}>
            <CardHeader><CardTitle className="flex items-center justify-between text-base"><span>{e.title}</span><Badge variant="outline">{e.kind.replace("_", " ")}</Badge></CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="line-clamp-2 text-muted-foreground">{e.description || "—"}</p>
              <p className="text-xs">🗓 {new Date(e.starts_at).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{e.registered_count} registered</p>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => register.mutate({ id: e.id, on: true })}>Register</Button>
                {e.meeting_link && <a href={e.meeting_link} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">Join link →</a>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
