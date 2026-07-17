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

export function homeForRole(role: AppRole | null | undefined): string {
  if (role && role in ROLE_HOME) return ROLE_HOME[role];
  return "/dashboard";
}
