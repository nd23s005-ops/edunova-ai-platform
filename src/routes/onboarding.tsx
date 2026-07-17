import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Building2,
  Briefcase,
  Shield,
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";
import type { AppRole } from "@/lib/auth/roles";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started — EduNova AI" },
      {
        name: "description",
        content:
          "Personalize your EduNova AI experience — choose your role, language, and learning preferences in a guided setup.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OnboardingPage,
});

// ---------------------------------------------------------------- data
type RoleCard = {
  key: AppRole;
  title: string;
  description: string;
  icon: typeof GraduationCap;
  accent: string; // gradient class
  restricted?: boolean;
};

const ROLES: RoleCard[] = [
  {
    key: "student",
    title: "Student",
    description: "Learn faster with a personal AI tutor tailored to your syllabus.",
    icon: GraduationCap,
    accent: "from-[oklch(0.82_0.16_55)] to-[oklch(0.7_0.19_40)]",
  },
  {
    key: "teacher",
    title: "Teacher",
    description: "Design lessons, auto-grade, and see mastery across every student.",
    icon: BookOpen,
    accent: "from-[oklch(0.75_0.14_180)] to-[oklch(0.6_0.16_200)]",
  },
  {
    key: "organization",
    title: "Organization",
    description: "Train teams at scale with cohort analytics and rollout tools.",
    icon: Building2,
    accent: "from-[oklch(0.7_0.15_280)] to-[oklch(0.55_0.18_290)]",
  },
  {
    key: "professional",
    title: "Working Professional",
    description: "Upskill, switch careers, or prep for certifications with focused AI mentors.",
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

const LANGUAGES = [
  { key: "en", label: "English", native: "English", flag: "🇬🇧" },
  { key: "ta", label: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
];

const PREFERENCES: Record<AppRole, { key: string; label: string; desc: string }[]> = {
  student: [
    { key: "school", label: "School Student", desc: "K-12 curriculum, exam prep, homework help." },
    { key: "college", label: "College Student", desc: "University subjects, projects, research support." },
    { key: "exam", label: "Competitive Exam Aspirant", desc: "JEE, NEET, UPSC, GRE — targeted practice." },
  ],
  teacher: [
    { key: "school", label: "School Teacher", desc: "Class planning, grading, K-12 pedagogy." },
    { key: "college", label: "College Faculty", desc: "Lecture design, research, higher-ed tools." },
    { key: "tutor", label: "Private Tutor", desc: "1:1 learners, custom plans, progress tracking." },
  ],
  professional: [
    { key: "upskill", label: "Upskilling", desc: "Stay sharp in your current role." },
    { key: "switch", label: "Career Switch", desc: "Move into a new domain confidently." },
    { key: "cert", label: "Certification Prep", desc: "AWS, PMP, CFA, and more." },
  ],
  organization: [
    { key: "employee", label: "Employee Training", desc: "Structured onboarding & growth tracks." },
    { key: "team", label: "Team Learning", desc: "Cohort programs and shared goals." },
    { key: "analytics", label: "Corporate Analytics", desc: "Skill dashboards and ROI reports." },
  ],
  admin: [],
};

// ---------------------------------------------------------------- storage
const KEY = "edunova.onboarding";
type Saved = { role?: AppRole; language?: string; preference?: string };
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

// ---------------------------------------------------------------- component
function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<AppRole | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [preference, setPreference] = useState<string | null>(null);

  useEffect(() => {
    const s = loadSaved();
    if (s.role) setRole(s.role);
    if (s.language) setLanguage(s.language);
    if (s.preference) setPreference(s.preference);
  }, []);

  useEffect(() => {
    saveSaved({ role: role ?? undefined, language: language ?? undefined, preference: preference ?? undefined });
  }, [role, language, preference]);

  const totalSteps = role === "admin" ? 3 : 4;
  const currentIndex = step;
  const progress = (currentIndex / totalSteps) * 100;

  const canNext =
    (step === 1 && role) ||
    (step === 2 && language) ||
    (step === 3 && (role === "admin" || preference));

  function next() {
    if (!canNext) return;
    if (step === 2 && role === "admin") {
      // skip preferences for admin
      goToAuth("login");
      return;
    }
    if (step === totalSteps - 0 && (role === "admin" ? step === 2 : step === 3)) {
      // last preference step
      goToAuth("login");
      return;
    }
    setStep((s) => s + 1);
  }

  function back() {
    if (step === 1) {
      navigate({ to: "/" });
      return;
    }
    setStep((s) => s - 1);
  }

  function goToAuth(mode: "login" | "register") {
    if (!role) return;
    if (role === "admin" && mode === "register") return; // no public register
    navigate({
      to: mode === "login" ? "/login" : "/register",
      search: { role } as never,
    });
  }

  return (
    <div className="dark relative min-h-dvh overflow-hidden bg-[#071018] text-[#F5F7FA]">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[oklch(0.7_0.19_40)]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-[oklch(0.6_0.16_200)]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col px-4 py-6 sm:px-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Logo />
          <Link
            to="/"
            className="text-xs font-medium text-white/60 transition hover:text-white"
          >
            Skip for now →
          </Link>
        </header>

        {/* Progress */}
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

        {/* Body */}
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
                  subtitle="Choose your role to personalize your learning experience, dashboard, AI mentor, and platform features."
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

            {step === 2 && (
              <motion.section
                key="step2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <StepHeading
                  eyebrow="Language"
                  title="Choose your preferred language"
                  subtitle="Nova will speak your language across lessons, assessments, and mentor conversations."
                />
                <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.key}
                      onClick={() => setLanguage(l.key)}
                      className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all ${
                        language === l.key
                          ? "border-[oklch(0.7_0.19_40)]/70 bg-white/[0.06] shadow-[0_0_0_1px_oklch(0.7_0.19_40)/40,0_20px_60px_-20px_oklch(0.7_0.19_40)/40]"
                          : "border-white/[0.08] bg-white/[0.03] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{l.flag}</span>
                        <div>
                          <p className="text-lg font-semibold">{l.label}</p>
                          <p className="text-sm text-white/50">{l.native}</p>
                        </div>
                        {language === l.key && (
                          <span className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-[oklch(0.7_0.19_40)] text-white">
                            <Check className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

            {step === 3 && role && role !== "admin" && (
              <motion.section
                key="step3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <StepHeading
                  eyebrow="Learning preferences"
                  title="What best describes you?"
                  subtitle="Nova adapts the depth, pace, and examples in every session based on this."
                />
                <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
                  {PREFERENCES[role].map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setPreference(p.key)}
                      className={`group rounded-2xl border p-5 text-left transition-all ${
                        preference === p.key
                          ? "border-[oklch(0.7_0.19_40)]/70 bg-white/[0.06]"
                          : "border-white/[0.08] bg-white/[0.03] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <p className="font-semibold">{p.label}</p>
                        {preference === p.key && (
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-[oklch(0.7_0.19_40)] text-white">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-white/50">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

            {step === 3 && role === "admin" && (
              <motion.section
                key="step3-admin"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <AdminAccessCard onContinue={() => goToAuth("login")} />
              </motion.section>
            )}

            {step === 4 && role && (
              <motion.section
                key="step4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <FinalCard
                  role={role}
                  onLogin={() => goToAuth("login")}
                  onRegister={() => goToAuth("register")}
                />
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        {/* Footer nav */}
        {step < 4 && !(step === 3 && role === "admin") && (
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
              {step === 3 ? "Continue to sign in" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </footer>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- subcomponents
function StepHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
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
          ? "border-[oklch(0.7_0.19_40)]/70 bg-white/[0.07] shadow-[0_0_0_1px_oklch(0.7_0.19_40)/40,0_30px_80px_-30px_oklch(0.7_0.19_40)/50]"
          : "border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
      }`}
    >
      {/* glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 blur-xl transition-opacity ${role.accent} ${selected ? "opacity-30" : "group-hover:opacity-20"}`}
      />

      <div className="relative flex items-center gap-3">
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg ${role.accent}`}
        >
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

function AdminAccessCard({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-8 text-center backdrop-blur-xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[oklch(0.45_0.05_240)] to-[oklch(0.3_0.04_240)] text-white">
          <Shield className="h-6 w-6" />
        </div>
        <h2 className="mt-6 text-2xl font-bold">Administrator access</h2>
        <p className="mt-3 text-sm text-white/60">
          Administrator access is restricted to authorized personnel only. Public registration is disabled.
          Future authentication may include admin invitation, secure credentials, and multi-factor authentication.
        </p>
        <Button
          onClick={onContinue}
          size="lg"
          className="mt-6 gap-2 bg-gradient-to-r from-[oklch(0.82_0.16_55)] to-[oklch(0.7_0.19_40)] px-6 text-white hover:opacity-90"
        >
          Continue to admin sign in
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function FinalCard({
  role,
  onLogin,
  onRegister,
}: {
  role: AppRole;
  onLogin: () => void;
  onRegister: () => void;
}) {
  const cfg = ROLES.find((r) => r.key === role)!;
  const Icon = cfg.icon;
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
          Sign in to continue, or create your {cfg.title.toLowerCase()} account to get started with Nova.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button
            onClick={onLogin}
            size="lg"
            className="bg-gradient-to-r from-[oklch(0.82_0.16_55)] to-[oklch(0.7_0.19_40)] text-white hover:opacity-90"
          >
            Login
          </Button>
          <Button
            onClick={onRegister}
            variant="outline"
            size="lg"
            className="border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
