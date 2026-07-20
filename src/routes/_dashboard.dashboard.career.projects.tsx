import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listProjectRecommendations, recommendProjects, toggleProjectSaved } from "@/lib/career/projects.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/career/projects")({ component: ProjectsPage });

function ProjectsPage() {
  const list = useServerFn(listProjectRecommendations);
  const rec = useServerFn(recommendProjects);
  const toggle = useServerFn(toggleProjectSaved);
  const qc = useQueryClient();
  const key = ["career", "projects"];
  const q = useQuery({ queryKey: key, queryFn: () => list() });
  const [role, setRole] = useState("Full Stack Developer");
  const [skills, setSkills] = useState("React, Node.js");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const m = useMutation({
    mutationFn: () => rec({ data: { role, skills: skills.split(",").map((s) => s.trim()).filter(Boolean), level, count: 5 } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });
  const tm = useMutation({ mutationFn: (v: { id: string; saved: boolean }) => toggle({ data: v }), onSuccess: () => qc.invalidateQueries({ queryKey: key }) });

  return (
    <div className="space-y-6">
      <Card className="p-4 grid gap-3 md:grid-cols-4">
        <div><Label>Role</Label><Input value={role} onChange={(e) => setRole(e.target.value)} /></div>
        <div className="md:col-span-2"><Label>Skills</Label><Input value={skills} onChange={(e) => setSkills(e.target.value)} /></div>
        <div>
          <Label>Level</Label>
          <Select value={level} onValueChange={(v) => setLevel(v as typeof level)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-4"><Button onClick={() => m.mutate()} disabled={m.isPending}><Sparkles className="h-4 w-4 mr-1" />Generate ideas</Button></div>
      </Card>

      {q.isLoading ? <Skeleton className="h-64" /> : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {(q.data?.projects ?? []).map((p) => (
            <Card key={p.id} className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-muted-foreground capitalize">{p.level} · {p.category ?? "General"}</div>
                </div>
                <button onClick={() => tm.mutate({ id: p.id, saved: !p.saved })}><Bookmark className={`h-4 w-4 ${p.saved ? "fill-primary text-primary" : "text-muted-foreground"}`} /></button>
              </div>
              <p className="text-sm">{p.objective}</p>
              <div className="flex flex-wrap gap-1">{(p.technologies ?? []).map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}</div>
              {p.learning_outcome ? <p className="text-xs text-muted-foreground">Outcome: {p.learning_outcome}</p> : null}
            </Card>
          ))}
          {!(q.data?.projects ?? []).length ? <p className="text-sm text-muted-foreground">Generate your first project ideas above.</p> : null}
        </div>
      )}
    </div>
  );
}
