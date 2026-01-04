import type { AuthProvider } from "@refinedev/core";
import {
  getCurrentUser,
  handleAuthError,
  sendPasswordResetEmail,
  signInWithAppleWeb,
  signInWithEmail,
  signInWithGoogleWeb,
  signOutUser,
  signUpWithEmail,
  updateUserPassword,
} from "shared";

import { supabase } from "@/services";

/**
 * Generic Refine Auth Provider for Supabase
 *
 * This provider integrates Refine with Supabase authentication.
 * It handles login, registration, logout, and session management.
 *
 * Customize the redirect paths and error messages for your project.
 */
export const authProvider: AuthProvider = {
  /**
   * Called by useLogin hook
   * Handles email/password and social authentication
   */
  login: async ({
    email,
    password,
    providerName,
  }: {
    email?: string;
    password?: string;
    providerName?: string;
  }) => {
    try {
      // Social auth (Google, Apple, etc.)
      if (providerName) {
        const baseUrl =
          typeof window !== "undefined"
            ? window.location.origin
            : typeof process !== "undefined" &&
                process.env.NEXT_PUBLIC_WEB_APP_BASE_URL
              ? process.env.NEXT_PUBLIC_WEB_APP_BASE_URL
              : "http://localhost:3001";
        const redirectUrl = `${baseUrl}/api/auth/callback`;

        if (providerName === "google") {
          await signInWithGoogleWeb(supabase, redirectUrl);
          return { success: true };
        }

        if (providerName === "apple") {
          await signInWithAppleWeb(supabase, redirectUrl);
          return { success: true };
        }
      }

      // Email/password auth
      if (email && password) {
        const { session } = await signInWithEmail(supabase, email, password);

        if (!session) {
          return {
            success: false,
            error: { name: "LoginError", message: "Invalid credentials" },
          };
        }

        return { success: true, redirectTo: "/" };
      }

      return {
        success: false,
        error: { name: "LoginError", message: "Email and password required" },
      };
    } catch (error) {
      const authError = handleAuthError(error as any);
      return {
        success: false,
        error: {
          name: "LoginError",
          message: authError.message,
        },
      };
    }
  },

  /**
   * Called by useRegister hook
   */
  register: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      if (!email || !password) {
        return {
          success: false,
          error: {
            name: "RegisterError",
            message: "Email and password required",
          },
        };
      }

      await signUpWithEmail(supabase, email, password);

      // Redirect to email verification page if email confirmation is enabled
      return {
        success: true,
        redirectTo: `/verify-email?email=${encodeURIComponent(email)}`,
      };
    } catch (error) {
      const authError = handleAuthError(error as any);
      return {
        success: false,
        error: {
          name: "RegisterError",
          message: authError.message,
        },
      };
    }
  },

  /**
   * Called by <Authenticated> component and useIsAuthenticated hook
   * Checks if user is authenticated
   */
  check: async () => {
    try {
      const user = await getCurrentUser(supabase);

      if (!user) {
        return {
          authenticated: false,
          redirectTo: "/auth/login",
          error: { name: "AuthError", message: "Not authenticated" },
        };
      }

      return { authenticated: true };
    } catch (error) {
      return {
        authenticated: false,
        redirectTo: "/auth/login",
        error: {
          name: "AuthCheckError",
          message: error instanceof Error ? error.message : "An error occurred",
        },
      };
    }
  },

  /**
   * Called by useGetIdentity hook
   * Returns current user identity
   */
  getIdentity: async () => {
    try {
      const user = await getCurrentUser(supabase);

      if (!user) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email,
        ...user.user_metadata,
      };
    } catch (error) {
      console.error("Error getting user identity:", error);
      return null;
    }
  },

  /**
   * Called by usePermissions hook and useCan hook
   * Returns user permissions/roles
   *
   * Customize this based on your permission system.
   * Example: Check user_metadata for roles, permissions, etc.
   */
  getPermissions: async () => {
    try {
      const user = await getCurrentUser(supabase);

      if (!user) return null;

      // Example: Extract permissions from user metadata
      // Customize based on your needs
      return {
        role: user.user_metadata?.role || "user",
        // Add more permission fields as needed
      };
    } catch (error) {
      console.error("Error getting permissions:", error);
      return null;
    }
  },

  /**
   * Called by useOnError hook
   */
  onError: async (error: Error) => {
    console.error("Auth error:", error);
    return { error };
  },

  /**
   * Called by useForgotPassword hook
   */
  forgotPassword: async ({ email }: { email: string }) => {
    try {
      const baseUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : typeof process !== "undefined" &&
              process.env.NEXT_PUBLIC_WEB_APP_BASE_URL
            ? process.env.NEXT_PUBLIC_WEB_APP_BASE_URL
            : "http://localhost:3001";
      const redirectUrl = `${baseUrl}/reset-password`;

      await sendPasswordResetEmail(supabase, email, redirectUrl);

      return { success: true };
    } catch (error) {
      const authError = handleAuthError(error as any);
      return {
        success: false,
        error: {
          name: "ForgotPasswordError",
          message: authError.message,
        },
      };
    }
  },

  /**
   * Called by useUpdatePassword hook
   */
  updatePassword: async ({ password }: { password: string }) => {
    try {
      await updateUserPassword(supabase, password);

      return { success: true, redirectTo: "/" };
    } catch (error) {
      const authError = handleAuthError(error as any);
      return {
        success: false,
        error: {
          name: "UpdatePasswordError",
          message: authError.message,
        },
      };
    }
  },

  /**
   * Called by useLogout hook
   */
  logout: async () => {
    try {
      await signOutUser(supabase);

      return { success: true, redirectTo: "/auth/login" };
    } catch (error) {
      const authError = handleAuthError(error as any);
      return {
        success: false,
        error: {
          name: "LogoutError",
          message: authError.message,
        },
      };
    }
  },
};
