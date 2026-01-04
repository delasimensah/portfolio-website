import { FlashList } from "@shopify/flash-list";
import React from "react";
import { ListRenderItem } from "react-native";

import Separator from "../Separator/Separator";
import { VStack } from "../Stack/Stack";

export type ListContainerPadding =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "none";

type SeparatorSpacing = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "none";

interface FlashListContainerProps<T> {
  /**
   * Array of data to render
   */
  data: T[];
  /**
   * Function to render each item
   */
  renderItem: ListRenderItem<T>;
  /**
   * Padding for the list container
   * @default 'md'
   */
  padding?: ListContainerPadding;
  /**
   * Spacing for the separator between items
   * @default 'md'
   */
  spacing?: SeparatorSpacing;
}

/**
 * FlashListContainer component that wraps FlashList with VStack and Separator
 * Handles common list patterns (keyExtractor, estimatedItemSize, ItemSeparatorComponent)
 *
 * @example
 * ```tsx
 * <FlashListContainer
 *   data={items}
 *   renderItem={({ item }) => (
 *     <ListItem item={item} onPress={() => handlePress(item)} />
 *   )}
 *   spacing="lg"
 * />
 * ```
 */
const FlashListContainer = <T extends { id: string | number }>({
  data,
  renderItem,
  padding = "md",
  spacing = "md",
}: FlashListContainerProps<T>): React.ReactElement => {
  return (
    <VStack className="flex-1" padding={padding}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        estimatedItemSize={80}
        ItemSeparatorComponent={() => <Separator spacing={spacing} />}
      />
    </VStack>
  );
};

export default FlashListContainer;
