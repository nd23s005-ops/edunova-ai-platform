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

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, { message: "Enter your full name" }).max(100),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    role: z.enum(SELF_SIGNUP_ROLES as unknown as [string, ...string[]]),
    acceptTerms: z.literal(true, { message: "You must accept the terms to continue" }),
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
