import { render } from "@testing-library/react-native";
import React from "react";

import Separator from "./Separator";

describe("Separator", () => {
  describe("Spacing Variants", () => {
    it("should render with none spacing", () => {
      const { getByTestId } = render(
        <Separator spacing="none" testID="separator" />
      );
      expect(getByTestId("separator")).toBeTruthy();
    });

    it("should render with xs spacing", () => {
      const { getByTestId } = render(
        <Separator spacing="xs" testID="separator" />
      );
      expect(getByTestId("separator")).toBeTruthy();
    });

    it("should render with sm spacing", () => {
      const { getByTestId } = render(
        <Separator spacing="sm" testID="separator" />
      );
      expect(getByTestId("separator")).toBeTruthy();
    });

    it("should render with md spacing", () => {
      const { getByTestId } = render(
        <Separator spacing="md" testID="separator" />
      );
      expect(getByTestId("separator")).toBeTruthy();
    });

    it("should render with lg spacing", () => {
      const { getByTestId } = render(
        <Separator spacing="lg" testID="separator" />
      );
      expect(getByTestId("separator")).toBeTruthy();
    });

    it("should render with xl spacing", () => {
      const { getByTestId } = render(
        <Separator spacing="xl" testID="separator" />
      );
      expect(getByTestId("separator")).toBeTruthy();
    });

    it("should render with 2xl spacing", () => {
      const { getByTestId } = render(
        <Separator spacing="2xl" testID="separator" />
      );
      expect(getByTestId("separator")).toBeTruthy();
    });
  });

  describe("Custom Props", () => {
    it("should accept custom className", () => {
      const { getByTestId } = render(
        <Separator spacing="md" className="custom-class" testID="separator" />
      );
      expect(getByTestId("separator")).toBeTruthy();
    });

    it("should accept additional ViewProps", () => {
      const { getByTestId } = render(
        <Separator
          spacing="md"
          testID="separator"
          accessibilityLabel="Separator"
        />
      );
      expect(getByTestId("separator")).toBeTruthy();
    });
  });
});
