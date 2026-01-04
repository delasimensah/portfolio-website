/**
 * Wrapper hooks for user data fetching
 * These hooks inject the supabase client into shared hooks
 */

import {
  useCreateUser as useCreateUserShared,
  useUpdateUser as useUpdateUserShared,
  useUserById as useUserByIdShared,
  useUsers as useUsersShared,
} from "shared";

import { supabase } from "@/services";

/**
 * Fetch user by ID
 * @param userId - User ID
 * @returns Query result with user data
 */
export const useUser = (userId: string) => {
  return useUserByIdShared({
    client: supabase,
    userId,
  });
};

/**
 * Fetch all users (with optional pagination)
 * @param options - Query options (limit, offset, enabled)
 * @returns Query result with users array
 */
export const useUsersList = (options?: {
  limit?: number;
  offset?: number;
  enabled?: boolean;
}) => {
  return useUsersShared({
    client: supabase,
    options,
  });
};

/**
 * Update user mutation
 * @param userId - User ID to update
 * @returns Mutation object
 */
export const useUpdateUser = (userId: string) => {
  return useUpdateUserShared({
    client: supabase,
    userId,
  });
};

/**
 * Create user mutation
 * @returns Mutation object
 */
export const useCreateUser = () => {
  return useCreateUserShared({
    client: supabase,
  });
};
