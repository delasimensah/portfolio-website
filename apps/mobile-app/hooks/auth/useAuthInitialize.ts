import { getSession } from "shared";
import { useEffect } from "react";

import { supabase } from "@/services";

import { useAuthStore } from "./useAuthStore";

/**
 * Hook to initialize authentication state on app mount
 * Sets up auth state change listener and checks initial session
 */
export const useAuthInitialize = () => {
  const { setInitialized, resetAuthState } = useAuthStore();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        return resetAuthState();
      } else if (event === "TOKEN_REFRESHED") {
        // eslint-disable-next-line no-console
        console.log("useAuthInitialize: Token refreshed");
      } else if (!session) {
        // eslint-disable-next-line no-console
        console.log("useAuthInitialize: No session");
      }
    });

    // Check initial session on mount
    const checkInitialSession = async () => {
      await getSession(supabase);
      setInitialized(true);
    };

    checkInitialSession();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [resetAuthState, setInitialized]);
};
