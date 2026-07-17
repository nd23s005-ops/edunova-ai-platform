import { useState } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";
import { homeForRole, type AppRole } from "@/lib/auth/roles";
import { toast } from "sonner";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M12 10.2v3.9h5.5c-.24 1.3-1.62 3.8-5.5 3.8-3.3 0-6-2.75-6-6.15S8.7 5.6 12 5.6c1.9 0 3.14.8 3.86 1.5l2.63-2.55C16.86 3 14.66 2 12 2 6.98 2 3 5.98 3 11s3.98 9 9 9c5.2 0 8.65-3.65 8.65-8.8 0-.59-.06-1.05-.14-1.5H12Z"
    />
  </svg>
);

export function GoogleButton({ label = "Continue with Google" }: { label?: string }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message || "Google sign-in failed");
        setLoading(false);
        return;
      }
      if (result.redirected) {
        // Browser navigating away; nothing more to do here.
        return;
      }
      // Popup flow: session is set. Resolve role from DB and route once.
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
      toast.error(e instanceof Error ? e.message : "Google sign-in failed");
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
    >
      <GoogleIcon />
      {loading ? "Redirecting…" : label}
    </Button>
  );
}
