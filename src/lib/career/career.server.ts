// Shared server-only helpers for the Career Engine.
// This module is imported by career/*.functions.ts handlers only.

export async function callCareerAI(system: string, user: string): Promise<string> {
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
    if (res.status === 429) throw new Error("AI is busy — please retry.");
    if (res.status === 402) throw new Error("AI credits exhausted.");
    throw new Error(`AI error (${res.status}): ${t.slice(0, 200)}`);
  }
  const payload = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return payload.choices?.[0]?.message?.content ?? "{}";
}

export function safeJson<T = unknown>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    const stripped = raw.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
    try { return JSON.parse(stripped) as T; } catch { return null; }
  }
}

export function slugify(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}

export function readinessFromSections(sections: Record<string, unknown> | null | undefined): number {
  if (!sections) return 0;
  const keys = ["personal", "objective", "education", "skills", "experience", "projects", "certifications"];
  const filled = keys.reduce((n, k) => {
    const v = sections[k];
    if (Array.isArray(v)) return n + (v.length > 0 ? 1 : 0);
    if (typeof v === "string") return n + (v.trim().length > 0 ? 1 : 0);
    if (v && typeof v === "object") return n + (Object.keys(v as object).length > 0 ? 1 : 0);
    return n;
  }, 0);
  return Math.round((filled / keys.length) * 100);
}

/** Adapter interface — enables LinkedIn/Indeed/Naukri/Internshala later without route churn. */
export type OpportunitySourceAdapter = {
  id: string;
  displayName: string;
  fetchJobs?: (query: { skills: string[]; location?: string }) => Promise<unknown[]>;
  fetchInternships?: (query: { skills: string[]; location?: string }) => Promise<unknown[]>;
};
export const OPPORTUNITY_ADAPTERS: OpportunitySourceAdapter[] = [
  { id: "ai", displayName: "Nova AI Curator" },
];
