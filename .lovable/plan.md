# Universal AI Dashboard — Personalization & Role Split

Existing dashboards (Student/Professional/Organization/Super Admin), sidebar, theme, AI assistant, assessments, mock tests, upskilling, syllabus, RBAC, and lazy routes are already in place. This plan adds the four gaps you selected and splits `student` into `school_student` + `college_student`.

## 1. Role split: `student` → `school_student` + `college_student`

Highest-risk change. Done first so the personalized dashboard can branch cleanly.

**Migration (single call):**
- Extend `app_role` enum: `ALTER TYPE app_role ADD VALUE 'school_student'; ADD VALUE 'college_student';`
- Backfill: `UPDATE public.user_roles SET role = CASE WHEN sp.education_level IN ('undergraduate','graduate','postgraduate') THEN 'college_student' ELSE 'school_student' END FROM public.student_profiles sp WHERE user_roles.user_id = sp.user_id AND user_roles.role = 'student';` remaining `'student'` rows → `'school_student'`.
- Update `handle_new_user()` to map incoming `role` metadata (`school_student`, `college_student`, legacy `student` → `school_student`, `college_student`) and set `onboarding_completed` accordingly.
- Keep `'student'` enum value (Postgres can't drop enum values safely); code stops emitting it.

**Code (`src/lib/auth/roles.ts`):**
- `AppRole = 'school_student' | 'college_student' | 'organization' | 'professional' | 'admin'`.
- `normalizeRole()` maps legacy `'student'` → `'school_student'` for safety.
- `homeForRole`: school → `/dashboard/student`, college → `/dashboard/college`, others unchanged.
- Update `ROLE_LABELS`, onboarding role picker copy, RoleGate consumers, `_dashboard.tsx` NAV_BY_ROLE (add `college_student` sidebar; school keeps existing student nav minus college-only tiles), `_dashboard.dashboard.index.tsx` redirect logic.
- New route: `src/routes/_dashboard.dashboard.college.tsx` (college workspace: enrolled courses, upskilling, AI roadmap placeholder, coding practice, placement prep, resume builder, career recs — reusing existing widgets where present, `PlaceholderPanel` for the rest).
- School Student dashboard: remove upskilling/mock-test tiles that target working audiences; keep syllabus, assessments, quizzes, streak.

## 2. Personalized home + Continue Learning

`src/components/dashboard/PersonalizedHome.tsx` — role-aware header injected at top of each workspace route:
- Welcome message (time-of-day + full name).
- Daily / weekly / monthly goal cards (reads `study_sessions` aggregates).
- Continue-learning card: last row from `lesson_progress` joined to `lessons`+`courses`, deep-links to `/dashboard/student/courses/$id/lessons/$id`.
- AI recommendation strip: server fn `getPersonalizedRecommendations` (Gemini flash) using role, recent activity, weak topics from `subject_quiz_attempts`/`ai_weekly_attempts`. Cached 10 min per user.

## 3. Global Search (Cmd+K)

`src/components/search/CommandPalette.tsx` using shadcn `Command` + `Dialog`:
- Trigger: `⌘K` / `Ctrl+K` global listener, plus search button in topbar.
- Sources: static resource catalog (`src/lib/resources/catalog.ts`), courses (`courses` table via server fn), lessons (via `useServerFn` searching enrolled courses), assessments (`ai_weekly_attempts` history).
- Groups: Courses / Lessons / Resources / Assessments / Actions (jump to routes).
- Fuzzy filter client-side; server fn `globalSearch({ q })` returns top-N per group.

## 4. Notification Center + AI Insights

Migration adds `public.notifications (id, user_id, kind, title, body, href, read_at, priority, created_at)` with RLS `auth.uid() = user_id`.

- `NotificationBell` in topbar (badge for unread) opens popover list; mark-as-read on click.
- Server-side generators (called from existing flows, not new cron): on assessment submit → insert insight row; on streak breaks → insert alert; on new upskill course match → insert recommendation. Add a `generateDailyInsights` server fn callable from the dashboard index once per day per user (guarded by `last_insight_at` in profile).
- Insights feed panel on personalized home surfaces the same rows filtered by `kind='insight'`.

## 5. Dashboard Customization

Migration adds `profiles.dashboard_prefs jsonb default '{}'` (nullable, per-user).

- `useDashboardPrefs()` hook reads/writes via server fn `updateDashboardPrefs`.
- Widgets on each workspace: wrap each in `<CustomizableWidget id="..." title="..."/>` supporting pin / hide / reorder (dnd-kit already NOT installed → use HTML5 native drag or lightweight `@dnd-kit/core`; will add).
- "Customize" button in dashboard header toggles edit mode. Compact/expanded density stored in prefs; applied via CSS variable on `<main>`.

## Sequencing

1. Approve plan → run the two migrations (role enum + notifications/prefs) as a single migration.
2. Regenerate types.
3. Land role split + college dashboard route.
4. Ship PersonalizedHome + Continue Learning card.
5. Add Cmd+K palette + server fn.
6. Add Notification bell, insights generation hooks, migration triggers.
7. Add customization wrapper + prefs hook + reorder.
8. Typecheck; verify existing modules unchanged.

## Technical notes

- `app_role` enum can't drop `'student'`; code path normalizes it away, no user-visible impact.
- All new server fns use `requireSupabaseAuth`.
- Notifications inserted only via server fns / SQL triggers — no client writes.
- No changes to auth flow, existing dashboards' business logic, or resource catalog.
- Estimated ~15 new/edited files; every touched area gated to prevent regression.
