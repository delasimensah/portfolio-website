import { render, screen } from "@/test-utils";

import ContactPage from "./ContactPage";

describe("ContactPage", () => {
  it("renders without crashing", () => {
    render(<ContactPage />);
    expect(
      screen.getByRole("heading", { name: /build together/i })
    ).toBeInTheDocument();
  });
});
