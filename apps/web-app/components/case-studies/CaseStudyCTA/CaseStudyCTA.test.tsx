import { render, screen } from "@/test-utils";

import CaseStudyCTA from "./CaseStudyCTA";

describe("CaseStudyCTA", () => {
  it("renders the CTA heading", () => {
    render(<CaseStudyCTA />);
    expect(
      screen.getByRole("heading", {
        name: /want to build something like this/i,
      })
    ).toBeInTheDocument();
  });

  it("renders both CTA links", () => {
    render(<CaseStudyCTA />);
    expect(
      screen.getByRole("link", { name: /build your product/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view my work/i })
    ).toBeInTheDocument();
  });
});
