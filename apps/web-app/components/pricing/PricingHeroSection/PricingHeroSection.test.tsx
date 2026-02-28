import { render, screen } from "@testing-library/react";

import PricingHeroSection from "./PricingHeroSection";

describe("PricingHeroSection", () => {
  it("renders the heading", () => {
    render(<PricingHeroSection />);
    expect(screen.getByRole("heading", { name: /pricing/i })).toBeInTheDocument();
  });
});
