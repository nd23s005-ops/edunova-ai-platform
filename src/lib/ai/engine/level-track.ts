// Pure helpers for the Beginner → Industry Ready progression track.

export const LEVEL_ORDER = [
  "beginner",
  "basic",
  "intermediate",
  "advanced",
  "expert",
  "industry_ready",
] as const;

export type CourseLevel = (typeof LEVEL_ORDER)[number];

export const LEVEL_LABEL: Record<CourseLevel, string> = {
  beginner: "Beginner",
  basic: "Basic",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
  industry_ready: "Industry Ready",
};

export function levelIndex(level: CourseLevel): number {
  return LEVEL_ORDER.indexOf(level);
}

export function nextLevel(level: CourseLevel): CourseLevel | null {
  const i = levelIndex(level);
  return i >= 0 && i < LEVEL_ORDER.length - 1 ? LEVEL_ORDER[i + 1] : null;
}

/**
 * Derive a level from overall course progress percentage (0-100).
 * 6 evenly spaced bands map to the 6 levels.
 */
export function levelFromProgress(progress: number): CourseLevel {
  const p = Math.max(0, Math.min(100, progress));
  if (p >= 100) return "industry_ready";
  if (p >= 80) return "expert";
  if (p >= 60) return "advanced";
  if (p >= 40) return "intermediate";
  if (p >= 20) return "basic";
  return "beginner";
}

/**
 * Progress within the current band, 0-100.
 */
export function levelBandProgress(progress: number): number {
  const p = Math.max(0, Math.min(100, progress));
  const band = Math.floor(p / (100 / LEVEL_ORDER.length));
  const start = band * (100 / LEVEL_ORDER.length);
  return Math.round(((p - start) / (100 / LEVEL_ORDER.length)) * 100);
}
