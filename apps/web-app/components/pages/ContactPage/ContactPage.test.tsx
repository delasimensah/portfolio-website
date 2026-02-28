import { render, screen } from "@testing-library/react";

import ContactPage from "./ContactPage";

describe("ContactPage", () => {
  it("renders without crashing", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { name: /contact/i })).toBeInTheDocument();
  });
});
