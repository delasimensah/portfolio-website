import { render, screen } from "@testing-library/react";

import ScreenshotCarouselModal from "./ScreenshotCarouselModal";

const MOCK_SCREENSHOTS = [
  { src: "/images/screenshot-1.png", alt: "Screenshot 1" },
  { src: "/images/screenshot-2.png", alt: "Screenshot 2" },
  { src: "/images/screenshot-3.png", alt: "Screenshot 3" },
];

describe("ScreenshotCarouselModal", () => {
  it("does not render content when closed", () => {
    render(
      <ScreenshotCarouselModal
        title="Mobile Screenshots"
        screenshots={MOCK_SCREENSHOTS}
        opened={false}
        onClose={() => {}}
      />
    );
    expect(screen.queryByText("Mobile Screenshots")).not.toBeInTheDocument();
  });

  it("renders the modal title when open", () => {
    render(
      <ScreenshotCarouselModal
        title="Mobile Screenshots"
        screenshots={MOCK_SCREENSHOTS}
        opened={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByText("Mobile Screenshots")).toBeInTheDocument();
  });

  it("renders the counter when open with multiple screenshots", () => {
    render(
      <ScreenshotCarouselModal
        title="Mobile Screenshots"
        screenshots={MOCK_SCREENSHOTS}
        opened={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("renders navigation buttons when multiple screenshots exist", () => {
    render(
      <ScreenshotCarouselModal
        title="Mobile Screenshots"
        screenshots={MOCK_SCREENSHOTS}
        opened={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByLabelText("Previous screenshot")).toBeInTheDocument();
    expect(screen.getByLabelText("Next screenshot")).toBeInTheDocument();
  });
});
