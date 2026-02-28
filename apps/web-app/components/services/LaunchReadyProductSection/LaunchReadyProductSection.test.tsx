import { render, screen } from "@testing-library/react";

import LaunchReadyProductSection from "./LaunchReadyProductSection";

describe("LaunchReadyProductSection", () => {
  it("renders the heading", () => {
    render(<LaunchReadyProductSection />);
    expect(screen.getByRole("heading", { name: /launch-ready product build/i })).toBeInTheDocument();
  });

  it("renders timeline and price", () => {
    render(<LaunchReadyProductSection />);
    expect(screen.getByText("6–8 weeks")).toBeInTheDocument();
    expect(screen.getByText("$3,000")).toBeInTheDocument();
  });
});
