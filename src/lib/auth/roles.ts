export type AppRole = "admin" | "student" | "college_student" | "organization" | "professional";

export const ROLES: readonly AppRole[] = [
  "admin",
  "student",
  "college_student",
  "organization",
  "professional",
] as const;

export const SELF_SIGNUP_ROLES: readonly AppRole[] = [
  "student",
  "college_student",
  "professional",
  "organization",
] as const;

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Administrator",
  student: "School Student",
  college_student: "College Student",
  organization: "Organization",
  professional: "Working Professional",
};

export const ROLE_HOME: Record<AppRole, string> = {
  admin: "/dashboard/admin",
  student: "/dashboard/student",
  college_student: "/dashboard/college",
  organization: "/dashboard/organization",
  professional: "/dashboard/professional",
};

export function normalizeRole(role: string | null | undefined): AppRole | null {
  if (role === "school_student") return "student";
  if (
    role === "admin" ||
    role === "student" ||
    role === "college_student" ||
    role === "organization" ||
    role === "professional"
  ) {
    return role;
  }
  return null;
}

export function homeForRole(role: string | null | undefined): string {
  const normalized = normalizeRole(role);
  if (normalized) return ROLE_HOME[normalized];
  return "/dashboard";
}

/** Roles that share the student learning surface (school + college). */
export const STUDENT_LIKE_ROLES: AppRole[] = ["student", "college_student"];

export function isStudentLike(role: AppRole | null | undefined): boolean {
  return role === "student" || role === "college_student";
}
