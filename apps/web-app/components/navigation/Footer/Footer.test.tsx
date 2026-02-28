import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("Footer", () => {
  it("renders brand name", () => {
    render(<Footer />);
    expect(screen.getByText(/devstudio/i)).toBeInTheDocument();
  });

  it("renders Services section", () => {
    render(<Footer />);
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Web Development")).toBeInTheDocument();
  });

  it("renders Company section", () => {
    render(<Footer />);
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });

  it("renders Connect section with social links", () => {
    render(<Footer />);
    expect(screen.getByText("Connect")).toBeInTheDocument();
  });
});
