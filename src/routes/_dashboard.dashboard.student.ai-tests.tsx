import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RoleGate } from "@/components/auth/RoleGate";

export const Route = createFileRoute("/_dashboard/dashboard/student/ai-tests")({
  component: AiTestsLayout,
});

function AiTestsLayout() {
  return (
    <RoleGate allow={["student"]}>
      <Outlet />
    </RoleGate>
  );
}
