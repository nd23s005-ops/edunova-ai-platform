import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import {
  buildCurriculumPrompt,
  buildLessonContentPrompt,
  buildResourcesPrompt,
  callCmsGatewayJSON,
  emptyCurriculum,
  safeJson,
  slugify,
  writeAudit,
  type GeneratedCurriculum,
  type GeneratedLessonContent,
  type GeneratedResources,
  type ContentStatus,
  type CourseVisibility,
  type ResourceKind,
} from "./cms.server";

// ============================================================
// Categories
// ============================================================

export const listCategories = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: cats } = await context.supabase
      .from("course_categories")
      .select("id, slug, name, description, display_order, is_active")
      .order("display_order");
    const { data: subs } = await context.supabase
      .from("course_subcategories")
      .select("id, category_id, slug, name, description, display_order, is_active")
      .order("display_order");
    return { categories: cats ?? [], subcategories: subs ?? [] };
  });

const CategoryInput = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(80),
  name: z.string().min(1).max(120),
  description: z.string().optional().nullable(),
  display_order: z.number().int().min(0).max(9999).optional(),
  is_active: z.boolean().optional(),
});

export const upsertCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => CategoryInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("course_categories").upsert({
      id: data.id,
      slug: slugify(data.slug),
      name: data.name,
      description: data.description ?? null,
      display_order: data.display_order ?? 0,
      is_active: data.is_active ?? true,
    });
    if (error) throw new Error(error.message);
    await writeAudit(context.supabase, context.userId, data.id ? "update" : "create", "course_category", data.id ?? null, { name: data.name });
    return { ok: true };
  });

const SubcategoryInput = z.object({
  id: z.string().uuid().optional(),
  category_id: z.string().uuid(),
  slug: z.string().min(1).max(80),
  name: z.string().min(1).max(120),
  description: z.string().optional().nullable(),
  display_order: z.number().int().min(0).max(9999).optional(),
  is_active: z.boolean().optional(),
});

export const upsertSubcategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SubcategoryInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("course_subcategories").upsert({
      id: data.id,
      category_id: data.category_id,
      slug: slugify(data.slug),
      name: data.name,
      description: data.description ?? null,
      display_order: data.display_order ?? 0,
      is_active: data.is_active ?? true,
    });
    if (error) throw new Error(error.message);
    await writeAudit(context.supabase, context.userId, data.id ? "update" : "create", "course_subcategory", data.id ?? null, { name: data.name });
    return { ok: true };
  });

// ============================================================
// Course CRUD
// ============================================================

async function assertAdmin(context: { supabase: import("@supabase/supabase-js").SupabaseClient; userId: string }) {
  const { data } = await context.supabase
    .from("user_roles")
    .select("role, admin_level")
    .eq("user_id", context.userId)
    .maybeSingle();
  const isAdmin = data?.role === "admin";
  const isSuper = isAdmin && data?.admin_level === "super";
  if (!isSuper) throw new Error("Forbidden: super-admin only");
}

const ListCoursesSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["draft", "review", "approved", "published", "archived", "all"]).optional(),
  categoryId: z.string().uuid().optional().nullable(),
  includeDeleted: z.boolean().optional(),
  sort: z.enum(["updated_desc", "title_asc", "views_desc"]).optional(),
});

export const listCmsCourses = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ListCoursesSchema.parse(input ?? {}))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    let q = context.supabase
      .from("courses")
      .select(
        "id, title, slug, short_description, cms_status, visibility, category_id, subcategory_id, tags, updated_at, view_count, archived_at, deleted_at, ai_generated, version",
      );
    if (!data.includeDeleted) q = q.is("deleted_at", null);
    if (data.status && data.status !== "all") q = q.eq("cms_status", data.status);
    if (data.categoryId) q = q.eq("category_id", data.categoryId);
    if (data.search) q = q.ilike("title", `%${data.search}%`);
    if (data.sort === "title_asc") q = q.order("title", { ascending: true });
    else if (data.sort === "views_desc") q = q.order("view_count", { ascending: false });
    else q = q.order("updated_at", { ascending: false });
    const { data: rows, error } = await q.limit(200);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

