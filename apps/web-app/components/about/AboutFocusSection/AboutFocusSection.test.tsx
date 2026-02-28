import { render, screen } from "@testing-library/react";

import AboutFocusSection from "./AboutFocusSection";

describe("AboutFocusSection", () => {
  it("renders the section heading", () => {
    render(<AboutFocusSection />);
    expect(screen.getByRole("heading", { name: /i focus on/i })).toBeInTheDocument();
  });

  it("renders all focus items", () => {
    render(<AboutFocusSection />);
    expect(screen.getByText("Clear scoping")).toBeInTheDocument();
    expect(screen.getByText("Defined timelines")).toBeInTheDocument();
    expect(screen.getByText("Clean architecture")).toBeInTheDocument();
    expect(screen.getByText("Practical solutions")).toBeInTheDocument();
    expect(screen.getByText("Transparent pricing")).toBeInTheDocument();
  });
});
