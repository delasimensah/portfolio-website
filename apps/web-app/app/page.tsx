import { Box } from "@mantine/core";
import React from "react";

import { Text } from "@/components";

const HomePage = () => {
  return (
    <Box className="flex min-h-screen items-center justify-center bg-black p-16">
      <Box className="max-w-md">
        <Text className="mb-4 text-3xl font-bold text-white">
          Welcome to Template App
        </Text>
        <Text className="text-lg text-grey">
          This is a starter web app built with Next.js 15 and Mantine
        </Text>
      </Box>
    </Box>
  );
};

export default HomePage;
