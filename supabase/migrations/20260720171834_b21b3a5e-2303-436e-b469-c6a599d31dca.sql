
-- =========================================================
-- MASTER PROMPT 4 — AI Course & Content Management Engine
-- =========================================================

-- Reusable helper: is current user an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- Status enum for content lifecycle
DO $$ BEGIN
  CREATE TYPE public.content_status AS ENUM ('draft','review','approved','published','archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.course_visibility AS ENUM ('public','signed_in','role_gated','private');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.learning_resource_kind AS ENUM (
    'beginner_guide','roadmap','notes','revision_notes','cheat_sheet','documentation',
    'practice_questions','interview_questions','assignment','mini_project','major_project',
    'case_study','faq','glossary','reference','downloadable'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.audit_action AS ENUM (
    'create','update','archive','restore','publish','unpublish','delete','duplicate','approve','reject','request_changes'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- =========================================================
-- Course categories (dynamic tracks)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.course_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  icon text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.course_categories TO anon, authenticated;
GRANT ALL ON public.course_categories TO service_role;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories readable to all" ON public.course_categories FOR SELECT USING (true);
CREATE POLICY "admins manage categories" ON public.course_categories FOR ALL
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_course_categories_updated_at BEFORE UPDATE ON public.course_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.course_subcategories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES public.course_categories(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  description text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (category_id, slug)
);
GRANT SELECT ON public.course_subcategories TO anon, authenticated;
GRANT ALL ON public.course_subcategories TO service_role;
ALTER TABLE public.course_subcategories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subcategories readable to all" ON public.course_subcategories FOR SELECT USING (true);
CREATE POLICY "admins manage subcategories" ON public.course_subcategories FOR ALL
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_course_subcategories_updated_at BEFORE UPDATE ON public.course_subcategories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed a sensible default catalog
INSERT INTO public.course_categories (slug, name, display_order) VALUES
  ('school','School',10),
  ('college','College',20),
  ('professional','Professional',30),
  ('corporate','Corporate',40)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.course_subcategories (category_id, slug, name, display_order)
SELECT c.id, s.slug, s.name, s.display_order
FROM public.course_categories c
JOIN (VALUES
  ('school','mathematics','Mathematics',10),
  ('school','science','Science',20),
  ('school','english','English',30),
  ('school','computer-science','Computer Science',40),
  ('school','social-science','Social Science',50),
  ('school','languages','Languages',60),
  ('college','computer-science','Computer Science',10),
  ('college','information-technology','Information Technology',20),
  ('college','commerce','Commerce',30),
  ('college','business-administration','Business Administration',40),
  ('college','engineering','Engineering',50),
  ('college','arts-science','Arts & Science',60),
  ('professional','web-development','Web Development',10),
  ('professional','mobile-development','Mobile Development',20),
  ('professional','ai-ml','AI & Machine Learning',30),
  ('professional','data-science','Data Science',40),
  ('professional','cloud-computing','Cloud Computing',50),
  ('professional','cybersecurity','Cybersecurity',60),
  ('professional','devops','DevOps',70),
  ('professional','ui-ux','UI/UX Design',80),
  ('professional','product-management','Product Management',90),
  ('professional','digital-marketing','Digital Marketing',100),
  ('professional','finance','Finance',110),
  ('professional','communication','Communication Skills',120),
  ('professional','leadership','Leadership',130),
  ('professional','entrepreneurship','Entrepreneurship',140)
) AS s(cat_slug, slug, name, display_order) ON s.cat_slug = c.slug
ON CONFLICT (category_id, slug) DO NOTHING;

-- =========================================================
-- Extend existing courses table
-- =========================================================
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS short_description text,
  ADD COLUMN IF NOT EXISTS banner_url text,
  ADD COLUMN IF NOT EXISTS instructor_name text,
  ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES public.course_categories(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS subcategory_id uuid REFERENCES public.course_subcategories(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS learning_outcomes text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS prerequisites text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS estimated_hours integer,
  ADD COLUMN IF NOT EXISTS cms_status public.content_status NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS visibility public.course_visibility NOT NULL DEFAULT 'signed_in',
  ADD COLUMN IF NOT EXISTS version integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS approved_at timestamptz,
  ADD COLUMN IF NOT EXISTS scheduled_publish_at timestamptz,
  ADD COLUMN IF NOT EXISTS archived_at timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS ai_generated boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS view_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS avg_rating numeric(3,2);

CREATE UNIQUE INDEX IF NOT EXISTS courses_slug_key ON public.courses (slug) WHERE slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS courses_cms_status_idx ON public.courses (cms_status);
CREATE INDEX IF NOT EXISTS courses_category_idx ON public.courses (category_id, subcategory_id);
CREATE INDEX IF NOT EXISTS courses_deleted_at_idx ON public.courses (deleted_at);

-- Admin manage policy for courses (in addition to any existing policies)
DO $$ BEGIN
  CREATE POLICY "admins manage courses" ON public.courses FOR ALL
    USING (public.is_admin()) WITH CHECK (public.is_admin());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- =========================================================
-- Modules (Module → Chapter → Lesson → Topic → Subtopic)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'draft',
  scheduled_publish_at timestamptz,
  ai_generated boolean NOT NULL DEFAULT false,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.modules TO authenticated;
GRANT ALL ON public.modules TO service_role;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "modules read published" ON public.modules FOR SELECT
  USING (status = 'published' OR public.is_admin());
CREATE POLICY "admins manage modules" ON public.modules FOR ALL
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE INDEX IF NOT EXISTS modules_course_order_idx ON public.modules (course_id, order_index);
CREATE TRIGGER trg_modules_updated_at BEFORE UPDATE ON public.modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Chapters: add optional module_id + lifecycle
ALTER TABLE public.chapters
  ADD COLUMN IF NOT EXISTS module_id uuid REFERENCES public.modules(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS status public.content_status NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS scheduled_publish_at timestamptz,
  ADD COLUMN IF NOT EXISTS ai_generated boolean NOT NULL DEFAULT false;
CREATE INDEX IF NOT EXISTS chapters_module_idx ON public.chapters (module_id);

-- Lessons: lifecycle + richer content
ALTER TABLE public.lessons
  ADD COLUMN IF NOT EXISTS status public.content_status NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS scheduled_publish_at timestamptz,
  ADD COLUMN IF NOT EXISTS ai_generated boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS learning_objectives text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS key_takeaways text[] NOT NULL DEFAULT '{}';

-- =========================================================
-- Lesson topics and subtopics
-- =========================================================
CREATE TABLE IF NOT EXISTS public.lesson_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  parent_topic_id uuid REFERENCES public.lesson_topics(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  order_index integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  ai_generated boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_topics TO authenticated;
GRANT ALL ON public.lesson_topics TO service_role;
ALTER TABLE public.lesson_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "topics read published" ON public.lesson_topics FOR SELECT
  USING (status = 'published' OR public.is_admin());
CREATE POLICY "admins manage topics" ON public.lesson_topics FOR ALL
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE INDEX IF NOT EXISTS lesson_topics_lesson_order_idx ON public.lesson_topics (lesson_id, order_index);
CREATE INDEX IF NOT EXISTS lesson_topics_parent_idx ON public.lesson_topics (parent_topic_id);
CREATE TRIGGER trg_lesson_topics_updated_at BEFORE UPDATE ON public.lesson_topics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- Version history (course-level snapshots)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.course_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  version integer NOT NULL,
  snapshot jsonb NOT NULL,
  note text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (course_id, version)
);
GRANT SELECT, INSERT ON public.course_versions TO authenticated;
GRANT ALL ON public.course_versions TO service_role;
ALTER TABLE public.course_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read versions" ON public.course_versions FOR SELECT USING (public.is_admin());
CREATE POLICY "admins insert versions" ON public.course_versions FOR INSERT WITH CHECK (public.is_admin());

-- =========================================================
-- Approval workflow
-- =========================================================
CREATE TABLE IF NOT EXISTS public.course_approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  from_status public.content_status,
  to_status public.content_status NOT NULL,
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.course_approvals TO authenticated;
GRANT ALL ON public.course_approvals TO service_role;
ALTER TABLE public.course_approvals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read approvals" ON public.course_approvals FOR SELECT USING (public.is_admin());
CREATE POLICY "admins insert approvals" ON public.course_approvals FOR INSERT WITH CHECK (public.is_admin());
CREATE INDEX IF NOT EXISTS course_approvals_course_idx ON public.course_approvals (course_id, created_at DESC);

-- =========================================================
-- Learning paths
-- =========================================================
CREATE TABLE IF NOT EXISTS public.learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE,
  title text NOT NULL,
  description text,
  target_role text,
  skill_level text,
  category_id uuid REFERENCES public.course_categories(id) ON DELETE SET NULL,
  tags text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  ai_generated boolean NOT NULL DEFAULT false,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.learning_paths TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.learning_paths TO authenticated;
GRANT ALL ON public.learning_paths TO service_role;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
CREATE POLICY "paths readable" ON public.learning_paths FOR SELECT USING (is_active OR public.is_admin());
CREATE POLICY "admins manage paths" ON public.learning_paths FOR ALL
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_learning_paths_updated_at BEFORE UPDATE ON public.learning_paths
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.learning_path_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id uuid NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  course_id uuid REFERENCES public.courses(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL DEFAULT 0,
  is_optional boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.learning_path_steps TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.learning_path_steps TO authenticated;
GRANT ALL ON public.learning_path_steps TO service_role;
ALTER TABLE public.learning_path_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "steps readable" ON public.learning_path_steps FOR SELECT USING (true);
CREATE POLICY "admins manage steps" ON public.learning_path_steps FOR ALL
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE INDEX IF NOT EXISTS learning_path_steps_path_idx ON public.learning_path_steps (path_id, order_index);

CREATE TABLE IF NOT EXISTS public.user_learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  path_id uuid NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  progress numeric(5,2) NOT NULL DEFAULT 0,
  current_step_id uuid REFERENCES public.learning_path_steps(id) ON DELETE SET NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  UNIQUE (user_id, path_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_learning_paths TO authenticated;
GRANT ALL ON public.user_learning_paths TO service_role;
ALTER TABLE public.user_learning_paths ENABLE ROW LEVEL SECURITY;
CREATE POLICY "learners manage own paths" ON public.user_learning_paths FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admins read all user paths" ON public.user_learning_paths FOR SELECT
  USING (public.is_admin());

-- =========================================================
-- Course resources (link resources ↔ course structure)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.course_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  module_id uuid REFERENCES public.modules(id) ON DELETE CASCADE,
  chapter_id uuid REFERENCES public.chapters(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES public.lessons(id) ON DELETE CASCADE,
  kind public.learning_resource_kind NOT NULL,
  title text NOT NULL,
  summary text,
  content text,
  external_url text,
  file_url text,
  is_downloadable boolean NOT NULL DEFAULT false,
  status public.content_status NOT NULL DEFAULT 'published',
  ai_generated boolean NOT NULL DEFAULT false,
  tags text[] NOT NULL DEFAULT '{}',
  order_index integer NOT NULL DEFAULT 0,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_resources TO authenticated;
GRANT ALL ON public.course_resources TO service_role;
ALTER TABLE public.course_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "resources read published" ON public.course_resources FOR SELECT
  USING (status = 'published' OR public.is_admin());
CREATE POLICY "admins manage resources" ON public.course_resources FOR ALL
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE INDEX IF NOT EXISTS course_resources_course_idx ON public.course_resources (course_id, kind);
CREATE INDEX IF NOT EXISTS course_resources_lesson_idx ON public.course_resources (lesson_id);
CREATE TRIGGER trg_course_resources_updated_at BEFORE UPDATE ON public.course_resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.resource_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES public.course_resources(id) ON DELETE CASCADE,
  bookmarked boolean NOT NULL DEFAULT false,
  saved_for_later boolean NOT NULL DEFAULT false,
  completed boolean NOT NULL DEFAULT false,
  downloaded_at timestamptz,
  last_viewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, resource_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resource_interactions TO authenticated;
GRANT ALL ON public.resource_interactions TO service_role;
ALTER TABLE public.resource_interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "learners manage own interactions" ON public.resource_interactions FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admins read interactions" ON public.resource_interactions FOR SELECT
  USING (public.is_admin());
CREATE TRIGGER trg_resource_interactions_updated_at BEFORE UPDATE ON public.resource_interactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- Admin audit log
-- =========================================================
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action public.audit_action NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.admin_audit_logs TO authenticated;
GRANT ALL ON public.admin_audit_logs TO service_role;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read audit" ON public.admin_audit_logs FOR SELECT USING (public.is_admin());
CREATE POLICY "admins insert audit" ON public.admin_audit_logs FOR INSERT WITH CHECK (public.is_admin());
CREATE INDEX IF NOT EXISTS admin_audit_logs_entity_idx ON public.admin_audit_logs (entity_type, entity_id, created_at DESC);
CREATE INDEX IF NOT EXISTS admin_audit_logs_actor_idx ON public.admin_audit_logs (actor_id, created_at DESC);
