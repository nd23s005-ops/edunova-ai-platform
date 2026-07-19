
-- Retention configuration for the persisted error ring buffer
CREATE TABLE public.debug_error_retention_config (
  id boolean PRIMARY KEY DEFAULT true,
  max_age_hours integer NOT NULL DEFAULT 168 CHECK (max_age_hours > 0 AND max_age_hours <= 8760),
  max_rows integer NOT NULL DEFAULT 1000 CHECK (max_rows > 0 AND max_rows <= 100000),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT singleton CHECK (id = true)
);

GRANT SELECT, INSERT, UPDATE ON public.debug_error_retention_config TO authenticated;
GRANT ALL ON public.debug_error_retention_config TO service_role;

ALTER TABLE public.debug_error_retention_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view retention config"
  ON public.debug_error_retention_config FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update retention config"
  ON public.debug_error_retention_config FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert retention config"
  ON public.debug_error_retention_config FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.debug_error_retention_config (id) VALUES (true) ON CONFLICT DO NOTHING;

CREATE TRIGGER debug_error_retention_config_touch
  BEFORE UPDATE ON public.debug_error_retention_config
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Cleanup function honoring the config
CREATE OR REPLACE FUNCTION public.cleanup_debug_error_captures()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  cfg_age integer;
  cfg_rows integer;
  removed integer := 0;
  age_removed integer := 0;
  overflow_removed integer := 0;
BEGIN
  SELECT max_age_hours, max_rows
    INTO cfg_age, cfg_rows
    FROM public.debug_error_retention_config
   WHERE id = true;

  IF cfg_age IS NULL THEN
    cfg_age := 168;
    cfg_rows := 1000;
  END IF;

  WITH deleted AS (
    DELETE FROM public.debug_error_captures
     WHERE captured_at < now() - make_interval(hours => cfg_age)
    RETURNING 1
  )
  SELECT count(*) INTO age_removed FROM deleted;

  WITH ranked AS (
    SELECT id, row_number() OVER (ORDER BY captured_at DESC) AS rn
      FROM public.debug_error_captures
  ),
  deleted AS (
    DELETE FROM public.debug_error_captures d
     USING ranked r
     WHERE d.id = r.id AND r.rn > cfg_rows
    RETURNING 1
  )
  SELECT count(*) INTO overflow_removed FROM deleted;

  removed := age_removed + overflow_removed;
  RETURN removed;
END;
$$;

-- Schedule hourly cleanup via pg_cron (extensions already installed on Cloud)
CREATE EXTENSION IF NOT EXISTS pg_cron;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'cleanup-debug-error-captures') THEN
    PERFORM cron.unschedule('cleanup-debug-error-captures');
  END IF;
  PERFORM cron.schedule(
    'cleanup-debug-error-captures',
    '15 * * * *',
    $c$SELECT public.cleanup_debug_error_captures();$c$
  );
END $$;
