import React from "react";

import { useBottomsheetStore } from "@/hooks";

import Button from "../Button/Button";
import ScreenWithAnimatedHeader from "../ScreenWithAnimatedHeader/ScreenWithAnimatedHeader";
import { VStack } from "../Stack/Stack";
import Text from "../Text/Text";

export interface UnauthenticatedStateProps {
  pageTitle: string;
  subtitle: string;
}

const UnauthenticatedState: React.FC<UnauthenticatedStateProps> = ({
  pageTitle,
  subtitle,
}) => {
  const { openAuthSheet } = useBottomsheetStore();

  return (
    <ScreenWithAnimatedHeader title={pageTitle}>
      <VStack spacing="2xl" justify="center" className="flex-1">
        <VStack spacing="sm">
          <Text className="font-app-regular text-base text-black/80">
            {subtitle}
          </Text>
        </VStack>

        <Button text="Sign in" size="md" onPress={openAuthSheet} />
      </VStack>
    </ScreenWithAnimatedHeader>
  );
};

export default UnauthenticatedState;
