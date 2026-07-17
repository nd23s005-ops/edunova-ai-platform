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
