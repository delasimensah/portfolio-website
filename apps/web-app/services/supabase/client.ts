import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for browser/client-side usage.
 * Singleton instance used in client components, hooks, and client-side code.
 */
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
