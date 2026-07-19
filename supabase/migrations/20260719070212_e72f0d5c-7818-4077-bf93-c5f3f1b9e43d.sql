
CREATE TABLE public.subject_quiz_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  quiz_set smallint NOT NULL CHECK (quiz_set BETWEEN 1 AND 5),
  difficulty text NOT NULL DEFAULT 'medium',
  questions jsonb NOT NULL,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  score integer NOT NULL DEFAULT 0,
  total integer NOT NULL DEFAULT 0,
  category_scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  strengths text[] NOT NULL DEFAULT '{}',
  weaknesses text[] NOT NULL DEFAULT '{}',
  time_spent_seconds integer NOT NULL DEFAULT 0,
  ai_feedback text,
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX subject_quiz_attempts_user_idx
  ON public.subject_quiz_attempts (user_id, subject, quiz_set, created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.subject_quiz_attempts TO authenticated;
GRANT ALL ON public.subject_quiz_attempts TO service_role;

ALTER TABLE public.subject_quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own subject quiz attempts"
  ON public.subject_quiz_attempts FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own subject quiz attempts"
  ON public.subject_quiz_attempts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own subject quiz attempts"
  ON public.subject_quiz_attempts FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