const CreateCourseSchema = z.object({
  title: z.string().min(2).max(160),
  short_description: z.string().max(280).optional().nullable(),
  description: z.string().optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  subcategory_id: z.string().uuid().optional().nullable(),
  instructor_name: z.string().max(160).optional().nullable(),
  tags: z.array(z.string()).default([]),
  estimated_hours: z.number().int().min(0).max(10000).optional().nullable(),
  visibility: z.enum(["public", "signed_in", "role_gated", "private"]).default("signed_in"),
  banner_url: z.string().url().optional().nullable(),
  cover_url: z.string().url().optional().nullable(),
  board: z.enum(["cbse", "icse", "state_board", "ib", "cambridge", "nios", "other"]).default("other"),
  subject: z.string().default("General"),
  class_min: z.number().int().min(0).default(6),
  class_max: z.number().int().min(0).default(12),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
  generate_curriculum: z.boolean().default(true),
});

export const createCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => CreateCourseSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const slug = slugify(`${data.title}-${Date.now().toString(36).slice(-4)}`);
    const insert = {
      title: data.title,
      slug,
      short_description: data.short_description ?? null,
      description: data.description ?? null,
      category_id: data.category_id ?? null,
      subcategory_id: data.subcategory_id ?? null,
      instructor_name: data.instructor_name ?? null,
      tags: data.tags,
      estimated_hours: data.estimated_hours ?? null,
      visibility: data.visibility as CourseVisibility,
      banner_url: data.banner_url ?? null,
      cover_url: data.cover_url ?? null,
      board: data.board,
      subject: data.subject,
      class_min: data.class_min,
      class_max: data.class_max,
      difficulty: data.difficulty,
      cms_status: "draft" as ContentStatus,
      created_by: context.userId,
      ai_generated: data.generate_curriculum,
    };
    const { data: course, error } = await context.supabase
      .from("courses")
      .insert(insert as never)
      .select("id")
      .single();
    if (error || !course) throw new Error(error?.message ?? "Failed to create course");

    if (data.generate_curriculum) {
      try {
        await generateAndAttachCurriculum(context.supabase, context.userId, course.id, {
          title: data.title,
          category: data.category_id ? await lookupCategoryName(context.supabase, data.category_id) : null,
          subcategory: data.subcategory_id ? await lookupSubcategoryName(context.supabase, data.subcategory_id) : null,
          difficulty: data.difficulty,
          audience: data.subject,
          hours: data.estimated_hours ?? null,
        });
      } catch (e) {
        // Non-fatal: creation still succeeds; admin can regenerate.
        console.warn("Curriculum generation failed:", (e as Error).message);
      }
    }

    await writeAudit(context.supabase, context.userId, "create", "course", course.id, { title: data.title });
    return { id: course.id, slug };
  });

async function lookupCategoryName(supabase: import("@supabase/supabase-js").SupabaseClient, id: string): Promise<string | null> {
  const { data } = await supabase.from("course_categories").select("name").eq("id", id).maybeSingle<{ name: string }>();
  return data?.name ?? null;
}

async function lookupSubcategoryName(supabase: import("@supabase/supabase-js").SupabaseClient, id: string): Promise<string | null> {
  const { data } = await supabase.from("course_subcategories").select("name").eq("id", id).maybeSingle<{ name: string }>();
  return data?.name ?? null;
}

async function generateAndAttachCurriculum(
  supabase: import("@supabase/supabase-js").SupabaseClient,
  userId: string,
  courseId: string,
  params: { title: string; category: string | null; subcategory: string | null; difficulty: string | null; audience: string | null; hours: number | null },
) {
  const { system, user } = buildCurriculumPrompt(params);
  const raw = await callCmsGatewayJSON(system, user);
  const curriculum = safeJson<GeneratedCurriculum>(raw, emptyCurriculum());

  await supabase
    .from("courses")
    .update({
      learning_outcomes: curriculum.learning_outcomes,
      prerequisites: curriculum.prerequisites,
      learning_objectives: curriculum.learning_objectives as never,
    })
    .eq("id", courseId);

  for (const [mi, mod] of curriculum.modules.entries()) {
    const { data: modRow } = await supabase
      .from("modules")
      .insert({
        course_id: courseId,
        title: mod.title,
        description: mod.description,
        order_index: mi,
        status: "draft",
        ai_generated: true,
        created_by: userId,
      })
      .select("id")
      .single<{ id: string }>();
    const moduleId = modRow?.id;

    for (const [ci, chap] of mod.chapters.entries()) {
      const { data: chapRow } = await supabase
        .from("chapters")
        .insert({
          course_id: courseId,
          module_id: moduleId,
          title: chap.title,
          description: chap.description,
          order_index: ci,
          status: "draft",
          ai_generated: true,
        })
        .select("id")
        .single<{ id: string }>();
      const chapterId = chapRow?.id;
      if (!chapterId) continue;

      for (const [li, lesson] of chap.lessons.entries()) {
        await supabase.from("lessons").insert({
          chapter_id: chapterId,
          title: lesson.title,
          content: lesson.summary,
          order_index: li,
          status: "draft",
          ai_generated: true,
          learning_objectives: lesson.objectives,
          key_takeaways: lesson.key_takeaways,
        });
      }
    }
  }
}

