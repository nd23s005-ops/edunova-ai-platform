import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Aggregated career-readiness snapshot for the dashboard. */
export const getCareerSnapshot = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const [
      profileRes,
      resumesRes,
      portfolioRes,
      certsRes,
      goalsRes,
      appliedJobsRes,
      appliedInternRes,
      interviewRes,
      codingRes,
      skillGapRes,
    ] = await Promise.all([
      supabase.from("career_profiles").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("resumes").select("id, title, ats_score, sections, updated_at").eq("user_id", userId).order("updated_at", { ascending: false }),
      supabase.from("portfolios").select("id, slug, is_public, sections").eq("user_id", userId).maybeSingle(),
      supabase.from("career_certifications").select("id, title, issued_at, verified").eq("user_id", userId).order("issued_at", { ascending: false }).limit(6),
      supabase.from("career_goals").select("*").eq("user_id", userId).is("completed_at", null).order("due_at", { ascending: true }).limit(6),
      supabase.from("job_applications").select("status").eq("user_id", userId),
      supabase.from("internship_applications").select("status").eq("user_id", userId),
      supabase.from("interview_sessions").select("id, kind, overall_score, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(5),
      supabase.from("coding_submissions").select("id, verdict, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(50),
      supabase.from("skill_gap_reports").select("readiness_pct, updated_at").eq("user_id", userId).order("updated_at", { ascending: false }).limit(1).maybeSingle(),
    ]);

    const resumes = resumesRes.data ?? [];
    const primary = resumes[0];
    const resumeCompletion = primary ? scoreSections(primary.sections as Record<string, unknown>) : 0;
    const atsScore = primary?.ats_score ? Number(primary.ats_score) : 0;
    const portfolioCompletion = portfolioRes.data ? scoreSections(portfolioRes.data.sections as Record<string, unknown>) : 0;
    const skillScore = skillGapRes.data?.readiness_pct ? Number(skillGapRes.data.readiness_pct) : 0;
    const interviewScore = avg((interviewRes.data ?? []).map((r) => Number(r.overall_score ?? 0)).filter((n) => n > 0));
    const codingAccuracy = codingRes.data && codingRes.data.length
      ? Math.round((codingRes.data.filter((r) => r.verdict === "passed").length / codingRes.data.length) * 100)
      : 0;

    const placementReadiness = Math.round(
      (resumeCompletion * 0.15 + atsScore * 0.15 + portfolioCompletion * 0.15 + skillScore * 0.2 + interviewScore * 0.2 + codingAccuracy * 0.15),
    );
    const industryReadiness = Math.round((skillScore * 0.5 + codingAccuracy * 0.3 + atsScore * 0.2));
    const careerReadiness = Math.round((placementReadiness * 0.6 + industryReadiness * 0.4));

    const jobs = appliedJobsRes.data ?? [];
    const interns = appliedInternRes.data ?? [];

    return {
      profile: profileRes.data,
      scores: {
        careerReadiness,
        industryReadiness,
        placementReadiness,
        resumeCompletion,
        atsScore,
        portfolioCompletion,
        skillScore,
        interviewScore,
        codingAccuracy,
      },
      counts: {
        resumes: resumes.length,
        certifications: (certsRes.data ?? []).length,
        jobsApplied: jobs.filter((j) => j.status !== "saved").length,
        internshipsApplied: interns.filter((j) => j.status !== "saved").length,
        openGoals: (goalsRes.data ?? []).length,
      },
      resumes: resumes.slice(0, 3),
      certifications: certsRes.data ?? [],
      goals: goalsRes.data ?? [],
      recentInterviews: interviewRes.data ?? [],
    };
  });

function scoreSections(sections: Record<string, unknown> | null | undefined): number {
  if (!sections) return 0;
  const keys = ["personal", "objective", "education", "skills", "experience", "projects", "certifications"];
  const filled = keys.reduce((n, k) => {
    const v = sections[k];
    if (Array.isArray(v)) return n + (v.length > 0 ? 1 : 0);
    if (typeof v === "string") return n + (v.trim().length > 0 ? 1 : 0);
    if (v && typeof v === "object") return n + (Object.keys(v as object).length > 0 ? 1 : 0);
    return n;
  }, 0);
  return Math.round((filled / keys.length) * 100);
}

function avg(a: number[]): number {
  if (!a.length) return 0;
  return Math.round(a.reduce((s, x) => s + x, 0) / a.length);
}
