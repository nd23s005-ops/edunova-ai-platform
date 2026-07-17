
DROP POLICY IF EXISTS "Anyone can submit a ticket" ON public.support_tickets;

CREATE POLICY "Anyone can submit a valid ticket"
  ON public.support_tickets FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) BETWEEN 1 AND 120
    AND length(trim(subject)) BETWEEN 1 AND 200
    AND length(trim(description)) BETWEEN 1 AND 4000
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (auth.uid() IS NULL OR user_id IS NULL OR user_id = auth.uid())
  );
