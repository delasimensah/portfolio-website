import { render, screen } from "@/test-utils";

import AppTypesSection from "./AppTypesSection";

describe("AppTypesSection", () => {
  it("renders the heading", () => {
    render(<AppTypesSection />);
    expect(
      screen.getByRole("heading", { name: /products I build/i })
    ).toBeInTheDocument();
  });

  it("renders app type cards", () => {
    render(<AppTypesSection />);
    expect(screen.getByText("Booking Systems")).toBeInTheDocument();
    expect(screen.getByText("CRM Systems")).toBeInTheDocument();
  });
});
