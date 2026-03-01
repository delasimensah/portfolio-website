import { render, screen } from "@/test-utils";

import ContactHeroSection from "./ContactHeroSection";

describe("ContactHeroSection", () => {
  it("renders the heading", () => {
    render(<ContactHeroSection />);
    expect(
      screen.getByRole("heading", { name: /let's build together/i })
    ).toBeInTheDocument();
  });

  it("renders pricing info", () => {
    render(<ContactHeroSection />);
    expect(screen.getByText(/projects start at \$1,500/i)).toBeInTheDocument();
  });
});
