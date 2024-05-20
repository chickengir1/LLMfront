document.addEventListener("DOMContentLoaded", () => {
  const itemsPerPage = 5;
  let currentPage = 1;
  let totalItems = 0;

  const loadBoxesFromJson = async (page) => {
    try {
      const response = await fetch("/LLMfront/db.json");
      const data = await response.json();
      totalItems = data.length;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const itemsToDisplay = data.slice(startIndex, endIndex);

      document.querySelector(".Bot").innerHTML = "";
      itemsToDisplay.forEach((item) => {
        const id = item.id || "";
        const title = item.title || "";
        const content = item.content || "";

        addBoxToBotDiv(id, title, content, "new-box");
      });

      document.getElementById("pageNumber").textContent = page;
      document.getElementById("prevPage").disabled = page === 1;
      document.getElementById("nextPage").disabled = endIndex >= totalItems;
    } catch (error) {
      console.error("Error loading boxes from JSON:", error);
    }
  };

  const addBoxToBotDiv = (id, title, content, className) => {
    const botDiv = document.querySelector(".Bot");
    if (botDiv) {
      const newBox = document.createElement("div");
      newBox.innerHTML = `
      <strong>${title}</strong>
      <p>${content}</p>
      <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
      if (className) {
        newBox.className = className;
      }
      newBox.id = id;
      botDiv.appendChild(newBox);
      newBox
        .querySelector(".edit-btn")
        .addEventListener("click", () => editBox(id));
      newBox
        .querySelector(".delete-btn")
        .addEventListener("click", () => deleteBox(id));
    }
  };

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadBoxesFromJson(currentPage);
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if ((currentPage - 1) * itemsPerPage + itemsPerPage < totalItems) {
      currentPage++;
      loadBoxesFromJson(currentPage);
    }
  });

  loadBoxesFromJson(currentPage);
});

// 임시 코드임
const editBox = (id) => {
  const box = document.getElementById(id);
  const title = prompt(
    "Enter new title:",
    box.querySelector("strong").innerText
  );
  const content = prompt(
    "Enter new content:",
    box.querySelector("p").innerText
  );

  if (title !== null && content !== null) {
    box.querySelector("strong").innerText = title;
    box.querySelector("p").innerText = content;
  }
};
