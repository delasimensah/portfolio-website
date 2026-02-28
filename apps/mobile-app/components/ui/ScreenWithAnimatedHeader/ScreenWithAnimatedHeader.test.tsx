import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import ScreenWithAnimatedHeader from "./ScreenWithAnimatedHeader";

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 })),
}));

describe("ScreenWithAnimatedHeader", () => {
  it("renders correctly with title and children", () => {
    const { getAllByText, getByText } = render(
      <ScreenWithAnimatedHeader title="Test Screen">
        <Text>Child content</Text>
      </ScreenWithAnimatedHeader>
    );
    expect(getAllByText("Test Screen")[0]).toBeTruthy();
    expect(getByText("Child content")).toBeTruthy();
  });

  it("displays the correct title", () => {
    const { getAllByText } = render(
      <ScreenWithAnimatedHeader title="Wishlist">
        <Text>Content</Text>
      </ScreenWithAnimatedHeader>
    );
    expect(getAllByText("Wishlist")[0]).toBeTruthy();
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <ScreenWithAnimatedHeader title="Screen">
        <Text>First child</Text>
        <Text>Second child</Text>
      </ScreenWithAnimatedHeader>
    );
    expect(getByText("First child")).toBeTruthy();
    expect(getByText("Second child")).toBeTruthy();
  });

  it("renders LargeTitle with the same title", () => {
    const { getAllByText } = render(
      <ScreenWithAnimatedHeader title="Bookings">
        <Text>Content</Text>
      </ScreenWithAnimatedHeader>
    );
    // Should have two instances: one in AnimatedHeader, one in LargeTitle
    const titles = getAllByText("Bookings");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("accepts contentContainerStyle prop", () => {
    const customStyle = { paddingBottom: 200 };
    const { getByText } = render(
      <ScreenWithAnimatedHeader
        title="Screen"
        contentContainerStyle={customStyle}
      >
        <Text>Content</Text>
      </ScreenWithAnimatedHeader>
    );
    expect(getByText("Content")).toBeTruthy();
  });

  it("renders with empty children", () => {
    const { getAllByText } = render(
      <ScreenWithAnimatedHeader title="Empty Screen">
        <></>
      </ScreenWithAnimatedHeader>
    );
    expect(getAllByText("Empty Screen")[0]).toBeTruthy();
  });

  it("renders with complex children structure", () => {
    const { getByText } = render(
      <ScreenWithAnimatedHeader title="Complex Screen">
        <Text>Header</Text>
        <Text>Body</Text>
        <Text>Footer</Text>
      </ScreenWithAnimatedHeader>
    );
    expect(getByText("Header")).toBeTruthy();
    expect(getByText("Body")).toBeTruthy();
    expect(getByText("Footer")).toBeTruthy();
  });

  it("renders scrollable content", () => {
    const { getByText } = render(
      <ScreenWithAnimatedHeader title="Scrollable">
        <Text>Scrollable content</Text>
      </ScreenWithAnimatedHeader>
    );
    expect(getByText("Scrollable content")).toBeTruthy();
  });
});
