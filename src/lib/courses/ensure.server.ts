// Server-only helpers for materializing catalog courses and seeding AI skeletons.

import { callGatewayJSON, safeParse } from "@/lib/ai/engine/ai.server";
import { findCatalogCourse, type CatalogCourse } from "./catalog";

export function getCatalogEntry(slug: string): CatalogCourse | null {
  return findCatalogCourse(slug);
}

type SkeletonChapter = {
  title: string;
  intro: string;
  summary: string;
  lessons: { title: string; key_notes: string; objectives: string[] }[];
};

const SKELETON_SYSTEM = `You are a curriculum architect. Return STRICT JSON only.
Schema:
{
  "chapters": [
    {
      "title": "string",
      "intro": "1-2 sentence introduction",
      "summary": "1-2 sentence summary of what learners take away",
      "lessons": [
        { "title": "string", "key_notes": "3-5 short bullet-style notes joined by '; '", "objectives": ["...", "..."] }
      ]
    }
  ]
}
Rules:
- Exactly 6 chapters, each with exactly 4 lessons.
- Titles are concise (max 80 chars) and progressive.
- Lessons build on each other; no duplicates.
- No prose outside JSON. No markdown fences.`;

export async function generateSkeleton(course: CatalogCourse): Promise<SkeletonChapter[]> {
  const user = `Design a course skeleton for:
Title: ${course.title}
Subject: ${course.subject}
Audience: ${course.class_min >= 20 ? "working professionals" : course.class_min >= 13 ? "undergraduate students" : `Class ${course.class_min} school students`}
Difficulty: ${course.difficulty}
Estimated hours: ${course.estimated_hours}
Overview: ${course.description}
Objectives: ${course.learning_objectives.join(" | ")}`;

  const raw = await callGatewayJSON(SKELETON_SYSTEM, user);
  const parsed = safeParse<{ chapters?: SkeletonChapter[] }>(raw);
  const chapters = parsed?.chapters;
  if (!chapters || !Array.isArray(chapters) || chapters.length === 0) {
    // Fallback deterministic skeleton so course pages are never empty.
    return Array.from({ length: 6 }).map((_, i) => ({
      title: `Module ${i + 1}: ${course.subject} — Part ${i + 1}`,
      intro: `Introduction to key ideas in ${course.subject} for module ${i + 1}.`,
      summary: `You now understand foundational concepts for module ${i + 1} of ${course.subject}.`,
      lessons: Array.from({ length: 4 }).map((_, j) => ({
        title: `Lesson ${i + 1}.${j + 1}`,
        key_notes: "Core concept; worked example; practice; recap",
        objectives: ["Understand the concept", "Apply through examples"],
      })),
    }));
  }
  return chapters.slice(0, 8).map((ch) => ({
    title: String(ch.title ?? "Untitled chapter").slice(0, 200),
    intro: String(ch.intro ?? "").slice(0, 600),
    summary: String(ch.summary ?? "").slice(0, 600),
    lessons: (Array.isArray(ch.lessons) ? ch.lessons : []).slice(0, 6).map((l) => ({
      title: String(l.title ?? "Untitled lesson").slice(0, 200),
      key_notes: String(l.key_notes ?? "").slice(0, 800),
      objectives: Array.isArray(l.objectives)
        ? l.objectives.filter((x) => typeof x === "string").slice(0, 6)
        : [],
    })),
  }));
}
