import { render, screen } from "@/test-utils";

import MaintenancePlansSection from "./MaintenancePlansSection";

describe("MaintenancePlansSection", () => {
  it("renders the section heading", () => {
    render(<MaintenancePlansSection />);
    expect(
      screen.getByRole("heading", { name: /maintenance plans/i })
    ).toBeInTheDocument();
  });

  it("renders both plans", () => {
    render(<MaintenancePlansSection />);
    expect(screen.getByText("Basic Care")).toBeInTheDocument();
    expect(screen.getByText("Growth Plan")).toBeInTheDocument();
  });
});
