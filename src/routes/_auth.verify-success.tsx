import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_auth/verify-success")({
  head: () => ({
    meta: [
      { title: "Email verified — EduNova AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VerifySuccessPage,
});

function VerifySuccessPage() {
  const [checked, setChecked] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async () => {
      // Give client a moment to consume the hash tokens
      await new Promise((r) => setTimeout(r, 300));
      const { data } = await supabase.auth.getSession();
      setOk(!!data.session);
      setChecked(true);
    })();
  }, []);

  if (!checked) {
    return (
      <AuthStatus
        variant="info"
        title="Confirming your account…"
        description="Please wait while we verify your email."
      />
    );
  }

  if (!ok) {
    return (
      <AuthStatus
        variant="error"
        title="Verification failed"
        description="This link is invalid or has expired. Try signing in — we may already have verified your account."
        primary={{ to: "/login", label: "Go to sign in" }}
        secondary={{ to: "/register", label: "Create new account" }}
      />
    );
  }

  return (
    <AuthStatus
      variant="success"
      title="Email verified 🎉"
      description="Your EduNova AI account is now active. Head to your dashboard to start learning with Nova."
      primary={{ to: "/dashboard", label: "Go to dashboard" }}
    />
  );
}
