import { Stack } from "expo-router";
import React from "react";

/**
 * Main App Layout
 *
 * Layout for authenticated main application screens.
 *
 * Customize:
 * - Add tab navigation
 * - Add route protection to require authentication
 * - Add onboarding check
 * - Adjust screen options
 */
const MainAppLayout = () => {
  // Customize: Uncomment to add route protection
  // import { useAuthStore } from "@/hooks";
  // import { Redirect } from "expo-router";
  //
  // const { user } = useAuthStore();
  //
  // if (!user) {
  //   return <Redirect href="/(auth)/sign-in" />;
  // }
  //
  // // Check onboarding status if needed
  // if (!user.hasOnboarded) {
  //   return <Redirect href="/(onboarding)" />;
  // }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#000000" },
      }}
    >
      {/* Customize: Add main app screens */}
      {/* <Stack.Screen name="(tabs)" /> */}
    </Stack>
  );
};

export default MainAppLayout;
