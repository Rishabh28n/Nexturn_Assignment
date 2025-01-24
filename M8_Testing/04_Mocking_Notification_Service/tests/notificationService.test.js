const { sendNotification } = require("../src/notificationService");

describe("sendNotification", () => {
  // Test case for successful notification
  test("should return success message when notification is sent successfully", () => {
    // Create a mock notification service
    const mockNotificationService = {
      send: jest.fn().mockReturnValue(true),
    };

    const message = "Hello, World!";
    const result = sendNotification(mockNotificationService, message);

    // Assertions
    expect(result).toBe("Notification Sent");
    expect(mockNotificationService.send).toHaveBeenCalledWith(message);
    expect(mockNotificationService.send).toHaveBeenCalledTimes(1);
  });

  // Test case for failed notification
  test("should return failure message when notification fails to send", () => {
    // Create a mock notification service that fails
    const mockNotificationService = {
      send: jest.fn().mockReturnValue(false),
    };

    const message = "Hello, World!";
    const result = sendNotification(mockNotificationService, message);

    // Assertions
    expect(result).toBe("Failed to Send");
    expect(mockNotificationService.send).toHaveBeenCalledWith(message);
    expect(mockNotificationService.send).toHaveBeenCalledTimes(1);
  });

  // Test case for invalid notification service (missing send method)
  test("should throw an error for an invalid notification service", () => {
    const invalidNotificationService = {}; // Missing send method

    const message = "Hello, World!";
    expect(() => sendNotification(invalidNotificationService, message))
      .toThrow("Invalid notification service");
  });

  // Test case for notification service that doesn't return a boolean
  test("should return failure message if send method returns non-boolean", () => {
    // Create a mock notification service with non-boolean return value
    const mockNotificationService = {
      send: jest.fn().mockReturnValue("some non-boolean value"),
    };

    const message = "Hello, World!";
    const result = sendNotification(mockNotificationService, message);

    // Assertions
    expect(result).toBe("Failed to Send");
    expect(mockNotificationService.send).toHaveBeenCalledWith(message);
    expect(mockNotificationService.send).toHaveBeenCalledTimes(1);
  });
});
