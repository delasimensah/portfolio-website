import type { AuthError } from "@supabase/supabase-js";

import { handleAuthError } from "../authErrors";

describe("handleAuthError", () => {
  it("should return user-friendly message for known errors", () => {
    const error = { message: "Invalid login credentials" } as AuthError;
    const result = handleAuthError(error);

    expect(result.message).toBe("Invalid email or password. Please try again.");
  });

  it("should return original message for unknown errors", () => {
    const error = { message: "Unknown error occurred" } as AuthError;
    const result = handleAuthError(error);

    expect(result.message).toBe("Unknown error occurred");
  });

  it("should handle errors without message", () => {
    const error = {} as AuthError;
    const result = handleAuthError(error);

    expect(result.message).toBe("An authentication error occurred");
  });

  it("should include error code when available", () => {
    const error = {
      message: "Invalid login credentials",
      status: 400,
    } as AuthError;
    const result = handleAuthError(error);

    expect(result.message).toBe("Invalid email or password. Please try again.");
    expect(result.code).toBe("400");
  });

  it("should map all common error messages", () => {
    const errorMessages = [
      "Email not confirmed",
      "User already registered",
      "Password should be at least 6 characters",
      "Signups not allowed",
      "Email rate limit exceeded",
      "Token has expired",
      "Auth session missing!",
    ];

    errorMessages.forEach((message) => {
      const error = { message } as AuthError;
      const result = handleAuthError(error);
      expect(result.message).not.toBe(message); // Should be mapped to user-friendly message
    });
  });
});
