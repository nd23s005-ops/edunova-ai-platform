import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { DashboardHeader, PlaceholderPanel } from "@/components/dashboard/DashboardShared";

export const Route = createFileRoute("/_dashboard/dashboard/$")({
  component: DashboardSectionPlaceholder,
});

function titleize(segment: string) {
  return segment
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function DashboardSectionPlaceholder() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const parts = pathname.replace(/^\/dashboard\/?/, "").split("/").filter(Boolean);
  const feature = parts.slice(1).join(" / ") || parts[0] || "Section";
  const role = parts[0] ? titleize(parts[0]) : "";

  return (
    <>
      <DashboardHeader
        title={titleize(feature)}
        description={role ? `${role} workspace` : "EduNova AI workspace"}
        actions={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Coming soon
          </span>
        }
      />
      <PlaceholderPanel title="This module is on the roadmap">
        The <span className="font-medium text-foreground">{titleize(feature)}</span> experience will be
        implemented in an upcoming release. Navigation, permissions, and layout are ready — the module
        will drop in here.
      </PlaceholderPanel>
    </>
  );
}
