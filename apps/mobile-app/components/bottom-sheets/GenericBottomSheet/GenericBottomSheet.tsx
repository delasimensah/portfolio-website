import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, ReactNode, useCallback, useMemo } from "react";
import { Text } from "react-native";

import { COLORS } from "@/constants";

import { VStack } from "../../ui/Stack/Stack";

export interface GenericBottomSheetProps {
  /**
   * Snap points for the bottom sheet
   * @default [280]
   */
  snapPoints?: (string | number)[];
  /**
   * Title to display at the top
   */
  title?: string;
  /**
   * Content to display in the sheet
   */
  children: ReactNode;
  /**
   * Whether to enable pan down to close
   * @default true
   */
  enablePanDownToClose?: boolean;
  /**
   * Custom background style
   */
  backgroundStyle?: object;
  /**
   * Custom handle indicator style
   */
  handleIndicatorStyle?: object;
}

const GenericBottomSheet = forwardRef<
  BottomSheetModal,
  GenericBottomSheetProps
>(
  (
    {
      snapPoints = [280],
      title,
      children,
      enablePanDownToClose = true,
      backgroundStyle,
      handleIndicatorStyle,
    },
    ref
  ) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
        />
      ),
      []
    );

    const defaultBackgroundStyle = {
      backgroundColor: COLORS.darkGrey,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    };

    const defaultHandleIndicatorStyle = {
      backgroundColor: COLORS.lightGrey,
      height: 2,
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={memoizedSnapPoints}
        backdropComponent={renderBackdrop}
        index={0}
        enablePanDownToClose={enablePanDownToClose}
        backgroundStyle={backgroundStyle || defaultBackgroundStyle}
        handleIndicatorStyle={
          handleIndicatorStyle || defaultHandleIndicatorStyle
        }
      >
        <BottomSheetView>
          <VStack spacing="none" className="p-[20px]">
            {title && (
              <VStack spacing="none" className="mb-4">
                <VStack
                  spacing="none"
                  className="mb-4 h-[2px] w-[40px] self-center rounded-full bg-lightGrey"
                />
                <Text className="font-bold text-xl text-white">{title}</Text>
              </VStack>
            )}
            {children}
          </VStack>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

GenericBottomSheet.displayName = "GenericBottomSheet";

export default GenericBottomSheet;
