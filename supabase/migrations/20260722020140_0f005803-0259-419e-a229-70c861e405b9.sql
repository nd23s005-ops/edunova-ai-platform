DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.user_roles'::regclass
      AND conname = 'user_roles_user_id_role_key'
  ) THEN
    ALTER TABLE public.user_roles DROP CONSTRAINT user_roles_user_id_role_key;
  END IF;
END $$;

UPDATE public.user_roles
SET role = 'student'::public.app_role
WHERE role = 'school_student'::public.app_role;

WITH ranked AS (
  SELECT
    id,
    user_id,
    role,
    row_number() OVER (
      PARTITION BY user_id
      ORDER BY
        CASE role
          WHEN 'admin'::public.app_role THEN 1
          WHEN 'professional'::public.app_role THEN 2
          WHEN 'college_student'::public.app_role THEN 3
          WHEN 'student'::public.app_role THEN 4
          ELSE 5
        END,
        created_at ASC,
        id ASC
    ) AS rn
  FROM public.user_roles
)
DELETE FROM public.user_roles ur
USING ranked r
WHERE ur.id = r.id
  AND r.rn > 1;

ALTER TABLE public.user_roles
ADD CONSTRAINT user_roles_user_id_key UNIQUE (user_id);

CREATE OR REPLACE FUNCTION public.apply_signup_role(_user_id uuid, _role public.app_role)
RETURNS public.app_role
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  existing_role public.app_role;
  has_profile boolean;
  profile_completed boolean;
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

  SELECT true, onboarding_completed
    INTO has_profile, profile_completed
  FROM public.profiles
  WHERE id = _user_id;

  IF existing_role = 'admin'::public.app_role THEN
    RETURN existing_role;
  END IF;

  -- Returning users keep their established role. New OAuth users may have a
  -- provisional trigger-created student row; allow the selected role to replace
  -- it only before onboarding has been finalized.
  IF existing_role IS NOT NULL AND COALESCE(profile_completed, false) THEN
    RETURN existing_role;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, _role)
  ON CONFLICT (user_id) DO UPDATE
    SET role = EXCLUDED.role
    WHERE public.user_roles.role <> 'admin'::public.app_role;

  INSERT INTO public.profiles (id, onboarding_completed, updated_at)
  VALUES (_user_id, _role <> 'student'::public.app_role, now())
  ON CONFLICT (id) DO UPDATE SET
    onboarding_completed = CASE
      WHEN COALESCE(public.profiles.onboarding_completed, false) THEN public.profiles.onboarding_completed
      ELSE EXCLUDED.onboarding_completed
    END,
    updated_at = now();

  RETURN _role;
END;
$$;

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

  completed := chosen_role::text <> 'student';

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