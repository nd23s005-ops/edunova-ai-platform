import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { listMentors, getMyMentorProfile, upsertMentorProfile, requestMentorship, listMyMentorships } from "@/lib/community/mentorship.functions";
import { Star } from "lucide-react";

export const Route = createFileRoute("/_dashboard/dashboard/community/mentors")({
  component: MentorsPage,
});

function MentorsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listMentors);
  const myFn = useServerFn(getMyMentorProfile);
  const upFn = useServerFn(upsertMentorProfile);
  const reqFn = useServerFn(requestMentorship);
  const myReqFn = useServerFn(listMyMentorships);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"find" | "requests" | "become">("find");

  const list = useQuery({ queryKey: ["community", "mentors", search], queryFn: () => listFn({ data: { search: search || undefined } }) });
  const mine = useQuery({ queryKey: ["community", "my-mentorships"], queryFn: () => myReqFn() });
  const profile = useQuery({ queryKey: ["community", "mentor-profile"], queryFn: () => myFn() });

  const [reqOpen, setReqOpen] = useState<{ id: string; open: boolean }>({ id: "", open: false });
  const [reqForm, setReqForm] = useState({ goals: "", message: "" });
  const [profileForm, setProfileForm] = useState({ headline: "", bio: "", expertise: "", years_experience: 0, hourly_rate: 0, is_accepting: true });

  const send = useMutation({
    mutationFn: () => reqFn({ data: { mentor_id: reqOpen.id, goals: reqForm.goals, message: reqForm.message } }),
    onSuccess: () => { toast.success("Request sent"); setReqOpen({ id: "", open: false }); setReqForm({ goals: "", message: "" }); qc.invalidateQueries({ queryKey: ["community", "my-mentorships"] }); },
    onError: (e: Error) => toast.error(e.message),
  });
  const savePro = useMutation({
    mutationFn: () => upFn({ data: { ...profileForm, expertise: profileForm.expertise.split(",").map((s) => s.trim()).filter(Boolean) } }),
    onSuccess: () => { toast.success("Mentor profile saved"); qc.invalidateQueries({ queryKey: ["community", "mentor-profile"] }); },
    onError: (e: Error) => toast.error(e.message),
  });

  function openBecome() {
    setTab("become");
    if (profile.data) setProfileForm({
      headline: profile.data.headline ?? "",
      bio: profile.data.bio ?? "",
      expertise: (profile.data.expertise ?? []).join(", "),
      years_experience: profile.data.years_experience ?? 0,
      hourly_rate: Number(profile.data.hourly_rate ?? 0),
      is_accepting: profile.data.is_accepting ?? true,
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" variant={tab === "find" ? "default" : "outline"} onClick={() => setTab("find")}>Find mentors</Button>
        <Button size="sm" variant={tab === "requests" ? "default" : "outline"} onClick={() => setTab("requests")}>My requests</Button>
        <Button size="sm" variant={tab === "become" ? "default" : "outline"} onClick={openBecome}>Become a mentor</Button>
      </div>

      {tab === "find" && (
        <>
          <Input placeholder="Search mentors…" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.data?.map((m) => (
              <Card key={m.user_id}>
                <CardHeader><CardTitle className="text-base">{m.headline || "Mentor"}</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="line-clamp-3 text-muted-foreground">{m.bio}</p>
                  <div className="flex flex-wrap gap-1">{(m.expertise ?? []).slice(0, 5).map((e) => <Badge key={e} variant="secondary" className="text-xs">{e}</Badge>)}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span><Star className="inline h-3 w-3" /> {Number(m.rating).toFixed(1)}</span>
                    <span>{m.years_experience}y exp</span>
                  </div>
                  <Button size="sm" onClick={() => setReqOpen({ id: m.user_id, open: true })}>Request mentorship</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {tab === "requests" && (
        <div className="space-y-2">
          {mine.data?.length === 0 && <p className="text-sm text-muted-foreground">No mentorships yet.</p>}
          {mine.data?.map((r) => (
            <Card key={r.id}><CardContent className="pt-4 text-sm">
              <div className="flex items-center justify-between"><Badge>{r.status}</Badge><span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span></div>
              <p className="mt-2 font-medium">Goals: {r.goals}</p>
              <p className="text-muted-foreground">{r.message}</p>
            </CardContent></Card>
          ))}
        </div>
      )}

      {tab === "become" && (
        <Card className="max-w-2xl"><CardHeader><CardTitle className="text-base">Mentor profile</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Headline (e.g. Senior ML Engineer @ Google)" value={profileForm.headline} onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })} />
            <Textarea placeholder="Short bio" rows={4} value={profileForm.bio} onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })} />
            <Input placeholder="Expertise (comma separated: python, ml, transformers)" value={profileForm.expertise} onChange={(e) => setProfileForm({ ...profileForm, expertise: e.target.value })} />
            <div className="flex gap-2">
              <Input type="number" placeholder="Years of experience" value={profileForm.years_experience} onChange={(e) => setProfileForm({ ...profileForm, years_experience: Number(e.target.value) })} />
              <Input type="number" placeholder="Hourly rate (USD)" value={profileForm.hourly_rate} onChange={(e) => setProfileForm({ ...profileForm, hourly_rate: Number(e.target.value) })} />
            </div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={profileForm.is_accepting} onChange={(e) => setProfileForm({ ...profileForm, is_accepting: e.target.checked })} /> Currently accepting mentorship requests</label>
            <Button onClick={() => savePro.mutate()} disabled={!profileForm.headline || savePro.isPending}>{savePro.isPending ? "Saving…" : "Save mentor profile"}</Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={reqOpen.open} onOpenChange={(o) => setReqOpen({ ...reqOpen, open: o })}>
        <DialogContent>
          <DialogHeader><DialogTitle>Request mentorship</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Textarea placeholder="What are your goals for this mentorship?" value={reqForm.goals} onChange={(e) => setReqForm({ ...reqForm, goals: e.target.value })} />
            <Textarea placeholder="Introduce yourself" value={reqForm.message} onChange={(e) => setReqForm({ ...reqForm, message: e.target.value })} />
          </div>
          <DialogFooter><Button onClick={() => send.mutate()} disabled={!reqForm.goals || send.isPending}>{send.isPending ? "Sending…" : "Send request"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
