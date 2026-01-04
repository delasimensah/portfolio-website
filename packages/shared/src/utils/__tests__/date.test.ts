import {
  formatDate,
  formatDateString,
  getRelativeTime,
  parseLocalDate,
} from "../date";

// Mock date-fns format
jest.mock("date-fns", () => ({
  format: jest.fn((date: Date, formatStr: string) => {
    if (formatStr === "MMM dd, yyyy") {
      return "Jan 01, 2024";
    }
    return date.toISOString();
  }),
}));

describe("parseLocalDate", () => {
  it("should parse date string as local date", () => {
    const date = parseLocalDate("2024-01-15");
    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(0); // January is 0
    expect(date.getDate()).toBe(15);
  });

  it("should handle different date formats", () => {
    const date = parseLocalDate("1996-10-12");
    expect(date.getFullYear()).toBe(1996);
    expect(date.getMonth()).toBe(9); // October is 9
    expect(date.getDate()).toBe(12);
  });
});

describe("formatDateString", () => {
  it("should format date string", () => {
    const result = formatDateString("2024-01-15");
    expect(result).toBe("Jan 01, 2024");
  });

  it("should return empty string for null", () => {
    expect(formatDateString(null)).toBe("");
  });

  it("should use custom format string", () => {
    const result = formatDateString("2024-01-15", "yyyy-MM-dd");
    expect(result).toBeDefined();
  });
});

describe("formatDate", () => {
  it("should format Date object", () => {
    const date = new Date("2024-01-15");
    const result = formatDate(date);
    expect(result).toBeDefined();
  });

  it("should return empty string for null", () => {
    expect(formatDate(null)).toBe("");
  });

  it("should return empty string for undefined", () => {
    expect(formatDate(undefined)).toBe("");
  });
});

describe("getRelativeTime", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-15T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return 'just now' for recent times", () => {
    const date = new Date("2024-01-15T11:59:30Z");
    expect(getRelativeTime(date)).toBe("just now");
  });

  it("should format minutes ago", () => {
    const date = new Date("2024-01-15T11:55:00Z");
    expect(getRelativeTime(date)).toBe("5 minutes ago");
  });

  it("should format hours ago", () => {
    const date = new Date("2024-01-15T10:00:00Z");
    expect(getRelativeTime(date)).toBe("2 hours ago");
  });

  it("should format days ago", () => {
    const date = new Date("2024-01-13T12:00:00Z");
    expect(getRelativeTime(date)).toBe("2 days ago");
  });

  it("should format months ago", () => {
    const date = new Date("2023-12-15T12:00:00Z");
    expect(getRelativeTime(date)).toBe("1 month ago");
  });

  it("should format years ago", () => {
    const date = new Date("2022-01-15T12:00:00Z");
    expect(getRelativeTime(date)).toBe("2 years ago");
  });

  it("should handle string dates", () => {
    expect(getRelativeTime("2024-01-15T11:55:00Z")).toBe("5 minutes ago");
  });
});
