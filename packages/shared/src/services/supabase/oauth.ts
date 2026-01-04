import type { SupabaseClient } from "@supabase/supabase-js";

import { handleAuthError } from "../../utils";

/**
 * Sign in with Google (Web)
 * Uses OAuth redirect flow for web browsers
 * @param client - Supabase client instance
 * @param redirectUrl - URL to redirect to after OAuth (e.g., "/api/auth/callback")
 * @returns OAuth data
 */
export const signInWithGoogleWeb = async (
  client: SupabaseClient,
  redirectUrl: string
) => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  return data;
};

/**
 * Sign in with Google (Mobile)
 * Uses ID token from native Google Sign-In
 * @param client - Supabase client instance
 * @param idToken - ID token from Google Sign-In SDK
 * @returns Session data
 */
export const signInWithGoogleMobile = async (
  client: SupabaseClient,
  idToken: string
) => {
  const { data, error } = await client.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  return { session: data.session };
};

/**
 * Sign in with Apple (Web)
 * Uses OAuth redirect flow for web browsers
 * @param client - Supabase client instance
 * @param redirectUrl - URL to redirect to after OAuth (e.g., "/api/auth/callback")
 * @returns OAuth data
 */
export const signInWithAppleWeb = async (
  client: SupabaseClient,
  redirectUrl: string
) => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "apple",
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  return data;
};

/**
 * Sign in with Apple (Mobile)
 * Uses identity token from native Apple Sign-In
 * @param client - Supabase client instance
 * @param identityToken - Identity token from Apple Sign-In SDK
 * @returns Session data
 */
export const signInWithAppleMobile = async (
  client: SupabaseClient,
  identityToken: string
) => {
  const { data, error } = await client.auth.signInWithIdToken({
    provider: "apple",
    token: identityToken,
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  return { session: data.session };
};

/**
 * Sign in with GitHub (Web)
 * Uses OAuth redirect flow for web browsers
 * @param client - Supabase client instance
 * @param redirectUrl - URL to redirect to after OAuth (e.g., "/api/auth/callback")
 * @returns OAuth data
 */
export const signInWithGitHubWeb = async (
  client: SupabaseClient,
  redirectUrl: string
) => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  return data;
};

/**
 * Generic OAuth sign in (Web)
 * Use this for any OAuth provider supported by Supabase
 * @param client - Supabase client instance
 * @param provider - OAuth provider name (e.g., "google", "apple", "github", "discord", etc.)
 * @param redirectUrl - URL to redirect to after OAuth
 * @param options - Additional OAuth options (scopes, queryParams, etc.)
 * @returns OAuth data
 */
export const signInWithOAuth = async (
  client: SupabaseClient,
  provider: string,
  redirectUrl: string,
  options?: {
    scopes?: string;
    queryParams?: Record<string, string>;
  }
) => {
  const { data, error } = await client.auth.signInWithOAuth({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider: provider as any, // Supabase Provider type is not exported, using string with type assertion
    options: {
      redirectTo: redirectUrl,
      scopes: options?.scopes,
      queryParams: options?.queryParams,
    },
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  return data;
};
