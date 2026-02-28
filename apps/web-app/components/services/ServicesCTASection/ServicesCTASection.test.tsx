import { render, screen } from "@testing-library/react";

import ServicesCTASection from "./ServicesCTASection";

describe("ServicesCTASection", () => {
  it("renders the heading", () => {
    render(<ServicesCTASection />);
    expect(screen.getByRole("heading", { name: /ready to build/i })).toBeInTheDocument();
  });

  it("renders CTA links", () => {
    render(<ServicesCTASection />);
    expect(screen.getByRole("link", { name: /start your project/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view pricing/i })).toBeInTheDocument();
  });
});
