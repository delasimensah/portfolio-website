// Mock must be defined before any imports that depend on it
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Store callback in module scope so tests can access it
let authStateChangeCallback: ((event: string, session: any) => void) | null =
  null;
const mockUnsubscribe = jest.fn();

jest.mock("@/services", () => ({
  supabase: {
    auth: {
      onAuthStateChange: jest.fn((callback) => {
        authStateChangeCallback = callback;
        return {
          data: { subscription: { unsubscribe: mockUnsubscribe } },
        };
      }),
      getSession: jest.fn(),
    },
  },
}));

import { getSession } from "shared";
import { renderHook, waitFor } from "@testing-library/react-native";

import { supabase } from "@/services";

import { useAuthInitialize } from "../useAuthInitialize";

// Mock shared
jest.mock("shared", () => ({
  getSession: jest.fn(),
}));

// Mock useAuthStore
const mockSetInitialized = jest.fn();
const mockResetAuthState = jest.fn();

jest.mock("../useAuthStore", () => ({
  useAuthStore: jest.fn(() => ({
    setInitialized: mockSetInitialized,
    resetAuthState: mockResetAuthState,
  })),
}));

describe("useAuthInitialize", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authStateChangeCallback = null;
    (getSession as jest.Mock).mockResolvedValue({
      session: { access_token: "token" },
    });
  });

  it("should set up auth state change listener on mount", () => {
    renderHook(() => useAuthInitialize());

    expect(supabase.auth.onAuthStateChange).toHaveBeenCalled();
  });

  it("should call resetAuthState when SIGNED_OUT event occurs", () => {
    renderHook(() => useAuthInitialize());

    // Wait for callback to be set
    expect(authStateChangeCallback).not.toBeNull();

    // Simulate SIGNED_OUT event
    if (authStateChangeCallback) {
      authStateChangeCallback("SIGNED_OUT", null);
    }

    expect(mockResetAuthState).toHaveBeenCalled();
  });

  it("should log token refresh event", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    renderHook(() => useAuthInitialize());

    // Wait for callback to be set
    expect(authStateChangeCallback).not.toBeNull();

    // Simulate TOKEN_REFRESHED event
    if (authStateChangeCallback) {
      authStateChangeCallback("TOKEN_REFRESHED", {
        access_token: "new-token",
      });
    }

    expect(consoleSpy).toHaveBeenCalledWith(
      "useAuthInitialize: Token refreshed"
    );
    consoleSpy.mockRestore();
  });

  it("should log when session is lost", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    renderHook(() => useAuthInitialize());

    // Wait for callback to be set
    expect(authStateChangeCallback).not.toBeNull();

    // Simulate event with null session (but not SIGNED_OUT)
    if (authStateChangeCallback) {
      authStateChangeCallback("SIGNED_IN", null);
    }

    expect(consoleSpy).toHaveBeenCalledWith("useAuthInitialize: No session");
    consoleSpy.mockRestore();
  });

  it("should set initialized state on mount", async () => {
    renderHook(() => useAuthInitialize());

    // Wait for getSession to complete
    await waitFor(
      () => {
        expect(getSession).toHaveBeenCalled();
        expect(mockSetInitialized).toHaveBeenCalledWith(true);
      },
      { timeout: 1000 }
    );
  });

  it("should clean up subscription on unmount", () => {
    const { unmount } = renderHook(() => useAuthInitialize());

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it("should call getSession on mount even if it might fail", async () => {
    // This test verifies that getSession is called during initialization
    renderHook(() => useAuthInitialize());

    // Wait for getSession to be called
    await waitFor(
      () => {
        expect(getSession).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });
});
