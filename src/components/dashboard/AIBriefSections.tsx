import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Compass, TrendingUp, Target, Lightbulb, Dumbbell, Star, LineChart, Grid3x3 } from "lucide-react";
import { generateDashboardBrief, type BriefItem, type DashboardBrief } from "@/lib/ai/dashboard-brief.functions";
import type { AppRole } from "@/lib/auth/roles";

const SECTIONS: Array<{
  key: keyof DashboardBrief;
  title: string;
  icon: typeof Sparkles;
}> = [
  { key: "featuredCourses", title: "Featured courses", icon: Sparkles },
  { key: "recommendedLearning", title: "Recommended learning", icon: Compass },
  { key: "trendingTopics", title: "Trending topics", icon: TrendingUp },
  { key: "weeklyGoals", title: "Weekly goals", icon: Target },
  { key: "learningSuggestions", title: "Learning suggestions", icon: Lightbulb },
  { key: "practiceRecommendations", title: "Practice recommendations", icon: Dumbbell },
  { key: "skillHighlights", title: "Skill highlights", icon: Star },
  { key: "progressInsights", title: "Progress insights", icon: LineChart },
];

function Card({ item }: { item: BriefItem }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant">
      <p className="text-sm font-semibold">{item.title}</p>
      {item.description && (
        <p className="mt-1 text-xs text-muted-foreground line-clamp-3">{item.description}</p>
      )}
      {item.tag && (
        <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
          {item.tag}
        </span>
      )}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-2xl border border-border/60 bg-card/50" />
      ))}
    </div>
  );
}

export function AIBriefSections({ role }: { role: AppRole }) {
  const gen = useServerFn(generateDashboardBrief);
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-brief", role],
    queryFn: () => gen({ data: { role } }),
    staleTime: 12 * 60 * 60 * 1000,
    retry: 1,
  });

  const categories = useMemo(() => data?.categories ?? [], [data]);

  return (
    <div className="space-y-10">
      {/* Categories row */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Grid3x3 className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">Personalized categories</h2>
        </div>
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((c) => (
              <Card key={c.title} item={c} />
            ))}
          </div>
        )}
      </section>

      {SECTIONS.map(({ key, title, icon: Icon }) => {
        const items = (data?.[key] ?? []) as BriefItem[];
        return (
          <section key={key}>
            <div className="mb-4 flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            </div>
            {isLoading ? (
              <Skeleton />
            ) : items.length === 0 ? (
              <p className="text-sm text-muted-foreground">No suggestions yet.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {items.slice(0, 4).map((it, i) => (
                  <Card key={`${key}-${i}`} item={it} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
