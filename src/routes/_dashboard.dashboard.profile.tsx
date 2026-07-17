import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { supabase } from "@/integrations/supabase/client";
import { profileSchema, type ProfileInput, passwordSchema } from "@/lib/auth/schemas";
import { ROLE_LABELS, type AppRole } from "@/lib/auth/roles";
import { z } from "zod";

export const Route = createFileRoute("/_dashboard/dashboard/profile")({
  component: ProfilePage,
});

const passwordChangeSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;

function ProfilePage() {
  const queryClient = useQueryClient();
  const [notifPrefs, setNotifPrefs] = useState({ email: true, product: true, marketing: false });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingPrefs, setSavingPrefs] = useState(false);

  const { data: me } = useQuery({
    queryKey: ["me", "profile-full"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return null;
      const [{ data: p }, { data: r }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", userData.user.id).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", userData.user.id).maybeSingle(),
      ]);
      return {
        userId: userData.user.id,
        email: userData.user.email ?? "",
        profile: p,
        role: (r?.role as AppRole | undefined) ?? null,
      };
    },
  });

  const profileForm = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    values: {
      fullName: me?.profile?.full_name ?? "",
      phone: me?.profile?.phone ?? "",
      bio: me?.profile?.bio ?? "",
    },
  });

  useEffect(() => {
    if (me?.profile?.notif_prefs) {
      const p = me.profile.notif_prefs as { email?: boolean; product?: boolean; marketing?: boolean };
      setNotifPrefs({
        email: p.email ?? true,
        product: p.product ?? true,
        marketing: p.marketing ?? false,
      });
    }
  }, [me?.profile?.notif_prefs]);

  const passwordForm = useForm<PasswordChangeInput>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSaveProfile = async (values: ProfileInput) => {
    if (!me) return;
    setSavingProfile(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: values.fullName,
        phone: values.phone || null,
        bio: values.bio || null,
      })
      .eq("id", me.userId);
    setSavingProfile(false);
    if (error) return toast.error(error.message);
    toast.success("Profile updated");
    queryClient.invalidateQueries({ queryKey: ["me"] });
  };

  const onChangePassword = async (values: PasswordChangeInput) => {
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: values.newPassword });
    setSavingPassword(false);
    if (error) return toast.error(error.message);
    toast.success("Password changed");
    passwordForm.reset();
  };

  const onSavePrefs = async () => {
    if (!me) return;
    setSavingPrefs(true);
    const { error } = await supabase
      .from("profiles")
      .update({ notif_prefs: notifPrefs })
      .eq("id", me.userId);
    setSavingPrefs(false);
    if (error) return toast.error(error.message);
    toast.success("Preferences saved");
  };

  const initials = (me?.profile?.full_name || me?.email || "N L")
    .split(/\s+/)
    .map((s: string) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <DashboardHeader
        title="Profile & settings"
        description="Manage your identity, security, and notification preferences."
      />

      <div className="space-y-8">
        {/* Identity */}
        <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
          <div className="mb-6 flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold">
              {initials || "NL"}
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold">{me?.profile?.full_name || "—"}</p>
              <p className="truncate text-sm text-muted-foreground">{me?.email}</p>
              {me?.role && (
                <span className="mt-1 inline-block rounded-full border border-border/60 bg-secondary px-2.5 py-0.5 text-xs font-medium">
                  {ROLE_LABELS[me.role]}
                </span>
              )}
            </div>
          </div>

          <form className="grid gap-4 sm:grid-cols-2" onSubmit={profileForm.handleSubmit(onSaveProfile)}>
            <div className="sm:col-span-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" className="mt-1.5" {...profileForm.register("fullName")} />
              {profileForm.formState.errors.fullName && (
                <p className="mt-1 text-xs text-destructive">{profileForm.formState.errors.fullName.message}</p>
              )}
            </div>
            <div>
              <Label>Email</Label>
              <Input value={me?.email ?? ""} disabled className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="+1 555 000 0000" className="mt-1.5" {...profileForm.register("phone")} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={3} className="mt-1.5" placeholder="Tell us a bit about yourself" {...profileForm.register("bio")} />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={savingProfile}>
                {savingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save profile
              </Button>
            </div>
          </form>
        </section>

        {/* Security */}
        <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold">Security</h2>
          <p className="mt-1 text-sm text-muted-foreground">Change your password.</p>
          <Separator className="my-4" />
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={passwordForm.handleSubmit(onChangePassword)}>
            <div>
              <Label htmlFor="newPassword">New password</Label>
              <PasswordInput id="newPassword" className="mt-1.5" autoComplete="new-password" {...passwordForm.register("newPassword")} />
              <PasswordStrengthMeter password={passwordForm.watch("newPassword") || ""} />
              {passwordForm.formState.errors.newPassword && (
                <p className="mt-1 text-xs text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <Input id="confirmPassword" type="password" className="mt-1.5" {...passwordForm.register("confirmPassword")} />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="mt-1 text-xs text-destructive">{passwordForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={savingPassword}>
                {savingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update password
              </Button>
            </div>
          </form>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold">Notification preferences</h2>
          <p className="mt-1 text-sm text-muted-foreground">Choose what EduNova AI can email you about.</p>
          <Separator className="my-4" />
          <ul className="space-y-4">
            {(
              [
                ["email", "Account & security emails", "Sign-in alerts, password changes, receipts."],
                ["product", "Product updates", "New AI features, model upgrades, and platform news."],
                ["marketing", "Learning tips & offers", "Occasional guides and promotions."],
              ] as const
            ).map(([key, label, desc]) => (
              <li key={key} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch
                  checked={notifPrefs[key]}
                  onCheckedChange={(v) => setNotifPrefs((s) => ({ ...s, [key]: v }))}
                />
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button onClick={onSavePrefs} disabled={savingPrefs}>
              {savingPrefs && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save preferences
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
