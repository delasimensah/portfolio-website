import { render, screen } from "@testing-library/react";

import SectionTitle from "./SectionTitle";

describe("SectionTitle", () => {
  it("renders children", () => {
    render(<SectionTitle>What You Get</SectionTitle>);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "What You Get"
    );
  });
});
