import { render, screen } from "@testing-library/react-native";
import React from "react";

import { ActiveToast, ErrorToast, NeutralToast, SuccessToast } from "./Toast";

describe("Toast Components", () => {
  describe("ActiveToast", () => {
    it("renders correctly with text1 prop", () => {
      const testMessage = "Active action completed!";
      render(<ActiveToast text1={testMessage} />);

      expect(screen.getByText(testMessage)).toBeTruthy();
      expect(screen.getByTestId("active-toast")).toBeTruthy();
    });

    it("renders without text1 prop", () => {
      render(<ActiveToast />);
      expect(screen.getByTestId("active-toast")).toBeTruthy();
    });
  });

  describe("SuccessToast", () => {
    it("renders correctly with text1 prop", () => {
      const testMessage = "Action completed successfully!";
      render(<SuccessToast text1={testMessage} />);

      expect(screen.getByText(testMessage)).toBeTruthy();
      expect(screen.getByTestId("success-toast")).toBeTruthy();
    });

    it("renders without text1 prop", () => {
      render(<SuccessToast />);
      expect(screen.getByTestId("success-toast")).toBeTruthy();
    });
  });

  describe("ErrorToast", () => {
    it("renders correctly with text1 prop", () => {
      const testMessage = "Something went wrong!";
      render(<ErrorToast text1={testMessage} />);

      expect(screen.getByText(testMessage)).toBeTruthy();
      expect(screen.getByTestId("error-toast")).toBeTruthy();
    });

    it("renders without text1 prop", () => {
      render(<ErrorToast />);
      expect(screen.getByTestId("error-toast")).toBeTruthy();
    });
  });

  describe("NeutralToast", () => {
    it("renders correctly with text1 prop", () => {
      const testMessage = "Informational message";
      render(<NeutralToast text1={testMessage} />);

      expect(screen.getByText(testMessage)).toBeTruthy();
      expect(screen.getByTestId("neutral-toast")).toBeTruthy();
    });

    it("renders without text1 prop", () => {
      render(<NeutralToast />);
      expect(screen.getByTestId("neutral-toast")).toBeTruthy();
    });
  });
});
