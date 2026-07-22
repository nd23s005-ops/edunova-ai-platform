// AI-generated College Student Dashboard brief.
// Distinct from generic dashboard-brief: focused on coding, placements,
// projects, interviews, hackathons — everything a CS undergrad needs.

import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callGatewayJSON, safeParse } from "@/lib/ai/engine/ai.server";

export type BriefEntry = {
  title: string;
  meta?: string;
  detail?: string;
  tag?: string;
};

export type CollegeBrief = {
  headline: string;
  focusOfTheDay: string;
  productivityScore: number;
  codingStreakDays: number;
  dsaSolvedThisWeek: number;
  semesterProgressPct: number;
  aiRecommendations: BriefEntry[];
  codingChallenges: BriefEntry[];
  dsaProblems: BriefEntry[];
  projectIdeas: BriefEntry[];
  interviewQuestions: BriefEntry[];
  hackathons: BriefEntry[];
  openSource: BriefEntry[];
  weeklyChallenges: BriefEntry[];
  studyPlan: BriefEntry[];
  careerGuidance: BriefEntry[];
  notifications: BriefEntry[];
  companySpotlight: BriefEntry[];
  roadmapPhases: BriefEntry[];
  skillRadar: { skill: string; level: number }[];
};

function arr(v: unknown): BriefEntry[] {
  if (!Array.isArray(v)) return [];
  return (v as unknown[])
    .filter((x): x is Record<string, unknown> => typeof x === "object" && x !== null)
    .map((x) => ({
      title: String((x as { title?: unknown }).title ?? "").slice(0, 140),
      meta: (x as { meta?: unknown }).meta ? String((x as { meta?: unknown }).meta).slice(0, 60) : undefined,
      detail: (x as { detail?: unknown }).detail ? String((x as { detail?: unknown }).detail).slice(0, 280) : undefined,
      tag: (x as { tag?: unknown }).tag ? String((x as { tag?: unknown }).tag).slice(0, 40) : undefined,
    }))
    .filter((x) => x.title);
}

function skills(v: unknown): { skill: string; level: number }[] {
  if (!Array.isArray(v)) return [];
  return (v as unknown[])
    .map((x) => {
      const o = x as { skill?: unknown; level?: unknown };
      const skill = String(o?.skill ?? "").slice(0, 40);
      const level = Math.max(0, Math.min(100, Math.round(Number(o?.level ?? 0)) || 0));
      return { skill, level };
    })
    .filter((s) => s.skill);
}

function fallback(): CollegeBrief {
  const e = (title: string, detail?: string, meta?: string, tag?: string): BriefEntry => ({ title, detail, meta, tag });
  return {
    headline: "Ship one lesson, one problem, one commit today.",
    focusOfTheDay: "45 min DSA + 30 min system design",
    productivityScore: 72,
    codingStreakDays: 5,
    dsaSolvedThisWeek: 12,
    semesterProgressPct: 48,
    aiRecommendations: [
      e("Deepen Graphs this week", "You've solved 8 tree problems — graphs unlock DP-on-graphs and system design.", "priority", "high"),
      e("Wire up a Postgres side project", "Bridges DBMS theory to placement projects.", "next up"),
    ],
    codingChallenges: [
      e("Rate limiter in TypeScript", "Sliding-window log approach, add unit tests.", "medium"),
      e("URL shortener", "Base62 encoding + collision handling.", "easy"),
    ],
    dsaProblems: [
      e("Word Ladder", "BFS on implicit graph — classic pattern.", "graphs", "medium"),
      e("Kth largest in stream", "Min-heap of size k.", "heaps", "easy"),
    ],
    projectIdeas: [
      e("Real-time notes with CRDTs", "Learn conflict-free replication + WebSockets.", "full-stack"),
      e("Face-attendance kiosk", "OpenCV + FastAPI + Postgres.", "ML"),
    ],
    interviewQuestions: [
      e("Design Instagram Stories", "Focus on fan-out, CDN, TTL storage.", "system design"),
      e("SQL vs NoSQL trade-offs", "Consistency, indexing, sharding.", "dbms"),
    ],
    hackathons: [
      e("Smart India Hackathon", "Registrations open — pick a problem statement.", "national"),
      e("HackMIT online track", "Global, remote friendly.", "global"),
    ],
    openSource: [
      e("good-first-issue: docs typo", "Great for your first PR.", "beginner"),
      e("Add TS types to a helper", "10-line change, huge learning.", "beginner"),
    ],
    weeklyChallenges: [
      e("Solve 15 DSA problems", "Mix of medium + hard.", "weekly"),
      e("Ship a mini project", "End-to-end, deployed.", "weekly"),
    ],
    studyPlan: [
      e("Mon: DSA + OS", "Trees + Process scheduling."),
      e("Tue: Web + DBMS", "React state + Normalisation."),
    ],
    careerGuidance: [
      e("Target 3 companies this month", "Study their stack and past interview loops.", "focus"),
      e("Build a public GitHub profile", "Pinned repos + README.", "brand"),
    ],
    notifications: [
      e("Mid-sem in 12 days", "Revise DS unit tests.", "reminder"),
      e("Google Kickstart round soon", "Practice competitive style.", "event"),
    ],
    companySpotlight: [
      e("Google — SWE Intern loop", "3× DSA rounds + 1× behavioural.", "spotlight"),
    ],
    roadmapPhases: [
      e("Foundation", "Master core CS, one language deeply.", "phase 1"),
      e("Intermediate", "DSA + one framework + first project.", "phase 2"),
      e("Advanced", "System design + 2 shipped projects.", "phase 3"),
      e("Placement Ready", "Company-wise prep + mock loops.", "phase 4"),
      e("Industry Ready", "Open source + internships.", "phase 5"),
    ],
    skillRadar: [
      { skill: "DSA", level: 60 },
      { skill: "System Design", level: 30 },
      { skill: "Frontend", level: 55 },
      { skill: "Backend", level: 45 },
      { skill: "DBMS", level: 50 },
      { skill: "DevOps", level: 25 },
    ],
  };
}

