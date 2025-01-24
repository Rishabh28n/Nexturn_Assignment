async function fetchAndDisplayUser(apiService, userId, element) {
  try {
    const user = await apiService.getUser(userId);
    if (!user || !user.name) throw new Error("Invalid user data");
    element.textContent = `Hello, ${user.name}`;
  } catch (error) {
    element.textContent = `Error: ${error.message}`;
  }
}

module.exports = { fetchAndDisplayUser };
