export type AppRole = "admin" | "student" | "organization" | "professional";

export const ROLES: readonly AppRole[] = [
  "admin",
  "student",
  "organization",
  "professional",
] as const;

export const SELF_SIGNUP_ROLES: readonly AppRole[] = [
  "student",
  "professional",
  "organization",
] as const;

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Administrator",
  student: "Student",
  organization: "Organization",
  professional: "Working Professional",
};

export const ROLE_HOME: Record<AppRole, string> = {
  admin: "/dashboard/admin",
  student: "/dashboard/student",
  organization: "/dashboard/organization",
  professional: "/dashboard/professional",
};

export function normalizeRole(role: string | null | undefined): AppRole | null {
  if (role === "school_student" || role === "college_student") return "student";
  if (role === "admin" || role === "student" || role === "organization" || role === "professional") {
    return role;
  }
  return null;
}

export function homeForRole(role: string | null | undefined): string {
  const normalized = normalizeRole(role);
  if (normalized) return ROLE_HOME[normalized];
  return "/dashboard";
}
