# Phase 1 — Dashboard-Specific Dynamic Course System

Large scope; splitting into 3 shippable milestones so each turn stays safe (no runtime/DB errors) and reviewable. I'll implement M1 immediately after you approve; M2/M3 follow in subsequent turns.

## M1 — Remove Organization dashboard (this turn)

- `src/lib/auth/roles.ts`: drop `"organization"` from `AppRole`, `ROLES`, `SELF_SIGNUP_ROLES`, `ROLE_LABELS`, `ROLE_HOME`; keep string-tolerant `normalizeRole` returning `null` for `organization` so legacy rows fall through to `/dashboard`.
- `src/routes/_dashboard.tsx`: remove `ORGANIZATION_NAV`, org branch in nav resolver, and any org menu entries.
- Delete `src/routes/_dashboard.dashboard.organization.tsx` and any org-only sub-routes.
- Scrub Organization from: onboarding role picker, admin user-mgmt filters, marketing copy where it advertises an "Organization dashboard" specifically. Keep the word "organization" where it just means a company/employer (career pages, jobs).
- No DB migration — leaving the column values intact is safer; the role simply has no UI. Existing org accounts will land on `/dashboard` (fallback) and can be re-roled by admins.

## M2 — Dashboard-scoped Browse (next turn)

Turn `student.browse.tsx` into a router that dispatches by role, plus two sibling views:

- School (`role=student`): class picker (1–12) → subject grid (Math, Science, Physics, Chemistry, Biology, CS, English, Tamil, Social Science). "Open" launches AI course generator for `{class, subject}`.
- College (`role=college_student`): curated catalog (Java, Python, C, C++, DSA, DBMS, OS, Networks, SE, Web, HTML/CSS/JS, React, Node, Express, Mongo, SQL, Cloud, CyberSec, AI, ML, DS, UI/UX, Aptitude, Placement).
- Professional (`role=professional`): upskilling catalog (GenAI, MERN, DevOps, AWS/Azure/GCP, Docker, K8s, CyberSec, Data Analytics, Power BI, Excel, Prompt Eng, UI/UX, Leadership, Comms, PM, Digital Marketing, Finance, Entrepreneurship).

All three lists live as **metadata catalogs** in `src/lib/courses/catalog.ts` (title, slug, level, tags, hero prompt). No lesson text is stored here.

## M3 — AI course generation on demand (next turn)

- New server fn `generateAiCourse({ track, slug, classLevel? })` in `src/lib/ai/engine/ai-course.functions.ts`:
  - Reuses `callGatewayJSON` + existing `ai_course_overviews`/`ai_lesson_content` tables (already personalized per user).
  - New table `ai_generated_courses` (per-user, per-slug) storing generated syllabus (chapters + lessons skeleton) so navigation is stable across sessions.
- Course viewer routes: reuse existing `student.courses.$courseId.*` pattern but resolve `courseId` as either a real UUID (existing catalog) OR an `ai:<slug>` id backed by `ai_generated_courses`. Lesson pages already call `getOrGenerateLessonContent` which regenerates intro/concepts/steps/examples/use-cases/summary/takeaways on demand — this covers the "AI generates lessons, notes, examples, practice, Q&A, revision" requirement without new infra.
- Practice/MCQ/weekly quiz/mock test/assignment tie into the existing `ai_universal_attempts`, `ai_weekly_attempts`, `ai_mock_test_attempts` engines with the generated course as context.

## Guardrails

- No UI redesign — reuse existing `CourseUI`, `LessonEnhancerPanel`, quiz/test components.
- No breaking DB changes; only additive tables in M3.
- Every new server fn behind `requireSupabaseAuth`; RLS + GRANTs in the migration.
- Typecheck after each milestone.

Approve M1 to proceed, or tell me to bundle M1+M2 in one turn.
