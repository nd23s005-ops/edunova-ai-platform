import { describe, expect, it } from "vitest";
import {
  audienceForClass,
  assertClassRange,
  ClassRangeSchema,
  CLASS_MAX_BOUND,
  CLASS_MIN_BOUND,
  validateClassRange,
} from "./classRange";
import { CATALOG_BY_ROLE } from "./catalog";

describe("validateClassRange — DB constraint bounds", () => {
  it("accepts the inclusive DB bounds", () => {
    expect(validateClassRange({ class_min: CLASS_MIN_BOUND, class_max: CLASS_MIN_BOUND }).ok).toBe(true);
    expect(validateClassRange({ class_min: CLASS_MAX_BOUND, class_max: CLASS_MAX_BOUND }).ok).toBe(true);
  });

  it("rejects values outside the DB check constraint (courses_class_{min,max}_check)", () => {
    expect(validateClassRange({ class_min: 0, class_max: 12 }).ok).toBe(false);
    expect(validateClassRange({ class_min: 1, class_max: 31 }).ok).toBe(false);
    expect(validateClassRange({ class_min: -3, class_max: 12 }).ok).toBe(false);
    expect(validateClassRange({ class_min: 6, class_max: 999 }).ok).toBe(false);
  });

  it("rejects non-integers and inverted ranges", () => {
    expect(validateClassRange({ class_min: 6.5, class_max: 12 }).ok).toBe(false);
    expect(validateClassRange({ class_min: 12, class_max: 6 }).ok).toBe(false);
  });

  it("rejects cross-audience spans", () => {
    // school (12) → college (13) span is not a supported single-audience course
    const r = validateClassRange({ class_min: 12, class_max: 13 });
    expect(r.ok).toBe(false);
  });
});

describe("boundary enrollment payloads per role", () => {
  // These mirror the three enrollment paths the app supports. If any of these
  // fail, an enrollment insert into `courses` would violate
  // courses_class_min_check / courses_class_max_check at runtime.

  it("School boundary values (1..12) validate as `school`", () => {
    for (const n of [1, 6, 10, 12]) {
      const r = assertClassRange({ class_min: n, class_max: n });
      expect(r.audience).toBe("school");
    }
  });

  it("College boundary values (13..16) validate as `college`", () => {
    for (const n of [13, 14, 15, 16]) {
      const r = assertClassRange({ class_min: n, class_max: n });
      expect(r.audience).toBe("college");
    }
    // College courses that span the whole undergrad window
    expect(assertClassRange({ class_min: 13, class_max: 16 }).audience).toBe("college");
  });

  it("Working professional boundary values (17..30) validate as `professional`", () => {
    for (const n of [17, 20, 25, 30]) {
      const r = assertClassRange({ class_min: n, class_max: n });
      expect(r.audience).toBe("professional");
    }
    expect(assertClassRange({ class_min: 20, class_max: 20 }).audience).toBe("professional");
  });

  it("audienceForClass classifies boundary integers correctly", () => {
    expect(audienceForClass(1)).toBe("school");
    expect(audienceForClass(12)).toBe("school");
    expect(audienceForClass(13)).toBe("college");
    expect(audienceForClass(16)).toBe("college");
    expect(audienceForClass(17)).toBe("professional");
    expect(audienceForClass(30)).toBe("professional");
    expect(audienceForClass(0)).toBeNull();
    expect(audienceForClass(31)).toBeNull();
  });
});

describe("ClassRangeSchema (zod) — CMS payload guard", () => {
  it("accepts a valid CMS payload", () => {
    expect(() => ClassRangeSchema.parse({ class_min: 6, class_max: 12 })).not.toThrow();
    expect(() => ClassRangeSchema.parse({ class_min: 13, class_max: 16 })).not.toThrow();
    expect(() => ClassRangeSchema.parse({ class_min: 20, class_max: 20 })).not.toThrow();
  });

  it("rejects out-of-range or cross-audience CMS payloads before SQL insert", () => {
    expect(() => ClassRangeSchema.parse({ class_min: 0, class_max: 12 })).toThrow();
    expect(() => ClassRangeSchema.parse({ class_min: 6, class_max: 31 })).toThrow();
    expect(() => ClassRangeSchema.parse({ class_min: 12, class_max: 13 })).toThrow();
    expect(() => ClassRangeSchema.parse({ class_min: 15, class_max: 10 })).toThrow();
  });
});

describe("virtual catalog self-check", () => {
  // Every entry that the app can seed via ensureCatalogCourse must already
  // satisfy the DB constraint — a bad row here would blow up enrollment.
  const allEntries = [
    ...CATALOG_BY_ROLE.student.categories.flatMap((c) => c.courses),
    ...CATALOG_BY_ROLE.college_student.categories.flatMap((c) => c.courses),
    ...CATALOG_BY_ROLE.professional.categories.flatMap((c) => c.courses),
  ];

  it("has entries", () => {
    expect(allEntries.length).toBeGreaterThan(0);
  });

  it("every catalog course passes validateClassRange", () => {
    const bad = allEntries
      .map((c) => ({ slug: c.slug, result: validateClassRange({ class_min: c.class_min, class_max: c.class_max }) }))
      .filter((r) => !r.result.ok);
    expect(bad, `Invalid catalog entries: ${JSON.stringify(bad, null, 2)}`).toEqual([]);
  });

  it("student catalog is scoped to the school audience", () => {
    for (const cat of CATALOG_BY_ROLE.student.categories) {
      for (const c of cat.courses) {
        expect(assertClassRange({ class_min: c.class_min, class_max: c.class_max }).audience).toBe("school");
      }
    }
  });

  it("college catalog is scoped to the college audience", () => {
    for (const cat of CATALOG_BY_ROLE.college_student.categories) {
      for (const c of cat.courses) {
        expect(assertClassRange({ class_min: c.class_min, class_max: c.class_max }).audience).toBe("college");
      }
    }
  });

  it("professional catalog is scoped to the professional audience", () => {
    for (const cat of CATALOG_BY_ROLE.professional.categories) {
      for (const c of cat.courses) {
        expect(assertClassRange({ class_min: c.class_min, class_max: c.class_max }).audience).toBe("professional");
      }
    }
  });
});
