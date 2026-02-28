import { render, screen } from "@testing-library/react";

import FinalCTASection from "./FinalCTASection";

describe("FinalCTASection", () => {
  it("renders headline", () => {
    render(<FinalCTASection />);
    expect(screen.getByRole("heading", { name: /ready to build/i })).toBeInTheDocument();
  });

  it("renders CTA button", () => {
    render(<FinalCTASection />);
    expect(screen.getByRole("link", { name: /start your project/i })).toBeInTheDocument();
  });
});
