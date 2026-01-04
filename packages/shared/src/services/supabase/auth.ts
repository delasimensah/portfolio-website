import type { SupabaseClient } from "@supabase/supabase-js";

import { handleAuthError } from "../../utils";

/**
 * Get current Supabase session
 * @param client - Supabase client instance
 * @returns Current session or null
 */
export const getSession = async (client: SupabaseClient) => {
  const {
    data: { session },
    error,
  } = await client.auth.getSession();

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  return session;
};

/**
 * Get current authenticated user
 * @param client - Supabase client instance
 * @returns Current user or null
 */
export const getCurrentUser = async (client: SupabaseClient) => {
  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  return user;
};

/**
 * Sign up with email and password
 * @param client - Supabase client instance
 * @param email - User email
 * @param password - User password
 * @param options - Optional signup options (e.g., redirectUrl, metadata)
 * @returns Session data
 */
export const signUpWithEmail = async (
  client: SupabaseClient,
  email: string,
  password: string,
  options?: {
    redirectUrl?: string;
    metadata?: Record<string, unknown>;
  }
) => {
  const { data: authData, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: options?.metadata || {},
      emailRedirectTo: options?.redirectUrl,
    },
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  return {
    session: authData.session,
    user: authData.user,
  };
};

/**
 * Sign in with email and password
 * @param client - Supabase client instance
 * @param email - User email
 * @param password - User password
 * @returns Session data
 */
export const signInWithEmail = async (
  client: SupabaseClient,
  email: string,
  password: string
) => {
  const { data: authData, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  return {
    session: authData.session,
    user: authData.user,
  };
};

/**
 * Verify email OTP
 * @param client - Supabase client instance
 * @param email - User email
 * @param token - OTP token
 * @returns Session data
 */
export const verifyEmailOTP = async (
  client: SupabaseClient,
  email: string,
  token: string
) => {
  const { data, error } = await client.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  return {
    session: data.session,
    user: data.user,
  };
};

/**
 * Resend verification code
 * @param client - Supabase client instance
 * @param email - User email
 */
export const resendVerificationCode = async (
  client: SupabaseClient,
  email: string
) => {
  const { error } = await client.auth.resend({
    type: "signup",
    email,
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }
};

/**
 * Send password reset email
 * @param client - Supabase client instance
 * @param email - User email
 * @param redirectUrl - URL to redirect to after password reset
 */
export const sendPasswordResetEmail = async (
  client: SupabaseClient,
  email: string,
  redirectUrl: string
) => {
  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }
};

/**
 * Update user password
 * @param client - Supabase client instance
 * @param password - New password
 */
export const updateUserPassword = async (
  client: SupabaseClient,
  password: string
) => {
  const { error } = await client.auth.updateUser({
    password,
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }
};

/**
 * Update user metadata
 * @param client - Supabase client instance
 * @param metadata - Metadata to update
 * @returns Updated user
 */
export const updateUserMetadata = async (
  client: SupabaseClient,
  metadata: Record<string, unknown>
) => {
  const { data, error } = await client.auth.updateUser({
    data: metadata,
  });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  return data.user;
};

/**
 * Sign out current user
 * @param client - Supabase client instance
 */
export const signOutUser = async (client: SupabaseClient) => {
  const { error } = await client.auth.signOut();

  if (error && error.message !== "Auth session missing!") {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }
};
