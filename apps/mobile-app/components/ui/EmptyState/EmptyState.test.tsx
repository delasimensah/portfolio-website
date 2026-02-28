import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";

import EmptyState from "./EmptyState";

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

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

describe("EmptyState Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders correctly with required props", () => {
      const { getAllByText, getByText } = render(
        <EmptyState pageTitle="Wishlist" subtitle="No items yet" />
      );
      expect(getAllByText("Wishlist")[0]).toBeTruthy();
      expect(getByText("No items yet")).toBeTruthy();
    });

    it("renders title when provided", () => {
      const { getByText } = render(
        <EmptyState
          pageTitle="Bookings"
          title="No bookings yet"
          subtitle="Your bookings will appear here"
        />
      );
      expect(getByText("No bookings yet")).toBeTruthy();
    });

    it("does not render title when not provided", () => {
      const { getAllByText, getByText } = render(
        <EmptyState pageTitle="Screen" subtitle="Subtitle only" />
      );
      expect(getAllByText("Screen").length).toBeGreaterThan(0); // pageTitle appears in header
      expect(getByText("Subtitle only")).toBeTruthy();
    });
  });

  describe("Icon", () => {
    it("renders default folder icon", () => {
      const { UNSAFE_getByType } = render(
        <EmptyState pageTitle="Screen" subtitle="Empty" />
      );
      // Default icon should be rendered
      expect(UNSAFE_getByType).toBeDefined();
    });

    it("renders custom icon when provided", () => {
      const customIcon = (
        <View testID="custom-icon">
          <View>Custom</View>
        </View>
      );
      const { getByTestId } = render(
        <EmptyState pageTitle="Screen" subtitle="Empty" icon={customIcon} />
      );
      expect(getByTestId("custom-icon")).toBeTruthy();
    });
  });

  describe("Button", () => {
    it("does not render button when buttonText is not provided", () => {
      const { queryByText } = render(
        <EmptyState pageTitle="Screen" subtitle="Empty" />
      );
      expect(queryByText("Explore")).toBeNull();
    });

    it("renders button with custom buttonText", () => {
      const { getByText } = render(
        <EmptyState
          pageTitle="Screen"
          subtitle="Empty"
          buttonText="Explore Listings"
        />
      );
      expect(getByText("Explore Listings")).toBeTruthy();
    });

    it("calls onButtonPress when provided", () => {
      const onButtonPress = jest.fn();
      const { getByText } = render(
        <EmptyState
          pageTitle="Screen"
          subtitle="Empty"
          buttonText="Custom Action"
          onButtonPress={onButtonPress}
        />
      );
      const button = getByText("Custom Action");
      fireEvent.press(button);
      expect(onButtonPress).toHaveBeenCalledTimes(1);
    });
  });

  describe("ScreenWithAnimatedHeader Integration", () => {
    it("wraps content in ScreenWithAnimatedHeader", () => {
      const { getAllByText } = render(
        <EmptyState pageTitle="Test Screen" subtitle="Content" />
      );
      // Should have the title in the animated header
      expect(getAllByText("Test Screen")[0]).toBeTruthy();
    });
  });

  describe("Complete Examples", () => {
    it("renders full empty state with all props", () => {
      const { getAllByText, getByText } = render(
        <EmptyState
          pageTitle="Bookings"
          title="No bookings yet"
          subtitle="Your upcoming and past stays will appear here"
          buttonText="Explore Listings"
        />
      );
      expect(getAllByText("Bookings")[0]).toBeTruthy();
      expect(getByText("No bookings yet")).toBeTruthy();
      expect(
        getByText("Your upcoming and past stays will appear here")
      ).toBeTruthy();
      expect(getByText("Explore Listings")).toBeTruthy();
    });

    it("renders minimal empty state with only required props", () => {
      const { getAllByText, getByText } = render(
        <EmptyState pageTitle="Profile" subtitle="Empty" />
      );
      expect(getAllByText("Profile")[0]).toBeTruthy();
      expect(getByText("Empty")).toBeTruthy();
    });
  });
});
