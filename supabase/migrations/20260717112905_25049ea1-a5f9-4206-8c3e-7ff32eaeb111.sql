
-- ============ ENUMS ============
CREATE TYPE public.course_difficulty AS ENUM ('beginner','intermediate','advanced');
CREATE TYPE public.quiz_question_type AS ENUM ('mcq','true_false','fill_blank','match');
CREATE TYPE public.resource_kind AS ENUM ('notes','pdf','worksheet','formula_sheet','question_bank','pyq','mindmap','cheatsheet');
CREATE TYPE public.assignment_answer_type AS ENUM ('short','long','worksheet');
CREATE TYPE public.assignment_status AS ENUM ('draft','submitted','graded');

-- ============ EXTEND courses ============
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS difficulty public.course_difficulty NOT NULL DEFAULT 'beginner',
  ADD COLUMN IF NOT EXISTS estimated_hours NUMERIC(5,1),
  ADD COLUMN IF NOT EXISTS learning_objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS weekly_plan JSONB NOT NULL DEFAULT '[]'::jsonb;

-- ============ SUBJECTS taxonomy ============
CREATE TABLE public.subjects (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  order_index SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.subjects TO authenticated, anon;
GRANT ALL ON public.subjects TO service_role;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Subjects readable by all" ON public.subjects FOR SELECT TO authenticated, anon USING (true);

INSERT INTO public.subjects (slug, name, icon, order_index) VALUES
  ('mathematics','Mathematics','Calculator',10),
  ('science','Science','FlaskConical',20),
  ('physics','Physics','Atom',30),
  ('chemistry','Chemistry','TestTube',40),
  ('biology','Biology','Leaf',50),
  ('english','English','BookOpen',60),
  ('regional-language','Regional Language','Languages',70),
  ('social-science','Social Science','Globe2',80),
  ('history','History','Landmark',90),
  ('geography','Geography','Map',100),
  ('civics','Civics','Scale',110),
  ('economics','Economics','TrendingUp',120),
  ('computer-science','Computer Science','Cpu',130),
  ('general-knowledge','General Knowledge','Sparkles',140),
  ('logical-reasoning','Logical Reasoning','Puzzle',150);

-- ============ CHAPTERS ============
CREATE TABLE public.chapters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  order_index SMALLINT NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  intro TEXT,
  summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON public.chapters (course_id, order_index);
GRANT SELECT ON public.chapters TO authenticated;
GRANT ALL ON public.chapters TO service_role;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Chapters of published courses viewable" ON public.chapters FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.is_published = true));

-- ============ LESSONS ============
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  order_index SMALLINT NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  theory TEXT,
  illustrations JSONB NOT NULL DEFAULT '[]'::jsonb,
  examples JSONB NOT NULL DEFAULT '[]'::jsonb,
  key_notes TEXT,
  practice_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  estimated_minutes SMALLINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON public.lessons (chapter_id, order_index);
GRANT SELECT ON public.lessons TO authenticated;
GRANT ALL ON public.lessons TO service_role;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lessons of published courses viewable" ON public.lessons FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.chapters ch JOIN public.courses c ON c.id = ch.course_id
    WHERE ch.id = chapter_id AND c.is_published = true
  ));

-- ============ QUIZZES ============
CREATE TABLE public.quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  time_limit_seconds INTEGER,
  pass_score SMALLINT NOT NULL DEFAULT 60,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON public.quizzes (chapter_id);
GRANT SELECT ON public.quizzes TO authenticated;
GRANT ALL ON public.quizzes TO service_role;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quizzes of published courses viewable" ON public.quizzes FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.chapters ch JOIN public.courses c ON c.id = ch.course_id
    WHERE ch.id = chapter_id AND c.is_published = true
  ));

CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  order_index SMALLINT NOT NULL DEFAULT 0,
  type public.quiz_question_type NOT NULL,
  prompt TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  answer JSONB NOT NULL,
  explanation TEXT,
  points SMALLINT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON public.quiz_questions (quiz_id, order_index);
GRANT SELECT ON public.quiz_questions TO authenticated;
GRANT ALL ON public.quiz_questions TO service_role;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quiz questions of published courses viewable" ON public.quiz_questions FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.quizzes q JOIN public.chapters ch ON ch.id = q.chapter_id
    JOIN public.courses c ON c.id = ch.course_id
    WHERE q.id = quiz_id AND c.is_published = true
  ));

-- ============ ASSIGNMENTS ============
CREATE TABLE public.assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  instructions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON public.assignments (chapter_id);
GRANT SELECT ON public.assignments TO authenticated;
GRANT ALL ON public.assignments TO service_role;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Assignments of published courses viewable" ON public.assignments FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.chapters ch JOIN public.courses c ON c.id = ch.course_id
    WHERE ch.id = chapter_id AND c.is_published = true
  ));

CREATE TABLE public.assignment_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  order_index SMALLINT NOT NULL DEFAULT 0,
  type public.assignment_answer_type NOT NULL DEFAULT 'short',
  prompt TEXT NOT NULL,
  rubric TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON public.assignment_questions (assignment_id, order_index);
GRANT SELECT ON public.assignment_questions TO authenticated;
GRANT ALL ON public.assignment_questions TO service_role;
ALTER TABLE public.assignment_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Assignment questions of published courses viewable" ON public.assignment_questions FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.assignments a JOIN public.chapters ch ON ch.id = a.chapter_id
    JOIN public.courses c ON c.id = ch.course_id
    WHERE a.id = assignment_id AND c.is_published = true
  ));

-- ============ RESOURCES ============
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE,
  kind public.resource_kind NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  content TEXT,
  order_index SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON public.resources (course_id, order_index);
GRANT SELECT ON public.resources TO authenticated;
GRANT ALL ON public.resources TO service_role;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Resources of published courses viewable" ON public.resources FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.is_published = true));

-- ============ PROGRESS ============
CREATE TABLE public.lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);
CREATE INDEX ON public.lesson_progress (user_id, course_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_progress TO authenticated;
GRANT ALL ON public.lesson_progress TO service_role;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own lesson_progress" ON public.lesson_progress FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  score SMALLINT,
  max_score SMALLINT,
  time_taken_seconds INTEGER,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON public.quiz_attempts (user_id, quiz_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_attempts TO authenticated;
GRANT ALL ON public.quiz_attempts TO service_role;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own quiz_attempts" ON public.quiz_attempts FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.assignment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  status public.assignment_status NOT NULL DEFAULT 'draft',
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, assignment_id)
);
CREATE INDEX ON public.assignment_submissions (user_id, assignment_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assignment_submissions TO authenticated;
GRANT ALL ON public.assignment_submissions TO service_role;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own assignment_submissions" ON public.assignment_submissions FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============ updated_at triggers ============
CREATE TRIGGER chapters_updated_at BEFORE UPDATE ON public.chapters FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER quizzes_updated_at BEFORE UPDATE ON public.quizzes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER assignments_updated_at BEFORE UPDATE ON public.assignments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER quiz_attempts_updated_at BEFORE UPDATE ON public.quiz_attempts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER assignment_submissions_updated_at BEFORE UPDATE ON public.assignment_submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
