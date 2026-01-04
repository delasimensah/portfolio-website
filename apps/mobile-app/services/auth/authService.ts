import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import Constants from "expo-constants";
import { Platform } from "react-native";

/**
 * Native Apple Sign-In wrapper
 *
 * Customize:
 * - Add error handling specific to your app
 * - Add analytics/logging if needed
 *
 * @returns Promise with identityToken for Supabase auth
 */
export const nativeSignInWithApple = async () => {
  if (Platform.OS !== "ios") {
    throw new Error("Apple Sign-In is only available on iOS");
  }

  // Trigger Apple Sign-In
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  // Extract identity token
  const { identityToken } = credential;

  if (!identityToken) {
    throw new Error("No identity token returned from Apple Sign-In");
  }

  return { identityToken };
};

/**
 * Native Google Sign-In wrapper
 *
 * Customize:
 * - Configure Google Sign-In with your client IDs
 * - Add error handling specific to your app
 * - Add analytics/logging if needed
 *
 * @returns Promise with idToken for Supabase auth
 */
export const nativeSignInWithGoogle = async () => {
  // Configure Google Sign-In
  // Customize: Add your Google client IDs to app.config.ts
  GoogleSignin.configure({
    iosClientId: Constants.expoConfig?.extra?.googleIosClientId,
    webClientId: Constants.expoConfig?.extra?.googleWebClientId,
  });

  try {
    // Check if play services are available (Android only)
    await GoogleSignin.hasPlayServices();

    // Force sign out on Android to show account picker
    if (Platform.OS === "android") {
      await GoogleSignin.signOut();
    }

    // Trigger Google Sign-In
    const response = await GoogleSignin.signIn();

    // Extract ID token from response
    const idToken = response.data?.idToken;

    if (!idToken) {
      throw new Error("No ID token returned from Google Sign-In");
    }

    return { idToken };
  } catch (error: any) {
    // Handle Google Sign-In specific errors
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error("User cancelled the login flow");
    }

    if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error("Sign-in is already in progress");
    }

    if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error("Play services not available or outdated");
    }

    throw error instanceof Error ? error : new Error("Google Sign-In failed");
  }
};
