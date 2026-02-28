import { render, screen } from "@testing-library/react";

import AboutWhoIWorkWithSection from "./AboutWhoIWorkWithSection";

describe("AboutWhoIWorkWithSection", () => {
  it("renders the section heading", () => {
    render(<AboutWhoIWorkWithSection />);
    expect(screen.getByRole("heading", { name: /who i work with/i })).toBeInTheDocument();
  });

  it("renders both client types", () => {
    render(<AboutWhoIWorkWithSection />);
    expect(screen.getByText("Founders")).toBeInTheDocument();
    expect(screen.getByText("Businesses")).toBeInTheDocument();
  });
});
