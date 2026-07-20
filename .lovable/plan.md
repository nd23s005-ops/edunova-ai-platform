# Master Prompt 6 — AI Career & Placement Engine

Extend EduNova AI with a full Career Accelerator layer: dashboard, roadmaps, skill gap, resume, ATS, portfolio, projects, internships, jobs, interview prep, mock interviews, coding practice, certifications, career assistant. Nothing existing is rewritten; every new surface is additive under `/dashboard/career/*`.

## Guiding constraints

- Preserve all existing engines (Dashboard, Learning, Assessment, CMS, Admin, Analytics), auth, routing, theme, and RLS patterns.
- All AI generation goes through the existing Lovable AI Gateway helper (`callGatewayJSON`) using `google/gemini-3-flash-preview`.
- Every new table: GRANTs + RLS + `auth.uid()`-scoped policies in the same migration.
- All server logic via `createServerFn` + `requireSupabaseAuth`. No new edge functions.
- Routes live under the existing `_dashboard` layout; each route has its own `head()` metadata.
- Zero jobs/internship scraping in this phase — data model + AI recommendations + placeholder external-integration adapters only (architecture-ready).

## Phase 1 — Data foundation (single migration)

New tables (all with `user_id uuid → auth.users`, RLS = owner-only, GRANT authenticated + service_role, updated_at trigger):

```text
career_profiles          career goal, target roles, locations, experience level, work mode, bio, socials
career_roadmaps          role, milestones jsonb, generated_at, status, progress
skill_gap_reports        current_skills, missing_skills, weak, strong, readiness_pct, recs
resumes                  title, template, sections jsonb, ats_score, versions jsonb[]
resume_versions          resume_id, snapshot jsonb, note
ats_reports              resume_id, jd_text, score, keywords_matched, missing, suggestions
portfolios               slug (unique), theme, is_public, sections jsonb, share_token
portfolio_visits         portfolio_id, ip_hash, ua_hash, visited_at (analytics)
project_recommendations  level, title, objective, features, tech, outcome, saved
internships              source, title, company, location, mode, skills, url, ai_match_score
internship_applications  internship_id/manual, status enum, notes, applied_at
jobs                     source, title, company, location, mode, type, skills, url, ai_match_score
job_applications         job_id/manual, status enum, notes, applied_at
interview_sessions       kind (hr/technical/mock), topic, config jsonb, status
interview_turns          session_id, role, content, feedback jsonb, score
coding_challenges        topic, difficulty, prompt, tests jsonb, source
coding_submissions       challenge_id, code, language, verdict, runtime_ms, streak_day
career_certifications    title, issuer, url, credential_id, issued_at, verified
career_goals             cadence (weekly/monthly), title, target, progress, due_at
career_notifications     kind, payload, read_at   (reuses existing notifications where possible)
```

Enums: `application_status`, `interview_kind`, `roadmap_status`, `challenge_difficulty`.

Views: `v_career_dashboard_snapshot` (readiness scores computed from the above).

## Phase 2 — Server functions (`src/lib/career/*.functions.ts`)

Each file exports `createServerFn` handlers wired with `requireSupabaseAuth`.

- `profile.functions.ts` — get/update career profile
- `dashboard.functions.ts` — aggregated readiness snapshot (resume %, portfolio %, skills %, placement %, streak, upcoming interviews)
- `roadmap.functions.ts` — `generateRoadmap` (Gemini JSON), `updateRoadmapProgress`, `listRoadmaps`
- `skill-gap.functions.ts` — `analyzeSkillGap` (pulls learner_context + assessments, sends to Gemini)
- `resume.functions.ts` — CRUD, autosave, versions, AI writing suggestions per section, PDF/DOCX export via `pdf-lib` + `docx`
- `ats.functions.ts` — parse resume + JD → Gemini scoring
- `portfolio.functions.ts` — CRUD + public read via publishable client (narrow anon SELECT on `is_public=true`)
- `projects.functions.ts` — `recommendProjects`, save/star
- `internships.functions.ts` / `jobs.functions.ts` — `recommendInternships`, `recommendJobs` (AI-only feed today, with `SourceAdapter` interface ready for LinkedIn / Indeed / Naukri / Internshala later), application tracking
- `interview.functions.ts` — start session, next question, submit answer, finalize; both HR + technical + mock
- `coding.functions.ts` — list challenges, submit code (AI grader for now), streak/ranking
- `certifications.functions.ts` — CRUD + verification ID generator
- `assistant.functions.ts` — general-purpose career Q&A grounded in the user's snapshot
- `goals.functions.ts` — weekly/monthly goal CRUD and progress

