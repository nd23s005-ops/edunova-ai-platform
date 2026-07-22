ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS auth_provider text NOT NULL DEFAULT 'email',
  ADD COLUMN IF NOT EXISTS last_login_at timestamptz,
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

UPDATE public.profiles p
SET
  email = COALESCE(p.email, u.email),
  auth_provider = COALESCE(NULLIF(p.auth_provider, ''), COALESCE(u.raw_app_meta_data->>'provider', 'email')),
  last_login_at = COALESCE(p.last_login_at, u.last_sign_in_at),
  is_active = true
FROM auth.users u
WHERE p.id = u.id;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  chosen_role public.app_role;
  role_text text;
  dob_text text;
  parsed_dob date;
  completed boolean;
  provider_text text;
BEGIN
  dob_text := NEW.raw_user_meta_data->>'dob';
  BEGIN
    parsed_dob := NULLIF(dob_text, '')::date;
  EXCEPTION WHEN others THEN
    parsed_dob := NULL;
  END;

  role_text := NEW.raw_user_meta_data->>'role';
  IF role_text = 'college_student' THEN
    chosen_role := 'college_student'::public.app_role;
  ELSIF role_text IN ('school_student', 'student') THEN
    chosen_role := 'student'::public.app_role;
  ELSIF role_text = 'professional' THEN
    chosen_role := 'professional'::public.app_role;
  ELSE
    chosen_role := 'student'::public.app_role;
  END IF;

  provider_text := COALESCE(NULLIF(NEW.raw_app_meta_data->>'provider', ''), 'email');
  completed := chosen_role::text <> 'student';

  INSERT INTO public.profiles (
    id,
    full_name,
    avatar_url,
    phone,
    dob,
    country,
    onboarding_completed,
    email,
    auth_provider,
    last_login_at,
    is_active
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NEW.raw_user_meta_data->>'avatar_url',
    NULLIF(NEW.raw_user_meta_data->>'phone', ''),
    parsed_dob,
    NULLIF(NEW.raw_user_meta_data->>'country', ''),
    completed,
    NEW.email,
    provider_text,
    NEW.last_sign_in_at,
    true
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(NULLIF(EXCLUDED.full_name, ''), public.profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
    dob = COALESCE(EXCLUDED.dob, public.profiles.dob),
    country = COALESCE(EXCLUDED.country, public.profiles.country),
    onboarding_completed = public.profiles.onboarding_completed OR EXCLUDED.onboarding_completed,
    email = COALESCE(EXCLUDED.email, public.profiles.email),
    auth_provider = COALESCE(NULLIF(EXCLUDED.auth_provider, ''), public.profiles.auth_provider),
    last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
    is_active = true;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, chosen_role)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$function$;