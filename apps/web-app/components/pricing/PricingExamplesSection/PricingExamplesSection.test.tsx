import { render, screen } from "@/test-utils";

import PricingExamplesSection from "./PricingExamplesSection";

describe("PricingExamplesSection", () => {
  it("renders the section heading", () => {
    render(<PricingExamplesSection />);
    expect(screen.getByText("Pricing Examples")).toBeInTheDocument();
  });

  it("renders all three platform examples", () => {
    render(<PricingExamplesSection />);
    expect(screen.getByText("Web App Only")).toBeInTheDocument();
    expect(screen.getByText("Mobile App Only")).toBeInTheDocument();
    expect(screen.getByText("Web + Mobile")).toBeInTheDocument();
  });

  it("renders the starting prices", () => {
    render(<PricingExamplesSection />);
    expect(screen.getByText("~$1,500")).toBeInTheDocument();
    expect(screen.getByText("~$2,000")).toBeInTheDocument();
    expect(screen.getByText("~$4,000")).toBeInTheDocument();
  });

  it("renders the complexity note", () => {
    render(<PricingExamplesSection />);
    expect(
      screen.getByText(/More complexity = higher cost/i)
    ).toBeInTheDocument();
  });
});
