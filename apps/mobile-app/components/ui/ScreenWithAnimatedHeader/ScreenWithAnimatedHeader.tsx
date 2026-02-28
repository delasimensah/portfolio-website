import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import AnimatedHeader from "../AnimatedHeader/AnimatedHeader";
import LargeTitle from "../LargeTitle/LargeTitle";
import { VStack } from "../Stack/Stack";

export interface ScreenWithAnimatedHeaderProps {
  title: string;
  children: React.ReactNode;
  contentContainerStyle?: object;
}

const ScreenWithAnimatedHeader: React.FC<ScreenWithAnimatedHeaderProps> = ({
  title,
  children,
  contentContainerStyle,
}) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <VStack spacing="none" className="flex-1">
      <AnimatedHeader title={title} scrollY={scrollY} />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, ...contentContainerStyle }}
      >
        <VStack spacing="2xl" paddingX="lg" paddingY="md">
          <LargeTitle title={title} />
          {children}
        </VStack>
      </Animated.ScrollView>
    </VStack>
  );
};

export default ScreenWithAnimatedHeader;
