import { render, screen } from "@/test-utils";

import AboutBioSection from "./AboutBioSection";

describe("AboutBioSection", () => {
  it("renders the bio heading", () => {
    render(<AboutBioSection />);
    expect(
      screen.getByRole("heading", { name: /product-minded developer/i })
    ).toBeInTheDocument();
  });

  it("renders bio content", () => {
    render(<AboutBioSection />);
    expect(
      screen.getByText(/founders and small businesses/i)
    ).toBeInTheDocument();
  });
});
