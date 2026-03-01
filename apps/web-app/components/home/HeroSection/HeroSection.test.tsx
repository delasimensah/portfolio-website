import { render, screen } from "@/test-utils";

import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders headline", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/web and mobile products delivered in 4–8 weeks/i)
    ).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("link", { name: /build your product/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view my work/i })
    ).toBeInTheDocument();
  });
});
