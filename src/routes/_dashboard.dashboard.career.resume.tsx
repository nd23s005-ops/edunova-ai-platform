import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createResume, deleteResume, getResume, listResumes, saveResume, suggestSection } from "@/lib/career/resume.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Trash2, Save, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/career/resume")({ component: ResumeHub });

type Sections = {
  personal?: { name?: string; email?: string; phone?: string; location?: string; linkedin?: string; github?: string; portfolio?: string };
  objective?: string;
  education?: Array<{ school: string; degree: string; year: string }>;
  skills?: string[];
  experience?: Array<{ role: string; company: string; period: string; description: string }>;
  projects?: Array<{ title: string; description: string; tech?: string }>;
  certifications?: Array<{ title: string; issuer: string; year: string }>;
  achievements?: string[];
  languages?: string[];
  interests?: string[];
};

function ResumeHub() {
  const list = useServerFn(listResumes);
  const create = useServerFn(createResume);
  const del = useServerFn(deleteResume);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["career", "resumes"], queryFn: () => list() });
  const cm = useMutation({ mutationFn: () => create({ data: { title: "New Resume", template: "modern" } }), onSuccess: () => qc.invalidateQueries({ queryKey: ["career", "resumes"] }) });
  const dm = useMutation({ mutationFn: (id: string) => del({ data: { id } }), onSuccess: () => qc.invalidateQueries({ queryKey: ["career", "resumes"] }) });
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeId && q.data?.resumes?.[0]) setActiveId(q.data.resumes[0].id);
  }, [q.data, activeId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="p-3 h-fit space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">My Resumes</div>
          <Button size="sm" onClick={() => cm.mutate()}><Plus className="h-4 w-4 mr-1" />New</Button>
        </div>
        {q.isLoading ? <Skeleton className="h-24" /> : (
          <ul className="space-y-1">
            {(q.data?.resumes ?? []).map((r) => (
              <li key={r.id} className={`flex items-center justify-between rounded px-2 py-1.5 text-sm cursor-pointer ${activeId === r.id ? "bg-primary/10" : "hover:bg-muted"}`}
                  onClick={() => setActiveId(r.id)}>
                <span className="truncate">{r.title}</span>
                <button type="button" onClick={(e) => { e.stopPropagation(); if (confirm("Delete resume?")) dm.mutate(r.id); }}
                        className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </li>
            ))}
            {!q.data?.resumes?.length ? <li className="text-xs text-muted-foreground">No resumes yet.</li> : null}
          </ul>
        )}
      </Card>
      {activeId ? <ResumeEditor id={activeId} /> : <Card className="p-6 text-sm text-muted-foreground">Select or create a resume.</Card>}
    </div>
  );
}

