import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { ChatWindow } from "./ChatWindow";
import { cn } from "@/lib/utils";
import robotAvatar from "@/assets/chatbot-robot.png";

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
          "group relative grid place-items-center rounded-full bg-transparent",
          "h-20 w-20 sm:h-[84px] sm:w-[84px]",
          "transition-transform duration-300 hover:scale-110 active:scale-95",
          !open && "animate-nova-float",
        )}
      >
        {/* Soft blue/cyan glow */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 rounded-full blur-2xl",
            "bg-[radial-gradient(circle,rgba(56,189,248,0.55),rgba(59,130,246,0.35)_45%,transparent_70%)]",
            !open && "animate-pulse",
          )}
        />
        {open ? (
          <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <X className="h-6 w-6" />
          </span>
        ) : (
          <img
            src={robotAvatar}
            alt="Nova AI assistant"
            width={512}
            height={512}
            loading="lazy"
            className="h-full w-full object-contain drop-shadow-[0_8px_20px_rgba(56,189,248,0.45)] transition-transform duration-300 group-hover:-rotate-3"
          />
        )}
        {!open && (
          <span
            aria-hidden
            className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-background bg-emerald-400 shadow"
          />
        )}
      </button>
    </div>
  );
}

