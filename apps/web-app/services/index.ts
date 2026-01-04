// Services Barrel Export
// Export all services from this file

// Supabase services (client-side)
export { supabase } from "./supabase/client";

// Note: Server-side Supabase client (./supabase/server) is not exported here
// because it uses next/headers which is server-only. Import it directly:
// import { createClient } from "@/services/supabase/server";

// Supabase middleware
export { updateSession } from "./supabase/middleware";

// Auth services
// export { signInWithEmail, signOutUser } from "./auth/authService";

// API services
// export { apiClient } from "./api/client";
