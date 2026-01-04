"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { LoadingScreen } from "@/components";
import { supabase } from "@/services";

/**
 * Auth Callback Page
 *
 * Client-side callback page that runs after OAuth redirect.
 * This page handles any additional authentication steps needed after
 * the server-side callback has exchanged the code for a session.
 *
 * Customize:
 * - Add any additional session processing (e.g., backend token exchange)
 * - Update redirect paths based on your app structure
 * - Add loading states or error handling UI
 * - Integrate with your auth store/state management
 *
 * @example
 * ```tsx
 * // If you need to complete backend auth:
 * import { completeBackendAuth } from "@/services";
 *
 * const session = await supabase.auth.getSession();
 * if (session) {
 *   await completeBackendAuth(session);
 * }
 * ```
 */
const AuthCallbackPage = () => {
  const router = useRouter();
  const hasProcessed = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      // Prevent duplicate execution
      if (hasProcessed.current) {
        return;
      }

      hasProcessed.current = true;

      try {
        // Get session from Supabase (session was already exchanged by API route)
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          console.error("No session found:", sessionError);
          // Customize: Update redirect path to match your auth page
          router.push("/auth");
          return;
        }

        // Customize: Add any additional authentication steps here
        // Examples:
        // - Exchange Supabase session for backend token
        // - Update user metadata
        // - Initialize user state/store
        // - Check onboarding status

        // Example: Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("Error getting user:", userError);
          router.push("/auth");
          return;
        }

        // Customize: Update redirect path based on your app structure
        // Redirect to home/dashboard on success
        router.push("/");
      } catch (error) {
        console.error("Callback error:", error);
        // Customize: Update redirect path to match your auth page
        router.push("/auth");
      }
    };

    handleCallback();
  }, [router]);

  return <LoadingScreen />;
};

export default AuthCallbackPage;
