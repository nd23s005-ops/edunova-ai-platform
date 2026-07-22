// Working Professional Dashboard — rebuilt from scratch as an executive
// "Career Growth Console". No components are imported from the school student
// dashboard or its shared widget kit. Every visual primitive lives in
// @/components/professional/ExecutiveWorkspace.
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Target, TrendingUp, Award, Flame } from "lucide-react";

import { RoleGate } from "@/components/auth/RoleGate";
import { supabase } from "@/integrations/supabase/client";
import { PRO_CATALOG } from "@/lib/courses/catalog";
import {
  ExecutiveHero,
  ExecutiveKpiBoard,
  CareerStrategistPanel,
  CareerRoadmapStepper,
  SkillMarketPanel,
  CertificationRoiCard,
  SprintRail,
  CareerMentorPanel,
  ExecutiveActionsRail,
  PromotionGauge,
} from "@/components/professional/ExecutiveWorkspace";

export const Route = createFileRoute("/_dashboard/dashboard/professional")({
  head: () => ({
    meta: [
      { title: "Career Growth Console — EduNova AI" },
      { name: "description", content: "Executive AI career workspace for working professionals: skill market value, certification ROI, and promotion readiness." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfessionalDashboard,
});

type EnrolledTile = {
  id: string;
  progress: number;
  course_id: string;
  updated_at: string;
  courses: { id: string; title: string; subject: string; difficulty?: string } | null;
};

function ProfessionalDashboard() {
  return (
    <RoleGate allow={["professional"]}>
      <ProfessionalDashboardInner />
    </RoleGate>
  );
}

function ProfessionalDashboardInner() {
  const { data: profile } = useQuery({
    queryKey: ["me", "prof-profile-console"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", u.user.id)
        .maybeSingle();
      return data as { full_name?: string | null } | null;
    },
    staleTime: 60_000,
  });

  const { data: enrollments } = useQuery({
    queryKey: ["me", "prof-enrollments-console"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [];
      const { data } = await supabase
        .from("course_enrollments")
        .select(
          "id, progress, course_id, updated_at, courses:course_id (id, title, subject, difficulty)",
        )
        .eq("user_id", u.user.id)
        .order("updated_at", { ascending: false })
        .limit(12);
      return (data ?? []) as unknown as EnrolledTile[];
    },
    staleTime: 30_000,
  });

  const enrolled = enrollments ?? [];
  const inProgress = enrolled.filter((e) => (e.progress ?? 0) < 100);
  const completedCount = enrolled.filter((e) => (e.progress ?? 0) >= 100).length;
  const avgProgress =
    inProgress.length > 0
      ? Math.round(inProgress.reduce((a, e) => a + (e.progress ?? 0), 0) / inProgress.length)
      : 0;

  const promotionReadiness = Math.min(100, 42 + completedCount * 6 + avgProgress / 4);
  const activePhase = Math.min(4, Math.floor((promotionReadiness / 100) * 5));

  const firstName = (profile?.full_name ?? "").split(" ")[0] || "there";
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  // Sprint catalogue slices
  const catalogPool = useMemo(
    () =>
      PRO_CATALOG.categories.flatMap((c) =>
        c.courses.map((co) => ({
          title: co.title,
          slug: co.slug,
          cat: c.label,
          weeks: Math.max(2, Math.round((co.estimated_hours ?? 30) / 5)),
          level: co.difficulty ?? "intermediate",
        })),
      ),
    [],
  );
  const focusSprints = catalogPool.slice(0, 6);
  const executiveSprints = catalogPool.slice(6, 12);

  const kpis = [
    {
      label: "Weekly focus",
      value: "45m",
      hint: "target · deep work",
      icon: <Target className="h-3 w-3" />,
    },
    {
      label: "Skill velocity",
      value: `${Math.min(100, avgProgress + 8)}%`,
      delta: 6,
      hint: `${inProgress.length} tracks in-flight`,
      icon: <TrendingUp className="h-3 w-3" />,
    },
    {
      label: "Certifications",
      value: String(completedCount + 2),
      delta: 12,
      hint: "earned · rolling 12 mo.",
      icon: <Award className="h-3 w-3" />,
    },
    {
      label: "Consistency",
      value: "12d",
      hint: "current streak",
      icon: <Flame className="h-3 w-3" />,
    },
  ];

  const skills = [
    { name: "System Design", demand: 92, you: 71, salary: "$180k–$240k" },
    { name: "Generative AI", demand: 96, you: 58, salary: "$190k–$260k" },
    { name: "Cloud Architecture", demand: 88, you: 74, salary: "$170k–$225k" },
    { name: "Product Leadership", demand: 82, you: 61, salary: "$200k–$275k" },
  ];

  const certs = [
    { name: "AWS Solutions Architect — Professional", weeks: 6, salaryLift: "+14% salary", readiness: 62 },
    { name: "Google Cloud ML Engineer", weeks: 8, salaryLift: "+18% salary", readiness: 41 },
    { name: "PMP · Refresh", weeks: 4, salaryLift: "+7% salary", readiness: 78 },
  ];

  return (
    <div className="space-y-8">
      <ExecutiveHero
        name={`Good ${greeting()}, ${firstName}`}
        role="Working Professional"
        company="EduNova AI · Career Growth Console"
        objective="Move into a senior / lead role within the next 12 months"
        marketValue="$182k"
        marketDelta={9}
        today={today}
      />

      <ExecutiveKpiBoard items={kpis} />

      <CareerStrategistPanel
        headline="This week: ship one system-design case study and one leadership vignette."
        rationale="Your target role weighs architecture depth and executive communication heavily. Pairing a 45-minute case study with a leadership scenario keeps you promotion-ready without disrupting delivery."
        moves={[
          {
            title: "System Design case: URL shortener",
            detail: "45-minute drill, then compare against reference architecture.",
            to: "/dashboard/mock-tests",
            impact: "High impact",
          },
          {
            title: "Leadership vignette review",
            detail: "One STAR-formatted story on cross-team conflict resolution.",
            to: "/dashboard/career/interview",
            impact: "Promo signal",
          },
          {
            title: "Certification sprint: GenAI Practitioner",
            detail: "3 hours of guided lab time this week to stay on track.",
            to: "/dashboard/career/certifications",
            impact: "ROI +18%",
          },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <CareerRoadmapStepper activeIndex={activePhase} />
          <SkillMarketPanel skills={skills} />
          <SprintRail
            title="This month's focus"
            subtitle="Sprints matched to your objective"
            sprints={focusSprints}
          />
          <SprintRail
            title="Executive electives"
            subtitle="Leadership · strategy · influence"
            sprints={executiveSprints}
          />
        </div>

        <aside className="space-y-6">
          <PromotionGauge value={Math.round(promotionReadiness)} label="Ready for the next level" />
          <CertificationRoiCard items={certs} />
          <CareerMentorPanel />
          <ExecutiveActionsRail />
        </aside>
      </div>
    </div>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}
