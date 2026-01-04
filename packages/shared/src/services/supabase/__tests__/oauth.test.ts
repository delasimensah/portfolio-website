import type { SupabaseClient } from "@supabase/supabase-js";

import {
  signInWithAppleMobile,
  signInWithAppleWeb,
  signInWithGitHubWeb,
  signInWithGoogleMobile,
  signInWithGoogleWeb,
  signInWithOAuth,
} from "../oauth";

// Mock handleAuthError
jest.mock("../../../utils", () => ({
  handleAuthError: jest.fn().mockReturnValue({ message: "OAuth error" }),
}));

const createMockClient = () => ({
  auth: {
    signInWithIdToken: jest.fn(),
    signInWithOAuth: jest.fn(),
  },
});

describe("Supabase OAuth Services", () => {
  let client: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    client = createMockClient();
    jest.clearAllMocks();
  });

  describe("signInWithGoogleWeb", () => {
    it("should initiate Google OAuth for web", async () => {
      const mockData = { url: "https://google.com/oauth" };
      client.auth.signInWithOAuth.mockResolvedValue({
        data: mockData,
        error: null,
      });

      const result = await signInWithGoogleWeb(
        client as unknown as SupabaseClient,
        "/api/auth/callback"
      );

      expect(result).toEqual(mockData);
      expect(client.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: "google",
        options: {
          redirectTo: "/api/auth/callback",
        },
      });
    });

    it("should throw error on failure", async () => {
      const error = { message: "OAuth error" };
      client.auth.signInWithOAuth.mockResolvedValue({
        data: null,
        error,
      });

      await expect(
        signInWithGoogleWeb(client as unknown as SupabaseClient, "/callback")
      ).rejects.toThrow("OAuth error");
    });
  });

  describe("signInWithGoogleMobile", () => {
    it("should sign in with Google ID token on mobile", async () => {
      const mockSession = { access_token: "token" };
      client.auth.signInWithIdToken.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      const result = await signInWithGoogleMobile(
        client as unknown as SupabaseClient,
        "id-token-123"
      );

      expect(result).toEqual({ session: mockSession });
      expect(client.auth.signInWithIdToken).toHaveBeenCalledWith({
        provider: "google",
        token: "id-token-123",
      });
    });
  });

  describe("signInWithAppleWeb", () => {
    it("should initiate Apple OAuth for web", async () => {
      const mockData = { url: "https://apple.com/oauth" };
      client.auth.signInWithOAuth.mockResolvedValue({
        data: mockData,
        error: null,
      });

      const result = await signInWithAppleWeb(
        client as unknown as SupabaseClient,
        "/api/auth/callback"
      );

      expect(result).toEqual(mockData);
      expect(client.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: "apple",
        options: {
          redirectTo: "/api/auth/callback",
        },
      });
    });
  });

  describe("signInWithAppleMobile", () => {
    it("should sign in with Apple identity token on mobile", async () => {
      const mockSession = { access_token: "token" };
      client.auth.signInWithIdToken.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      const result = await signInWithAppleMobile(
        client as unknown as SupabaseClient,
        "identity-token-123"
      );

      expect(result).toEqual({ session: mockSession });
      expect(client.auth.signInWithIdToken).toHaveBeenCalledWith({
        provider: "apple",
        token: "identity-token-123",
      });
    });
  });

  describe("signInWithGitHubWeb", () => {
    it("should initiate GitHub OAuth for web", async () => {
      const mockData = { url: "https://github.com/oauth" };
      client.auth.signInWithOAuth.mockResolvedValue({
        data: mockData,
        error: null,
      });

      const result = await signInWithGitHubWeb(
        client as unknown as SupabaseClient,
        "/api/auth/callback"
      );

      expect(result).toEqual(mockData);
      expect(client.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: "github",
        options: {
          redirectTo: "/api/auth/callback",
        },
      });
    });
  });

  describe("signInWithOAuth", () => {
    it("should initiate generic OAuth with provider", async () => {
      const mockData = { url: "https://provider.com/oauth" };
      client.auth.signInWithOAuth.mockResolvedValue({
        data: mockData,
        error: null,
      });

      const result = await signInWithOAuth(
        client as unknown as SupabaseClient,
        "discord",
        "/api/auth/callback"
      );

      expect(result).toEqual(mockData);
      expect(client.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: "discord",
        options: {
          redirectTo: "/api/auth/callback",
          scopes: undefined,
          queryParams: undefined,
        },
      });
    });

    it("should include scopes and queryParams when provided", async () => {
      const mockData = { url: "https://provider.com/oauth" };
      client.auth.signInWithOAuth.mockResolvedValue({
        data: mockData,
        error: null,
      });

      await signInWithOAuth(
        client as unknown as SupabaseClient,
        "discord",
        "/callback",
        {
          scopes: "email profile",
          queryParams: { prompt: "consent" },
        }
      );

      expect(client.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: "discord",
        options: {
          redirectTo: "/callback",
          scopes: "email profile",
          queryParams: { prompt: "consent" },
        },
      });
    });
  });
});
