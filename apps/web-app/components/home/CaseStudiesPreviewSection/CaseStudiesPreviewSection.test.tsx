import { render, screen } from "@testing-library/react";

import CaseStudiesPreviewSection from "./CaseStudiesPreviewSection";

describe("CaseStudiesPreviewSection", () => {
  it("renders section title", () => {
    render(<CaseStudiesPreviewSection />);
    expect(screen.getByRole("heading", { name: /case studies/i })).toBeInTheDocument();
  });

  it("renders case study cards", () => {
    render(<CaseStudiesPreviewSection />);
    expect(screen.getByText("Aria")).toBeInTheDocument();
    expect(screen.getByText("Crown Lusso")).toBeInTheDocument();
  });

  it("renders View Case Studies button", () => {
    render(<CaseStudiesPreviewSection />);
    expect(screen.getByRole("link", { name: /view case studies/i })).toBeInTheDocument();
  });
});
