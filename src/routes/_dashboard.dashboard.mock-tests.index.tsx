import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, Layers, ArrowRight, Trophy, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { MOCK_TEST_CATEGORIES } from "@/lib/ai/mock-tests.catalog";

export const Route = createFileRoute("/_dashboard/dashboard/mock-tests/")({
  component: MockTestsList,
});

type MockTest = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  duration_minutes: number;
  total_questions: number;
  difficulty: string;
};

const sb = supabase as unknown as { from: (t: string) => any };

function MockTestsList() {
  const { data: tests = [] } = useQuery({
    queryKey: ["mock-tests"],
    queryFn: async () => {
      const { data, error } = await sb
        .from("mock_tests")
        .select("id, title, category, description, duration_minutes, total_questions, difficulty")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as MockTest[];
    },
  });

  const { data: recent = [] } = useQuery({
    queryKey: ["mock-tests", "recent-attempts"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [];
      const { data } = await sb
        .from("mock_test_attempts")
        .select("id, test_id, score, max_score, submitted_at")
        .eq("user_id", u.user.id)
        .not("submitted_at", "is", null)
        .order("submitted_at", { ascending: false })
        .limit(5);
      return (data ?? []) as Array<{ id: string; test_id: string; score: number; max_score: number; submitted_at: string }>;
    },
  });

  const byId = Object.fromEntries(tests.map((t) => [t.id, t] as const));

  return (
    <>
      <DashboardHeader
        title="Mock tests"
        description="Practice under timed conditions across skills and exam categories."
      />

      {tests.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No mock tests available yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tests.map((t) => (
            <Link
              key={t.id}
              to="/dashboard/mock-tests/$testId"
              params={{ testId: t.id }}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:border-primary/40 hover:shadow-elegant"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {t.category}
                </span>
                <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
                  {t.difficulty}
                </span>
              </div>
              <h3 className="text-base font-semibold group-hover:text-primary">{t.title}</h3>
              {t.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.description}</p>}
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {t.duration_minutes} min
                </span>
                <span className="inline-flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" /> {t.total_questions} questions
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-foreground">
                  Start <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {recent.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Trophy className="h-4 w-4 text-primary" /> Recent attempts
          </h2>
          <ul className="space-y-2">
            {recent.map((a) => {
              const t = byId[a.test_id];
              const pct = a.max_score > 0 ? Math.round((a.score / a.max_score) * 100) : 0;
              return (
                <li key={a.id} className="flex items-center justify-between rounded-xl border border-border/60 bg-card px-4 py-3 text-sm">
                  <span className="font-medium">{t?.title ?? "Test"}</span>
                  <span className="text-muted-foreground">
                    {a.score}/{a.max_score} · {pct}%
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
