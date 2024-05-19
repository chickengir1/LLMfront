document.addEventListener("DOMContentLoaded", () => {
  const loadBoxesFromJson = () => {
    fetch("/LLMfront/db.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          addBoxToBotDiv(
            item.id,
            item.title,
            item.inputValue,
            "new-box",
            false
          );
        });
      })
      .catch((error) => console.error("Error loading boxes from JSON:", error));
  };

  const addBoxToBotDiv = (id, title, inputValue, className) => {
    const botDiv = document.querySelector(".Bot");
    if (botDiv) {
      const newBox = document.createElement("div");
      newBox.innerHTML = `<strong>${title}</strong><p>${inputValue}</p>`;
      if (className) {
        newBox.className = className;
      }
      newBox.id = id;
      botDiv.appendChild(newBox);
    }
  };

  loadBoxesFromJson();
});
