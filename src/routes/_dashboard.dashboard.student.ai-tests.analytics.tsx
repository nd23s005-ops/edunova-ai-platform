import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Trophy,
  Flame,
  Award,
  Zap,
  Sparkles,
  Target,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader, DashCard } from "@/components/dashboard/DashboardWidgets";
import { ProgressBar } from "@/components/courses/CourseUI";
import {
  getUniversalAnalytics,
  listUniversalHistory,
  KIND_LABEL,
} from "@/lib/ai/universal/universal.functions";

export const Route = createFileRoute("/_dashboard/dashboard/student/ai-tests/analytics")({
  component: Analytics,
});

function Analytics() {
  const analyticsFn = useServerFn(getUniversalAnalytics);
  const historyFn = useServerFn(listUniversalHistory);

  const analyticsQ = useQuery({
    queryKey: ["universal", "analytics", "full"],
    queryFn: () => analyticsFn(),
  });
  const historyQ = useQuery({
    queryKey: ["universal", "history", "full"],
    queryFn: () => historyFn({ data: { limit: 50 } }),
  });

  const a = analyticsQ.data;
  const maxDaily = Math.max(1, ...(a?.daily ?? []).map((d) => d.count));

  return (
    <>
      <Link
        to="/dashboard/student/ai-tests"
        className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
      >
        <ArrowLeft className="h-3 w-3" /> Back to AI Assessments
      </Link>
      <DashboardHeader
        title="Assessment analytics"
        description="Your performance across every AI assessment, subject, and topic."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={<Zap className="h-5 w-5" />} tint="primary" label="Total XP" value={a?.xpTotal ?? 0} />
        <StatTile icon={<Flame className="h-5 w-5" />} tint="emerald" label="Streak" value={`${a?.streakDays ?? 0} days`} />
        <StatTile icon={<Trophy className="h-5 w-5" />} tint="amber" label="Best score" value={`${a?.highestPercentage ?? 0}%`} />
        <StatTile icon={<TrendingUp className="h-5 w-5" />} tint="blue" label="Average" value={`${a?.averagePercentage ?? 0}%`} />
      </div>

      {a?.readiness && (
        <section className="mb-8">
          <SectionHeader title="AI readiness score" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ReadinessTile label="Skill level" value={a.readiness.skill_level} isText />
            <ReadinessTile label="Confidence" value={a.readiness.confidence} />
            <ReadinessTile label="Course completion" value={a.readiness.completion_readiness} />
            <ReadinessTile label="Certification" value={a.readiness.certification_readiness} />
            {a.readiness.interview_readiness !== null && (
              <ReadinessTile label="Interview readiness" value={a.readiness.interview_readiness} />
            )}
          </div>
        </section>
      )}

      <section className="mb-8">
        <SectionHeader title="Daily activity" hint="Last 30 days" />
        <DashCard>
          {a?.daily && a.daily.length > 0 ? (
            <div className="flex h-40 items-end gap-1">
              {a.daily.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-1" title={`${d.day} · ${d.count} attempts · avg ${d.avg}%`}>
                  <div
                    className="w-full rounded-t bg-primary/70"
                    style={{ height: `${Math.round((d.count / maxDaily) * 100)}%` }}
                  />
                  <div className="text-[9px] text-muted-foreground">{d.day.slice(5)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No activity yet.</div>
          )}
        </DashCard>
      </section>

      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        <section>
          <SectionHeader title="By assessment type" />
          <DashCard>
            {a?.byKind && a.byKind.length > 0 ? (
              <div className="space-y-3">
                {a.byKind.map((k) => (
                  <div key={k.kind}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>{KIND_LABEL[k.kind]}</span>
                      <span className="text-muted-foreground">
                        {k.count} · avg {k.avg}%
                      </span>
                    </div>
                    <ProgressBar value={k.avg} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No data yet.</div>
            )}
          </DashCard>
        </section>

        <section>
          <SectionHeader title="By subject" />
          <DashCard>
            {a?.bySubject && a.bySubject.length > 0 ? (
              <div className="space-y-3">
                {a.bySubject.map((s) => (
                  <div key={s.subject}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>{s.subject}</span>
                      <span className="text-muted-foreground">
                        {s.count} · avg {s.avg}%
                      </span>
                    </div>
                    <ProgressBar value={s.avg} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No subject data yet.</div>
            )}
          </DashCard>
        </section>
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        <section>
          <SectionHeader title="Weak topics" hint="Concepts to revise" />
          <DashCard>
            {a?.weakTopics && a.weakTopics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {a.weakTopics.map((t) => (
                  <span
                    key={t.topic}
                    className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs text-rose-400"
                  >
                    <Target className="h-3 w-3" />
                    {t.topic} · {t.count}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Nothing flagged — keep going.</div>
            )}
          </DashCard>
        </section>

        <section>
          <SectionHeader title="Strong topics" hint="Consistently correct" />
          <DashCard>
            {a?.strongTopics && a.strongTopics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {a.strongTopics.map((t) => (
                  <span
                    key={t.topic}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400"
                  >
                    <Sparkles className="h-3 w-3" />
                    {t.topic} · {t.count}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Complete a few assessments to see strengths.</div>
            )}
          </DashCard>
        </section>
      </div>

      {a?.achievements && a.achievements.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Achievements" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {a.achievements.map((ach) => (
              <DashCard key={ach.code}>
                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-xl ${
                      ach.tier === "gold"
                        ? "bg-amber-500/15 text-amber-500"
                        : ach.tier === "silver"
                          ? "bg-slate-500/15 text-slate-300"
                          : ach.tier === "platinum"
                            ? "bg-sky-500/15 text-sky-400"
                            : "bg-orange-500/15 text-orange-500"
                    }`}
                  >
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{ach.title}</div>
                    <div className="text-xs capitalize text-muted-foreground">
                      {ach.tier} · {new Date(ach.awarded_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </DashCard>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <SectionHeader title="Attempt history" />
        <DashCard>
          <div className="divide-y divide-border/60">
            {(historyQ.data ?? []).map((h) => (
              <Link
                key={h.id}
                to="/dashboard/student/ai-tests/attempts/$id"
                params={{ id: h.id }}
                className="flex items-center justify-between py-3 text-sm hover:text-primary"
              >
                <div>
                  <div className="font-medium">
                    {KIND_LABEL[h.kind]}
                    {h.subject ? ` · ${h.subject}` : ""}
                    {h.topic ? ` · ${h.topic}` : ""}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {h.submitted_at ? new Date(h.submitted_at).toLocaleString() : "In progress"} · {h.difficulty}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {h.percentage !== null ? `${h.percentage}%` : "—"}
                  </div>
                  <div className="text-xs text-muted-foreground">{h.letter_grade ?? h.status}</div>
                </div>
              </Link>
            ))}
            {(!historyQ.data || historyQ.data.length === 0) && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No attempts yet.
              </div>
            )}
          </div>
        </DashCard>
      </section>
    </>
  );
}

function StatTile({
  icon,
  label,
  value,
  tint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  tint: "primary" | "emerald" | "amber" | "blue";
}) {
  const cls =
    tint === "emerald"
      ? "bg-emerald-500/10 text-emerald-500"
      : tint === "amber"
        ? "bg-amber-500/10 text-amber-500"
        : tint === "blue"
          ? "bg-blue-500/10 text-blue-500"
          : "bg-primary/10 text-primary";
  return (
    <DashCard>
      <div className="flex items-center gap-3">
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${cls}`}>{icon}</div>
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
      </div>
    </DashCard>
  );
}

function ReadinessTile({
  label,
  value,
  isText,
}: {
  label: string;
  value: string | number;
  isText?: boolean;
}) {
  return (
    <DashCard>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      {isText ? (
        <div className="mt-1 text-2xl font-semibold capitalize">{value}</div>
      ) : (
        <>
          <div className="mt-1 text-2xl font-semibold">{value}%</div>
          <ProgressBar value={Number(value)} className="mt-2" />
        </>
      )}
    </DashCard>
  );
}
