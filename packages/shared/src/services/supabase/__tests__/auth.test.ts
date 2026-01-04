import type { AuthError, SupabaseClient } from "@supabase/supabase-js";

import {
  getCurrentUser,
  getSession,
  resendVerificationCode,
  sendPasswordResetEmail,
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
  updateUserMetadata,
  updateUserPassword,
  verifyEmailOTP,
} from "../auth";

// Mock handleAuthError
jest.mock("../../../utils", () => ({
  handleAuthError: jest.fn((error: AuthError) => ({
    message: error.message || "Auth error",
  })),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { handleAuthError } = require("../../../utils");

const createMockClient = () => ({
  auth: {
    getSession: jest.fn(),
    getUser: jest.fn(),
    signUp: jest.fn(),
    signInWithPassword: jest.fn(),
    verifyOtp: jest.fn(),
    resend: jest.fn(),
    resetPasswordForEmail: jest.fn(),
    updateUser: jest.fn(),
    signOut: jest.fn(),
  },
});

describe("Supabase Auth Services", () => {
  let client: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    client = createMockClient();
    jest.clearAllMocks();
  });

  describe("getSession", () => {
    it("should return session on success", async () => {
      const mockSession = { access_token: "token", user: { id: "1" } };
      client.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      const result = await getSession(client as unknown as SupabaseClient);

      expect(result).toEqual(mockSession);
      expect(client.auth.getSession).toHaveBeenCalledTimes(1);
    });

    it("should throw error on failure", async () => {
      const error = { message: "Session error" } as AuthError;
      client.auth.getSession.mockResolvedValue({
        data: { session: null },
        error,
      });

      await expect(
        getSession(client as unknown as SupabaseClient)
      ).rejects.toThrow("Auth error");
      expect(handleAuthError).toHaveBeenCalledWith(error);
    });
  });

  describe("getCurrentUser", () => {
    it("should return user on success", async () => {
      const mockUser = { id: "1", email: "test@example.com" };
      client.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const result = await getCurrentUser(client as unknown as SupabaseClient);

      expect(result).toEqual(mockUser);
      expect(client.auth.getUser).toHaveBeenCalledTimes(1);
    });

    it("should throw error on failure", async () => {
      const error = { message: "User error" } as AuthError;
      client.auth.getUser.mockResolvedValue({
        data: { user: null },
        error,
      });

      await expect(
        getCurrentUser(client as unknown as SupabaseClient)
      ).rejects.toThrow("Auth error");
    });
  });

  describe("signUpWithEmail", () => {
    it("should sign up successfully", async () => {
      const mockSession = { access_token: "token" };
      const mockUser = { id: "1", email: "test@example.com" };
      client.auth.signUp.mockResolvedValue({
        data: { session: mockSession, user: mockUser },
        error: null,
      });

      const result = await signUpWithEmail(
        client as unknown as SupabaseClient,
        "test@example.com",
        "password123"
      );

      expect(result).toEqual({ session: mockSession, user: mockUser });
      expect(client.auth.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        options: { data: {}, emailRedirectTo: undefined },
      });
    });

    it("should include metadata and redirectUrl when provided", async () => {
      const mockSession = { access_token: "token" };
      const mockUser = { id: "1" };
      client.auth.signUp.mockResolvedValue({
        data: { session: mockSession, user: mockUser },
        error: null,
      });

      await signUpWithEmail(
        client as unknown as SupabaseClient,
        "test@example.com",
        "password123",
        {
          redirectUrl: "/redirect",
          metadata: { name: "Test" },
        }
      );

      expect(client.auth.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        options: {
          data: { name: "Test" },
          emailRedirectTo: "/redirect",
        },
      });
    });
  });

  describe("signInWithEmail", () => {
    it("should sign in successfully", async () => {
      const mockSession = { access_token: "token" };
      const mockUser = { id: "1", email: "test@example.com" };
      client.auth.signInWithPassword.mockResolvedValue({
        data: { session: mockSession, user: mockUser },
        error: null,
      });

      const result = await signInWithEmail(
        client as unknown as SupabaseClient,
        "test@example.com",
        "password123"
      );

      expect(result).toEqual({ session: mockSession, user: mockUser });
      expect(client.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  describe("verifyEmailOTP", () => {
    it("should verify OTP successfully", async () => {
      const mockSession = { access_token: "token" };
      const mockUser = { id: "1" };
      client.auth.verifyOtp.mockResolvedValue({
        data: { session: mockSession, user: mockUser },
        error: null,
      });

      const result = await verifyEmailOTP(
        client as unknown as SupabaseClient,
        "test@example.com",
        "123456"
      );

      expect(result).toEqual({ session: mockSession, user: mockUser });
      expect(client.auth.verifyOtp).toHaveBeenCalledWith({
        email: "test@example.com",
        token: "123456",
        type: "email",
      });
    });
  });

  describe("resendVerificationCode", () => {
    it("should resend verification code successfully", async () => {
      client.auth.resend.mockResolvedValue({
        error: null,
      });

      await resendVerificationCode(
        client as unknown as SupabaseClient,
        "test@example.com"
      );

      expect(client.auth.resend).toHaveBeenCalledWith({
        type: "signup",
        email: "test@example.com",
      });
    });
  });

  describe("sendPasswordResetEmail", () => {
    it("should send password reset email successfully", async () => {
      client.auth.resetPasswordForEmail.mockResolvedValue({
        error: null,
      });

      await sendPasswordResetEmail(
        client as unknown as SupabaseClient,
        "test@example.com",
        "/reset-password"
      );

      expect(client.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        "test@example.com",
        { redirectTo: "/reset-password" }
      );
    });
  });

  describe("updateUserPassword", () => {
    it("should update password successfully", async () => {
      client.auth.updateUser.mockResolvedValue({
        error: null,
      });

      await updateUserPassword(
        client as unknown as SupabaseClient,
        "newpassword123"
      );

      expect(client.auth.updateUser).toHaveBeenCalledWith({
        password: "newpassword123",
      });
    });
  });

  describe("updateUserMetadata", () => {
    it("should update metadata successfully", async () => {
      const mockUser = { id: "1", user_metadata: { name: "Test" } };
      client.auth.updateUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const result = await updateUserMetadata(
        client as unknown as SupabaseClient,
        { name: "Test" }
      );

      expect(result).toEqual(mockUser);
      expect(client.auth.updateUser).toHaveBeenCalledWith({
        data: { name: "Test" },
      });
    });
  });

  describe("signOutUser", () => {
    it("should sign out successfully", async () => {
      client.auth.signOut.mockResolvedValue({
        error: null,
      });

      await signOutUser(client as unknown as SupabaseClient);

      expect(client.auth.signOut).toHaveBeenCalledTimes(1);
    });

    it("should not throw on 'Auth session missing!' error", async () => {
      client.auth.signOut.mockResolvedValue({
        error: { message: "Auth session missing!" } as AuthError,
      });

      await expect(
        signOutUser(client as unknown as SupabaseClient)
      ).resolves.not.toThrow();
    });
  });
});
