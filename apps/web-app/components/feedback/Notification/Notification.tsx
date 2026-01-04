import { Box } from "@mantine/core";
import React from "react";

import Text from "../../ui/Text/Text";

export interface NotificationProps {
  title?: string;
  message: string;
  variant?: "error" | "success" | "info";
}

/**
 * ErrorNotification Component
 * Red background, does not auto-dismiss
 */
export const ErrorNotification: React.FC<NotificationProps> = ({
  title = "Error",
  message,
}) => {
  return (
    <Box className="rounded-md bg-red-600 p-4">
      <Text className="mb-1 font-bold text-white">{title}</Text>
      <Text className="text-sm text-white">{message}</Text>
    </Box>
  );
};

/**
 * SuccessNotification Component
 * Green background, auto-dismisses
 */
export const SuccessNotification: React.FC<NotificationProps> = ({
  title = "Success",
  message,
}) => {
  return (
    <Box className="rounded-md bg-green-600 p-4">
      <Text className="mb-1 font-bold text-white">{title}</Text>
      <Text className="text-sm text-white">{message}</Text>
    </Box>
  );
};

/**
 * InfoNotification Component
 * Blue background, auto-dismisses
 */
export const InfoNotification: React.FC<NotificationProps> = ({
  title = "Info",
  message,
}) => {
  return (
    <Box className="rounded-md bg-blue-600 p-4">
      <Text className="mb-1 font-bold text-white">{title}</Text>
      <Text className="text-sm text-white">{message}</Text>
    </Box>
  );
};
