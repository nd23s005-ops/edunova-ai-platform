import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Shield, Phone, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { PhoneInput, createEmptyPhoneValue, type PhoneInputValue } from "@/components/auth/PhoneInput";
import { supabase } from "@/integrations/supabase/client";
import { loginSchema, type LoginInput } from "@/lib/auth/schemas";
import { homeForRole, ROLE_LABELS, ROLES as ALL_ROLES } from "@/lib/auth/roles";
import type { AppRole } from "@/lib/auth/roles";

export const Route = createFileRoute("/_auth/login")({
  head: () => ({
    meta: [
      { title: "Login — EduNova AI" },
      { name: "description", content: "Sign in to your EduNova AI account to continue learning." },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
    role:
      typeof search.role === "string" && (ALL_ROLES as readonly string[]).includes(search.role)
        ? (search.role as AppRole)
        : undefined,
  }),
  component: LoginPage,
});


function LoginPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const { redirect: redirectTo, role: selectedRole } = Route.useSearch();
  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState<PhoneInputValue>(() => createEmptyPhoneValue());
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [sendingOtp, setSendingOtp] = useState(false);

  const handleSendOtp = async () => {
    if (!phone.valid || !phone.e164) {
      setPhoneError("Enter a valid phone number for the selected country.");
      return;
    }
    setPhoneError(null);
    setSendingOtp(true);
    // OTP delivery backend (Twilio Verify) not yet wired.
    // The number is already normalized to E.164 for downstream use: phone.e164
    await new Promise((r) => setTimeout(r, 400));
    setSendingOtp(false);
    toast.info("SMS OTP isn't connected yet — number captured as " + phone.e164);
  };


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
      if (msg.includes("not confirmed") || msg.includes("email not confirmed")) {
        toast.error("Please verify your email before signing in.");
        navigate({ to: "/verify-email", search: { email: values.email } });
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

    // Fetch role for role-based redirect
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.session.user.id)
      .maybeSingle();

    const dest = redirectTo && redirectTo.startsWith("/") ? redirectTo : homeForRole((roleRow?.role as AppRole) ?? null);
    toast.success("Signed in — welcome back!");
    await router.invalidate();
    navigate({ to: dest });
  };

  return (
    <div>
      <Link
        to="/onboarding"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to onboarding
      </Link>
      {selectedRole && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold">
          {selectedRole === "admin" && <Shield className="h-3.5 w-3.5" />}
          {ROLE_LABELS[selectedRole as AppRole]} sign in
        </div>
      )}

      <h1 className="text-3xl font-bold tracking-tight">
        {selectedRole === "admin" ? "Administrator sign in" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {selectedRole === "admin"
          ? "Restricted to authorized personnel only. Multi-factor authentication may be required."
          : "Sign in to continue your learning journey with Nova."}
      </p>


      <Tabs defaultValue="email" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="mt-6">
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
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
                <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
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

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox
                id="remember"
                checked={form.watch("remember")}
                onCheckedChange={(v) => form.setValue("remember", v === true)}
              />
              <span>Remember me for 30 days</span>
            </label>

            <Button type="submit" className="w-full shadow-elegant" size="lg" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="phone" className="mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone-national">Phone number</Label>
              <div className="mt-1.5">
                <PhoneInput
                  id="phone-national"
                  value={phone}
                  onChange={(v) => {
                    setPhone(v);
                    if (phoneError) setPhoneError(null);
                  }}
                  error={phoneError ?? undefined}
                />
              </div>
            </div>
            <Button
              type="button"
              className="w-full shadow-elegant"
              size="lg"
              disabled={sendingOtp || !phone.valid}
              onClick={handleSendOtp}
            >
              {sendingOtp ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Phone className="mr-2 h-4 w-4" />}
              {sendingOtp ? "Sending OTP…" : "Send OTP"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              We'll text you a 6-digit code. Message rates may apply.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs uppercase tracking-wider text-muted-foreground">
          or continue with
        </span>
      </div>

      <GoogleButton />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to EduNova AI?{" "}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
