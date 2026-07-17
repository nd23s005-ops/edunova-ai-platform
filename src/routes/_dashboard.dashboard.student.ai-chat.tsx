import { createFileRoute } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { ChatWindow } from "@/components/ai/ChatWindow";

export const Route = createFileRoute("/_dashboard/dashboard/student/ai-chat")({
  component: AIChatPage,
});

function AIChatPage() {
  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title="AI Chat Assistant"
        description="Chat with Nova — your personal AI tutor. Ask questions, get explanations, plan your studies."
      />
      <ChatWindow variant="page" chatId="nova-dashboard" />
    </RoleGate>
  );
}
