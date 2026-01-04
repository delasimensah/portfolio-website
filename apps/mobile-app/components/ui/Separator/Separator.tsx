import React from "react";
import { View, ViewProps } from "react-native";
import { cn } from "shared";

type SeparatorSpacing = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "none";

interface SeparatorProps extends ViewProps {
  /**
   * Spacing/height for the separator
   * @default 'md'
   */
  spacing: SeparatorSpacing;
}

const spacingMap = {
  none: "h-0",
  xs: "h-1", // 4px
  sm: "h-2", // 8px
  md: "h-4", // 16px
  lg: "h-6", // 24px
  xl: "h-8", // 32px
  "2xl": "h-12", // 48px
};

/**
 * Separator component for adding empty space between items
 *
 * @example
 * ```tsx
 * <Separator spacing="md" />
 * ```
 */
const Separator: React.FC<SeparatorProps> = ({
  spacing,
  className,
  ...props
}) => {
  return <View className={cn(spacingMap[spacing], className)} {...props} />;
};

export default Separator;
