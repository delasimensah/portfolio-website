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

import { authProvider } from "../authProvider";

// Mock all dependencies
jest.mock("shared", () => ({
  getCurrentUser: jest.fn(),
  handleAuthError: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signInWithAppleWeb: jest.fn(),
  signInWithEmail: jest.fn(),
  signInWithGoogleWeb: jest.fn(),
  signOutUser: jest.fn(),
  signUpWithEmail: jest.fn(),
  updateUserPassword: jest.fn(),
}));

jest.mock("@/services", () => ({
  supabase: {},
}));

describe("authProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.error to prevent noise during tests
    jest.spyOn(console, "error").mockImplementation(() => {});
    // Default mock for handleAuthError
    (handleAuthError as jest.Mock).mockImplementation((error) => {
      if (error instanceof Error) {
        return { message: error.message };
      }
      return { message: "An unexpected error occurred" };
    });
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  describe("login", () => {
    it("should successfully log in with email and password", async () => {
      const mockSession = {
        access_token: "supabase-token",
        refresh_token: "supabase-refresh",
        user: { id: "user-123", email: "test@test.com" },
      };

      (signInWithEmail as jest.Mock).mockResolvedValue({
        session: mockSession,
      });

      const result = await authProvider.login({
        email: "test@test.com",
        password: "password123",
      });

      expect(signInWithEmail).toHaveBeenCalledWith(
        supabase,
        "test@test.com",
        "password123"
      );
      expect(result).toEqual({ success: true, redirectTo: "/" });
    });

    it("should handle social login with Google", async () => {
      (signInWithGoogleWeb as jest.Mock).mockResolvedValue(undefined);

      const result = await authProvider.login({ providerName: "google" });

      expect(signInWithGoogleWeb).toHaveBeenCalledWith(
        supabase,
        expect.stringContaining("/api/auth/callback")
      );
      expect(result).toEqual({ success: true });
    });

    it("should handle social login with Apple", async () => {
      (signInWithAppleWeb as jest.Mock).mockResolvedValue(undefined);

      const result = await authProvider.login({ providerName: "apple" });

      expect(signInWithAppleWeb).toHaveBeenCalledWith(
        supabase,
        expect.stringContaining("/api/auth/callback")
      );
      expect(result).toEqual({ success: true });
    });

    it("should return error on login failure", async () => {
      const mockError = new Error("Invalid credentials");
      (signInWithEmail as jest.Mock).mockRejectedValue(mockError);

      const result = await authProvider.login({
        email: "test@test.com",
        password: "wrong-password",
      });

      expect(result).toEqual({
        success: false,
        error: { name: "LoginError", message: "Invalid credentials" },
      });
    });

    it("should return error when no session returned", async () => {
      (signInWithEmail as jest.Mock).mockResolvedValue({
        session: null,
      });

      const result = await authProvider.login({
        email: "test@test.com",
        password: "password123",
      });

      expect(result).toEqual({
        success: false,
        error: { name: "LoginError", message: "Invalid credentials" },
      });
    });

    it("should return error when email and password are missing", async () => {
      const result = await authProvider.login({});

      expect(result).toEqual({
        success: false,
        error: { name: "LoginError", message: "Email and password required" },
      });
    });
  });

  describe("register", () => {
    it("should successfully register a user", async () => {
      (signUpWithEmail as jest.Mock).mockResolvedValue(undefined);

      const result = await authProvider.register({
        email: "new@test.com",
        password: "password123",
      });

      expect(signUpWithEmail).toHaveBeenCalledWith(
        supabase,
        "new@test.com",
        "password123"
      );
      expect(result).toEqual({
        success: true,
        redirectTo: "/verify-email?email=new%40test.com",
      });
    });

    it("should return error on registration failure", async () => {
      const mockError = new Error("User already exists");
      (signUpWithEmail as jest.Mock).mockRejectedValue(mockError);

      const result = await authProvider.register({
        email: "existing@test.com",
        password: "password123",
      });

      expect(result).toEqual({
        success: false,
        error: { name: "RegisterError", message: "User already exists" },
      });
    });
  });

  describe("check", () => {
    it("should return authenticated when user exists", async () => {
      const mockUser = { id: "user-123", email: "test@test.com" };
      (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await authProvider.check({});

      expect(getCurrentUser).toHaveBeenCalledWith(supabase);
      expect(result).toEqual({ authenticated: true });
    });

    it("should return not authenticated when no user", async () => {
      (getCurrentUser as jest.Mock).mockResolvedValue(null);

      const result = await authProvider.check({});

      expect(result).toEqual({
        authenticated: false,
        redirectTo: "/auth/login",
        error: { name: "AuthError", message: "Not authenticated" },
      });
    });

    it("should handle check errors", async () => {
      (getCurrentUser as jest.Mock).mockRejectedValue(
        new Error("Check failed")
      );

      const result = await authProvider.check({});

      expect(result).toEqual({
        authenticated: false,
        redirectTo: "/auth/login",
        error: {
          name: "AuthCheckError",
          message: "Check failed",
        },
      });
    });
  });

  describe("getIdentity", () => {
    it("should return user identity when user exists", async () => {
      const mockUser = {
        id: "user-123",
        email: "test@test.com",
        user_metadata: {
          name: "Test User",
        },
      };

      (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await authProvider.getIdentity!({});

      expect(getCurrentUser).toHaveBeenCalledWith(supabase);
      expect(result).toEqual({
        id: "user-123",
        email: "test@test.com",
        name: "Test User",
        ...mockUser.user_metadata,
      });
    });

    it("should return null when no user", async () => {
      (getCurrentUser as jest.Mock).mockResolvedValue(null);

      const result = await authProvider.getIdentity!({});

      expect(result).toBeNull();
    });

    it("should handle errors gracefully", async () => {
      (getCurrentUser as jest.Mock).mockRejectedValue(
        new Error("Network error")
      );

      const result = await authProvider.getIdentity!({});

      expect(console.error).toHaveBeenCalledWith(
        "Error getting user identity:",
        expect.any(Error)
      );
      expect(result).toBeNull();
    });
  });

  describe("getPermissions", () => {
    it("should return permissions from user metadata", async () => {
      const mockUser = {
        id: "user-123",
        user_metadata: {
          role: "admin",
        },
      };

      (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await authProvider.getPermissions!({});

      expect(result).toEqual({
        role: "admin",
      });
    });

    it("should return default role when metadata not specified", async () => {
      const mockUser = {
        id: "user-123",
        user_metadata: {},
      };

      (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await authProvider.getPermissions!({});

      expect(result).toEqual({
        role: "user",
      });
    });

    it("should return null when no user", async () => {
      (getCurrentUser as jest.Mock).mockResolvedValue(null);

      const result = await authProvider.getPermissions!({});

      expect(result).toBeNull();
    });

    it("should handle errors gracefully", async () => {
      (getCurrentUser as jest.Mock).mockRejectedValue(
        new Error("Network error")
      );

      const result = await authProvider.getPermissions!({});

      expect(console.error).toHaveBeenCalledWith(
        "Error getting permissions:",
        expect.any(Error)
      );
      expect(result).toBeNull();
    });
  });

  describe("forgotPassword", () => {
    it("should successfully send password reset email", async () => {
      (sendPasswordResetEmail as jest.Mock).mockResolvedValue(undefined);

      const result = await authProvider.forgotPassword!({
        email: "test@test.com",
      });

      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        supabase,
        "test@test.com",
        expect.stringContaining("/reset-password")
      );
      expect(result).toEqual({ success: true });
    });

    it("should return error on forgot password failure", async () => {
      const mockError = new Error("Email not found");
      (sendPasswordResetEmail as jest.Mock).mockRejectedValue(mockError);

      const result = await authProvider.forgotPassword!({
        email: "nonexistent@test.com",
      });

      expect(result).toEqual({
        success: false,
        error: { name: "ForgotPasswordError", message: "Email not found" },
      });
    });
  });

  describe("updatePassword", () => {
    it("should successfully update password", async () => {
      (updateUserPassword as jest.Mock).mockResolvedValue(undefined);

      const result = await authProvider.updatePassword!({
        password: "newPassword123",
      });

      expect(updateUserPassword).toHaveBeenCalledWith(
        supabase,
        "newPassword123"
      );
      expect(result).toEqual({ success: true, redirectTo: "/" });
    });

    it("should return error on update password failure", async () => {
      const mockError = new Error("Password too weak");
      (updateUserPassword as jest.Mock).mockRejectedValue(mockError);

      const result = await authProvider.updatePassword!({
        password: "weak",
      });

      expect(result).toEqual({
        success: false,
        error: { name: "UpdatePasswordError", message: "Password too weak" },
      });
    });
  });

  describe("logout", () => {
    it("should successfully log out user", async () => {
      (signOutUser as jest.Mock).mockResolvedValue(undefined);

      const result = await authProvider.logout({});

      expect(signOutUser).toHaveBeenCalledWith(supabase);
      expect(result).toEqual({ success: true, redirectTo: "/auth/login" });
    });

    it("should return error on logout failure", async () => {
      const mockError = new Error("Logout failed");
      (signOutUser as jest.Mock).mockRejectedValue(mockError);

      const result = await authProvider.logout({});

      expect(result).toEqual({
        success: false,
        error: { name: "LogoutError", message: "Logout failed" },
      });
    });
  });

  describe("onError", () => {
    it("should handle errors", async () => {
      const mockError = new Error("Test error");
      const result = await authProvider.onError!({ error: mockError });

      expect(console.error).toHaveBeenCalledWith("Auth error:", mockError);
      expect(result).toEqual({ error: mockError });
    });
  });
});
