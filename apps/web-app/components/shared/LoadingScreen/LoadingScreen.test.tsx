import { render, screen } from "@testing-library/react";
import React from "react";

import LoadingScreen from "./LoadingScreen";

describe("LoadingScreen Component", () => {
  describe("Rendering", () => {
    it("renders correctly", () => {
      const { container } = render(<LoadingScreen />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("displays loading text", () => {
      render(<LoadingScreen />);
      expect(screen.getByText("Loading...")).toBeTruthy();
    });
  });

  describe("Layout", () => {
    it("renders with proper structure", () => {
      const { container } = render(<LoadingScreen />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("renders without errors", () => {
      expect(() => render(<LoadingScreen />)).not.toThrow();
    });

    it("renders consistently", () => {
      const { container: container1 } = render(<LoadingScreen />);
      const { container: container2 } = render(<LoadingScreen />);
      expect(container1.firstChild).toBeInTheDocument();
      expect(container2.firstChild).toBeInTheDocument();
    });
  });
});
