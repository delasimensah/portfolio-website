import { render, screen } from "@testing-library/react";

import ProductBuildPricingSection from "./ProductBuildPricingSection";

describe("ProductBuildPricingSection", () => {
  it("renders the heading", () => {
    render(<ProductBuildPricingSection />);
    expect(screen.getByRole("heading", { name: /product build/i })).toBeInTheDocument();
  });

  it("renders pricing stats", () => {
    render(<ProductBuildPricingSection />);
    expect(screen.getByText("$1,500")).toBeInTheDocument();
    expect(screen.getByText("4–8 weeks")).toBeInTheDocument();
  });
});
