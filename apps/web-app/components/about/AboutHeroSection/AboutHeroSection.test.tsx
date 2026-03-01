import { render, screen } from "@/test-utils";

import AboutHeroSection from "./AboutHeroSection";

describe("AboutHeroSection", () => {
  it("renders the About badge", () => {
    render(<AboutHeroSection />);
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders the profile image", () => {
    render(<AboutHeroSection />);
    expect(screen.getByAltText("Delasi Mensah")).toBeInTheDocument();
  });

  it("renders the hero headline", () => {
    render(<AboutHeroSection />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
