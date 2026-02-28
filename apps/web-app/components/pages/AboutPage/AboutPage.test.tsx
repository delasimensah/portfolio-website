import { render, screen } from "@testing-library/react";

import AboutPage from "./AboutPage";

describe("AboutPage", () => {
  it("renders without crashing", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
  });
});
