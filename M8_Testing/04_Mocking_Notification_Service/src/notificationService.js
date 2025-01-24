function sendNotification(notificationService, message) {
  if (!notificationService || typeof notificationService.send !== "function") {
    throw new Error("Invalid notification service");
  }

  const status = notificationService.send(message);
  return typeof status === "boolean"
    ? status
      ? "Notification Sent"
      : "Failed to Send"
    : "Failed to Send";
}

module.exports = { sendNotification };
