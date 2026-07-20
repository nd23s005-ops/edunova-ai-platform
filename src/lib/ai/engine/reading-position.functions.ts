import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SaveInput = z.object({
  lessonId: z.string().uuid(),
  courseId: z.string().uuid().optional(),
  scrollPercent: z.number().int().min(0).max(100),
  lastSection: z.string().max(80).optional(),
});

export const saveReadingPosition = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => SaveInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("lesson_reading_position")
      .upsert(
        {
          user_id: userId,
          lesson_id: data.lessonId,
          course_id: data.courseId,
          scroll_percent: data.scrollPercent,
          last_section: data.lastSection ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,lesson_id" },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const GetInput = z.object({ lessonId: z.string().uuid() });

export const getReadingPosition = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => GetInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row } = await supabase
      .from("lesson_reading_position")
      .select("scroll_percent, last_section, updated_at")
      .eq("user_id", userId)
      .eq("lesson_id", data.lessonId)
      .maybeSingle();
    return row
      ? { scrollPercent: row.scroll_percent, lastSection: row.last_section, updatedAt: row.updated_at }
      : null;
  });

export type ResumeCandidate = {
  lessonId: string;
  lessonTitle: string;
  courseId: string;
  courseTitle: string;
  chapterId: string;
  scrollPercent: number;
  updatedAt: string;
};

export const getResumeCandidate = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ResumeCandidate | null> => {
    const { supabase, userId } = context;
    const { data: row } = await supabase
      .from("lesson_reading_position")
      .select("lesson_id, course_id, scroll_percent, updated_at, lessons:lesson_id (title, chapter_id, chapters:chapter_id (courses:course_id (id, title)))")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!row) return null;
    type Nested = {
      title?: string;
      chapter_id?: string;
      chapters?: { courses?: { id?: string; title?: string } };
    };
    const lesson = row.lessons as unknown as Nested | null;
    const courseInner = lesson?.chapters?.courses;
    return {
      lessonId: row.lesson_id,
      lessonTitle: lesson?.title ?? "Lesson",
      courseId: row.course_id ?? courseInner?.id ?? "",
      courseTitle: courseInner?.title ?? "Course",
      chapterId: lesson?.chapter_id ?? "",
      scrollPercent: row.scroll_percent,
      updatedAt: row.updated_at,
    };
  });
