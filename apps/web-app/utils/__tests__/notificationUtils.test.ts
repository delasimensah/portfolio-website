import { notifications } from "@mantine/notifications";

import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
} from "../notificationUtils";

// Mock @mantine/notifications
jest.mock("@mantine/notifications", () => ({
  notifications: {
    show: jest.fn(),
  },
}));

describe("Notification Utilities", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("showErrorNotification", () => {
    it("calls notifications.show with error configuration", () => {
      const message = "Test error message";
      showErrorNotification(message);

      expect(notifications.show).toHaveBeenCalledWith({
        title: "Error",
        message,
        color: "red",
      });
    });

    it("calls notifications.show with custom title", () => {
      const message = "Custom error message";
      const title = "Custom Error";
      showErrorNotification(message, title);

      expect(notifications.show).toHaveBeenCalledWith({
        title,
        message,
        color: "red",
      });
    });
  });

  describe("showSuccessNotification", () => {
    it("calls notifications.show with success configuration", () => {
      const message = "Test success message";
      showSuccessNotification(message);

      expect(notifications.show).toHaveBeenCalledWith({
        title: "Success",
        message,
        color: "green",
      });
    });

    it("calls notifications.show with custom title", () => {
      const message = "Custom success message";
      const title = "Custom Success";
      showSuccessNotification(message, title);

      expect(notifications.show).toHaveBeenCalledWith({
        title,
        message,
        color: "green",
      });
    });
  });

  describe("showInfoNotification", () => {
    it("calls notifications.show with info configuration", () => {
      const message = "Test info message";
      showInfoNotification(message);

      expect(notifications.show).toHaveBeenCalledWith({
        title: "Info",
        message,
        color: "blue",
      });
    });

    it("calls notifications.show with custom title", () => {
      const message = "Custom info message";
      const title = "Custom Info";
      showInfoNotification(message, title);

      expect(notifications.show).toHaveBeenCalledWith({
        title,
        message,
        color: "blue",
      });
    });
  });
});
