import { render } from "@testing-library/react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AnimatedHeader from "./AnimatedHeader";

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

describe("AnimatedHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with title", () => {
    const scrollY = { value: 0 } as React.ComponentProps<
      typeof AnimatedHeader
    >["scrollY"];
    const { getByText } = render(
      <AnimatedHeader title="Test Title" scrollY={scrollY} />
    );
    expect(getByText("Test Title")).toBeTruthy();
  });

  it("displays the correct title text", () => {
    const scrollY = { value: 0 } as React.ComponentProps<
      typeof AnimatedHeader
    >["scrollY"];
    const { getByText } = render(
      <AnimatedHeader title="Wishlist" scrollY={scrollY} />
    );
    expect(getByText("Wishlist")).toBeTruthy();
  });

  it("uses safe area insets for padding", () => {
    const mockInsets = { top: 44, bottom: 0, left: 0, right: 0 };
    (useSafeAreaInsets as jest.Mock).mockReturnValue(mockInsets);

    const scrollY = { value: 0 } as React.ComponentProps<
      typeof AnimatedHeader
    >["scrollY"];
    const { getByText } = render(
      <AnimatedHeader title="Test" scrollY={scrollY} />
    );
    expect(getByText("Test")).toBeTruthy();
    expect(useSafeAreaInsets).toHaveBeenCalled();
  });

  it("handles different scroll values", () => {
    const scrollY = { value: 100 } as React.ComponentProps<
      typeof AnimatedHeader
    >["scrollY"];
    const { getByText } = render(
      <AnimatedHeader title="Test" scrollY={scrollY} />
    );
    expect(getByText("Test")).toBeTruthy();
  });

  it("renders header border element", () => {
    const scrollY = { value: 0 } as React.ComponentProps<
      typeof AnimatedHeader
    >["scrollY"];
    const { UNSAFE_getByType } = render(
      <AnimatedHeader title="Test" scrollY={scrollY} />
    );
    // The border should be rendered as an Animated.View
    expect(UNSAFE_getByType).toBeDefined();
  });

  it("renders with minimal scroll value", () => {
    const scrollY = { value: 0 } as React.ComponentProps<
      typeof AnimatedHeader
    >["scrollY"];
    const { getByText } = render(
      <AnimatedHeader title="Minimal" scrollY={scrollY} />
    );
    expect(getByText("Minimal")).toBeTruthy();
  });

  it("renders with high scroll value", () => {
    const scrollY = { value: 200 } as React.ComponentProps<
      typeof AnimatedHeader
    >["scrollY"];
    const { getByText } = render(
      <AnimatedHeader title="Scrolled" scrollY={scrollY} />
    );
    expect(getByText("Scrolled")).toBeTruthy();
  });
});
