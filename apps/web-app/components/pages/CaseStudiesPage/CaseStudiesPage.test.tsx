import { render, screen } from "@/test-utils";

import CaseStudiesPage from "./CaseStudiesPage";

describe("CaseStudiesPage", () => {
  it("renders the My Work heading", () => {
    render(<CaseStudiesPage />);
    expect(
      screen.getByRole("heading", { name: /my work/i })
    ).toBeInTheDocument();
  });
});
