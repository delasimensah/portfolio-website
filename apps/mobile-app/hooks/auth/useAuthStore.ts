import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { User } from "shared";
import {
  handleAuthError,
  resendVerificationCode,
  sendPasswordResetEmail,
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
  updateUserPassword,
  verifyEmailOTP,
} from "shared";

import { supabase } from "@/services";

interface AuthState {
  isLoading: boolean;
  isInitialized: boolean;
  user: User | null;
  tempEmail: string | null; // Temporary storage for email during OTP verification
}

interface AuthActions {
  setInitialized: (isInitialized: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setUser: (user: User | null) => void;
  setTempEmail: (email: string | null) => void;
  resetAuthState: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationCode: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      isInitialized: false,
      user: null,
      tempEmail: null,

      setInitialized: (isInitialized: boolean) => set({ isInitialized }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setUser: (user: User | null) => set({ user }),
      setTempEmail: (email: string | null) => set({ tempEmail: email }),

      resetAuthState: () =>
        set({
          user: null,
          tempEmail: null,
          isInitialized: true,
        }),

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { session, user: supabaseUser } = await signInWithEmail(
            supabase,
            email,
            password
          );

          if (!session || !supabaseUser) {
            throw new Error("No session returned from sign in");
          }

          // Extract user from Supabase user
          const user: User = {
            id: supabaseUser.id,
            email: supabaseUser.email || email,
            name:
              supabaseUser.user_metadata?.name ||
              supabaseUser.user_metadata?.full_name,
            ...supabaseUser.user_metadata,
          };

          set({
            user,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          const authError = handleAuthError(error as any);
          throw new Error(authError.message);
        }
      },

      signUp: async (email: string, password: string, fullName?: string) => {
        set({ isLoading: true });
        try {
          await signUpWithEmail(supabase, email, password, {
            metadata: {
              ...(fullName && { full_name: fullName }),
            },
          });

          // Store email temporarily for OTP verification
          set({
            tempEmail: email,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          const authError = handleAuthError(error as any);
          throw new Error(authError.message);
        }
      },

      verifyEmail: async (token: string) => {
        const email = get().tempEmail;

        if (!email) {
          throw new Error("Email not found. Please sign up again.");
        }

        set({ isLoading: true });
        try {
          const { session, user: supabaseUser } = await verifyEmailOTP(
            supabase,
            email,
            token
          );

          if (!session || !supabaseUser) {
            throw new Error("No session returned from OTP verification");
          }

          const user: User = {
            id: supabaseUser.id,
            email: supabaseUser.email || email,
            name:
              supabaseUser.user_metadata?.name ||
              supabaseUser.user_metadata?.full_name,
            ...supabaseUser.user_metadata,
          };

          set({
            user,
            tempEmail: null,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          const authError = handleAuthError(error as any);
          throw new Error(authError.message);
        }
      },

      resendVerificationCode: async () => {
        set({ isLoading: true });
        try {
          const email = get().tempEmail;
          if (!email) {
            throw new Error("Email not found. Please sign up again.");
          }

          await resendVerificationCode(supabase, email);

          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          const authError = handleAuthError(error as any);
          throw new Error(authError.message);
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true });
        try {
          // Customize redirect URL based on your app scheme
          const redirectUrl = "yourapp://auth/reset-password";

          await sendPasswordResetEmail(supabase, email, redirectUrl);

          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          const authError = handleAuthError(error as any);
          throw new Error(authError.message);
        }
      },

      updatePassword: async (password: string) => {
        set({ isLoading: true });
        try {
          await updateUserPassword(supabase, password);

          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          const authError = handleAuthError(error as any);
          throw new Error(authError.message);
        }
      },

      signOut: async () => {
        try {
          await signOutUser(supabase);
          get().resetAuthState();
        } catch (error) {
          const authError = handleAuthError(error as any);
          throw new Error(authError.message);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        tempEmail: state.tempEmail,
      }),
    }
  )
);
