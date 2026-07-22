import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { homeForRole } from "@/lib/auth/roles";

// Layout route for the /dashboard/admin subtree.
// Guards non-admins away and renders <Outlet /> so child routes
// (admin/support, admin/cms/*, admin/debug-errors, …) can mount.
// The overview page lives in _dashboard.dashboard.admin.index.tsx.
export const Route = createFileRoute("/_dashboard/dashboard/admin")({
  beforeLoad: async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw redirect({ to: "/login" });
    const { data: r } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .maybeSingle();
    if (r?.role !== "admin") {
      throw redirect({ to: homeForRole((r?.role as string | null) ?? null) });
    }
  },
  component: () => <Outlet />,
});
