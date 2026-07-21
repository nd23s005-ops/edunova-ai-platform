import { createFileRoute } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { ChatWindow } from "@/components/ai/ChatWindow";
import { RoleGate } from "@/components/auth/RoleGate";

export const Route = createFileRoute("/_dashboard/dashboard/ai-assistant")({
  component: AIAssistantPage,
});

function AIAssistantPage() {
  // Admins never see any AI chat surface.
  return (
    <RoleGate allow={["student", "college_student", "professional"]}>
      <DashboardHeader
        title="Nova AI Assistant"
        description="One assistant, context-aware — adapts to your role and where you are on EduNova AI."
      />
      <ChatWindow variant="page" chatId="nova-dedicated" />
    </RoleGate>
  );
}
