import { render, screen } from "@/test-utils";

import PricingHeroSection from "./PricingHeroSection";

describe("PricingHeroSection", () => {
  it("renders the heading", () => {
    render(<PricingHeroSection />);
    expect(
      screen.getByRole("heading", { name: /pricing/i })
    ).toBeInTheDocument();
  });
});
