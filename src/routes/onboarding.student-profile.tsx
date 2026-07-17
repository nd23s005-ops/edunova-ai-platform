import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { GraduationCap, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding/student-profile")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/login" });
    const { data: existing } = await supabase
      .from("student_profiles")
      .select("id")
      .eq("user_id", data.user.id)
      .maybeSingle();
    if (existing) throw redirect({ to: "/dashboard/student" });
    return {};
  },
  component: StudentProfileOnboarding,
});

const BOARDS = [
  { value: "state_board", label: "State Board" },
  { value: "cbse", label: "CBSE" },
  { value: "icse", label: "ICSE" },
  { value: "cambridge", label: "Cambridge" },
  { value: "ib", label: "IB" },
  { value: "nios", label: "NIOS" },
  { value: "other", label: "Other" },
] as const;

const LANGS = [
  { value: "english", label: "English" },
  { value: "tamil", label: "Tamil" },
] as const;

const CLASSES = Array.from({ length: 12 }, (_, i) => i + 1);

function StudentProfileOnboarding() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [currentClass, setCurrentClass] = useState<number | null>(null);
  const [board, setBoard] = useState<string>("");
  const [language, setLanguage] = useState<string>("english");
  const [school, setSchool] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not signed in");
      if (!currentClass || !board) throw new Error("Please complete required fields");

      const { error } = await supabase.from("student_profiles").insert({
        user_id: userData.user.id,
        current_class: currentClass,
        board: board as (typeof BOARDS)[number]["value"],
        language: language as (typeof LANGS)[number]["value"],
        school_name: school.trim() || null,
      });
      if (error) throw error;
    },
    onSuccess: async () => {
      await qc.invalidateQueries();
      toast.success("Profile saved. Welcome to EduNova AI!");
      navigate({ to: "/dashboard/student" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="min-h-dvh bg-background px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Set up your learning profile</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We'll personalize courses, roadmaps, and Nova AI to your board and class.
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
          <div className="space-y-6">
            <div>
              <Label className="mb-2 block">Current class *</Label>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {CLASSES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCurrentClass(c)}
                    className={
                      "rounded-lg border px-3 py-2 text-sm font-medium transition " +
                      (currentClass === c
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/60 bg-background hover:border-primary/50")
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Education board *</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {BOARDS.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBoard(b.value)}
                    className={
                      "rounded-lg border px-3 py-2 text-sm font-medium transition " +
                      (board === b.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/60 bg-background hover:border-primary/50")
                    }
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Preferred language *</Label>
              <div className="grid grid-cols-2 gap-2">
                {LANGS.map((l) => (
                  <button
                    key={l.value}
                    type="button"
                    onClick={() => setLanguage(l.value)}
                    className={
                      "rounded-lg border px-3 py-2 text-sm font-medium transition " +
                      (language === l.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/60 bg-background hover:border-primary/50")
                    }
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="school" className="mb-2 block">
                School name (optional)
              </Label>
              <Input
                id="school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="e.g. Kendriya Vidyalaya, DAV Public School"
              />
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled={!currentClass || !board || mutation.isPending}
              onClick={() => mutation.mutate()}
            >
              {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue to dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
