import { useState } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";
import { homeForRole, type AppRole } from "@/lib/auth/roles";
import { toast } from "sonner";

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      fill="currentColor"
      d="M16.365 1.43c0 1.14-.42 2.23-1.24 3.05-.83.83-2.16 1.47-3.26 1.38-.13-1.1.42-2.24 1.19-2.98.85-.83 2.24-1.42 3.31-1.45ZM20.5 17.02c-.55 1.28-.82 1.86-1.54 2.99-1 1.58-2.42 3.55-4.17 3.57-1.56.02-1.96-1.02-4.08-1-2.12.01-2.56 1.02-4.12 1-1.76-.02-3.1-1.8-4.1-3.38-2.8-4.4-3.09-9.57-1.36-12.32 1.22-1.95 3.15-3.09 4.97-3.09 1.85 0 3.02 1.02 4.55 1.02 1.48 0 2.38-1.02 4.52-1.02 1.62 0 3.34.88 4.56 2.4-4.01 2.2-3.36 7.94.77 9.83Z"
    />
  </svg>
);

export function AppleButton({ label = "Continue with Apple" }: { label?: string }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const handle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("apple", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message || "Apple sign-in failed");
        setLoading(false);
        return;
      }
      if (result.redirected) return;
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        toast.error("Sign-in did not complete. Please try again.");
        setLoading(false);
        return;
      }
      const { data: r } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .maybeSingle();
      const dest = homeForRole((r?.role as AppRole) ?? null);
      await queryClient.cancelQueries();
      queryClient.clear();
      await router.invalidate();
      navigate({ to: dest, replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Apple sign-in failed");
      setLoading(false);
    }
  };
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="w-full gap-2"
      onClick={handle}
      disabled={loading}
      aria-label={label}
    >
      <AppleIcon />
      {loading ? "Redirecting…" : label}
    </Button>
  );
}
