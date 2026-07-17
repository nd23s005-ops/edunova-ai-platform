import { createFileRoute } from "@tanstack/react-router";
import { AuthStatus } from "@/components/auth/AuthStatus";

export const Route = createFileRoute("/_auth/account-created")({
  head: () => ({
    meta: [
      { title: "Account created — EduNova AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AuthStatus
      variant="success"
      title="Welcome to EduNova AI"
      description="Your account is ready. Head to your dashboard to meet Nova and start learning."
      primary={{ to: "/dashboard", label: "Go to dashboard" }}
    />
  ),
});
