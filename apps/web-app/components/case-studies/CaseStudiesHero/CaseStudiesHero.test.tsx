import { render, screen } from "@testing-library/react";

import CaseStudiesHero from "./CaseStudiesHero";

describe("CaseStudiesHero", () => {
  it("renders the heading", () => {
    render(<CaseStudiesHero />);
    expect(screen.getByRole("heading", { name: /selected projects/i })).toBeInTheDocument();
  });
});
