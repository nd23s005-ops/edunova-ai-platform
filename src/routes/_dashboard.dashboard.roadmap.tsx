import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Loader2, Target, CheckCircle2, BookOpen, Calendar } from "lucide-react";
import { toast } from "sonner";

import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  generateRoadmap,
  listRoadmaps,
  type RoadmapPlan,
} from "@/lib/ai/roadmap.functions";

export const Route = createFileRoute("/_dashboard/dashboard/roadmap")({
  head: () => ({
    meta: [
      { title: "AI Learning Roadmap — EduNova AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RoadmapPage,
});

type Level = "beginner" | "intermediate" | "advanced";

function RoadmapPage() {
  const qc = useQueryClient();
  const gen = useServerFn(generateRoadmap);
  const list = useServerFn(listRoadmaps);

  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState<Level>("beginner");
  const [hours, setHours] = useState(5);
  const [target, setTarget] = useState("");
  const [interests, setInterests] = useState("");
  const [current, setCurrent] = useState<RoadmapPlan | null>(null);

  const { data: history } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: () => list(),
    staleTime: 30_000,
  });

  const mutation = useMutation({
    mutationFn: () =>
      gen({
        data: {
          goal: goal.trim(),
          level,
          weeklyHours: hours,
          targetDate: target || undefined,
          interests: interests || undefined,
        },
      }),
    onSuccess: (res) => {
      setCurrent(res.plan);
      qc.invalidateQueries({ queryKey: ["roadmaps"] });
      toast.success("Your personalized roadmap is ready.");
    },
    onError: (e) => toast.error((e as Error).message),
  });

  return (
    <>
      <DashboardHeader
        title="AI Custom Learning Roadmap"
        description="Tell Nova about your goal — get a personalized plan with phases, milestones, practice and assessments."
      />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Form */}
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-base font-semibold">Design your roadmap</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="goal">Goal</Label>
              <Input
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Land a backend engineer role"
              />
            </div>
            <div>
              <Label>Current skill level</Label>
              <Select value={level} onValueChange={(v) => setLevel(v as Level)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="hours">Weekly hours available</Label>
              <Input
                id="hours"
                type="number"
                min={1}
                max={80}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value || 0))}
              />
            </div>
            <div>
              <Label htmlFor="target">Target completion date</Label>
              <Input
                id="target"
                type="date"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="interests">Interests</Label>
              <Textarea
                id="interests"
                rows={3}
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., systems, distributed, DSA"
              />
            </div>
            <Button
              className="w-full"
              disabled={!goal.trim() || mutation.isPending}
              onClick={() => mutation.mutate()}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate roadmap
                </>
              )}
            </Button>
          </div>

          {history && history.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                History
              </p>
              <ul className="space-y-2">
                {history.slice(0, 6).map((r) => (
                  <li key={r.id as string}>
                    <button
                      onClick={() => setCurrent(r.plan as unknown as RoadmapPlan)}
                      className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-left text-sm hover:bg-muted"
                    >
                      <p className="font-medium line-clamp-1">{r.goal as string}</p>
                      <p className="text-xs text-muted-foreground">
                        {String(r.level)} · {String(r.weekly_hours)} h/wk
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Plan */}
        <div className="space-y-6">
          {!current ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
              <Target className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-semibold">No roadmap yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in your goal on the left and Nova will craft a personalized plan.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Your plan
                </p>
                <p className="mt-2 text-sm">{current.summary}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Estimated: {current.totalWeeks} weeks
                </p>
              </div>

              <div className="space-y-4">
                {current.phases.map((p, i) => (
                  <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold">
                        {i + 1}. {p.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">{p.duration}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{p.focus}</p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <PhaseList icon={<BookOpen className="h-3.5 w-3.5" />} label="Courses" items={p.courses} />
                      <PhaseList icon={<Target className="h-3.5 w-3.5" />} label="Milestones" items={p.milestones} />
                      <PhaseList icon={<Sparkles className="h-3.5 w-3.5" />} label="Practice" items={p.practice} />
                      <PhaseList icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Assessments" items={p.assessments} />
                      <PhaseList icon={<BookOpen className="h-3.5 w-3.5" />} label="Resources" items={p.resources} />
                    </div>

                    {p.checkpoint && (
                      <div className="mt-4 rounded-lg bg-primary/5 p-3 text-xs">
                        <span className="font-semibold text-primary">Checkpoint: </span>
                        {p.checkpoint}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {current.weeklyMilestones.length > 0 && (
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                  <div className="mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <h3 className="text-base font-semibold">Weekly milestones</h3>
                  </div>
                  <ol className="space-y-2 text-sm">
                    {current.weeklyMilestones.map((m, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-muted-foreground">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function PhaseList({
  icon,
  label,
  items,
}: {
  icon: React.ReactNode;
  label: string;
  items: string[];
}) {
  if (!items?.length) return null;
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <ul className="space-y-1 text-sm">
        {items.slice(0, 6).map((it, i) => (
          <li key={i} className="flex gap-1.5">
            <span className="text-muted-foreground">–</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
