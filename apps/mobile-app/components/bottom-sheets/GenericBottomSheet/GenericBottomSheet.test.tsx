import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { render } from "@testing-library/react-native";
import React, { createRef } from "react";
import { Text } from "react-native";

import GenericBottomSheet from "./GenericBottomSheet";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
);

describe("GenericBottomSheet", () => {
  it("should render without crashing", () => {
    const ref = createRef<BottomSheetModal>();
    const { getByText } = render(
      <TestWrapper>
        <GenericBottomSheet ref={ref}>
          <Text>Test Content</Text>
        </GenericBottomSheet>
      </TestWrapper>
    );
    expect(getByText("Test Content")).toBeTruthy();
  });

  it("should render with title", () => {
    const ref = createRef<BottomSheetModal>();
    const { getByText } = render(
      <TestWrapper>
        <GenericBottomSheet ref={ref} title="Test Title">
          <Text>Content</Text>
        </GenericBottomSheet>
      </TestWrapper>
    );
    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Content")).toBeTruthy();
  });

  it("should forward ref correctly", () => {
    const ref = createRef<BottomSheetModal>();
    render(
      <TestWrapper>
        <GenericBottomSheet ref={ref}>
          <Text>Test</Text>
        </GenericBottomSheet>
      </TestWrapper>
    );
    expect(ref.current).toBeDefined();
  });

  it("should accept custom snap points", () => {
    const ref = createRef<BottomSheetModal>();
    const { getByText } = render(
      <TestWrapper>
        <GenericBottomSheet ref={ref} snapPoints={[400]}>
          <Text>Content</Text>
        </GenericBottomSheet>
      </TestWrapper>
    );
    expect(getByText("Content")).toBeTruthy();
  });

  it("should render without title", () => {
    const ref = createRef<BottomSheetModal>();
    const { getByText, queryByText } = render(
      <TestWrapper>
        <GenericBottomSheet ref={ref}>
          <Text>Content</Text>
        </GenericBottomSheet>
      </TestWrapper>
    );
    expect(getByText("Content")).toBeTruthy();
    expect(queryByText("Test Title")).toBeNull();
  });

  it("should have displayName set", () => {
    expect(GenericBottomSheet.displayName).toBe("GenericBottomSheet");
  });
});
