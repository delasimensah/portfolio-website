import { render, screen } from "@testing-library/react";

import WhereAIFitsInSection from "./WhereAIFitsInSection";

describe("WhereAIFitsInSection", () => {
  it("renders the section heading", () => {
    render(<WhereAIFitsInSection />);
    expect(screen.getByRole("heading", { name: /where ai fits in/i })).toBeInTheDocument();
  });

  it("renders the AI tool tagline", () => {
    render(<WhereAIFitsInSection />);
    expect(screen.getByText(/ai is a tool/i)).toBeInTheDocument();
  });
});
