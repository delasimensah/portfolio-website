/**
 * "use client" directive is required for Next.js App Router compatibility.
 * This file uses React Query hooks (useQuery) which can only be used in
 * Client Components. Next.js will throw an error if this directive is missing.
 *
 * Note: This directive is ignored by React Native/Metro bundler, so it's safe
 * to include in shared code used by both web and mobile platforms.
 */
"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";

import { createUser,getUserById, getUsers, updateUser } from "../../services";
import type { Database } from "../../types/database";

/**
 * Hook arguments type
 */
export type UseUserByIdArgs = {
  client: SupabaseClient<Database>;
  userId: string;
  options?: {
    enabled?: boolean;
  };
};

export type UseUsersArgs = {
  client: SupabaseClient<Database>;
  options?: {
    limit?: number;
    offset?: number;
    enabled?: boolean;
  };
};

export type UseUpdateUserArgs = {
  client: SupabaseClient<Database>;
  userId: string;
};

export type UseCreateUserArgs = {
  client: SupabaseClient<Database>;
};

/**
 * Fetch user by ID
 * @param args - Hook arguments
 * @returns Query result with user data
 */
export const useUserById = ({
  client,
  userId,
  options,
}: UseUserByIdArgs): UseQueryResult<
  Database["public"]["Tables"]["users"]["Row"] | null,
  Error
> => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(client, userId),
    enabled: options?.enabled !== false && !!userId,
  });
};

/**
 * Fetch all users (with optional pagination)
 * @param args - Hook arguments
 * @returns Query result with users array
 */
export const useUsers = ({
  client,
  options,
}: UseUsersArgs): UseQueryResult<
  Database["public"]["Tables"]["users"]["Row"][],
  Error
> => {
  return useQuery({
    queryKey: ["users", options?.limit, options?.offset],
    queryFn: () => getUsers(client, options),
    enabled: options?.enabled !== false,
  });
};

/**
 * Update user mutation
 * @param args - Hook arguments
 * @returns Mutation object
 */
export const useUpdateUser = ({ client, userId }: UseUpdateUserArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      updates: Partial<Database["public"]["Tables"]["users"]["Row"]>
    ) => updateUser(client, userId, updates),
    onSuccess: () => {
      // Invalidate and refetch user queries
      queryClient.invalidateQueries({ queryKey: ["users", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

/**
 * Create user mutation
 * @param args - Hook arguments
 * @returns Mutation object
 */
export const useCreateUser = ({ client }: UseCreateUserArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      userData: Omit<
        Database["public"]["Tables"]["users"]["Row"],
        "id" | "created_at" | "updated_at"
      >
    ) => createUser(client, userData),
    onSuccess: () => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
