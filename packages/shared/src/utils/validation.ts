/**
 * Validate email address
 * @param email - Email to validate
 * @returns True if valid email, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @param minLength - Minimum length (default: 6)
 * @returns Object with isValid and errors array
 */
export const validatePassword = (
  password: string,
  minLength: number = 6
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate URL
 * @param url - URL to validate
 * @returns True if valid URL, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Sanitize string input (remove HTML tags, trim whitespace)
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>]/g, ""); // Remove remaining angle brackets
};
