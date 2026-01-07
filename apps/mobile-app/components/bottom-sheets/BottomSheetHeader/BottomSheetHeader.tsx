import React from "react";
import { cn } from "shared";

import { VStack } from "../../ui/Stack/Stack";
import Text from "../../ui/Text/Text";

export interface BottomSheetHeaderProps {
  title?: string;
  subtitle?: string;
}

/**
 * BottomSheetHeader Component
 *
 * Reusable header component for bottom sheets.
 * Displays a title and optional subtitle with consistent styling.
 *
 * @example
 * ```tsx
 * <BottomSheetHeader title="Confirm Action" subtitle="This action cannot be undone" />
 * ```
 */
const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <VStack
      align="center"
      justify="center"
      className={cn("border-b border-b-border", title ? "p-[10px]" : "p-[3px]")}
    >
      {title && (
        <Text className="font-app-medium text-[20px] text-white">{title}</Text>
      )}
      {subtitle && (
        <Text className="font-app-medium mt-4 text-[14px] text-lightGrey">
          {subtitle}
        </Text>
      )}
    </VStack>
  );
};

export default BottomSheetHeader;
