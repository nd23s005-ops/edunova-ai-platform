import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const publicSignupRoleSchema = z.enum([
  "student",
  "college_student",
  "professional",
]);


export const completeAuthRoleSelection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => publicSignupRoleSchema.parse(data))
  .handler(async ({ data: requestedRole, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;

    const { data: currentRole, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();
    if (roleError) throw roleError;

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", userId)
      .maybeSingle();
    if (profileError) throw profileError;

    if (currentRole?.role === "admin") return "admin";

    if (profile?.onboarding_completed && currentRole?.role) {
      if (currentRole.role === "school_student") return "student";
      return currentRole.role;
    }

    if (currentRole?.role) {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .update({ role: requestedRole })
        .eq("user_id", userId);
      if (error) throw error;
    } else {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: userId, role: requestedRole });
      if (error) throw error;
    }

    // Only the school-student track keeps onboarding open (grade/board selection).
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          id: userId,
          onboarding_completed: requestedRole !== "student",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );
    if (updateError) throw updateError;

    return requestedRole;
  });