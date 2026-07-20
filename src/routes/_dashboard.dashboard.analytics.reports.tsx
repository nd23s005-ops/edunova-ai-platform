import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { runReport, listReportTemplates, saveReportTemplate } from "@/lib/analytics/reports.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Save } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/analytics/reports")({
  component: ReportsPage,
  head: () => ({ meta: [{ title: "Custom Reports — EduNova AI" }] }),
});

type Dataset = "enrollments" | "lessons_completed" | "ai_attempts";

function ReportsPage() {
  const run = useServerFn(runReport);
  const list = useServerFn(listReportTemplates);
  const save = useServerFn(saveReportTemplate);
  const qc = useQueryClient();

  const [dataset, setDataset] = useState<Dataset>("enrollments");
  const [limit, setLimit] = useState(200);
  const [name, setName] = useState("");
  const [rows, setRows] = useState<Record<string, unknown>[] | null>(null);

  const templates = useQuery({
    queryKey: ["analytics", "templates"],
    queryFn: () => list(),
  });

  const runMut = useMutation({
    mutationFn: () => run({ data: { spec: { dataset, dimensions: [], limit } } }),
    onSuccess: (r) => setRows((r.rows ?? []) as Record<string, unknown>[]),
  });

  const exportMut = useMutation({
    mutationFn: () => run({ data: { spec: { dataset, dimensions: [], limit }, export_csv: true } }),
    onSuccess: (r) => {
      if (!r.csv) return;
      const blob = new Blob([r.csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${dataset}-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });

  const saveMut = useMutation({
    mutationFn: () => save({ data: { name: name || `${dataset} report`, spec: { dataset, dimensions: [], limit } } }),
    onSuccess: () => {
      setName("");
      qc.invalidateQueries({ queryKey: ["analytics", "templates"] });
    },
  });

  const cols = rows && rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="space-y-6">
      <Card className="p-4 space-y-3">
        <div className="text-sm font-medium">Report builder</div>
        <div className="grid gap-3 md:grid-cols-4">
          <div>
            <Label>Dataset</Label>
            <Select value={dataset} onValueChange={(v) => setDataset(v as Dataset)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="enrollments">Enrollments</SelectItem>
                <SelectItem value="lessons_completed">Lessons Completed</SelectItem>
                <SelectItem value="ai_attempts">AI Attempts</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Limit</Label>
            <Input type="number" value={limit} min={1} max={5000} onChange={(e) => setLimit(Number(e.target.value) || 100)} />
          </div>
          <div>
            <Label>Save as</Label>
            <Input placeholder="Report name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={() => runMut.mutate()} disabled={runMut.isPending}>Run</Button>
            <Button variant="outline" onClick={() => exportMut.mutate()} disabled={exportMut.isPending}>
              <Download className="h-4 w-4 mr-1" /> CSV
            </Button>
            <Button variant="outline" onClick={() => saveMut.mutate()} disabled={saveMut.isPending || !name}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </div>
      </Card>

      {rows && rows.length > 0 ? (
        <Card className="p-0 overflow-auto max-h-[400px]">
          <table className="w-full text-sm">
            <thead className="bg-muted sticky top-0">
              <tr>{cols.map((c) => <th key={c} className="text-left px-3 py-2 font-medium">{c}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t">
                  {cols.map((c) => <td key={c} className="px-3 py-1.5">{String(r[c] ?? "")}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : rows ? (
        <Card className="p-6 text-sm text-muted-foreground">No rows matched.</Card>
      ) : null}

      <div>
        <div className="text-sm font-medium mb-2">Saved templates</div>
        {templates.isLoading ? (
          <Skeleton className="h-20" />
        ) : (
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {(templates.data?.templates ?? []).map((t) => (
              <Card key={t.id} className="p-3">
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.scope}</div>
              </Card>
            ))}
            {(templates.data?.templates ?? []).length === 0 ? (
              <div className="text-sm text-muted-foreground">No saved templates yet.</div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
