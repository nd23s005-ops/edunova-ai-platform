import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  exportLessonToPDF,
  type LessonExportData,
  type LessonExportPaper,
  type LessonExportSection,
} from "@/lib/lesson-export";

const PREFS_KEY = "lesson-export-prefs:v1";
const ALL_SECTIONS: { id: LessonExportSection; label: string; hint: string }[] = [
  { id: "reading", label: "Reading", hint: "Theory and key notes" },
  { id: "notes", label: "My notes", hint: "Your saved notes" },
  { id: "qa", label: "Worked examples (Q&A)", hint: "Solved examples" },
  { id: "practice", label: "Practice results", hint: "Practice questions and answers" },
];
const PAPER_OPTIONS: { id: LessonExportPaper; label: string }[] = [
  { id: "a4", label: "A4" },
  { id: "letter", label: "Letter" },
  { id: "legal", label: "Legal" },
];

type Prefs = { sections: LessonExportSection[]; paper: LessonExportPaper };
const DEFAULT_PREFS: Prefs = { sections: ["reading", "notes", "qa", "practice"], paper: "a4" };

function loadPrefs(): Prefs {
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    const sections = Array.isArray(parsed.sections)
      ? (parsed.sections.filter((s) =>
          ["reading", "notes", "qa", "practice"].includes(s),
        ) as LessonExportSection[])
      : DEFAULT_PREFS.sections;
    const paper = (["a4", "letter", "legal"] as const).includes(parsed.paper as LessonExportPaper)
      ? (parsed.paper as LessonExportPaper)
      : DEFAULT_PREFS.paper;
    return { sections: sections.length ? sections : DEFAULT_PREFS.sections, paper };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function LessonExportDialog({ data }: { data: LessonExportData }) {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);

  useEffect(() => {
    setPrefs(loadPrefs());
  }, []);

  const toggle = (id: LessonExportSection, on: boolean) => {
    setPrefs((p) => ({
      ...p,
      sections: on ? Array.from(new Set([...p.sections, id])) : p.sections.filter((s) => s !== id),
    }));
  };

  const submit = () => {
    try {
      window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
    exportLessonToPDF(data, { sections: prefs.sections, paper: prefs.paper });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export lesson to PDF</DialogTitle>
          <DialogDescription>
            Pick what to include and the paper size. Your preferences are remembered.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <p className="mb-2 text-sm font-medium">Sections</p>
            <div className="space-y-2">
              {ALL_SECTIONS.map((s) => {
                const checked = prefs.sections.includes(s.id);
                return (
                  <label
                    key={s.id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-border/60 p-3 hover:bg-muted/40"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(v) => toggle(s.id, v === true)}
                      className="mt-0.5"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{s.label}</span>
                      <span className="block text-xs text-muted-foreground">{s.hint}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Paper size</p>
            <RadioGroup
              value={prefs.paper}
              onValueChange={(v) => setPrefs((p) => ({ ...p, paper: v as LessonExportPaper }))}
              className="flex flex-wrap gap-4"
            >
              {PAPER_OPTIONS.map((p) => (
                <div key={p.id} className="flex items-center gap-2">
                  <RadioGroupItem id={`paper-${p.id}`} value={p.id} />
                  <Label htmlFor={`paper-${p.id}`} className="cursor-pointer text-sm">
                    {p.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={prefs.sections.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
