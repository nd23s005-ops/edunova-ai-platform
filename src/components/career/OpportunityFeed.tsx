import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listApplications, listOpportunities, recommendOpportunities, upsertApplication } from "@/lib/career/opportunities.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Bookmark, ExternalLink } from "lucide-react";
import { useState } from "react";

type Kind = "job" | "internship";
type ApplicationStatus = "saved" | "applied" | "interview" | "offer" | "rejected" | "withdrawn";
const STATUSES: ApplicationStatus[] = ["saved", "applied", "interview", "offer", "rejected", "withdrawn"];

export function OpportunityFeed({ kind }: { kind: Kind }) {
  const listOps = useServerFn(listOpportunities);
  const rec = useServerFn(recommendOpportunities);
  const listApps = useServerFn(listApplications);
  const upsert = useServerFn(upsertApplication);
  const qc = useQueryClient();
  const opsKey = ["career", kind, "feed"];
  const appsKey = ["career", kind, "apps"];
  const feed = useQuery({ queryKey: opsKey, queryFn: () => listOps({ data: { kind } }) });
  const apps = useQuery({ queryKey: appsKey, queryFn: () => listApps({ data: { kind } }) });

  const [skills, setSkills] = useState("React, Node.js, TypeScript");
  const [role, setRole] = useState(kind === "job" ? "Full Stack Developer" : "Frontend Intern");
  const [location, setLocation] = useState("Bangalore");
  const [mode, setMode] = useState<"remote" | "hybrid" | "onsite" | "any">("any");

  const gm = useMutation({
    mutationFn: () => rec({ data: { kind, skills: skills.split(",").map((s) => s.trim()).filter(Boolean), role, location, mode, count: 8 } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: opsKey }),
  });
  const am = useMutation({
    mutationFn: (v: { target_id: string; status: ApplicationStatus }) => upsert({ data: { kind, target_id: v.target_id, status: v.status } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: appsKey }),
  });

  return (
    <div className="space-y-6">
      <Card className="p-4 grid gap-3 md:grid-cols-5">
        <div><Label>Role</Label><Input value={role} onChange={(e) => setRole(e.target.value)} /></div>
        <div className="md:col-span-2"><Label>Skills</Label><Input value={skills} onChange={(e) => setSkills(e.target.value)} /></div>
        <div><Label>Location</Label><Input value={location} onChange={(e) => setLocation(e.target.value)} /></div>
        <div>
          <Label>Mode</Label>
          <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {(["any", "remote", "hybrid", "onsite"] as const).map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-5"><Button onClick={() => gm.mutate()} disabled={gm.isPending}><Sparkles className="h-4 w-4 mr-1" />Generate matches</Button></div>
      </Card>

      {feed.isLoading ? <Skeleton className="h-64" /> : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {(feed.data?.items ?? []).map((o) => (
            <Card key={o.id} className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{o.title}</div>
                  <div className="text-xs text-muted-foreground">{o.company ?? "—"} · {o.location ?? ""}</div>
                </div>
                <Badge variant="secondary">{Number(o.ai_match_score ?? 0).toFixed(0)}% match</Badge>
              </div>
              {o.description ? <p className="text-sm text-muted-foreground line-clamp-3">{o.description}</p> : null}
              <div className="flex flex-wrap gap-1">{(o.skills ?? []).slice(0, 5).map((s: string) => <Badge key={s} variant="outline">{s}</Badge>)}</div>
              <div className="flex items-center gap-2 pt-1">
                {o.url ? <a href={o.url} target="_blank" rel="noreferrer" className="text-xs text-primary inline-flex items-center gap-1">Open <ExternalLink className="h-3 w-3" /></a> : null}
                <Select onValueChange={(v) => am.mutate({ target_id: o.id, status: v as ApplicationStatus })}>
                  <SelectTrigger className="h-8 w-32 text-xs"><SelectValue placeholder="Track"><Bookmark className="h-3 w-3 inline mr-1" />Track</SelectValue></SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          ))}
          {!(feed.data?.items ?? []).length ? <p className="text-sm text-muted-foreground">Generate matched opportunities above.</p> : null}
        </div>
      )}

      <Card className="p-4">
        <div className="text-sm font-medium mb-2">Application tracker</div>
        {apps.isLoading ? <Skeleton className="h-20" /> : (
          <ul className="text-sm space-y-1">
            {(apps.data?.applications ?? []).map((a) => (
              <li key={a.id} className="flex justify-between border-b pb-1"><span>{a.manual_title ?? "—"}</span><Badge variant="outline" className="capitalize">{a.status}</Badge></li>
            ))}
            {!(apps.data?.applications ?? []).length ? <li className="text-muted-foreground">No applications yet.</li> : null}
          </ul>
        )}
      </Card>
    </div>
  );
}
