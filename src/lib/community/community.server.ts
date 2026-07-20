// Shared server-only helpers for the Community Engine.
// Imported only by community/*.functions.ts handlers.

export async function callCommunityAI(system: string, user: string, jsonMode = true): Promise<string> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
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
  return payload.choices?.[0]?.message?.content ?? "";
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
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || `c-${Math.random().toString(36).slice(2, 8)}`;
}

export const COMMUNITY_CATEGORIES = [
  "school", "college", "programming", "ai-ml", "data-science",
  "cloud", "cybersecurity", "ui-ux", "career", "placement",
  "entrepreneurship", "research", "general",
] as const;

export type CommunityCategory = typeof COMMUNITY_CATEGORIES[number];
