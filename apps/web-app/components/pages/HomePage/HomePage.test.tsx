import { render } from "@/test-utils";

import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders without crashing", () => {
    render(<HomePage />);
  });
});
