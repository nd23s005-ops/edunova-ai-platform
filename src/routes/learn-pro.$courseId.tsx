import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import {
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  Code2,
  FileText,
  Flame,
  GraduationCap,
  Library,
  Lightbulb,
  Loader2,
  NotebookPen,
  Send,
  Sparkles,
  Target,
  Trophy,
  Video,
  FileCode2,
  Link2,
  Presentation,
  Award,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  generateCourseOutline,
  generateUnitContent,
  generateWeeklyAssessment,
  generateFinalExam,
  listCourseResources,
  saveCourseProgress,
  type CourseOutline,
  type UnitContent,
  type WeeklyAssessment,
  type FinalExam,
  type AttachedResource,
} from "@/lib/ai/learning-path.functions";
import {
  generateWorkspaceContent,
  type WorkspacePayload,
} from "@/lib/ai/workspace.functions";

export const Route = createFileRoute("/learn/$courseId")({
  head: () => ({
    meta: [
      { title: "AI Learning Workspace — EduNova AI" },
      { name: "description", content: "Premium AI-powered learning workspace with a 10-week, 7-unit curriculum." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LearnWorkspacePage,
});

type ViewSel =
  | { kind: "unit"; week: number; unit: number }
  | { kind: "assessment"; week: number }
  | { kind: "final" }
  | { kind: "resources" };

type UnitTab = "lesson" | "explanation" | "theory" | "practical" | "realworld" | "notes" | "summary" | "keypoints" | "interview" | "mistakes" | "revision" | "practice" | "resources" | "assistant";

const UNIT_TABS: { id: UnitTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "lesson", label: "AI Lesson", icon: BookOpen },
  { id: "explanation", label: "Explanation", icon: Lightbulb },
  { id: "theory", label: "Theory", icon: FileText },
  { id: "practical", label: "Practical", icon: Target },
  { id: "realworld", label: "Real-world", icon: Sparkles },
  { id: "notes", label: "AI Notes", icon: NotebookPen },
  { id: "summary", label: "Summary", icon: FileText },
  { id: "keypoints", label: "Key Points", icon: CheckCircle2 },
  { id: "interview", label: "Interview Q&A", icon: GraduationCap },
  { id: "mistakes", label: "Common Mistakes", icon: Flame },
  { id: "revision", label: "Revision", icon: NotebookPen },
  { id: "practice", label: "Practice", icon: Target },
  { id: "resources", label: "Resources", icon: Library },
  { id: "assistant", label: "AI Assistant", icon: Bot },
];

function completionKey(courseId: string) {
  return `edunova.learn.done.${courseId}`;
}
function loadCompleted(courseId: string): Set<string> {
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(completionKey(courseId)) : null;
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}
function saveCompleted(courseId: string, set: Set<string>) {
  try {
    window.localStorage.setItem(completionKey(courseId), JSON.stringify([...set]));
  } catch {
    // ignore
  }
}

function LearnWorkspacePage() {
  const { courseId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted && !data.user) navigate({ to: "/login" });
    });
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const { data: course } = useQuery({
    queryKey: ["learn", "course", courseId],
    queryFn: async () => {
      const { data } = await supabase
        .from("courses")
        .select("id, title, subject, description, difficulty, estimated_hours")
        .eq("id", courseId)
        .maybeSingle();
      return data;
    },
  });

  const outlineFn = useServerFn(generateCourseOutline);
  const { data: outline, isLoading: outlineLoading } = useQuery<CourseOutline>({
    queryKey: ["learn", "outline", courseId],
    queryFn: () => outlineFn({ data: { courseId } }),
    staleTime: Infinity,
    retry: 1,
  });

  const resourcesFn = useServerFn(listCourseResources);
  const { data: resources } = useQuery<AttachedResource[]>({
    queryKey: ["learn", "resources", courseId],
    queryFn: () => resourcesFn({ data: { courseId } }),
    staleTime: 5 * 60_000,
  });

  const [view, setView] = useState<ViewSel>({ kind: "unit", week: 1, unit: 1 });
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1]));
  const [completed, setCompleted] = useState<Set<string>>(() => loadCompleted(courseId));
  const [unitTab, setUnitTab] = useState<UnitTab>("lesson");

  useEffect(() => saveCompleted(courseId, completed), [courseId, completed]);

  const progressFn = useServerFn(saveCourseProgress);
  const doneUnits = useMemo(
    () => [...completed].filter((k) => k.startsWith("u:")).length,
    [completed],
  );
  const percent = Math.round((doneUnits / 70) * 100);
  useEffect(() => {
    // Best-effort sync to enrollment
    progressFn({ data: { courseId, completedUnits: doneUnits } }).catch(() => {});
  }, [doneUnits, courseId, progressFn]);

  const toggleWeek = (w: number) => {
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(w)) next.delete(w);
      else next.add(w);
      return next;
    });
  };

  const markComplete = (key: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  const currentWeek = view.kind === "unit" || view.kind === "assessment" ? view.week : view.kind === "final" ? 10 : 1;

  return (
    <div className="fixed inset-0 flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex flex-wrap items-center gap-4 border-b border-border/60 bg-card/60 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2 min-w-0">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">AI Learning Workspace</p>
            <h1 className="truncate text-sm font-semibold sm:text-base">{course?.title ?? "Loading course…"}</h1>
          </div>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" />{course?.subject ?? "—"}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />10 weeks · 70 units</span>
          <span className="inline-flex items-center gap-1.5"><Flame className="h-3.5 w-3.5 text-orange-500" />Week {currentWeek}</span>
          <span className="inline-flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5 text-primary" /><span className="font-semibold text-foreground">{percent}%</span></span>
          <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary transition-all" style={{ width: `${percent}%` }} />
          </div>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">{doneUnits}/70 XP units</span>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Left panel — Course Outline */}
        <aside className="hidden w-80 shrink-0 flex-col border-r border-border/60 bg-card/40 md:flex">
          <div className="border-b border-border/60 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Course Outline</p>
            <p className="mt-1 text-xs">Beginner → Advanced · 10 weeks × 7 units</p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
            {outlineLoading && (
              <div className="flex items-center gap-2 px-3 py-4 text-xs text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Nova is designing your 10-week curriculum…
              </div>
            )}
            {outline?.weeks.map((w) => {
              const open = expandedWeeks.has(w.index);
              const weekDone = w.units.every((u) => completed.has(`u:${w.index}:${u.index}`));
              return (
                <div key={w.index} className="mb-1">
                  <button
                    onClick={() => toggleWeek(w.index)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                      "hover:bg-muted",
                      weekDone && "text-emerald-600 dark:text-emerald-400",
                    )}
                  >
                    {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    <span className="font-semibold">Week {w.index}</span>
                    <span className="truncate text-xs text-muted-foreground">{w.title}</span>
                    {weekDone && <CheckCircle2 className="ml-auto h-4 w-4" />}
                  </button>
                  {open && (
                    <div className="ml-4 mt-1 space-y-0.5 border-l border-border/60 pl-2">
                      {w.units.map((u) => {
                        const key = `u:${w.index}:${u.index}`;
                        const active = view.kind === "unit" && view.week === w.index && view.unit === u.index;
                        const done = completed.has(key);
                        return (
                          <button
                            key={u.index}
                            onClick={() => { setView({ kind: "unit", week: w.index, unit: u.index }); setUnitTab("lesson"); }}
                            className={cn(
                              "flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left text-xs",
                              active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                          >
                            {done ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-500" /> : <Circle className="mt-0.5 h-3.5 w-3.5" />}
                            <span className="min-w-0">
                              <span className="block font-medium">Unit {u.index}</span>
                              <span className="block truncate text-[11px] opacity-80">{u.title}</span>
                            </span>
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setView({ kind: "assessment", week: w.index })}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs font-semibold",
                          view.kind === "assessment" && view.week === w.index
                            ? "bg-primary/10 text-primary"
                            : "text-amber-600 hover:bg-muted dark:text-amber-400",
                        )}
                      >
                        <Award className="h-3.5 w-3.5" />
                        Weekly Assessment
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {outline && (
              <>
                <div className="my-2 border-t border-border/60" />
                <button
                  onClick={() => setView({ kind: "final" })}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold",
                    view.kind === "final" ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary/10",
                  )}
                >
                  <Trophy className="h-4 w-4" /> Final Examination
                </button>
                <button
                  onClick={() => setView({ kind: "resources" })}
                  className={cn(
                    "mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
                    view.kind === "resources" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Library className="h-4 w-4" /> Course Library
                </button>
              </>
            )}
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
            {view.kind === "unit" && outline && (
              <UnitView
                key={`u-${view.week}-${view.unit}`}
                courseId={courseId}
                outline={outline}
                week={view.week}
                unit={view.unit}
                unitTab={unitTab}
                setUnitTab={setUnitTab}
                completed={completed}
                onComplete={() => markComplete(`u:${view.week}:${view.unit}`)}
                resources={resources ?? []}
                onNext={() => {
                  if (view.unit < 7) setView({ kind: "unit", week: view.week, unit: view.unit + 1 });
                  else setView({ kind: "assessment", week: view.week });
                }}
              />
            )}
            {view.kind === "assessment" && outline && (
              <AssessmentView
                key={`a-${view.week}`}
                courseId={courseId}
                outline={outline}
                week={view.week}
                onComplete={() => markComplete(`w:${view.week}`)}
                completed={completed.has(`w:${view.week}`)}
                onNext={() => {
                  if (view.week < 10) { setView({ kind: "unit", week: view.week + 1, unit: 1 }); setExpandedWeeks((p) => new Set(p).add(view.week + 1)); }
                  else setView({ kind: "final" });
                }}
              />
            )}
            {view.kind === "final" && (
              <FinalView courseId={courseId} onComplete={() => markComplete("final")} completed={completed.has("final")} />
            )}
            {view.kind === "resources" && (
              <ResourcesView resources={resources ?? []} />
            )}
          </div>
        </main>
      </div>
      {/* Preload query client into scope to satisfy linters if unused */}
      <span className="hidden">{queryClient ? "" : ""}</span>
    </div>
  );
}

// ============================================================================
// Unit view
// ============================================================================

function UnitView({
  courseId, outline, week, unit, unitTab, setUnitTab, onComplete, onNext, completed, resources,
}: {
  courseId: string;
  outline: CourseOutline;
  week: number;
  unit: number;
  unitTab: UnitTab;
  setUnitTab: (t: UnitTab) => void;
  onComplete: () => void;
  onNext: () => void;
  completed: Set<string>;
  resources: AttachedResource[];
}) {
  const weekMeta = outline.weeks[week - 1];
  const unitMeta = weekMeta.units[unit - 1];
  const isTechnical = outline.isTechnical;
  const key = `u:${week}:${unit}`;
  const done = completed.has(key);

  const gen = useServerFn(generateUnitContent);
  const { data: content, isLoading, error, refetch, isFetching } = useQuery<UnitContent>({
    queryKey: ["learn", "unit", courseId, week, unit],
    queryFn: () =>
      gen({ data: { courseId, week, unit, unitTitle: unitMeta.title, weekTitle: weekMeta.title } }),
    staleTime: Infinity,
    retry: 1,
  });

  const tabs = UNIT_TABS.filter((t) => (t.id === "assistant" ? true : true));

  return (
    <article className="space-y-5">
      <header className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-card">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
            Week {week} · Unit {unit}
          </span>
          <span className="text-xs text-muted-foreground">{weekMeta.title}</span>
          {isTechnical && (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              <Code2 className="mr-1 inline h-3 w-3" />Technical
            </span>
          )}
        </div>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">{content?.title ?? unitMeta.title}</h2>
        {unitMeta.summary && <p className="mt-1 text-sm text-muted-foreground">{unitMeta.summary}</p>}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button size="sm" variant={done ? "secondary" : "default"} onClick={onComplete} disabled={done}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {done ? "Completed" : "Mark as complete"}
          </Button>
          <Button size="sm" variant="outline" onClick={onNext}>
            Next {unit < 7 ? `Unit →` : `→ Weekly Assessment`}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Regenerate
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="-mx-2 flex gap-1.5 overflow-x-auto px-2 pb-1">
        {tabs.filter((t) => t.id !== "assistant" || isTechnical || t.id === "assistant").map((t) => {
          const active = unitTab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setUnitTab(t.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition",
                active ? "border-primary bg-primary text-primary-foreground" : "border-border/60 bg-card hover:border-primary/50",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {isLoading && !content ? (
        <LoadingCard label={`Nova is preparing Week ${week}, Unit ${unit}…`} />
      ) : error && !content ? (
        <ErrorCard message={(error as Error).message} onRetry={() => refetch()} />
      ) : content ? (
        <UnitTabContent content={content} tab={unitTab} isTechnical={isTechnical} resources={resources} courseId={courseId} />
      ) : null}
    </article>
  );
}

function UnitTabContent({ content, tab, isTechnical, resources, courseId }: {
  content: UnitContent;
  tab: UnitTab;
  isTechnical: boolean;
  resources: AttachedResource[];
  courseId: string;
}) {
  switch (tab) {
    case "lesson":
      return <ProseCard title="AI Lesson" body={content.lesson} />;
    case "explanation":
      return <ProseCard title="AI Explanation" body={content.explanation} />;
    case "theory":
      return <ProseCard title="Theory" body={content.theory} />;
    case "practical":
      return <ListCards title="Practical Examples" items={content.practicalExamples} />;
    case "realworld":
      return <ListCards title="Real-world Examples" items={content.realWorldExamples} />;
    case "notes":
      return <BulletCard title="AI Notes" items={content.notes} />;
    case "summary":
      return <ProseCard title="Summary" body={content.summary} />;
    case "keypoints":
      return <BulletCard title="Key Points" items={content.keyPoints} highlight />;
    case "interview":
      return (
        <div className="space-y-3">
          {content.interviewQuestions.map((q, i) => (
            <details key={i} className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
              <summary className="cursor-pointer text-sm font-semibold">Q{i + 1}. {q.question}</summary>
              <div className="prose prose-sm mt-2 max-w-none dark:prose-invert">
                <ReactMarkdown>{q.answer}</ReactMarkdown>
              </div>
            </details>
          ))}
        </div>
      );
    case "mistakes":
      return <BulletCard title="Common Mistakes" items={content.commonMistakes} tone="destructive" />;
    case "revision":
      return <BulletCard title="Revision Notes" items={content.revision} highlight />;
    case "practice":
      return <PracticeBlock practice={content.practice} isTechnical={isTechnical} />;
    case "resources":
      return <ResourcesView resources={resources} />;
    case "assistant":
      return <UnitAssistant courseId={courseId} isTechnical={isTechnical} />;
  }
}

function ProseCard({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <ReactMarkdown>{body || "_Content unavailable._"}</ReactMarkdown>
      </div>
    </section>
  );
}

function ListCards({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold">{title}</h3>
      {items.length === 0 && <p className="text-sm text-muted-foreground">None provided.</p>}
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-primary">Example {i + 1}</p>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown>{it}</ReactMarkdown>
          </div>
        </div>
      ))}
    </section>
  );
}

function BulletCard({ title, items, highlight, tone }: { title: string; items: string[]; highlight?: boolean; tone?: "destructive" }) {
  return (
    <section
      className={cn(
        "rounded-2xl border p-6 shadow-card",
        tone === "destructive" ? "border-destructive/30 bg-destructive/5" : highlight ? "border-primary/30 bg-primary/5" : "border-border/60 bg-card",
      )}
    >
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <ul className="list-disc space-y-1.5 pl-5 text-sm">
        {items.map((it, i) => <li key={i}>{it}</li>)}
        {items.length === 0 && <li className="list-none text-muted-foreground">None provided.</li>}
      </ul>
    </section>
  );
}

function PracticeBlock({ practice, isTechnical }: { practice: UnitContent["practice"]; isTechnical: boolean }) {
  return (
    <div className="space-y-4">
      {practice.mcq.length > 0 && (
        <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <h3 className="mb-3 text-lg font-semibold">Multiple Choice</h3>
          <div className="space-y-4">
            {practice.mcq.map((q, i) => <MCQ key={i} q={q} idx={i} />)}
          </div>
        </section>
      )}
      {practice.fillBlanks.length > 0 && (
        <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <h3 className="mb-3 text-lg font-semibold">Fill in the Blanks</h3>
          <ol className="space-y-3 text-sm">
            {practice.fillBlanks.map((f, i) => (
              <li key={i}>
                <p className="font-medium">{i + 1}. {f.prompt}</p>
                <details className="mt-1 text-xs text-muted-foreground">
                  <summary className="cursor-pointer">Reveal answer</summary>
                  <p className="mt-1 rounded bg-emerald-500/10 p-2 text-emerald-700 dark:text-emerald-300">{f.answer}</p>
                </details>
              </li>
            ))}
          </ol>
        </section>
      )}
      {practice.shortAnswers.length > 0 && (
        <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <h3 className="mb-3 text-lg font-semibold">Short Answers</h3>
          <div className="space-y-3">
            {practice.shortAnswers.map((s, i) => (
              <details key={i} className="rounded-xl border border-border/60 bg-background/60 p-3">
                <summary className="cursor-pointer text-sm font-medium">Q{i + 1}. {s.question}</summary>
                <div className="prose prose-sm mt-2 max-w-none dark:prose-invert"><ReactMarkdown>{s.sampleAnswer}</ReactMarkdown></div>
              </details>
            ))}
          </div>
        </section>
      )}
      {practice.scenarios.length > 0 && (
        <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <h3 className="mb-3 text-lg font-semibold">Scenario Questions</h3>
          <div className="space-y-3">
            {practice.scenarios.map((s, i) => (
              <div key={i} className="rounded-xl border border-border/60 p-3">
                <p className="text-sm font-semibold">{s.title}</p>
                <div className="prose prose-sm mt-1 max-w-none dark:prose-invert"><ReactMarkdown>{s.description}</ReactMarkdown></div>
                {s.hint && <p className="mt-2 text-xs text-muted-foreground"><span className="font-semibold text-foreground">Hint:</span> {s.hint}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
      {isTechnical && practice.coding && practice.coding.length > 0 && (
        <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <h3 className="mb-3 text-lg font-semibold">Coding Problems</h3>
          <div className="space-y-3">
            {practice.coding.map((c, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-border/60">
                <div className="border-b border-border/60 bg-muted/40 px-3 py-2 text-sm font-semibold">{i + 1}. {c.title}</div>
                <div className="px-3 py-2 text-sm">
                  <div className="prose prose-sm max-w-none dark:prose-invert"><ReactMarkdown>{c.brief}</ReactMarkdown></div>
                  {c.starter && (
                    <pre className="mt-2 max-h-72 overflow-auto rounded-lg bg-zinc-950 p-3 text-xs text-zinc-100">
                      <code>{c.starter}</code>
                    </pre>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function MCQ({ q, idx }: { q: UnitContent["practice"]["mcq"][number]; idx: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="rounded-xl border border-border/60 bg-background/60 p-3">
      <p className="text-sm font-semibold">Q{idx + 1}. {q.question}</p>
      <div className="mt-2 grid gap-2">
        {q.options.map((opt, i) => {
          const right = i === q.answerIndex;
          const isPicked = picked === i;
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => setPicked(i)}
              className={cn(
                "rounded-lg border px-3 py-2 text-left text-sm transition",
                picked === null && "border-border/60 hover:border-primary/50",
                picked !== null && right && "border-emerald-500/60 bg-emerald-500/10",
                picked !== null && !right && isPicked && "border-destructive/60 bg-destructive/10",
                picked !== null && !right && !isPicked && "border-border/40 opacity-70",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Why:</span> {q.explanation}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// Weekly Assessment
// ============================================================================

function AssessmentView({ courseId, outline, week, onComplete, completed, onNext }: {
  courseId: string;
  outline: CourseOutline;
  week: number;
  onComplete: () => void;
  completed: boolean;
  onNext: () => void;
}) {
  const weekMeta = outline.weeks[week - 1];
  const gen = useServerFn(generateWeeklyAssessment);
  const { data, isLoading, error, refetch, isFetching } = useQuery<WeeklyAssessment>({
    queryKey: ["learn", "assessment", courseId, week],
    queryFn: () => gen({ data: { courseId, week, weekTitle: weekMeta.title } }),
    staleTime: Infinity,
    retry: 1,
  });

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = useMemo(() => {
    if (!data) return 0;
    let s = 0;
    data.mcq.forEach((q, i) => { if (answers[i] === q.answerIndex) s++; });
    return s;
  }, [data, answers]);
  const submitted = Object.keys(answers).length === (data?.mcq.length ?? 0) && (data?.mcq.length ?? 0) > 0;

  return (
    <article className="space-y-5">
      <header className="rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-card to-card p-5 shadow-card">
        <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
          Week {week} · Assessment
        </span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">{data?.title ?? `Week ${week} Assessment`}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Weekly Quiz · Quick Test · Practice Test · Mini Assignment · Revision · AI Feedback</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button size="sm" variant={completed ? "secondary" : "default"} onClick={onComplete} disabled={completed}>
            <CheckCircle2 className="mr-2 h-4 w-4" />{completed ? "Marked complete" : "Mark week complete"}
          </Button>
          <Button size="sm" variant="outline" onClick={onNext}>{week < 10 ? `Next week →` : `→ Final Exam`}</Button>
          <Button size="sm" variant="ghost" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Regenerate
          </Button>
        </div>
      </header>

      {isLoading && !data ? <LoadingCard label="Preparing your weekly assessment…" /> :
       error && !data ? <ErrorCard message={(error as Error).message} onRetry={() => refetch()} /> :
       data ? (
        <>
          <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <h3 className="mb-3 text-lg font-semibold">Weekly Quiz ({data.mcq.length} MCQs)</h3>
            <div className="space-y-4">
              {data.mcq.map((q, i) => (
                <div key={i} className="rounded-xl border border-border/60 p-3">
                  <p className="text-sm font-semibold">Q{i + 1}. {q.question}</p>
                  <div className="mt-2 grid gap-2">
                    {q.options.map((opt, j) => {
                      const picked = answers[i];
                      const right = j === q.answerIndex;
                      const isPicked = picked === j;
                      return (
                        <button
                          key={j}
                          disabled={picked !== undefined}
                          onClick={() => setAnswers((prev) => ({ ...prev, [i]: j }))}
                          className={cn(
                            "rounded-lg border px-3 py-2 text-left text-sm transition",
                            picked === undefined && "border-border/60 hover:border-primary/50",
                            picked !== undefined && right && "border-emerald-500/60 bg-emerald-500/10",
                            picked !== undefined && !right && isPicked && "border-destructive/60 bg-destructive/10",
                            picked !== undefined && !right && !isPicked && "border-border/40 opacity-70",
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {answers[i] !== undefined && (
                    <p className="mt-2 text-xs text-muted-foreground"><span className="font-semibold text-foreground">Why:</span> {q.explanation}</p>
                  )}
                </div>
              ))}
            </div>
            {submitted && (
              <div className="mt-4 rounded-xl border border-primary/40 bg-primary/5 p-4">
                <p className="text-sm font-semibold">Score: {score}/{data.mcq.length} · {Math.round((score / data.mcq.length) * 100)}%</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  AI Feedback: {score / data.mcq.length >= 0.8
                    ? "Excellent grasp — you're ready to advance."
                    : score / data.mcq.length >= 0.5
                      ? "Solid, but review the questions you missed before moving on."
                      : "Revisit this week's units before taking the assessment again."}
                </p>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <h3 className="mb-3 text-lg font-semibold">Short-Answer Practice Test</h3>
            <div className="space-y-3">
              {data.short.map((s, i) => (
                <details key={i} className="rounded-xl border border-border/60 p-3">
                  <summary className="cursor-pointer text-sm font-medium">Q{i + 1}. {s.question}</summary>
                  <div className="prose prose-sm mt-2 max-w-none dark:prose-invert"><ReactMarkdown>{s.sampleAnswer}</ReactMarkdown></div>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-primary/30 bg-primary/5 p-5 shadow-card">
            <h3 className="text-lg font-semibold">Mini Assignment · {data.miniAssignment.title}</h3>
            <div className="prose prose-sm mt-2 max-w-none dark:prose-invert"><ReactMarkdown>{data.miniAssignment.description}</ReactMarkdown></div>
            {data.miniAssignment.deliverables?.length > 0 && (
              <ul className="mt-2 list-disc pl-5 text-sm">
                {data.miniAssignment.deliverables.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <h3 className="mb-3 text-lg font-semibold">Weekly Revision</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              {data.revision.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </section>
        </>
       ) : null}
    </article>
  );
}

// ============================================================================
// Final exam
// ============================================================================

function FinalView({ courseId, onComplete, completed }: { courseId: string; onComplete: () => void; completed: boolean }) {
  const gen = useServerFn(generateFinalExam);
  const { data, isLoading, error, refetch, isFetching } = useQuery<FinalExam>({
    queryKey: ["learn", "final", courseId],
    queryFn: () => gen({ data: { courseId } }),
    staleTime: Infinity,
    retry: 1,
  });
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = useMemo(() => data ? data.mcq.reduce((s, q, i) => s + (answers[i] === q.answerIndex ? 1 : 0), 0) : 0, [data, answers]);
  const submitted = data ? Object.keys(answers).length === data.mcq.length : false;
  const pct = data && data.mcq.length ? Math.round((score / data.mcq.length) * 100) : 0;

  return (
    <article className="space-y-5">
      <header className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-6 shadow-card">
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
          Final Examination
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">{data?.title ?? "Comprehensive Assessment"}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Comprehensive Assessment · Project Submission · Course Completion Test</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" variant={completed ? "secondary" : "default"} onClick={onComplete} disabled={completed}>
            <Trophy className="mr-2 h-4 w-4" />{completed ? "Course marked complete" : "Mark course complete"}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Regenerate
          </Button>
        </div>
      </header>

      {isLoading && !data ? <LoadingCard label="Preparing your final exam…" /> :
       error && !data ? <ErrorCard message={(error as Error).message} onRetry={() => refetch()} /> :
       data ? (
        <>
          <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <h3 className="mb-3 text-lg font-semibold">Comprehensive MCQ ({data.mcq.length})</h3>
            <div className="space-y-4">
              {data.mcq.map((q, i) => (
                <div key={i} className="rounded-xl border border-border/60 p-3">
                  <p className="text-sm font-semibold">Q{i + 1}. {q.question}</p>
                  <div className="mt-2 grid gap-2">
                    {q.options.map((opt, j) => {
                      const picked = answers[i];
                      const right = j === q.answerIndex;
                      const isPicked = picked === j;
                      return (
                        <button
                          key={j}
                          disabled={picked !== undefined}
                          onClick={() => setAnswers((prev) => ({ ...prev, [i]: j }))}
                          className={cn(
                            "rounded-lg border px-3 py-2 text-left text-sm transition",
                            picked === undefined && "border-border/60 hover:border-primary/50",
                            picked !== undefined && right && "border-emerald-500/60 bg-emerald-500/10",
                            picked !== undefined && !right && isPicked && "border-destructive/60 bg-destructive/10",
                            picked !== undefined && !right && !isPicked && "border-border/40 opacity-70",
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {submitted && (
              <div className="mt-4 rounded-xl border border-primary/40 bg-primary/5 p-4">
                <p className="text-sm font-semibold">Final Score: {score}/{data.mcq.length} · {pct}%</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {pct >= 70 ? "🎉 Certificate Eligible — completion criteria met." : "Review weak areas and retake for certificate eligibility."}
                </p>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <h3 className="mb-3 text-lg font-semibold">Long-form Questions</h3>
            <div className="space-y-3">
              {data.longAnswers.map((q, i) => (
                <div key={i} className="rounded-xl border border-border/60 p-3">
                  <p className="text-sm font-semibold">Q{i + 1}. {q.question}</p>
                  {q.rubric?.length > 0 && (
                    <ul className="mt-2 list-disc pl-5 text-xs text-muted-foreground">
                      {q.rubric.map((r, k) => <li key={k}>{r}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-primary/40 bg-primary/5 p-5 shadow-card">
            <h3 className="text-lg font-semibold">Project Submission · {data.project.title}</h3>
            <div className="prose prose-sm mt-2 max-w-none dark:prose-invert"><ReactMarkdown>{data.project.brief}</ReactMarkdown></div>
            {data.project.deliverables?.length > 0 && (
              <>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Deliverables</p>
                <ul className="mt-1 list-disc pl-5 text-sm">
                  {data.project.deliverables.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </>
            )}
            {data.project.evaluation?.length > 0 && (
              <>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Evaluation criteria</p>
                <ul className="mt-1 list-disc pl-5 text-sm">
                  {data.project.evaluation.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </>
            )}
          </section>
        </>
       ) : null}
    </article>
  );
}

// ============================================================================
// Resources
// ============================================================================

function iconForKind(kind: string) {
  const k = kind.toLowerCase();
  if (k.includes("pdf")) return FileText;
  if (k.includes("ppt") || k.includes("slide")) return Presentation;
  if (k.includes("video")) return Video;
  if (k.includes("code") || k.includes("file")) return FileCode2;
  if (k.includes("link") || k.includes("url")) return Link2;
  return NotebookPen;
}

function ResourcesView({ resources }: { resources: AttachedResource[] }) {
  const groups: Record<string, AttachedResource[]> = {};
  for (const r of resources) {
    const k = (r.kind || "note").toLowerCase();
    (groups[k] ||= []).push(r);
  }
  const order = ["pdf", "ppt", "slide", "video", "note", "link", "url", "code", "file"];
  const kinds = Object.keys(groups).sort((a, b) => (order.indexOf(a) + 999) - (order.indexOf(b) + 999));

  return (
    <article className="space-y-5">
      <header className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <h2 className="text-2xl font-bold tracking-tight">Course Library</h2>
        <p className="mt-1 text-sm text-muted-foreground">PDFs · PPTs · Videos · Notes · Reference Links · Practice Files — pulled from the existing Resource Library, never regenerated.</p>
      </header>
      {resources.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border/60 bg-card p-8 text-center text-sm text-muted-foreground">
          No library resources attached to this course yet.
        </div>
      )}
      {kinds.map((k) => {
        const Icon = iconForKind(k);
        return (
          <section key={k} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold capitalize">
              <Icon className="h-4 w-4 text-primary" /> {k}s
            </h3>
            <ul className="divide-y divide-border/60">
              {groups[k].map((r) => (
                <li key={r.id} className="flex items-center gap-3 py-2 text-sm">
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{r.title}</p>
                    {r.description && <p className="truncate text-xs text-muted-foreground">{r.description}</p>}
                  </div>
                  {r.url && (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline">Open</a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </article>
  );
}

// ============================================================================
// AI Assistant (Code / Theory) — reuses existing workspace fn
// ============================================================================

function UnitAssistant({ courseId, isTechnical }: { courseId: string; isTechnical: boolean }) {
  const gen = useServerFn(generateWorkspaceContent);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"generate" | "explain" | "debug" | "optimize" | "review">("generate");
  const [payload, setPayload] = useState<WorkspacePayload | null>(null);
  const mutation = useMutation({
    mutationFn: (input: { section: "code" | "theory"; message?: string; mode: typeof mode | "explain" }) =>
      gen({ data: { courseId, section: input.section, message: input.message, mode: input.mode } }),
    onSuccess: (data) => setPayload(data),
  });

  const section = isTechnical ? "code" : "theory";

  return (
    <section className="space-y-3">
      <div className="rounded-2xl border border-primary/30 bg-card p-4 shadow-card">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
          <Bot className="h-3.5 w-3.5" />{isTechnical ? "AI Code Assistant · Live Coding · Debug · Review" : "AI Theory Assistant · Case Studies · Notes"}
        </div>
        {isTechnical && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {(["generate", "explain", "debug", "optimize", "review"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] capitalize",
                  mode === m ? "border-primary bg-primary text-primary-foreground" : "border-border/60 bg-background/60 hover:border-primary/50",
                )}
              >
                {m}
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                if (message.trim()) mutation.mutate({ section, message: message.trim(), mode: isTechnical ? mode : "explain" });
              }
            }}
            placeholder={isTechnical ? "Ask for code, paste a snippet to debug, or request an optimization…" : "Ask a concept question, request notes, or say 'summarize this unit'…"}
            className="resize-none"
          />
          <Button onClick={() => { if (message.trim()) mutation.mutate({ section, message: message.trim(), mode: isTechnical ? mode : "explain" }); }} disabled={mutation.isPending || !message.trim()} className="self-end">
            {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      {payload && (
        <div className="space-y-3">
          {payload.intro && <ProseCard title={payload.title || "Response"} body={payload.intro} />}
          {payload.blocks.map((b, i) => {
            if (b.type === "text") return <ProseCard key={i} title={b.heading || "Note"} body={b.body} />;
            if (b.type === "list") return <BulletCard key={i} title={b.heading || "Points"} items={b.items} />;
            if (b.type === "code") {
              return (
                <pre key={i} className="overflow-x-auto rounded-2xl bg-zinc-950 p-4 text-xs text-zinc-100 shadow-card">
                  <code>{b.code}</code>
                </pre>
              );
            }
            return null;
          })}
        </div>
      )}
    </section>
  );
}

// ============================================================================
// Utility cards
// ============================================================================

function LoadingCard({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/60 bg-card p-12 text-center shadow-card">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-muted-foreground">Tailoring to your role, progress and goals.</p>
    </div>
  );
}

function ErrorCard({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-6 text-sm">
      <p className="font-semibold text-destructive">Content unavailable</p>
      <p className="mt-1 text-muted-foreground">{message}</p>
      <Button size="sm" className="mt-3" onClick={onRetry}>Retry</Button>
    </div>
  );
}
