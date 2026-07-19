
CREATE TABLE public.debug_error_captures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  capture_id TEXT NOT NULL UNIQUE,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  stack TEXT,
  location JSONB,
  request_id TEXT,
  method TEXT,
  path TEXT,
  request JSONB,
  response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX debug_error_captures_captured_at_idx
  ON public.debug_error_captures (captured_at DESC);

GRANT SELECT ON public.debug_error_captures TO authenticated;
GRANT ALL ON public.debug_error_captures TO service_role;

ALTER TABLE public.debug_error_captures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view captured errors"
  ON public.debug_error_captures
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
