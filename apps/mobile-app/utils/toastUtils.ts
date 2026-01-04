import Toast from "react-native-toast-message";

/**
 * Show error toast
 * Dark gray background, white text, does not auto-dismiss
 *
 * @param message - The error message to display
 * @param offset - Bottom offset in pixels (default: 150)
 * @param visibilityTime - Visibility time in ms (default: 0 = no auto-dismiss)
 */
export const showErrorToast = (
  message: string,
  offset: number = 150,
  visibilityTime: number = 0
) => {
  Toast.show({
    type: "error",
    text1: message,
    position: "bottom",
    bottomOffset: offset,
    visibilityTime: visibilityTime,
  });
};

/**
 * Show success toast
 * White background, black text, auto-dismisses after 2 seconds
 *
 * @param message - The success message to display
 * @param offset - Bottom offset in pixels (default: 150)
 * @param visibilityTime - Visibility time in ms (default: 2000)
 */
export const showSuccessToast = (
  message: string,
  offset: number = 150,
  visibilityTime: number = 2000
) => {
  Toast.show({
    type: "success",
    text1: message,
    position: "bottom",
    bottomOffset: offset,
    visibilityTime: visibilityTime,
  });
};

/**
 * Show neutral/info toast
 * Gray background, white text, auto-dismisses after 2 seconds
 *
 * @param message - The info message to display
 * @param offset - Bottom offset in pixels (default: 150)
 * @param visibilityTime - Visibility time in ms (default: 2000)
 */
export const showNeutralToast = (
  message: string,
  offset: number = 150,
  visibilityTime: number = 2000
) => {
  Toast.show({
    type: "neutral",
    text1: message,
    position: "bottom",
    bottomOffset: offset,
    visibilityTime: visibilityTime,
  });
};

/**
 * Show active toast
 * White background, black text, auto-dismisses after 2 seconds
 * Use for active/ongoing operations
 *
 * @param message - The message to display
 * @param offset - Bottom offset in pixels (default: 150)
 * @param visibilityTime - Visibility time in ms (default: 2000)
 */
export const showActiveToast = (
  message: string,
  offset: number = 150,
  visibilityTime: number = 2000
) => {
  Toast.show({
    type: "active",
    text1: message,
    position: "bottom",
    bottomOffset: offset,
    visibilityTime: visibilityTime,
  });
};
