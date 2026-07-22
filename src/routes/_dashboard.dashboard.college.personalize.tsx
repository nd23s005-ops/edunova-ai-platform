import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCareerProfile, upsertCareerProfile } from "@/lib/career/profile.functions";
import { generateRoadmap } from "@/lib/career/roadmap.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Save, Sparkles, Target, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { RoleGate } from "@/components/auth/RoleGate";

export const Route = createFileRoute("/_dashboard/dashboard/college/personalize")({
  head: () => ({
    meta: [
      { title: "Personalize — EduNova AI" },
      { name: "description", content: "Set your skill level, interests, and career goal to regenerate your AI roadmap and study plan." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <RoleGate allow={["college_student"]}>
      <Personalize />
    </RoleGate>
  ),
});

const LEVELS = ["beginner", "intermediate", "advanced", "expert"] as const;
type Level = (typeof LEVELS)[number];

function Personalize() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const getProfile = useServerFn(getCareerProfile);
  const upsert = useServerFn(upsertCareerProfile);
  const genRoadmap = useServerFn(generateRoadmap);

  const q = useQuery({ queryKey: ["career", "profile"], queryFn: () => getProfile() });

  const [careerGoal, setCareerGoal] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [level, setLevel] = useState<Level>("beginner");
  const [interests, setInterests] = useState<string>("");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const p = q.data?.profile as {
      career_goal?: string | null;
      target_roles?: string[] | null;
      experience_level?: string | null;
      bio?: string | null;
      socials?: Record<string, string> | null;
    } | null;
    if (!p) return;
    setCareerGoal(p.career_goal ?? "");
    setTargetRole((p.target_roles ?? [])[0] ?? "");
    if (p.experience_level && (LEVELS as readonly string[]).includes(p.experience_level)) {
      setLevel(p.experience_level as Level);
    }
    setBio(p.bio ?? "");
    setInterests(((p.socials?.interests as string) ?? "").toString());
  }, [q.data]);

  const save = useMutation({
    mutationFn: () =>
      upsert({
        data: {
          career_goal: careerGoal || null,
          target_roles: targetRole ? [targetRole] : [],
          experience_level: level,
          bio: bio || null,
          socials: { interests },
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["career", "profile"] });
      qc.invalidateQueries({ queryKey: ["college-brief"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
  });

  const regen = useMutation({
    mutationFn: async () => {
      // Save first, then regenerate the roadmap using latest settings.
      await save.mutateAsync();
      return genRoadmap({
        data: {
          role: targetRole || careerGoal || "Software Engineer",
          currentLevel: level,
          targetMonths: 6,
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["career", "roadmaps"] });
      qc.invalidateQueries({ queryKey: ["college-brief"] });
      nav({ to: "/dashboard/roadmap" });
    },
  });

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Target className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Personalization</p>
            <h1 className="text-lg font-semibold">Tune your AI roadmap & study plan</h1>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Your skill level, interests, and career goal drive every AI-generated recommendation — dashboard focus,
          roadmap milestones, coding challenges, and study plan.
        </p>
      </div>

      <Card className="p-5 space-y-4">
        <div>
          <Label>Career goal</Label>
          <Textarea
            rows={2}
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            placeholder="e.g. Land a full-stack engineering role at a product company by Q3 2026"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Target role</Label>
            <Input
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Full Stack Developer"
            />
          </div>
          <div>
            <Label>Skill level</Label>
            <Select value={level} onValueChange={(v) => setLevel(v as Level)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {LEVELS.map((l) => (
                  <SelectItem key={l} value={l} className="capitalize">{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Interests (comma-separated)</Label>
          <Input
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. web development, machine learning, systems design, open source"
          />
        </div>

        <div>
          <Label>About you</Label>
          <Textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A short summary — semester, tech you enjoy, projects you're proud of."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button onClick={() => save.mutate()} disabled={save.isPending}>
            <Save className="h-4 w-4 mr-1" />
            {save.isPending ? "Saving…" : "Save preferences"}
          </Button>
          <Button variant="secondary" onClick={() => regen.mutate()} disabled={regen.isPending || (!targetRole && !careerGoal)}>
            <Sparkles className="h-4 w-4 mr-1" />
            {regen.isPending ? "Regenerating…" : "Save + regenerate roadmap"}
          </Button>
          {saved ? (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" /> Saved
            </span>
          ) : null}
          {regen.isError ? <span className="text-xs text-destructive">Roadmap generation failed. Try again.</span> : null}
        </div>
      </Card>
    </div>
  );
}
