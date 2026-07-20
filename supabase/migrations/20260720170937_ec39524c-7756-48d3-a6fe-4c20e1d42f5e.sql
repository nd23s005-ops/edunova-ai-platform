
CREATE TABLE IF NOT EXISTS public.ai_universal_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN (
    'daily','weekly','monthly','module','chapter','mock','practice','final','skill_eval','custom'
  )),
  course_id UUID,
  chapter_id UUID,
  lesson_id UUID,
  subject TEXT,
  board TEXT,
  grade TEXT,
  topic TEXT,
  difficulty TEXT NOT NULL DEFAULT 'basic' CHECK (difficulty IN ('beginner','basic','intermediate','advanced','expert')),
  question_types TEXT[] NOT NULL DEFAULT ARRAY['mcq']::text[],
  time_limit_seconds INTEGER,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  responses JSONB NOT NULL DEFAULT '[]'::jsonb,
  per_question JSONB NOT NULL DEFAULT '[]'::jsonb,
  topic_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
  weak_topics TEXT[] NOT NULL DEFAULT ARRAY[]::text[],
  strong_topics TEXT[] NOT NULL DEFAULT ARRAY[]::text[],
  ai_feedback JSONB,
  recommendations JSONB,
  score NUMERIC,
  total NUMERIC,
  percentage NUMERIC,
  letter_grade TEXT,
  accuracy NUMERIC,
  time_taken_seconds INTEGER,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','submitted','abandoned','timed_out')),
  fingerprint TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_universal_attempts TO authenticated;
GRANT ALL ON public.ai_universal_attempts TO service_role;

ALTER TABLE public.ai_universal_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "univ_attempts_owner_all" ON public.ai_universal_attempts
  FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "univ_attempts_admin_read" ON public.ai_universal_attempts
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS ai_universal_attempts_user_kind_idx
  ON public.ai_universal_attempts (user_id, kind, submitted_at DESC);
CREATE INDEX IF NOT EXISTS ai_universal_attempts_user_course_idx
  ON public.ai_universal_attempts (user_id, course_id, submitted_at DESC);

CREATE TRIGGER trg_ai_universal_attempts_updated
  BEFORE UPDATE ON public.ai_universal_attempts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.learner_xp_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  points INTEGER NOT NULL,
  related_attempt_id UUID,
  meta JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.learner_xp_events TO authenticated;
GRANT ALL ON public.learner_xp_events TO service_role;

ALTER TABLE public.learner_xp_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "xp_events_owner_read" ON public.learner_xp_events
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "xp_events_owner_insert" ON public.learner_xp_events
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "xp_events_admin_read" ON public.learner_xp_events
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS learner_xp_events_user_idx
  ON public.learner_xp_events (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.learner_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  tier TEXT NOT NULL DEFAULT 'bronze' CHECK (tier IN ('bronze','silver','gold','platinum')),
  awarded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  meta JSONB,
  UNIQUE (user_id, code)
);

GRANT SELECT, INSERT ON public.learner_achievements TO authenticated;
GRANT ALL ON public.learner_achievements TO service_role;

ALTER TABLE public.learner_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "achievements_owner_read" ON public.learner_achievements
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "achievements_owner_insert" ON public.learner_achievements
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "achievements_admin_read" ON public.learner_achievements
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.learner_readiness (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID,
  skill_level TEXT NOT NULL DEFAULT 'beginner',
  confidence NUMERIC NOT NULL DEFAULT 0,
  completion_readiness NUMERIC NOT NULL DEFAULT 0,
  certification_readiness NUMERIC NOT NULL DEFAULT 0,
  interview_readiness NUMERIC,
  narrative TEXT,
  computed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  meta JSONB,
  UNIQUE (user_id, course_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.learner_readiness TO authenticated;
GRANT ALL ON public.learner_readiness TO service_role;

ALTER TABLE public.learner_readiness ENABLE ROW LEVEL SECURITY;

CREATE POLICY "readiness_owner_all" ON public.learner_readiness
  FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "readiness_admin_read" ON public.learner_readiness
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
