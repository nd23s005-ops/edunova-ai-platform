import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquareText, CalendarClock, GraduationCap, BookOpenText, Trophy, Sparkles } from "lucide-react";
import { getCommunitySnapshot, recommendCommunities } from "@/lib/community/dashboard.functions";

export const Route = createFileRoute("/_dashboard/dashboard/community/")({
  component: CommunityHome,
});

function CommunityHome() {
  const snapFn = useServerFn(getCommunitySnapshot);
  const recFn = useServerFn(recommendCommunities);
  const snap = useQuery({ queryKey: ["community", "snapshot"], queryFn: () => snapFn() });
  const rec = useQuery({ queryKey: ["community", "recommendations"], queryFn: () => recFn() });
  const s = snap.data;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={<Users className="h-5 w-5" />} label="Joined communities" value={s?.joined_count ?? 0} />
        <Kpi icon={<MessageSquareText className="h-5 w-5" />} label="My questions" value={s?.my_questions.length ?? 0} />
        <Kpi icon={<CalendarClock className="h-5 w-5" />} label="Upcoming events" value={s?.upcoming_events.length ?? 0} />
        <Kpi icon={<Trophy className="h-5 w-5" />} label="Community XP" value={s?.total_xp ?? 0} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Unanswered questions</CardTitle>
            <Link to="/dashboard/community/discussions" className="text-xs text-primary">See all →</Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {(s?.unanswered_questions ?? []).length === 0 && <p className="text-sm text-muted-foreground">Nothing waiting — nice work!</p>}
            {s?.unanswered_questions.map((q) => (
              <Link key={q.id} to="/dashboard/community/discussions/$id" params={{ id: q.id }} className="block rounded border p-3 text-sm hover:bg-accent">
                <p className="font-medium">{q.title}</p>
                <div className="mt-1 flex gap-1">
                  {(q.tags ?? []).slice(0, 4).map((t: string) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base"><Sparkles className="mr-1 inline h-4 w-4" /> AI-recommended communities</CardTitle>
            <Link to="/dashboard/community/communities" className="text-xs text-primary">Browse all →</Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {rec.isLoading && <p className="text-sm text-muted-foreground">Finding communities that fit you…</p>}
            {rec.data?.length === 0 && <p className="text-sm text-muted-foreground">You've joined the recommended ones already.</p>}
            {rec.data?.map((m) => m.community && (
              <Link key={m.community_id} to="/dashboard/community/communities" className="block rounded border p-3 text-sm hover:bg-accent">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{m.community.name}</p>
                  <Badge variant="outline" className="text-xs">{Math.round(m.score)}%</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{m.reason}</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base"><CalendarClock className="mr-1 inline h-4 w-4" /> Upcoming events</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {(s?.upcoming_events ?? []).length === 0 && <p className="text-sm text-muted-foreground">No events yet.</p>}
            {s?.upcoming_events.map((e) => (
              <div key={e.id} className="rounded border p-3 text-sm">
                <p className="font-medium">{e.title}</p>
                <p className="text-xs text-muted-foreground">{new Date(e.starts_at).toLocaleString()} • {e.kind.replace("_", " ")}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base"><GraduationCap className="mr-1 inline h-4 w-4" /> Mentors accepting requests</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {s?.recommended_mentors.map((m) => (
              <div key={m.user_id} className="rounded border p-3 text-sm">
                <p className="font-medium">{m.headline || "Mentor"}</p>
                <p className="text-xs text-muted-foreground">{(m.expertise ?? []).slice(0, 4).join(" • ")}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base"><BookOpenText className="mr-1 inline h-4 w-4" /> Trending articles</CardTitle>
            <Link to="/dashboard/community/knowledge" className="text-xs text-primary">See all →</Link>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {s?.trending_articles.map((a) => (
              <div key={a.id} className="rounded border p-3 text-sm">
                <p className="font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.kind} • {a.likes} likes</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Kpi({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <Card><CardContent className="flex items-center gap-3 pt-6">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </CardContent></Card>
  );
}
