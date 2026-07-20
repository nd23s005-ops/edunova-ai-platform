
-- Course level enum for the Beginner → Industry Ready track
DO $$ BEGIN
  CREATE TYPE public.course_level AS ENUM ('beginner','basic','intermediate','advanced','expert','industry_ready');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 1) learner_context ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learner_context (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_level public.course_level NOT NULL DEFAULT 'beginner',
  career_goal text,
  learning_speed text NOT NULL DEFAULT 'balanced', -- slow | balanced | fast
  preferred_depth text NOT NULL DEFAULT 'balanced', -- concise | balanced | deep
  interests text[] NOT NULL DEFAULT '{}',
  weak_topics text[] NOT NULL DEFAULT '{}',
  strong_topics text[] NOT NULL DEFAULT '{}',
  context_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.learner_context TO authenticated;
GRANT ALL ON public.learner_context TO service_role;
ALTER TABLE public.learner_context ENABLE ROW LEVEL SECURITY;
CREATE POLICY "learner_context self read" ON public.learner_context
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "learner_context self write" ON public.learner_context
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_learner_context_updated_at BEFORE UPDATE ON public.learner_context
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2) ai_course_overviews ------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_course_overviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  overview text NOT NULL,
  objectives jsonb NOT NULL DEFAULT '[]',
  skills jsonb NOT NULL DEFAULT '[]',
  industry_relevance text,
  career_opportunities jsonb NOT NULL DEFAULT '[]',
  outcomes jsonb NOT NULL DEFAULT '[]',
  prerequisites jsonb NOT NULL DEFAULT '[]',
  model text NOT NULL,
  context_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_course_overviews TO authenticated;
GRANT ALL ON public.ai_course_overviews TO service_role;
ALTER TABLE public.ai_course_overviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ai_course_overviews self read" ON public.ai_course_overviews
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "ai_course_overviews self write" ON public.ai_course_overviews
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_ai_course_overviews_updated_at BEFORE UPDATE ON public.ai_course_overviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3) ai_lesson_content --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_lesson_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  intro text NOT NULL,
  concepts jsonb NOT NULL DEFAULT '[]',
  steps jsonb NOT NULL DEFAULT '[]',
  examples jsonb NOT NULL DEFAULT '[]',
  visual_description text,
  use_cases jsonb NOT NULL DEFAULT '[]',
  summary text,
  key_takeaways jsonb NOT NULL DEFAULT '[]',
  model text NOT NULL,
  context_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_lesson_content TO authenticated;
GRANT ALL ON public.ai_lesson_content TO service_role;
ALTER TABLE public.ai_lesson_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ai_lesson_content self read" ON public.ai_lesson_content
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "ai_lesson_content self write" ON public.ai_lesson_content
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_ai_lesson_content_updated_at BEFORE UPDATE ON public.ai_lesson_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4) lesson_reading_position --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lesson_reading_position (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE,
  scroll_percent smallint NOT NULL DEFAULT 0 CHECK (scroll_percent >= 0 AND scroll_percent <= 100),
  last_section text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, lesson_id)
);
CREATE INDEX IF NOT EXISTS idx_reading_position_user_updated
  ON public.lesson_reading_position (user_id, updated_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_reading_position TO authenticated;
GRANT ALL ON public.lesson_reading_position TO service_role;
ALTER TABLE public.lesson_reading_position ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reading_position self read" ON public.lesson_reading_position
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "reading_position self write" ON public.lesson_reading_position
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_reading_position_updated_at BEFORE UPDATE ON public.lesson_reading_position
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5) course_enrollments — level track additive columns -----------------------
ALTER TABLE public.course_enrollments
  ADD COLUMN IF NOT EXISTS current_level public.course_level NOT NULL DEFAULT 'beginner',
  ADD COLUMN IF NOT EXISTS level_progress smallint NOT NULL DEFAULT 0
    CHECK (level_progress >= 0 AND level_progress <= 100),
  ADD COLUMN IF NOT EXISTS estimated_completion_minutes integer;
