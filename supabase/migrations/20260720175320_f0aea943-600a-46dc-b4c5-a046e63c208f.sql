
-- ENUMS
DO $$ BEGIN CREATE TYPE public.community_visibility AS ENUM ('public','private','unlisted'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE public.community_member_role AS ENUM ('owner','moderator','member'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE public.mentorship_status AS ENUM ('pending','active','completed','declined','cancelled'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE public.event_kind AS ENUM ('live_class','workshop','webinar','contest','hackathon','career','qa'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE public.chat_kind AS ENUM ('direct','group','course','community','study_group'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE public.article_kind AS ENUM ('article','tutorial','note','research','snippet','showcase','success_story'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE public.report_status AS ENUM ('open','reviewing','resolved','dismissed'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- =================================================================
-- STEP 1: CREATE ALL TABLES + GRANTS + RLS enable (no policies yet)
-- =================================================================
CREATE TABLE IF NOT EXISTS public.communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT NOT NULL DEFAULT 'general',
  visibility public.community_visibility NOT NULL DEFAULT 'public',
  cover_url TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  member_count INT NOT NULL DEFAULT 1,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  guidelines TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.communities TO authenticated;
GRANT ALL ON public.communities TO service_role;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS communities_category_idx ON public.communities(category);
CREATE INDEX IF NOT EXISTS communities_visibility_idx ON public.communities(visibility);

CREATE TABLE IF NOT EXISTS public.community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.community_member_role NOT NULL DEFAULT 'member',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(community_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.community_members TO authenticated;
GRANT ALL ON public.community_members TO service_role;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.community_follows (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, community_id)
);
GRANT SELECT, INSERT, DELETE ON public.community_follows TO authenticated;
GRANT ALL ON public.community_follows TO service_role;
ALTER TABLE public.community_follows ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES public.communities(id) ON DELETE SET NULL,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  views INT NOT NULL DEFAULT 0,
  upvotes INT NOT NULL DEFAULT 0,
  downvotes INT NOT NULL DEFAULT 0,
  answer_count INT NOT NULL DEFAULT 0,
  accepted_answer_id UUID,
  status TEXT NOT NULL DEFAULT 'open',
  is_locked BOOLEAN NOT NULL DEFAULT false,
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.discussions TO authenticated;
GRANT ALL ON public.discussions TO service_role;
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS discussions_community_idx ON public.discussions(community_id);
CREATE INDEX IF NOT EXISTS discussions_author_idx ON public.discussions(author_id);
CREATE INDEX IF NOT EXISTS discussions_created_idx ON public.discussions(created_at DESC);

CREATE TABLE IF NOT EXISTS public.discussion_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  upvotes INT NOT NULL DEFAULT 0,
  downvotes INT NOT NULL DEFAULT 0,
  is_accepted BOOLEAN NOT NULL DEFAULT false,
  is_ai BOOLEAN NOT NULL DEFAULT false,
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.discussion_answers TO authenticated;
GRANT ALL ON public.discussion_answers TO service_role;
ALTER TABLE public.discussion_answers ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS answers_discussion_idx ON public.discussion_answers(discussion_id);

CREATE TABLE IF NOT EXISTS public.discussion_votes (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('discussion','answer')),
  target_id UUID NOT NULL,
  value SMALLINT NOT NULL CHECK (value IN (-1, 1)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, target_type, target_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.discussion_votes TO authenticated;
GRANT ALL ON public.discussion_votes TO service_role;
ALTER TABLE public.discussion_votes ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.discussion_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID REFERENCES public.discussions(id) ON DELETE CASCADE,
  answer_id UUID REFERENCES public.discussion_answers(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (discussion_id IS NOT NULL OR answer_id IS NOT NULL)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.discussion_comments TO authenticated;
GRANT ALL ON public.discussion_comments TO service_role;
ALTER TABLE public.discussion_comments ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.discussion_bookmarks (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, discussion_id)
);
GRANT SELECT, INSERT, DELETE ON public.discussion_bookmarks TO authenticated;
GRANT ALL ON public.discussion_bookmarks TO service_role;
ALTER TABLE public.discussion_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.study_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  topic TEXT DEFAULT '',
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_public BOOLEAN NOT NULL DEFAULT true,
  meeting_link TEXT,
  schedule TEXT,
  resources JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_groups TO authenticated;
GRANT ALL ON public.study_groups TO service_role;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.study_group_members (
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (group_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_group_members TO authenticated;
GRANT ALL ON public.study_group_members TO service_role;
ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.mentor_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  headline TEXT NOT NULL DEFAULT '',
  bio TEXT DEFAULT '',
  expertise TEXT[] NOT NULL DEFAULT '{}',
  years_experience INT NOT NULL DEFAULT 0,
  hourly_rate NUMERIC(10,2) DEFAULT 0,
  availability JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_accepting BOOLEAN NOT NULL DEFAULT true,
  rating NUMERIC(3,2) DEFAULT 0,
  session_count INT NOT NULL DEFAULT 0,
  linkedin_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mentor_profiles TO authenticated;
GRANT ALL ON public.mentor_profiles TO service_role;
ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.mentorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  learner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status public.mentorship_status NOT NULL DEFAULT 'pending',
  goals TEXT DEFAULT '',
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mentorships TO authenticated;
GRANT ALL ON public.mentorships TO service_role;
ALTER TABLE public.mentorships ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.mentor_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentorship_id UUID NOT NULL REFERENCES public.mentorships(id) ON DELETE CASCADE,
  mentor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  learner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 60,
  topic TEXT DEFAULT '',
  meeting_link TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  learner_rating INT,
  learner_feedback TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mentor_sessions TO authenticated;
GRANT ALL ON public.mentor_sessions TO service_role;
ALTER TABLE public.mentor_sessions ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.community_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES public.communities(id) ON DELETE SET NULL,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  kind public.event_kind NOT NULL DEFAULT 'live_class',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  cover_url TEXT,
  meeting_link TEXT,
  capacity INT DEFAULT 0,
  registered_count INT NOT NULL DEFAULT 0,
  tags TEXT[] NOT NULL DEFAULT '{}',
  resources JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.community_events TO authenticated;
GRANT ALL ON public.community_events TO service_role;
ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.event_registrations (
  event_id UUID NOT NULL REFERENCES public.community_events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  attended BOOLEAN NOT NULL DEFAULT false,
  reminded BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (event_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_registrations TO authenticated;
GRANT ALL ON public.event_registrations TO service_role;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind public.chat_kind NOT NULL DEFAULT 'direct',
  title TEXT,
  community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE,
  study_group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_conversations TO authenticated;
GRANT ALL ON public.chat_conversations TO service_role;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.chat_participants (
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (conversation_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_participants TO authenticated;
GRANT ALL ON public.chat_participants TO service_role;
ALTER TABLE public.chat_participants ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_messages TO service_role;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS chat_messages_conv_idx ON public.chat_messages(conversation_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.knowledge_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id) ON DELETE SET NULL,
  kind public.article_kind NOT NULL DEFAULT 'article',
  title TEXT NOT NULL,
  summary TEXT DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  cover_url TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT true,
  likes INT NOT NULL DEFAULT 0,
  views INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.knowledge_articles TO authenticated;
GRANT ALL ON public.knowledge_articles TO service_role;
ALTER TABLE public.knowledge_articles ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.article_reactions (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES public.knowledge_articles(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('like','bookmark','share')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, article_id, kind)
);
GRANT SELECT, INSERT, DELETE ON public.article_reactions TO authenticated;
GRANT ALL ON public.article_reactions TO service_role;
ALTER TABLE public.article_reactions ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.moderation_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  reason TEXT NOT NULL,
  details TEXT DEFAULT '',
  ai_flags JSONB NOT NULL DEFAULT '{}'::jsonb,
  status public.report_status NOT NULL DEFAULT 'open',
  resolved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  resolution_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.moderation_reports TO authenticated;
GRANT ALL ON public.moderation_reports TO service_role;
ALTER TABLE public.moderation_reports ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.community_xp_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INT NOT NULL,
  reason TEXT NOT NULL,
  reference_type TEXT,
  reference_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.community_xp_events TO authenticated;
GRANT ALL ON public.community_xp_events TO service_role;
ALTER TABLE public.community_xp_events ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.community_badges_earned (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_key TEXT NOT NULL,
  label TEXT NOT NULL,
  awarded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_key)
);
GRANT SELECT, INSERT, DELETE ON public.community_badges_earned TO authenticated;
GRANT ALL ON public.community_badges_earned TO service_role;
ALTER TABLE public.community_badges_earned ENABLE ROW LEVEL SECURITY;

-- =================================================================
-- STEP 2: RLS POLICIES
-- =================================================================
CREATE POLICY "communities read" ON public.communities FOR SELECT TO authenticated USING (visibility = 'public' OR owner_id = auth.uid() OR EXISTS (SELECT 1 FROM public.community_members m WHERE m.community_id = communities.id AND m.user_id = auth.uid()));
CREATE POLICY "communities create own" ON public.communities FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid());
CREATE POLICY "communities update owner" ON public.communities FOR UPDATE TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE POLICY "communities delete owner" ON public.communities FOR DELETE TO authenticated USING (owner_id = auth.uid());

CREATE POLICY "members read" ON public.community_members FOR SELECT TO authenticated USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.communities c WHERE c.id = community_id AND (c.visibility = 'public' OR c.owner_id = auth.uid())));
CREATE POLICY "members join self" ON public.community_members FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "members leave" ON public.community_members FOR DELETE TO authenticated USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.communities c WHERE c.id = community_id AND c.owner_id = auth.uid()));
CREATE POLICY "members update owner" ON public.community_members FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.communities c WHERE c.id = community_id AND c.owner_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.communities c WHERE c.id = community_id AND c.owner_id = auth.uid()));

CREATE POLICY "follows self" ON public.community_follows FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "discussions read" ON public.discussions FOR SELECT TO authenticated USING (community_id IS NULL OR EXISTS (SELECT 1 FROM public.communities c WHERE c.id = community_id AND (c.visibility = 'public' OR c.owner_id = auth.uid() OR EXISTS (SELECT 1 FROM public.community_members m WHERE m.community_id = c.id AND m.user_id = auth.uid()))));
CREATE POLICY "discussions create" ON public.discussions FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "discussions update author" ON public.discussions FOR UPDATE TO authenticated USING (author_id = auth.uid()) WITH CHECK (author_id = auth.uid());
CREATE POLICY "discussions delete author" ON public.discussions FOR DELETE TO authenticated USING (author_id = auth.uid());

CREATE POLICY "answers read" ON public.discussion_answers FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.discussions d WHERE d.id = discussion_id));
CREATE POLICY "answers create" ON public.discussion_answers FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "answers update author" ON public.discussion_answers FOR UPDATE TO authenticated USING (author_id = auth.uid()) WITH CHECK (author_id = auth.uid());
CREATE POLICY "answers delete author" ON public.discussion_answers FOR DELETE TO authenticated USING (author_id = auth.uid());

CREATE POLICY "votes self" ON public.discussion_votes FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "comments read" ON public.discussion_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "comments create" ON public.discussion_comments FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "comments delete author" ON public.discussion_comments FOR DELETE TO authenticated USING (author_id = auth.uid());

CREATE POLICY "d_bookmarks self" ON public.discussion_bookmarks FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "sg read" ON public.study_groups FOR SELECT TO authenticated USING (is_public = true OR owner_id = auth.uid() OR EXISTS (SELECT 1 FROM public.study_group_members m WHERE m.group_id = study_groups.id AND m.user_id = auth.uid()));
CREATE POLICY "sg create" ON public.study_groups FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid());
CREATE POLICY "sg update owner" ON public.study_groups FOR UPDATE TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE POLICY "sg delete owner" ON public.study_groups FOR DELETE TO authenticated USING (owner_id = auth.uid());

CREATE POLICY "sgm read" ON public.study_group_members FOR SELECT TO authenticated USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.study_groups g WHERE g.id = group_id AND (g.is_public OR g.owner_id = auth.uid())));
CREATE POLICY "sgm join self" ON public.study_group_members FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "sgm leave" ON public.study_group_members FOR DELETE TO authenticated USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.study_groups g WHERE g.id = group_id AND g.owner_id = auth.uid()));

