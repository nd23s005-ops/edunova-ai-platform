CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  board education_board NOT NULL,
  class_min SMALLINT NOT NULL CHECK (class_min BETWEEN 1 AND 12),
  class_max SMALLINT NOT NULL CHECK (class_max BETWEEN 1 AND 12),
  language preferred_language NOT NULL DEFAULT 'english',
  cover_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT class_range_valid CHECK (class_min <= class_max)
);

GRANT SELECT ON public.courses TO authenticated;
GRANT ALL ON public.courses TO service_role;

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published courses readable by authenticated"
  ON public.courses FOR SELECT TO authenticated
  USING (is_published = true);

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_courses_board_class ON public.courses (board, class_min, class_max) WHERE is_published;

CREATE TABLE public.course_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  progress SMALLINT NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_enrollments TO authenticated;
GRANT ALL ON public.course_enrollments TO service_role;

ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own enrollments"
  ON public.course_enrollments FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users enroll self"
  ON public.course_enrollments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own enrollments"
  ON public.course_enrollments FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users unenroll self"
  ON public.course_enrollments FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER update_course_enrollments_updated_at
  BEFORE UPDATE ON public.course_enrollments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_enrollments_user ON public.course_enrollments (user_id);