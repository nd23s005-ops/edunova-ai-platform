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
  -- Teacher role removed: only student, organization, professional are self-signup roles.
  IF role_text IN ('student', 'organization', 'professional') THEN
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