import { createFileRoute } from "@tanstack/react-router";
import { AuthStatus } from "@/components/auth/AuthStatus";

export const Route = createFileRoute("/_auth/session-expired")({
  head: () => ({
    meta: [
      { title: "Session expired — EduNova AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AuthStatus
      variant="warning"
      title="Your session expired"
      description="For security, we signed you out after a period of inactivity. Please sign in again to continue."
      primary={{ to: "/login", label: "Sign in again" }}
    />
  ),
});
