import { render, screen } from "@testing-library/react";

import ServiceCheckItem from "./ServiceCheckItem";

describe("ServiceCheckItem", () => {
  it("renders the label", () => {
    render(<ServiceCheckItem label="Web application" included />);
    expect(screen.getByText("Web application")).toBeInTheDocument();
  });
});
