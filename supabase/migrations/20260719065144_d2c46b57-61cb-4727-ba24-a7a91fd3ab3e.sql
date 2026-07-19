
-- Weekly assessments per student × syllabus × subject × ISO week
CREATE TABLE public.weekly_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  board TEXT NOT NULL,
  class_level INT NOT NULL,
  subject TEXT NOT NULL,
  week_start DATE NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ready',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, board, class_level, subject, week_start)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.weekly_assessments TO authenticated;
GRANT ALL ON public.weekly_assessments TO service_role;
ALTER TABLE public.weekly_assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own weekly assessments" ON public.weekly_assessments FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.weekly_assessment_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES public.weekly_assessments(id) ON DELETE CASCADE,
  category INT NOT NULL CHECK (category BETWEEN 1 AND 5),
  position INT NOT NULL CHECK (position BETWEEN 1 AND 5),
  category_name TEXT NOT NULL,
  prompt TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_index INT NOT NULL,
  explanation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (assessment_id, category, position)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.weekly_assessment_questions TO authenticated;
GRANT ALL ON public.weekly_assessment_questions TO service_role;
ALTER TABLE public.weekly_assessment_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions of own assessments" ON public.weekly_assessment_questions FOR ALL
  USING (EXISTS (SELECT 1 FROM public.weekly_assessments a WHERE a.id = assessment_id AND a.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.weekly_assessments a WHERE a.id = assessment_id AND a.user_id = auth.uid()));

CREATE TABLE public.weekly_assessment_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES public.weekly_assessments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  score INT NOT NULL DEFAULT 0,
  max_score INT NOT NULL DEFAULT 25,
  category_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.weekly_assessment_attempts TO authenticated;
GRANT ALL ON public.weekly_assessment_attempts TO service_role;
ALTER TABLE public.weekly_assessment_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own weekly attempts" ON public.weekly_assessment_attempts FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Study sessions for weekly progress tracker
CREATE TABLE public.study_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT,
  minutes INT NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_sessions TO authenticated;
GRANT ALL ON public.study_sessions TO service_role;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own study sessions" ON public.study_sessions FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_weekly_assessments_updated_at BEFORE UPDATE ON public.weekly_assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_weekly_assessment_attempts_updated_at BEFORE UPDATE ON public.weekly_assessment_attempts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
