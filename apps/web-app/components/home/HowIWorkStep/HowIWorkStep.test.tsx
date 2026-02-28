import { render, screen } from "@testing-library/react";

import HowIWorkStep from "./HowIWorkStep";

describe("HowIWorkStep", () => {
  it("renders step number, title and description", () => {
    render(
      <HowIWorkStep
        step={1}
        title="Define"
        description="Define what actually needs to be built."
      />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Define")).toBeInTheDocument();
    expect(screen.getByText("Define what actually needs to be built.")).toBeInTheDocument();
  });
});
