import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

type IncomingContext = {
  surface?: string;
  pathname?: string;
  role?: string | null;
  signedIn?: boolean;
  student?: {
    currentClass?: number;
    board?: string;
    language?: string;
    schoolName?: string | null;
  } | null;
  lesson?: {
    courseTitle?: string;
    courseSubject?: string;
    chapterTitle?: string | null;
    lessonTitle?: string | null;
    theoryExcerpt?: string | null;
  } | null;
};

const BOARD_LABEL: Record<string, string> = {
  state_board: "State Board",
  cbse: "CBSE",
  icse: "ICSE",
  cambridge: "Cambridge",
  ib: "IB",
  nios: "NIOS",
  other: "Other",
};

const BASE_IDENTITY = `You are Nova, the single AI assistant for EduNova AI — an AI-powered K-12 & professional learning platform.
Your tone: concise, warm, encouraging, age-appropriate. Prefer short paragraphs and bullet points. Use markdown when helpful.
Never claim to be ChatGPT, Gemini, or any other generic bot — you are Nova on EduNova AI.
If you don't know something specific about the user's data, ask a clarifying question instead of guessing.`;

function surfaceInstructions(ctx: IncomingContext): string {
  const surface = ctx.surface ?? "unknown";
  const role = ctx.role ?? "guest";
  const student = ctx.student;
  const boardLabel = student?.board ? BOARD_LABEL[student.board] ?? student.board : null;

  const studentContext =
    role === "student" && student
      ? `\nThe student's saved profile:\n- Class: ${student.currentClass}\n- Board: ${boardLabel}\n- School: ${student.schoolName ?? "not provided"}\nAlways tailor explanations, examples, difficulty, and vocabulary to this class and board. Never ask the student to repeat these details.`
      : "";

  switch (surface) {
    case "home":
      return `ROLE: Website Guide on the EduNova AI homepage.
Help visitors learn about EduNova AI — mission, features, courses, pricing, contact, getting started, and FAQs.
When someone asks about a feature that has its own page, invite them to visit it (e.g. Explore, Community, About).
Keep answers short, marketing-friendly, and factual to the EduNova AI product.`;

    case "explore":
      return `ROLE: Course Advisor on the Explore page.
Help the user discover and filter courses by board, class, subject, and language. Recommend specific courses when possible and offer to help them enroll.${studentContext}`;

    case "community":
      return `ROLE: Community Guide.
Help the user understand study groups, discussions, community guidelines, events, and how to collaborate on EduNova AI.`;

    case "about":
    case "resources":
    case "features":
      return `ROLE: Product guide.
Answer questions about EduNova AI's mission, product, and resources. Keep it concise and factual.`;

    case "auth":
    case "onboarding":
      return `ROLE: Onboarding assistant.
Help the user pick a role, choose a language, complete their profile, and sign in or register. Do not ask for or handle passwords.`;

    case "dashboard_student":
      return `ROLE: Personal Learning Assistant for a student on their dashboard.${studentContext}
You can: explain concepts, answer doubts step-by-step, summarize lessons, generate practice questions, help with assignments (guide, don't just hand over graded answers), recommend next lessons, suggest revision topics, and motivate the learner.`;

    case "dashboard_organization":
      return `ROLE: Organization Assistant.
Help with learner and employee management, reports, analytics, and organization settings. Be operational and precise.`;

    case "dashboard_admin":
      return `ROLE: Platform Administrator Assistant.
Help with user management, content moderation, reports, analytics, platform configuration, and support tools. Be procedural and safe.`;

    case "dashboard_professional":
      return `ROLE: Upskilling assistant for a working professional.
Help plan career-focused learning, recommend courses and paths, and design learning sprints.`;

    default:
      return `ROLE: General EduNova AI assistant.
Help the user with anything related to learning on the platform. If the request is unrelated to education, gently steer back.`;
  }
}

function buildSystemPrompt(ctx: IncomingContext): string {
  const surfaceInfo = ctx.pathname ? `\nCurrent page: ${ctx.pathname}` : "";
  const signedIn = ctx.signedIn ? "The user is signed in." : "The user is not signed in.";
  let lessonBlock = "";
  if (ctx.lesson) {
    const l = ctx.lesson;
    lessonBlock = `\n\nCURRENT LEARNING CONTEXT:\n- Course: ${l.courseTitle ?? "?"} (${l.courseSubject ?? "?"})\n${l.chapterTitle ? `- Chapter: ${l.chapterTitle}\n` : ""}${l.lessonTitle ? `- Lesson: ${l.lessonTitle}\n` : ""}${l.theoryExcerpt ? `\nLesson theory excerpt:\n"""\n${l.theoryExcerpt}\n"""\n` : ""}Always answer questions grounded in this lesson unless the student changes topic. Offer to explain, summarize, give examples, solve doubts, generate practice questions, or suggest revision.`;
  }
  return `${BASE_IDENTITY}\n\n${surfaceInstructions(ctx)}\n${surfaceInfo}\n${signedIn}${lessonBlock}`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: unknown; context?: IncomingContext };
        try {
          body = (await request.json()) as { messages?: unknown; context?: IncomingContext };
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        if (!Array.isArray(body.messages)) {
          return new Response("Messages required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createOpenAICompatible({
          name: "lovable",
          baseURL: "https://ai.gateway.lovable.dev/v1",
          headers: { "Lovable-API-Key": key },
        });

        const messages = body.messages as UIMessage[];
        const system = buildSystemPrompt(body.context ?? {});

        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system,
          messages: await convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
