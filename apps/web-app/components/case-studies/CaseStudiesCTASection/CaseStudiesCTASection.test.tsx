import { render, screen } from "@testing-library/react";

import CaseStudiesCTASection from "./CaseStudiesCTASection";

describe("CaseStudiesCTASection", () => {
  it("renders the heading", () => {
    render(<CaseStudiesCTASection />);
    expect(screen.getByRole("heading", { name: /ready to build/i })).toBeInTheDocument();
  });

  it("renders CTA links", () => {
    render(<CaseStudiesCTASection />);
    expect(screen.getByRole("link", { name: /start your project/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view pricing/i })).toBeInTheDocument();
  });
});
