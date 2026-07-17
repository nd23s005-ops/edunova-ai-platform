import { Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { homeForRole, normalizeRole } from "@/lib/auth/roles";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const inDashboard = pathname.startsWith("/dashboard");

  const { data: role } = useQuery({
    queryKey: ["me", "role-lite"],
    enabled: inDashboard,
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data: r } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.user.id)
        .maybeSingle();
      return normalizeRole((r?.role as string | undefined) ?? null);
    },
    staleTime: 0,
    refetchOnMount: "always",
  });

  const target = inDashboard ? homeForRole(role ?? undefined) : "/";

  return (
    <Link
      to={target}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="EduNova AI home"
    >
      <span
        className="relative grid h-9 w-9 place-items-center rounded-xl text-white shadow-[0_8px_24px_-8px_oklch(0.72_0.16_50/0.7)] transition-transform group-hover:scale-105"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.82 0.16 55) 0%, oklch(0.7 0.19 40) 100%)",
        }}
      >
        <GraduationCap className="h-5 w-5" strokeWidth={2.4} />
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-bold leading-none tracking-tight text-[oklch(0.18_0.03_240)]">
          EduNova<span className="text-[oklch(0.7_0.19_40)]">AI</span>
        </span>
      )}
    </Link>
  );
}
