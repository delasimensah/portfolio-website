import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import UnauthenticatedState from "./UnauthenticatedState";

// Mock bottomsheet store (must be before importing component that uses @/hooks)
const mockOpenAuthSheet = jest.fn();
jest.mock("@/hooks", () => ({
  useBottomsheetStore: () => ({ openAuthSheet: mockOpenAuthSheet }),
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

describe("UnauthenticatedState Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders correctly with required props", () => {
      const { getAllByText, getByText } = render(
        <UnauthenticatedState
          pageTitle="Wishlist"
          subtitle="Log in to continue"
        />
      );
      expect(getAllByText("Wishlist")[0]).toBeTruthy();
      expect(getByText("Log in to continue")).toBeTruthy();
    });

    it("displays the correct page title", () => {
      const { getAllByText } = render(
        <UnauthenticatedState
          pageTitle="Bookings"
          subtitle="Sign in to view bookings"
        />
      );
      expect(getAllByText("Bookings")[0]).toBeTruthy();
    });

    it("displays the correct subtitle", () => {
      const { getByText } = render(
        <UnauthenticatedState
          pageTitle="Profile"
          subtitle="Sign in to start exploring luxury listings"
        />
      );
      expect(
        getByText("Sign in to start exploring luxury listings")
      ).toBeTruthy();
    });
  });

  describe("Sign In Button", () => {
    it("renders sign in button", () => {
      const { getByText } = render(
        <UnauthenticatedState pageTitle="Screen" subtitle="Empty state" />
      );
      expect(getByText("Sign in")).toBeTruthy();
    });

    it("opens auth bottomsheet when button is pressed", () => {
      const { getByText } = render(
        <UnauthenticatedState pageTitle="Screen" subtitle="Empty state" />
      );
      const button = getByText("Sign in");
      fireEvent.press(button);
      expect(mockOpenAuthSheet).toHaveBeenCalledTimes(1);
    });
  });

  describe("ScreenWithAnimatedHeader Integration", () => {
    it("wraps content in ScreenWithAnimatedHeader", () => {
      const { getAllByText } = render(
        <UnauthenticatedState pageTitle="Test Screen" subtitle="Content" />
      );
      // Should have the title in the animated header
      expect(getAllByText("Test Screen")[0]).toBeTruthy();
    });
  });
});
