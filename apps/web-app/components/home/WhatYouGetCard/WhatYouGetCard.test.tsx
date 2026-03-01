import { render, screen } from "@/test-utils";

import WhatYouGetCard from "./WhatYouGetCard";

describe("WhatYouGetCard", () => {
  it("renders title and description", () => {
    render(
      <WhatYouGetCard
        icon={<span data-testid="icon" />}
        title="Web Application"
        description="Fully responsive web platform."
      />
    );
    expect(screen.getByText("Web Application")).toBeInTheDocument();
    expect(
      screen.getByText("Fully responsive web platform.")
    ).toBeInTheDocument();
  });
});
