import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Briefcase, Compass, GraduationCap, Loader2, RefreshCw, Sparkles, Target, Trophy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getOrGenerateCourseOverview } from "@/lib/ai/engine/course-overview.functions";

export function CourseOverviewPanel({ courseId }: { courseId: string }) {
  const qc = useQueryClient();
  const generateFn = useServerFn(getOrGenerateCourseOverview);
  const [hasTriedGenerate, setHasTriedGenerate] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["ai", "course-overview", courseId],
    queryFn: () => generateFn({ data: { courseId } }),
    staleTime: 5 * 60_000,
    retry: 0,
  });

  const regen = useMutation({
    mutationFn: () => generateFn({ data: { courseId, refresh: true } }),
    onSuccess: () => {
      toast.success("Overview refreshed for you");
      qc.invalidateQueries({ queryKey: ["ai", "course-overview", courseId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Nova is crafting a personalized overview for you…
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-3 w-11/12 animate-pulse rounded bg-muted" />
          <div className="h-3 w-10/12 animate-pulse rounded bg-muted" />
          <div className="h-3 w-9/12 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/60 p-6">
        <p className="text-sm font-semibold">AI overview unavailable</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {error instanceof Error ? error.message : "Nova couldn't generate this yet."}
        </p>
        <Button
          size="sm"
          variant="outline"
          className="mt-3"
          disabled={regen.isPending || hasTriedGenerate}
          onClick={() => {
            setHasTriedGenerate(true);
            regen.mutate();
          }}
        >
          {regen.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-border/60 bg-card p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">Personalized for you</p>
            <p className="text-xs text-muted-foreground">AI-generated overview based on your level and goals</p>
          </div>
        </div>
        <Button size="sm" variant="ghost" disabled={regen.isPending} onClick={() => regen.mutate()}>
          {regen.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </div>

      <p className="text-sm leading-relaxed text-foreground/90">{data.overview}</p>

      <div className="grid gap-4 md:grid-cols-2">
        {data.objectives.length > 0 && (
          <Bullets icon={<Target className="h-4 w-4" />} title="Learning objectives" items={data.objectives} />
        )}
        {data.skills.length > 0 && (
          <Chips icon={<GraduationCap className="h-4 w-4" />} title="Skills you'll gain" items={data.skills} />
        )}
        {data.outcomes.length > 0 && (
          <Bullets icon={<Trophy className="h-4 w-4" />} title="Learning outcomes" items={data.outcomes} />
        )}
        {data.careerOpportunities.length > 0 && (
          <Bullets icon={<Briefcase className="h-4 w-4" />} title="Career opportunities" items={data.careerOpportunities} />
        )}
        {data.prerequisites.length > 0 && (
          <Bullets icon={<Compass className="h-4 w-4" />} title="Prerequisites" items={data.prerequisites} />
        )}
        {data.industryRelevance && (
          <div className="rounded-xl border border-border/60 bg-background/40 p-4">
            <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Briefcase className="h-4 w-4" /> Industry relevance
            </p>
            <p className="text-sm text-foreground/90">{data.industryRelevance}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Bullets({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {icon} {title}
      </p>
      <ul className="space-y-1.5 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Chips({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {icon} {title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it, i) => (
          <span key={i} className="rounded-full border border-border/60 bg-card px-2.5 py-1 text-xs">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
