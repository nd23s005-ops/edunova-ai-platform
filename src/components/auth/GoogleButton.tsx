import { useState } from "react";
import { Button } from "@/components/ui/button";
import { lovable } from "@/integrations/lovable";
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
      // If redirected, browser navigates away; otherwise session is set, root listener will react.
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
