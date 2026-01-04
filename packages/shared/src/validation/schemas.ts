import { z } from "zod";

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .email("Please enter a valid email address");

/**
 * Password validation schema
 * Minimum 6 characters (adjust as needed)
 */
export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long");

/**
 * Sign up form schema
 */
export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Sign in form schema
 */
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

/**
 * Password reset request schema
 */
export const passwordResetSchema = z.object({
  email: emailSchema,
});

/**
 * Password update schema
 */
export const passwordUpdateSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Email verification schema
 */
export const emailVerificationSchema = z.object({
  email: emailSchema,
  token: z.string().min(1, "Verification token is required"),
});

// Type exports
export type SignUpForm = z.infer<typeof signUpSchema>;
export type SignInForm = z.infer<typeof signInSchema>;
export type PasswordResetForm = z.infer<typeof passwordResetSchema>;
export type PasswordUpdateForm = z.infer<typeof passwordUpdateSchema>;
export type EmailVerificationForm = z.infer<typeof emailVerificationSchema>;
