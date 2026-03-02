import { render, screen } from "@/test-utils";

import CaseStudyPage from "./CaseStudyPage";

const mockStudy = {
  id: "aria",
  title: "Aria",
  description: "Direct-to-fan music monetization",
  tagline: "Empowering artists to earn directly from their fans.",
  timeline: "8 Weeks",
  value: "$6,000+",
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

describe("CaseStudyPage", () => {
  it("renders the study title in the hero", () => {
    render(<CaseStudyPage study={mockStudy} />);
    expect(screen.getByRole("heading", { name: /aria/i })).toBeInTheDocument();
  });
});
