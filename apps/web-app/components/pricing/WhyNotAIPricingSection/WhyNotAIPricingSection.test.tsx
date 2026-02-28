import { render, screen } from "@testing-library/react";

import WhyNotAIPricingSection from "./WhyNotAIPricingSection";

describe("WhyNotAIPricingSection", () => {
  it("renders the section heading", () => {
    render(<WhyNotAIPricingSection />);
    expect(screen.getByRole("heading", { name: /why not just use an ai tool/i })).toBeInTheDocument();
  });

  it("renders value props", () => {
    render(<WhyNotAIPricingSection />);
    expect(screen.getByText("Structured scoping")).toBeInTheDocument();
    expect(screen.getByText("Launch-ready delivery")).toBeInTheDocument();
  });
});
