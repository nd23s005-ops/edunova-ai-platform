import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Compass, Map, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_dashboard/dashboard/student")({
  component: StudentDashboard,
});

const BOARD_LABEL: Record<string, string> = {
  state_board: "State Board",
  cbse: "CBSE",
  icse: "ICSE",
  cambridge: "Cambridge",
  ib: "IB",
  nios: "NIOS",
  other: "Other",
};

function StudentDashboard() {
  const { data: profile } = useQuery({
    queryKey: ["me", "student_profile"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("student_profiles")
        .select("current_class, board, language, school_name")
        .eq("user_id", u.user.id)
        .maybeSingle();
      return data;
    },
    staleTime: 60_000,
  });

  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title="Welcome back"
        description={
          profile
            ? `Class ${profile.current_class} · ${BOARD_LABEL[profile.board] ?? profile.board} · ${profile.language === "tamil" ? "Tamil" : "English"}`
            : "Your personalized learning workspace"
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <EmptyCard
          icon={<BookOpen className="h-5 w-5" />}
          title="My Courses"
          description="You haven't enrolled in any courses yet. Browse the catalog to get started."
          cta="Browse courses"
          to="/dashboard/student/browse"
        />
        <EmptyCard
          icon={<Map className="h-5 w-5" />}
          title="Learning Roadmap"
          description="Your roadmap will be generated as you enroll in courses and set goals."
          cta="Start a course"
          to="/dashboard/student/browse"
        />
        <EmptyCard
          icon={<Sparkles className="h-5 w-5" />}
          title="Nova AI Assistant"
          description="Ask academic questions, get concept explanations, and plan your studies."
          cta="Open AI Chat"
          to="/dashboard/student/ai-chat"
        />
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
        <Compass className="mx-auto h-6 w-6 text-muted-foreground" />
        <p className="mt-3 text-sm font-semibold">Nothing to track yet</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
          Enroll in your first course to see progress, weekly assignments, and quiz activity here.
        </p>
      </div>
    </RoleGate>
  );
}

function EmptyCard({
  icon,
  title,
  description,
  cta,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  to: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <Link
        to={to}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {cta} →
      </Link>
    </div>
  );
}
