import { render, screen } from "@testing-library/react";

import CaseStudyOutcome from "./CaseStudyOutcome";

describe("CaseStudyOutcome", () => {
  it("renders the Outcome heading", () => {
    render(<CaseStudyOutcome outcomes={[]} />);
    expect(screen.getByRole("heading", { name: /outcome/i })).toBeInTheDocument();
  });

  it("renders each outcome item", () => {
    render(
      <CaseStudyOutcome
        outcomes={[{ iconKey: "users", stat: "500+", description: "Active users" }]}
      />
    );
    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("Active users")).toBeInTheDocument();
  });
});
