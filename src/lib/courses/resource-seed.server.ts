// Server-only helpers to seed per-course resources.
//
// Strategy: for each course we insert a small bundle of resource rows into
// `public.resources`. Whenever the course title matches an entry in the
// existing marketing resource library (`src/lib/resources/catalog.ts`), the
// resource URLs point at the existing reader pages so we reuse content
// instead of duplicating it. Otherwise the row still renders in the course
// detail page as an AI-generated stub.

import { COURSE_CATALOG, type CourseCatalogEntry } from "@/lib/resources/catalog";

type ResourceKind =
  | "notes"
  | "pdf"
  | "worksheet"
  | "formula_sheet"
  | "question_bank"
  | "pyq"
  | "mindmap"
  | "cheatsheet";

export type ResourceSeed = {
  kind: ResourceKind;
  title: string;
  description: string;
  url: string | null;
  order_index: number;
};

// Kinds to seed per course (limited by the DB enum).
const DEFAULT_KINDS: Array<{ kind: ResourceKind; suffix: string; blurb: string }> = [
  { kind: "notes", suffix: "Notes", blurb: "Concise topic notes and mental models." },
  { kind: "cheatsheet", suffix: "Cheat Sheet", blurb: "One-page quick reference." },
  { kind: "mindmap", suffix: "Mind Map", blurb: "Visual map of the key ideas and how they connect." },
  { kind: "question_bank", suffix: "Practice Questions", blurb: "Hands-on problems with worked solutions." },
  { kind: "pyq", suffix: "Interview Questions", blurb: "Common interview questions and answer frameworks." },
  { kind: "pdf", suffix: "Reference PDF", blurb: "Downloadable long-form reference." },
];

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/**
 * Find the best-matching existing library entry for a course title. Returns
 * null when nothing usable exists so the caller can fall back to an
 * AI-generated stub without a reader URL.
 */
export function matchLibraryEntry(courseTitle: string): CourseCatalogEntry | null {
  const t = norm(courseTitle);
  if (!t) return null;

  // Direct token containment: entry title/slug appears in course title or vice versa.
  let best: { entry: CourseCatalogEntry; score: number } | null = null;
  for (const entry of COURSE_CATALOG) {
    const et = norm(entry.title);
    const es = norm(entry.slug.replace(/-/g, " "));
    let score = 0;
    if (t === et || t === es) score = 100;
    else if (t.includes(et) || et.includes(t)) score = 80;
    else if (t.includes(es) || es.includes(t)) score = 70;
    else {
      const tokens = et.split(" ").filter((x) => x.length > 2);
      const hits = tokens.filter((tok) => t.includes(tok)).length;
      if (hits && hits === tokens.length) score = 60;
      else if (hits >= 2) score = 40 + hits;
    }
    if (score > 0 && (!best || score > best.score)) best = { entry, score };
  }
  return best && best.score >= 40 ? best.entry : null;
}

/**
 * Build a resource seed bundle for a given course title. When we have a
 * matching library entry, the URL points at the public reader page; the
 * card will link users straight to existing PDF Notes / Cheat Sheet / etc.
 */
export function buildResourceSeeds(courseTitle: string): ResourceSeed[] {
  const match = matchLibraryEntry(courseTitle);
  return DEFAULT_KINDS.map((k, i) => {
    // Map DB kind → best reader slug variant using the library's URL scheme:
    // /resources/read/<courseSlug>-<kind-slug>
    let url: string | null = null;
    if (match) {
      const kindSlug =
        k.kind === "notes"
          ? "pdf-notes"
          : k.kind === "cheatsheet"
            ? "cheat-sheet"
            : k.kind === "question_bank"
              ? "practice-questions"
              : k.kind === "pyq"
                ? "interview-questions"
                : k.kind === "mindmap"
                  ? "learning-roadmap"
                  : k.kind === "pdf"
                    ? "reference-guide"
                    : "notes";
      url = `/resources/read/${match.slug}-${kindSlug}`;
    }
    return {
      kind: k.kind,
      title: `${courseTitle} — ${k.suffix}`,
      description: k.blurb,
      url,
      order_index: i,
    };
  });
}
