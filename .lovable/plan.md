# Master Prompt 8 — Reports, Analytics & BI Engine

Scope is very large. I'll build on the existing schema (learners, courses, enrollments, assessments, AI attempts, notifications, audit logs, organizations/institutions from Master Prompt 5) rather than duplicate it. Delivery is phased — I'll ship phase 1 first, then iterate.

## Guiding decisions
- **No new heavy data layer.** Analytics reads from existing tables via server-side aggregation SQL views + materialized rollups.
- **AI insights & predictions.** Use Lovable AI Gateway (`google/gemini-3-flash-preview`) for narrative insights and probability estimates; store outputs in an `ai_insights` table so we don't re-bill on every view.
- **RBAC.** Reuse `is_admin`, `is_super_admin`, `has_role`, and Master-Prompt-5 scoped-admin helpers. Every analytics server fn re-checks scope; no client filtering.
- **Real-time.** Supabase Realtime on `notifications`, `ai_universal_attempts`, `course_enrollments`, `lesson_progress`; polling fallback (30s) for KPI cards.
- **Exports.** CSV (native), XLSX (`xlsx` pure-JS), PDF (`pdf-lib`) — all worker-safe.
- **Charts.** Reuse existing recharts. Add heatmap + radar via recharts primitives.
- **Custom report builder.** JSON spec persisted in `report_templates`; server fn compiles spec → SQL (allow-listed dimensions/measures/filters).
- **Not doing now** unless explicitly asked: email delivery of reports, revenue/subscription analytics beyond schema shell, faculty performance (marked future-ready).

## Phase 1 — Data foundation (single migration)
- `analytics_daily_metrics` (day, scope_type, scope_id, metric_key, metric_value) — nightly rollup target.
- `analytics_events` (user_id, event_type, entity_type, entity_id, meta jsonb, created_at) — lightweight event stream.
- `report_templates` (owner_id, scope, name, spec jsonb, is_shared, created_at).
- `ai_insights` (scope_type, scope_id, kind, title, body, recommendations jsonb, confidence numeric, generated_at, expires_at).
- `ai_predictions` (subject_type, subject_id, kind, value numeric, confidence numeric, features jsonb, generated_at).
- SQL views: `v_platform_overview`, `v_dau_wau_mau`, `v_student_progress`, `v_course_stats`, `v_assessment_stats`, `v_org_stats`, `v_institution_stats`, `v_ai_usage`, `v_community_stats`.
- Nightly `refresh_analytics_daily()` function (called via `pg_cron`).
- Full GRANT/RLS block — all analytics reads gated by scope helper functions; writes super-admin only.

## Phase 2 — Server functions (`src/lib/analytics/`)
- `overview.functions.ts` — platform KPIs, time-series.
- `student.functions.ts` — self-scoped learning analytics.
- `institution.functions.ts` — school/college admin scope.
- `organization.functions.ts` — org admin scope.
- `course.functions.ts` — course analytics + AI recommendations.
- `assessment.functions.ts` — attempts/pass/fail/topic breakdowns.
- `career.functions.ts` — resume/ATS/portfolio/apps.
- `community.functions.ts` — engagement rollups.
- `ai-usage.functions.ts` — read from existing `ai_request_metrics` (Prompt 5) + gateway aggregates.
- `insights.functions.ts` — generate & cache AI narrative insights (Gemini).
- `predictions.functions.ts` — completion probability, dropout risk, placement readiness, next-course rec.
- `report-builder.functions.ts` — validate spec, run compiled query, return rows.
- `export.functions.ts` — csv/xlsx/pdf.
- `realtime.functions.ts` — active-users snapshot.

## Phase 3 — Routes (nested under existing dashboards)
Shared shell: `src/routes/_authenticated/_dashboard/dashboard/analytics/` with role-aware `beforeLoad`.

- `analytics/index.tsx` — role-adaptive Universal Overview (student sees personal; admin sees platform).
- `analytics/student.$slice.tsx` — progress / assessments / career / streaks.
- `analytics/institution.tsx` — school/college admin (batch, dept, at-risk).
- `analytics/organization.tsx` — org admin (employee learning, compliance).
- `analytics/courses.tsx` + `analytics/courses.$courseId.tsx`.
- `analytics/assessments.tsx`.
- `analytics/career.tsx`.
- `analytics/community.tsx`.
- `analytics/ai-usage.tsx`.
- `analytics/bi.tsx` — executive BI (super admin).
- `analytics/predictions.tsx` — predictive dashboard.
- `analytics/insights.tsx` — AI narrative insights feed.
- `analytics/reports.tsx` — saved templates list.
- `analytics/reports.builder.tsx` — custom report builder UI (dimension/measure/filter picker, live preview, save, export).

Every page: skeleton loaders, dark/light OK, responsive grid, export button in header.

## Phase 4 — UI kit additions
- `KpiCard`, `TrendSparkline`, `Heatmap`, `RadarChart`, `ProgressRing`, `InsightCard`, `PredictionCard`, `TimelineChart` in `src/components/analytics/`.
- `RealtimePresence` badge (Supabase Realtime presence).
- `ExportMenu` (CSV/XLSX/PDF).

## Phase 5 — Cross-cutting
- Sidebar entry "Analytics & Insights" on every dashboard, scoped links.
- Emit `analytics_events` from key user actions (lesson complete, attempt submit, enrollment, resume export) via a single `track()` helper — non-blocking.
- `pg_cron` job at 02:00 UTC → `refresh_analytics_daily()` + refresh insights that expired.
- `AdminGuard`-style `AnalyticsGuard` returning 403 for scope violations.

## Phase 6 — QA
- Typecheck full tree.
- Smoke: student sees only personal; org admin blocked from other orgs; super admin sees all; exports open cleanly.
- Verify no regressions on existing dashboards, CMS, learner routes.

## Confirmations before I start
1. Phased delivery OK — I'll ship Phase 1 (migration) first, wait for approval, then continue.
2. AI insights/predictions via Lovable AI Gateway (`google/gemini-3-flash-preview`) — confirm.
3. No email delivery / scheduled email reports yet (schema fields stubbed only) — confirm.
4. Adding pure-JS deps `xlsx` and `pdf-lib` (if not already installed from Prompt 5) — confirm.

Reply "go" (or adjust) and I'll start with Phase 1.
