UPDATE public.profiles p
SET onboarding_completed = true,
    updated_at = now()
FROM public.user_roles ur
WHERE ur.user_id = p.id
  AND ur.role IN ('student'::public.app_role, 'college_student'::public.app_role, 'professional'::public.app_role)
  AND COALESCE(p.onboarding_completed, false) = false;