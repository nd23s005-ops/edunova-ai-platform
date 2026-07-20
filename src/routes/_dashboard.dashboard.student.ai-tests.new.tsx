import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { Loader2, Sparkles, ArrowLeft, Play } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { DashCard } from "@/components/dashboard/DashboardWidgets";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  startUniversalAssessment,
  KIND_LABEL,
  type AssessmentKind,
  type Difficulty,
} from "@/lib/ai/universal/universal.functions";

const KIND_ORDER: AssessmentKind[] = [
  "daily",
  "weekly",
  "monthly",
  "module",
  "chapter",
  "mock",
  "practice",
  "final",
  "skill_eval",
  "custom",
];

const search = z.object({
  kind: z.enum(KIND_ORDER as [AssessmentKind, ...AssessmentKind[]]).optional(),
  subject: z.string().optional(),
  courseId: z.string().uuid().optional(),
  chapterId: z.string().uuid().optional(),
  lessonId: z.string().uuid().optional(),
});

export const Route = createFileRoute("/_dashboard/dashboard/student/ai-tests/new")({
  validateSearch: (raw): z.infer<typeof search> => search.parse(raw ?? {}),
  component: NewAssessment,
});

const DIFFICULTIES: Difficulty[] = ["beginner", "basic", "intermediate", "advanced", "expert"];

function NewAssessment() {
  const params = Route.useSearch();
  const navigate = useNavigate();
  const startFn = useServerFn(startUniversalAssessment);

  const [kind, setKind] = useState<AssessmentKind>(params.kind ?? "practice");
  const [subject, setSubject] = useState<string>(params.subject ?? "");
  const [topic, setTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState<Difficulty | "">("");
  const [count, setCount] = useState<number | "">("");

  const startMut = useMutation({
    mutationFn: () =>
      startFn({
        data: {
          kind,
          subject: subject || null,
          topic: topic || null,
          difficulty: difficulty || null,
          count: typeof count === "number" ? count : null,
          courseId: params.courseId ?? null,
          chapterId: params.chapterId ?? null,
          lessonId: params.lessonId ?? null,
        },
      }),
    onSuccess: (attempt) => {
      navigate({ to: "/dashboard/student/ai-tests/attempts/$id", params: { id: attempt.id } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <>
      <button
        onClick={() => navigate({ to: "/dashboard/student/ai-tests" })}
        className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
      >
        <ArrowLeft className="h-3 w-3" /> Back to AI Assessments
      </button>
      <DashboardHeader
        title="Start a new assessment"
        description="Fresh AI-generated questions, tailored to your level. Leave a field blank to let the engine choose."
      />

      <DashCard className="max-w-3xl space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Assessment type</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {KIND_ORDER.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                  kind === k
                    ? "border-primary bg-primary/10"
                    : "border-border/60 hover:border-primary/40"
                }`}
              >
                {KIND_LABEL[k]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Physics, Python, React"
              className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Topic (optional)</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Narrow the focus"
              className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty((e.target.value as Difficulty) || "")}
              className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            >
              <option value="">Adaptive (recommended)</option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d[0].toUpperCase() + d.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Question count</label>
            <input
              type="number"
              min={3}
              max={40}
              value={count}
              onChange={(e) => setCount(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Default for this type"
              className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="text-xs text-muted-foreground">
            <Sparkles className="mr-1 inline h-3 w-3" /> The engine avoids repeating recent questions and adapts to your performance.
          </div>
          <Button disabled={startMut.isPending} onClick={() => startMut.mutate()}>
            {startMut.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            Generate & Start
          </Button>
        </div>
      </DashCard>
    </>
  );
}