const UpdateCourseSchema = z.object({
  id: z.string().uuid(),
  patch: z.object({
    title: z.string().min(2).max(160).optional(),
    slug: z.string().max(80).optional(),
    short_description: z.string().max(280).optional().nullable(),
    description: z.string().optional().nullable(),
    category_id: z.string().uuid().optional().nullable(),
    subcategory_id: z.string().uuid().optional().nullable(),
    instructor_name: z.string().max(160).optional().nullable(),
    tags: z.array(z.string()).optional(),
    learning_outcomes: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    estimated_hours: z.number().int().min(0).max(10000).optional().nullable(),
    visibility: z.enum(["public", "signed_in", "role_gated", "private"]).optional(),
    banner_url: z.string().url().optional().nullable(),
    cover_url: z.string().url().optional().nullable(),
  }),
});

export const updateCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UpdateCourseSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("courses").update(data.patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    await writeAudit(context.supabase, context.userId, "update", "course", data.id, data.patch as Record<string, unknown>);
    return { ok: true };
  });

const StatusInput = z.object({
  id: z.string().uuid(),
  action: z.enum(["submit_review", "approve", "reject", "publish", "unpublish", "archive", "restore", "soft_delete", "hard_restore"]),
  note: z.string().max(500).optional(),
});

export const transitionCourseStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => StatusInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: current, error: readErr } = await context.supabase
      .from("courses")
      .select("cms_status, archived_at, deleted_at")
      .eq("id", data.id)
      .single<{ cms_status: ContentStatus; archived_at: string | null; deleted_at: string | null }>();
    if (readErr || !current) throw new Error(readErr?.message ?? "Course not found");

    let next: ContentStatus = current.cms_status;
    const patch: Record<string, unknown> = {};
    let auditAction: "publish" | "unpublish" | "archive" | "restore" | "approve" | "reject" | "request_changes" | "delete" = "update" as never;

    switch (data.action) {
      case "submit_review":
        next = "review";
        auditAction = "request_changes";
        break;
      case "approve":
        next = "approved";
        patch.approved_by = context.userId;
        patch.approved_at = new Date().toISOString();
        auditAction = "approve";
        break;
      case "reject":
        next = "draft";
        auditAction = "reject";
        break;
      case "publish":
        next = "published";
        patch.is_published = true;
        auditAction = "publish";
        break;
      case "unpublish":
        next = "approved";
        patch.is_published = false;
        auditAction = "unpublish";
        break;
      case "archive":
        next = "archived";
        patch.archived_at = new Date().toISOString();
        patch.is_published = false;
        auditAction = "archive";
        break;
      case "restore":
        next = "draft";
        patch.archived_at = null;
        auditAction = "restore";
        break;
      case "soft_delete":
        patch.deleted_at = new Date().toISOString();
        patch.is_published = false;
        auditAction = "delete";
        break;
      case "hard_restore":
        patch.deleted_at = null;
        auditAction = "restore";
        break;
    }
    patch.cms_status = next;
    const { error } = await context.supabase.from("courses").update(patch as never).eq("id", data.id);
    if (error) throw new Error(error.message);
    await context.supabase.from("course_approvals").insert({
      course_id: data.id,
      from_status: current.cms_status,
      to_status: next,
      actor_id: context.userId,
      note: data.note ?? null,
    });
    await writeAudit(context.supabase, context.userId, auditAction, "course", data.id, { note: data.note });
    return { ok: true, status: next };
  });

