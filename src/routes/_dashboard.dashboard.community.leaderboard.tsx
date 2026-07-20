import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLeaderboard, getMyXpSummary } from "@/lib/community/leaderboard.functions";
import { Trophy, Star } from "lucide-react";

export const Route = createFileRoute("/_dashboard/dashboard/community/leaderboard")({
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const lbFn = useServerFn(getLeaderboard);
  const myFn = useServerFn(getMyXpSummary);
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "all">("weekly");

  const lb = useQuery({ queryKey: ["community", "leaderboard", period], queryFn: () => lbFn({ data: { period } }) });
  const me = useQuery({ queryKey: ["community", "my-xp"], queryFn: () => myFn() });

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex gap-2">
          {(["daily", "weekly", "monthly", "all"] as const).map((p) => (
            <Button key={p} size="sm" variant={period === p ? "default" : "outline"} onClick={() => setPeriod(p)}>{p === "all" ? "All-time" : p}</Button>
          ))}
        </div>
        <Card><CardHeader><CardTitle className="text-base"><Trophy className="mr-1 inline h-4 w-4" /> Top contributors</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {lb.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
            {lb.data?.length === 0 && <p className="text-sm text-muted-foreground">No activity yet in this period.</p>}
            {lb.data?.map((r: { rank: number; user_id: string; xp: number; profile: { full_name: string | null; avatar_url: string | null } | null }) => (
              <div key={r.user_id} className="flex items-center gap-3 rounded border p-2 text-sm">
                <Badge variant={r.rank <= 3 ? "default" : "outline"}>#{r.rank}</Badge>
                <div className="flex-1 truncate">{r.profile?.full_name || "Anonymous learner"}</div>
                <span className="font-mono text-xs">{r.xp} XP</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card><CardHeader><CardTitle className="text-base">My XP</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{me.data?.total_xp ?? 0}</p></CardContent>
        </Card>
        <Card><CardHeader><CardTitle className="text-base"><Star className="mr-1 inline h-4 w-4" /> Badges</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {me.data?.badges.length === 0 && <p className="text-xs text-muted-foreground">Earn XP to unlock badges.</p>}
            {me.data?.badges.map((b) => <Badge key={b.id} variant="secondary">{b.label}</Badge>)}
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle className="text-base">Recent XP</CardTitle></CardHeader>
          <CardContent className="space-y-1 text-xs">
            {(me.data?.recent ?? []).slice(0, 10).map((r, i) => (
              <div key={i} className="flex justify-between border-b py-1"><span>{r.reason.replace(/_/g, " ")}</span><span>+{r.amount}</span></div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
