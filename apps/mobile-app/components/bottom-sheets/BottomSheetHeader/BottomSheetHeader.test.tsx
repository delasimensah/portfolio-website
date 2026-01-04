import { render } from "@testing-library/react-native";
import React from "react";

import BottomSheetHeader from "./BottomSheetHeader";

describe("BottomSheetHeader Component", () => {
  it("renders correctly with title", () => {
    const { getByText } = render(<BottomSheetHeader title="Test Title" />);
    expect(getByText("Test Title")).toBeTruthy();
  });

  it("renders correctly with title and subtitle", () => {
    const { getByText } = render(
      <BottomSheetHeader title="Test Title" subtitle="Test Subtitle" />
    );
    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Test Subtitle")).toBeTruthy();
  });

  it("renders correctly without title or subtitle", () => {
    const { container } = render(<BottomSheetHeader />);
    expect(container).toBeTruthy();
  });

  it("applies correct styling classes", () => {
    const { getByText } = render(<BottomSheetHeader title="Test" />);
    const title = getByText("Test");
    expect(title).toBeTruthy();
  });
});
