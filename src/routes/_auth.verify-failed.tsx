import { createFileRoute } from "@tanstack/react-router";
import { AuthStatus } from "@/components/auth/AuthStatus";

export const Route = createFileRoute("/_auth/verify-failed")({
  head: () => ({
    meta: [
      { title: "Verification failed — EduNova AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AuthStatus
      variant="error"
      title="Verification link is invalid"
      description="This link may have expired or already been used. Try signing in — your account might already be verified."
      primary={{ to: "/login", label: "Go to sign in" }}
      secondary={{ to: "/register", label: "Create new account" }}
    />
  ),
});
