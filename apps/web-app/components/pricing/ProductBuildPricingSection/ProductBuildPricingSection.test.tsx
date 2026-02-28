import { render, screen } from "@testing-library/react";

import ProductBuildPricingSection from "./ProductBuildPricingSection";

describe("ProductBuildPricingSection", () => {
  it("renders the heading", () => {
    render(<ProductBuildPricingSection />);
    expect(screen.getByRole("heading", { name: /product build/i })).toBeInTheDocument();
  });

  it("renders pricing stats", () => {
    render(<ProductBuildPricingSection />);
    expect(screen.getByText("$3,000")).toBeInTheDocument();
    expect(screen.getByText("6–8 weeks")).toBeInTheDocument();
  });
});
