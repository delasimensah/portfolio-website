// Mock must be defined before any imports that depend on it
jest.mock("@/services/supabase/client", () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      verifyOtp: jest.fn(),
      resend: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      updateUser: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  },
}));

import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook } from "@testing-library/react-native";

import * as services from "@/services";

import { useAuthStore } from "../useAuthStore";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("useAuthStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      isLoading: false,
      isInitialized: false,
      user: null,
      tempEmail: null,
    });
  });

  describe("Initial State", () => {
    it("should have correct initial state", () => {
      const state = useAuthStore.getState();

      expect(state.isLoading).toBe(false);
      expect(state.isInitialized).toBe(false);
      expect(state.user).toBeNull();
      expect(state.tempEmail).toBeNull();
    });
  });

  describe("State Setters", () => {
    it("should set loading state", () => {
      act(() => {
        useAuthStore.getState().setLoading(true);
      });

      expect(useAuthStore.getState().isLoading).toBe(true);
    });

    it("should set user data", () => {
      const mockUser = {
        id: "123",
        email: "test@example.com",
        name: "Test User",
      };

      act(() => {
        useAuthStore.getState().setUser(mockUser);
      });

      expect(useAuthStore.getState().user).toEqual(mockUser);
    });

    it("should set tempEmail", () => {
      act(() => {
        useAuthStore.getState().setTempEmail("test@example.com");
      });

      expect(useAuthStore.getState().tempEmail).toBe("test@example.com");
    });
  });

  describe("setInitialized", () => {
    it("should mark as initialized", () => {
      act(() => {
        useAuthStore.getState().setInitialized(true);
      });

      expect(useAuthStore.getState().isInitialized).toBe(true);
    });
  });

  describe("signIn", () => {
    it("should successfully sign in user", async () => {
      const mockSession = {
        access_token: "token",
        refresh_token: "refresh",
        expires_in: 3600,
        token_type: "bearer" as const,
        user: {
          id: "123",
          email: "test@example.com",
          user_metadata: { name: "Test User" },
        },
      };

      (
        services.supabase.auth.signInWithPassword as jest.Mock
      ).mockResolvedValue({
        data: { session: mockSession, user: mockSession.user },
        error: null,
      });

      await act(async () => {
        await useAuthStore.getState().signIn("test@example.com", "password123");
      });

      const state = useAuthStore.getState();
      expect(state.user).toBeDefined();
      expect(state.user?.email).toBe("test@example.com");
      expect(state.isLoading).toBe(false);
    });

    it("should handle sign in errors", async () => {
      (
        services.supabase.auth.signInWithPassword as jest.Mock
      ).mockResolvedValue({
        data: { session: null, user: null },
        error: { message: "Invalid credentials" },
      });

      await expect(
        act(async () => {
          await useAuthStore.getState().signIn("test@example.com", "wrong");
        })
      ).rejects.toBeDefined();

      expect(useAuthStore.getState().isLoading).toBe(false);
    });
  });

  describe("signUp", () => {
    it("should successfully sign up user", async () => {
      (services.supabase.auth.signUp as jest.Mock).mockResolvedValue({
        data: { user: { id: "123", email: "test@example.com" }, session: null },
        error: null,
      });

      await act(async () => {
        await useAuthStore
          .getState()
          .signUp("test@example.com", "password123", "Test User");
      });

      const state = useAuthStore.getState();
      expect(state.tempEmail).toBe("test@example.com");
      expect(state.isLoading).toBe(false);
    });
  });

  describe("resetAuthState", () => {
    it("should reset all auth state", () => {
      act(() => {
        useAuthStore.getState().setUser({
          id: "123",
          email: "test@example.com",
          name: "Test User",
        });
        useAuthStore.getState().setTempEmail("test@example.com");
      });

      act(() => {
        useAuthStore.getState().resetAuthState();
      });

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.tempEmail).toBeNull();
      expect(state.isInitialized).toBe(true);
    });
  });

  describe("signOut", () => {
    it("should call signOut and reset state", async () => {
      (services.supabase.auth.signOut as jest.Mock).mockResolvedValue({
        error: null,
      });

      await act(async () => {
        await useAuthStore.getState().signOut();
      });

      expect(services.supabase.auth.signOut).toHaveBeenCalled();
      expect(useAuthStore.getState().user).toBeNull();
    });
  });

  describe("Hook Usage", () => {
    it("should work when used as a hook", () => {
      const { result } = renderHook(() => useAuthStore());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isInitialized).toBe(false);
      expect(result.current.user).toBeNull();
    });
  });
});
