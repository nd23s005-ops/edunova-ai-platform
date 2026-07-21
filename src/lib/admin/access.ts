import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type AdminLevel = "demo" | "super";

export type AdminAccess = {
  loading: boolean;
  isAdmin: boolean;
  level: AdminLevel | null;
  isSuper: boolean;
  isDemo: boolean;
  isReadOnly: boolean;
};

export function useAdminAccess(): AdminAccess {
  const { data, isLoading } = useQuery({
    queryKey: ["me", "admin-access"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return { isAdmin: false, level: null as AdminLevel | null };
      const { data: row } = await supabase
        .from("user_roles")
        .select("role, admin_level")
        .eq("user_id", userData.user.id)
        .maybeSingle();
      const isAdmin = row?.role === "admin";
      const level = (row?.admin_level as AdminLevel | null | undefined) ?? null;
      return { isAdmin, level };
    },
    staleTime: 60_000,
  });

  const isAdmin = !!data?.isAdmin;
  const level = data?.level ?? null;
  const isSuper = isAdmin && level === "super";
  // Any admin without explicit super level is treated as demo (read-only).
  const isDemo = isAdmin && !isSuper;

  return {
    loading: isLoading,
    isAdmin,
    level: isAdmin ? level ?? "demo" : null,
    isSuper,
    isDemo,
    isReadOnly: isDemo,
  };
}

/**
 * Demo admin credentials shown in the "Demo Credentials" popup.
 * The Super Administrator is intentionally NOT listed here.
 * Seed matching accounts in the Backend before sharing.
 */
export const DEMO_ADMIN_CREDENTIALS: ReadonlyArray<{
  label: string;
  email: string;
  password: string;
}> = [
  { label: "Demo Admin 1", email: "admin1@123", password: "admin1" },
  { label: "Demo Admin 2", email: "admin2@123", password: "admin2" },
];
