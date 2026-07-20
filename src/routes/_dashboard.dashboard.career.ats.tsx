import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery } from "@tanstack/react-query";
import { analyzeAts, listAtsReports } from "@/lib/career/ats.functions";
import { listResumes } from "@/lib/career/resume.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/career/ats")({ component: AtsPage });

function AtsPage() {
  const listRes = useServerFn(listResumes);
  const listRep = useServerFn(listAtsReports);
  const run = useServerFn(analyzeAts);
  const resumes = useQuery({ queryKey: ["career", "resumes-lite"], queryFn: () => listRes() });
  const reports = useQuery({ queryKey: ["career", "ats-reports"], queryFn: () => listRep() });

  const [resumeId, setResumeId] = useState<string | undefined>();
  const [jd, setJd] = useState("");
  const m = useMutation({ mutationFn: () => run({ data: { resume_id: resumeId, jd_text: jd } }), onSuccess: () => reports.refetch() });
  const latest = m.data?.report ?? reports.data?.reports?.[0];

  return (
    <div className="space-y-6">
      <Card className="p-4 space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <Label>Choose resume</Label>
            <Select value={resumeId} onValueChange={setResumeId}>
              <SelectTrigger><SelectValue placeholder="Pick a resume" /></SelectTrigger>
              <SelectContent>
                {(resumes.data?.resumes ?? []).map((r) => <SelectItem key={r.id} value={r.id}>{r.title}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Or paste job description</Label>
            <Textarea rows={6} value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste the JD text..." />
          </div>
        </div>
        <Button onClick={() => m.mutate()} disabled={m.isPending || jd.length < 50}>{m.isPending ? "Analyzing…" : "Analyze"}</Button>
      </Card>

      {latest ? (
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-medium">ATS Compatibility</div>
            <div className="text-lg font-semibold">{Number(latest.score ?? 0).toFixed(0)}%</div>
          </div>
          <Progress value={Number(latest.score ?? 0)} className="h-2" />
          <div className="grid gap-3 md:grid-cols-2">
            <div><div className="text-xs text-muted-foreground mb-1">Matched keywords</div><div className="flex flex-wrap gap-1">{((latest.keywords_matched as unknown as string[]) ?? []).map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div></div>
            <div><div className="text-xs text-muted-foreground mb-1">Missing keywords</div><div className="flex flex-wrap gap-1">{((latest.keywords_missing as unknown as string[]) ?? []).map((s) => <Badge key={s} variant="outline">{s}</Badge>)}</div></div>
          </div>
          {latest.ai_summary ? <p className="text-sm">{latest.ai_summary}</p> : null}
          <ul className="text-sm list-disc pl-5">
            {((latest.suggestions as unknown as Array<{ area: string; action: string }>) ?? []).map((s, i) => <li key={i}><strong>{s.area}:</strong> {s.action}</li>)}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}
