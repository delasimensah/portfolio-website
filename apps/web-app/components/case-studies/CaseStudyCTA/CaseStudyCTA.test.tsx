import { render, screen } from "@testing-library/react";

import CaseStudyCTA from "./CaseStudyCTA";

describe("CaseStudyCTA", () => {
  it("renders the CTA heading", () => {
    render(<CaseStudyCTA />);
    expect(screen.getByRole("heading", { name: /ready to build/i })).toBeInTheDocument();
  });

  it("renders both CTA links", () => {
    render(<CaseStudyCTA />);
    expect(screen.getByRole("link", { name: /start your project/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view my work/i })).toBeInTheDocument();
  });
});
