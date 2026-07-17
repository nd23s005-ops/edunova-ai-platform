
DO $$ BEGIN
  CREATE TYPE public.admin_level AS ENUM ('demo', 'super');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.user_roles
  ADD COLUMN IF NOT EXISTS admin_level public.admin_level;

CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
      AND admin_level = 'super'
  )
$$;
