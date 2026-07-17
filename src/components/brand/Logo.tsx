import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="EduNova AI home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-highlight text-primary-foreground shadow-elegant transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M12 3 3 7.5 12 12l9-4.5L12 3Z"
            fill="currentColor"
            opacity="0.95"
          />
          <path
            d="M5 10.5V15c0 1.2 3.1 3 7 3s7-1.8 7-3v-4.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="20" cy="9" r="1.4" fill="var(--accent)" />
        </svg>
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-bold tracking-tight">
            EduNova <span className="text-gradient">AI</span>
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Nova Learn
          </span>
        </span>
      )}
    </Link>
  );
}
