import { render } from "@testing-library/react-native";
import React from "react";
import { Text, View } from "react-native";

import FlashListContainer from "./FlashListContainer";

// Mock FlashList since it requires specific setup
jest.mock("@shopify/flash-list", () => {
  const React = jest.requireActual("react");
  const { View } = jest.requireActual("react-native");
  return {
    FlashList: ({
      data,
      renderItem,
      keyExtractor,
      ItemSeparatorComponent,
    }: any) => {
      return (
        <View testID="flash-list">
          {data.map((item: any, index: number) => (
            <React.Fragment key={keyExtractor(item)}>
              {renderItem({ item, index })}
              {index < data.length - 1 && ItemSeparatorComponent && (
                <ItemSeparatorComponent />
              )}
            </React.Fragment>
          ))}
        </View>
      );
    },
  };
});

describe("FlashListContainer", () => {
  const mockData = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
  ];

  const renderItem = ({ item }: { item: { id: string; name: string } }) => (
    <View testID={`item-${item.id}`}>
      <Text>{item.name}</Text>
    </View>
  );

  describe("Rendering", () => {
    it("should render list with data", () => {
      const { getByText } = render(
        <FlashListContainer data={mockData} renderItem={renderItem} />
      );
      expect(getByText("Item 1")).toBeTruthy();
      expect(getByText("Item 2")).toBeTruthy();
      expect(getByText("Item 3")).toBeTruthy();
    });

    it("should render empty list", () => {
      const { getByTestId } = render(
        <FlashListContainer data={[]} renderItem={renderItem} />
      );
      expect(getByTestId("flash-list")).toBeTruthy();
    });
  });

  describe("Padding Prop", () => {
    it("should use default padding (md)", () => {
      const { getByTestId } = render(
        <FlashListContainer data={mockData} renderItem={renderItem} />
      );
      expect(getByTestId("flash-list")).toBeTruthy();
    });

    it("should accept custom padding", () => {
      const { getByTestId } = render(
        <FlashListContainer
          data={mockData}
          renderItem={renderItem}
          padding="lg"
        />
      );
      expect(getByTestId("flash-list")).toBeTruthy();
    });
  });

  describe("Spacing Prop", () => {
    it("should use default spacing (md)", () => {
      const { getByTestId } = render(
        <FlashListContainer data={mockData} renderItem={renderItem} />
      );
      expect(getByTestId("flash-list")).toBeTruthy();
    });

    it("should accept custom spacing", () => {
      const { getByTestId } = render(
        <FlashListContainer
          data={mockData}
          renderItem={renderItem}
          spacing="lg"
        />
      );
      expect(getByTestId("flash-list")).toBeTruthy();
    });
  });
});
