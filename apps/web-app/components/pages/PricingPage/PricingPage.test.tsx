import { render, screen } from "@testing-library/react";

import PricingPage from "./PricingPage";

describe("PricingPage", () => {
  it("renders without crashing", () => {
    render(<PricingPage />);
    expect(screen.getByRole("heading", { name: /pricing/i })).toBeInTheDocument();
  });
});
