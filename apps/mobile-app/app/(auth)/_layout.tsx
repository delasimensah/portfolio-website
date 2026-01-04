import { Stack } from "expo-router";
import React from "react";

/**
 * Auth Layout
 *
 * Layout for authentication screens (sign-in, sign-up, etc.).
 *
 * Customize:
 * - Add route protection to redirect authenticated users
 * - Add shared header/navigation
 * - Adjust screen options
 */
const AuthLayout = () => {
  // Customize: Uncomment to redirect authenticated users
  // import { useAuthStore } from "@/hooks";
  // import { Redirect } from "expo-router";
  //
  // const { user } = useAuthStore();
  //
  // if (user) {
  //   return <Redirect href="/(main-app)/(tabs)/home" />;
  // }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#000000" },
      }}
    >
      {/* Customize: Add auth screens */}
      {/* <Stack.Screen name="sign-in" /> */}
      {/* <Stack.Screen name="sign-up" /> */}
    </Stack>
  );
};

export default AuthLayout;
