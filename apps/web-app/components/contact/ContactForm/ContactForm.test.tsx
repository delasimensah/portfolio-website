import { render, screen } from "@testing-library/react";

import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what are you building/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/who is it for/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what problem/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ContactForm />);
    expect(
      screen.getByRole("button", { name: /request project review/i })
    ).toBeInTheDocument();
  });
});
