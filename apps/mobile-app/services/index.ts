// Services Barrel Export
// Export all services from this file

// Supabase services
export { supabase } from "./supabase/client";

// Auth services (native OAuth wrappers)
export {
  nativeSignInWithApple,
  nativeSignInWithGoogle,
} from "./auth/authService";
