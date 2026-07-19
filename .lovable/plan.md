# Phase 1 — Student Dashboard, Syllabus & Upskilling

Extends existing student, college and professional dashboards without changing Explore, Browse Courses, or Resources. All work is additive.

## 1. My Syllabus (School students, Classes 1–12)

- New route `/_authenticated/dashboard/student/syllabus` and detail routes for board → class → subject.
- Reuse the same catalog data that powers Explore's CBSE / State Board sections — no duplication. Extract the shared list into `src/lib/syllabus/catalog.ts` (if not already there) and consume it from both surfaces.
- Reuse Explore's card + reader components. Progress bars, "Continue where you left off", and enrollment state pulled from existing `course_enrollments` + `lesson_progress`.
- Dashboard home shows an enrolled-syllabus strip that deep-links into `/dashboard/student/syllabus/...`.

## 2. Weekly Assessments (auto-generated)

- New table `weekly_assessments` (syllabus_id, subject, week_start, generated_at) and `weekly_assessment_questions` (assessment_id, category 1–5, order 1–5, prompt, options, answer, explanation). 25 Q per subject, 5 categories × 5.
- Server function `generateWeeklyAssessment` (Lovable AI Gateway, `google/gemini-2.5-flash`) called on demand; results cached per (student, syllabus, subject, ISO week). Idempotent.
- Attempts stored in existing `quiz_attempts`-style table `weekly_assessment_attempts` with per-category scoring.
- Covers: English, Mathematics, Physics, Chemistry, Biology, Botany, Zoology, Computer Science, Commerce, Economics, Accountancy, Business Studies, History, Geography, Political Science. Tamil excluded.
- Route `/_authenticated/dashboard/student/assessments` (list) + `.$assessmentId.tsx` (take).

## 3. Mock Tests

- Keep existing Mock Test module. Add a syllabus-aware entry point in the Student Dashboard that pre-selects the student's enrolled board/class and passes it to the existing generator. No UI redesign.

## 4. Weekly Progress Tracker

- New route `/_authenticated/dashboard/student/progress`.
- Aggregates from existing tables: `lesson_progress`, `quiz_attempts`, `mock_test_attempts`, plus new `weekly_assessment_attempts` and a lightweight `study_sessions` table (user_id, started_at, minutes, subject) written from the reader/lesson pages.
- Charts (Recharts, already installed): weekly hours, lessons completed, assessment scores, mock performance, subject-wise progress, overall %, weak/strong topics (derived from category scores), learning streak, weekly goals.

## 5. Browse Courses access

- Add a "Browse Courses" tile in each dashboard linking to the existing route. No changes to that module.

## 6. Role-gated dashboard content

- Central `DashboardSections` config (`src/lib/dashboard/sections.ts`) mapping role → allowed sections.
- `school_student`: syllabus, weekly assessments, mock tests, weekly progress, school resources. Hides college/professional/enterprise blocks.
- `college_student`: college courses, technical learning, certifications, career prep, resources, assessments, mock tests, progress. Hides school syllabus / CBSE / State Board.
- `professional`: upskilling, certifications, career development, industry paths. Hides school syllabus.
- Guards use existing `has_role` / `useCurrentRole` — no auth changes.

## 7. Upskilling Hub (Phase 1)

- New route tree `/_authenticated/dashboard/upskilling` with 6 courses: Generative AI, OpenAI, HTML, CSS, Tailwind CSS, Figma Design.
- Each course renders 13 documentation sections using the existing `ReaderShell` + `/reader-content/<slug>.json` pipeline: Beginner Guide, Complete Tutorial, PDF Notes, Cheat Sheet, Practice Exercises, Projects, Interview Questions, Learning Roadmap, Best Practices, Common Mistakes, FAQs, Glossary, Reference Guide.
- Content JSON generated with the ai-gateway script and written to `public/reader-content/upskill-<course>-<section>.json`, keeping bundle out of the Worker.
- Registered in `src/lib/upskill/catalog.ts` for the hub landing and cross-links.

## Technical notes

- Migrations: `weekly_assessments`, `weekly_assessment_questions`, `weekly_assessment_attempts`, `study_sessions`. Each with GRANTs and RLS scoped to `auth.uid()`; service_role for admin ops.
- AI calls run via `createServerFn` with `requireSupabaseAuth`; no new edge functions.
- Reader content served as static JSON under `public/reader-content/` (same pattern used for the 1,000+ resource pages).
- Dark/Light theme, responsive layout, and existing navigation preserved. All new routes are additive under `_authenticated/`; nothing existing is renamed or removed.

## Suggested build order

1. Migrations (assessments + study_sessions).
2. Shared syllabus catalog + `DashboardSections` role config.
3. Student Dashboard: My Syllabus, Weekly Assessments, Weekly Progress, Mock Tests entry, Browse Courses tile.
4. College and Professional dashboard section filtering.
5. Upskilling hub scaffold + content generation for 6 courses × 13 sections.

Ships end-to-end without touching Explore, Browse Courses, Resources, or auth.
