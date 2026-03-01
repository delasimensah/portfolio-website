import { render, screen } from "@/test-utils";

import PricingPage from "./PricingPage";

describe("PricingPage", () => {
  it("renders without crashing", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { name: /pricing/i })
    ).toBeInTheDocument();
  });
});
