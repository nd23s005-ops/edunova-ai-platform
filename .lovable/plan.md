## EduNova AI — Student Course Learning System (Phase 1)

Goal: Build a **reusable, production-ready course engine** for school students. No placeholder syllabus — the schema and UI are ready to receive official board content later.

### 1. Data model (Lovable Cloud migration)

Extend existing `courses` + `course_enrollments` with a full content hierarchy:

```
courses (exists)
 └─ chapters         (order, title, intro, summary)
     └─ lessons      (order, title, theory MD, illustrations JSON, key_notes MD)
         ├─ examples (JSON blocks)
         └─ practice_items (JSON)
 └─ quizzes          (chapter_id, title, time_limit, pass_score)
     └─ quiz_questions (type: mcq | true_false | fill_blank | match, options JSON, answer JSON, explanation)
 └─ assignments      (chapter_id, title, instructions)
     └─ assignment_questions (type: short | long | worksheet, prompt, rubric)
 └─ resources        (course_id or chapter_id, kind: notes | pdf | worksheet | formula | qbank | pyq | mindmap | cheatsheet, title, url/content)
```

Progress tracking tables:
- `lesson_progress` (user, lesson, completed_at)
- `quiz_attempts` (user, quiz, answers JSON, score, submitted_at, time_taken)
- `assignment_submissions` (user, assignment, answers JSON, status, submitted_at)

All tables: RLS scoped to `auth.uid()`, GRANTs to `authenticated` + `service_role`, published content readable when parent course `is_published`.

Enums: reuse `board`, `preferred_language`; add `difficulty` (beginner/intermediate/advanced), `question_type`, `resource_kind`.

**No seed syllabus** — empty tables ready for real content.

### 2. Subject taxonomy

Add a `subjects` reference table (slug, name, icon) seeded with the 15 subjects listed (Mathematics … Logical Reasoning). Courses reference `subject_slug`. This is taxonomy, not syllabus content.

### 3. Routes (TanStack Start, under `_authenticated`)

- `/dashboard/courses` — Catalog: filter by board / class / language / subject / difficulty. Cards show thumbnail, subject, class range, board, duration, difficulty, progress bar, Enroll button.
- `/dashboard/my-courses` — Enrolled courses with progress.
- `/dashboard/courses/$courseId` — Course overview: description, objectives, weekly plan, chapter list, progress ring, resources tab, AI assistant panel.
- `/dashboard/courses/$courseId/chapters/$chapterId` — Chapter view: intro → lessons list → summary → quiz + assignment CTAs.
- `/dashboard/courses/$courseId/lessons/$lessonId` — Lesson player: theory (markdown), illustrations, examples, key notes, practice, "Mark complete" + Next.
- `/dashboard/courses/$courseId/quiz/$quizId` — Quiz runner: timer, progress bar, question nav, autosave to `quiz_attempts`, instant results + explanations.
- `/dashboard/courses/$courseId/assignments/$assignmentId` — Assignment: short/long answer + worksheet, autosave, submit.
- `/dashboard/courses/$courseId/complete` — Completion summary + recommended next.

### 4. Course engine components

- `CourseCard`, `CourseFilters`, `ChapterList`, `LessonPlayer`, `QuizRunner`, `AssignmentForm`, `ResourceLibrary`, `ProgressRing`, `WeeklyPlan`, `AiAssistantPanel`.
- Progress computed from `lesson_progress` + `quiz_attempts` + `assignment_submissions` vs. total course content (server fn).

### 5. AI Learning Assistant

Reuse existing `/api/chat` route. Extend `useAssistantContext` to inject: student class, board, language, current course/chapter/lesson title + theory excerpt. Preset prompts: Explain, Summarize, Examples, Solve doubt, Generate practice, Revision tips.

### 6. Enrollment flow

Enroll → insert `course_enrollments` → toast success → redirect to course overview. Unenroll from My Courses.

### 7. UX

- Responsive (mobile/tablet/desktop).
- Uses existing design tokens.
- Loading skeletons, empty states ("Syllabus coming soon" when a course has no chapters yet), error boundaries.

### 8. Out of scope (Phase 1)

- No actual syllabus content (empty content-ready tables).
- No admin CMS UI to author content (content will be inserted by admins via migrations or a future Phase 2 CMS).
- No certificates, gamification, payments.

### Technical details

- Server functions in `src/lib/courses.functions.ts`, `quizzes.functions.ts`, `progress.functions.ts` with `requireSupabaseAuth`.
- TanStack Query for all reads (`ensureQueryData` + `useSuspenseQuery`).
- Timer/autosave in QuizRunner uses `setInterval` + debounced upsert to `quiz_attempts.answers`.

---

**Confirm and I'll ship it.** This is a large build (~1 migration, ~10 routes, ~15 components, ~5 server-fn modules). Want me to proceed as-is, or trim anything (e.g., defer assignments or resource library to Phase 1.5)?
