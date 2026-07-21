import { useState } from "react";
import { createFileRoute, Link, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { AppleButton } from "@/components/auth/AppleButton";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { DemoCredentialsPopup } from "@/components/admin/DemoCredentialsPopup";
import { supabase } from "@/integrations/supabase/client";
import { loginSchema, type LoginInput } from "@/lib/auth/schemas";
import { homeForRole, ROLE_LABELS, ROLES as ALL_ROLES } from "@/lib/auth/roles";
import type { AppRole } from "@/lib/auth/roles";

export const Route = createFileRoute("/_auth/login")({
  head: () => ({
    meta: [
      { title: "Sign in — EduNova AI" },
      { name: "description", content: "Sign in to your EduNova AI account to continue learning." },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { redirect?: string; role?: AppRole } => {
    const out: { redirect?: string; role?: AppRole } = {};
    if (typeof search.redirect === "string") out.redirect = search.redirect;
    if (typeof search.role === "string" && (ALL_ROLES as readonly string[]).includes(search.role)) {
      out.role = search.role as AppRole;
    }
    return out;
  },
  beforeLoad: async ({ search }) => {
    // If already signed in, skip login entirely and go straight to the correct dashboard.
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      const { data: r } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .maybeSingle();
      const dest =
        search.redirect && search.redirect.startsWith("/")
          ? search.redirect
          : homeForRole((r?.role as AppRole) ?? null);
      throw redirect({ to: dest });
    }
    // Unsigned users can sign in without picking a role (role is only needed for new accounts).
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { redirect: redirectTo, role: selectedRole } = Route.useSearch();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (values: LoginInput) => {
    setSubmitting(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("invalid")) {
        toast.error("Invalid email or password.");
      } else {
        toast.error(error.message);
      }
      setSubmitting(false);
      return;
    }

    if (!data.session) {
      toast.error("Could not start session. Try again.");
      setSubmitting(false);
      return;
    }

    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.session.user.id)
      .maybeSingle();

    const dest =
      redirectTo && redirectTo.startsWith("/")
        ? redirectTo
        : homeForRole((roleRow?.role as AppRole) ?? null);
    toast.success("Signed in — welcome back!");
    await queryClient.cancelQueries();
    queryClient.clear();
    await router.invalidate();
    navigate({ to: dest, replace: true });
  };

  const isAdmin = selectedRole === "admin";

  return (
    <div>
      <Link
        to={isAdmin ? "/" : "/onboarding"}
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> {isAdmin ? "Back to homepage" : "Back to onboarding"}
      </Link>
      {selectedRole && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold">
          {isAdmin && <Shield className="h-3.5 w-3.5" aria-hidden="true" />}
          {ROLE_LABELS[selectedRole as AppRole]} sign in
        </div>
      )}

      <h1 className="text-3xl font-bold tracking-tight">
        {isAdmin ? "Administrator sign in" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {isAdmin
          ? "Restricted to authorized personnel only."
          : "Sign in to continue your learning journey with Nova."}
      </p>

      {!isAdmin && (
        <>
          <div className="mt-8 space-y-3">
            <GoogleButton selectedRole={selectedRole} />
            <AppleButton selectedRole={selectedRole} />
          </div>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs uppercase tracking-wider text-muted-foreground">
              or with email
            </span>
          </div>
        </>
      )}

      <form className={`space-y-4 ${isAdmin ? "mt-8" : ""}`} onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div>
          <Label htmlFor="email">{isAdmin ? "Admin ID" : "Email"}</Label>
          <Input
            id="email"
            type={isAdmin ? "text" : "email"}
            autoComplete={isAdmin ? "username" : "email"}
            placeholder={isAdmin ? "admin ID" : "you@example.com"}
            className="mt-1.5"
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {!isAdmin && (
              <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            )}
          </div>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="mt-1.5"
            aria-invalid={!!form.formState.errors.password}
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>
          )}
        </div>

        {!isAdmin && (
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox
              id="remember"
              checked={form.watch("remember")}
              onCheckedChange={(v) => form.setValue("remember", v === true)}
            />
            <span>Remember me for 30 days</span>
          </label>
        )}

        <Button type="submit" className="w-full shadow-elegant" size="lg" disabled={submitting}>
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
          {submitting ? "Signing in…" : isAdmin ? "Continue" : "Sign in"}
        </Button>
      </form>

      {!isAdmin && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          New to EduNova AI?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      )}

      {isAdmin && <DemoCredentialsPopup />}
    </div>
  );
}
