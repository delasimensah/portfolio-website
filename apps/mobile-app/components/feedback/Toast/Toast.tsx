import React from "react";

import { HStack } from "../../ui/Stack/Stack";
import Text from "../../ui/Text/Text";

export interface ToastProps {
  text1?: string;
  icon?: React.ReactElement; // Optional icon (Ionicons, MaterialIcons, Image, custom SVG, etc.)
}

export type ToastVariant = "active" | "neutral" | "success" | "error";

interface ToastConfig {
  bgColor: string;
  textColor: string;
  testID: string;
}

const toastConfig: Record<ToastVariant, ToastConfig> = {
  active: {
    bgColor: "bg-white",
    textColor: "text-black",
    testID: "active-toast",
  },
  success: {
    bgColor: "bg-white",
    textColor: "text-black",
    testID: "success-toast",
  },
  error: {
    bgColor: "bg-darkGrey",
    textColor: "text-white",
    testID: "error-toast",
  },
  neutral: {
    bgColor: "bg-grey",
    textColor: "text-white",
    testID: "neutral-toast",
  },
};

const BaseToast: React.FC<ToastProps & { variant: ToastVariant }> = ({
  text1,
  variant,
  icon,
}) => {
  const config = toastConfig[variant];

  return (
    <HStack
      align="center"
      className={`w-[95%] rounded-md ${config.bgColor} p-3 shadow-md`}
      testID={config.testID}
      spacing={icon ? "sm" : "none"}
    >
      {icon && icon}
      <Text className={`font-app-medium flex-1 text-base ${config.textColor}`}>
        {text1}
      </Text>
    </HStack>
  );
};

/**
 * ActiveToast - White background, black text
 * Use for active/ongoing operations
 *
 * @example
 * // Without icon
 * <ActiveToast text1="Processing..." />
 *
 * // With Ionicons
 * import { Ionicons } from "@expo/vector-icons";
 * <ActiveToast
 *   text1="Processing..."
 *   icon={<Ionicons name="time-outline" size={20} color="black" />}
 * />
 *
 * // With MaterialIcons
 * import { MaterialIcons } from "@expo/vector-icons";
 * <ActiveToast
 *   text1="Processing..."
 *   icon={<MaterialIcons name="schedule" size={20} color="black" />}
 * />
 *
 * // With custom image
 * import { Image } from "expo-image";
 * import { ASSETS } from "@/constants";
 * <ActiveToast
 *   text1="Processing..."
 *   icon={<Image source={ASSETS.icons.customIcon} style={{ width: 20, height: 20 }} />}
 * />
 */
export const ActiveToast: React.FC<ToastProps> = (props) => (
  <BaseToast {...props} variant="active" />
);

/**
 * SuccessToast - White background, black text
 * Use for successful operations
 */
export const SuccessToast: React.FC<ToastProps> = (props) => (
  <BaseToast {...props} variant="success" />
);

/**
 * ErrorToast - Dark gray background, white text
 * Use for errors, does not auto-dismiss
 */
export const ErrorToast: React.FC<ToastProps> = (props) => (
  <BaseToast {...props} variant="error" />
);

/**
 * NeutralToast - Light gray background, white text
 * Use for informational messages
 */
export const NeutralToast: React.FC<ToastProps> = (props) => (
  <BaseToast {...props} variant="neutral" />
);
