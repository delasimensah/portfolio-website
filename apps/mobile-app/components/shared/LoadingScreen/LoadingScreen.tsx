import React from "react";

import { VStack } from "../../ui/Stack/Stack";
import Text from "../../ui/Text/Text";

/**
 * LoadingScreen Component
 *
 * Generic loading screen for initial load states.
 * Uses Tailwind for all styling.
 *
 * Customize:
 * - Add logo/image if needed
 * - Adjust colors and spacing
 * - Add animation if desired
 */
const LoadingScreen: React.FC = () => {
  return (
    <VStack align="center" justify="center" className="flex-1 bg-black">
      <Text className="text-lg text-white">Loading...</Text>
    </VStack>
  );
};

export default LoadingScreen;
