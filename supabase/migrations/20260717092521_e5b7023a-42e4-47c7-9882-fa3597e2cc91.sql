CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  chosen_role public.app_role;
  role_text TEXT;
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NEW.raw_user_meta_data->>'avatar_url'
  );

  role_text := NEW.raw_user_meta_data->>'role';
  IF role_text IN ('student', 'teacher', 'organization', 'professional') THEN
    chosen_role := role_text::public.app_role;
  ELSE
    chosen_role := 'student'::public.app_role;
  END IF;

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, chosen_role);
  RETURN NEW;
END;
$function$;