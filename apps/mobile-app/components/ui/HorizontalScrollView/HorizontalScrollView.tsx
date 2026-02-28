import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { cn } from "shared";

export type HorizontalScrollViewPadding = "none" | "xs" | "sm" | "md" | "lg";

interface HorizontalScrollViewProps extends Omit<
  ScrollViewProps,
  "horizontal"
> {
  paddingLeft?: HorizontalScrollViewPadding;
  paddingRight?: HorizontalScrollViewPadding;
  edgeToEdge?: boolean;
}

const paddingLeftMap: Record<HorizontalScrollViewPadding, number> = {
  none: 0,
  xs: 8,
  sm: 12,
  md: 20,
  lg: 25,
};

const paddingRightMap: Record<HorizontalScrollViewPadding, number> = {
  none: 0,
  xs: 8,
  sm: 12,
  md: 20,
  lg: 25,
};

const HorizontalScrollView: React.FC<HorizontalScrollViewProps> = ({
  paddingLeft = "md",
  paddingRight = "lg",
  edgeToEdge = true,
  className,
  contentContainerStyle,
  showsHorizontalScrollIndicator = false,
  children,
  ...props
}) => {
  const containerStyle = {
    paddingLeft: paddingLeftMap[paddingLeft],
    paddingRight: paddingRightMap[paddingRight],
    ...(contentContainerStyle as Record<string, unknown>),
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      className={cn(edgeToEdge ? "-mx-5" : "", className)}
      contentContainerStyle={containerStyle}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default HorizontalScrollView;
