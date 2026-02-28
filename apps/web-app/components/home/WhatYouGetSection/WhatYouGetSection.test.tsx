import { render, screen } from "@testing-library/react";

import WhatYouGetSection from "./WhatYouGetSection";

describe("WhatYouGetSection", () => {
  it("renders section title", () => {
    render(<WhatYouGetSection />);
    expect(screen.getByRole("heading", { name: /what you get/i })).toBeInTheDocument();
  });

  it("renders all cards", () => {
    render(<WhatYouGetSection />);
    expect(screen.getByText("Web Application")).toBeInTheDocument();
    expect(screen.getByText("iOS & Android Mobile App")).toBeInTheDocument();
    expect(screen.getByText("Backend System")).toBeInTheDocument();
  });
});
