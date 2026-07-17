
-- Support tickets and notes for the Help Desk
CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'resolved');
CREATE TYPE public.ticket_category AS ENUM ('login', 'dashboard', 'courses', 'account', 'organization', 'technical', 'other');

CREATE TABLE public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT,
  category public.ticket_category NOT NULL DEFAULT 'other',
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status public.ticket_status NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.support_tickets TO authenticated;
GRANT INSERT ON public.support_tickets TO anon;
GRANT ALL ON public.support_tickets TO service_role;

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Anyone (guest or signed-in) can submit a ticket
CREATE POLICY "Anyone can submit a ticket"
  ON public.support_tickets FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Users can view their own tickets
CREATE POLICY "Users view own tickets"
  ON public.support_tickets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view and update all tickets
CREATE POLICY "Admins view all tickets"
  ON public.support_tickets FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Super admins update tickets"
  ON public.support_tickets FOR UPDATE
  TO authenticated
  USING (public.is_super_admin(auth.uid()))
  WITH CHECK (public.is_super_admin(auth.uid()));

CREATE TRIGGER support_tickets_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX support_tickets_status_idx ON public.support_tickets(status, created_at DESC);
CREATE INDEX support_tickets_user_idx ON public.support_tickets(user_id);

-- Internal notes on tickets (admins only)
CREATE TABLE public.ticket_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.ticket_notes TO authenticated;
GRANT ALL ON public.ticket_notes TO service_role;

ALTER TABLE public.ticket_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read notes"
  ON public.ticket_notes FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Super admins add notes"
  ON public.ticket_notes FOR INSERT
  TO authenticated
  WITH CHECK (public.is_super_admin(auth.uid()) AND author_id = auth.uid());

CREATE INDEX ticket_notes_ticket_idx ON public.ticket_notes(ticket_id, created_at);
