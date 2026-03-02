import { render, screen } from "@/test-utils";

import CaseStudyOverview from "./CaseStudyOverview";

describe("CaseStudyOverview", () => {
  it("renders Project Overview heading", () => {
    render(
      <CaseStudyOverview
        study={{
          timeline: "8 Weeks",
          value: "$6,000+",
          platforms: "Web + Mobile",
          additionalStats: [],
        }}
      />
    );
    expect(
      screen.getByRole("heading", { name: /project overview/i })
    ).toBeInTheDocument();
  });

  it("renders timeline and value stats", () => {
    render(
      <CaseStudyOverview
        study={{
          timeline: "8 Weeks",
          value: "$6,000+",
          platforms: "Web + Mobile",
          additionalStats: [],
        }}
      />
    );
    expect(screen.getByText("8 Weeks")).toBeInTheDocument();
    expect(screen.getByText("$6,000+")).toBeInTheDocument();
  });
});