CREATE POLICY "mentors read all" ON public.mentor_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "mentors self write" ON public.mentor_profiles FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "mentorships read parties" ON public.mentorships FOR SELECT TO authenticated USING (mentor_id = auth.uid() OR learner_id = auth.uid());
CREATE POLICY "mentorships create learner" ON public.mentorships FOR INSERT TO authenticated WITH CHECK (learner_id = auth.uid());
CREATE POLICY "mentorships update parties" ON public.mentorships FOR UPDATE TO authenticated USING (mentor_id = auth.uid() OR learner_id = auth.uid()) WITH CHECK (mentor_id = auth.uid() OR learner_id = auth.uid());

CREATE POLICY "sessions read parties" ON public.mentor_sessions FOR SELECT TO authenticated USING (mentor_id = auth.uid() OR learner_id = auth.uid());
CREATE POLICY "sessions manage parties" ON public.mentor_sessions FOR ALL TO authenticated USING (mentor_id = auth.uid() OR learner_id = auth.uid()) WITH CHECK (mentor_id = auth.uid() OR learner_id = auth.uid());

CREATE POLICY "events read" ON public.community_events FOR SELECT TO authenticated USING (is_public = true OR host_id = auth.uid());
CREATE POLICY "events create" ON public.community_events FOR INSERT TO authenticated WITH CHECK (host_id = auth.uid());
CREATE POLICY "events update host" ON public.community_events FOR UPDATE TO authenticated USING (host_id = auth.uid()) WITH CHECK (host_id = auth.uid());
CREATE POLICY "events delete host" ON public.community_events FOR DELETE TO authenticated USING (host_id = auth.uid());

