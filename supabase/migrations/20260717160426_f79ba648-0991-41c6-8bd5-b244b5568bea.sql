
CREATE TABLE public.ai_mock_test_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id text NOT NULL,
  category_name text NOT NULL,
  difficulty text NOT NULL DEFAULT 'medium',
  questions jsonb NOT NULL,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  score int NOT NULL DEFAULT 0,
  total int NOT NULL DEFAULT 0,
  time_spent_seconds int NOT NULL DEFAULT 0,
  category_scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  strengths jsonb NOT NULL DEFAULT '[]'::jsonb,
  weaknesses jsonb NOT NULL DEFAULT '[]'::jsonb,
  ai_feedback text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ai_mock_test_attempts_user_idx
  ON public.ai_mock_test_attempts (user_id, submitted_at DESC);
CREATE INDEX ai_mock_test_attempts_user_cat_idx
  ON public.ai_mock_test_attempts (user_id, category_id, submitted_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_mock_test_attempts TO authenticated;
GRANT ALL ON public.ai_mock_test_attempts TO service_role;

ALTER TABLE public.ai_mock_test_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own AI mock attempts"
  ON public.ai_mock_test_attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own AI mock attempts"
  ON public.ai_mock_test_attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own AI mock attempts"
  ON public.ai_mock_test_attempts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own AI mock attempts"
  ON public.ai_mock_test_attempts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
