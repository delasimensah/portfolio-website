import { render, screen } from "@/test-utils";

import ProductionCostsSection from "./ProductionCostsSection";

describe("ProductionCostsSection", () => {
  it("renders the heading", () => {
    render(<ProductionCostsSection />);
    expect(
      screen.getByRole("heading", { name: /production costs/i })
    ).toBeInTheDocument();
  });

  it("renders cost rows", () => {
    render(<ProductionCostsSection />);
    expect(screen.getByText("Apple Developer Account")).toBeInTheDocument();
    expect(screen.getByText("$99/year")).toBeInTheDocument();
  });
});
