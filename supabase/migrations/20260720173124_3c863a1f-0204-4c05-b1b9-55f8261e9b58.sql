
-- ============ analytics_events ============
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_analytics_events_user ON public.analytics_events(user_id, created_at DESC);
CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type, created_at DESC);
CREATE INDEX idx_analytics_events_entity ON public.analytics_events(entity_type, entity_id);

GRANT SELECT, INSERT ON public.analytics_events TO authenticated;
GRANT ALL ON public.analytics_events TO service_role;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert their own events" ON public.analytics_events
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users read their own events" ON public.analytics_events
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

-- ============ analytics_daily_metrics ============
CREATE TABLE public.analytics_daily_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day DATE NOT NULL,
  scope_type TEXT NOT NULL,        -- 'platform' | 'organization' | 'institution' | 'course' | 'user'
  scope_id UUID,
  metric_key TEXT NOT NULL,
  metric_value NUMERIC NOT NULL DEFAULT 0,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (day, scope_type, scope_id, metric_key)
);
CREATE INDEX idx_adm_scope ON public.analytics_daily_metrics(scope_type, scope_id, day DESC);
CREATE INDEX idx_adm_metric ON public.analytics_daily_metrics(metric_key, day DESC);

GRANT SELECT ON public.analytics_daily_metrics TO authenticated;
GRANT ALL ON public.analytics_daily_metrics TO service_role;
ALTER TABLE public.analytics_daily_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read all metrics" ON public.analytics_daily_metrics
  FOR SELECT TO authenticated
  USING (public.is_admin() OR (scope_type = 'user' AND scope_id = auth.uid()));

-- ============ report_templates ============
CREATE TABLE public.report_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  scope TEXT NOT NULL DEFAULT 'personal',  -- 'personal' | 'shared' | 'admin'
  spec JSONB NOT NULL,
  is_shared BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_report_templates_owner ON public.report_templates(owner_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.report_templates TO authenticated;
GRANT ALL ON public.report_templates TO service_role;
ALTER TABLE public.report_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Read own or shared templates" ON public.report_templates
  FOR SELECT TO authenticated
  USING (owner_id = auth.uid() OR is_shared = true OR public.is_admin());
CREATE POLICY "Manage own templates" ON public.report_templates
  FOR ALL TO authenticated
  USING (owner_id = auth.uid() OR public.is_admin())
  WITH CHECK (owner_id = auth.uid() OR public.is_admin());

CREATE TRIGGER trg_report_templates_updated
  BEFORE UPDATE ON public.report_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ ai_insights ============
CREATE TABLE public.ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope_type TEXT NOT NULL,        -- 'user' | 'course' | 'institution' | 'organization' | 'platform'
  scope_id UUID,
  kind TEXT NOT NULL,              -- 'learning' | 'course-improvement' | 'at-risk' | 'trend' | 'career' | etc.
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
  confidence NUMERIC,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ
);
CREATE INDEX idx_ai_insights_scope ON public.ai_insights(scope_type, scope_id, generated_at DESC);
CREATE INDEX idx_ai_insights_kind ON public.ai_insights(kind, generated_at DESC);

GRANT SELECT ON public.ai_insights TO authenticated;
GRANT ALL ON public.ai_insights TO service_role;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Read insights for own scope or admin" ON public.ai_insights
  FOR SELECT TO authenticated
  USING (
    public.is_admin()
    OR (scope_type = 'user' AND scope_id = auth.uid())
    OR scope_type = 'platform'
  );

-- ============ ai_predictions ============
CREATE TABLE public.ai_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_type TEXT NOT NULL,       -- 'user' | 'course' | 'enrollment'
  subject_id UUID NOT NULL,
  kind TEXT NOT NULL,               -- 'completion_probability' | 'dropout_risk' | 'placement_readiness' | 'next_course' | 'certification_readiness'
  value NUMERIC,
  label TEXT,
  confidence NUMERIC,
  features JSONB NOT NULL DEFAULT '{}'::jsonb,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ
);
CREATE INDEX idx_ai_predictions_subject ON public.ai_predictions(subject_type, subject_id, kind);
CREATE INDEX idx_ai_predictions_kind ON public.ai_predictions(kind, generated_at DESC);

GRANT SELECT ON public.ai_predictions TO authenticated;
GRANT ALL ON public.ai_predictions TO service_role;
ALTER TABLE public.ai_predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Read own predictions or admin" ON public.ai_predictions
  FOR SELECT TO authenticated
  USING (
    public.is_admin()
    OR (subject_type = 'user' AND subject_id = auth.uid())
  );