const DuplicateInput = z.object({ id: z.string().uuid() });

export const duplicateCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => DuplicateInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: src, error } = await context.supabase
      .from("courses")
      .select("*")
      .eq("id", data.id)
      .single();
    if (error || !src) throw new Error(error?.message ?? "Course not found");
    const copy = { ...src } as Record<string, unknown>;
    delete copy.id;
    delete copy.created_at;
    delete copy.updated_at;
    copy.title = `${src.title} (Copy)`;
    copy.slug = slugify(`${src.title}-copy-${Date.now().toString(36).slice(-4)}`);
    copy.cms_status = "draft";
    copy.is_published = false;
    copy.approved_at = null;
    copy.approved_by = null;
    copy.archived_at = null;
    copy.deleted_at = null;
    copy.view_count = 0;
    copy.version = 1;
    copy.created_by = context.userId;
    const { data: created, error: insErr } = await context.supabase
      .from("courses")
      .insert(copy as never)
      .select("id")
      .single<{ id: string }>();
    if (insErr || !created) throw new Error(insErr?.message ?? "Failed to duplicate");
    await writeAudit(context.supabase, context.userId, "duplicate", "course", created.id, { source: data.id });
    return { id: created.id };
  });

// ============================================================
// Course detail (with modules → chapters → lessons)
// ============================================================

export const getCmsCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: course, error } = await context.supabase
      .from("courses")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!course) throw new Error("Course not found");
    const { data: modules } = await context.supabase
      .from("modules")
      .select("id, title, description, order_index, status, ai_generated")
      .eq("course_id", data.id)
      .order("order_index");
    const { data: chapters } = await context.supabase
      .from("chapters")
      .select("id, module_id, title, description, order_index, status, ai_generated")
      .eq("course_id", data.id)
      .order("order_index");
    const chapterIds = (chapters ?? []).map((c) => c.id);
    const { data: lessons } = chapterIds.length
      ? await context.supabase
          .from("lessons")
          .select("id, chapter_id, title, order_index, status, ai_generated")
          .in("chapter_id", chapterIds)
          .order("order_index")
      : { data: [] as { id: string; chapter_id: string; title: string; order_index: number; status: ContentStatus; ai_generated: boolean }[] };
    const { data: history } = await context.supabase
      .from("course_approvals")
      .select("from_status, to_status, note, created_at")
      .eq("course_id", data.id)
      .order("created_at", { ascending: false })
      .limit(20);
    return {
      course,
      modules: modules ?? [],
      chapters: chapters ?? [],
      lessons: lessons ?? [],
      history: history ?? [],
    };
  });

// ============================================================
// Structure CRUD (modules / chapters / lessons / topics)
// ============================================================

const ModuleInput = z.object({
  id: z.string().uuid().optional(),
  course_id: z.string().uuid(),
  title: z.string().min(1).max(160),
  description: z.string().optional().nullable(),
  order_index: z.number().int().min(0).max(9999).optional(),
});

export const upsertModule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ModuleInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: row, error } = await context.supabase
      .from("modules")
      .upsert({
        id: data.id,
        course_id: data.course_id,
        title: data.title,
        description: data.description ?? null,
        order_index: data.order_index ?? 0,
        created_by: context.userId,
      })
      .select("id")
      .single<{ id: string }>();
    if (error) throw new Error(error.message);
    await writeAudit(context.supabase, context.userId, data.id ? "update" : "create", "module", row?.id ?? null, { title: data.title });
    return { id: row?.id };
  });

export const deleteModule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("modules").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await writeAudit(context.supabase, context.userId, "delete", "module", data.id);
    return { ok: true };
  });

const ReorderInput = z.object({
  entity: z.enum(["module", "chapter", "lesson"]),
  ids: z.array(z.string().uuid()).min(1).max(200),
});

export const reorderStructure = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ReorderInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const table = data.entity === "module" ? "modules" : data.entity === "chapter" ? "chapters" : "lessons";
    await Promise.all(
      data.ids.map((id, i) => context.supabase.from(table).update({ order_index: i }).eq("id", id)),
    );
    return { ok: true };
  });

const LessonRegenInput = z.object({
  lesson_id: z.string().uuid(),
});

