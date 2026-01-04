import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { act, renderHook } from "@testing-library/react-native";
import { createRef } from "react";

import { useBottomsheetStore } from "../useBottomsheetStore";

describe("useBottomsheetStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useBottomsheetStore());
    act(() => {
      result.current.setGenericRef(null);
    });
  });

  describe("Initial State", () => {
    it("should have null generic ref initially", () => {
      const { result } = renderHook(() => useBottomsheetStore());
      expect(result.current.genericRef).toBeNull();
    });
  });

  describe("Ref Registration", () => {
    it("should set generic ref", () => {
      const { result } = renderHook(() => useBottomsheetStore());
      const mockRef = createRef<BottomSheetModal>();

      act(() => {
        result.current.setGenericRef(mockRef);
      });

      expect(result.current.genericRef).toBe(mockRef);
    });

    it("should clear generic ref", () => {
      const { result } = renderHook(() => useBottomsheetStore());
      const mockRef = createRef<BottomSheetModal>();

      act(() => {
        result.current.setGenericRef(mockRef);
      });

      expect(result.current.genericRef).toBe(mockRef);

      act(() => {
        result.current.setGenericRef(null);
      });

      expect(result.current.genericRef).toBeNull();
    });
  });

  describe("Imperative Methods", () => {
    it("should call present on generic sheet when ref is set", () => {
      const { result } = renderHook(() => useBottomsheetStore());
      const mockPresent = jest.fn();
      const mockRef = {
        current: { present: mockPresent } as any,
      };

      act(() => {
        result.current.setGenericRef(mockRef as any);
        result.current.openGenericSheet();
      });

      expect(mockPresent).toHaveBeenCalledTimes(1);
    });

    it("should not throw when calling methods with null refs", () => {
      const { result } = renderHook(() => useBottomsheetStore());

      expect(() => {
        act(() => {
          result.current.openGenericSheet();
        });
      }).not.toThrow();
    });
  });

  describe("Store Persistence", () => {
    it("should maintain state across multiple hook calls", () => {
      const { result: result1 } = renderHook(() => useBottomsheetStore());
      const mockRef = createRef<BottomSheetModal>();

      act(() => {
        result1.current.setGenericRef(mockRef);
      });

      // Call hook again in a different component
      const { result: result2 } = renderHook(() => useBottomsheetStore());

      // State should be shared
      expect(result2.current.genericRef).toBe(mockRef);
    });
  });
});
