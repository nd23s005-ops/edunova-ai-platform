import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { BookOpen, Image as ImageIcon, Lightbulb, Loader2, ListChecks, RefreshCw, Sparkles, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getOrGenerateLessonContent } from "@/lib/ai/engine/lesson-content.functions";

export function LessonEnhancerPanel({ lessonId }: { lessonId: string }) {
  const qc = useQueryClient();
  const generateFn = useServerFn(getOrGenerateLessonContent);
  const [enabled, setEnabled] = useState(false);

  const { data, isFetching, error } = useQuery({
    queryKey: ["ai", "lesson-content", lessonId],
    queryFn: () => generateFn({ data: { lessonId } }),
    enabled,
    staleTime: 5 * 60_000,
    retry: 0,
  });

  const regen = useMutation({
    mutationFn: () => generateFn({ data: { lessonId, refresh: true } }),
    onSuccess: () => {
      toast.success("Personalized lesson refreshed");
      qc.invalidateQueries({ queryKey: ["ai", "lesson-content", lessonId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!enabled) {
    return (
      <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Personalize this lesson</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Nova will rewrite this lesson at your level — with intro, concepts, steps, examples, use cases, and key takeaways.
            </p>
          </div>
          <Button size="sm" onClick={() => setEnabled(true)}>
            <Sparkles className="mr-1.5 h-4 w-4" /> Generate
          </Button>
        </div>
      </div>
    );
  }

  if (isFetching && !data) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Nova is tailoring this lesson to you…
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/60 p-5">
        <p className="text-sm font-semibold">Couldn't personalize this lesson</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {error instanceof Error ? error.message : "Try again in a moment."}
        </p>
        <Button size="sm" variant="outline" className="mt-3" disabled={regen.isPending} onClick={() => regen.mutate()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5 rounded-2xl border border-primary/30 bg-card p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <p className="text-sm font-semibold">Nova's personalized breakdown</p>
        </div>
        <Button size="sm" variant="ghost" disabled={regen.isPending} onClick={() => regen.mutate()}>
          {regen.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </div>

      {data.intro && <p className="text-sm leading-relaxed text-foreground/90">{data.intro}</p>}

      {data.concepts.length > 0 && (
        <div>
          <SectionHeader icon={<BookOpen className="h-4 w-4" />} title="Core concepts" />
          <ol className="space-y-2">
            {data.concepts.map((c, i) => (
              <li key={i} className="rounded-xl border border-border/60 bg-background/40 p-4">
                {c.title && <p className="text-sm font-semibold">{c.title}</p>}
                <p className="mt-1 text-sm text-foreground/90">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {data.steps.length > 0 && (
        <div>
          <SectionHeader icon={<ListChecks className="h-4 w-4" />} title="Step-by-step" />
          <ol className="ml-5 list-decimal space-y-1.5 text-sm">
            {data.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      )}

      {data.examples.length > 0 && (
        <div>
          <SectionHeader icon={<Lightbulb className="h-4 w-4" />} title="Worked examples" />
          <div className="grid gap-2 md:grid-cols-2">
            {data.examples.map((ex, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-background/40 p-4">
                {ex.title && <p className="text-sm font-semibold">{ex.title}</p>}
                <p className="mt-1 text-sm text-foreground/90">{ex.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.visualDescription && (
        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4">
          <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <ImageIcon className="h-4 w-4" /> Visual explanation
          </p>
          <p className="text-sm italic text-foreground/80">{data.visualDescription}</p>
        </div>
      )}

      {data.useCases.length > 0 && (
        <div>
          <SectionHeader icon={<Wrench className="h-4 w-4" />} title="Real-world use cases" />
          <ul className="space-y-1.5 text-sm">
            {data.useCases.map((u, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.summary && (
        <div className="rounded-xl border border-border/60 bg-background/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Summary</p>
          <p className="mt-1 text-sm text-foreground/90">{data.summary}</p>
        </div>
      )}

      {data.keyTakeaways.length > 0 && (
        <div>
          <SectionHeader icon={<Sparkles className="h-4 w-4" />} title="Key takeaways" />
          <ul className="space-y-1.5 text-sm">
            {data.keyTakeaways.map((k, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {icon} {title}
    </p>
  );
}