CREATE POLICY "reg self" ON public.event_registrations FOR ALL TO authenticated USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.community_events e WHERE e.id = event_id AND e.host_id = auth.uid())) WITH CHECK (user_id = auth.uid());

CREATE POLICY "conv read participant" ON public.chat_conversations FOR SELECT TO authenticated USING (created_by = auth.uid() OR EXISTS (SELECT 1 FROM public.chat_participants p WHERE p.conversation_id = chat_conversations.id AND p.user_id = auth.uid()));
CREATE POLICY "conv create" ON public.chat_conversations FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());

CREATE POLICY "cp read own" ON public.chat_participants FOR SELECT TO authenticated USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.chat_conversations c WHERE c.id = conversation_id AND c.created_by = auth.uid()));
CREATE POLICY "cp add" ON public.chat_participants FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.chat_conversations c WHERE c.id = conversation_id AND c.created_by = auth.uid()));
CREATE POLICY "cp update self" ON public.chat_participants FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "cp leave self" ON public.chat_participants FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "msg read participant" ON public.chat_messages FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.chat_participants p WHERE p.conversation_id = chat_messages.conversation_id AND p.user_id = auth.uid()));
CREATE POLICY "msg send participant" ON public.chat_messages FOR INSERT TO authenticated WITH CHECK (sender_id = auth.uid() AND EXISTS (SELECT 1 FROM public.chat_participants p WHERE p.conversation_id = chat_messages.conversation_id AND p.user_id = auth.uid()));
CREATE POLICY "msg delete sender" ON public.chat_messages FOR DELETE TO authenticated USING (sender_id = auth.uid());

