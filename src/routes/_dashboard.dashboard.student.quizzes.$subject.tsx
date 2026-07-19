import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, PlayCircle, Trophy, Clock, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader, DashCard, EmptyState } from "@/components/dashboard/DashboardWidgets";
import { RoleGate } from "@/components/auth/RoleGate";
import {
  QUIZ_SETS,
  SUBJECTS,
  getSubjectQuizHistory,
  type SubjectHistoryItem,
} from "@/lib/ai/subject-quiz.functions";

export const Route = createFileRoute("/_dashboard/dashboard/student/quizzes/$subject")({
  beforeLoad: ({ params }) => {
    if (!SUBJECTS.some((s) => s.slug === params.subject)) throw notFound();
  },
  component: SubjectQuizzes,
});

function SubjectQuizzes() {
  const { subject } = Route.useParams();
  const label = SUBJECTS.find((s) => s.slug === subject)?.label ?? subject;
  const fetchHistory = useServerFn(getSubjectQuizHistory);

  const { data: history } = useQuery<SubjectHistoryItem[]>({
    queryKey: ["subject-quiz-history", subject],
    queryFn: () => fetchHistory({ data: { subject } }),
    staleTime: 15_000,
  });

  const bestBySet = new Map<number, SubjectHistoryItem>();
  const countBySet = new Map<number, number>();
  for (const h of history ?? []) {
    countBySet.set(h.quiz_set, (countBySet.get(h.quiz_set) ?? 0) + 1);
    const cur = bestBySet.get(h.quiz_set);
    if (!cur || h.pct > cur.pct) bestBySet.set(h.quiz_set, h);
  }

  return (
    <RoleGate allow={["student"]}>
      <div className="mb-4">
        <Link
          to="/dashboard/student/quizzes"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> All subjects
        </Link>
      </div>
      <DashboardHeader
        title={`${label} Quizzes`}
        description="Pick a quiz set. Every attempt generates fresh AI questions — you never see the same quiz twice."
      />

      <section className="mb-10">
        <SectionHeader title="Quiz sets" hint="Adaptive · Classes 6–12" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUIZ_SETS.map((n) => {
            const best = bestBySet.get(n);
            const attempts = countBySet.get(n) ?? 0;
            return (
              <DashCard key={n} className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {label}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">Quiz Set {n}</h3>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-muted/50 p-2">
                    <p className="text-muted-foreground">Attempts</p>
                    <p className="mt-0.5 text-sm font-semibold">{attempts}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2">
                    <p className="text-muted-foreground">Best</p>
                    <p className="mt-0.5 text-sm font-semibold">
                      {best ? `${best.pct}%` : "—"}
                    </p>
                  </div>
                </div>
                <Link
                  to="/dashboard/student/quizzes/$subject/$setId"
                  params={{ subject, setId: String(n) }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-primary/90"
                >
                  <PlayCircle className="h-4 w-4" /> Start quiz
                </Link>
              </DashCard>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeader title="Recent attempts" />
        {history && history.length > 0 ? (
          <div className="space-y-3">
            {history.slice(0, 10).map((h) => (
              <DashCard key={h.id} className="flex flex-wrap items-center gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">
                    Quiz Set {h.quiz_set} · {h.score}/{h.total} ({h.pct}%)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(h.submitted_at ?? h.created_at).toLocaleString()} · {h.difficulty}
                    {h.weaknesses.length > 0 && ` · Focus: ${h.weaknesses.slice(0, 2).join(", ")}`}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {Math.round(h.time_spent_seconds / 60)}m
                </div>
              </DashCard>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No attempts yet"
            description="Start any quiz set above to see your history and AI feedback here."
          />
        )}
      </section>
    </RoleGate>
  );
}
