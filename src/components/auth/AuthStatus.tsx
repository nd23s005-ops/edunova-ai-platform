import type { ReactNode } from "react";
import { CheckCircle2, AlertCircle, Mail, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

type Variant = "success" | "error" | "info" | "warning";

const ICONS: Record<Variant, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Mail,
  warning: Clock,
};

const TONES: Record<Variant, string> = {
  success: "bg-primary/10 text-primary",
  error: "bg-destructive/10 text-destructive",
  info: "bg-primary/10 text-primary",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export function AuthStatus({
  variant,
  title,
  description,
  primary,
  secondary,
  children,
}: {
  variant: Variant;
  title: string;
  description: ReactNode;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string };
  children?: ReactNode;
}) {
  const Icon = ICONS[variant];
  return (
    <div className="text-center">
      <span className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${TONES[variant]}`}>
        <Icon className="h-6 w-6" />
      </span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">{title}</h1>
      <div className="mt-3 text-sm text-muted-foreground">{description}</div>
      {children}
      {(primary || secondary) && (
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
          {primary && (
            <Button asChild size="lg" className="shadow-elegant">
              <Link to={primary.to}>{primary.label}</Link>
            </Button>
          )}
          {secondary && (
            <Button asChild size="lg" variant="outline">
              <Link to={secondary.to}>{secondary.label}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
