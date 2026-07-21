import { useState } from "react";
import { createFileRoute, Link, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertCircle, ArrowLeft, ChevronDown, Loader2, Shield } from "lucide-react";

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
import { DEMO_ADMIN_CREDENTIALS } from "@/lib/admin/access";
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
  const [adminError, setAdminError] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const isAdminFlow = selectedRole === "admin";
  const allowedDemoEmails = new Set(DEMO_ADMIN_CREDENTIALS.map((c) => c.email.toLowerCase()));

  const fillDemo = (email: string, password: string) => {
    form.setValue("email", email, { shouldValidate: true });
    form.setValue("password", password, { shouldValidate: true });
    setAdminError(null);
  };

  const onSubmit = async (values: LoginInput) => {
    setSubmitting(true);
    setAdminError(null);

    // For admin sign-in, catch obvious typos like "demo.admin1@edunova.ai"
    // before hitting the auth server and point to the seeded demo IDs.
    if (isAdminFlow) {
      const entered = values.email.trim().toLowerCase();
      const looksLikeDemoTypo = /^demo[._-]?admin/i.test(values.email) || entered.endsWith("@edunova.ai");
      if (looksLikeDemoTypo && !allowedDemoEmails.has(entered)) {
        const list = DEMO_ADMIN_CREDENTIALS.map((c) => c.email).join(" or ");
        const message = `That admin account doesn't exist. Use ${list} — click "Fill" below to auto-fill a demo account.`;
        setAdminError(message);
        toast.error(message);
        setSubmitting(false);
        return;
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (isAdminFlow && msg.includes("invalid")) {
        const list = DEMO_ADMIN_CREDENTIALS.map((c) => `${c.email} / ${c.password}`).join(" — or — ");
        const message = `Invalid Admin ID or password. Demo admins: ${list}. Click "Fill" below to auto-fill.`;
        setAdminError(message);
        toast.error("Invalid Admin ID or password — see demo credentials below.");
      } else if (msg.includes("invalid")) {
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

  const isAdmin = isAdminFlow;

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

      {isAdmin && adminError && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p className="leading-relaxed">{adminError}</p>
        </div>
      )}

      <form className={`space-y-4 ${isAdmin ? "mt-6" : ""}`} onSubmit={form.handleSubmit(onSubmit)} noValidate>
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

      {isAdmin && (
        <div className="mt-8 space-y-4">
          <DemoCredentialsPopup variant="inline" onFill={fillDemo} />
          <details className="group rounded-xl border border-border/70 bg-card/60 p-4 text-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              <span>Troubleshooting sign-in</span>
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <ul className="mt-3 space-y-3 text-xs text-muted-foreground">
              <li>
                <p className="font-semibold text-foreground">Wrong demo Admin ID</p>
                <p>
                  Only the accounts listed above work as demo admins. IDs like
                  <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono">demo.admin1@edunova.ai</code>
                  don&apos;t exist — use <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono">admin1@123</code>
                  or <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono">admin2@123</code>, or click <em>Fill</em>.
                </p>
              </li>
              <li>
                <p className="font-semibold text-foreground">Role mismatch after signing in</p>
                <p>
                  If you signed in but landed on a non-admin dashboard, your account isn&apos;t assigned the
                  <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono">admin</code> role. Sign out
                  and use a listed demo admin, or contact a Super Administrator.
                </p>
              </li>
              <li>
                <p className="font-semibold text-foreground">Cached session or stuck redirect</p>
                <p>
                  Clear a stale session by opening this page in a private window, or sign out from{" "}
                  <Link to="/session-expired" className="text-primary hover:underline">
                    /session-expired
                  </Link>
                  , then try again.
                </p>
              </li>
              <li>
                <p className="font-semibold text-foreground">Password not accepted</p>
                <p>
                  Passwords are case-sensitive and have no trailing spaces. Use the <em>Fill</em> button to
                  avoid copy-paste mistakes.
                </p>
              </li>
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}
