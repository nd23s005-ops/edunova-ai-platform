// AI-generated dashboard brief: featured courses, recommendations, categories, etc.
// Role-specific prompts guarantee different content across dashboards.

import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callGatewayJSON, safeParse } from "@/lib/ai/engine/ai.server";
import { z } from "zod";

export type BriefItem = { title: string; description: string; tag?: string };
export type DashboardBrief = {
  featuredCourses: BriefItem[];
  recommendedLearning: BriefItem[];
  trendingTopics: BriefItem[];
  weeklyGoals: BriefItem[];
  learningSuggestions: BriefItem[];
  practiceRecommendations: BriefItem[];
  skillHighlights: BriefItem[];
  progressInsights: BriefItem[];
  categories: BriefItem[];
};

const ROLE_GUIDANCE: Record<string, string> = {
  student:
    "K-12 school student following CBSE / ICSE / state boards. Focus on subjects (Math, Science, English, Social Studies, Computers, Languages), exam prep, and beginner friendly learning. Categories should be school subjects and learning types.",
  college_student:
    "College undergraduate. Focus on Programming, Computer Science fundamentals, Projects, Placement preparation, Research, Technical Skills, DSA, System Design. Categories should be technical tracks.",
  professional:
    "Working professional upskilling. Focus on Certifications, Industry Skills, Career Growth, Leadership, AI, Cloud, DevOps, Analytics, Product, Data. Categories should be industry-relevant upskilling tracks.",
};

function fallback(role: string): DashboardBrief {
  const g = role === "student"
    ? ["Mathematics", "Science", "English", "Social Studies", "Computers", "Languages"]
    : role === "college_student"
      ? ["Programming", "Data Structures", "System Design", "Placement Prep", "Projects", "Research"]
      : ["AI & ML", "Cloud", "DevOps", "Leadership", "Analytics", "Product"];
  const items = g.map((t) => ({ title: t, description: `Explore ${t}.` }));
  return {
    featuredCourses: items.slice(0, 4),
    recommendedLearning: items.slice(0, 4),
    trendingTopics: items.slice(0, 4),
    weeklyGoals: [{ title: "Study 3 hours", description: "Set aside focused time this week." }],
    learningSuggestions: items.slice(0, 3),
    practiceRecommendations: items.slice(0, 3),
    skillHighlights: items.slice(0, 3),
    progressInsights: [{ title: "Stay consistent", description: "Daily short sessions beat cramming." }],
    categories: items,
  };
}

const Input = z.object({ role: z.string(), interests: z.string().optional() });

export const generateDashboardBrief = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data, context }): Promise<DashboardBrief> => {
    const { userId, supabase } = context;
    const roleKey = data.role;
    const cacheKey = `dashboard_brief:${roleKey}`;

    // Try cache in ai_insights (payload stored as JSON in `body`)
    try {
      const { data: cached } = await supabase
        .from("ai_insights")
        .select("body, generated_at")
        .eq("scope_type", "user")
        .eq("scope_id", userId)
        .eq("kind", cacheKey)
        .order("generated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (cached?.body && cached.generated_at) {
        const age = Date.now() - new Date(cached.generated_at as string).getTime();
        if (age < 12 * 60 * 60 * 1000) {
          const parsed = safeParse<DashboardBrief>(cached.body as string);
          if (parsed) return parsed;
        }
      }
    } catch {
      // ignore cache miss
    }

    const guidance = ROLE_GUIDANCE[roleKey] ?? ROLE_GUIDANCE.professional;
    const system =
      "You generate personalized learning dashboards. Reply ONLY with JSON. Each field is an array of 4-6 items. Each item has: title (string), description (short, 1 sentence), and optional tag. Keep items varied and specific.";
    const user = `Learner profile: ${guidance}\nInterests (optional): ${data.interests ?? "(none)"}\n\nProduce a JSON object with EXACTLY these keys, each an array of items:\n{\n  "featuredCourses": [],\n  "recommendedLearning": [],\n  "trendingTopics": [],\n  "weeklyGoals": [],\n  "learningSuggestions": [],\n  "practiceRecommendations": [],\n  "skillHighlights": [],\n  "progressInsights": [],\n  "categories": []\n}\nMake content specific to the learner profile above; DO NOT reuse the same items across sections.`;

    let brief: DashboardBrief;
    try {
      const raw = await callGatewayJSON(system, user);
      const parsed = safeParse<Partial<DashboardBrief>>(raw);
      const arr = (v: unknown): BriefItem[] =>
        Array.isArray(v)
          ? (v as unknown[])
              .filter((x): x is Record<string, unknown> => typeof x === "object" && x !== null)
              .map((x) => ({
                title: String((x as { title?: unknown }).title ?? "").slice(0, 120),
                description: String((x as { description?: unknown }).description ?? "").slice(0, 240),
                tag: (x as { tag?: unknown }).tag ? String((x as { tag?: unknown }).tag).slice(0, 40) : undefined,
              }))
              .filter((x) => x.title)
          : [];
      brief = {
        featuredCourses: arr(parsed?.featuredCourses),
        recommendedLearning: arr(parsed?.recommendedLearning),
        trendingTopics: arr(parsed?.trendingTopics),
        weeklyGoals: arr(parsed?.weeklyGoals),
        learningSuggestions: arr(parsed?.learningSuggestions),
        practiceRecommendations: arr(parsed?.practiceRecommendations),
        skillHighlights: arr(parsed?.skillHighlights),
        progressInsights: arr(parsed?.progressInsights),
        categories: arr(parsed?.categories),
      };
      // Ensure no section is empty
      const fb = fallback(roleKey);
      (Object.keys(brief) as (keyof DashboardBrief)[]).forEach((k) => {
        if (!brief[k]?.length) brief[k] = fb[k];
      });
    } catch {
      brief = fallback(roleKey);
    }

    // Best-effort cache write
    try {
      await supabase.from("ai_insights").insert({
        scope_type: "user",
        scope_id: userId,
        kind: cacheKey,
        title: "Dashboard brief",
        body: JSON.stringify(brief),
      });
    } catch {
      // ignore
    }

    return brief;
  });
