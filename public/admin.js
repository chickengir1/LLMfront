document.addEventListener("DOMContentLoaded", () => {
  const loadBoxesFromJson = () => {
    fetch("/LLMfront/db.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          const id = item.id || "";
          const title = item.title || "";
          const inputValue = item.inputValue || "";

          addBoxToBotDiv(id, title, inputValue, "new-box");
        });
      })
      .catch((error) => console.error("Error loading boxes from JSON:", error));
  };

  const addBoxToBotDiv = (id, title, content, className) => {
    const botDiv = document.querySelector(".Bot");
    if (botDiv) {
      const newBox = document.createElement("div");
      newBox.innerHTML = `<strong>${title}</strong><p>${content}</p>`;
      if (className) {
        newBox.className = className;
      }
      newBox.id = id;
      botDiv.appendChild(newBox);
    }
  };

  loadBoxesFromJson();
});
