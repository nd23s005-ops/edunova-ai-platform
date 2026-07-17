export type AppRole = "admin" | "student" | "teacher" | "organization";

export const ROLES: readonly AppRole[] = ["admin", "student", "teacher", "organization"] as const;

export const SELF_SIGNUP_ROLES: readonly AppRole[] = ["student", "teacher", "organization"] as const;

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Administrator",
  student: "Student",
  teacher: "Teacher",
  organization: "Organization",
};

export const ROLE_HOME: Record<AppRole, string> = {
  admin: "/dashboard/admin",
  student: "/dashboard/student",
  teacher: "/dashboard/teacher",
  organization: "/dashboard/organization",
};

export function homeForRole(role: AppRole | null | undefined): string {
  if (role && role in ROLE_HOME) return ROLE_HOME[role];
  return "/dashboard";
}
