import { render, screen } from "@testing-library/react";

import ServicesPage from "./ServicesPage";

describe("ServicesPage", () => {
  it("renders without crashing", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("heading", { name: /services/i })).toBeInTheDocument();
  });
});
