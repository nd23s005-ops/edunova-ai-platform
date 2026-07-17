import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { supabase } from "@/integrations/supabase/client";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/auth/schemas";

export const Route = createFileRoute("/_auth/reset-password")({
  head: () => ({
    meta: [
      { title: "Set new password — EduNova AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    // Supabase places the recovery token in the URL hash; the client picks it up automatically.
    // Verify we ended up with a session.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
      else {
        // Give the client a moment to parse the hash
        setTimeout(async () => {
          const { data: after } = await supabase.auth.getSession();
          if (after.session) setReady(true);
          else setInvalid(true);
        }, 400);
      }
    });
  }, []);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ResetPasswordInput) => {
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password: values.password });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated. Please sign in again.");
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (invalid) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reset link expired</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This password reset link is invalid or has expired. Request a new one below.
        </p>
        <Button asChild size="lg" className="mt-8 shadow-elegant">
          <Link to="/forgot-password">Request new link</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Set a new password</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Choose a strong new password. You'll be signed in on this device afterwards.
      </p>

      <form className="mt-8 space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div>
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            className="mt-1.5"
            disabled={!ready}
            {...form.register("password")}
          />
          <PasswordStrengthMeter password={form.watch("password") || ""} />
          {form.formState.errors.password && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            className="mt-1.5"
            disabled={!ready}
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword && (
            <p className="mt-1 text-xs text-destructive">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" size="lg" className="w-full shadow-elegant" disabled={submitting || !ready}>
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {!ready ? "Verifying link…" : submitting ? "Updating…" : "Update password"}
        </Button>
      </form>
    </div>
  );
}
