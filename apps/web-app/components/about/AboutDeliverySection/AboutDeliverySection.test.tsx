import { render, screen } from "@/test-utils";

import AboutDeliverySection from "./AboutDeliverySection";

describe("AboutDeliverySection", () => {
  it("renders the pricing and timeline headline", () => {
    render(<AboutDeliverySection />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders the CTA button", () => {
    render(<AboutDeliverySection />);
    expect(
      screen.getByRole("link", { name: /start your project/i })
    ).toBeInTheDocument();
  });
});
