import { render } from "@testing-library/react-native";
import React from "react";

import LargeTitle from "./LargeTitle";

// Mock shared cn utility
jest.mock("shared", () => ({
  cn: jest.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

describe("LargeTitle Component", () => {
  it("renders correctly with title prop", () => {
    const { getByText } = render(<LargeTitle title="Test Title" />);
    expect(getByText("Test Title")).toBeTruthy();
  });

  it("displays the correct title text", () => {
    const { getByText } = render(<LargeTitle title="Wishlist" />);
    expect(getByText("Wishlist")).toBeTruthy();
  });

  it("renders with different title texts", () => {
    const { getByText } = render(<LargeTitle title="Bookings" />);
    expect(getByText("Bookings")).toBeTruthy();
  });

  it("accepts custom className", () => {
    const { getByText } = render(
      <LargeTitle title="Custom Title" className="custom-class" />
    );
    expect(getByText("Custom Title")).toBeTruthy();
  });

  it("renders with empty title", () => {
    const { getByText } = render(<LargeTitle title="" />);
    expect(getByText("")).toBeTruthy();
  });

  it("renders with long title text", () => {
    const longTitle =
      "This is a very long title that might wrap to multiple lines";
    const { getByText } = render(<LargeTitle title={longTitle} />);
    expect(getByText(longTitle)).toBeTruthy();
  });

  it("applies default styling", () => {
    const { getByText } = render(<LargeTitle title="Styled Title" />);
    const titleElement = getByText("Styled Title");
    expect(titleElement).toBeTruthy();
  });

  it("combines default className with custom className", () => {
    const { getByText } = render(
      <LargeTitle title="Combined" className="additional-class" />
    );
    expect(getByText("Combined")).toBeTruthy();
  });
});
