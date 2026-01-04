import { notifications } from "@mantine/notifications";

/**
 * Show error notification
 * Red color, does not auto-dismiss
 *
 * @param message - The error message to display
 * @param title - Optional title (defaults to "Error")
 */
export const showErrorNotification = (
  message: string,
  title: string = "Error"
) => {
  notifications.show({
    title,
    message,
    color: "red",
    autoClose: false,
    withCloseButton: true,
    position: "top-right",
    className: "bg-red-600",
  });
};

/**
 * Show success notification
 * Green color, auto-dismisses after 3 seconds
 *
 * @param message - The success message to display
 * @param title - Optional title (defaults to "Success")
 */
export const showSuccessNotification = (
  message: string,
  title: string = "Success"
) => {
  notifications.show({
    title,
    message,
    color: "green",
    autoClose: 3000,
    withCloseButton: true,
    position: "top-right",
    className: "bg-green-600",
  });
};

/**
 * Show info notification
 * Blue color, auto-dismisses after 3 seconds
 *
 * @param message - The info message to display
 * @param title - Optional title (defaults to "Info")
 */
export const showInfoNotification = (
  message: string,
  title: string = "Info"
) => {
  notifications.show({
    title,
    message,
    color: "blue",
    autoClose: 3000,
    withCloseButton: true,
    position: "top-right",
    className: "bg-blue-600",
  });
};
