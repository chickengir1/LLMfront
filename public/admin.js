document.addEventListener("DOMContentLoaded", () => {
  const addBoxToBotDiv = (boxContent, className) => {
    const botDiv = document.querySelector(".Bot");
    if (botDiv) {
      const newBox = document.createElement("div");
      newBox.textContent = boxContent;
      if (className) {
        newBox.className = className;
      }
      botDiv.appendChild(newBox);
    }
  };

  window.addEventListener("message", (event) => {
    if (event.origin === "http://localhost:5173") {
      const { boxContent, className } = event.data;
      if (boxContent) {
        addBoxToBotDiv(boxContent, className);
      }
    }
  });
});
