import { render, screen } from "@/test-utils";

import CaseStudyProblem from "./CaseStudyProblem";

describe("CaseStudyProblem", () => {
  it("renders The Problem heading", () => {
    render(
      <CaseStudyProblem
        study={{
          problem: ["Artists struggle to earn."],
          problemHighlight: "Aria solves this.",
        }}
      />
    );
    expect(
      screen.getByRole("heading", { name: /the problem/i })
    ).toBeInTheDocument();
  });

  it("renders problem paragraphs and highlight", () => {
    render(
      <CaseStudyProblem
        study={{
          problem: ["Artists struggle to earn."],
          problemHighlight: "Aria solves this.",
        }}
      />
    );
    expect(screen.getByText("Artists struggle to earn.")).toBeInTheDocument();
    expect(screen.getByText("Aria solves this.")).toBeInTheDocument();
  });
});
