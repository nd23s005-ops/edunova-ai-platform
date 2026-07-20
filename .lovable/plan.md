
# Universal AI Learning Engine (Prompts 2A + 2B)

This is a large, multi-phase build. To keep it safe against the existing platform (courses, quizzes, weekly assessments, upskilling, dashboards, admin), I'll ship it in ordered phases. Each phase is independently working and typechecks clean before the next starts.

## Decision needed first — Certificates

Prompt 2B introduces **AI Certification (Course Certificate, Digital Badge, XP, Achievement Badge)**. Earlier in this project you explicitly asked me to **REMOVE ALL CERTIFICATE FEATURES** and replace them with "Completed + progress". These conflict.

Please pick one before I start Phase 6:
- **A. Keep the earlier rule** — no certificates. Ship only XP + Digital Badge + Achievement Badge + "Completed" state.
- **B. Reintroduce certificates** — full certificate page + shareable link + PDF, alongside XP/badges.
- **C. Badges + XP only, no certificate, no PDF.**

I'll proceed with Phases 1–5 in parallel; certificate/badge phase (6) waits on your answer.

## Scope note — what already exists (won't be rebuilt)

- Courses, chapters, lessons, quizzes, assignments schema + student course routes
- Upskilling Hub (6 curated courses)
- AI Daily Quiz, AI Subject Quizzes, AI Weekly Assessments (Gemini)
- Nova floating chat + dedicated AI Assistant page (already lesson-context aware)
- Mock Tests, syllabus catalog, resources library
- Role split (school_student, college_student, professional, organization), notifications, Cmd+K search

The Learning Engine layers **on top** of these — it does not replace `courses`, `lessons`, `chapters`, `lesson_progress`, `course_enrollments`, or the existing assistant.

## Phase 1 — Learner profile & context resolver

Single source of truth every AI generator reads from.

- New table `learner_context` (per user): `skill_level`, `career_goal`, `learning_speed`, `interests[]`, `weak_topics[]`, `strong_topics[]`, `preferred_depth`, updated by triggers/functions from quiz/assessment results.
- Server fn `getLearnerContext()` — merges profile + role + recent performance + enrollments; cached per request.
- Backfill from existing `subject_quiz_attempts` + `ai_weekly_attempts` weak/strong topics.

## Phase 2 — AI Course Overview generator

On "View Course" / "Enroll":

- New table `ai_course_overviews` (course_id + user_id unique): overview, objectives[], skills[], industry_relevance, career_opportunities[], outcomes[], prerequisites[], generated_at, model, hash.
- Server fn `generateCourseOverview({ courseId })` — Gemini 3 Flash via Lovable AI Gateway; personalizes to learner context.
- Course landing route reads (or lazily generates) the overview; skeleton while generating; regenerate button (rate-limited).

## Phase 3 — Progressive Level Track

- Add columns to `course_enrollments`: `current_level` (`beginner|basic|intermediate|advanced|expert|industry_ready`), `level_progress`, `estimated_completion_minutes`.
- Derivation function computes level from lesson_progress + quiz scores + assignment scores.
- Reusable `<LevelTrack />` component (6-step rail) shown on course landing + student home "Continue learning" card.

## Phase 4 — AI Lesson Enhancer + Resume

- New table `ai_lesson_content` (lesson_id + user_id): intro, concepts[], steps[], examples[], visual_description, use_cases[], summary, key_takeaways[].
- Server fn `getOrGenerateLessonContent({ lessonId })` — generates lazily, keyed by (lesson_id, learner_context_hash) so it only regenerates when learner context materially changes.
- Table `lesson_reading_position` (lesson_id + user_id): `scroll_percent`, `last_section`, `updated_at`.
- Lesson route: throttled scroll writer; on load, scroll to saved position.
- Student home "Resume learning" card uses the most recent `lesson_reading_position` + `lesson_progress`.

## Phase 5 — AI Practical Learning by category

Category resolver on `courses.category` → generator:
- Programming → coding exercise (starter code, hidden tests, run in-browser sandbox: string-based checks only, no execution runtime); debugging, output prediction, code completion.
- Design → UI/UX challenge briefs + rubric.
- Business → case studies + strategy prompts.
- Soft skills → communication/leadership scenarios.

All generated on demand and cached per (lesson_id, user_id, kind).

## Phase 6 — Certification / Badge engine (BLOCKED on decision above)