export const regenerateLessonContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => LessonRegenInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: lesson } = await context.supabase
      .from("lessons")
      .select("id, title, chapter_id")
      .eq("id", data.lesson_id)
      .maybeSingle<{ id: string; title: string; chapter_id: string }>();
    if (!lesson) throw new Error("Lesson not found");
    const { data: chapter } = await context.supabase
      .from("chapters")
      .select("title, course_id")
      .eq("id", lesson.chapter_id)
      .maybeSingle<{ title: string; course_id: string }>();
    const { data: course } = chapter
      ? await context.supabase.from("courses").select("title, subject").eq("id", chapter.course_id).maybeSingle<{ title: string; subject: string }>()
      : { data: null };
    const { system, user } = buildLessonContentPrompt({
      courseTitle: course?.title ?? "Course",
      chapterTitle: chapter?.title ?? "Chapter",
      lessonTitle: lesson.title,
      audience: course?.subject ?? null,
    });
    const raw = await callCmsGatewayJSON(system, user);
    const parsed = safeJson<GeneratedLessonContent>(raw, {
      overview: "",
      concept: "",
      step_by_step: [],
      examples: [],
      best_practices: [],
      visuals: [],
      code_examples: [],
      exercises: [],
      summary: "",
      key_takeaways: [],
    });
    const md = renderLessonMarkdown(parsed);
    await context.supabase
      .from("lessons")
      .update({ content: md, key_takeaways: parsed.key_takeaways, ai_generated: true })
      .eq("id", data.lesson_id);
    await writeAudit(context.supabase, context.userId, "update", "lesson", data.lesson_id, { regenerated: true });
    return { ok: true };
  });

function renderLessonMarkdown(c: GeneratedLessonContent): string {
  const parts: string[] = [];
  if (c.overview) parts.push(`## Overview\n${c.overview}`);
  if (c.concept) parts.push(`## Core concept\n${c.concept}`);
  if (c.step_by_step.length) parts.push(`## Step by step\n${c.step_by_step.map((s, i) => `${i + 1}. ${s}`).join("\n")}`);
  if (c.examples.length) parts.push(`## Real-world examples\n${c.examples.map((e) => `- ${e}`).join("\n")}`);
  if (c.best_practices.length) parts.push(`## Best practices\n${c.best_practices.map((b) => `- ${b}`).join("\n")}`);
  if (c.visuals.length) parts.push(`## Visual learning\n${c.visuals.map((v) => `- ${v}`).join("\n")}`);
  if (c.code_examples.length)
    parts.push(
      `## Code examples\n${c.code_examples
        .map((ex) => `**${ex.language}**\n\n\`\`\`${ex.language}\n${ex.snippet}\n\`\`\`\n\n${ex.explanation}`)
        .join("\n\n")}`,
    );
  if (c.exercises.length) parts.push(`## Exercises\n${c.exercises.map((e) => `- ${e}`).join("\n")}`);
  if (c.summary) parts.push(`## Summary\n${c.summary}`);
  if (c.key_takeaways.length) parts.push(`## Key takeaways\n${c.key_takeaways.map((k) => `- ${k}`).join("\n")}`);
  return parts.join("\n\n");
}

// ============================================================
// Resources
// ============================================================

const GenResourcesInput = z.object({
  course_id: z.string().uuid(),
  kinds: z.array(z.enum([
    "beginner_guide", "roadmap", "notes", "revision_notes", "cheat_sheet", "documentation",
    "practice_questions", "interview_questions", "assignment", "mini_project", "major_project",
    "case_study", "faq", "glossary", "reference", "downloadable",
  ])).min(1),
});

export const generateCourseResources = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => GenResourcesInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: course } = await context.supabase
      .from("courses")
      .select("title")
      .eq("id", data.course_id)
      .maybeSingle<{ title: string }>();
    if (!course) throw new Error("Course not found");
    const { system, user } = buildResourcesPrompt({ courseTitle: course.title, kinds: data.kinds });
    const raw = await callCmsGatewayJSON(system, user);
    const parsed = safeJson<GeneratedResources>(raw, { items: [] });
    let created = 0;
    for (const [i, item] of parsed.items.entries()) {
      const { error } = await context.supabase.from("course_resources").insert({
        course_id: data.course_id,
        kind: item.kind as ResourceKind,
        title: item.title,
        summary: item.summary,
        content: item.content,
        status: "draft",
        ai_generated: true,
        order_index: i,
        created_by: context.userId,
      });
      if (!error) created += 1;
    }
    await writeAudit(context.supabase, context.userId, "create", "course_resources_bulk", data.course_id, { count: created });
    return { created };
  });

