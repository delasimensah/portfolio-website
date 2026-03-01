import { render, screen } from "@/test-utils";

import TypicalTimelineSection from "./TypicalTimelineSection";

describe("TypicalTimelineSection", () => {
  it("renders the section heading", () => {
    render(<TypicalTimelineSection />);
    expect(
      screen.getByRole("heading", { name: /typical timeline/i })
    ).toBeInTheDocument();
  });

  it("renders all four timeline phases", () => {
    render(<TypicalTimelineSection />);
    expect(screen.getByText(/week 1/i)).toBeInTheDocument();
    expect(screen.getByText(/discovery & design/i)).toBeInTheDocument();
    expect(screen.getByText(/weeks 2-4/i)).toBeInTheDocument();
    expect(screen.getByText(/development/i)).toBeInTheDocument();
    expect(screen.getByText(/week 5/i)).toBeInTheDocument();
    expect(screen.getByText(/testing & polish/i)).toBeInTheDocument();
    expect(screen.getByText(/week 6/i)).toBeInTheDocument();
    expect(screen.getByText(/deployment & launch/i)).toBeInTheDocument();
  });
});
