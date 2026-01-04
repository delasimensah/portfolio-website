import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { render } from "@testing-library/react-native";
import React from "react";

import BottomSheetsManager from "./BottomSheetsManager";

// Mock hooks
const mockSetGenericRef = jest.fn();

jest.mock("@/hooks", () => ({
  useBottomsheetStore: () => ({
    setGenericRef: mockSetGenericRef,
  }),
}));

// Wrapper component for tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
);

describe("BottomSheetsManager", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render without crashing", () => {
      const { toJSON } = render(
        <TestWrapper>
          <BottomSheetsManager />
        </TestWrapper>
      );
      expect(toJSON()).toBeTruthy();
    });

    it("should render GenericBottomSheet component", () => {
      const { toJSON } = render(
        <TestWrapper>
          <BottomSheetsManager />
        </TestWrapper>
      );
      expect(toJSON()).toBeTruthy();
    });
  });

  describe("Ref Registration", () => {
    it("should register generic ref on mount", () => {
      render(
        <TestWrapper>
          <BottomSheetsManager />
        </TestWrapper>
      );

      expect(mockSetGenericRef).toHaveBeenCalledTimes(1);
      expect(mockSetGenericRef).toHaveBeenCalledWith(
        expect.objectContaining({ current: expect.anything() })
      );
    });
  });
});
