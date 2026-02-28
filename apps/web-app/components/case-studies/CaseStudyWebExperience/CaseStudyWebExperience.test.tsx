import { render, screen } from "@testing-library/react";

import CaseStudyWebExperience from "./CaseStudyWebExperience";

const mockProps = {
  webSectionTitle: "Web Experience",
  webSectionLabel: "Desktop Platform",
  webSectionText: ["The web platform is great."],
  webImageSrc: "/images/aria-web.png",
  webImageAlt: "Aria web",
};

describe("CaseStudyWebExperience", () => {
  it("renders the section title", () => {
    render(<CaseStudyWebExperience study={mockProps} />);
    expect(screen.getByRole("heading", { name: /web experience/i })).toBeInTheDocument();
  });

  it("renders the section label and text", () => {
    render(<CaseStudyWebExperience study={mockProps} />);
    expect(screen.getByText(/desktop platform/i)).toBeInTheDocument();
    expect(screen.getByText("The web platform is great.")).toBeInTheDocument();
  });
});
