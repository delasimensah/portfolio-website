import { render, screen } from "@testing-library/react";

import CaseStudyMobileDisplay from "./CaseStudyMobileDisplay";

describe("CaseStudyMobileDisplay", () => {
  it("renders the mobile experience label", () => {
    render(<CaseStudyMobileDisplay imageSrc="/images/aria-mobile-ios.png" imageAlt="Aria mobile" />);
    expect(screen.getByText(/mobile experience/i)).toBeInTheDocument();
  });

  it("renders the image with correct alt text", () => {
    render(<CaseStudyMobileDisplay imageSrc="/images/aria-mobile-ios.png" imageAlt="Aria mobile" />);
    expect(screen.getByAltText("Aria mobile")).toBeInTheDocument();
  });
});
