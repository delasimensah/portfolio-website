import { render, screen } from "@/test-utils";

import FadeInSection from "./FadeInSection";

describe("FadeInSection", () => {
  it("renders children", () => {
    render(<FadeInSection>Content</FadeInSection>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
