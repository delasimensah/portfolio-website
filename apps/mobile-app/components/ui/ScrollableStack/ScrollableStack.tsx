import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { cn } from "shared";

export type ScrollableStackPadding =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "none";

interface ScrollableStackProps extends ScrollViewProps {
  /**
   * Padding for all sides
   * @default 'md'
   */
  padding?: ScrollableStackPadding;
  /**
   * Horizontal padding
   * @default 'none'
   */
  paddingX?: ScrollableStackPadding;
  /**
   * Vertical padding
   * @default 'none'
   */
  paddingY?: ScrollableStackPadding;
}

const paddingMap = {
  none: "",
  xs: "p-1", // 4px
  sm: "p-2", // 8px
  md: "p-4", // 16px
  lg: "p-6", // 24px
  xl: "p-8", // 32px
  "2xl": "p-12", // 48px
};

const paddingXMap = {
  none: "",
  xs: "px-1", // 4px
  sm: "px-2", // 8px
  md: "px-4", // 16px
  lg: "px-6", // 24px
  xl: "px-8", // 32px
  "2xl": "px-12", // 48px
};

const paddingYMap = {
  none: "",
  xs: "py-1", // 4px
  sm: "py-2", // 8px
  md: "py-4", // 16px
  lg: "py-6", // 24px
  xl: "py-8", // 32px
  "2xl": "py-12", // 48px
};

/**
 * ScrollableStack component for scrollable content with consistent padding
 *
 * @example
 * ```tsx
 * <ScrollableStack padding="lg" paddingX="md" paddingY="sm">
 *   <Text>Scrollable Content</Text>
 * </ScrollableStack>
 * ```
 */
const ScrollableStack: React.FC<ScrollableStackProps> = ({
  padding = "md",
  paddingX = "none",
  paddingY = "none",
  className,
  children,
  showsVerticalScrollIndicator = false,
  ...props
}) => {
  return (
    <ScrollView
      className={cn(
        "flex-1 bg-black",
        paddingMap[padding],
        paddingXMap[paddingX],
        paddingYMap[paddingY],
        className
      )}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={{ paddingBottom: 100 }}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollableStack;
