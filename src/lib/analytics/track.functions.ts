import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const TrackInput = z.object({
  event_type: z.string().min(1).max(80),
  entity_type: z.string().max(40).optional(),
  entity_id: z.string().uuid().optional(),
  meta: z.record(z.unknown()).optional(),
});

/** Client-callable telemetry: insert a single row into analytics_events for the current user. */
export const trackEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => TrackInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("analytics_events").insert({
      user_id: userId,
      event_type: data.event_type,
      entity_type: data.entity_type ?? null,
      entity_id: data.entity_id ?? null,
      meta: data.meta ?? {},
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
