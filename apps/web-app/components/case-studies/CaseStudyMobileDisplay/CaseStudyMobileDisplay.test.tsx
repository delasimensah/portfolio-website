import { render, screen } from "@/test-utils";

import CaseStudyMobileDisplay from "./CaseStudyMobileDisplay";

describe("CaseStudyMobileDisplay", () => {
  it("renders the mobile experience label", () => {
    render(
      <CaseStudyMobileDisplay
        imageSrc="/images/aria-mobile-ios.png"
        imageAlt="Aria mobile"
        screenshots={[]}
      />
    );
    expect(screen.getByText(/mobile experience/i)).toBeInTheDocument();
  });

  it("renders the image with correct alt text", () => {
    render(
      <CaseStudyMobileDisplay
        imageSrc="/images/aria-mobile-ios.png"
        imageAlt="Aria mobile"
        screenshots={[]}
      />
    );
    expect(screen.getByAltText("Aria mobile")).toBeInTheDocument();
  });
});
