import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, GraduationCap, Search, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader, DashCard, EmptyState } from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { SYLLABUS_STAGES, boardLabel, stageForClass } from "@/lib/syllabus/catalog";

export const Route = createFileRoute("/_dashboard/dashboard/student/syllabus")({
  component: SyllabusPage,
});

function SyllabusPage() {
  const [query, setQuery] = useState("");
  const [stageId, setStageId] = useState<string | null>(null);

  const { data: profile } = useQuery({
    queryKey: ["me", "student_profile", "syllabus"],
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

  const currentStage = useMemo(() => {
    if (stageId) return SYLLABUS_STAGES.find((s) => s.id === stageId) ?? null;
    return stageForClass(profile?.current_class);
  }, [stageId, profile?.current_class]);

  const displayedStages = stageId
    ? SYLLABUS_STAGES.filter((s) => s.id === stageId)
    : currentStage
    ? [currentStage]
    : SYLLABUS_STAGES;

  const filterSubjects = (subjects: string[]) => {
    const q = query.trim().toLowerCase();
    if (!q) return subjects;
    return subjects.filter((s) => s.toLowerCase().includes(q));
  };

  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title="My Syllabus"
        description={
          profile?.current_class
            ? `Class ${profile.current_class} · ${boardLabel(profile.board)}`
            : "Grade-based subjects and chapters"
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects…"
            className="pl-9"
            aria-label="Search subjects"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStageId(null)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              stageId === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 bg-card hover:border-primary/40"
            }`}
          >
            {profile?.current_class ? "My grade" : "All"}
          </button>
          {SYLLABUS_STAGES.map((s) => (
            <button
              key={s.id}
              onClick={() => setStageId(s.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                stageId === s.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-card hover:border-primary/40"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {displayedStages.map((stage) => {
        const subjects = filterSubjects(stage.subjects);
        return (
          <section key={stage.id} className="mb-10">
            <SectionHeader
              title={
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" /> {stage.label}
                </span>
              }
              hint={stage.grades}
            />
            <p className="mb-4 text-sm text-muted-foreground">{stage.desc}</p>
            {subjects.length === 0 ? (
              <EmptyState
                icon={<BookOpen className="h-5 w-5" />}
                title="No subjects match your search"
                description="Try a different keyword."
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject) => (
                  <DashCard key={subject} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        {stage.grades}
                      </Badge>
                    </div>
                    <h3 className="text-base font-semibold">{subject}</h3>
                    <p className="text-xs text-muted-foreground">
                      Chapters, key concepts and revision guides aligned to the {boardLabel(profile?.board) || "national"} syllabus.
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <Link
                        to="/dashboard/student/browse"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        Browse courses →
                      </Link>
                      <span className="text-muted-foreground/50">·</span>
                      <Link
                        to="/dashboard/student/assessments"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        <Sparkles className="h-3 w-3" /> Weekly test
                      </Link>
                    </div>
                  </DashCard>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </RoleGate>
  );
}
