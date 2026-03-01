import { render, screen } from "@/test-utils";

import Footer from "./Footer";

describe("Footer", () => {
  it("renders brand name", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(/delasi mensah/i);
  });

  it("renders Company section with links", () => {
    render(<Footer />);
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
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
