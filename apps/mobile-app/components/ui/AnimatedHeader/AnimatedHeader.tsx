import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { VStack } from "../Stack/Stack";

interface AnimatedHeaderProps {
  title: string;
  scrollY: SharedValue<number>;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ title, scrollY }) => {
  const insets = useSafeAreaInsets();

  // Calculate threshold: when large title starts going behind the fixed header
  // Small title should appear when scroll reaches the large title height
  const SCROLL_THRESHOLD = 60 - 10; // Start fading in slightly before

  // Animated style for small title (fades in when large title goes behind header)
  const smallTitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [SCROLL_THRESHOLD - 20, SCROLL_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  // Header border opacity (becomes visible when title appears)
  const headerBorderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [SCROLL_THRESHOLD, SCROLL_THRESHOLD + 20],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  return (
    <Animated.View
      style={{
        paddingTop: insets.top,
      }}
    >
      <VStack
        paddingX="lg"
        className="relative h-14 flex-row items-center justify-start"
      >
        <Animated.Text
          className="font-app-black text-2xl text-black"
          style={smallTitleStyle}
        >
          {title}
        </Animated.Text>
      </VStack>

      <Animated.View
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-lightGrey"
        style={headerBorderStyle}
      />
    </Animated.View>
  );
};

export default AnimatedHeader;
