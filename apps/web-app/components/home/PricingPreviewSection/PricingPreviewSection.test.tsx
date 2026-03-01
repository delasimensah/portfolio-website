import { render, screen } from "@/test-utils";

import PricingPreviewSection from "./PricingPreviewSection";

describe("PricingPreviewSection", () => {
  it("renders starting price", () => {
    render(<PricingPreviewSection />);
    expect(screen.getByText("$1,500")).toBeInTheDocument();
  });

  it("renders View Services button", () => {
    render(<PricingPreviewSection />);
    expect(
      screen.getByRole("link", { name: /view services/i })
    ).toBeInTheDocument();
  });
});
