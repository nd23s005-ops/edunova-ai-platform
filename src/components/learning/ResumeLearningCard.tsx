import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle } from "lucide-react";
import { getResumeCandidate } from "@/lib/ai/engine/reading-position.functions";
import { Button } from "@/components/ui/button";

export function ResumeLearningCard() {
  const fn = useServerFn(getResumeCandidate);
  const { data } = useQuery({
    queryKey: ["ai", "resume-candidate"],
    queryFn: () => fn(),
    staleTime: 30_000,
    retry: 0,
  });

  if (!data || !data.lessonId || !data.courseId) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Resume learning</p>
          <h3 className="mt-1 truncate text-lg font-bold">{data.lessonTitle}</h3>
          <p className="text-xs text-muted-foreground">
            {data.courseTitle} · {data.scrollPercent}% through this lesson
          </p>
        </div>
        <Button asChild size="sm">
          <a href={`/learn/${data.courseId}`} target="_blank" rel="noopener noreferrer">
            <PlayCircle className="mr-2 h-4 w-4" />
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${data.scrollPercent}%` }} />
      </div>
    </div>
  );
}
