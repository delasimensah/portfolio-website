import { render, screen } from "@testing-library/react";

import FadeInSection from "./FadeInSection";

describe("FadeInSection", () => {
  it("renders children", () => {
    render(<FadeInSection>Content</FadeInSection>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
