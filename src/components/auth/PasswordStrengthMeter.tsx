import { scorePassword } from "@/lib/auth/passwordStrength";
import { cn } from "@/lib/utils";

export function PasswordStrengthMeter({ password }: { password: string }) {
  const s = scorePassword(password);
  if (!password) return null;
  return (
    <div className="mt-2 space-y-1">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full transition-all duration-300", s.color)}
          style={{ width: `${s.percent}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Password strength: <span className="font-medium text-foreground">{s.label}</span>
      </p>
    </div>
  );
}