CREATE POLICY "articles read published" ON public.knowledge_articles FOR SELECT TO authenticated USING (is_published = true OR author_id = auth.uid());
CREATE POLICY "articles create" ON public.knowledge_articles FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "articles update author" ON public.knowledge_articles FOR UPDATE TO authenticated USING (author_id = auth.uid()) WITH CHECK (author_id = auth.uid());
CREATE POLICY "articles delete author" ON public.knowledge_articles FOR DELETE TO authenticated USING (author_id = auth.uid());

CREATE POLICY "reactions self" ON public.article_reactions FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "reports create" ON public.moderation_reports FOR INSERT TO authenticated WITH CHECK (reporter_id = auth.uid());
CREATE POLICY "reports read" ON public.moderation_reports FOR SELECT TO authenticated USING (reporter_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "reports update admin" ON public.moderation_reports FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "cxp read all" ON public.community_xp_events FOR SELECT TO authenticated USING (true);
CREATE POLICY "cxp create self" ON public.community_xp_events FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "badges read all" ON public.community_badges_earned FOR SELECT TO authenticated USING (true);
CREATE POLICY "badges create self" ON public.community_badges_earned FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- =================================================================
-- STEP 3: TRIGGERS
-- =================================================================
DO $$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY['communities','discussions','discussion_answers','study_groups','mentor_profiles','mentorships','mentor_sessions','community_events','knowledge_articles','moderation_reports']) LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_updated_at_%1$s ON public.%1$s;', t);
    EXECUTE format('CREATE TRIGGER trg_updated_at_%1$s BEFORE UPDATE ON public.%1$s FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();', t);
  END LOOP;
