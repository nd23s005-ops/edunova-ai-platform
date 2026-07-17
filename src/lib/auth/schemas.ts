import { z } from "zod";
import { SELF_SIGNUP_ROLES } from "./roles";

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Email is required" })
  .email({ message: "Enter a valid email address" })
  .max(255);

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(128, { message: "Password is too long" })
  .refine((v) => /[A-Z]/.test(v), { message: "Include at least one uppercase letter" })
  .refine((v) => /[a-z]/.test(v), { message: "Include at least one lowercase letter" })
  .refine((v) => /[0-9]/.test(v), { message: "Include at least one number" });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Password is required" }),
  remember: z.boolean(),
});
export type LoginInput = z.infer<typeof loginSchema>;

// Optional phone: plain text, digits/spaces/+/-/parentheses only.
const optionalPhone = z
  .string()
  .trim()
  .max(30, { message: "Phone number is too long" })
  .refine((v) => v === "" || /^[+\d][\d\s\-()]{5,}$/.test(v), {
    message: "Enter a valid phone number",
  })
  .optional()
  .or(z.literal(""));

// DOB: ISO yyyy-mm-dd, 5–120 years old.
const dobSchema = z
  .string()
  .min(1, { message: "Date of birth is required" })
  .refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), { message: "Enter a valid date" })
  .refine(
    (v) => {
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return false;
      const now = new Date();
      const age = now.getFullYear() - d.getFullYear() - (now < new Date(now.getFullYear(), d.getMonth(), d.getDate()) ? 1 : 0);
      return age >= 5 && age <= 120;
    },
    { message: "Date of birth must be between 5 and 120 years ago" },
  );

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, { message: "Enter your full name" }).max(100),
    email: emailSchema,
    phone: optionalPhone,
    dob: dobSchema,
    country: z.string().trim().min(2, { message: "Select your country" }).max(60),
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    role: z.enum(SELF_SIGNUP_ROLES as unknown as [string, ...string[]]),
    acceptTerms: z.literal(true, { message: "You must accept the Terms & Conditions" }),
    acceptPrivacy: z.literal(true, { message: "You must accept the Privacy Policy" }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({ email: emailSchema });
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  bio: z.string().trim().max(500).optional().or(z.literal("")),
});
export type ProfileInput = z.infer<typeof profileSchema>;
