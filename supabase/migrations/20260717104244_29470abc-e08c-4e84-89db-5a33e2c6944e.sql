
-- 1) Add new optional columns to profiles (phone already exists)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS dob date,
  ADD COLUMN IF NOT EXISTS country text;

-- 2) Extend handle_new_user to capture phone/dob/country from signup metadata
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
BEGIN
  dob_text := NEW.raw_user_meta_data->>'dob';
  BEGIN
    parsed_dob := NULLIF(dob_text, '')::date;
  EXCEPTION WHEN others THEN
    parsed_dob := NULL;
  END;

  INSERT INTO public.profiles (id, full_name, avatar_url, phone, dob, country)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NEW.raw_user_meta_data->>'avatar_url',
    NULLIF(NEW.raw_user_meta_data->>'phone', ''),
    parsed_dob,
    NULLIF(NEW.raw_user_meta_data->>'country', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    phone     = COALESCE(EXCLUDED.phone,     public.profiles.phone),
    dob       = COALESCE(EXCLUDED.dob,       public.profiles.dob),
    country   = COALESCE(EXCLUDED.country,   public.profiles.country);

  role_text := NEW.raw_user_meta_data->>'role';
  IF role_text IN ('student', 'teacher', 'organization', 'professional') THEN
    chosen_role := role_text::public.app_role;
  ELSE
    chosen_role := 'student'::public.app_role;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, chosen_role)
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$function$;

-- Ensure the trigger exists (older projects may be missing it)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