export const listCourseResources = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ course_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: rows } = await context.supabase
      .from("course_resources")
      .select("id, kind, title, summary, status, order_index, ai_generated, is_downloadable, created_at")
      .eq("course_id", data.course_id)
      .order("order_index")
      .order("created_at", { ascending: false });
    return rows ?? [];
  });

// Learner-facing: list published resources across a course
export const listPublishedResources = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ course_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: rows } = await context.supabase
      .from("course_resources")
      .select("id, kind, title, summary, is_downloadable")
      .eq("course_id", data.course_id)
      .eq("status", "published")
      .order("order_index");
    return rows ?? [];
  });

const InteractionInput = z.object({
  resource_id: z.string().uuid(),
  bookmarked: z.boolean().optional(),
  saved_for_later: z.boolean().optional(),
  completed: z.boolean().optional(),
});

export const toggleResourceInteraction = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InteractionInput.parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("resource_interactions")
      .upsert(
        {
          user_id: context.userId,
          resource_id: data.resource_id,
          bookmarked: data.bookmarked,
          saved_for_later: data.saved_for_later,
          completed: data.completed,
          last_viewed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,resource_id" },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ============================================================
// Learning Paths
// ============================================================

const PathInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(160),
  description: z.string().optional().nullable(),
  target_role: z.string().max(80).optional().nullable(),
  skill_level: z.string().max(60).optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  tags: z.array(z.string()).default([]),
  is_active: z.boolean().default(true),
});

export const upsertLearningPath = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => PathInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const slug = slugify(data.title);
    const { data: row, error } = await context.supabase
      .from("learning_paths")
      .upsert({
        id: data.id,
        slug,
        title: data.title,
        description: data.description ?? null,
        target_role: data.target_role ?? null,
        skill_level: data.skill_level ?? null,
        category_id: data.category_id ?? null,
        tags: data.tags,
        is_active: data.is_active,
        created_by: context.userId,
      })
      .select("id")
      .single<{ id: string }>();
    if (error) throw new Error(error.message);
    await writeAudit(context.supabase, context.userId, data.id ? "update" : "create", "learning_path", row?.id ?? null);
    return { id: row?.id };
  });

export const listLearningPaths = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("learning_paths")
      .select("id, slug, title, description, target_role, skill_level, tags, is_active, updated_at")
      .order("updated_at", { ascending: false });
    return data ?? [];
  });

// ============================================================
// Analytics
// ============================================================

export const cmsAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { count: totalCourses } = await context.supabase.from("courses").select("id", { count: "exact", head: true }).is("deleted_at", null);
    const { count: publishedCourses } = await context.supabase.from("courses").select("id", { count: "exact", head: true }).eq("cms_status", "published");
    const { count: draftCourses } = await context.supabase.from("courses").select("id", { count: "exact", head: true }).eq("cms_status", "draft");
    const { count: totalEnrollments } = await context.supabase.from("course_enrollments").select("id", { count: "exact", head: true });
    const { count: resourceCount } = await context.supabase.from("course_resources").select("id", { count: "exact", head: true });
    const { data: topViewed } = await context.supabase
      .from("courses")
      .select("id, title, view_count, cms_status")
      .order("view_count", { ascending: false })
      .limit(8);
    const { data: recentAudit } = await context.supabase
      .from("admin_audit_logs")
      .select("action, entity_type, entity_id, created_at, metadata")
      .order("created_at", { ascending: false })
      .limit(20);
    return {
      totalCourses: totalCourses ?? 0,
      publishedCourses: publishedCourses ?? 0,
      draftCourses: draftCourses ?? 0,
      totalEnrollments: totalEnrollments ?? 0,
      resourceCount: resourceCount ?? 0,
      topViewed: topViewed ?? [],
      recentAudit: recentAudit ?? [],
    };
  });

export { RESOURCE_KINDS, RESOURCE_KIND_LABEL, CONTENT_STATUSES } from "./cms.server";
export type { ResourceKind, ContentStatus, CourseVisibility } from "./cms.server";
