document.addEventListener("DOMContentLoaded", () => {
  const loadBoxesFromLocalStorage = () => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("box-")
    );
    keys.forEach((key) => {
      const { id, inputValue } = JSON.parse(localStorage.getItem(key));
      addBoxToBotDiv(id, inputValue, "new-box", false);
    });
  };

  const addBoxToBotDiv = (
    id,
    boxContent,
    className,
    saveToLocalStorage = true
  ) => {
    const botDiv = document.querySelector(".Bot");
    if (botDiv) {
      const newBox = document.createElement("div");
      newBox.textContent = boxContent;
      if (className) {
        newBox.className = className;
      }
      newBox.id = id;
      botDiv.appendChild(newBox);
      if (saveToLocalStorage) {
        localStorage.setItem(
          id,
          JSON.stringify({ id, inputValue: boxContent, className })
        );
      }
    }
  };

  loadBoxesFromLocalStorage();
});
