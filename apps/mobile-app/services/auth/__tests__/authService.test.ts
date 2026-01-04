import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform } from "react-native";

import * as authService from "../authService";

// Mock dependencies
jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: "SIGN_IN_CANCELLED",
    IN_PROGRESS: "IN_PROGRESS",
    PLAY_SERVICES_NOT_AVAILABLE: "PLAY_SERVICES_NOT_AVAILABLE",
  },
}));

jest.mock("expo-apple-authentication", () => ({
  signInAsync: jest.fn(),
  AppleAuthenticationScope: {
    FULL_NAME: 0,
    EMAIL: 1,
  },
}));

jest.mock("expo-constants", () => ({
  default: {
    expoConfig: {
      extra: {
        googleIosClientId: "mock-ios-client-id",
        googleWebClientId: "mock-web-client-id",
      },
    },
  },
}));

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("nativeSignInWithGoogle", () => {
    it("should sign in with Google successfully", async () => {
      const mockIdToken = "mock-google-id-token";

      (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
      (GoogleSignin.signIn as jest.Mock).mockResolvedValue({
        data: { idToken: mockIdToken },
      });

      const result = await authService.nativeSignInWithGoogle();

      expect(GoogleSignin.configure).toHaveBeenCalled();
      expect(GoogleSignin.hasPlayServices).toHaveBeenCalled();
      expect(GoogleSignin.signIn).toHaveBeenCalled();
      expect(result.idToken).toBe(mockIdToken);
    });

    it("should handle Google Sign-In cancellation", async () => {
      (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
      (GoogleSignin.signIn as jest.Mock).mockRejectedValue({
        code: statusCodes.SIGN_IN_CANCELLED,
      });

      await expect(authService.nativeSignInWithGoogle()).rejects.toThrow(
        "User cancelled the login flow"
      );
    });

    it("should handle play services not available", async () => {
      (GoogleSignin.hasPlayServices as jest.Mock).mockRejectedValue({
        code: statusCodes.PLAY_SERVICES_NOT_AVAILABLE,
      });

      await expect(authService.nativeSignInWithGoogle()).rejects.toThrow(
        "Play services not available or outdated"
      );
    });

    it("should handle missing ID token", async () => {
      (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
      (GoogleSignin.signIn as jest.Mock).mockResolvedValue({
        data: { idToken: null },
      });

      await expect(authService.nativeSignInWithGoogle()).rejects.toThrow(
        "No ID token returned from Google Sign-In"
      );
    });

    it("should sign out on Android before signing in", async () => {
      Object.defineProperty(Platform, "OS", {
        get: () => "android",
        configurable: true,
      });

      const mockIdToken = "mock-google-id-token";
      (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
      (GoogleSignin.signOut as jest.Mock).mockResolvedValue(undefined);
      (GoogleSignin.signIn as jest.Mock).mockResolvedValue({
        data: { idToken: mockIdToken },
      });

      await authService.nativeSignInWithGoogle();

      expect(GoogleSignin.signOut).toHaveBeenCalled();
    });
  });

  describe("nativeSignInWithApple", () => {
    it("should sign in with Apple successfully on iOS", async () => {
      const mockIdentityToken = "mock-apple-identity-token";

      Object.defineProperty(Platform, "OS", {
        get: () => "ios",
        configurable: true,
      });

      (AppleAuthentication.signInAsync as jest.Mock).mockResolvedValue({
        identityToken: mockIdentityToken,
      });

      const result = await authService.nativeSignInWithApple();

      expect(AppleAuthentication.signInAsync).toHaveBeenCalledWith({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      expect(result.identityToken).toBe(mockIdentityToken);
    });

    it("should reject Apple Sign-In on Android", async () => {
      Object.defineProperty(Platform, "OS", {
        get: () => "android",
        configurable: true,
      });

      await expect(authService.nativeSignInWithApple()).rejects.toThrow(
        "Apple Sign-In is only available on iOS"
      );
    });

    it("should handle missing identity token", async () => {
      Object.defineProperty(Platform, "OS", {
        get: () => "ios",
        configurable: true,
      });

      (AppleAuthentication.signInAsync as jest.Mock).mockResolvedValue({
        identityToken: null,
      });

      await expect(authService.nativeSignInWithApple()).rejects.toThrow(
        "No identity token returned from Apple Sign-In"
      );
    });
  });
});
