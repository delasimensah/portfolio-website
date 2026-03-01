import { render, screen } from "@/test-utils";

import ServicesPage from "./ServicesPage";

describe("ServicesPage", () => {
  it("renders without crashing", () => {
    render(<ServicesPage />);
    expect(
      screen.getByRole("heading", { name: /services/i })
    ).toBeInTheDocument();
  });
});
