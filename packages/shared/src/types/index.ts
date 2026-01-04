// Types Barrel Export
// Export all types from this file

// Database types (generated from Supabase)
export type { Database } from "./database";

// Generic types
export interface User {
  id: string;
  email: string;
  name?: string;
  [key: string]: unknown; // Allow additional user properties
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
