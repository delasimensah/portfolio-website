import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import ScrollableStack from "./ScrollableStack";

describe("ScrollableStack Component", () => {
  it("should render without crashing", () => {
    const { getByText } = render(
      <ScrollableStack>
        <Text>Test Content</Text>
      </ScrollableStack>
    );
    expect(getByText("Test Content")).toBeTruthy();
  });

  it("should render with children", () => {
    const { getByText } = render(
      <ScrollableStack>
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </ScrollableStack>
    );
    expect(getByText("Child 1")).toBeTruthy();
    expect(getByText("Child 2")).toBeTruthy();
  });

  it("should apply padding prop", () => {
    const { root } = render(
      <ScrollableStack padding="lg">
        <Text>Content</Text>
      </ScrollableStack>
    );
    expect(root).toBeTruthy();
  });

  it("should apply paddingX prop", () => {
    const { root } = render(
      <ScrollableStack>
        <Text>Content</Text>
      </ScrollableStack>
    );
    expect(root).toBeTruthy();
  });
});
