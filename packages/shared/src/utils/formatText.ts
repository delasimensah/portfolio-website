/**
 * Format text with optional max length truncation
 * @param text - Text to format
 * @param options - Formatting options
 * @param options.maxLength - Maximum length before truncation
 * @returns Formatted text string
 */
export const formatText = (
  text: string,
  options?: { maxLength?: number }
): string => {
  let output = text;
  if (!text) return output;

  if (options?.maxLength && text.length > options.maxLength) {
    output = text.slice(0, options.maxLength - 3) + "...";
  }
  return output;
};

/**
 * Format duration from seconds to MM:SS or HH:MM:SS format
 * @param seconds - Duration in seconds
 * @returns Formatted time string (e.g., "3:45" or "1:23:45")
 */
export const formatDuration = (seconds: number): string => {
  // Validate input - return "0:00" for invalid values
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const format = (val: number) => `0${Math.floor(val)}`.slice(-2);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours) {
    return `${hours}:${format(minutes)}:${format(secs)}`;
  }
  return `${minutes}:${format(secs)}`;
};

/**
 * Format count for display (e.g., 1000 -> "1K", 1000000 -> "1M")
 * @param count - Number to format
 * @returns Formatted count string
 */
export const formatCountDisplay = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

/**
 * Format number with K/M suffixes (e.g., 1000 -> "1K", 1000000 -> "1M")
 * @param num - Number to format
 * @returns Formatted number string
 */
export const formatNumber = (num: number): string => {
  return formatCountDisplay(num);
};

/**
 * Format time from seconds to MM:SS format
 * @param seconds - Duration in seconds
 * @returns Formatted time string (e.g., "3:45")
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};
