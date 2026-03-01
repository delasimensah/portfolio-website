import { render, screen } from "@/test-utils";

import ServicesHeroSection from "./ServicesHeroSection";

describe("ServicesHeroSection", () => {
  it("renders the heading", () => {
    render(<ServicesHeroSection />);
    expect(
      screen.getByRole("heading", { name: /services/i })
    ).toBeInTheDocument();
  });
});
