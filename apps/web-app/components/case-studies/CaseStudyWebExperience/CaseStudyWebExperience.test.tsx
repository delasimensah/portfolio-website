import { render, screen } from "@/test-utils";

import CaseStudyWebExperience from "./CaseStudyWebExperience";

const mockProps = {
  study: {
    webSectionTitle: "Web Experience",
    webSectionLabel: "Desktop Platform",
    webSectionText: ["The web platform is great."],
    webImageSrc: "/images/aria-web.png",
    webImageAlt: "Aria web",
  },
  screenshots: [] as { src: string; alt: string }[],
};

describe("CaseStudyWebExperience", () => {
  it("renders the section title", () => {
    render(
      <CaseStudyWebExperience
        study={mockProps.study}
        screenshots={mockProps.screenshots}
      />
    );
    expect(
      screen.getByRole("heading", { name: /web experience/i })
    ).toBeInTheDocument();
  });

  it("renders the section label and text", () => {
    render(
      <CaseStudyWebExperience
        study={mockProps.study}
        screenshots={mockProps.screenshots}
      />
    );
    expect(screen.getByText(/desktop platform/i)).toBeInTheDocument();
    expect(screen.getByText("The web platform is great.")).toBeInTheDocument();
  });
});
