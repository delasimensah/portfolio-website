import { render, screen } from "@/test-utils";

import CaseStudyCard from "./CaseStudyCard";

describe("CaseStudyCard", () => {
  it("renders title and description", () => {
    render(
      <CaseStudyCard
        title="Aria"
        description="Direct-to-fan music monetization"
        imageSrc="/images/aria-web.png"
        imageAlt="Aria web app screenshot"
      />
    );
    expect(screen.getByText("Aria")).toBeInTheDocument();
    expect(
      screen.getByText("Direct-to-fan music monetization")
    ).toBeInTheDocument();
  });
});