END $$;

CREATE OR REPLACE FUNCTION public.community_bump_member_count() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN UPDATE public.communities SET member_count = member_count + 1 WHERE id = NEW.community_id; RETURN NEW; END IF;
  IF TG_OP = 'DELETE' THEN UPDATE public.communities SET member_count = GREATEST(member_count - 1, 0) WHERE id = OLD.community_id; RETURN OLD; END IF;
  RETURN NULL;
END $$;
DROP TRIGGER IF EXISTS trg_community_members_count ON public.community_members;
CREATE TRIGGER trg_community_members_count AFTER INSERT OR DELETE ON public.community_members FOR EACH ROW EXECUTE FUNCTION public.community_bump_member_count();

CREATE OR REPLACE FUNCTION public.discussion_bump_answers() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN UPDATE public.discussions SET answer_count = answer_count + 1 WHERE id = NEW.discussion_id; RETURN NEW; END IF;
  IF TG_OP = 'DELETE' THEN UPDATE public.discussions SET answer_count = GREATEST(answer_count - 1, 0) WHERE id = OLD.discussion_id; RETURN OLD; END IF;
  RETURN NULL;
END $$;
DROP TRIGGER IF EXISTS trg_discussion_answers_count ON public.discussion_answers;
CREATE TRIGGER trg_discussion_answers_count AFTER INSERT OR DELETE ON public.discussion_answers FOR EACH ROW EXECUTE FUNCTION public.discussion_bump_answers();

CREATE OR REPLACE FUNCTION public.event_bump_registrations() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN UPDATE public.community_events SET registered_count = registered_count + 1 WHERE id = NEW.event_id; RETURN NEW; END IF;
  IF TG_OP = 'DELETE' THEN UPDATE public.community_events SET registered_count = GREATEST(registered_count - 1, 0) WHERE id = OLD.event_id; RETURN OLD; END IF;
  RETURN NULL;
END $$;
DROP TRIGGER IF EXISTS trg_event_reg_count ON public.event_registrations;
CREATE TRIGGER trg_event_reg_count AFTER INSERT OR DELETE ON public.event_registrations FOR EACH ROW EXECUTE FUNCTION public.event_bump_registrations();
