ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'school_student';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'college_student';

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;

-- Existing accounts must be treated as already onboarded so returning users are never asked again.
UPDATE public.profiles
SET onboarding_completed = true
WHERE onboarding_completed IS DISTINCT FROM true;

-- Enforce a single permanent role row per user.
CREATE UNIQUE INDEX IF NOT EXISTS user_roles_one_role_per_user_idx
  ON public.user_roles (user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  chosen_role public.app_role;
  role_text text;
  dob_text text;
  parsed_dob date;
  completed boolean;
BEGIN
  dob_text := NEW.raw_user_meta_data->>'dob';
  BEGIN
    parsed_dob := NULLIF(dob_text, '')::date;
  EXCEPTION WHEN others THEN
    parsed_dob := NULL;
  END;

  role_text := NEW.raw_user_meta_data->>'role';
  IF role_text IN ('school_student', 'college_student', 'organization', 'professional') THEN
    chosen_role := role_text::public.app_role;
  ELSIF role_text = 'student' THEN
    chosen_role := 'school_student'::public.app_role;
  ELSE
    chosen_role := 'school_student'::public.app_role;
  END IF;

  completed := chosen_role::text NOT IN ('school_student', 'student');

  INSERT INTO public.profiles (id, full_name, avatar_url, phone, dob, country, onboarding_completed)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NEW.raw_user_meta_data->>'avatar_url',
    NULLIF(NEW.raw_user_meta_data->>'phone', ''),
    parsed_dob,
    NULLIF(NEW.raw_user_meta_data->>'country', ''),
    completed
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
    dob = COALESCE(EXCLUDED.dob, public.profiles.dob),
    country = COALESCE(EXCLUDED.country, public.profiles.country),
    onboarding_completed = public.profiles.onboarding_completed OR EXCLUDED.onboarding_completed;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, chosen_role)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.complete_auth_role_selection(requested_role public.app_role)
RETURNS public.app_role
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  current_user_id uuid := auth.uid();
  current_role public.app_role;
  is_complete boolean;
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated' USING ERRCODE = '28000';
  END IF;

  IF requested_role::text NOT IN ('school_student', 'college_student', 'organization', 'professional') THEN
    RAISE EXCEPTION 'Invalid role';
  END IF;

  SELECT role INTO current_role
  FROM public.user_roles
  WHERE user_id = current_user_id
  LIMIT 1;

  SELECT COALESCE(onboarding_completed, false) INTO is_complete
  FROM public.profiles
  WHERE id = current_user_id;

  -- Admin accounts are never changed by public onboarding/social-login completion.
  IF current_role = 'admin'::public.app_role THEN
    RETURN current_role;
  END IF;

  -- Returning users keep their saved role permanently.
  IF is_complete AND current_role IS NOT NULL THEN
    RETURN current_role;
  END IF;

  IF current_role IS NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (current_user_id, requested_role);
  ELSE
    UPDATE public.user_roles
    SET role = requested_role
    WHERE user_id = current_user_id;
  END IF;

  UPDATE public.profiles
  SET onboarding_completed = requested_role::text <> 'school_student',
      updated_at = now()
  WHERE id = current_user_id;

  RETURN requested_role;
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.complete_auth_role_selection(public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.complete_auth_role_selection(public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;