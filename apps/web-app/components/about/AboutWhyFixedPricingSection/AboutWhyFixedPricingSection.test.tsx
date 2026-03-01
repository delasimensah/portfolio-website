import { render, screen } from "@/test-utils";

import AboutWhyFixedPricingSection from "./AboutWhyFixedPricingSection";

describe("AboutWhyFixedPricingSection", () => {
  it("renders the section heading", () => {
    render(<AboutWhyFixedPricingSection />);
    expect(
      screen.getByRole("heading", { name: /why fixed scope/i })
    ).toBeInTheDocument();
  });

  it("renders the hourly billing explanation", () => {
    render(<AboutWhyFixedPricingSection />);
    expect(
      screen.getByText(/hourly billing creates perverse incentives/i)
    ).toBeInTheDocument();
  });

  it("renders the discovery note", () => {
    render(<AboutWhyFixedPricingSection />);
    expect(screen.getByText(/discovery is so important/i)).toBeInTheDocument();
  });
});
