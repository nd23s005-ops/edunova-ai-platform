import jsPDF from "jspdf";

type Illustration = { url?: string; caption?: string; alt?: string };
type Example = { title?: string; body?: string };
type Practice = { prompt?: string; answer?: string };

export type LessonExportData = {
  courseTitle?: string;
  lessonTitle: string;
  estimatedMinutes?: number | null;
  theory?: string | null;
  keyNotes?: string | null;
  illustrations?: Illustration[];
  examples?: Example[];
  practice?: Practice[];
  notes?: string;
};

function stripMd(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, (b) => b.replace(/```/g, ""))
    .replace(/[*_`#>]/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\r/g, "")
    .trim();
}

export type LessonExportSection = "reading" | "notes" | "qa" | "practice";
export type LessonExportPaper = "a4" | "letter" | "legal";

export type LessonExportOptions = {
  sections?: LessonExportSection[];
  paper?: LessonExportPaper;
};

const DEFAULT_SECTIONS: LessonExportSection[] = ["reading", "notes", "qa", "practice"];

export function exportLessonToPDF(data: LessonExportData, options: LessonExportOptions = {}) {
  const sections = new Set<LessonExportSection>(options.sections ?? DEFAULT_SECTIONS);
  const paper: LessonExportPaper = options.paper ?? "a4";

  const doc = new jsPDF({ unit: "pt", format: paper });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const maxW = pageW - margin * 2;
  let y = margin;

  const ensure = (needed: number) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const writeText = (text: string, size = 11, bold = false, gap = 6) => {
    if (!text) return;
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxW);
    for (const line of lines) {
      ensure(size + 4);
      doc.text(line, margin, y);
      y += size + 4;
    }
    y += gap;
  };

  const heading = (t: string) => {
    ensure(28);
    y += 6;
    writeText(t, 14, true, 4);
    doc.setDrawColor(200);
    doc.line(margin, y - 2, margin + 60, y - 2);
    y += 4;
  };

  // Title
  writeText(data.lessonTitle, 20, true, 4);
  const sub = [data.courseTitle, data.estimatedMinutes ? `~${data.estimatedMinutes} min` : null]
    .filter(Boolean)
    .join(" · ");
  if (sub) writeText(sub, 10, false, 12);

  if (sections.has("reading")) {
    if (data.theory) {
      heading("Reading");
      writeText(stripMd(data.theory), 11);
    }
    if (data.keyNotes) {
      heading("Key notes");
      writeText(stripMd(data.keyNotes), 11);
    }
  }
  if (sections.has("qa") && data.examples && data.examples.length) {
    heading("Worked examples");
    data.examples.forEach((ex, i) => {
      writeText(`Example ${i + 1}${ex.title ? `: ${ex.title}` : ""}`, 12, true, 2);
      if (ex.body) writeText(stripMd(ex.body), 11);
    });
  }
  if (sections.has("practice") && data.practice && data.practice.length) {
    heading("Practice (Q&A)");
    data.practice.forEach((p, i) => {
      writeText(`Q${i + 1}. ${p.prompt ?? ""}`, 11, true, 2);
      if (p.answer) writeText(`A: ${stripMd(p.answer)}`, 11);
    });
  }
  if (sections.has("notes") && data.notes && data.notes.trim()) {
    heading("My notes");
    writeText(data.notes.trim(), 11);
  }

  const safe = data.lessonTitle.replace(/[^a-z0-9]+/gi, "-").slice(0, 60);
  doc.save(`${safe || "lesson"}.pdf`);
}