Shared: `src/lib/career/career.server.ts` (Gemini helper wrappers, scoring math, integration adapter interface).

## Phase 3 — Routes (`src/routes/_dashboard.dashboard.career.*.tsx`)

Layout: `_dashboard.dashboard.career.tsx` with tabbed nav.

Leaves:

```text
career.index.tsx            Career Dashboard (KPI grid, charts, quick actions)
career.roadmap.tsx          Roadmap generator + progress
career.skill-gap.tsx        Skill gap analyzer
career.resume.index.tsx     Resume list
career.resume.$id.tsx       Live editor + preview + export
career.ats.tsx              ATS analyzer (upload resume + JD)
career.portfolio.tsx        Portfolio builder
career.projects.tsx         AI project recommendations
career.internships.tsx      Feed + tracker
career.jobs.tsx             Feed + tracker
career.interview.tsx        HR + Technical picker
career.interview.$id.tsx    Live interview runner
career.mock.tsx             Mock interview center
career.coding.tsx           Coding practice hub
career.coding.$slug.tsx     Challenge runner
career.certifications.tsx   Certification center
career.profile.tsx          Professional profile
career.analytics.tsx        Career analytics (charts)
career.assistant.tsx        AI career chat (reuses AI SDK chat pattern)
career.goals.tsx            Weekly / monthly goals
```

Public: `src/routes/p.$slug.tsx` — public portfolio page (SSR-safe, publishable client, narrow anon policy).

Sidebar/nav in existing dashboard gains a "Career" section.

## Phase 4 — Components (`src/components/career/`)

`ReadinessRing`, `KpiTile`, `RoadmapTimeline`, `SkillGapRadar`, `ResumeSectionEditor`, `ResumePreview`, `AtsScoreCard`, `PortfolioThemePicker`, `ProjectCard`, `OpportunityCard`, `ApplicationStatusPill`, `InterviewTurn`, `CodeEditor` (Monaco lazy), `ChallengeCard`, `CertificateCard`, `CareerAssistantPanel`, `GoalTracker`. All use existing shadcn tokens + theming.

## Phase 5 — Cross-cutting

- Extend `notifications` with career kinds (`career.job`, `career.internship`, `career.interview`, `career.resume`, `career.milestone`).
- Track events through the existing `trackEvent` analytics helper (career category).
- `AdapterRegistry` interface so LinkedIn / GitHub / Indeed / Naukri / Internshala / HackerRank / LeetCode / CodeChef can be added later without route or schema churn.
- Feature flag `career.enabled` in `platform_settings` (already exists) so admins can gate rollout.

## Technical details

- Deps to add: `pdf-lib` (resume PDF export), `docx` (resume DOCX export), `@monaco-editor/react` (coding editor, lazy). No native modules.
- Public portfolio uses server publishable client with `apikey`-only header shim.
- AI grading of code is Gemini + static tests only in this phase; sandboxed execution is out of scope.
- All AI calls capped at ≤ 4k tokens output, JSON-schema-validated with `safeParse`.

## Delivery order

1. Phase 1 migration (approval gate).
2. Phase 2 server functions + shared helpers.
3. Phase 3 routes + components (dashboard → resume → ATS → roadmap → skill-gap → portfolio → projects → internships → jobs → interview → mock → coding → certifications → profile → analytics → assistant → goals).
4. Phase 4 wiring: sidebar entry, notifications, analytics tracking, public portfolio route.
5. Verification pass: typecheck, route matrix smoke, RLS check.

## Confirmations before starting

1. Phased delivery (approve migration first, then ship phases 2–5) — OK?
2. Use `google/gemini-3-flash-preview` for all AI here — OK?
3. Add `pdf-lib`, `docx`, `@monaco-editor/react` as new deps — OK?
4. Job/internship data: AI-generated recommendations now, real external providers deferred behind the adapter interface — OK?

Reply "go" to start Phase 1 (the migration).
