import { render, screen } from "@testing-library/react";

import PaymentTermsSection from "./PaymentTermsSection";

describe("PaymentTermsSection", () => {
  it("renders the section heading", () => {
    render(<PaymentTermsSection />);
    expect(screen.getByRole("heading", { name: /payment terms/i })).toBeInTheDocument();
  });

  it("renders the standard structure heading", () => {
    render(<PaymentTermsSection />);
    expect(screen.getByRole("heading", { name: /standard structure/i })).toBeInTheDocument();
  });

  it("renders both payment splits", () => {
    render(<PaymentTermsSection />);
    expect(screen.getByText("upfront to begin work")).toBeInTheDocument();
    expect(screen.getByText("upon delivery")).toBeInTheDocument();
  });

  it("renders all included items", () => {
    render(<PaymentTermsSection />);
    expect(screen.getByText("Discovery and scoping session")).toBeInTheDocument();
    expect(screen.getByText("All development work")).toBeInTheDocument();
    expect(screen.getByText("Deployment and handoff")).toBeInTheDocument();
    expect(screen.getByText("2 weeks post-launch support")).toBeInTheDocument();
  });
});
