-- Restore the on_auth_user_created trigger. The handle_new_user() function
-- already exists; the trigger row was missing, so newly-signed-up users
-- (email/password AND Google/Apple OAuth) had no user_roles or profiles row,
-- causing role=null and an infinite /dashboard redirect loop.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Backfill any existing users who never got a role/profile row.
INSERT INTO public.profiles (id, full_name, avatar_url, phone, country)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', ''),
  u.raw_user_meta_data->>'avatar_url',
  NULLIF(u.raw_user_meta_data->>'phone', ''),
  NULLIF(u.raw_user_meta_data->>'country', '')
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL;

INSERT INTO public.user_roles (user_id, role)
SELECT
  u.id,
  CASE
    WHEN u.raw_user_meta_data->>'role' IN ('student','organization','professional')
      THEN (u.raw_user_meta_data->>'role')::public.app_role
    ELSE 'student'::public.app_role
  END
FROM auth.users u
LEFT JOIN public.user_roles r ON r.user_id = u.id
WHERE r.user_id IS NULL;