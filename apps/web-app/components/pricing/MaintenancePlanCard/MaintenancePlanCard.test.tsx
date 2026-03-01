import { render, screen } from "@/test-utils";

import MaintenancePlanCard from "./MaintenancePlanCard";

describe("MaintenancePlanCard", () => {
  it("renders the plan name and price", () => {
    render(
      <MaintenancePlanCard
        name="Basic Care"
        price="$250"
        features={["Bug fixes"]}
      />
    );
    expect(screen.getByText("Basic Care")).toBeInTheDocument();
    expect(screen.getByText("$250")).toBeInTheDocument();
  });

  it("shows popular badge when popular is true", () => {
    render(
      <MaintenancePlanCard
        name="Growth Plan"
        price="$600"
        features={["Bug fixes"]}
        popular
      />
    );
    expect(screen.getByText("Popular")).toBeInTheDocument();
  });
});
