import { Href, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  View,
} from "react-native";
import { cn } from "shared";

import { COLORS } from "@/constants";

import Text from "../Text/Text";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<PressableProps, "onPress"> {
  /** Button text (alternative to children) */
  text?: string;
  /** Button content */
  children?: React.ReactNode;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Navigation route (uses expo-router) */
  href?: Href;
  /** Press handler (ignored if href provided) */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Custom container className */
  className?: string;
  /** Custom text className */
  textClassName?: string;
}

const variantStyles: Record<
  ButtonVariant,
  { container: string; text: string }
> = {
  primary: {
    container: "bg-primary",
    text: "text-white",
  },
  secondary: {
    container: "bg-secondary",
    text: "text-white",
  },
  outline: {
    container: "border border-primary bg-transparent",
    text: "text-primary",
  },
  ghost: {
    container: "bg-transparent",
    text: "text-primary",
  },
  link: {
    container: "",
    text: "text-primary underline",
  },
};

const sizeStyles: Record<ButtonSize, { container: string; text: string }> = {
  sm: {
    container: "px-4 py-2 rounded-md",
    text: "text-sm",
  },
  md: {
    container: "px-6 py-3 rounded-lg",
    text: "text-base",
  },
  lg: {
    container: "px-6 py-4 rounded-lg",
    text: "text-lg",
  },
};

const Button: React.FC<ButtonProps> = ({
  children,
  text,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  href,
  onPress,
  disabled = false,
  loading = false,
  className,
  textClassName,
  ...pressableProps
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (disabled || loading) return;

    if (href) {
      router.push(href as Href);
    } else if (onPress) {
      onPress();
    }
  };

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const content = text || children;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : disabled ? 0.5 : 1,
      })}
      className={cn(
        "flex-row items-center justify-center",
        variantStyle.container,
        sizeStyle.container,
        fullWidth && "w-full",
        className
      )}
      {...pressableProps}
    >
      {leftIcon && !loading && <View className="mr-2">{leftIcon}</View>}

      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary" || variant === "secondary"
              ? COLORS.white
              : COLORS.primary
          }
          testID="button-loading"
        />
      ) : (
        <Text
          className={cn(
            "text-center font-app-bold",
            variantStyle.text,
            sizeStyle.text,
            textClassName
          )}
        >
          {content}
        </Text>
      )}

      {rightIcon && !loading && <View className="ml-2">{rightIcon}</View>}
    </Pressable>
  );
};

export default Button;
