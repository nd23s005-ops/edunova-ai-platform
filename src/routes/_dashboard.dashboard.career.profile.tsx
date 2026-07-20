import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCareerProfile, upsertCareerProfile } from "@/lib/career/profile.functions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/career/profile")({ component: ProfilePage });

function ProfilePage() {
  const get = useServerFn(getCareerProfile);
  const save = useServerFn(upsertCareerProfile);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["career", "profile"], queryFn: () => get() });
  const [state, setState] = useState({
    career_goal: "",
    target_roles: "",
    preferred_locations: "",
    work_mode: "",
    experience_level: "",
    bio: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  useEffect(() => {
    const p = q.data?.profile;
    if (!p) return;
    const socials = (p.socials as { linkedin?: string; github?: string; portfolio?: string } | null) ?? {};
    setState({
      career_goal: p.career_goal ?? "",
      target_roles: (p.target_roles ?? []).join(", "),
      preferred_locations: (p.preferred_locations ?? []).join(", "),
      work_mode: (p.work_mode ?? []).join(", "),
      experience_level: p.experience_level ?? "",
      bio: p.bio ?? "",
      linkedin: socials.linkedin ?? "",
      github: socials.github ?? "",
      portfolio: socials.portfolio ?? "",
    });
  }, [q.data]);

  const m = useMutation({
    mutationFn: () => save({
      data: {
        career_goal: state.career_goal || null,
        target_roles: state.target_roles.split(",").map((s) => s.trim()).filter(Boolean),
        preferred_locations: state.preferred_locations.split(",").map((s) => s.trim()).filter(Boolean),
        work_mode: state.work_mode.split(",").map((s) => s.trim()).filter(Boolean),
        experience_level: state.experience_level || null,
        bio: state.bio || null,
        socials: { linkedin: state.linkedin, github: state.github, portfolio: state.portfolio },
      },
    }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["career", "profile"] }),
  });

  if (q.isLoading) return <Skeleton className="h-64" />;

  return (
    <Card className="p-4 space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <div><Label>Career goal</Label><Input value={state.career_goal} onChange={(e) => setState({ ...state, career_goal: e.target.value })} /></div>
        <div><Label>Experience level</Label><Input value={state.experience_level} onChange={(e) => setState({ ...state, experience_level: e.target.value })} placeholder="Fresher / 1-2 yrs / Senior" /></div>
        <div><Label>Target roles (comma-separated)</Label><Input value={state.target_roles} onChange={(e) => setState({ ...state, target_roles: e.target.value })} /></div>
        <div><Label>Preferred locations</Label><Input value={state.preferred_locations} onChange={(e) => setState({ ...state, preferred_locations: e.target.value })} /></div>
        <div><Label>Work mode (remote, hybrid, onsite)</Label><Input value={state.work_mode} onChange={(e) => setState({ ...state, work_mode: e.target.value })} /></div>
        <div><Label>LinkedIn</Label><Input value={state.linkedin} onChange={(e) => setState({ ...state, linkedin: e.target.value })} /></div>
        <div><Label>GitHub</Label><Input value={state.github} onChange={(e) => setState({ ...state, github: e.target.value })} /></div>
        <div><Label>Portfolio URL</Label><Input value={state.portfolio} onChange={(e) => setState({ ...state, portfolio: e.target.value })} /></div>
      </div>
      <div><Label>Bio</Label><Textarea rows={4} value={state.bio} onChange={(e) => setState({ ...state, bio: e.target.value })} /></div>
      <Button onClick={() => m.mutate()} disabled={m.isPending}><Save className="h-4 w-4 mr-1" />Save</Button>
    </Card>
  );
}
