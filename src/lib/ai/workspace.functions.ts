import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callCareerAI, safeJson } from "@/lib/career/career.server";

const SECTIONS = [
  "overview",
  "lesson",
  "notes",
  "code",
  "theory",
  "practice",
  "assignments",
  "quizzes",
  "projects",
  "resources",
  "discussions",
] as const;

const Input = z.object({
  courseId: z.string().uuid(),
  section: z.enum(SECTIONS),
  message: z.string().max(2000).optional(),
  mode: z.enum(["generate", "explain", "debug", "optimize", "review", "summarize", "revise"]).optional(),
});

export type WorkspaceSection = (typeof SECTIONS)[number];

export type WorkspacePayload = {
  section: WorkspaceSection;
  title: string;
  intro: string;
  blocks: Array<
    | { type: "text"; heading?: string; body: string }
    | { type: "list"; heading?: string; items: string[] }
    | { type: "code"; language: string; code: string; caption?: string }
    | { type: "example"; title: string; body: string }
    | { type: "quiz"; question: string; options: string[]; answerIndex: number; explanation: string }
    | { type: "task"; title: string; description: string; hint?: string }
  >;
  followUps?: string[];
};

export const generateWorkspaceContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => Input.parse(v))
  .handler(async ({ data, context }): Promise<WorkspacePayload> => {
    const { supabase, userId } = context;

    // Gather grounding: course, role, progress, learner context
    const [courseRes, roleRes, ctxRes, enrollRes, profileRes] = await Promise.all([
      supabase
        .from("courses")
        .select("id, title, subject, description, difficulty, learning_objectives, class_min, class_max, board")
        .eq("id", data.courseId)
        .maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle(),
      supabase
        .from("learner_context")
        .select("skill_level, career_goal, learning_speed, preferred_depth, interests, weak_topics")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("course_enrollments")
        .select("progress")
        .eq("user_id", userId)
        .eq("course_id", data.courseId)
        .maybeSingle(),
      supabase.from("profiles").select("display_name, current_class").eq("id", userId).maybeSingle(),
    ]);

    const course = courseRes.data;
    if (!course) throw new Error("Course not found");
    const role = roleRes.data?.role ?? "student";
    const learnerCtx = ctxRes.data;
    const progress = enrollRes.data?.progress ?? 0;

    const roleLabel =
      role === "college_student"
        ? "College Student (Developer Workspace)"
        : role === "professional"
          ? "Working Professional (Career Growth)"
          : "School Student (Guided Classroom)";

    const isTechnical =
      /program|code|javascript|python|c\+\+|c\b|java|react|node|web|data|ai|ml|generative|api|dev|software|algorithm|dsa/i.test(
        `${course.subject ?? ""} ${course.title ?? ""}`,
      );

    const sectionPrompt: Record<WorkspaceSection, string> = {
      overview:
        "Produce a course overview tailored to the learner: 3-4 sentence intro (why this matters for their role), 4-6 learning objectives as a list, 4 key concepts as text blocks, one motivating real-world use case.",
      lesson:
        "Produce the current recommended lesson: intro block, 3-5 concept text blocks with headings, 2-3 worked example blocks, and if technical include one code block.",
      notes:
        "Produce concise AI study notes: 4-6 short heading/body text blocks, then a compact bullet-list summary.",
      code: isTechnical
        ? `AI Code Assistant response. Mode: ${data.mode ?? "generate"}. Return an intro, then a code block (correct language for the course), a text explanation, and optional list of improvements. User message: "${data.message ?? "Generate a starter example for this course."}"`
        : "Explain that this course is not code-based; instead offer 3 conceptual mini-drills as tasks.",
      theory: `AI Theory Assistant response. Mode: ${data.mode ?? "explain"}. Return intro, 2-4 concept blocks, one summary block. User message: "${data.message ?? "Explain the most important concept of this course simply."}"`,
      practice:
        "Produce a practice set: 3 MCQ quiz blocks (each with 4 options + answerIndex + explanation), 2 scenario task blocks with hints. Adapt difficulty to skill level and role.",
      assignments:
        "Produce 3 assignment task blocks tailored to the course and role, each with title, description (deliverables + acceptance criteria), and a hint.",
      quizzes:
        "Produce a mini quiz: 5 MCQ quiz blocks covering current course topics with balanced difficulty.",
      projects:
        "Produce 3 mini-project task blocks scoped to a weekend of work, each with title, description (goals, scope, tech), and a hint of how to start.",
      resources:
        "Produce a curated resources list: intro block, then 6-10 items as a bullet list (name — one-liner why it helps). Prefer free/canonical sources.",
      discussions:
        "Produce 5 discussion prompt task blocks that will spark peer conversation about this course.",
    };

    const system = [
      `You are Nova, EduNova AI's in-course learning workspace tutor.`,
      `Learner role: ${roleLabel}. Display name: ${profileRes.data?.display_name ?? "learner"}.`,
      `Course: "${course.title}" — subject ${course.subject ?? ""}, difficulty ${course.difficulty ?? ""}, current progress ${progress}%.`,
      course.description ? `Course description: ${course.description}` : "",
      learnerCtx?.skill_level ? `Skill level: ${learnerCtx.skill_level}.` : "",
      learnerCtx?.career_goal ? `Career goal: ${learnerCtx.career_goal}.` : "",
      learnerCtx?.preferred_depth ? `Preferred depth: ${learnerCtx.preferred_depth}.` : "",
      learnerCtx?.interests?.length ? `Interests: ${learnerCtx.interests.slice(0, 5).join(", ")}.` : "",
      learnerCtx?.weak_topics?.length ? `Weak topics to reinforce: ${learnerCtx.weak_topics.slice(0, 5).join(", ")}.` : "",
      `NEVER mix in unrelated subjects. Everything must be strictly about "${course.title}".`,
      `Return STRICT JSON matching: { "title": string, "intro": string, "blocks": Array, "followUps": string[] (up to 4 short follow-up prompts) }.`,
      `Each block is one of:`,
      `- { "type": "text", "heading"?: string, "body": string }`,
      `- { "type": "list", "heading"?: string, "items": string[] }`,
      `- { "type": "code", "language": string, "code": string, "caption"?: string }`,
      `- { "type": "example", "title": string, "body": string }`,
      `- { "type": "quiz", "question": string, "options": string[4], "answerIndex": number, "explanation": string }`,
      `- { "type": "task", "title": string, "description": string, "hint"?: string }`,
      `No markdown fences. No extra keys. Adapt tone: school = friendly & simple, college = technical & practical, professional = concise & outcome-oriented.`,
    ]
      .filter(Boolean)
      .join("\n");

    const raw = await callCareerAI(system, sectionPrompt[data.section]);
    const parsed = safeJson<Omit<WorkspacePayload, "section">>(raw);
    if (!parsed || !Array.isArray(parsed.blocks)) throw new Error("AI returned invalid content");

    return {
      section: data.section,
      title: parsed.title ?? course.title,
      intro: parsed.intro ?? "",
      blocks: parsed.blocks.slice(0, 20),
      followUps: Array.isArray(parsed.followUps) ? parsed.followUps.slice(0, 4) : [],
    };
  });
