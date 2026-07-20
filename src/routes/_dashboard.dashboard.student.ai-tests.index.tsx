import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Sparkles,
  CalendarDays,
  ClipboardList,
  BookOpen,
  BookMarked,
  Timer,
  Target,
  GraduationCap,
  Compass,
  Flame,
  Trophy,
  BarChart3,
  ArrowRight,
  Award,
  Zap,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader, DashCard } from "@/components/dashboard/DashboardWidgets";
import {
  getUniversalAnalytics,
  listUniversalHistory,
  type AssessmentKind,
} from "@/lib/ai/universal/universal.functions";
import { KIND_LABEL } from "@/lib/ai/universal/universal.functions";

export const Route = createFileRoute("/_dashboard/dashboard/student/ai-tests/")({
  component: AiTestsHub,
});

const KINDS: {
  kind: AssessmentKind;
  desc: string;
  accent: string;
  icon: React.ReactNode;
}[] = [
  { kind: "daily", desc: "Quick 5-question warm-up. Fresh every day.", accent: "from-amber-500/20 to-orange-500/10", icon: <CalendarDays className="h-5 w-5" /> },
  { kind: "weekly", desc: "10-question review across recent topics.", accent: "from-blue-500/20 to-cyan-500/10", icon: <ClipboardList className="h-5 w-5" /> },
  { kind: "monthly", desc: "20 questions across the last four weeks.", accent: "from-indigo-500/20 to-violet-500/10", icon: <BarChart3 className="h-5 w-5" /> },
  { kind: "module", desc: "Test a specific module you've completed.", accent: "from-emerald-500/20 to-teal-500/10", icon: <BookMarked className="h-5 w-5" /> },
  { kind: "chapter", desc: "Focused chapter-level check.", accent: "from-lime-500/20 to-green-500/10", icon: <BookOpen className="h-5 w-5" /> },
  { kind: "mock", desc: "Exam-style, timed, mixed difficulty.", accent: "from-rose-500/20 to-pink-500/10", icon: <Timer className="h-5 w-5" /> },
  { kind: "practice", desc: "Untimed practice. Repeat as much as you like.", accent: "from-sky-500/20 to-blue-500/10", icon: <Target className="h-5 w-5" /> },
  { kind: "final", desc: "Comprehensive final course assessment.", accent: "from-fuchsia-500/20 to-purple-500/10", icon: <GraduationCap className="h-5 w-5" /> },
  { kind: "skill_eval", desc: "Evaluate a specific skill or role fit.", accent: "from-yellow-500/20 to-amber-500/10", icon: <Compass className="h-5 w-5" /> },
];

function AiTestsHub() {
  const analyticsFn = useServerFn(getUniversalAnalytics);
  const historyFn = useServerFn(listUniversalHistory);

  const analyticsQ = useQuery({
    queryKey: ["universal", "analytics", "hub"],
    queryFn: () => analyticsFn(),
  });
  const historyQ = useQuery({
    queryKey: ["universal", "history", "hub"],
    queryFn: () => historyFn({ data: { limit: 6 } }),
  });

  const a = analyticsQ.data;

  return (
    <>
      <DashboardHeader
        title="AI Assessments"
        description="Adaptive, always-fresh assessments powered by AI. Practice or push your limits — every attempt is new."
        actions={
          <Link
            to="/dashboard/student/ai-tests/analytics"
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 text-sm font-medium hover:border-primary/40"
          >
            <BarChart3 className="h-4 w-4" /> Analytics
          </Link>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashCard>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">XP earned</div>
              <div className="text-2xl font-semibold">{a?.xpTotal ?? 0}</div>
            </div>
          </div>
        </DashCard>
        <DashCard>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Current streak</div>
              <div className="text-2xl font-semibold">{a?.streakDays ?? 0} days</div>
            </div>
          </div>
        </DashCard>
        <DashCard>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-500/10 text-amber-500">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Highest score</div>
              <div className="text-2xl font-semibold">{a?.highestPercentage ?? 0}%</div>
            </div>
          </div>
        </DashCard>
        <DashCard>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-500">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Readiness</div>
              <div className="text-2xl font-semibold capitalize">
                {a?.readiness?.skill_level ?? "beginner"}
              </div>
            </div>
          </div>
        </DashCard>
      </div>

      <section className="mb-10">
        <SectionHeader title="Choose an assessment type" hint="Every attempt is AI-generated and unique" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KINDS.map((k) => (
            <Link
              key={k.kind}
              to="/dashboard/student/ai-tests/new"
              search={{ kind: k.kind }}
              className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${k.accent} p-5 shadow-card transition hover:border-primary/40 hover:shadow-elegant`}
            >
              <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-card/70 text-primary backdrop-blur">
                {k.icon}
              </div>
              <div className="mb-1 text-lg font-semibold">{KIND_LABEL[k.kind]}</div>
              <p className="text-sm text-muted-foreground">{k.desc}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Start <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <SectionHeader title="Recent attempts" />
        {historyQ.data && historyQ.data.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {historyQ.data.map((h) => (
              <Link
                key={h.id}
                to="/dashboard/student/ai-tests/attempts/$id"
                params={{ id: h.id }}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-4 hover:border-primary/40"
              >
                <div>
                  <div className="text-sm font-medium">
                    {KIND_LABEL[h.kind]}
                    {h.subject ? ` · ${h.subject}` : ""}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {h.submitted_at ? new Date(h.submitted_at).toLocaleString() : "In progress"} · {h.difficulty}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">
                    {h.percentage !== null ? `${h.percentage}%` : "—"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {h.letter_grade ?? h.status}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <DashCard className="text-sm text-muted-foreground">
            No attempts yet — pick a type above to get started.
          </DashCard>
        )}
      </section>

      {a?.achievements && a.achievements.length > 0 && (
        <section className="mb-10">
          <SectionHeader title="Achievements" />
          <div className="flex flex-wrap gap-3">
            {a.achievements.slice(0, 12).map((ach) => (
              <div
                key={ach.code}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium"
              >
                <Sparkles className={`h-3.5 w-3.5 ${ach.tier === "gold" ? "text-amber-500" : ach.tier === "silver" ? "text-slate-400" : ach.tier === "platinum" ? "text-sky-400" : "text-orange-500"}`} />
                {ach.title}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
