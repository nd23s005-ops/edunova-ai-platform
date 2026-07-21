import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  LifeBuoy,
  Search,
  KeyRound,
  UserPlus,
  LayoutDashboard,
  BookOpen,
  CreditCard,
  Wrench,
  Building2,
  Mail,
  CheckCircle2,
  Send,
  MessageSquare,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/help-desk")({
  head: () => ({
    meta: [
      { title: "Help Desk — EduNova AI Support" },
      {
        name: "description",
        content:
          "Get help with your EduNova AI account, login, dashboard, and course enrollment. Search FAQs, browse categories, or contact support.",
      },
    ],
  }),
  component: HelpDeskPage,
});

type Category = {
  id: string;
  label: string;
  icon: typeof KeyRound;
  description: string;
  articles: Array<{ q: string; a: string }>;
};

const CATEGORIES: Category[] = [
  {
    id: "login",
    label: "Login & Password",
    icon: KeyRound,
    description: "Sign-in issues, forgot password, 2FA",
    articles: [
      {
        q: "I forgot my password",
        a: "Go to the Login page and click 'Forgot password?'. Enter your email and we'll send a reset link. Check spam if it doesn't arrive within 5 minutes.",
      },
      {
        q: "I'm stuck in a login loop",
        a: "Sign out, clear cookies for edunova.ai in your browser, then sign in again. If it persists, open a ticket below.",
      },
      {
        q: "Google sign-in isn't working",
        a: "Make sure pop-ups are allowed for edunova.ai. If Google shows an error, try incognito mode or another browser.",
      },
    ],
  },
  {
    id: "account",
    label: "Account & Registration",
    icon: UserPlus,
    description: "Creating an account, changing role, profile setup",
    articles: [
      {
        q: "How do I create an account?",
        a: "Click 'Create Account', choose your role (Student, Working Professional, or Organization), fill in the form, and you're in — no email verification required.",
      },
      {
        q: "I picked the wrong role",
        a: "Roles can't be changed from the app. Open a support ticket and we'll update it for you within 1 business day.",
      },
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard Access",
    icon: LayoutDashboard,
    description: "Finding your dashboard, missing pages, redirects",
    articles: [
      {
        q: "Where's my dashboard?",
        a: "After logging in, click the 'Dashboard' button in the top right. Your dashboard is based on the role you chose at signup.",
      },
      {
        q: "Onboarding keeps appearing",
        a: "Make sure you complete every step and click 'Finish'. If it still loops, sign out and back in. Still stuck? Open a ticket.",
      },
    ],
  },
  {
    id: "courses",
    label: "Courses & Enrollment",
    icon: BookOpen,
    description: "Browsing, enrolling, progress, quizzes",
    articles: [
      {
        q: "How do I enroll in a course?",
        a: "Open Explore or Browse Courses, tap a course card, then click 'Enroll'. It will appear under My Courses immediately.",
      },
      {
        q: "My progress isn't saving",
        a: "Progress saves automatically as you complete lessons. If numbers look wrong, refresh the page — enrollments recompute on load.",
      },
    ],
  },


  {
    id: "technical",
    label: "Technical Issues",
    icon: Wrench,
    description: "Errors, slow loading, mobile issues",
    articles: [
      {
        q: "The site is slow",
        a: "Try a hard refresh (Ctrl+Shift+R / Cmd+Shift+R). Also check your network. If it's still slow, open a ticket with your browser and device.",
      },
      {
        q: "I see an error page",
        a: "Copy the error message and open a ticket below. Include the page URL and what you were doing when it happened.",
      },
    ],
  },
];

function HelpDeskPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && !activeCategory) return null;
    const scope = activeCategory ? CATEGORIES.filter((c) => c.id === activeCategory) : CATEGORIES;
    return scope
      .flatMap((c) =>
        c.articles.map((a) => ({ ...a, category: c.label, categoryId: c.id })),
      )
      .filter(
        (a) =>
          !q ||
          a.q.toLowerCase().includes(q) ||
          a.a.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q),
      );
  }, [query, activeCategory]);

  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-background">
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <LifeBuoy className="h-7 w-7" />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              How can we help you?
            </h1>
            <p className="mt-3 text-muted-foreground">
              Search our support articles, browse categories, or open a ticket with our team.
            </p>
            <div className="mt-8 flex items-center gap-2 rounded-2xl border border-border/60 bg-card p-2 shadow-sm">
              <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search — e.g. 'reset password', 'enrollment'…"
                className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search help articles"
              />
              {(query || activeCategory) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory(null);
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="text-lg font-semibold">Browse by category</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const active = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(active ? null : c.id)}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border p-5 text-left transition",
                    active
                      ? "border-primary bg-primary/5 shadow-elegant"
                      : "border-border/60 bg-card hover:border-primary/40 hover:shadow-card",
                  )}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{c.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {results && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold">
                {results.length} result{results.length === 1 ? "" : "s"}
                {activeCategory
                  ? ` in ${CATEGORIES.find((c) => c.id === activeCategory)?.label}`
                  : ""}
              </h2>
              {results.length === 0 ? (
                <p className="mt-4 rounded-xl border border-dashed border-border/60 bg-card p-6 text-sm text-muted-foreground">
                  No matching articles. Try a different search, or contact support below.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {results.map((a, i) => (
                    <details
                      key={i}
                      className="group rounded-xl border border-border/60 bg-card p-4 shadow-sm"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium">
                        <span>{a.q}</span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {a.category}
                        </span>
                      </summary>
                      <p className="mt-3 text-sm text-muted-foreground">{a.a}</p>
                    </details>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="grid gap-8 rounded-2xl border border-border/60 bg-card p-6 shadow-card sm:p-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-2xl font-bold">Still need help?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Open a support ticket and our team will get back to you — usually within 24 hours.
                You can also chat with our AI Help Desk using the button in the corner for instant
                answers.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:support@edunova.ai" className="hover:text-primary">
                    support@edunova.ai
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  Billing questions? Include your account email.
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/" className="underline hover:text-primary">
              Back to home
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

const CATEGORY_OPTIONS = [
  { value: "login", label: "Login & Password" },
  { value: "account", label: "Account & Registration" },
  { value: "dashboard", label: "Dashboard Access" },
  { value: "courses", label: "Courses & Enrollment" },
  
  { value: "technical", label: "Technical Issue" },
  { value: "other", label: "Something else" },
] as const;

type TicketCategory = (typeof CATEGORY_OPTIONS)[number]["value"];

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<TicketCategory>("other");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const submit = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const payload = {
        user_id: u.user?.id ?? null,
        name: name.trim(),
        email: email.trim(),
        role: null,
        category,
        subject: subject.trim(),
        description: description.trim(),
      };
      const { data, error } = await supabase
        .from("support_tickets")
        .insert(payload)
        .select("id")
        .single();
      if (error) throw error;
      return data.id as string;
    },
    onSuccess: (id) => {
      setSubmittedId(id);
      toast.success("Ticket submitted! We'll email you shortly.");
    },
    onError: (e: unknown) => {
      const msg = e instanceof Error ? e.message : "Could not submit ticket";
      toast.error(msg);
    },
  });

  if (submittedId) {
    return (
      <div className="rounded-xl border border-primary/40 bg-primary/5 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
        <h3 className="mt-3 text-lg font-semibold">Ticket received</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Reference: <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{submittedId.slice(0, 8)}</code>
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          We've sent a confirmation to <strong>{email}</strong>. Our team responds within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            setSubmittedId(null);
            setName("");
            setEmail("");
            setSubject("");
            setDescription("");
          }}
        >
          Submit another ticket
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit.mutate();
      }}
      className="grid gap-4"
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <Label htmlFor="hd-name">Your name</Label>
          <Input
            id="hd-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={120}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <Label htmlFor="hd-email">Email</Label>
          <Input
            id="hd-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="hd-cat">Category</Label>
        <select
          id="hd-cat"
          value={category}
          onChange={(e) => setCategory(e.target.value as TicketCategory)}
          className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="hd-subject">Subject</Label>
        <Input
          id="hd-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          maxLength={200}
          placeholder="Brief summary"
        />
      </div>
      <div>
        <Label htmlFor="hd-desc">How can we help?</Label>
        <Textarea
          id="hd-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          maxLength={4000}
          rows={5}
          placeholder="Include what you tried, the page URL, and any error messages."
        />
      </div>
      <Button type="submit" disabled={submit.isPending} className="justify-self-end gap-2">
        <Send className="h-4 w-4" />
        {submit.isPending ? "Sending…" : "Contact support"}
      </Button>
    </form>
  );
}
