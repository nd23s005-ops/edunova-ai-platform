## MASTER FIX 1 — Plan

Scope is large; I'll ship in one turn but split cleanly. No UI rewrites — only additive/targeted edits.

### 1. Simplify onboarding flow
- `src/routes/onboarding.tsx`: drop step 2 (learning preferences sub-categories). After picking a role, go straight to step 2 = auth CTA (Login / Create account). Admin flow unchanged.
- Remove `PREFERENCES` map and its screen. `totalSteps` becomes 2. `preference` param dropped from navigation payloads.
- `_auth.login.tsx` / `_auth.register.tsx`: keep accepting `role` in search; ignore `preference` if present (backwards-compatible).

### 2. Correct dashboard identity
- Add `src/lib/auth/role-labels.ts` exporting `roleLabel(role)` → "School Student" / "College Student" / "Working Professional" / "Administrator".
- Update the dashboard shell (`_dashboard.tsx`) header + profile badge to use `roleLabel(currentRole)`.
- Update each dashboard index (`.student.index.tsx`, `.college.tsx`, `.professional.tsx`) titles/breadcrumbs to use the correct label.

### 3 + 4. AI-generated dashboard sections & categories
- New server fn `src/lib/ai/dashboard-brief.functions.ts` — `generateDashboardBrief({ role, interests? })` returns JSON:
  `{ featuredCourses[], recommendedLearning[], trendingTopics[], weeklyGoals[], learningSuggestions[], practiceRecommendations[], skillHighlights[], progressInsights[], categories[] }`. Uses Gemini via existing Lovable AI Gateway helper. Cached in `ai_insights` table (already exists) keyed by `user_id + role + 'dashboard_brief'` with 12h TTL.
- Categories differ per role via role-specific system prompts (School = subjects; College = programming/CS/placement; Professional = upskilling/cloud/leadership etc).
- New `src/components/dashboard/AIBriefSections.tsx` renders the 8 sections + categories as cards. Mounted on all three dashboard indexes below existing content (non-destructive).

### 5. AI Custom Learning Roadmap
- New table `learning_roadmaps` (id, user_id, goal, level, weekly_hours, target_date, interests, plan jsonb, created_at). GRANTs + RLS scoped to `auth.uid()`.
- Server fn `generateRoadmap({ goal, level, hours, targetDate, interests })` — Gemini structured output → phases, courses, milestones, practice, assessments, resources, checkpoints. Store row, return plan.
- Route `src/routes/_dashboard.dashboard.roadmap.tsx` (shared by all three roles) — form + rendered roadmap + regenerate button + history list.
- Sidebar link "Custom Roadmap" in `_dashboard.tsx` for student/college/professional.

### 6. Auto-link resources to courses
- Existing `src/lib/courses/resource-seed.server.ts` already token-matches. Extend `seedCourseSkeleton` / `ensureCatalogCourse` path so that when a course is opened or enrolled, if `course_resources` has zero rows, we run the matcher against the marketing library slugs (already covered). Additionally: on the course detail page's resource tab, if empty → show friendly empty state (already partially present) + a "Notify me when added" placeholder button (no-op toast).
- No duplicate resource creation — token-mapping is idempotent, verified.

### Non-goals / preserved
- UI, animations, dark/light theme, routing, auth, DB schema (except one additive table), APIs.
- No changes to existing course engine, quiz engine, assessments, community.

### Technical notes
- All AI calls: `google/gemini-3-flash-preview` via `createLovableAiGatewayProvider` + `Output.object` (structured), guarded with `NoObjectGeneratedError`.
- All server fns use `requireSupabaseAuth`. New table + RLS + GRANTs in one migration.
- Zero-crash guard: dashboard sections render skeletons while loading; on AI error fall back to a static role-specific mini set so dashboards never blank.
