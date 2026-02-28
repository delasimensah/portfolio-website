import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { COLORS } from "@/constants";

import Button from "../Button/Button";
import ScreenWithAnimatedHeader from "../ScreenWithAnimatedHeader/ScreenWithAnimatedHeader";
import { VStack } from "../Stack/Stack";
import Text from "../Text/Text";

export interface EmptyStateProps {
  pageTitle: string;
  title?: string;
  subtitle: string;
  buttonText?: string;
  onButtonPress?: () => void;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  pageTitle,
  title,
  subtitle,
  buttonText,
  onButtonPress,
  icon,
}) => {
  const defaultIcon = (
    <Ionicons name="folder-outline" size={64} color={COLORS.lightGrey} />
  );

  return (
    <ScreenWithAnimatedHeader title={pageTitle}>
      <VStack
        spacing="lg"
        align="center"
        justify="center"
        className="mt-20 flex-1 px-8"
      >
        {icon || defaultIcon}

        <VStack spacing="sm" align="center">
          {title && (
            <Text className="text-center font-app-black text-xl text-black">
              {title}
            </Text>
          )}
          <Text className="text-center font-app-regular text-base text-black/80">
            {subtitle}
          </Text>
        </VStack>

        {buttonText && (
          <Button text={buttonText} size="md" onPress={onButtonPress} />
        )}
      </VStack>
    </ScreenWithAnimatedHeader>
  );
};

export default EmptyState;
