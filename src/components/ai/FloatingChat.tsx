import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { ChatWindow } from "./ChatWindow";
import { cn } from "@/lib/utils";

// Any dedicated Nova workspace page — only one chat surface active at a time.
const DEDICATED_PATHS = [
  "/dashboard/ai-assistant",
  "/dashboard/student/ai-chat",
];

export function FloatingChat() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const onDedicated = DEDICATED_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  useEffect(() => {
    if (onDedicated && open) setOpen(false);
  }, [onDedicated, open]);

  if (onDedicated) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
          <ChatWindow variant="panel" chatId="nova-floating" />
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Nova chat" : "Open Nova chat"}
        className={cn(
          "group relative grid h-14 w-14 place-items-center rounded-full",
          "border border-white/20 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground",
          "shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] backdrop-blur-xl",
          "transition-transform hover:scale-105 active:scale-95",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 rounded-full bg-primary/40 blur-xl",
            !open && "animate-pulse",
          )}
        />
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-white drop-shadow" />
        )}
      </button>
    </div>
  );
}
