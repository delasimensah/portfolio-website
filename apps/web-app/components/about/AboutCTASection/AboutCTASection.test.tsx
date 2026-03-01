import { render, screen } from "@/test-utils";

import AboutCTASection from "./AboutCTASection";

describe("AboutCTASection", () => {
  it("renders the section heading", () => {
    render(<AboutCTASection />);
    expect(
      screen.getByRole("heading", { name: /want to work together/i })
    ).toBeInTheDocument();
  });

  it("renders the CTA buttons", () => {
    render(<AboutCTASection />);
    expect(
      screen.getByRole("link", { name: /build your product/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view services/i })
    ).toBeInTheDocument();
  });
});
