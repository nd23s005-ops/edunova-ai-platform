import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { homeForRole, normalizeRole } from "@/lib/auth/roles";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const { data: userId, isLoading: userLoading } = useQuery({
    queryKey: ["me", "user-id"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      return userData.user?.id ?? null;
    },
    staleTime: 0,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["me", "role", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data: r } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId!)
        .maybeSingle();
      return normalizeRole((r?.role as string | undefined) ?? null);
    },
    staleTime: 0,
  });

  if (userLoading || isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // If the signed-in user somehow has no role row, send them through onboarding
  // once instead of looping on /dashboard → homeForRole(null) → /dashboard.
  if (!userId || !data) return <Navigate to="/onboarding" replace />;
  const dest = homeForRole(data);
  return <Navigate to={dest} replace />;
}
