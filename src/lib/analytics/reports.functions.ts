import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { toCsv } from "./analytics.server";

/**
 * Custom report builder.
 * spec = { dataset, dimensions[], filters{}, limit }
 * Only allow-listed datasets/columns are executable to prevent injection.
 */

const DATASETS = {
  enrollments: {
    table: "course_enrollments",
    columns: ["id", "user_id", "course_id", "progress", "enrolled_at"],
    scoped: (b: unknown, uid: string) => (b as { eq: (c: string, v: string) => unknown }).eq("user_id", uid),
  },
  lessons_completed: {
    table: "lesson_progress",
    columns: ["id", "user_id", "course_id", "lesson_id", "completed_at"],
    scoped: (b: unknown, uid: string) => (b as { eq: (c: string, v: string) => unknown }).eq("user_id", uid),
  },
  ai_attempts: {
    table: "ai_universal_attempts",
    columns: ["id", "user_id", "kind", "subject", "percentage", "submitted_at"],
    scoped: (b: unknown, uid: string) => (b as { eq: (c: string, v: string) => unknown }).eq("user_id", uid),
  },
} as const;

type DatasetKey = keyof typeof DATASETS;

const SpecSchema = z.object({
  dataset: z.enum(["enrollments", "lessons_completed", "ai_attempts"]),
  dimensions: z.array(z.string()).default([]),
  since: z.string().datetime().optional(),
  until: z.string().datetime().optional(),
  limit: z.number().int().min(1).max(5000).default(500),
});

const TemplateInput = z.object({
  name: z.string().min(1).max(120),
  spec: SpecSchema,
  is_shared: z.boolean().default(false),
});

/** Persist a report template. */
export const saveReportTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => TemplateInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("report_templates")
      .insert({
        owner_id: userId,
        name: data.name,
        scope: data.is_shared ? "shared" : "personal",
        spec: data.spec as never,
        is_shared: data.is_shared,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

/** List templates visible to me. */
export const listReportTemplates = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const { data, error } = await supabase
      .from("report_templates")
      .select("id, name, scope, is_shared, spec, updated_at")
      .order("updated_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return { templates: data ?? [] };
  });

const RunInput = z.object({ spec: SpecSchema, export_csv: z.boolean().default(false) });

/** Execute a spec against the allow-listed catalog. */
export const runReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => RunInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const dsKey = data.spec.dataset as DatasetKey;
    const ds = DATASETS[dsKey];
    const cols = (data.spec.dimensions.length ? data.spec.dimensions : ds.columns).filter((c) =>
      (ds.columns as readonly string[]).includes(c),
    );
    const sel = cols.length ? cols.join(",") : "*";

    const { data: role } = await supabase
      .from("user_roles").select("role").eq("user_id", userId).maybeSingle();
    const isAdmin = role?.role === "admin";

    let q = supabase.from(ds.table).select(sel).limit(data.spec.limit);
    if (!isAdmin) q = ds.scoped(q, userId) as typeof q;
    if (data.spec.since) q = q.gte(dateColumnFor(dsKey), data.spec.since);
    if (data.spec.until) q = q.lte(dateColumnFor(dsKey), data.spec.until);

    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    if (data.export_csv) {
      const csv = toCsv((rows ?? []) as unknown as Array<Record<string, unknown>>);
      return { csv, rows: null as null };
    }
    return { csv: null as null, rows: rows ?? [] };
  });

function dateColumnFor(k: DatasetKey): string {
  return k === "enrollments" ? "enrolled_at" : k === "lessons_completed" ? "completed_at" : "submitted_at";
}
