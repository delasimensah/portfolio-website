import { format } from "date-fns";

/**
 * Parses a date string (YYYY-MM-DD) as a local date to avoid timezone shifts.
 * When you do new Date("1996-10-12"), JavaScript interprets it as UTC midnight,
 * which becomes the previous day in timezones behind UTC (like US timezones).
 * This function ensures the date is parsed in the local timezone.
 */
export const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Formats a date string (YYYY-MM-DD) for display, ensuring no timezone shift.
 */
export const formatDateString = (
  dateString: string | null,
  formatStr: string = "MMM dd, yyyy"
): string => {
  if (!dateString) return "";
  return format(parseLocalDate(dateString), formatStr);
};

/**
 * Format a Date object to a string
 * @param date - Date object to format
 * @param formatStr - Format string (default: "MMM dd, yyyy")
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | null | undefined,
  formatStr: string = "MMM dd, yyyy"
): string => {
  if (!date) return "";
  return format(date, formatStr);
};

/**
 * Get relative time string (e.g., "2 hours ago", "in 3 days")
 * @param date - Date to format
 * @returns Relative time string
 */
export const getRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
};
