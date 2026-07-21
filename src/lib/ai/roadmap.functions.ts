// AI Learning Roadmap generator + persistence.
import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callGatewayJSON, safeParse } from "@/lib/ai/engine/ai.server";
import { z } from "zod";

export type RoadmapPhase = {
  name: string;
  duration: string;
  focus: string;
  courses: string[];
  milestones: string[];
  practice: string[];
  assessments: string[];
  resources: string[];
  checkpoint: string;
};

export type RoadmapPlan = {
  summary: string;
  totalWeeks: number;
  phases: RoadmapPhase[];
  weeklyMilestones: string[];
};

const Input = z.object({
  goal: z.string().min(3),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  weeklyHours: z.number().int().min(1).max(80),
  targetDate: z.string().optional(),
  interests: z.string().optional(),
  role: z.string().optional(),
});

function fallback(goal: string): RoadmapPlan {
  return {
    summary: `A personalized roadmap towards: ${goal}.`,
    totalWeeks: 8,
    phases: [
      {
        name: "Foundations",
        duration: "Weeks 1-2",
        focus: "Build core understanding.",
        courses: ["Intro course"],
        milestones: ["Complete foundational lessons"],
        practice: ["Daily 20-min drills"],
        assessments: ["Foundation quiz"],
        resources: ["Notes", "Cheatsheet"],
        checkpoint: "Explain the basics in your own words.",
      },
      {
        name: "Deep dive",
        duration: "Weeks 3-5",
        focus: "Master intermediate concepts.",
        courses: ["Core skills"],
        milestones: ["Ship a small project"],
        practice: ["Weekly challenges"],
        assessments: ["Mid-plan test"],
        resources: ["Practice bank"],
        checkpoint: "Score ≥70% on the mid-plan test.",
      },
      {
        name: "Apply & assess",
        duration: "Weeks 6-8",
        focus: "Consolidate through projects.",
        courses: ["Capstone track"],
        milestones: ["Complete capstone"],
        practice: ["Mock scenarios"],
        assessments: ["Final assessment"],
        resources: ["Interview questions"],
        checkpoint: "Present your capstone.",
      },
    ],
    weeklyMilestones: [
      "Week 1: Complete foundational reading.",
      "Week 2: First quiz.",
      "Week 3: Kick off a mini project.",
      "Week 4: Peer review.",
      "Week 5: Mid-plan assessment.",
      "Week 6: Start capstone.",
      "Week 7: Iterate on capstone.",
      "Week 8: Final assessment and reflection.",
    ],
  };
}

export const generateRoadmap = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data, context }): Promise<{ id: string; plan: RoadmapPlan }> => {
    const { userId, supabase } = context;
    const system =
      "You are an expert learning coach. Reply ONLY with strict JSON. Design a realistic, motivating roadmap tailored to the learner. Do not include markdown fences.";
    const user = `Learner details:
- Goal: ${data.goal}
- Current level: ${data.level}
- Available weekly hours: ${data.weeklyHours}
- Target completion date: ${data.targetDate ?? "flexible"}
- Interests: ${data.interests ?? "none specified"}
- Role: ${data.role ?? "learner"}

Return JSON with this shape:
{
  "summary": "1-2 sentences",
  "totalWeeks": number,
  "phases": [
    {
      "name": "Phase name",
      "duration": "Weeks 1-2",
      "focus": "1 sentence",
      "courses": ["course names"],
      "milestones": ["specific goals"],
      "practice": ["practice items"],
      "assessments": ["assessment items"],
      "resources": ["resource types"],
      "checkpoint": "how to know you passed this phase"
    }
  ],
  "weeklyMilestones": ["Week 1: ...", "Week 2: ...", ...]
}
3 to 5 phases. Make it specific to the learner's goal and level.`;

    let plan: RoadmapPlan;
    try {
      const raw = await callGatewayJSON(system, user);
      const parsed = safeParse<Partial<RoadmapPlan>>(raw);
      if (parsed && Array.isArray(parsed.phases) && parsed.phases.length > 0) {
        plan = {
          summary: String(parsed.summary ?? ""),
          totalWeeks: Number(parsed.totalWeeks ?? 8),
          phases: parsed.phases.map((p) => ({
            name: String(p?.name ?? "Phase"),
            duration: String(p?.duration ?? ""),
            focus: String(p?.focus ?? ""),
            courses: Array.isArray(p?.courses) ? p.courses.map(String) : [],
            milestones: Array.isArray(p?.milestones) ? p.milestones.map(String) : [],
            practice: Array.isArray(p?.practice) ? p.practice.map(String) : [],
            assessments: Array.isArray(p?.assessments) ? p.assessments.map(String) : [],
            resources: Array.isArray(p?.resources) ? p.resources.map(String) : [],
            checkpoint: String(p?.checkpoint ?? ""),
          })),
          weeklyMilestones: Array.isArray(parsed.weeklyMilestones)
            ? parsed.weeklyMilestones.map(String)
            : [],
        };
      } else {
        plan = fallback(data.goal);
      }
    } catch {
      plan = fallback(data.goal);
    }

    const { data: row, error } = await supabase
      .from("learning_roadmaps")
      .insert({
        user_id: userId,
        role: data.role ?? null,
        goal: data.goal,
        level: data.level,
        weekly_hours: data.weeklyHours,
        target_date: data.targetDate ?? null,
        interests: data.interests ?? null,
        plan: JSON.parse(JSON.stringify(plan)),
      })
      .select("id")
      .single();
    if (error) throw error;
    return { id: row.id as string, plan };
  });

export const listRoadmaps = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("learning_roadmaps")
      .select("id, goal, level, weekly_hours, target_date, created_at, plan")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) throw error;
    return data ?? [];
  });
