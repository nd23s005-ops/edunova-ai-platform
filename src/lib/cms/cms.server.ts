// Server-only helpers for the CMS engine. Kept out of *.functions.ts so
// tss-serverfn-split does not drop sibling declarations.
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type ContentStatus = Database["public"]["Enums"]["content_status"];
export type CourseVisibility = Database["public"]["Enums"]["course_visibility"];
export type AuditAction = Database["public"]["Enums"]["audit_action"];
export type ResourceKind = Database["public"]["Enums"]["learning_resource_kind"];

export const RESOURCE_KINDS: ResourceKind[] = [
  "beginner_guide",
  "roadmap",
  "notes",
  "revision_notes",
  "cheat_sheet",
  "documentation",
  "practice_questions",
  "interview_questions",
  "assignment",
  "mini_project",
  "major_project",
  "case_study",
  "faq",
  "glossary",
  "reference",
  "downloadable",
];

export const RESOURCE_KIND_LABEL: Record<ResourceKind, string> = {
  beginner_guide: "Beginner Guide",
  roadmap: "Learning Roadmap",
  notes: "PDF Notes",
  revision_notes: "Quick Revision Notes",
  cheat_sheet: "Cheat Sheet",
  documentation: "Documentation",
  practice_questions: "Practice Questions",
  interview_questions: "Interview Questions",
  assignment: "Assignment",
  mini_project: "Mini Project",
  major_project: "Major Project",
  case_study: "Case Study",
  faq: "FAQ",
  glossary: "Glossary",
  reference: "Reference Material",
  downloadable: "Downloadable Asset",
};

export const CONTENT_STATUSES: ContentStatus[] = [
  "draft",
  "review",
  "approved",
  "published",
  "archived",
];

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function callCmsGatewayJSON(system: string, user: string): Promise<string> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    if (res.status === 429) throw new Error("AI is busy right now. Please try again in a minute.");
    if (res.status === 402) throw new Error("AI credits are exhausted. Add credits in workspace billing.");
    throw new Error(`AI error (${res.status}): ${t.slice(0, 200)}`);
  }
  const payload = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return payload.choices?.[0]?.message?.content ?? "{}";
}

export function safeJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    const m = raw.match(/```json\s*([\s\S]*?)```/);
    if (m) {
      try {
        return JSON.parse(m[1]) as T;
      } catch {
        // fall through
      }
    }
    return fallback;
  }
}

export type GeneratedCurriculum = {
  learning_outcomes: string[];
  prerequisites: string[];
  learning_objectives: string[];
  modules: {
    title: string;
    description: string;
    chapters: {
      title: string;
      description: string;
      lessons: {
        title: string;
        summary: string;
        objectives: string[];
        key_takeaways: string[];
      }[];
    }[];
  }[];
  suggested_projects: string[];
  practice_activities: string[];
  final_capstone: string;
};

export function emptyCurriculum(): GeneratedCurriculum {
  return {
    learning_outcomes: [],
    prerequisites: [],
    learning_objectives: [],
    modules: [],
    suggested_projects: [],
    practice_activities: [],
    final_capstone: "",
  };
}

export function buildCurriculumPrompt(params: {
  title: string;
  category: string | null;
  subcategory: string | null;
  difficulty: string | null;
  audience: string | null;
  hours: number | null;
}): { system: string; user: string } {
  const bits = [
    `Course title: ${params.title}.`,
    params.category ? `Category: ${params.category}.` : "",
    params.subcategory ? `Track: ${params.subcategory}.` : "",
    params.audience ? `Audience: ${params.audience}.` : "",
    params.difficulty ? `Target difficulty: ${params.difficulty}.` : "",
    params.hours ? `Estimated total hours: ${params.hours}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const system = `You are the curriculum author for EduNova AI. Design a complete, beginner-to-industry-ready course.
${bits}
Produce 4-8 modules. Each module has 2-5 chapters. Each chapter has 2-6 lessons.
For every lesson include 2-4 objectives and 2-4 key_takeaways. Use plain language for learners.
Return STRICT JSON with this exact shape:
{
  "learning_outcomes": ["..."],
  "prerequisites": ["..."],
  "learning_objectives": ["..."],
  "modules": [
    {
      "title": "...",
      "description": "...",
      "chapters": [
        {
          "title": "...",
          "description": "...",
          "lessons": [
            { "title": "...", "summary": "...", "objectives": ["..."], "key_takeaways": ["..."] }
          ]
        }
      ]
    }
  ],
  "suggested_projects": ["..."],
  "practice_activities": ["..."],
  "final_capstone": "..."
}
No commentary. No markdown. JSON object only.`;
  return { system, user: "Generate the curriculum now." };
}

export type GeneratedLessonContent = {
  overview: string;
  concept: string;
  step_by_step: string[];
  examples: string[];
  best_practices: string[];
  visuals: string[];
  code_examples: { language: string; snippet: string; explanation: string }[];
  exercises: string[];
  summary: string;
  key_takeaways: string[];
};

export function buildLessonContentPrompt(params: {
  courseTitle: string;
  chapterTitle: string;
  lessonTitle: string;
  audience: string | null;
}): { system: string; user: string } {
  const system = `You are the lesson author for EduNova AI. Write publishable teaching content.
Course: ${params.courseTitle}. Chapter: ${params.chapterTitle}. Lesson: ${params.lessonTitle}.
${params.audience ? `Audience: ${params.audience}.` : ""}
Include code examples ONLY when the topic is technical.
Return STRICT JSON:
{
  "overview": "2-3 sentence overview",
  "concept": "1-2 paragraphs explaining the core concept",
  "step_by_step": ["3-7 concrete steps"],
  "examples": ["2-4 real-world examples"],
  "best_practices": ["3-6 industry best practices"],
  "visuals": ["2-4 visual learning suggestions"],
  "code_examples": [{"language":"...","snippet":"...","explanation":"..."}],
  "exercises": ["2-4 interactive exercises"],
  "summary": "3-5 sentence summary",
  "key_takeaways": ["3-6 key takeaways"]
}
No commentary. No markdown fences. JSON only.`;
  return { system, user: "Write the lesson now." };
}

export type GeneratedResources = {
  items: { kind: ResourceKind; title: string; summary: string; content: string }[];
};

export function buildResourcesPrompt(params: {
  courseTitle: string;
  kinds: ResourceKind[];
}): { system: string; user: string } {
  const system = `You author learning resources for EduNova AI.
For the course "${params.courseTitle}", generate ONE resource for each kind listed below.
Kinds: ${params.kinds.join(", ")}.
Return STRICT JSON:
{"items":[{"kind":"<one of the kinds>","title":"...","summary":"1-2 sentences","content":"markdown body with headings and bullets"}]}
No commentary. JSON only.`;
  return { system, user: "Generate the resources now." };
}

export async function writeAudit(
  supabase: SupabaseClient<Database>,
  actorId: string | null,
  action: AuditAction,
  entityType: string,
  entityId: string | null,
  metadata: Record<string, unknown> = {},
): Promise<void> {
  await supabase.from("admin_audit_logs").insert({
    actor_id: actorId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    metadata: metadata as never,
  });
}
