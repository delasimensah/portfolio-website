import { render, screen } from "@/test-utils";

import PricingCTASection from "./PricingCTASection";

describe("PricingCTASection", () => {
  it("renders the heading", () => {
    render(<PricingCTASection />);
    expect(
      screen.getByRole("heading", { name: /ready to get started/i })
    ).toBeInTheDocument();
  });

  it("renders CTA links", () => {
    render(<PricingCTASection />);
    expect(
      screen.getByRole("link", { name: /start your project/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view services/i })
    ).toBeInTheDocument();
  });
});
