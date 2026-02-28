import { render, screen } from "@testing-library/react";

import CaseStudiesPage from "./CaseStudiesPage";

describe("CaseStudiesPage", () => {
  it("renders the Selected Projects heading", () => {
    render(<CaseStudiesPage />);
    expect(screen.getByRole("heading", { name: /selected projects/i })).toBeInTheDocument();
  });
});
