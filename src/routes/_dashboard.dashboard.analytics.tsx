import { createFileRoute, Outlet, redirect, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard/analytics", label: "Overview" },
  { to: "/dashboard/analytics/courses", label: "Courses" },
  { to: "/dashboard/analytics/assessments", label: "Assessments" },
  { to: "/dashboard/analytics/ai-usage", label: "AI Usage" },
  { to: "/dashboard/analytics/insights", label: "AI Insights" },
  { to: "/dashboard/analytics/predictions", label: "Predictions" },
  { to: "/dashboard/analytics/reports", label: "Reports" },
] as const;

export const Route = createFileRoute("/_dashboard/dashboard/analytics")({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth" });
  },
  component: AnalyticsLayout,
});

function AnalyticsLayout() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics & Insights</h1>
        <p className="text-sm text-muted-foreground">
          Reports, business intelligence, and AI-powered predictions.
        </p>
      </div>
      <nav className="flex flex-wrap gap-2 border-b pb-2">
        {NAV.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            className={cn(
              "px-3 py-1.5 text-sm rounded-md hover:bg-muted transition-colors",
            )}
            activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
            activeOptions={{ exact: n.to === "/dashboard/analytics" }}
          >
            {n.label}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
