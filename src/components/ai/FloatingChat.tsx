import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { X, LifeBuoy } from "lucide-react";
import { ChatWindow } from "./ChatWindow";
import { cn } from "@/lib/utils";

// Any dedicated Nova workspace page — only one chat surface active at a time.
const DEDICATED_PATHS = ["/dashboard/ai-assistant", "/dashboard/student/ai-chat"];

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
        aria-label={open ? "Close help chat" : "Open help chat"}
        className={cn(
          "group relative grid h-16 w-16 place-items-center rounded-2xl",
          "bg-gradient-to-br from-primary via-primary to-primary/85 text-primary-foreground",
          "border border-white/25 shadow-[0_18px_40px_-12px_hsl(var(--primary)/0.55)]",
          "backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:shadow-[0_22px_48px_-12px_hsl(var(--primary)/0.65)] active:scale-95",
          "sm:h-14 sm:w-14",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 rounded-2xl bg-primary/45 blur-2xl",
            !open && "animate-pulse",
          )}
        />
        {open ? <X className="h-6 w-6" /> : <LifeBuoy className="h-7 w-7 sm:h-6 sm:w-6" />}
        {!open && (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-400"
          />
        )}
      </button>
    </div>
  );
}