Depending on A/B/C:
- `achievements` table (badge_type, xp, awarded_at, source_id).
- Completion trigger when course reaches `industry_ready` + all assessments passed threshold.
- Optional certificate page/PDF (only if B).

## Phase 7 — AI Tutor (Prompt 2B)

- In-lesson tutor panel — a lesson-scoped variant of the existing ChatWindow.
- New chat api sub-route `/api/chat/tutor` — same Lovable AI Gateway path, but system prompt is built from `{ lesson content, learner context, weak topics }`.
- Actions: "Explain simpler", "Give an example", "Quiz me on this", "Hint", "Why was I wrong?" (deep-links from wrong quiz answers).

## Phase 8 — AI Roadmap Generator

- Table `learner_roadmaps` (user_id, generated_at, milestones jsonb).
- Server fn regenerates when `learner_context.updated_at` changes or on demand.
- New route `/dashboard/student/roadmap` upgraded from current placeholder to render milestones, current position, next 3 actions, and course/lesson deep links.

## Phase 9 — Notes / Cheat sheets / Mind maps / Formulas

- Table `ai_lesson_notes` (lesson_id + user_id + kind): smart_notes, revision, cheat_sheet, mind_map (as indented outline text — no graph lib), formula_sheet, code_snippets, key_concepts.
- Lesson page tabbed panel: Notes / Revision / Cheat sheet / Mind map / Formulas / Snippets.
- One "Generate all" action + per-kind regenerate.

## Phase 10 — AI Assignment & Project generators

- Extend `assignments` with `ai_generated boolean`, `difficulty`, `learner_id nullable` for per-learner AI assignments (existing course-wide assignments untouched).
- New table `ai_projects` (course_id + user_id + tier `mini|intermediate|advanced|portfolio|capstone`): brief, requirements[], stretch_goals[], rubric[], evaluation_criteria[].
- Rendered on course landing + a new `/dashboard/student/projects` index.

## Phase 11 — AI Resource Recommendation

- Server fn `recommendResources({ courseId, lessonId? })` returns links grouped by kind (docs, articles, videos, practice sites, GitHub, open source, case studies). URLs limited to well-known safe domains; every AI response passes a domain allowlist filter before display.
- Shown in a "Recommended for you" tab on the lesson and course pages.

## Phase 12 — Global AI Recommendations

- Server fn `getRecommendations()` returning next lesson, next course, practice questions, mock tests, projects, career path, interview prep.
- Feeds the student home "For you" strip and the notification insight writer.

## Technical Details

- **Model**: `google/gemini-3-flash-preview` via Lovable AI Gateway (default), through AI SDK + `createLovableAiGatewayProvider`. All prompts/tools/keys server-side. Structured output via `Output.object` with constraint-free schemas + `NoObjectGeneratedError` guard + prompt-stated limits (per `ai-sdk-lovable-gateway`).
- **Server functions**: one `*.functions.ts` per generator under `src/lib/ai/engine/`; helpers in sibling `.server.ts` files to keep handler bodies self-contained (server-fn splitting rule).
- **RLS**: every new `public.*` table gets GRANT + RLS + owner-scoped policy (`auth.uid() = user_id`); admin read via `has_role`.
- **Caching keys**: `(user_id, resource_id, learner_context_hash)` so regeneration is deterministic and cheap.
- **UI**: React Suspense + `useSuspenseQuery`; lazy-load heavy panels (Tutor, Notes, Roadmap) with `React.lazy`; skeletons match final layout to avoid CLS.
- **Errors**: 429/402 gateway errors surfaced as inline toasts with retry-later copy; captured to existing `debug_error_captures`.
- **Backwards compat**: no destructive migrations on existing tables; new columns are additive + nullable + defaulted.
- **Typecheck**: `bunx tsgo` must be clean between phases.

## Recommended shipping order

I'll ship in two batches to keep review size sane:

1. **Batch 1** (this next turn): Phases 1, 2, 3, 4 — foundation + Course Overview + Level Track + Lesson Enhancer + Resume. Highest-visibility surface for you to sanity-check before the rest is built on top.
2. **Batch 2**: Phases 5, 7, 8, 9, 10, 11, 12.
3. **Batch 3**: Phase 6 (after your certificate decision).

Please:
1. Pick **A / B / C** for certificates.
2. Confirm the batch order above (or ask me to reorder — e.g. "AI Tutor first").

Once you answer, I start Batch 1.
