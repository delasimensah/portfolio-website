import { render, screen } from "@/test-utils";

import Heading from "./Heading";
















describe("Heading", () => {
  it("renders page variant", () => {
    render(<Heading variant="page">Page Title</Heading>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Page Title"
    );
  });

  it("renders section variant", () => {
    render(<Heading variant="section">Section Title</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Section Title"
    );
  });

  it("renders subsection variant", () => {
    render(<Heading variant="subsection">Subsection Title</Heading>);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Subsection Title"
    );
  });

  it("renders card variant", () => {
    render(<Heading variant="card">Card Title</Heading>);
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Card Title"
    );
  });

  it("merges custom className", () => {
    render(
      <Heading variant="section" className="custom-class">
        Title
      </Heading>
    );
    const heading = screen.getByRole("heading");
    expect(heading).toHaveClass("custom-class");
  });
});
