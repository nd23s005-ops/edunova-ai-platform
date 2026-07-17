
CREATE TABLE public.daily_quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_date date NOT NULL DEFAULT CURRENT_DATE,
  difficulty text NOT NULL DEFAULT 'medium',
  questions jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, quiz_date)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_quizzes TO authenticated;
GRANT ALL ON public.daily_quizzes TO service_role;
ALTER TABLE public.daily_quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_daily_quizzes" ON public.daily_quizzes FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE public.daily_quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES public.daily_quizzes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  score int NOT NULL DEFAULT 0,
  total int NOT NULL DEFAULT 0,
  category_scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  strengths text[] NOT NULL DEFAULT '{}',
  weaknesses text[] NOT NULL DEFAULT '{}',
  time_spent_seconds int NOT NULL DEFAULT 0,
  submitted_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_quiz_attempts TO authenticated;
GRANT ALL ON public.daily_quiz_attempts TO service_role;
ALTER TABLE public.daily_quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_daily_quiz_attempts" ON public.daily_quiz_attempts FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE INDEX daily_quiz_attempts_user_submitted ON public.daily_quiz_attempts(user_id, submitted_at DESC);
