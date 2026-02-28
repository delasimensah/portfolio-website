import { render, screen } from "@testing-library/react";

import WhatAffectsPricingSection from "./WhatAffectsPricingSection";

describe("WhatAffectsPricingSection", () => {
  it("renders the section heading", () => {
    render(<WhatAffectsPricingSection />);
    expect(screen.getByRole("heading", { name: /what affects pricing/i })).toBeInTheDocument();
  });

  it("renders all five factors", () => {
    render(<WhatAffectsPricingSection />);
    expect(screen.getByText("Number of User Roles")).toBeInTheDocument();
    expect(screen.getByText("Data Complexity")).toBeInTheDocument();
    expect(screen.getByText("Third-Party Integrations")).toBeInTheDocument();
    expect(screen.getByText("Custom Design Requirements")).toBeInTheDocument();
    expect(screen.getByText("Platform Priority")).toBeInTheDocument();
  });
});
