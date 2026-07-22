CREATE OR REPLACE FUNCTION public.apply_signup_role(_user_id uuid, _role public.app_role)
RETURNS public.app_role
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  existing_role public.app_role;
  profile_created_at timestamptz;
  profile_completed boolean;
  is_new_profile boolean := false;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Missing user id';
  END IF;

  IF _role NOT IN ('student'::public.app_role, 'college_student'::public.app_role, 'professional'::public.app_role) THEN
    RAISE EXCEPTION 'Unsupported signup role';
  END IF;

  SELECT role INTO existing_role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1;

  SELECT created_at, onboarding_completed
    INTO profile_created_at, profile_completed
  FROM public.profiles
  WHERE id = _user_id;

  is_new_profile := profile_created_at IS NULL OR profile_created_at > now() - interval '15 minutes';

  IF existing_role = 'admin'::public.app_role THEN
    RETURN existing_role;
  END IF;

  -- Existing users keep their established role. This blocks stale sessionStorage
  -- from changing a school/college/professional account on later logins.
  IF existing_role IS NOT NULL AND NOT is_new_profile THEN
    RETURN existing_role;
  END IF;

  IF existing_role IS NOT NULL AND COALESCE(profile_completed, false) AND NOT is_new_profile THEN
    RETURN existing_role;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, _role)
  ON CONFLICT (user_id) DO UPDATE
    SET role = EXCLUDED.role
    WHERE public.user_roles.role <> 'admin'::public.app_role;

  INSERT INTO public.profiles (id, onboarding_completed, last_login_at, is_active, updated_at)
  VALUES (_user_id, _role <> 'student'::public.app_role, now(), true, now())
  ON CONFLICT (id) DO UPDATE SET
    onboarding_completed = CASE
      WHEN COALESCE(public.profiles.onboarding_completed, false) THEN public.profiles.onboarding_completed
      ELSE EXCLUDED.onboarding_completed
    END,
    last_login_at = now(),
    is_active = true,
    updated_at = now();

  RETURN _role;
END;
$$;

REVOKE ALL ON FUNCTION public.apply_signup_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.apply_signup_role(uuid, public.app_role) TO service_role;