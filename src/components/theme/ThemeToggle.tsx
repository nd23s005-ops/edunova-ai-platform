import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme, type ThemeMode } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  /** Visual variant of the trigger. */
  variant?: "ghost" | "outline";
}

export function ThemeToggle({ className, variant = "ghost" }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const options: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          aria-label={`Theme: ${theme}. Change theme.`}
          className={cn("rounded-full transition-colors", className)}
        >
          <Sun
            className={cn(
              "h-4 w-4 transition-all",
              resolvedTheme === "dark" && "-rotate-90 scale-0",
            )}
          />
          <Moon
            className={cn(
              "absolute h-4 w-4 transition-all",
              resolvedTheme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0",
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Appearance
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "gap-2 text-sm",
              theme === value && "bg-accent/40 font-semibold text-accent-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
            {theme === value && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
