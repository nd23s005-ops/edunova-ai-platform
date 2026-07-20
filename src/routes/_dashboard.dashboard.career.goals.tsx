import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteGoal, listGoals, upsertGoal } from "@/lib/career/goals.functions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/career/goals")({ component: GoalsPage });

function GoalsPage() {
  const list = useServerFn(listGoals);
  const up = useServerFn(upsertGoal);
  const del = useServerFn(deleteGoal);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["career", "goals"], queryFn: () => list() });
  const [form, setForm] = useState<{ title: string; cadence: "daily" | "weekly" | "monthly"; target: number }>({ title: "", cadence: "weekly", target: 5 });
  const um = useMutation({ mutationFn: () => up({ data: form }), onSuccess: () => { qc.invalidateQueries({ queryKey: ["career", "goals"] }); setForm({ title: "", cadence: "weekly", target: 5 }); } });
  const inc = useMutation({ mutationFn: (v: { id: string; progress: number; target: number; cadence: "daily" | "weekly" | "monthly"; title: string }) => up({ data: v }), onSuccess: () => qc.invalidateQueries({ queryKey: ["career", "goals"] }) });
  const dm = useMutation({ mutationFn: (id: string) => del({ data: { id } }), onSuccess: () => qc.invalidateQueries({ queryKey: ["career", "goals"] }) });

  return (
    <div className="space-y-6">
      <Card className="p-4 grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2"><Label>Goal</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Solve 10 coding problems this week" /></div>
        <div>
          <Label>Cadence</Label>
          <Select value={form.cadence} onValueChange={(v) => setForm({ ...form, cadence: v as typeof form.cadence })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div><Label>Target</Label><Input type="number" value={form.target} onChange={(e) => setForm({ ...form, target: Number(e.target.value) || 1 })} /></div>
        <div className="md:col-span-4"><Button onClick={() => um.mutate()} disabled={um.isPending || !form.title}><Plus className="h-4 w-4 mr-1" />Add goal</Button></div>
      </Card>

      {q.isLoading ? <Skeleton className="h-40" /> : (
        <div className="grid gap-3 md:grid-cols-2">
          {(q.data?.goals ?? []).map((g) => {
            const pct = Math.min(100, Math.round((Number(g.progress) / Math.max(1, Number(g.target))) * 100));
            return (
              <Card key={g.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{g.title}</div>
                    <div className="text-xs text-muted-foreground capitalize">{g.cadence} · {g.progress}/{g.target}</div>
                  </div>
                  <button onClick={() => { if (confirm("Delete?")) dm.mutate(g.id); }}><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button>
                </div>
                <Progress value={pct} className="h-2" />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => inc.mutate({ id: g.id, title: g.title, cadence: g.cadence as "daily" | "weekly" | "monthly", target: Number(g.target), progress: Math.min(Number(g.target), Number(g.progress) + 1) })}>+1</Button>
                </div>
              </Card>
            );
          })}
          {!(q.data?.goals ?? []).length ? <p className="text-sm text-muted-foreground">Set a career goal above.</p> : null}
        </div>
      )}
    </div>
  );
}
