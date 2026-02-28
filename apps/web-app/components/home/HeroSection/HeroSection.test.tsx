import { render, screen } from "@testing-library/react";

import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders headline", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/web and mobile products delivered in 6–8 weeks/i)
    ).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: /start your project/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view case studies/i })).toBeInTheDocument();
  });
});
