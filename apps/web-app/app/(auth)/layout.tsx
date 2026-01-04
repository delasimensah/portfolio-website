import { Box } from "@mantine/core";
import React from "react";

/**
 * Auth Layout
 *
 * Layout for authentication pages (sign-in, sign-up, etc.).
 *
 * Customize:
 * - Add route protection to redirect authenticated users
 * - Add background, logo, or other shared UI elements
 * - Adjust styling as needed
 */
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  // Customize: Uncomment to redirect authenticated users
  // import { createServerClient } from "@/services";
  // import { redirect } from "next/navigation";
  //
  // const supabase = await createServerClient();
  // const { data: { user } } = await supabase.auth.getUser();
  //
  // if (user) {
  //   redirect("/");
  // }
  //
  // Alternative: Use Refine's <Authenticated> component in the layout
  // import { Authenticated } from "@refinedev/core";
  // import { LoadingScreen } from "@/components";
  //
  // return (
  //   <Authenticated
  //     fallback={<Box className="min-h-screen bg-black">{children}</Box>}
  //     loading={<LoadingScreen />}
  //   >
  //     <LoadingScreen />
  //   </Authenticated>
  // );

  return <Box className="min-h-screen bg-black">{children}</Box>;
};

export default AuthLayout;
