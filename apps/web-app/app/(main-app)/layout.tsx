import { Box } from "@mantine/core";
import React from "react";

/**
 * Main App Layout
 *
 * Layout for authenticated main application pages.
 *
 * Customize:
 * - Add navigation header/sidebar
 * - Add route protection to require authentication
 * - Add onboarding check
 * - Adjust styling as needed
 */
const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
  // Customize: Uncomment to add route protection
  // import { createServerClient } from "@/services";
  // import { redirect } from "next/navigation";
  //
  // const supabase = await createServerClient();
  // const { data: { user } } = await supabase.auth.getUser();
  //
  // if (!user) {
  //   redirect("/auth");
  // }
  //
  // // Check onboarding status if needed
  // if (!user.user_metadata?.hasOnboarded) {
  //   redirect("/onboarding");
  // }
  //
  // Alternative: Use Refine's <Authenticated> component
  // import { Authenticated } from "@refinedev/core";
  // import { LoadingScreen } from "@/components";
  //
  // return (
  //   <Authenticated
  //     fallback={<LoadingScreen />}
  //     loading={<LoadingScreen />}
  //   >
  //     <Box className="min-h-screen bg-black">
  //       {children}
  //     </Box>
  //   </Authenticated>
  // );

  return (
    <Box className="min-h-screen bg-black">
      {/* Customize: Add navigation, header, sidebar, etc. */}
      {children}
    </Box>
  );
};

export default MainAppLayout;
