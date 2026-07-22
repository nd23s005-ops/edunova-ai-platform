import { createFileRoute, Link } from "@tanstack/react-router";
import { Atom, FlaskConical, Sigma, Leaf, TreePine, Bug, BookText, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader } from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import { SUBJECTS } from "@/lib/ai/subject-quiz.functions";

export const Route = createFileRoute("/_dashboard/dashboard/student/quizzes/")({
  component: QuizzesIndex,
});

const ICONS: Record<string, ReactNode> = {
  physics: <Atom className="h-6 w-6" />,
  chemistry: <FlaskConical className="h-6 w-6" />,
  mathematics: <Sigma className="h-6 w-6" />,
  biology: <Leaf className="h-6 w-6" />,
  botany: <TreePine className="h-6 w-6" />,
  zoology: <Bug className="h-6 w-6" />,
  english: <BookText className="h-6 w-6" />,
};

function QuizzesIndex() {
  const schoolSubjects = SUBJECTS.filter((s) => s.level === "school");
  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title="AI Quizzes"
        description="Practice with fresh AI-generated quizzes across core subjects. Every attempt is unique."
      />

      <section className="mb-8">
        <SectionHeader title="Choose a subject" hint="5 quiz sets per subject · adaptive difficulty" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {schoolSubjects.map((s) => (
            <Link
              key={s.slug}
              to="/dashboard/student/quizzes/$subject"
              params={{ subject: s.slug }}
              className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${s.accent} p-5 shadow-card transition hover:border-primary/40 hover:shadow-elegant`}
            >
              <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-card/70 text-primary backdrop-blur">
                {ICONS[s.slug] ?? <Sparkles className="h-6 w-6" />}
              </div>
              <h3 className="text-lg font-semibold">{s.label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                5 quiz sets · AI-generated · adaptive
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Start practicing <Sparkles className="h-3.5 w-3.5" />
              </p>
            </Link>
          ))}
        </div>
      </section>
    </RoleGate>
  );
}
