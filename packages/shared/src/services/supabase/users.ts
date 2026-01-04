import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "../../types/database";

/**
 * Get user by ID from users table
 * @param client - Supabase client instance
 * @param userId - User ID
 * @returns User data or null
 */
export const getUserById = async (
  client: SupabaseClient<Database>,
  userId: string
) => {
  const { data, error } = await client
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }

  return data;
};

/**
 * Get all users (with optional pagination)
 * @param client - Supabase client instance
 * @param options - Query options (limit, offset)
 * @returns Array of users
 */
export const getUsers = async (
  client: SupabaseClient<Database>,
  options?: {
    limit?: number;
    offset?: number;
  }
) => {
  let query = client.from("users").select("*");

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(
      options.offset,
      options.offset + (options.limit || 10) - 1
    );
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }

  return data || [];
};

/**
 * Update user by ID
 * @param client - Supabase client instance
 * @param userId - User ID
 * @param updates - Fields to update
 * @returns Updated user data
 */
export const updateUser = async (
  client: SupabaseClient<Database>,
  userId: string,
  updates: Partial<Database["public"]["Tables"]["users"]["Row"]>
) => {
  const { data, error } = await client
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }

  return data;
};

/**
 * Create a new user in users table
 * @param client - Supabase client instance
 * @param userData - User data to insert
 * @returns Created user data
 */
export const createUser = async (
  client: SupabaseClient<Database>,
  userData: Omit<
    Database["public"]["Tables"]["users"]["Row"],
    "id" | "created_at" | "updated_at"
  >
) => {
  const { data, error } = await client
    .from("users")
    .insert(userData)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }

  return data;
};
