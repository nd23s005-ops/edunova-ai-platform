import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_auth/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify your email — EduNova AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): { email?: string } => {
    const out: { email?: string } = {};
    if (typeof s.email === "string") out.email = s.email;
    return out;
  },
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { email } = Route.useSearch();
  const [sending, setSending] = useState(false);

  const resend = async () => {
    if (!email) return;
    setSending(true);
    const { error } = await supabase.auth.resend({ type: "signup", email });
    setSending(false);
    if (error) toast.error(error.message);
    else toast.success("Verification email resent.");
  };

  return (
    <AuthStatus
      variant="info"
      title="Check your email"
      description={
        <>
          We sent a verification link to{" "}
          <span className="font-medium text-foreground">{email ?? "your inbox"}</span>. Click the link to
          activate your EduNova AI account.
        </>
      }
      primary={{ to: "/login", label: "Back to sign in" }}
    >
      {email && (
        <div className="mt-6">
          <Button variant="outline" onClick={resend} disabled={sending}>
            {sending ? "Resending…" : "Resend email"}
          </Button>
        </div>
      )}
    </AuthStatus>
  );
}
