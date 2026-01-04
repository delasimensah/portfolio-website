import { StatusBar } from "expo-status-bar";

import { Text, VStack } from "@/components";

const HomeScreen = () => {
  return (
    <VStack align="center" justify="center" className="flex-1 bg-black p-5">
      <StatusBar style="light" />
      <Text className="font-font-bold mb-4 text-center text-2xl text-white">
        Welcome to Template App
      </Text>
      <Text className="text-center text-base text-grey">
        This is a starter mobile app built with Expo Router
      </Text>
    </VStack>
  );
};

export default HomeScreen;
