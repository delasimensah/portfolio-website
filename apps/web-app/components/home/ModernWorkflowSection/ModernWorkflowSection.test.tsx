import { render, screen } from "@testing-library/react";

import ModernWorkflowSection from "./ModernWorkflowSection";

describe("ModernWorkflowSection", () => {
  it("renders headline", () => {
    render(<ModernWorkflowSection />);
    expect(
      screen.getByText(/built with modern tools/i)
    ).toBeInTheDocument();
  });

  it("renders benefits", () => {
    render(<ModernWorkflowSection />);
    expect(screen.getByText("Faster build times")).toBeInTheDocument();
    expect(screen.getByText("Cleaner iterations")).toBeInTheDocument();
  });
});
