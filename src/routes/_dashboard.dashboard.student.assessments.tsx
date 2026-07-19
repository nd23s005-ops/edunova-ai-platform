import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { ClipboardList, Sparkles, CheckCircle2, PlayCircle } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader, DashCard, EmptyState } from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import {
  ASSESSMENT_SUBJECTS,
  boardLabel,
  subjectsForClass,
} from "@/lib/syllabus/catalog";
import {
  listWeeklyAssessments,
  generateWeeklyAssessment,
} from "@/lib/ai/weekly-assessments.functions";

export const Route = createFileRoute("/_dashboard/dashboard/student/assessments")({
  component: AssessmentsPage,
});

function AssessmentsPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const list = useServerFn(listWeeklyAssessments);
  const generate = useServerFn(generateWeeklyAssessment);
  const [subject, setSubject] = useState<string>("");

  const { data: profile } = useQuery({
    queryKey: ["me", "student_profile", "assessments"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("student_profiles")
        .select("current_class, board")
        .eq("user_id", u.user.id)
        .maybeSingle();
      return data as { current_class: number | null; board: string | null } | null;
    },
    staleTime: 60_000,
  });

  const { data: assessments } = useQuery({
    queryKey: ["me", "weekly-assessments"],
    queryFn: () => list(),
    staleTime: 15_000,
  });

  const genMutation = useMutation({
    mutationFn: async (input: { board: string; classLevel: number; subject: string }) => {
      return generate({ data: input });
    },
    onSuccess: async (res) => {
      toast.success(res.created ? "Assessment ready" : "Assessment already exists for this week");
      await qc.invalidateQueries({ queryKey: ["me", "weekly-assessments"] });
      navigate({ to: "/dashboard/student/assessments/$assessmentId", params: { assessmentId: res.id } });
    },
    onError: (e: Error) => toast.error(e.message ?? "Could not generate the assessment"),
  });

  const eligibleSubjects = (() => {
    const forClass = subjectsForClass(profile?.current_class);
    const allowed = new Set(ASSESSMENT_SUBJECTS as readonly string[]);
    return forClass.filter((s) => allowed.has(s));
  })();

  const handleGenerate = () => {
    if (!profile?.board || !profile?.current_class) {
      toast.error("Please set your board and class in Profile first.");
      return;
    }
    if (!subject) {
      toast.error("Choose a subject to generate an assessment.");
      return;
    }
    genMutation.mutate({
      board: profile.board,
      classLevel: profile.current_class,
      subject,
    });
  };

  const rows = assessments ?? [];

  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title="Weekly Assessments"
        description={
          profile?.current_class
            ? `Class ${profile.current_class} · ${boardLabel(profile.board)} · 25 questions across 5 categories`
            : "AI-generated weekly tests to track your progress"
        }
      />

      <DashCard className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="mr-1 inline h-3.5 w-3.5" /> Generate this week's assessment
          </p>
          <h3 className="mt-1 text-lg font-semibold">Pick a subject for your Class {profile?.current_class ?? "—"} weekly test</h3>
          <p className="text-sm text-muted-foreground">
            5 categories × 5 questions · Concepts, Application, Reasoning, Scenarios, Advanced.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="min-w-[220px]">
              <SelectValue placeholder="Choose subject" />
            </SelectTrigger>
            <SelectContent>
              {(eligibleSubjects.length > 0 ? eligibleSubjects : ASSESSMENT_SUBJECTS).map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerate} disabled={genMutation.isPending}>
            {genMutation.isPending ? "Generating…" : "Generate"}
          </Button>
        </div>
      </DashCard>

      <section>
        <SectionHeader title="Your assessments" />
        {rows.length === 0 ? (
          <EmptyState
            icon={<ClipboardList className="h-5 w-5" />}
            title="No assessments yet"
            description="Generate your first weekly assessment above."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((a) => {
              const done = !!a.attempt?.submitted_at;
              const pct = done && a.attempt?.max_score
                ? Math.round(((a.attempt?.score ?? 0) / (a.attempt?.max_score ?? 1)) * 100)
                : null;
              return (
                <Link
                  key={a.id}
                  to="/dashboard/student/assessments/$assessmentId"
                  params={{ assessmentId: a.id }}
                  className="block rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:border-primary/40"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      {done ? <CheckCircle2 className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Week of {a.week_start}
                    </span>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">
                    {boardLabel(a.board)} · Class {a.class_level}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-base font-semibold">{a.subject}</h3>
                  <p className="mt-3 text-sm">
                    {done ? (
                      <span className="font-semibold text-primary">
                        Score: {a.attempt?.score}/{a.attempt?.max_score} · {pct}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Not attempted yet</span>
                    )}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-primary">
                    {done ? "Review →" : "Start assessment →"}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </RoleGate>
  );
}
