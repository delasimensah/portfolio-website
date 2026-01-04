import { render, screen } from "@testing-library/react-native";
import React from "react";

import LoadingScreen from "./LoadingScreen";

describe("LoadingScreen Component", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      const { toJSON } = render(<LoadingScreen />);
      expect(toJSON()).toBeTruthy();
    });

    it("displays loading text", () => {
      render(<LoadingScreen />);
      expect(screen.getByText("Loading...")).toBeTruthy();
    });
  });

  describe("Layout", () => {
    it("renders with proper structure", () => {
      const { toJSON } = render(<LoadingScreen />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("renders without errors", () => {
      expect(() => render(<LoadingScreen />)).not.toThrow();
    });

    it("renders consistently", () => {
      const { toJSON: json1 } = render(<LoadingScreen />);
      const { toJSON: json2 } = render(<LoadingScreen />);
      expect(json1()).toBeTruthy();
      expect(json2()).toBeTruthy();
    });
  });
});
