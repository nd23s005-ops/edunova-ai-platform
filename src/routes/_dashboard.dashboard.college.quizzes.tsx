import { createFileRoute, Link } from "@tanstack/react-router";
import { Code2, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader } from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import { COLLEGE_SUBJECTS } from "@/lib/ai/subject-quiz.functions";

export const Route = createFileRoute("/_dashboard/dashboard/college/quizzes")({
  head: () => ({
    meta: [
      { title: "AI Quizzes — Developer Workspace" },
      {
        name: "description",
        content:
          "Fresh AI-generated quizzes on programming, DSA, databases, systems, AI/ML and more — tuned for college and engineering students.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CollegeQuizzesIndex,
});

function CollegeQuizzesIndex() {
  return (
    <RoleGate allow={["college_student"]}>
      <DashboardHeader
        title="AI Quizzes"
        description="Practice technical subjects with fresh AI-generated questions. Programming, DSA, systems, databases, AI/ML and more."
      />

      <section className="mb-8">
        <SectionHeader title="Choose a subject" hint="5 quiz sets per subject · adaptive difficulty · fresh every attempt" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {COLLEGE_SUBJECTS.map((s) => (
            <Link
              key={s.slug}
              to="/dashboard/student/quizzes/$subject"
              params={{ subject: s.slug }}
              className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${s.accent} p-5 shadow-card transition hover:border-primary/40 hover:shadow-elegant`}
            >
              <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-card/70 text-primary backdrop-blur">
                <Code2 className="h-6 w-6" />
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
