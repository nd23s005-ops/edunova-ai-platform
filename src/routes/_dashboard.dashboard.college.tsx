import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout for the /dashboard/college subtree. The overview lives in
// _dashboard.dashboard.college.index.tsx; siblings (personalize, playground)
// mount into <Outlet /> below.
export const Route = createFileRoute("/_dashboard/dashboard/college")({
  component: () => <Outlet />,
});
