import { render, screen } from "@/test-utils";

import CaseStudiesPreviewSection from "./CaseStudiesPreviewSection";

describe("CaseStudiesPreviewSection", () => {
  it("renders section title", () => {
    render(<CaseStudiesPreviewSection />);
    expect(
      screen.getByRole("heading", { name: /my work/i })
    ).toBeInTheDocument();
  });

  it("renders case study cards", () => {
    render(<CaseStudiesPreviewSection />);
    expect(screen.getByText("Aria")).toBeInTheDocument();
    expect(screen.getByText("Crown Lusso")).toBeInTheDocument();
  });

  it("renders View My Work button", () => {
    render(<CaseStudiesPreviewSection />);
    expect(
      screen.getByRole("link", { name: /view my work/i })
    ).toBeInTheDocument();
  });
});
