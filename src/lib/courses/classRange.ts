// Shared class_min / class_max validation for course records.
//
// The `courses` table enforces `courses_class_min_check` and
// `courses_class_max_check` with bounds 1..30. In addition to the raw DB
// bounds, the app supports three learner audiences (school, college,
// professional) and each has its own inclusive class range.
//
// Every path that seeds catalog courses, creates/edits courses via CMS,
// or enrolls users into courses MUST validate through `validateClassRange`
// before touching the database, so the DB constraint is never the first
// line of defense.
//
// Keep this file dependency-free so it is safe to import from both server
// and client bundles (and from unit tests).

import { z } from "zod";

export const CLASS_MIN_BOUND = 1;
export const CLASS_MAX_BOUND = 30;

export type LearnerAudience = "school" | "college" | "professional";

export const CLASS_RANGE_BY_AUDIENCE: Record<
  LearnerAudience,
  { min: number; max: number }
> = {
  school: { min: 1, max: 12 },
  college: { min: 13, max: 16 },
  // Professional courses are encoded as class 17..30 in the catalog and DB.
  professional: { min: 17, max: 30 },
};

/** Classify a numeric class value into a supported learner audience. */
export function audienceForClass(n: number): LearnerAudience | null {
  if (!Number.isInteger(n)) return null;
  if (n >= CLASS_RANGE_BY_AUDIENCE.school.min && n <= CLASS_RANGE_BY_AUDIENCE.school.max) return "school";
  if (n >= CLASS_RANGE_BY_AUDIENCE.college.min && n <= CLASS_RANGE_BY_AUDIENCE.college.max) return "college";
  if (n >= CLASS_RANGE_BY_AUDIENCE.professional.min && n <= CLASS_RANGE_BY_AUDIENCE.professional.max) return "professional";
  return null;
}

export type ClassRangeInput = { class_min: number; class_max: number };
export type ClassRangeValidation =
  | { ok: true; value: ClassRangeInput; audience: LearnerAudience }
  | { ok: false; reason: string };

/**
 * Validate a `{ class_min, class_max }` pair against the DB check constraint
 * AND the app's learner-audience ranges. Both endpoints must fall inside the
 * same audience bucket — the catalog never mixes school + college in one row.
 */
export function validateClassRange(input: ClassRangeInput): ClassRangeValidation {
  const { class_min, class_max } = input;
  if (!Number.isInteger(class_min) || !Number.isInteger(class_max)) {
    return { ok: false, reason: "class_min and class_max must be integers" };
  }
  if (class_min < CLASS_MIN_BOUND || class_min > CLASS_MAX_BOUND) {
    return { ok: false, reason: `class_min ${class_min} outside DB bounds ${CLASS_MIN_BOUND}..${CLASS_MAX_BOUND}` };
  }
  if (class_max < CLASS_MIN_BOUND || class_max > CLASS_MAX_BOUND) {
    return { ok: false, reason: `class_max ${class_max} outside DB bounds ${CLASS_MIN_BOUND}..${CLASS_MAX_BOUND}` };
  }
  if (class_min > class_max) {
    return { ok: false, reason: `class_min ${class_min} must be <= class_max ${class_max}` };
  }
  const minAudience = audienceForClass(class_min);
  const maxAudience = audienceForClass(class_max);
  if (!minAudience || !maxAudience) {
    return { ok: false, reason: "class range does not map to a supported learner audience" };
  }
  if (minAudience !== maxAudience) {
    return {
      ok: false,
      reason: `class_min/class_max span multiple audiences (${minAudience}/${maxAudience})`,
    };
  }
  return { ok: true, value: { class_min, class_max }, audience: minAudience };
}

/** Throwing variant for server-side use (throws Error with a stable message). */
export function assertClassRange(input: ClassRangeInput, context = "class range"): {
  audience: LearnerAudience;
  value: ClassRangeInput;
} {
  const result = validateClassRange(input);
  if (!result.ok) throw new Error(`Invalid ${context}: ${result.reason}`);
  return { audience: result.audience, value: result.value };
}

/**
 * Zod refinement for `{ class_min, class_max }` — reuse in server schemas
 * (CMS create/update) so payloads are rejected before the SQL insert runs.
 */
export const ClassRangeSchema = z
  .object({
    class_min: z.number().int().min(CLASS_MIN_BOUND).max(CLASS_MAX_BOUND),
    class_max: z.number().int().min(CLASS_MIN_BOUND).max(CLASS_MAX_BOUND),
  })
  .superRefine((val, ctx) => {
    const result = validateClassRange(val);
    if (!result.ok) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: result.reason });
    }
  });
