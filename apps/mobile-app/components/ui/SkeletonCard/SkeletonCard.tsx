import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

import { COLORS } from "@/constants";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

interface SkeletonCardProps {
  width?: number;
  height?: number;
  radius?: number;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
}

/**
 * SkeletonCard - Animated shimmer loading placeholder
 * Creates smooth gradient animations for loading states
 */
const SkeletonCard: React.FC<SkeletonCardProps> = ({
  width,
  height,
  radius,
  mt,
  mb,
  mr,
  ml,
}) => {
  return (
    <View testID="skeleton-card">
      <ShimmerPlaceholder
        visible={false}
        shimmerStyle={{
          borderRadius: radius || 8,
          marginTop: mt || 0,
          marginBottom: mb || 0,
          marginLeft: ml || 0,
          marginRight: mr || 0,
        }}
        shimmerColors={[COLORS.border, COLORS.shimmerLight, COLORS.border]}
        width={width || 100}
        height={height || 15}
      />
    </View>
  );
};

export default SkeletonCard;
