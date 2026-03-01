import { render, screen } from "@/test-utils";

import HowIWorkSection from "./HowIWorkSection";

describe("HowIWorkSection", () => {
  it("renders section title", () => {
    render(<HowIWorkSection />);
    expect(
      screen.getByRole("heading", { name: /how i work/i })
    ).toBeInTheDocument();
  });

  it("renders all 4 steps", () => {
    render(<HowIWorkSection />);
    expect(screen.getByText("Define")).toBeInTheDocument();
    expect(screen.getByText("Simplify")).toBeInTheDocument();
    expect(screen.getByText("Build")).toBeInTheDocument();
    expect(screen.getByText("Launch")).toBeInTheDocument();
  });
});
