import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCertification, listCertifications, upsertCertification } from "@/lib/career/certifications.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Plus, Copy } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/career/certifications")({ component: CertsPage });

function CertsPage() {
  const list = useServerFn(listCertifications);
  const up = useServerFn(upsertCertification);
  const del = useServerFn(deleteCertification);
  const qc = useQueryClient();
  const key = ["career", "certifications"];
  const q = useQuery({ queryKey: key, queryFn: () => list() });
  const [form, setForm] = useState({ title: "", issuer: "", url: "", issued_at: "" });
  const um = useMutation({ mutationFn: () => up({ data: form }), onSuccess: () => { qc.invalidateQueries({ queryKey: key }); setForm({ title: "", issuer: "", url: "", issued_at: "" }); } });
  const dm = useMutation({ mutationFn: (id: string) => del({ data: { id } }), onSuccess: () => qc.invalidateQueries({ queryKey: key }) });

  return (
    <div className="space-y-6">
      <Card className="p-4 grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
        <div><Label>Issuer</Label><Input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} /></div>
        <div><Label>Issued (YYYY-MM-DD)</Label><Input value={form.issued_at} onChange={(e) => setForm({ ...form, issued_at: e.target.value })} /></div>
        <div className="md:col-span-3"><Label>URL</Label><Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} /></div>
        <div className="flex items-end"><Button onClick={() => um.mutate()} disabled={um.isPending || !form.title}><Plus className="h-4 w-4 mr-1" />Add</Button></div>
      </Card>

      {q.isLoading ? <Skeleton className="h-40" /> : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {(q.data?.certifications ?? []).map((c) => (
            <Card key={c.id} className="p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.issuer ?? "—"}{c.issued_at ? ` · ${c.issued_at}` : ""}</div>
                </div>
                <button onClick={() => { if (confirm("Delete?")) dm.mutate(c.id); }}><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button>
              </div>
              <div className="text-xs flex items-center gap-1"><span className="text-muted-foreground">Credential ID:</span> <code className="font-mono">{c.credential_id}</code>
                <button onClick={() => navigator.clipboard.writeText(c.credential_id ?? "")}><Copy className="h-3 w-3" /></button>
              </div>
              {c.url ? <a href={c.url} className="text-xs text-primary underline" target="_blank" rel="noreferrer">Open</a> : null}
            </Card>
          ))}
          {!(q.data?.certifications ?? []).length ? <p className="text-sm text-muted-foreground">Add your first certificate above.</p> : null}
        </div>
      )}
    </div>
  );
}
