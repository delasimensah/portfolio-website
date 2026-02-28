import { render, screen } from "@testing-library/react";

import CaseStudyPage from "./CaseStudyPage";

const mockStudy = {
  id: "aria",
  title: "Aria",
  description: "Direct-to-fan music monetization",
  imageSrc: "/images/aria-web.png",
  imageAlt: "Aria web app screenshot",
};

describe("CaseStudyPage", () => {
  it("renders the study title", () => {
    render(<CaseStudyPage study={mockStudy} />);
    expect(screen.getByRole("heading", { name: /aria/i })).toBeInTheDocument();
  });
});
