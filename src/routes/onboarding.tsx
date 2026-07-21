import { useState, useEffect } from "react";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpenCheck,
  Briefcase,
  Shield,
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";
import { supabase } from "@/integrations/supabase/client";
import { homeForRole, type AppRole } from "@/lib/auth/roles";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started — EduNova AI" },
      {
        name: "description",
        content:
          "Choose your role and jump straight into your personalized EduNova AI workspace.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { mode?: "login" | "register"; redirect?: string } => {
    const out: { mode?: "login" | "register"; redirect?: string } = {};
    if (search.mode === "login" || search.mode === "register") out.mode = search.mode;
    if (typeof search.redirect === "string") out.redirect = search.redirect;
    return out;
  },
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      const { data: r } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .maybeSingle();
      if (r?.role) {
        throw redirect({ to: homeForRole(r.role as AppRole) });
      }
    }
  },
  component: OnboardingPage,
});

type RoleCard = {
  key: AppRole;
  title: string;
  description: string;
  icon: typeof GraduationCap;
  accent: string;
  restricted?: boolean;
};

const ROLES: RoleCard[] = [
  {
    key: "student",
    title: "School Student",
    description: "K-12 syllabus tutor, quizzes and daily assessments for CBSE, ICSE and state boards.",
    icon: GraduationCap,
    accent: "from-[oklch(0.82_0.16_55)] to-[oklch(0.7_0.19_40)]",
  },
  {
    key: "college_student",
    title: "College Student",
    description: "University courses, coding practice, projects and placement preparation.",
    icon: BookOpenCheck,
    accent: "from-[oklch(0.78_0.15_200)] to-[oklch(0.6_0.17_220)]",
  },
  {
    key: "professional",
    title: "Working Professional",
    description: "Upskill or switch careers with focused AI mentors.",
    icon: Briefcase,
    accent: "from-[oklch(0.78_0.15_140)] to-[oklch(0.6_0.17_150)]",
  },
  {
    key: "admin",
    title: "Administrator",
    description: "Restricted access for authorized platform operators only.",
    icon: Shield,
    accent: "from-[oklch(0.45_0.05_240)] to-[oklch(0.3_0.04_240)]",
    restricted: true,
  },
];

const KEY = "edunova.onboarding";
type Saved = { role?: AppRole };
function loadSaved(): Saved {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}") as Saved;
  } catch {
    return {};
  }
}
function saveSaved(v: Saved) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(v));
}

function OnboardingPage() {
  const navigate = useNavigate();
  const { mode: entryMode } = Route.useSearch();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<AppRole | null>(null);

  useEffect(() => {
    const s = loadSaved();
    if (s.role) setRole(s.role);
  }, []);

  useEffect(() => {
    saveSaved({ role: role ?? undefined });
  }, [role]);

  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;
  const canNext = step === 1 && !!role;

  function next() {
    if (!canNext) return;
    setStep(2);
  }

  function back() {
    if (step === 1) {
      navigate({ to: "/" });
      return;
    }
    setStep(1);
  }

  function goToAuth(mode: "login" | "register") {
    if (!role) return;
    if (role === "admin" && mode === "register") return;
    navigate({
      to: mode === "login" ? "/login" : "/register",
      search: { role } as never,
    });
  }

  return (
    <div className="dark relative min-h-dvh overflow-hidden bg-[#071018] text-[#F5F7FA]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[oklch(0.7_0.19_40)]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-[oklch(0.6_0.16_200)]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col px-4 py-6 sm:px-8">
        <header className="flex items-center justify-between">
          <Logo />
          <Link to="/" className="text-xs font-medium text-white/60 transition hover:text-white">
            Skip for now →
          </Link>
        </header>

        <div className="mt-8">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-[0.18em] text-white/50">
              Step {step} of {totalSteps}
            </span>
            <span className="text-white/40">{Math.round(progress)}% complete</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[oklch(0.82_0.16_55)] to-[oklch(0.7_0.19_40)]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        <main className="flex flex-1 flex-col justify-center py-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.section
                key="step1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <StepHeading
                  eyebrow="Personalize"
                  title="Who are you on EduNova AI?"
                  subtitle="Pick your role — Nova tailors your dashboard, mentor, and courses to you."
                />
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {ROLES.map((r) => (
                    <RoleCardView
                      key={r.key}
                      role={r}
                      selected={role === r.key}
                      onSelect={() => setRole(r.key)}
                    />
                  ))}
                </div>
              </motion.section>
            )}

            {step === 2 && role && (
              <motion.section
                key="step2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <FinalCard
                  role={role}
                  primary={entryMode ?? "login"}
                  onLogin={() => goToAuth("login")}
                  onRegister={() => goToAuth("register")}
                />
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        {step < 2 && (
          <footer className="flex items-center justify-between gap-3 pb-4">
            <Button variant="ghost" onClick={back} className="gap-2 text-white/70 hover:bg-white/[0.06] hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              onClick={next}
              disabled={!canNext}
              size="lg"
              className="gap-2 bg-gradient-to-r from-[oklch(0.82_0.16_55)] to-[oklch(0.7_0.19_40)] px-6 text-white hover:opacity-90 disabled:opacity-40"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </footer>
        )}
      </div>
    </div>
  );
}

function StepHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[oklch(0.82_0.16_55)]">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-white/60 sm:text-base">{subtitle}</p>
    </div>
  );
}

function RoleCardView({
  role,
  selected,
  onSelect,
}: {
  role: RoleCard;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = role.icon;
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 text-left backdrop-blur-xl transition-colors ${
        selected
          ? "border-[oklch(0.7_0.19_40)]/70 bg-white/[0.07]"
          : "border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 blur-xl transition-opacity ${role.accent} ${selected ? "opacity-30" : "group-hover:opacity-20"}`}
      />
      <div className="relative flex items-center gap-3">
        <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg ${role.accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        {role.restricted && (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">
            <Lock className="h-3 w-3" /> Restricted
          </span>
        )}
        {selected && (
          <span className="ml-auto grid h-7 w-7 place-items-center rounded-full bg-[oklch(0.7_0.19_40)] text-white">
            <Check className="h-4 w-4" />
          </span>
        )}
      </div>
      <h3 className="relative mt-5 text-lg font-semibold">{role.title}</h3>
      <p className="relative mt-1.5 text-sm leading-relaxed text-white/55">{role.description}</p>
    </motion.button>
  );
}

function FinalCard({
  role,
  primary = "login",
  onLogin,
  onRegister,
}: {
  role: AppRole;
  primary?: "login" | "register";
  onLogin: () => void;
  onRegister: () => void;
}) {
  const cfg = ROLES.find((r) => r.key === role)!;
  const Icon = cfg.icon;
  const primaryBtn = (
    <Button
      key="login"
      onClick={onLogin}
      size="lg"
      className="bg-gradient-to-r from-[oklch(0.82_0.16_55)] to-[oklch(0.7_0.19_40)] text-white hover:opacity-90"
    >
      Login
    </Button>
  );
  const secondaryBtn = role === "admin" ? null : (
    <Button
      key="register"
      onClick={onRegister}
      variant="outline"
      size="lg"
      className="border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
    >
      Create Account
    </Button>
  );
  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-8 text-center backdrop-blur-xl">
        <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${cfg.accent}`}>
          <Icon className="h-6 w-6" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[oklch(0.82_0.16_55)]">
          {cfg.title}
        </p>
        <h2 className="mt-2 text-2xl font-bold">Ready when you are</h2>
        <p className="mt-2 text-sm text-white/60">
          {primary === "register" && role !== "admin"
            ? `Create your ${cfg.title.toLowerCase()} account, or sign in if you already have one.`
            : `Sign in to your ${cfg.title.toLowerCase()} workspace.`}
        </p>
        <div className={`mt-6 grid gap-3 ${secondaryBtn ? "sm:grid-cols-2" : ""}`}>
          {primary === "register" && secondaryBtn ? [secondaryBtn, primaryBtn] : [primaryBtn, secondaryBtn].filter(Boolean)}
        </div>
      </div>
    </div>
  );
}