function ResumeEditor({ id }: { id: string }) {
  const get = useServerFn(getResume);
  const save = useServerFn(saveResume);
  const suggest = useServerFn(suggestSection);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["career", "resume", id], queryFn: () => get({ data: { id } }) });
  const [sections, setSections] = useState<Sections>({});
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (q.data?.resume) {
      setSections((q.data.resume.sections as unknown as Sections) ?? {});
      setTitle(q.data.resume.title ?? "");
    }
  }, [q.data]);

  const sm = useMutation({
    mutationFn: (create_version = false) => save({ data: { id, title, sections: sections as unknown as Record<string, unknown>, create_version } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["career", "resume", id] }); qc.invalidateQueries({ queryKey: ["career", "resumes"] }); },
  });
  const [suggestBusy, setSuggestBusy] = useState<string | null>(null);

  const applySuggestion = async (section: "objective" | "experience" | "projects" | "skills" | "achievements", content: string, apply: (v: string) => void) => {
    try {
      setSuggestBusy(section);
      const r = await suggest({ data: { section, content } });
      apply(r.improved);
    } finally { setSuggestBusy(null); }
  };

  if (q.isLoading) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-4">
      <Card className="p-4 flex items-center gap-2">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="max-w-sm" />
        <Button onClick={() => sm.mutate(false)} disabled={sm.isPending}><Save className="h-4 w-4 mr-1" />Save</Button>
        <Button variant="outline" onClick={() => sm.mutate(true)} disabled={sm.isPending}>Save + snapshot</Button>
        <Button variant="outline" onClick={() => window.print()}>Export PDF (print)</Button>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4 space-y-3">
          <h3 className="text-sm font-medium">Personal Info</h3>
          {(["name", "email", "phone", "location", "linkedin", "github", "portfolio"] as const).map((k) => (
            <div key={k}>
              <Label className="capitalize">{k}</Label>
              <Input value={sections.personal?.[k] ?? ""} onChange={(e) => setSections((s) => ({ ...s, personal: { ...s.personal, [k]: e.target.value } }))} />
            </div>
          ))}
        </Card>

        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Career Objective</h3>
            <Button size="sm" variant="ghost" disabled={suggestBusy === "objective"} onClick={() => applySuggestion("objective", sections.objective ?? "", (v) => setSections((s) => ({ ...s, objective: v })))}>
              <Sparkles className="h-4 w-4 mr-1" />{suggestBusy === "objective" ? "Improving…" : "AI polish"}
            </Button>
          </div>
          <Textarea rows={4} value={sections.objective ?? ""} onChange={(e) => setSections((s) => ({ ...s, objective: e.target.value }))} />
        </Card>

        <Card className="p-4 space-y-3">
          <h3 className="text-sm font-medium">Skills (comma-separated)</h3>
          <Textarea rows={2} value={(sections.skills ?? []).join(", ")} onChange={(e) => setSections((s) => ({ ...s, skills: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) }))} />
        </Card>

        <Card className="p-4 space-y-3">
          <h3 className="text-sm font-medium">Education</h3>
          {(sections.education ?? []).map((edu, i) => (
            <div key={i} className="grid grid-cols-3 gap-2">
              <Input placeholder="School" value={edu.school} onChange={(e) => setSections((s) => ({ ...s, education: (s.education ?? []).map((x, j) => j === i ? { ...x, school: e.target.value } : x) }))} />
              <Input placeholder="Degree" value={edu.degree} onChange={(e) => setSections((s) => ({ ...s, education: (s.education ?? []).map((x, j) => j === i ? { ...x, degree: e.target.value } : x) }))} />
              <Input placeholder="Year" value={edu.year} onChange={(e) => setSections((s) => ({ ...s, education: (s.education ?? []).map((x, j) => j === i ? { ...x, year: e.target.value } : x) }))} />
            </div>
          ))}
          <Button size="sm" variant="outline" onClick={() => setSections((s) => ({ ...s, education: [...(s.education ?? []), { school: "", degree: "", year: "" }] }))}><Plus className="h-4 w-4 mr-1" />Add</Button>
        </Card>

        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Experience / Internships</h3>
            <Button size="sm" variant="outline" onClick={() => setSections((s) => ({ ...s, experience: [...(s.experience ?? []), { role: "", company: "", period: "", description: "" }] }))}><Plus className="h-4 w-4 mr-1" />Add</Button>
          </div>
          {(sections.experience ?? []).map((exp, i) => (
            <div key={i} className="space-y-2 border rounded p-2">
              <div className="grid grid-cols-3 gap-2">
                <Input placeholder="Role" value={exp.role} onChange={(e) => setSections((s) => ({ ...s, experience: (s.experience ?? []).map((x, j) => j === i ? { ...x, role: e.target.value } : x) }))} />
                <Input placeholder="Company" value={exp.company} onChange={(e) => setSections((s) => ({ ...s, experience: (s.experience ?? []).map((x, j) => j === i ? { ...x, company: e.target.value } : x) }))} />
                <Input placeholder="Period" value={exp.period} onChange={(e) => setSections((s) => ({ ...s, experience: (s.experience ?? []).map((x, j) => j === i ? { ...x, period: e.target.value } : x) }))} />
              </div>
              <Textarea rows={2} placeholder="Description" value={exp.description} onChange={(e) => setSections((s) => ({ ...s, experience: (s.experience ?? []).map((x, j) => j === i ? { ...x, description: e.target.value } : x) }))} />
            </div>
          ))}
        </Card>

        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Projects</h3>
            <Button size="sm" variant="outline" onClick={() => setSections((s) => ({ ...s, projects: [...(s.projects ?? []), { title: "", description: "", tech: "" }] }))}><Plus className="h-4 w-4 mr-1" />Add</Button>
          </div>
          {(sections.projects ?? []).map((p, i) => (
            <div key={i} className="space-y-2 border rounded p-2">
              <Input placeholder="Title" value={p.title} onChange={(e) => setSections((s) => ({ ...s, projects: (s.projects ?? []).map((x, j) => j === i ? { ...x, title: e.target.value } : x) }))} />
              <Input placeholder="Tech stack" value={p.tech ?? ""} onChange={(e) => setSections((s) => ({ ...s, projects: (s.projects ?? []).map((x, j) => j === i ? { ...x, tech: e.target.value } : x) }))} />
              <Textarea rows={2} placeholder="Description" value={p.description} onChange={(e) => setSections((s) => ({ ...s, projects: (s.projects ?? []).map((x, j) => j === i ? { ...x, description: e.target.value } : x) }))} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
