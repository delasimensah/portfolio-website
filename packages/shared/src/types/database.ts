/**
 * Supabase Database Types
 *
 * This file should be generated from your Supabase project.
 *
 * To generate types:
 * 1. Install Supabase CLI: npm install -g supabase
 * 2. Login: supabase login
 * 3. Link your project: supabase link --project-ref your-project-ref
 * 4. Generate types: supabase gen types typescript --linked > src/types/database.ts
 *
 * Or use the Supabase dashboard:
 * 1. Go to Settings > API
 * 2. Scroll to "TypeScript types"
 * 3. Copy the generated types and paste them here
 *
 * Example structure (replace with your actual generated types):
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          // Add other user fields as needed
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Add other tables as needed
    };
    Views: {
      // Add views if any
      [_ in never]: never;
    };
    Functions: {
      // Add functions if any
      [_ in never]: never;
    };
    Enums: {
      // Add enums if any
      [_ in never]: never;
    };
  };
}
