import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ProfileInput = z.object({
  career_goal: z.string().max(200).optional().nullable(),
  target_roles: z.array(z.string().max(80)).max(10).optional(),
  preferred_locations: z.array(z.string().max(80)).max(10).optional(),
  work_mode: z.array(z.string().max(20)).max(5).optional(),
  experience_level: z.string().max(40).optional().nullable(),
  bio: z.string().max(2000).optional().nullable(),
  socials: z.record(z.string(), z.string().max(300)).optional(),
});

export const getCareerProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("career_profiles").select("*").eq("user_id", userId).maybeSingle();
    return { profile: data };
  });

export const upsertCareerProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => ProfileInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("career_profiles")
      .upsert({ user_id: userId, ...data }, { onConflict: "user_id" })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return { profile: row };
  });