export const generateCollegeBrief = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<CollegeBrief> => {
    const { userId, supabase } = context;
    const cacheKey = "college_brief:v1";

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
          const parsed = safeParse<CollegeBrief>(cached.body as string);
          if (parsed) return parsed;
        }
      }
    } catch {
      /* ignore */
    }

    const system =
      "You are an AI mentor for a Computer Science undergraduate. Generate a JSON dashboard brief tailored to placements, DSA, system design, projects, open source and hackathons. Reply with JSON ONLY, no prose.";
    const user = `Return this JSON shape exactly. Every array should have 4-6 items with fields title, detail (1 sentence), and optional meta and tag. Vary content across arrays.\n{\n  "headline": "one-line motivational focus for today",\n  "focusOfTheDay": "concrete short focus block",\n  "productivityScore": 0-100,\n  "codingStreakDays": 0-30,\n  "dsaSolvedThisWeek": 0-50,\n  "semesterProgressPct": 0-100,\n  "aiRecommendations": [],\n  "codingChallenges": [],\n  "dsaProblems": [],\n  "projectIdeas": [],\n  "interviewQuestions": [],\n  "hackathons": [],\n  "openSource": [],\n  "weeklyChallenges": [],\n  "studyPlan": [],\n  "careerGuidance": [],\n  "notifications": [],\n  "companySpotlight": [],\n  "roadmapPhases": [ {"title": "Foundation", "detail": "..."}, {"title": "Intermediate"}, {"title": "Advanced"}, {"title": "Placement Ready"}, {"title": "Industry Ready"} ],\n  "skillRadar": [ {"skill": "DSA", "level": 0-100}, {"skill": "System Design"}, {"skill": "Frontend"}, {"skill": "Backend"}, {"skill": "DBMS"}, {"skill": "DevOps"} ]\n}`;

    let brief: CollegeBrief;
    try {
      const raw = await callGatewayJSON(system, user);
      const parsed = safeParse<Partial<CollegeBrief>>(raw) ?? {};
      const fb = fallback();
      brief = {
        headline: String(parsed.headline ?? fb.headline).slice(0, 160),
        focusOfTheDay: String(parsed.focusOfTheDay ?? fb.focusOfTheDay).slice(0, 160),
        productivityScore: Math.max(0, Math.min(100, Math.round(Number(parsed.productivityScore ?? fb.productivityScore)) || fb.productivityScore)),
        codingStreakDays: Math.max(0, Math.min(365, Math.round(Number(parsed.codingStreakDays ?? fb.codingStreakDays)) || fb.codingStreakDays)),
        dsaSolvedThisWeek: Math.max(0, Math.min(200, Math.round(Number(parsed.dsaSolvedThisWeek ?? fb.dsaSolvedThisWeek)) || fb.dsaSolvedThisWeek)),
        semesterProgressPct: Math.max(0, Math.min(100, Math.round(Number(parsed.semesterProgressPct ?? fb.semesterProgressPct)) || fb.semesterProgressPct)),
        aiRecommendations: arr(parsed.aiRecommendations),
        codingChallenges: arr(parsed.codingChallenges),
        dsaProblems: arr(parsed.dsaProblems),
        projectIdeas: arr(parsed.projectIdeas),
        interviewQuestions: arr(parsed.interviewQuestions),
        hackathons: arr(parsed.hackathons),
        openSource: arr(parsed.openSource),
        weeklyChallenges: arr(parsed.weeklyChallenges),
        studyPlan: arr(parsed.studyPlan),
        careerGuidance: arr(parsed.careerGuidance),
        notifications: arr(parsed.notifications),
        companySpotlight: arr(parsed.companySpotlight),
        roadmapPhases: arr(parsed.roadmapPhases),
        skillRadar: skills(parsed.skillRadar),
      };
      (Object.keys(brief) as (keyof CollegeBrief)[]).forEach((k) => {
        const v = brief[k];
        if (Array.isArray(v) && v.length === 0) {
          (brief as Record<string, unknown>)[k] = (fb as Record<string, unknown>)[k];
        }
      });
    } catch {
      brief = fallback();
    }

    try {
      await supabase.from("ai_insights").insert({
        scope_type: "user",
        scope_id: userId,
        kind: cacheKey,
        title: "College dashboard brief",
        body: JSON.stringify(brief),
      });
    } catch {
      /* ignore */
    }
    return brief;
  });
