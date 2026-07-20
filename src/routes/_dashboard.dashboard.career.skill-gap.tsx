import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { analyzeSkillGap, listSkillGapReports } from "@/lib/career/skill-gap.functions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/career/skill-gap")({ component: SkillGapPage });

function SkillGapPage() {
  const fn = useServerFn(analyzeSkillGap);
  const list = useServerFn(listSkillGapReports);
  const qc = useQueryClient();
  const [role, setRole] = useState("Frontend Developer");
  const [skills, setSkills] = useState("HTML, CSS, JavaScript, React");
  const key = ["career", "skill-gap"];
  const q = useQuery({ queryKey: key, queryFn: () => list() });
  const m = useMutation({
    mutationFn: () => fn({ data: { targetRole: role, currentSkills: skills.split(",").map((s) => s.trim()).filter(Boolean) } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });
  const latest = q.data?.reports?.[0];

  return (
    <div className="space-y-6">
      <Card className="p-4 space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <div><Label>Target role</Label><Input value={role} onChange={(e) => setRole(e.target.value)} /></div>
          <div><Label>Current skills (comma-separated)</Label><Textarea rows={2} value={skills} onChange={(e) => setSkills(e.target.value)} /></div>
        </div>
        <Button onClick={() => m.mutate()} disabled={m.isPending}>Analyze</Button>
      </Card>

      {q.isLoading ? <Skeleton className="h-40" /> : latest ? (
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-medium">{latest.target_role}</div>
            <div className="text-sm">Readiness: <strong>{Number(latest.readiness_pct ?? 0).toFixed(0)}%</strong></div>
          </div>
          <Progress value={Number(latest.readiness_pct ?? 0)} className="h-2" />
          <div className="grid gap-3 md:grid-cols-3">
            <div><div className="text-xs text-muted-foreground mb-1">Strong</div><div className="flex flex-wrap gap-1">{((latest.strong_skills as unknown as string[]) ?? []).map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div></div>
            <div><div className="text-xs text-muted-foreground mb-1">Weak</div><div className="flex flex-wrap gap-1">{((latest.weak_skills as unknown as string[]) ?? []).map((s) => <Badge key={s} variant="outline">{s}</Badge>)}</div></div>
            <div><div className="text-xs text-muted-foreground mb-1">Missing</div><div className="flex flex-wrap gap-1">{((latest.missing_skills as unknown as string[]) ?? []).map((s) => <Badge key={s}>{s}</Badge>)}</div></div>
          </div>
          <div className="text-xs text-muted-foreground">Est. learning time: {latest.estimated_learning_hours ?? "—"} hrs</div>
          {latest.ai_summary ? <p className="text-sm">{latest.ai_summary}</p> : null}
          <ul className="text-sm list-disc pl-5">
            {((latest.recommendations as unknown as Array<{ area: string; action: string }>) ?? []).map((r, i) => <li key={i}><strong>{r.area}:</strong> {r.action}</li>)}
          </ul>
        </Card>
      ) : <p className="text-sm text-muted-foreground">Run your first analysis above.</p>}
    </div>
  );
}
