import { render, screen } from "@/test-utils";

import ProductionCostRow from "./ProductionCostRow";

describe("ProductionCostRow", () => {
  it("renders label and value", () => {
    render(
      <ProductionCostRow label="Apple Developer Account" value="$99/year" />
    );
    expect(screen.getByText("Apple Developer Account")).toBeInTheDocument();
    expect(screen.getByText("$99/year")).toBeInTheDocument();
  });
});
