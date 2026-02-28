import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import HorizontalScrollView from "./HorizontalScrollView";

jest.mock("shared", () => ({
  cn: jest.fn((...classes: (string | undefined)[]) =>
    classes.filter(Boolean).join(" ")
  ),
}));

describe("HorizontalScrollView", () => {
  it("renders children", () => {
    const { getByText } = render(
      <HorizontalScrollView>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </HorizontalScrollView>
    );
    expect(getByText("Item 1")).toBeTruthy();
    expect(getByText("Item 2")).toBeTruthy();
  });

  it("applies edgeToEdge class when edgeToEdge is true", () => {
    /* eslint-disable-next-line @typescript-eslint/no-require-imports */
    const { cn } = require("shared");
    render(
      <HorizontalScrollView edgeToEdge>
        <Text>Child</Text>
      </HorizontalScrollView>
    );
    expect(cn).toHaveBeenCalledWith("-mx-5", undefined);
  });

  it("does not apply negative margin when edgeToEdge is false", () => {
    /* eslint-disable-next-line @typescript-eslint/no-require-imports */
    const { cn } = require("shared");
    render(
      <HorizontalScrollView edgeToEdge={false}>
        <Text>Child</Text>
      </HorizontalScrollView>
    );
    expect(cn).toHaveBeenCalledWith("", undefined);
  });
});
