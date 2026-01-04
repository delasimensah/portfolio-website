import { Link, Stack } from "expo-router";
import React from "react";

import { Text, VStack } from "@/components";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <VStack align="center" justify="center" className="flex-1 bg-black p-5">
        <Text className="font-font-bold mb-4 text-center text-xl text-white">
          This screen doesn&apos;t exist.
        </Text>
        <Link href="/" className="mt-4">
          <Text className="text-base text-grey">Go to home screen!</Text>
        </Link>
      </VStack>
    </>
  );
};

export default NotFoundScreen;
