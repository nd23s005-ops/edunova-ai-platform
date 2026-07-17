import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { supabase } from "@/integrations/supabase/client";
import { registerSchema, type RegisterInput } from "@/lib/auth/schemas";
import { SELF_SIGNUP_ROLES, ROLE_LABELS } from "@/lib/auth/roles";

export const Route = createFileRoute("/_auth/register")({
  head: () => ({
    meta: [
      { title: "Create account — EduNova AI" },
      { name: "description", content: "Create your EduNova AI account and start learning with Nova today." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
      acceptTerms: false as unknown as true,
    },
    mode: "onBlur",
  });

  const password = form.watch("password");

  const onSubmit = async (values: RegisterInput) => {
    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-success`,
        data: { full_name: values.fullName, role: values.role },
      },
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("already") || msg.includes("registered")) {
        toast.error("An account with this email already exists.");
      } else {
        toast.error(error.message);
      }
      setSubmitting(false);
      return;
    }

    // If email confirmations are on, session is null → go to verify-email screen
    if (!data.session) {
      navigate({ to: "/verify-email", search: { email: values.email } });
    } else {
      navigate({ to: "/account-created" });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Start learning with Nova in less than a minute.
      </p>

      <form className="mt-8 space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="Ada Lovelace"
            className="mt-1.5"
            {...form.register("fullName")}
          />
          {form.formState.errors.fullName && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.fullName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="mt-1.5"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="mt-1.5"
            {...form.register("password")}
          />
          <PasswordStrengthMeter password={password || ""} />
          {form.formState.errors.password && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter password"
            className="mt-1.5"
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword && (
            <p className="mt-1 text-xs text-destructive">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <Label>I'm joining as</Label>
          <RadioGroup
            value={form.watch("role")}
            onValueChange={(v) => form.setValue("role", v as RegisterInput["role"])}
            className="mt-2 grid grid-cols-3 gap-2"
          >
            {SELF_SIGNUP_ROLES.map((r) => (
              <label
                key={r}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
              >
                <RadioGroupItem value={r} id={`role-${r}`} />
                <span>{ROLE_LABELS[r]}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <Checkbox
            id="acceptTerms"
            checked={form.watch("acceptTerms") as unknown as boolean}
            onCheckedChange={(v) =>
              form.setValue("acceptTerms", (v === true) as unknown as true, { shouldValidate: true })
            }
          />
          <span>
            I agree to the{" "}
            <Link to="/about" className="underline">Terms</Link> and{" "}
            <Link to="/about" className="underline">Privacy Policy</Link>.
          </span>
        </label>
        {form.formState.errors.acceptTerms && (
          <p className="text-xs text-destructive">{form.formState.errors.acceptTerms.message}</p>
        )}

        <Button type="submit" className="w-full shadow-elegant" size="lg" disabled={submitting}>
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs uppercase tracking-wider text-muted-foreground">
          or sign up with
        </span>
      </div>

      <GoogleButton label="Sign up with Google" />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
