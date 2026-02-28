import { render, screen } from "@testing-library/react";

import CaseStudyListCard from "./CaseStudyListCard";

const mockStudy = {
  id: "aria",
  title: "Aria",
  description: "Direct-to-fan music monetization",
  tagline: "Empowering artists to earn directly from their fans.",
  timeline: "8 Weeks",
  value: "$5,000+",
  platforms: "Web + Mobile",
  additionalStats: [],
  techList: ["React Native mobile app"],
  mobileImageSrc: "/images/aria-mobile-ios.png",
  mobileImageAlt: "Aria mobile",
  webImageSrc: "/images/aria-web.png",
  webImageAlt: "Aria web",
  webSectionTitle: "Web Experience",
  webSectionLabel: "Desktop Platform",
  webSectionText: ["A great platform."],
  problem: ["Artists struggle to earn."],
  problemHighlight: "Aria solves this.",
  solution: { type: "cards" as const, items: [] },
  outcomes: [],
};

describe("CaseStudyListCard", () => {
  it("renders the study title", () => {
    render(<CaseStudyListCard study={mockStudy} />);
    expect(screen.getByRole("heading", { name: /aria/i })).toBeInTheDocument();
  });

  it("renders timeline and value", () => {
    render(<CaseStudyListCard study={mockStudy} />);
    expect(screen.getByText("8 Weeks")).toBeInTheDocument();
    expect(screen.getByText("$5,000+")).toBeInTheDocument();
  });
});
