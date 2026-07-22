import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertClassRange } from "./classRange";

const EnsureInput = z.object({ slug: z.string().min(3).max(160) });


/**
 * Ensures a catalog course exists in the `courses` table. Idempotent: subsequent
 * calls return the same course id. Uses the service-role client because
 * `courses` inserts are admin-gated by RLS.
 */
export const ensureCatalogCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => EnsureInput.parse(v))
  .handler(async ({ data }): Promise<{ courseId: string; created: boolean }> => {
    const { getCatalogEntry } = await import("./ensure.server");
    const entry = getCatalogEntry(data.slug);
    if (!entry) throw new Error("Unknown course slug");
    assertClassRange({ class_min: entry.class_min, class_max: entry.class_max }, `catalog entry ${entry.slug}`);



    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const existing = await supabaseAdmin
      .from("courses")
      .select("id")
      .eq("slug", entry.slug)
      .maybeSingle();
    if (existing.data?.id) {
      return { courseId: existing.data.id as string, created: false };
    }

    const insert = await supabaseAdmin
      .from("courses")
      .insert({
        title: entry.title,
        description: entry.description,
        subject: entry.subject,
        board: entry.board,
        class_min: entry.class_min,
        class_max: entry.class_max,
        difficulty: entry.difficulty,
        estimated_hours: entry.estimated_hours,
        learning_objectives: entry.learning_objectives,
        slug: entry.slug,
        is_published: true,
      })
      .select("id")
      .single();
    if (insert.error) throw new Error(insert.error.message);
    return { courseId: insert.data.id as string, created: true };
  });

const SeedInput = z.object({ courseId: z.string().uuid() });

/**
 * Generates a chapter/lesson skeleton for a course if none exists yet. Runs
 * once per course. Lesson theory is generated on-demand elsewhere.
 */
export const seedCourseSkeleton = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => SeedInput.parse(v))
  .handler(async ({ data }): Promise<{ seeded: boolean; chapters: number }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const existing = await supabaseAdmin
      .from("chapters")
      .select("id")
      .eq("course_id", data.courseId)
      .limit(1);
    if ((existing.data?.length ?? 0) > 0) return { seeded: false, chapters: 0 };

    const course = await supabaseAdmin
      .from("courses")
      .select("slug, title, subject, description, board, class_min, class_max, difficulty, estimated_hours, learning_objectives")
      .eq("id", data.courseId)
      .single();
    if (course.error || !course.data) throw new Error("Course not found");

    const { getCatalogEntry, generateSkeleton } = await import("./ensure.server");
    const catalogEntry = course.data.slug ? getCatalogEntry(course.data.slug as string) : null;
    const entry = catalogEntry ?? {
      slug: (course.data.slug as string) ?? "",
      title: course.data.title as string,
      subject: course.data.subject as string,
      description: (course.data.description as string) ?? "",
      board: course.data.board as never,
      class_min: course.data.class_min as number,
      class_max: course.data.class_max as number,
      difficulty: course.data.difficulty as never,
      estimated_hours: Number(course.data.estimated_hours ?? 40),
      learning_objectives: Array.isArray(course.data.learning_objectives)
        ? (course.data.learning_objectives as string[])
        : [],
    };

    const skeleton = await generateSkeleton(entry);

    for (let i = 0; i < skeleton.length; i++) {
      const ch = skeleton[i];
      const chIns = await supabaseAdmin
        .from("chapters")
        .insert({
          course_id: data.courseId,
          order_index: i,
          title: ch.title,
          intro: ch.intro,
          summary: ch.summary,
          ai_generated: true,
        })
        .select("id")
        .single();
      if (chIns.error || !chIns.data) continue;
      const chapterId = chIns.data.id as string;
      const lessonRows = ch.lessons.map((l, j) => ({
        chapter_id: chapterId,
        order_index: j,
        title: l.title,
        key_notes: l.key_notes,
        learning_objectives: l.objectives,
        ai_generated: true,
      }));
      if (lessonRows.length > 0) {
        await supabaseAdmin.from("lessons").insert(lessonRows);
      }

      // Chapter-level quiz stub (questions generated on demand elsewhere).
      await supabaseAdmin.from("quizzes").insert({
        chapter_id: chapterId,
        title: `${ch.title} — Practice Quiz`,
        pass_score: 60,
        time_limit_seconds: 600,
      });

      // Chapter-level assignment stub.
      await supabaseAdmin.from("assignments").insert({
        chapter_id: chapterId,
        title: `${ch.title} — Assignment`,
        instructions: `Apply the concepts from "${ch.title}". Write a short response (150–300 words) demonstrating your understanding.`,
      });
    }

    // Attach a resource bundle for this course. Idempotent: only when no
    // resources already exist. Matches to the marketing library where
    // possible so existing content is reused rather than duplicated.
    const existingResources = await supabaseAdmin
      .from("resources")
      .select("id")
      .eq("course_id", data.courseId)
      .limit(1);
    if ((existingResources.data?.length ?? 0) === 0) {
      const { buildResourceSeeds } = await import("./resource-seed.server");
      const seeds = buildResourceSeeds(entry.title);
      if (seeds.length > 0) {
        await supabaseAdmin.from("resources").insert(
          seeds.map((s) => ({
            course_id: data.courseId,
            kind: s.kind,
            title: s.title,
            description: s.description,
            url: s.url,
            order_index: s.order_index,
          })),
        );
      }
    }

    return { seeded: true, chapters: skeleton.length };
  });

