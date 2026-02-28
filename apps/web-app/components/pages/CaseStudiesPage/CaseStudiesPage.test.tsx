import { render, screen } from "@testing-library/react";

import CaseStudiesPage from "./CaseStudiesPage";

describe("CaseStudiesPage", () => {
  it("renders without crashing", () => {
    render(<CaseStudiesPage />);
    expect(screen.getByRole("heading", { name: /case studies/i })).toBeInTheDocument();
  });
});
