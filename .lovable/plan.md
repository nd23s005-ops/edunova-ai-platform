# Prompt 2 — Authentication & User Management Plan

## Current state (audit)

Already in place from Prompt 1:
- `_auth` layout (`src/routes/_auth.tsx`) with split-screen visual, testimonial, stats
- `_auth/login`, `_auth/register`, `_auth/forgot-password` — visual only, no logic
- `_dashboard` layout with sidebar + role dashboards: `index`, `student`, `teacher`, `organization`, `admin` (placeholder panels)
- Branding, tokens, ThemeProvider, Navbar/Footer — MUST NOT be redesigned

Gaps vs Prompt 2 spec:
- No backend (Lovable Cloud not enabled) → no real auth, roles, sessions
- Missing pages: reset-password, verify-email, verify-success, verify-failed, account-created, session-expired, 403, 404
- Missing features: password strength, confirm-password, form validation, role-based redirect, route guards, profile pages, session hydration, Google sign-in
- Sidebar links point to placeholders; no per-role nav filtering

## Decision needed before I build

The spec requires real auth (hashing, tokens, email verification, Google sign-in, refresh sessions, protected APIs). That requires a backend. Two paths:

**Path A — Enable Lovable Cloud now (recommended).**
Gives real email/password auth, Google OAuth (managed), email verification, password reset, sessions, RLS, and a `profiles` + `user_roles` table. Everything in the spec becomes actually functional.

**Path B — Frontend-only scaffolding.**
Build every page, form, validation, guard, and role-routing against a mocked in-memory auth store. Zero real security. Later prompt swaps the store for Cloud. Faster, but "Security" section of the spec (hashing, protected APIs, CSRF, rate limiting) is deferred.

I recommend **Path A**. Confirm which one, and for Path A confirm:
- User profile fields to store (name, avatar, phone, bio, role) — I'll create a `profiles` table + `user_roles` (separate table, per security rules) + `has_role()` SECURITY DEFINER function
- Google sign-in: yes (managed via Cloud) — confirm
- Roles enum: `admin | student | teacher | organization` — confirm
- Default role on self-signup: `student`, with role picker in register form gated (organization/admin require invite/approval) — confirm or relax

## Implementation roadmap (once approved)

### Phase 1 — Backend (Path A only)
1. Enable Lovable Cloud
2. Migration:
   - `app_role` enum
   - `profiles` (id fk auth.users, full_name, avatar_url, phone, bio, theme_pref, notif_prefs jsonb) + RLS + GRANTs
   - `user_roles` (user_id, role) + RLS + GRANTs + unique
   - `has_role(_user_id, _role)` SECURITY DEFINER
   - Trigger `handle_new_user` → insert profile + default role
3. Configure Supabase social auth: Google
4. Enable HIBP leaked-password check

### Phase 2 — Auth pages (match existing `_auth` layout exactly)
- `login.tsx` — wire to `supabase.auth.signInWithPassword`; Remember Me; Google button (`lovable.auth.signInWithOAuth("google")`); error states (invalid creds, unverified, disabled)
- `register.tsx` — full name, email, password + confirm, role radio, terms checkbox; zod schema; password strength meter component; duplicate-email handling; `emailRedirectTo`
- `forgot-password.tsx` — `resetPasswordForEmail` with `redirectTo: /reset-password`
- `reset-password.tsx` **(new, public route)** — detects `type=recovery`, `updateUser({password})`, strength meter
- `verify-email.tsx` **(new)** — "check your inbox" state after signup
- `verify-success.tsx` / `verify-failed.tsx` **(new)** — landing pages for email confirm callback (expired/invalid/already-verified branches)
- `account-created.tsx` **(new)** — post-signup confirmation
- `session-expired.tsx` **(new)** — shown when refresh fails

### Phase 3 — Error routes (top-level, not under `_auth`)
- `src/routes/unauthorized.tsx` (403)
- `src/routes/$.tsx` splat → 404 (already partial; formalize)

### Phase 4 — Route protection
- Rename `_dashboard` → `_authenticated` layout with `ssr:false` + `beforeLoad` calling `supabase.auth.getUser()`, redirect to `/login` on miss, preserving `redirect` search param
- Nested `_authenticated/_admin`, `_authenticated/_teacher`, `_authenticated/_organization`, `_authenticated/_student` pathless layouts each running `has_role` gate → redirect to `/unauthorized`
- Root route: `onAuthStateChange` → `router.invalidate()` + query invalidation (filtered)
- Login page: if already authed, redirect to role's home
- Sign-out: cancelQueries → clear → signOut → replace to `/login`

### Phase 5 — Role-based dashboard redirect
- `/dashboard` index reads role → `Navigate` to `/dashboard/{role}`
- Sidebar filtered by role, with the full role-specific nav lists from the spec (student: Courses, AI Tutor, Chat, Resources, Certificates, Progress, Assignments, Mock Tests, Notes, Profile; teacher/org/admin similarly). Links point to placeholder pages that ship as empty "coming in Prompt N" panels using existing `PlaceholderPanel` — NOT new features, just navigable stubs so the sidebar isn't broken.

### Phase 6 — Profile page (per role, same layout)
- `_authenticated/profile.tsx` — avatar upload (Storage), name, phone, bio, password change (`updateUser`), theme preference, notification prefs
- Server fn `updateMyProfile` via `requireSupabaseAuth`

### Phase 7 — Shared primitives
- `src/lib/auth/schemas.ts` — zod schemas (login, register, reset, profile)
- `src/lib/auth/passwordStrength.ts` — scoring + labels
- `src/components/auth/PasswordStrength.tsx`
- `src/components/auth/AuthCard.tsx` (keeps consistent visual)
- Toast-based success/error via existing `sonner`
- Form animations reuse existing Tailwind transitions; no new motion lib

## Out of scope for this prompt (explicit)
- Feature pages behind the sidebar (Courses, AI Tutor, etc.) — remain placeholders
- "Logout from all devices" UI — flagged future-ready per spec
- Rate limiting / CSRF beyond what Supabase provides — noted; server routes we add use signature/token verification patterns per Lovable rules

## Files created / modified (Path A summary)
- New: 8 auth pages, 2 error pages, profile page, password-strength component, auth schemas, migration
- Modified: `_auth.tsx` (unchanged visually), existing login/register/forgot (wire up), `_dashboard*` → renamed under `_authenticated` with guards, `__root.tsx` (auth listener), sidebar (role filter), `start.ts` (bearer middleware)
- Unchanged: all marketing pages, brand tokens, Navbar/Footer, home sections

---

**Please confirm:**
1. Path A (enable Cloud) or Path B (mock)?
2. Roles: `admin | student | teacher | organization` OK?
3. Self-signup allowed roles: student + teacher only, or all four?
4. Profile fields listed above OK, or add/remove any?

Once you approve, I'll execute phases 1→7 in order.
