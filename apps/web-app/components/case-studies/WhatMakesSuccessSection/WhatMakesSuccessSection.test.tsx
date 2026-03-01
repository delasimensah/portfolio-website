import { render, screen } from "@/test-utils";

import WhatMakesSuccessSection from "./WhatMakesSuccessSection";

describe("WhatMakesSuccessSection", () => {
  it("renders the heading", () => {
    render(<WhatMakesSuccessSection />);
    expect(
      screen.getByRole("heading", {
        name: /what goes into every project/i,
      })
    ).toBeInTheDocument();
  });

  it("renders all three factors", () => {
    render(<WhatMakesSuccessSection />);
    expect(screen.getByText("Clear Requirements")).toBeInTheDocument();
    expect(screen.getByText("Production-Ready Code")).toBeInTheDocument();
    expect(screen.getByText("Launch Support")).toBeInTheDocument();
  });
});
