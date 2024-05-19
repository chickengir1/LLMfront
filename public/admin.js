document.addEventListener("DOMContentLoaded", () => {
  const generateUniqueId = () => {
    let currentIndex = localStorage.getItem("currentIndex");
    if (!currentIndex) {
      currentIndex = 1;
    } else {
      currentIndex = parseInt(currentIndex, 10) + 1;
    }
    localStorage.setItem("currentIndex", currentIndex);
    return currentIndex;
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
    console.log("saveToLocalStorage:", saveToLocalStorage);

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

  const allowedOrigins = [
    "http://localhost:5173",
    "https://chickengir1.github.io/LLMfront/",
  ];

  window.addEventListener("message", (event) => {
    if (allowedOrigins.includes(event.origin)) {
      const { id, boxContent, className } = event.data;
      if (boxContent) {
        addBoxToBotDiv(id, boxContent, className);
      }
    }
  });

  loadBoxesFromLocalStorage();
});
