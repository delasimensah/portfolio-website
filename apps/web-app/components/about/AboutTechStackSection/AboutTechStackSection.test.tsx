import { render, screen } from "@/test-utils";

import AboutTechStackSection from "./AboutTechStackSection";

describe("AboutTechStackSection", () => {
  it("renders the tech stack heading", () => {
    render(<AboutTechStackSection />);
    expect(
      screen.getByRole("heading", { name: /the tech stack/i })
    ).toBeInTheDocument();
  });

  it("renders all four tech categories", () => {
    render(<AboutTechStackSection />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Deployment")).toBeInTheDocument();
    expect(screen.getByText("Tools")).toBeInTheDocument();
  });

  it("renders the Why This Stack section", () => {
    render(<AboutTechStackSection />);
    expect(
      screen.getByRole("heading", { name: /why this stack/i })
    ).toBeInTheDocument();
  });
});
