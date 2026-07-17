import { useQuery } from "@tanstack/react-query";
import { useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import type { AppRole } from "@/lib/auth/roles";

export type AssistantSurface =
  | "home"
  | "explore"
  | "community"
  | "about"
  | "resources"
  | "features"
  | "auth"
  | "onboarding"
  | "dashboard_student"
  | "dashboard_organization"
  | "dashboard_admin"
  | "dashboard_professional"
  | "dashboard_generic"
  | "unknown";

export type AssistantContext = {
  surface: AssistantSurface;
  pathname: string;
  role: AppRole | null;
  student?: {
    currentClass: number;
    board: string;
    language: string;
    schoolName: string | null;
  };
  lesson?: {
    courseTitle: string;
    courseSubject: string;
    chapterTitle: string | null;
    lessonTitle: string | null;
    theoryExcerpt: string | null;
  };
  signedIn: boolean;
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

function detectSurface(pathname: string, role: AppRole | null): AssistantSurface {
  if (pathname === "/" || pathname === "") return "home";
  if (pathname.startsWith("/explore")) return "explore";
  if (pathname.startsWith("/community")) return "community";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/resources")) return "resources";
  if (pathname.startsWith("/features")) return "features";
  if (pathname.startsWith("/onboarding")) return "onboarding";
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify")
  )
    return "auth";
  if (pathname.startsWith("/dashboard")) {
    if (pathname.startsWith("/dashboard/student")) return "dashboard_student";
    if (pathname.startsWith("/dashboard/organization")) return "dashboard_organization";
    if (pathname.startsWith("/dashboard/admin")) return "dashboard_admin";
    if (pathname.startsWith("/dashboard/professional")) return "dashboard_professional";
    if (role) return `dashboard_${role}` as AssistantSurface;
    return "dashboard_generic";
  }
  return "unknown";
}

export function useAssistantContext(): AssistantContext {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const { data: session } = useQuery({
    queryKey: ["me", "session-lite"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return { userId: null as string | null, role: null as AppRole | null };
      const { data: r } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .maybeSingle();
      return { userId: data.user.id, role: (r?.role as AppRole | undefined) ?? null };
    },
    staleTime: 60_000,
  });

  const role = session?.role ?? null;

  const { data: student } = useQuery({
    queryKey: ["me", "student_profile", "assistant"],
    enabled: role === "student",
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("student_profiles")
        .select("current_class, board, language, school_name")
        .eq("user_id", u.user.id)
        .maybeSingle();
      return data;
    },
    staleTime: 60_000,
  });

  const surface = detectSurface(pathname, role);

  // Parse course/lesson IDs from pathname if present
  const courseMatch = pathname.match(/\/courses\/([0-9a-f-]{36})/);
  const lessonMatch = pathname.match(/\/lessons\/([0-9a-f-]{36})/);
  const courseId = courseMatch?.[1];
  const lessonId = lessonMatch?.[1];

  const { data: lessonCtx } = useQuery({
    queryKey: ["assistant", "lesson-ctx", courseId, lessonId],
    enabled: !!courseId,
    queryFn: async () => {
      if (!courseId) return null;
      const { data: course } = await supabase
        .from("courses")
        .select("title, subject")
        .eq("id", courseId)
        .maybeSingle();
      if (!course) return null;
      let chapterTitle: string | null = null;
      let lessonTitle: string | null = null;
      let theoryExcerpt: string | null = null;
      if (lessonId) {
        const { data: l } = await supabase
          .from("lessons")
          .select("title, theory, chapter_id, chapters:chapter_id(title)")
          .eq("id", lessonId)
          .maybeSingle();
        if (l) {
          lessonTitle = l.title;
          const ch = (l as unknown as { chapters?: { title?: string } | null }).chapters;
          chapterTitle = ch?.title ?? null;
          theoryExcerpt = l.theory ? l.theory.slice(0, 1200) : null;
        }
      }
      return {
        courseTitle: course.title,
        courseSubject: course.subject,
        chapterTitle,
        lessonTitle,
        theoryExcerpt,
      };
    },
    staleTime: 60_000,
  });

  return {
    surface,
    pathname,
    role,
    signedIn: !!session?.userId,
    student: student
      ? {
          currentClass: student.current_class,
          board: student.board,
          language: student.language,
          schoolName: student.school_name,
        }
      : undefined,
    lesson: lessonCtx ?? undefined,
  };
}

export function assistantGreeting(ctx: AssistantContext): { title: string; subtitle: string } {
  const boardLabel = ctx.student ? BOARD_LABEL[ctx.student.board] ?? ctx.student.board : "";
  switch (ctx.surface) {
    case "home":
      return {
        title: "Hi, I'm Nova",
        subtitle: "Your guide to EduNova AI — ask about features, courses, pricing, or getting started.",
      };
    case "explore":
      return {
        title: "Looking for a course?",
        subtitle: "Tell me your class, board, and subject and I'll recommend the right courses.",
      };
    case "community":
      return {
        title: "Community guide",
        subtitle: "Ask about study groups, discussions, events, or community guidelines.",
      };
    case "about":
    case "resources":
    case "features":
      return {
        title: "Happy to help",
        subtitle: "Ask me anything about EduNova AI — mission, features, or how it works.",
      };
    case "auth":
    case "onboarding":
      return {
        title: "Setup help",
        subtitle: "Questions about signing in, roles, or onboarding? I can help.",
      };
    case "dashboard_student":
      return {
        title: ctx.student ? `Ready when you are` : "Personal learning assistant",
        subtitle: ctx.student
          ? `I know you're studying Class ${ctx.student.currentClass} · ${boardLabel}. Ask me anything.`
          : "Complete your profile so I can tailor explanations to your class and board.",
      };
    case "dashboard_organization":
      return {
        title: "Organization assistant",
        subtitle: "Ask about managing learners, employees, analytics, and reports.",
      };
    case "dashboard_admin":
      return {
        title: "Admin assistant",
        subtitle: "Ask about users, moderation, analytics, and platform configuration.",
      };
    case "dashboard_professional":
      return {
        title: "Upskilling assistant",
        subtitle: "Ask about career paths, courses to level up, and learning plans.",
      };
    default:
      return { title: "Hi, I'm Nova", subtitle: "How can I help you today?" };
  }
}

export function assistantQuickPrompts(ctx: AssistantContext): string[] {
  switch (ctx.surface) {
    case "home":
      return ["What is EduNova AI?", "Show me key features", "How do I get started?"];
    case "explore":
      return [
        ctx.student
          ? `Recommend Class ${ctx.student.currentClass} ${BOARD_LABEL[ctx.student.board] ?? ""} courses`
          : "Recommend Class 10 CBSE Science",
        "Show popular subjects",
        "How do I enroll in a course?",
      ];
    case "community":
      return ["Show community guidelines", "How do study groups work?", "Any upcoming events?"];
    case "dashboard_student":
      return ctx.student
        ? [
            `Explain a tough topic in Class ${ctx.student.currentClass}`,
            "Summarize my current lesson",
            "Give me 5 practice questions",
            "Plan my week of revision",
          ]
        : ["Complete my student profile", "Recommend a course", "How does the roadmap work?"];
    case "dashboard_organization":
      return ["Onboard new employees", "Assign courses to a team", "Summarize weekly analytics"];
    case "dashboard_admin":
      return ["Show platform health", "Recent user signups", "Suggest moderation actions"];
    case "dashboard_professional":
      return ["Recommend upskilling paths", "Plan a 4-week learning sprint", "Suggest next course for my role"];
    default:
      return ["What can you help with?"];
  }
}
