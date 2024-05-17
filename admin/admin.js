async function checkBotStatus() {
  try {
    const response = await fetch("#");
    if (!response.ok) {
      throw new Error("Failed to fetch bot status");
    }
    const data = await response.json();
    document.getElementById("bot-status").textContent = data.status;
  } catch (error) {
    console.error("Error fetching bot status:", error);
    document.getElementById("bot-status").textContent = "Error";
  }
}

checkBotStatus();
