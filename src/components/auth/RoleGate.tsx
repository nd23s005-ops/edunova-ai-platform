import type { ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { AppRole } from "@/lib/auth/roles";

export function RoleGate({ allow, children }: { allow: AppRole[]; children: ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: ["me", "role"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return null;
      const { data: r } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .maybeSingle();
      return (r?.role as AppRole | undefined) ?? null;
    },
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data || !allow.includes(data)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
