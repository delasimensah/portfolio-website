import { render, screen } from "@testing-library/react";
import React from "react";

import {
  ErrorNotification,
  InfoNotification,
  SuccessNotification,
} from "./Notification";

describe("Notification Components", () => {
  describe("ErrorNotification", () => {
    it("renders correctly with message", () => {
      const testMessage = "Something went wrong!";
      render(<ErrorNotification message={testMessage} />);

      expect(screen.getByText("Error")).toBeTruthy();
      expect(screen.getByText(testMessage)).toBeTruthy();
    });

    it("renders with custom title", () => {
      render(
        <ErrorNotification title="Custom Error" message="Error message" />
      );
      expect(screen.getByText("Custom Error")).toBeTruthy();
    });
  });

  describe("SuccessNotification", () => {
    it("renders correctly with message", () => {
      const testMessage = "Action completed successfully!";
      render(<SuccessNotification message={testMessage} />);

      expect(screen.getByText("Success")).toBeTruthy();
      expect(screen.getByText(testMessage)).toBeTruthy();
    });

    it("renders with custom title", () => {
      render(
        <SuccessNotification title="Custom Success" message="Success message" />
      );
      expect(screen.getByText("Custom Success")).toBeTruthy();
    });
  });

  describe("InfoNotification", () => {
    it("renders correctly with message", () => {
      const testMessage = "Informational message";
      render(<InfoNotification message={testMessage} />);

      expect(screen.getByText("Info")).toBeTruthy();
      expect(screen.getByText(testMessage)).toBeTruthy();
    });

    it("renders with custom title", () => {
      render(<InfoNotification title="Custom Info" message="Info message" />);
      expect(screen.getByText("Custom Info")).toBeTruthy();
    });
  });
});
