import React from "react";
import { View, ViewProps } from "react-native";
import { cn } from "shared";

export type StackDirection = "row" | "column";
export type StackSpacing = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "none";
export type StackPadding = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "none";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

interface StackProps extends ViewProps {
  /**
   * Direction of the stack
   * @default 'column'
   */
  direction?: StackDirection;
  /**
   * Spacing between children using gap utility
   * @default 'md'
   */
  spacing?: StackSpacing;
  /**
   * Padding for all sides
   * @default 'none'
   */
  padding?: StackPadding;
  /**
   * Horizontal padding
   * @default 'none'
   */
  paddingX?: StackPadding;
  /**
   * Vertical padding
   * @default 'none'
   */
  paddingY?: StackPadding;
  /**
   * Alignment of children on the cross axis
   * @default 'stretch'
   */
  align?: StackAlign;
  /**
   * Justification of children on the main axis
   * @default 'start'
   */
  justify?: StackJustify;
}

const spacingMap = {
  none: "",
  xs: "gap-1", // 4px
  sm: "gap-2", // 8px
  md: "gap-4", // 16px
  lg: "gap-6", // 24px
  xl: "gap-8", // 32px
  "2xl": "gap-12", // 48px
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

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
 * Stack component for managing layout and spacing of children
 *
 * @example
 * ```tsx
 * <Stack direction="row" spacing="lg" align="center" padding="md">
 *   <Text>Item 1</Text>
 *   <Text>Item 2</Text>
 * </Stack>
 * ```
 */
const Stack: React.FC<StackProps> = ({
  direction = "column",
  spacing = "md",
  padding = "none",
  paddingX = "none",
  paddingY = "none",
  align = "stretch",
  justify = "start",
  className,
  children,
  ...props
}) => {
  const spacingClass = spacingMap[spacing];

  return (
    <View
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        spacingClass || undefined,
        paddingMap[padding],
        paddingXMap[paddingX],
        paddingYMap[paddingY],
        alignMap[align],
        justifyMap[justify],
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
};

/**
 * HStack (Horizontal Stack) - Convenience wrapper for horizontal layouts
 *
 * @example
 * ```tsx
 * <HStack spacing="md" align="center">
 *   <Image source={icon} />
 *   <Text>Label</Text>
 * </HStack>
 * ```
 */
export const HStack: React.FC<Omit<StackProps, "direction">> = (props) => (
  <Stack direction="row" {...props} />
);

/**
 * VStack (Vertical Stack) - Convenience wrapper for vertical layouts
 *
 * @example
 * ```tsx
 * <VStack spacing="lg">
 *   <Text>Header</Text>
 *   <Text>Body</Text>
 *   <Text>Footer</Text>
 * </VStack>
 * ```
 */
export const VStack: React.FC<Omit<StackProps, "direction">> = (props) => (
  <Stack direction="column" {...props} />
);

// Stack is exported as default for tests only
// Use HStack or VStack in application code
export default Stack;
