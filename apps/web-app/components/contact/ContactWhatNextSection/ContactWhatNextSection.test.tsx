import { render, screen } from "@/test-utils";

import ContactWhatNextSection from "./ContactWhatNextSection";

describe("ContactWhatNextSection", () => {
  it("renders the section heading", () => {
    render(<ContactWhatNextSection />);
    expect(
      screen.getByRole("heading", { name: /what happens next/i })
    ).toBeInTheDocument();
  });

  it("renders the good fit and not a fit sections", () => {
    render(<ContactWhatNextSection />);
    expect(
      screen.getByRole("heading", { name: /if it's a good fit/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /not the right fit/i })
    ).toBeInTheDocument();
  });

  it("renders the ownership note", () => {
    render(<ContactWhatNextSection />);
    expect(screen.getByText(/full ownership/i)).toBeInTheDocument();
  });
});
