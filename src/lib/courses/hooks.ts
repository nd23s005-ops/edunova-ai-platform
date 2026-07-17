import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type CourseFull = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  board: string;
  class_min: number;
  class_max: number;
  language: string;
  cover_url: string | null;
  difficulty: string;
  estimated_hours: number | null;
  learning_objectives: unknown;
  weekly_plan: unknown;
  is_published: boolean;
};

export type Chapter = {
  id: string;
  course_id: string;
  order_index: number;
  title: string;
  intro: string | null;
  summary: string | null;
};

export type Lesson = {
  id: string;
  chapter_id: string;
  order_index: number;
  title: string;
  theory: string | null;
  illustrations: unknown;
  examples: unknown;
  key_notes: string | null;
  practice_items: unknown;
  estimated_minutes: number | null;
};

export function useCourse(courseId: string) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(
          "id, title, description, subject, board, class_min, class_max, language, cover_url, difficulty, estimated_hours, learning_objectives, weekly_plan, is_published",
        )
        .eq("id", courseId)
        .maybeSingle();
      if (error) throw error;
      return data as CourseFull | null;
    },
  });
}

export function useCourseChapters(courseId: string) {
  return useQuery({
    queryKey: ["course", courseId, "chapters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chapters")
        .select("id, course_id, order_index, title, intro, summary")
        .eq("course_id", courseId)
        .order("order_index");
      if (error) throw error;
      return (data ?? []) as Chapter[];
    },
  });
}

export function useChapterLessons(chapterId: string | undefined) {
  return useQuery({
    queryKey: ["chapter", chapterId, "lessons"],
    enabled: !!chapterId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select(
          "id, chapter_id, order_index, title, theory, illustrations, examples, key_notes, practice_items, estimated_minutes",
        )
        .eq("chapter_id", chapterId!)
        .order("order_index");
      if (error) throw error;
      return (data ?? []) as Lesson[];
    },
  });
}

export type CourseProgress = {
  completedLessons: string[];
  quizAttempts: Array<{ id: string; quiz_id: string; score: number | null; max_score: number | null; submitted_at: string | null }>;
  assignments: Array<{ id: string; assignment_id: string; status: string }>;
};

export function useCourseProgress(courseId: string) {
  return useQuery<CourseProgress>({
    queryKey: ["course", courseId, "progress"],
    queryFn: async () => {
      const empty: CourseProgress = { completedLessons: [], quizAttempts: [], assignments: [] };
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return empty;
      const [lp, qa, as_] = await Promise.all([
        supabase.from("lesson_progress").select("lesson_id").eq("user_id", u.user.id).eq("course_id", courseId),
        supabase.from("quiz_attempts").select("id, quiz_id, score, max_score, submitted_at").eq("user_id", u.user.id).eq("course_id", courseId),
        supabase.from("assignment_submissions").select("id, assignment_id, status").eq("user_id", u.user.id).eq("course_id", courseId),
      ]);
      return {
        completedLessons: (lp.data ?? []).map((r) => r.lesson_id as string),
        quizAttempts: (qa.data ?? []) as CourseProgress["quizAttempts"],
        assignments: (as_.data ?? []) as CourseProgress["assignments"],
      };
    },
    staleTime: 15_000,
  });
}

export function useCourseTotalLessons(courseId: string) {
  return useQuery({
    queryKey: ["course", courseId, "totalLessons"],
    queryFn: async () => {
      const { data: chapters } = await supabase
        .from("chapters")
        .select("id")
        .eq("course_id", courseId);
      const ids = (chapters ?? []).map((c) => c.id as string);
      if (!ids.length) return 0;
      const { count } = await supabase
        .from("lessons")
        .select("id", { count: "exact", head: true })
        .in("chapter_id", ids);
      return count ?? 0;
    },
  });
}

export type CourseQA = {
  quizzes: Array<{ id: string; chapter_id: string; title: string }>;
  assignments: Array<{ id: string; chapter_id: string; title: string }>;
  chapters: Array<{ id: string; title: string; order_index: number }>;
};

export function useCourseQuizAssignments(courseId: string) {
  return useQuery<CourseQA>({
    queryKey: ["course", courseId, "quizzes-assignments"],
    queryFn: async () => {
      const { data: chapters } = await supabase
        .from("chapters")
        .select("id, title, order_index")
        .eq("course_id", courseId)
        .order("order_index");
      const chs = (chapters ?? []) as CourseQA["chapters"];
      const ids = chs.map((c) => c.id);
      if (!ids.length) return { quizzes: [], assignments: [], chapters: chs };
      const [q, a] = await Promise.all([
        supabase.from("quizzes").select("id, chapter_id, title").in("chapter_id", ids),
        supabase.from("assignments").select("id, chapter_id, title").in("chapter_id", ids),
      ]);
      return {
        quizzes: (q.data ?? []) as CourseQA["quizzes"],
        assignments: (a.data ?? []) as CourseQA["assignments"],
        chapters: chs,
      };
    },
  });
}

export type RecommendedCourse = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  difficulty: string;
  estimated_hours: number | null;
};

export function useNextCourseRecommendation(currentCourseId: string) {
  return useQuery<RecommendedCourse | null>({
    queryKey: ["me", "next-course", currentCourseId],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const [curRes, enrolledRes] = await Promise.all([
        supabase
          .from("courses")
          .select("subject, board, class_min, class_max")
          .eq("id", currentCourseId)
          .maybeSingle(),
        supabase.from("course_enrollments").select("course_id, progress").eq("user_id", u.user.id),
      ]);
      const cur = curRes.data;
      if (!cur) return null;
      const completedIds = new Set(
        (enrolledRes.data ?? []).filter((r) => (r.progress ?? 0) >= 100).map((r) => r.course_id as string),
      );
      completedIds.add(currentCourseId);
      const { data } = await supabase
        .from("courses")
        .select("id, title, description, subject, difficulty, estimated_hours, board, class_min, class_max")
        .eq("is_published", true)
        .eq("board", cur.board)
        .lte("class_min", cur.class_max)
        .gte("class_max", cur.class_min)
        .neq("id", currentCourseId)
        .limit(30);
      const candidates = (data ?? []).filter((c) => !completedIds.has(c.id));
      const sameSubject = candidates.filter((c) => c.subject === cur.subject);
      const pick = sameSubject[0] ?? candidates[0] ?? null;
      if (!pick) return null;
      return {
        id: pick.id,
        title: pick.title,
        description: pick.description,
        subject: pick.subject,
        difficulty: pick.difficulty,
        estimated_hours: pick.estimated_hours,
      };
    },
  });
}

