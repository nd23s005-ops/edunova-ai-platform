import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const GoalInput = z.object({
  id: z.string().uuid().optional(),
  cadence: z.enum(["daily", "weekly", "monthly"]).default("weekly"),
  title: z.string().min(1).max(200),
  target: z.number().min(0).default(1),
  progress: z.number().min(0).default(0),
  due_at: z.string().datetime().optional(),
});

export const upsertGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => GoalInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const payload = { user_id: userId, cadence: data.cadence, title: data.title, target: data.target, progress: data.progress, due_at: data.due_at ?? null };
    if (data.id) {
      const completed_at = data.progress >= data.target && data.target > 0 ? new Date().toISOString() : null;
      const { data: row, error } = await supabase.from("career_goals").update({ ...payload, completed_at }).eq("id", data.id).eq("user_id", userId).select("*").single();
      if (error) throw new Error(error.message);
      return { goal: row };
    }
    const { data: row, error } = await supabase.from("career_goals").insert(payload).select("*").single();
    if (error) throw new Error(error.message);
    return { goal: row };
  });

export const listGoals = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("career_goals").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    return { goals: data ?? [] };
  });

const DelInput = z.object({ id: z.string().uuid() });
export const deleteGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => DelInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("career_goals").delete().eq("id", data.id).eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
