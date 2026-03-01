import { render, screen } from "@/test-utils";

import AboutApproachSection from "./AboutApproachSection";

describe("AboutApproachSection", () => {
  it("renders the section heading", () => {
    render(<AboutApproachSection />);
    expect(
      screen.getByRole("heading", { name: /my approach/i })
    ).toBeInTheDocument();
  });

  it("renders both approach cards", () => {
    render(<AboutApproachSection />);
    expect(screen.getByText("Modern Tools & AI")).toBeInTheDocument();
    expect(screen.getByText("Human Oversight")).toBeInTheDocument();
  });
});
