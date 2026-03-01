import { render, screen } from "@testing-library/react";

import ContactFAQSection from "./ContactFAQSection";

describe("ContactFAQSection", () => {
  it("renders the section heading", () => {
    render(<ContactFAQSection />);
    expect(screen.getByText(/frequently asked questions/i)).toBeInTheDocument();
  });

  it("renders all 10 FAQ questions", () => {
    render(<ContactFAQSection />);
    expect(screen.getByText(/how much does a project cost/i)).toBeInTheDocument();
    expect(screen.getByText(/how long does it take/i)).toBeInTheDocument();
    expect(screen.getByText(/will I own the code/i)).toBeInTheDocument();
  });
});
