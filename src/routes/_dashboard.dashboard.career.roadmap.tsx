import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateRoadmap, listRoadmaps, updateRoadmap } from "@/lib/career/roadmap.functions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/career/roadmap")({ component: RoadmapPage });

function RoadmapPage() {
  const gen = useServerFn(generateRoadmap);
  const list = useServerFn(listRoadmaps);
  const upd = useServerFn(updateRoadmap);
  const qc = useQueryClient();
  const [role, setRole] = useState("Full Stack Developer");
  const [months, setMonths] = useState(6);
  const key = ["career", "roadmaps"];
  const q = useQuery({ queryKey: key, queryFn: () => list() });
  const gm = useMutation({ mutationFn: () => gen({ data: { role, targetMonths: months } }), onSuccess: () => qc.invalidateQueries({ queryKey: key }) });
  const um = useMutation({ mutationFn: (v: { id: string; progress: number }) => upd({ data: v }), onSuccess: () => qc.invalidateQueries({ queryKey: key }) });

  return (
    <div className="space-y-6">
      <Card className="p-4 grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2"><Label>Target role</Label><Input value={role} onChange={(e) => setRole(e.target.value)} /></div>
        <div><Label>Timeline (months)</Label><Input type="number" min={1} max={36} value={months} onChange={(e) => setMonths(Number(e.target.value) || 6)} /></div>
        <div className="flex items-end"><Button disabled={gm.isPending} onClick={() => gm.mutate()}><Sparkles className="h-4 w-4 mr-1" />Generate</Button></div>
      </Card>

      {q.isLoading ? <Skeleton className="h-40" /> : (
        <div className="space-y-4">
          {(q.data?.roadmaps ?? []).map((r) => {
            const milestones = (r.milestones as unknown as Array<{ title: string; duration_weeks?: number; skills?: string[]; projects?: string[]; outcome?: string; done?: boolean }>) ?? [];
            return (
              <Card key={r.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.role}</div>
                    <div className="text-xs text-muted-foreground">{milestones.length} milestones</div>
                  </div>
                  <div className="w-40"><Progress value={Number(r.progress)} className="h-2" /></div>
                </div>
                <ol className="space-y-2">
                  {milestones.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                      <div>
                        <div className="font-medium">{m.title} <span className="text-xs text-muted-foreground">· {m.duration_weeks ?? 0} weeks</span></div>
                        {m.skills?.length ? <div className="text-xs text-muted-foreground">Skills: {m.skills.join(", ")}</div> : null}
                        {m.outcome ? <div className="text-xs text-muted-foreground">Outcome: {m.outcome}</div> : null}
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="flex gap-2">
                  {[25, 50, 75, 100].map((p) => (
                    <Button key={p} size="sm" variant="outline" disabled={um.isPending} onClick={() => um.mutate({ id: r.id, progress: p })}>{p}%</Button>
                  ))}
                </div>
              </Card>
            );
          })}
          {!(q.data?.roadmaps ?? []).length ? <p className="text-sm text-muted-foreground">Generate your first roadmap above.</p> : null}
        </div>
      )}
    </div>
  );
}
