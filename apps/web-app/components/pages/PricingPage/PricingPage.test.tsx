import { render, screen } from "@/test-utils";

import PricingPage from "./PricingPage";

describe("PricingPage", () => {
  it("renders without crashing", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /^pricing$/i })
    ).toBeInTheDocument();
  });
});
