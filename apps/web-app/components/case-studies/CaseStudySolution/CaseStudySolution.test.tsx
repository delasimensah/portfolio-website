import { render, screen } from "@/test-utils";

import CaseStudySolution from "./CaseStudySolution";

describe("CaseStudySolution", () => {
  it("renders The Solution heading", () => {
    render(<CaseStudySolution solution={{ type: "cards", items: [] }} />);
    expect(
      screen.getByRole("heading", { name: /the solution/i })
    ).toBeInTheDocument();
  });

  it("renders cards layout with item titles", () => {
    render(
      <CaseStudySolution
        solution={{
          type: "cards",
          items: [
            {
              iconKey: "playerPlay",
              title: "Music Playback",
              description: "Seamless streaming.",
            },
          ],
        }}
      />
    );
    expect(screen.getByText("Music Playback")).toBeInTheDocument();
  });

  it("renders groups layout with group titles", () => {
    render(
      <CaseStudySolution
        solution={{
          type: "groups",
          groups: [
            {
              iconKey: "deviceMobile",
              title: "Guest Mobile App",
              items: ["Browse properties"],
            },
          ],
        }}
      />
    );
    expect(screen.getByText("Guest Mobile App")).toBeInTheDocument();
    expect(screen.getByText("Browse properties")).toBeInTheDocument();
  });
});
