
CREATE TYPE public.education_board AS ENUM ('state_board','cbse','icse','cambridge','ib','nios','other');
CREATE TYPE public.preferred_language AS ENUM ('english','tamil');

CREATE TABLE public.student_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  current_class SMALLINT NOT NULL CHECK (current_class BETWEEN 1 AND 12),
  board public.education_board NOT NULL,
  language public.preferred_language NOT NULL DEFAULT 'english',
  school_name TEXT,
  onboarded BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_profiles TO authenticated;
GRANT ALL ON public.student_profiles TO service_role;

ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own profile" ON public.student_profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Students insert own profile" ON public.student_profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students update own profile" ON public.student_profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_student_profiles_updated_at
  BEFORE UPDATE ON public.student_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
