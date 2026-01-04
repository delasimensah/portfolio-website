// Services Barrel Export
// Export all services from this file

// Supabase auth services
export {
  getSession,
  getCurrentUser,
  signUpWithEmail,
  signInWithEmail,
  verifyEmailOTP,
  resendVerificationCode,
  sendPasswordResetEmail,
  updateUserPassword,
  updateUserMetadata,
  signOutUser,
} from "./supabase/auth";

// Supabase OAuth services
export {
  signInWithGoogleWeb,
  signInWithGoogleMobile,
  signInWithAppleWeb,
  signInWithAppleMobile,
  signInWithGitHubWeb,
  signInWithOAuth,
} from "./supabase/oauth";

// Supabase user data services
export {
  getUserById,
  getUsers,
  updateUser,
  createUser,
} from "./supabase/users";
