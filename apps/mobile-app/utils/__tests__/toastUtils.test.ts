import Toast from "react-native-toast-message";
import {
  showActiveToast,
  showErrorToast,
  showNeutralToast,
  showSuccessToast,
} from "../toastUtils";

// Mock react-native-toast-message
jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

describe("Toast Utilities", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("showErrorToast", () => {
    it("calls Toast.show with default error type and message", () => {
      const message = "Test error message";
      showErrorToast(message);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "error",
        text1: message,
        position: "bottom",
        bottomOffset: 150,
        visibilityTime: 0,
      });
    });

    it("calls Toast.show with custom offset and visibilityTime", () => {
      const message = "Custom error message";
      const offset = 200;
      const visibilityTime = 3000;
      showErrorToast(message, offset, visibilityTime);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "error",
        text1: message,
        position: "bottom",
        bottomOffset: offset,
        visibilityTime: visibilityTime,
      });
    });
  });

  describe("showSuccessToast", () => {
    it("calls Toast.show with default success type and message", () => {
      const message = "Test success message";
      showSuccessToast(message);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "success",
        text1: message,
        position: "bottom",
        bottomOffset: 150,
        visibilityTime: 2000,
      });
    });

    it("calls Toast.show with custom offset and visibilityTime", () => {
      const message = "Custom success message";
      const offset = 200;
      const visibilityTime = 3000;
      showSuccessToast(message, offset, visibilityTime);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "success",
        text1: message,
        position: "bottom",
        bottomOffset: offset,
        visibilityTime: visibilityTime,
      });
    });
  });

  describe("showNeutralToast", () => {
    it("calls Toast.show with default neutral type and message", () => {
      const message = "Test neutral message";
      showNeutralToast(message);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "neutral",
        text1: message,
        position: "bottom",
        bottomOffset: 150,
        visibilityTime: 2000,
      });
    });

    it("calls Toast.show with custom offset and visibilityTime", () => {
      const message = "Custom neutral message";
      const offset = 200;
      const visibilityTime = 3000;
      showNeutralToast(message, offset, visibilityTime);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "neutral",
        text1: message,
        position: "bottom",
        bottomOffset: offset,
        visibilityTime: visibilityTime,
      });
    });
  });

  describe("showActiveToast", () => {
    it("calls Toast.show with default active type and message", () => {
      const message = "Test active message";
      showActiveToast(message);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "active",
        text1: message,
        position: "bottom",
        bottomOffset: 150,
        visibilityTime: 2000,
      });
    });

    it("calls Toast.show with custom offset and visibilityTime", () => {
      const message = "Custom active message";
      const offset = 200;
      const visibilityTime = 3000;
      showActiveToast(message, offset, visibilityTime);

      expect(Toast.show).toHaveBeenCalledWith({
        type: "active",
        text1: message,
        position: "bottom",
        bottomOffset: offset,
        visibilityTime: visibilityTime,
      });
    });
  });
});
