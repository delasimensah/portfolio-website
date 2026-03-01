import { render, screen } from "@/test-utils";

import AboutPrinciplesSection from "./AboutPrinciplesSection";

describe("AboutPrinciplesSection", () => {
  it("renders the section heading", () => {
    render(<AboutPrinciplesSection />);
    expect(
      screen.getByRole("heading", { name: /core principles/i })
    ).toBeInTheDocument();
  });

  it("renders all principles", () => {
    render(<AboutPrinciplesSection />);
    expect(screen.getByText(/no feature creep/i)).toBeInTheDocument();
    expect(screen.getByText(/no subcontracting/i)).toBeInTheDocument();
    expect(screen.getByText(/no hype/i)).toBeInTheDocument();
    expect(screen.getByText(/no hand-holding/i)).toBeInTheDocument();
  });
});
