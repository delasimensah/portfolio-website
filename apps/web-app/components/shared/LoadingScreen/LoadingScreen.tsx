import { Box } from "@mantine/core";
import React from "react";

import Text from "../../ui/Text/Text";

/**
 * LoadingScreen Component
 *
 * Generic loading screen for Suspense boundaries and initial load states.
 * Uses Tailwind for all styling.
 *
 * Customize:
 * - Add logo/image if needed
 * - Adjust colors and spacing
 * - Add animation if desired
 */
const LoadingScreen: React.FC = () => {
  return (
    <Box className="flex min-h-screen items-center justify-center bg-black">
      <Text className="text-lg text-white">Loading...</Text>
    </Box>
  );
};

export default LoadingScreen;
