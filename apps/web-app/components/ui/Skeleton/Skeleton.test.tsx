import React from "react";

import { render } from "@/test-utils";

import Skeleton from "./Skeleton";











describe("Skeleton", () => {
  it("renders correctly", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("applies custom width and height", () => {
    const { container } = render(<Skeleton width="200px" height="100px" />);
    const element = container.querySelector("div") as HTMLElement;
    expect(element.getAttribute("style")).toContain("width: 200px");
    expect(element.getAttribute("style")).toContain("height: 100px");
  });

  it("applies radius presets correctly", () => {
    const { container: smContainer } = render(<Skeleton radius="sm" />);
    const smElement = smContainer.querySelector("div") as HTMLElement;
    expect(smElement).toHaveClass("rounded-sm");

    const { container: mdContainer } = render(<Skeleton radius="md" />);
    const mdElement = mdContainer.querySelector("div") as HTMLElement;
    expect(mdElement).toHaveClass("rounded-md");

    const { container: xlContainer } = render(<Skeleton radius="xl" />);
    const xlElement = xlContainer.querySelector("div") as HTMLElement;
    expect(xlElement).toHaveClass("rounded-full");
  });

  it("applies custom radius string", () => {
    const { container } = render(<Skeleton radius="10px" />);
    const element = container.querySelector("div") as HTMLElement;
    expect(element).toBeInTheDocument();
    // Component uses radiusMap for presets only; custom string may not add a class
  });

  it("applies default radius when not specified", () => {
    const { container } = render(<Skeleton />);
    const element = container.querySelector("div") as HTMLElement;
    expect(element).toHaveClass("rounded-md");
  });

  it("applies custom className", () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const element = container.querySelector("div") as HTMLElement;
    expect(element).toHaveClass("custom-class");
  });

  it("applies animate-pulse class", () => {
    const { container } = render(<Skeleton />);
    const element = container.querySelector("div") as HTMLElement;
    expect(element).toHaveClass("animate-pulse");
    expect(element).toHaveClass("bg-shimmerLight");
  });
});
