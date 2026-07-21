
CREATE TABLE public.resource_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, resource_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.resource_completions TO authenticated;
GRANT ALL ON public.resource_completions TO service_role;

ALTER TABLE public.resource_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own completions"
  ON public.resource_completions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admins read completions"
  ON public.resource_completions
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE INDEX idx_resource_completions_user ON public.resource_completions(user_id);
CREATE INDEX idx_resource_completions_resource ON public.resource_completions(resource_id);
