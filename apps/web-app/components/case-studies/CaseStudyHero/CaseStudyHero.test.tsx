import { render, screen } from "@/test-utils";

import CaseStudyHero from "./CaseStudyHero";

describe("CaseStudyHero", () => {
  it("renders the title and tagline", () => {
    render(<CaseStudyHero title="Aria" tagline="Empowering artists." />);
    expect(screen.getByRole("heading", { name: /aria/i })).toBeInTheDocument();
    expect(screen.getByText("Empowering artists.")).toBeInTheDocument();
  });

  it("renders the Project badge", () => {
    render(<CaseStudyHero title="Test" tagline="Tagline" />);
    expect(screen.getByText("Project")).toBeInTheDocument();
  });
});
