import { render, screen } from "@/test-utils";

import AboutPage from "./AboutPage";

describe("AboutPage", () => {
  it("renders without crashing", () => {
    render(<AboutPage />);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
