
CREATE TABLE IF NOT EXISTS public.learning_roadmaps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT,
  goal TEXT NOT NULL,
  level TEXT NOT NULL,
  weekly_hours INT NOT NULL DEFAULT 5,
  target_date DATE,
  interests TEXT,
  plan JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.learning_roadmaps TO authenticated;
GRANT ALL ON public.learning_roadmaps TO service_role;

ALTER TABLE public.learning_roadmaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own roadmaps"
  ON public.learning_roadmaps FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS learning_roadmaps_user_created_idx
  ON public.learning_roadmaps(user_id, created_at DESC);
