import { createFileRoute } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { ChatWindow } from "@/components/ai/ChatWindow";

export const Route = createFileRoute("/_dashboard/dashboard/ai-assistant")({
  component: AIAssistantPage,
});

function AIAssistantPage() {
  return (
    <>
      <DashboardHeader
        title="Nova AI Assistant"
        description="One assistant, context-aware — adapts to your role and where you are on EduNova AI."
      />
      <ChatWindow variant="page" chatId="nova-dedicated" />
    </>
  );
}
