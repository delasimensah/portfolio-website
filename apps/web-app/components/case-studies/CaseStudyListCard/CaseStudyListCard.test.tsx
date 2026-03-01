import { render, screen } from "@/test-utils";

import CaseStudyListCard from "./CaseStudyListCard";

const mockStudy = {
  id: "aria",
  title: "Aria",
  description: "Direct-to-fan music monetization",
  tagline: "Empowering artists to earn directly from their fans.",
  timeline: "8 Weeks",
  value: "$5,500+",
  platforms: "Web + Mobile",
  additionalStats: [],
  techList: ["React Native mobile app"],
  mobileImageSrc: "/images/aria-mobile-ios.png",
  mobileImageAlt: "Aria mobile",
  mobileScreenshots: [] as { src: string; alt: string }[],
  webImageSrc: "/images/aria-web.png",
  webImageAlt: "Aria web",
  webScreenshots: [] as { src: string; alt: string }[],
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
    expect(screen.getByText("$5,500+")).toBeInTheDocument();
  });
});
