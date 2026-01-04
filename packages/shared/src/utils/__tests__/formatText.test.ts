import {
  formatCountDisplay,
  formatDuration,
  formatNumber,
  formatText,
  formatTime,
} from "../formatText";

describe("formatText", () => {
  it("should return text as-is when no options provided", () => {
    expect(formatText("Hello World")).toBe("Hello World");
  });

  it("should truncate text when exceeding maxLength", () => {
    expect(formatText("Hello World", { maxLength: 5 })).toBe("He...");
  });

  it("should not truncate when text is shorter than maxLength", () => {
    expect(formatText("Hi", { maxLength: 10 })).toBe("Hi");
  });

  it("should handle empty string", () => {
    expect(formatText("")).toBe("");
  });

  it("should handle null/undefined gracefully", () => {
    expect(formatText(null as unknown as string)).toBe(null);
  });
});

describe("formatDuration", () => {
  it("should format seconds to MM:SS", () => {
    expect(formatDuration(125)).toBe("2:05");
    expect(formatDuration(65)).toBe("1:05");
  });

  it("should format to HH:MM:SS for hours", () => {
    expect(formatDuration(3665)).toBe("1:01:05");
    expect(formatDuration(7200)).toBe("2:00:00");
  });

  it("should handle zero", () => {
    expect(formatDuration(0)).toBe("0:00");
  });

  it("should handle invalid values", () => {
    expect(formatDuration(-1)).toBe("0:00");
    expect(formatDuration(NaN)).toBe("0:00");
    expect(formatDuration(Infinity)).toBe("0:00");
  });
});

describe("formatCountDisplay", () => {
  it("should format thousands with K", () => {
    expect(formatCountDisplay(1000)).toBe("1.0K");
    expect(formatCountDisplay(1500)).toBe("1.5K");
    expect(formatCountDisplay(9999)).toBe("10.0K");
  });

  it("should format millions with M", () => {
    expect(formatCountDisplay(1000000)).toBe("1.0M");
    expect(formatCountDisplay(1500000)).toBe("1.5M");
  });

  it("should return number as string for values less than 1000", () => {
    expect(formatCountDisplay(999)).toBe("999");
    expect(formatCountDisplay(0)).toBe("0");
  });
});

describe("formatNumber", () => {
  it("should use formatCountDisplay", () => {
    expect(formatNumber(1000)).toBe("1.0K");
    expect(formatNumber(1000000)).toBe("1.0M");
  });
});

describe("formatTime", () => {
  it("should format seconds to MM:SS", () => {
    expect(formatTime(125)).toBe("2:05");
    expect(formatTime(65)).toBe("1:05");
    expect(formatTime(5)).toBe("0:05");
  });

  it("should pad seconds with zero", () => {
    expect(formatTime(61)).toBe("1:01");
    expect(formatTime(1)).toBe("0:01");
  });
});
