document.addEventListener("DOMContentLoaded", () => {
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const loadBoxesFromLocalStorage = () => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("box-")
    );
    keys.forEach((key) => {
      const { id, boxContent, className } = JSON.parse(
        localStorage.getItem(key)
      );
      addBoxToBotDiv(id, boxContent, className, false);
    });
  };

  const saveBoxToLocalStorage = (id, boxContent, className) => {
    const key = `box-${id}`;
    const boxData = { id, boxContent, className };
    localStorage.setItem(key, JSON.stringify(boxData));
  };

  const addBoxToBotDiv = (
    id,
    boxContent,
    className,
    saveToLocalStorage = true
  ) => {
    console.log("saveToLocalStorage:", saveToLocalStorage); // Boolean 매개변수 확인

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
        saveBoxToLocalStorage(id, boxContent, className);
      }
    }
  };

  window.addEventListener("message", (event) => {
    if (event.origin === "http://localhost:5173") {
      const { id, boxContent, className } = event.data;
      if (boxContent) {
        addBoxToBotDiv(id, boxContent, className);
      }
    }
  });

  loadBoxesFromLocalStorage();
});
