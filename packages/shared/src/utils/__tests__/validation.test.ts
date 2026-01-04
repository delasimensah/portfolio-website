import {
  isValidEmail,
  isValidUrl,
  sanitizeString,
  validatePassword,
} from "../validation";

describe("isValidEmail", () => {
  it("should validate correct email addresses", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
    expect(isValidEmail("user+tag@example.com")).toBe(true);
  });

  it("should reject invalid email addresses", () => {
    expect(isValidEmail("invalid")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
    expect(isValidEmail("test@")).toBe(false);
    expect(isValidEmail("test @example.com")).toBe(false);
  });
});

describe("validatePassword", () => {
  it("should validate password with default min length", () => {
    const result = validatePassword("password123");
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should reject password shorter than min length", () => {
    const result = validatePassword("short");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      "Password must be at least 6 characters long"
    );
  });

  it("should use custom min length", () => {
    const result = validatePassword("short", 10);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      "Password must be at least 10 characters long"
    );
  });

  it("should accept password meeting custom min length", () => {
    const result = validatePassword("longpassword", 10);
    expect(result.isValid).toBe(true);
  });
});

describe("isValidUrl", () => {
  it("should validate correct URLs", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://example.com")).toBe(true);
    expect(isValidUrl("https://example.com/path?query=value")).toBe(true);
  });

  it("should reject invalid URLs", () => {
    expect(isValidUrl("not-a-url")).toBe(false);
    expect(isValidUrl("example.com")).toBe(false);
    expect(isValidUrl("")).toBe(false);
  });
});

describe("sanitizeString", () => {
  it("should trim whitespace", () => {
    expect(sanitizeString("  hello  ")).toBe("hello");
  });

  it("should remove HTML tags", () => {
    expect(sanitizeString("<script>alert('xss')</script>hello")).toBe(
      "alert('xss')hello"
    );
    expect(sanitizeString("<div>content</div>")).toBe("content");
  });

  it("should remove angle brackets", () => {
    expect(sanitizeString("hello<>world")).toBe("helloworld");
  });

  it("should handle empty string", () => {
    expect(sanitizeString("")).toBe("");
  });

  it("should handle string with only whitespace", () => {
    expect(sanitizeString("   ")).toBe("");
  });
});
