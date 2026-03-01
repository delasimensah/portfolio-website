import { render, screen } from "@testing-library/react";

import PricingPreviewSection from "./PricingPreviewSection";

describe("PricingPreviewSection", () => {
  it("renders starting price", () => {
    render(<PricingPreviewSection />);
    expect(screen.getByText("$1,500")).toBeInTheDocument();
  });

  it("renders View Pricing button", () => {
    render(<PricingPreviewSection />);
    expect(screen.getByRole("link", { name: /view pricing/i })).toBeInTheDocument();
  });
});
