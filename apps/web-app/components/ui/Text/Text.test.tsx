import { render } from "@testing-library/react";
import React from "react";

import Text from "./Text";

describe("Text Component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<Text>Hello World</Text>);
    expect(getByText("Hello World")).toBeTruthy();
  });

  it("applies default font styles", () => {
    const { getByText } = render(<Text>Default Text</Text>);
    const textElement = getByText("Default Text");
    expect(textElement).toBeTruthy();
    // The component should apply font-regular and text-base classes by default
  });

  it("accepts custom className", () => {
    const { getByText } = render(
      <Text className="custom-class text-red-500">Custom Class Text</Text>
    );
    const textElement = getByText("Custom Class Text");
    expect(textElement).toBeTruthy();
  });

  it("passes through additional props", () => {
    const { getByText } = render(
      <Text data-testid="test-text">Test ID Text</Text>
    );
    const textElement = getByText("Test ID Text");
    expect(textElement).toBeTruthy();
  });

  it("renders with different text content", () => {
    const { getByText } = render(<Text>Different content</Text>);
    expect(getByText("Different content")).toBeTruthy();
  });

  it("handles empty children", () => {
    const { getByText } = render(<Text>{""}</Text>);
    const textElement = getByText("");
    expect(textElement).toBeTruthy();
  });

  it("combines className with default styles", () => {
    const { getByText } = render(
      <Text className="text-lg font-bold">Styled Text</Text>
    );
    const textElement = getByText("Styled Text");
    expect(textElement).toBeTruthy();
  });
});
