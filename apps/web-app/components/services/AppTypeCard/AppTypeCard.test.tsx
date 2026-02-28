import { render, screen } from "@testing-library/react";

import AppTypeCard from "./AppTypeCard";

describe("AppTypeCard", () => {
  it("renders the title", () => {
    render(<AppTypeCard icon={<span>icon</span>} title="Booking Systems" />);
    expect(screen.getByText("Booking Systems")).toBeInTheDocument();
  });
});
