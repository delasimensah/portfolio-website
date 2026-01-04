import type { AuthError } from "@supabase/supabase-js";

/**
 * Handle Supabase auth errors and return user-friendly messages
 * @param error - Supabase auth error
 * @returns Formatted error with message
 */
export const handleAuthError = (
  error: AuthError
): { message: string; code?: string } => {
  // Map common Supabase auth errors to user-friendly messages
  const errorMessages: Record<string, string> = {
    "Invalid login credentials": "Invalid email or password. Please try again.",
    "Email not confirmed":
      "Please verify your email address before signing in.",
    "User already registered": "An account with this email already exists.",
    "Password should be at least 6 characters":
      "Password must be at least 6 characters long.",
    "Signups not allowed": "New signups are currently disabled.",
    "Email rate limit exceeded": "Too many requests. Please try again later.",
    "Token has expired": "Your session has expired. Please sign in again.",
    "Auth session missing!": "You are not signed in.",
  };

  // Check if we have a custom message for this error
  const customMessage = errorMessages[error.message];

  return {
    message:
      customMessage || error.message || "An authentication error occurred",
    code: error.status?.toString(),
  };
};
