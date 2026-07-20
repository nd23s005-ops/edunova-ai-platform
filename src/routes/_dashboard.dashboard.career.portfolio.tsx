import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyPortfolio, savePortfolio } from "@/lib/career/portfolio.functions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Save } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/career/portfolio")({ component: PortfolioPage });

type Sections = {
  hero?: { headline?: string; subheadline?: string };
  about?: string;
  skills?: string[];
  projects?: Array<{ title: string; description: string; url?: string }>;
  socials?: { github?: string; linkedin?: string; twitter?: string; email?: string };
};

function PortfolioPage() {
  const get = useServerFn(getMyPortfolio);
  const save = useServerFn(savePortfolio);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["career", "portfolio"], queryFn: () => get() });
  const [slug, setSlug] = useState("");
  const [theme, setTheme] = useState("aurora");
  const [isPublic, setIsPublic] = useState(false);
  const [sections, setSections] = useState<Sections>({});

  useEffect(() => {
    if (q.data?.portfolio) {
      setSlug(q.data.portfolio.slug);
      setTheme(q.data.portfolio.theme);
      setIsPublic(q.data.portfolio.is_public);
      setSections((q.data.portfolio.sections as unknown as Sections) ?? {});
    }
  }, [q.data]);

  const m = useMutation({
    mutationFn: () => save({ data: { slug, theme, is_public: isPublic, sections: sections as unknown as Record<string, unknown> } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["career", "portfolio"] }),
  });

  if (q.isLoading) return <Skeleton className="h-64" />;

  return (
    <div className="space-y-4">
      <Card className="p-4 grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2"><Label>Slug</Label><Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="your-name" /></div>
        <div>
          <Label>Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="aurora">Aurora</SelectItem>
              <SelectItem value="mono">Mono</SelectItem>
              <SelectItem value="sunset">Sunset</SelectItem>
              <SelectItem value="ocean">Ocean</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end gap-3">
          <div><Label className="block">Public</Label><Switch checked={isPublic} onCheckedChange={setIsPublic} /></div>
          <Button onClick={() => m.mutate()} disabled={m.isPending}><Save className="h-4 w-4 mr-1" />Save</Button>
        </div>
        {isPublic && slug ? (
          <div className="md:col-span-4 text-xs">
            Share link:{" "}
            <Link to="/p/$slug" params={{ slug }} className="text-primary underline inline-flex items-center gap-1">
              /p/{slug} <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        ) : null}
      </Card>

      <Card className="p-4 space-y-3">
        <h3 className="text-sm font-medium">Hero</h3>
        <Input placeholder="Headline" value={sections.hero?.headline ?? ""} onChange={(e) => setSections((s) => ({ ...s, hero: { ...s.hero, headline: e.target.value } }))} />
        <Input placeholder="Subheadline" value={sections.hero?.subheadline ?? ""} onChange={(e) => setSections((s) => ({ ...s, hero: { ...s.hero, subheadline: e.target.value } }))} />
      </Card>

      <Card className="p-4 space-y-3">
        <h3 className="text-sm font-medium">About</h3>
        <Textarea rows={4} value={sections.about ?? ""} onChange={(e) => setSections((s) => ({ ...s, about: e.target.value }))} />
      </Card>

      <Card className="p-4 space-y-3">
        <h3 className="text-sm font-medium">Skills</h3>
        <Textarea rows={2} value={(sections.skills ?? []).join(", ")} onChange={(e) => setSections((s) => ({ ...s, skills: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) }))} />
      </Card>

      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Projects</h3>
          <Button size="sm" variant="outline" onClick={() => setSections((s) => ({ ...s, projects: [...(s.projects ?? []), { title: "", description: "", url: "" }] }))}>Add</Button>
        </div>
        {(sections.projects ?? []).map((p, i) => (
          <div key={i} className="border rounded p-2 space-y-2">
            <Input placeholder="Title" value={p.title} onChange={(e) => setSections((s) => ({ ...s, projects: (s.projects ?? []).map((x, j) => j === i ? { ...x, title: e.target.value } : x) }))} />
            <Input placeholder="URL" value={p.url ?? ""} onChange={(e) => setSections((s) => ({ ...s, projects: (s.projects ?? []).map((x, j) => j === i ? { ...x, url: e.target.value } : x) }))} />
            <Textarea rows={2} placeholder="Description" value={p.description} onChange={(e) => setSections((s) => ({ ...s, projects: (s.projects ?? []).map((x, j) => j === i ? { ...x, description: e.target.value } : x) }))} />
          </div>
        ))}
      </Card>

      <Card className="p-4 space-y-3">
        <h3 className="text-sm font-medium">Socials</h3>
        <div className="grid gap-2 md:grid-cols-2">
          {(["github", "linkedin", "twitter", "email"] as const).map((k) => (
            <Input key={k} placeholder={k} value={sections.socials?.[k] ?? ""} onChange={(e) => setSections((s) => ({ ...s, socials: { ...s.socials, [k]: e.target.value } }))} />
          ))}
        </div>
      </Card>
    </div>
  );
}
