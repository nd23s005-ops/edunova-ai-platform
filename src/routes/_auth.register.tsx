import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { AppleButton } from "@/components/auth/AppleButton";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { supabase } from "@/integrations/supabase/client";
import { registerSchema, type RegisterInput } from "@/lib/auth/schemas";
import {
  SELF_SIGNUP_ROLES,
  ROLE_LABELS,
  ROLES as ALL_ROLES,
  homeForRole,
} from "@/lib/auth/roles";
import type { AppRole } from "@/lib/auth/roles";
import { COUNTRIES, DEFAULT_COUNTRY } from "@/lib/auth/countries";

export const Route = createFileRoute("/_auth/register")({
  head: () => ({
    meta: [
      { title: "Create account — EduNova AI" },
      { name: "description", content: "Create your EduNova AI account and start learning with Nova today." },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    role:
      typeof search.role === "string" && (ALL_ROLES as readonly string[]).includes(search.role)
        ? (search.role as AppRole)
        : undefined,
  }),
  component: RegisterPage,
});

function calcAge(dob: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const hasHadBirthday =
    now.getMonth() > d.getMonth() ||
    (now.getMonth() === d.getMonth() && now.getDate() >= d.getDate());
  if (!hasHadBirthday) age--;
  return age >= 0 && age <= 120 ? age : null;
}

function RegisterPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { role: selectedRole } = Route.useSearch();
  const [submitting, setSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const initialRole: RegisterInput["role"] =
    selectedRole && selectedRole !== "admin" ? selectedRole : "student";

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      country: DEFAULT_COUNTRY,
      password: "",
      confirmPassword: "",
      role: initialRole,
      acceptTerms: false as unknown as true,
      acceptPrivacy: false as unknown as true,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (selectedRole === "admin") {
      navigate({ to: "/login", search: { role: "admin" } });
    }
  }, [selectedRole, navigate]);

  const password = form.watch("password");
  const dob = form.watch("dob");
  const age = useMemo(() => calcAge(dob || ""), [dob]);

  const setConsent = (field: "acceptTerms" | "acceptPrivacy", checked: boolean) => {
    if (field === "acceptTerms") setTermsAccepted(checked);
    if (field === "acceptPrivacy") setPrivacyAccepted(checked);
    form.setValue(field, checked as unknown as true, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (values: RegisterInput) => {
    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: values.fullName,
          role: values.role,
          phone: values.phone ?? "",
          dob: values.dob,
          country: values.country,
        },
      },
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("already") || msg.includes("registered")) {
        toast.error("An account with this email already exists. Try signing in.");
      } else if (msg.includes("weak") || msg.includes("pwned") || msg.includes("compromised")) {
        toast.error("This password has been found in data breaches. Choose a stronger one.");
      } else {
        toast.error(error.message);
      }
      setSubmitting(false);
      return;
    }

    // With auto-confirm enabled, signUp returns a session immediately.
    if (!data.session) {
      // Fallback if project-level policy forces confirmation: attempt sign-in.
      const { data: signIn } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (!signIn.session) {
        toast.success("Account created. Please sign in to continue.");
        navigate({ to: "/login" });
        return;
      }
    }

    toast.success("Welcome to EduNova AI!");
    await queryClient.cancelQueries();
    queryClient.clear();
    await router.invalidate();
    navigate({ to: homeForRole(values.role as AppRole), replace: true });
  };

  return (
    <div>
      <Link
        to="/onboarding"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to onboarding
      </Link>
      {selectedRole && selectedRole !== "admin" && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold">
          {ROLE_LABELS[selectedRole as AppRole]} sign up
        </div>
      )}
      <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Start learning with Nova in less than a minute.
      </p>

      <div className="mt-8 space-y-3">
        <GoogleButton label="Sign up with Google" />
        <AppleButton label="Sign up with Apple" />
      </div>

      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs uppercase tracking-wider text-muted-foreground">
          or with email
        </span>
      </div>

      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="Ada Lovelace"
            className="mt-1.5"
            aria-invalid={!!form.formState.errors.fullName}
            {...form.register("fullName")}
          />
          {form.formState.errors.fullName && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email address</Label>
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
          <Label htmlFor="phone">
            Phone number{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className="mt-1.5"
            aria-invalid={!!form.formState.errors.phone}
            {...form.register("phone")}
          />
          {form.formState.errors.phone && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.phone.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="dob">Date of birth</Label>
            <Input
              id="dob"
              type="date"
              autoComplete="bday"
              className="mt-1.5"
              max={new Date().toISOString().slice(0, 10)}
              aria-invalid={!!form.formState.errors.dob}
              {...form.register("dob")}
            />
            {form.formState.errors.dob && (
              <p className="mt-1 text-xs text-destructive">{form.formState.errors.dob.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              readOnly
              value={age ?? ""}
              placeholder="—"
              className="mt-1.5 bg-muted/40"
              aria-live="polite"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="country">Country / Region</Label>
          <Select
            value={form.watch("country")}
            onValueChange={(v) => form.setValue("country", v, { shouldValidate: true })}
          >
            <SelectTrigger id="country" className="mt-1.5" aria-invalid={!!form.formState.errors.country}>
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.country && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.country.message}</p>
          )}
        </div>

        <div>
          <Label>I'm joining as</Label>
          <RadioGroup
            value={form.watch("role")}
            onValueChange={(v) => form.setValue("role", v as RegisterInput["role"])}
            className="mt-2 grid grid-cols-2 gap-2"
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

        <div>
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="mt-1.5"
            aria-invalid={!!form.formState.errors.password}
            {...form.register("password")}
          />
          <PasswordStrengthMeter password={password || ""} />
          {form.formState.errors.password && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            placeholder="Re-enter password"
            className="mt-1.5"
            aria-invalid={!!form.formState.errors.confirmPassword}
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword && (
            <p className="mt-1 text-xs text-destructive">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="space-y-2 rounded-lg border border-border/60 bg-muted/20 p-3">
          <label htmlFor="acceptTerms" className="flex items-start gap-2 text-xs text-muted-foreground">
            <input
              id="acceptTerms"
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-sm border border-primary accent-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              checked={termsAccepted}
              onChange={(event) => setConsent("acceptTerms", event.target.checked)}
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" target="_blank" className="font-medium text-primary underline underline-offset-2">
                Terms &amp; Conditions
              </Link>
              .
            </span>
          </label>
          {form.formState.errors.acceptTerms && (
            <p className="text-xs text-destructive">{form.formState.errors.acceptTerms.message}</p>
          )}
          <label htmlFor="acceptPrivacy" className="flex items-start gap-2 text-xs text-muted-foreground">
            <input
              id="acceptPrivacy"
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-sm border border-primary accent-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              checked={privacyAccepted}
              onChange={(event) => setConsent("acceptPrivacy", event.target.checked)}
            />
            <span>
              I agree to the{" "}
              <Link to="/privacy" target="_blank" className="font-medium text-primary underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {form.formState.errors.acceptPrivacy && (
            <p className="text-xs text-destructive">{form.formState.errors.acceptPrivacy.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full shadow-elegant"
          size="lg"
          disabled={submitting || !termsAccepted || !privacyAccepted}
        >
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
