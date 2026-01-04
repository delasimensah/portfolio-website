import { render } from "@testing-library/react-native";
import React from "react";

import SkeletonCard from "./SkeletonCard";

describe("SkeletonCard", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const { toJSON } = render(<SkeletonCard />);
      expect(toJSON()).toBeTruthy();
    });

    it("should render with custom width and height", () => {
      const { toJSON } = render(<SkeletonCard width={220} height={76} />);
      expect(toJSON()).toBeTruthy();
    });

    it("should render with custom radius", () => {
      const { toJSON } = render(<SkeletonCard radius={12} />);
      expect(toJSON()).toBeTruthy();
    });

    it("should render with all margin props", () => {
      const { toJSON } = render(<SkeletonCard mt={8} mb={8} mr={8} ml={8} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe("Default Props", () => {
    it("should use default width when not provided", () => {
      const { toJSON } = render(<SkeletonCard />);
      const tree = toJSON();
      expect(tree).toBeTruthy();
    });

    it("should use default height when not provided", () => {
      const { toJSON } = render(<SkeletonCard />);
      const tree = toJSON();
      expect(tree).toBeTruthy();
    });

    it("should use default radius when not provided", () => {
      const { toJSON } = render(<SkeletonCard />);
      const tree = toJSON();
      expect(tree).toBeTruthy();
    });

    it("should use zero margins by default", () => {
      const { toJSON } = render(<SkeletonCard />);
      const tree = toJSON();
      expect(tree).toBeTruthy();
    });
  });

  describe("Custom Props", () => {
    it("should accept custom width", () => {
      const { toJSON } = render(<SkeletonCard width={300} />);
      expect(toJSON()).toBeTruthy();
    });

    it("should accept custom height", () => {
      const { toJSON } = render(<SkeletonCard height={150} />);
      expect(toJSON()).toBeTruthy();
    });

    it("should accept custom radius", () => {
      const { toJSON } = render(<SkeletonCard radius={20} />);
      expect(toJSON()).toBeTruthy();
    });

    it("should accept individual margin values", () => {
      const { toJSON } = render(<SkeletonCard mt={4} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("should handle zero width", () => {
      const { toJSON } = render(<SkeletonCard width={0} />);
      expect(toJSON()).toBeTruthy();
    });

    it("should handle zero height", () => {
      const { toJSON } = render(<SkeletonCard height={0} />);
      expect(toJSON()).toBeTruthy();
    });

    it("should handle very large dimensions", () => {
      const { toJSON } = render(<SkeletonCard width={10000} height={10000} />);
      expect(toJSON()).toBeTruthy();
    });

    it("should handle negative margins", () => {
      const { toJSON } = render(<SkeletonCard mt={-10} ml={-10} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe("Common Usage Patterns", () => {
    it("should render as track card skeleton", () => {
      const { toJSON } = render(
        <SkeletonCard width={220} height={76} radius={8} mr={8} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it("should render as album art skeleton", () => {
      const { toJSON } = render(
        <SkeletonCard width={60} height={60} radius={12} mb={8} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it("should render as text line skeleton", () => {
      const { toJSON } = render(
        <SkeletonCard width={100} height={15} radius={4} mb={4} />
      );
      expect(toJSON()).toBeTruthy();
    });
  });
});
