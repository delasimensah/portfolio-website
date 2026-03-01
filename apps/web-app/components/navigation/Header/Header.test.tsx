import { render, screen } from "@/test-utils";

import Header from "./Header";

describe("Header", () => {
  it("renders logo", () => {
    render(<Header />);
    expect(
      screen.getByRole("link", { name: /delasi mensah/i })
    ).toBeInTheDocument();
  });

  it("renders nav links on desktop", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /my work/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /pricing/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
  });

  it("has mobile menu button", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /toggle menu/i })
    ).toBeInTheDocument();
  });
});
