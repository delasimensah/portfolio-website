import { render, screen } from "@/test-utils";

import AIFeatureCard from "./AIFeatureCard";

describe("AIFeatureCard", () => {
  it("renders the title", () => {
    render(
      <AIFeatureCard
        icon={<span>icon</span>}
        title="Defining what should be built"
      />
    );
    expect(
      screen.getByText("Defining what should be built")
    ).toBeInTheDocument();
  });
});
