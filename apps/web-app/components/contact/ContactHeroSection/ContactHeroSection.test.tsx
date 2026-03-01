import { render, screen } from "@testing-library/react";

import ContactHeroSection from "./ContactHeroSection";

describe("ContactHeroSection", () => {
  it("renders the heading", () => {
    render(<ContactHeroSection />);
    expect(screen.getByRole("heading", { name: /let's build something/i })).toBeInTheDocument();
  });

  it("renders pricing info", () => {
    render(<ContactHeroSection />);
    expect(screen.getByText(/projects start at \$1,500/i)).toBeInTheDocument();
  });
});
