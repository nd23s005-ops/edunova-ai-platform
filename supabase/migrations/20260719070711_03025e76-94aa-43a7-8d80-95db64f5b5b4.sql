
CREATE TABLE public.ai_weekly_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  board text NOT NULL,
  class_level integer NOT NULL,
  subjects text[] NOT NULL,
  week_start date NOT NULL,
  questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  results jsonb NOT NULL DEFAULT '{}'::jsonb,
  score numeric NOT NULL DEFAULT 0,
  max_score numeric NOT NULL DEFAULT 0,
  time_taken_seconds integer,
  ai_feedback jsonb,
  started_at timestamptz NOT NULL DEFAULT now(),
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ai_weekly_attempts_user_created_idx
  ON public.ai_weekly_attempts (user_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_weekly_attempts TO authenticated;
GRANT ALL ON public.ai_weekly_attempts TO service_role;

ALTER TABLE public.ai_weekly_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Own ai weekly attempts"
  ON public.ai_weekly_attempts
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
