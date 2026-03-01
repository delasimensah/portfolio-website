import { render, screen } from "@/test-utils";

import FinalCTASection from "./FinalCTASection";

describe("FinalCTASection", () => {
  it("renders headline", () => {
    render(<FinalCTASection />);
    expect(
      screen.getByRole("heading", { name: /ready to build/i })
    ).toBeInTheDocument();
  });

  it("renders CTA button", () => {
    render(<FinalCTASection />);
    expect(
      screen.getByRole("link", { name: /start now/i })
    ).toBeInTheDocument();
  });
});
