export type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4;
  label: "Too weak" | "Weak" | "Fair" | "Strong" | "Very strong";
  color: string;
  percent: number;
};

export function scorePassword(password: string): PasswordStrength {
  let score = 0;
  if (!password) {
    return { score: 0, label: "Too weak", color: "bg-destructive", percent: 0 };
  }
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  const clamped = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;

  const map: Record<0 | 1 | 2 | 3 | 4, Omit<PasswordStrength, "score">> = {
    0: { label: "Too weak", color: "bg-destructive", percent: 15 },
    1: { label: "Weak", color: "bg-destructive", percent: 30 },
    2: { label: "Fair", color: "bg-amber-500", percent: 55 },
    3: { label: "Strong", color: "bg-primary", percent: 80 },
    4: { label: "Very strong", color: "bg-primary", percent: 100 },
  };
  return { score: clamped, ...map[clamped] };
}
