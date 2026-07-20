import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { RoleGate } from "@/components/auth/RoleGate";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_dashboard/dashboard/admin/cms")({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth" });
    const { data: row } = await supabase
      .from("user_roles")
      .select("role, admin_level")
      .eq("user_id", data.user.id)
      .maybeSingle();
    if (row?.role !== "admin" || row?.admin_level !== "super") {
      throw redirect({ to: "/dashboard/admin" });
    }
  },
  component: () => (
    <RoleGate allow={["admin"]}>
      <Outlet />
    </RoleGate>
  ),
});
