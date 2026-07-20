import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { DashCard } from "@/components/dashboard/DashboardWidgets";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { listLearningPaths, upsertLearningPath } from "@/lib/cms/cms.functions";

export const Route = createFileRoute("/_dashboard/dashboard/admin/cms/paths")({
  component: Paths,
});

function Paths() {
  const qc = useQueryClient();
  const listFn = useServerFn(listLearningPaths);
  const upsertFn = useServerFn(upsertLearningPath);
  const q = useQuery({ queryKey: ["cms", "paths"], queryFn: () => listFn() });

  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");

  return (
    <>
      <Link to="/dashboard/admin/cms" className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline">
        <ArrowLeft className="h-3 w-3" /> Back to CMS
      </Link>
      <DashboardHeader
        title="Learning Paths"
        description="Curated multi-course journeys. Learners get assigned paths based on role, skill level, goals and progress."
      />

      <DashCard className="mb-6">
        <div className="grid gap-3 sm:grid-cols-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Path title"
            className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm sm:col-span-2"
          />
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Target role"
            className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          />
          <input
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            placeholder="Skill level"
            className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="mt-3 flex justify-end">
          <Button
            disabled={!title.trim()}
            onClick={async () => {
              try {
                await upsertFn({
                  data: { title, target_role: role || null, skill_level: level || null, tags: [] },
                });
                toast.success("Path created");
                setTitle("");
                setRole("");
                setLevel("");
                qc.invalidateQueries({ queryKey: ["cms", "paths"] });
              } catch (e) {
                toast.error((e as Error).message);
              }
            }}
          >
            <Plus className="mr-1 h-4 w-4" /> Add path
          </Button>
        </div>
      </DashCard>

      <div className="space-y-3">
        {(q.data ?? []).map((p) => (
          <DashCard key={p.id}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-base font-semibold">{p.title}</div>
                <div className="text-xs text-muted-foreground">
                  {p.target_role ?? "—"} · {p.skill_level ?? "any level"} · {p.is_active ? "active" : "inactive"}
                </div>
              </div>
            </div>
            {p.description && <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>}
          </DashCard>
        ))}
        {(q.data ?? []).length === 0 && (
          <DashCard className="text-sm text-muted-foreground">
            No learning paths yet.
          </DashCard>
        )}
      </div>
    </>
  );
}
