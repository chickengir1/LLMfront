document.addEventListener("DOMContentLoaded", () => {
  const itemsPerPage = 5;
  let currentPage = 1;
  let totalItems = 0;

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const updatePageNumber = (page) => {
    document.getElementById("pageNumber").textContent = page;
  };

  const toggleButtonState = (page, totalItems, itemsPerPage) => {
    document.getElementById("prevPage").disabled = page === 1;
    document.getElementById("nextPage").disabled =
      page * itemsPerPage >= totalItems;
  };

  const clearBotDiv = () => {
    document.querySelector(".Bot").innerHTML = "";
  };

  const createBoxElement = (id, title, content, className) => {
    const newBox = document.createElement("div");
    newBox.innerHTML = `
      <strong>${title}</strong>
      <p>${content}</p>
      <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    newBox.className = className;
    newBox.id = id;
    return newBox;
  };

  const addBoxToBotDiv = (boxElement) => {
    document.querySelector(".Bot").appendChild(boxElement);
  };

  const addEventListenersToBox = (boxElement, id) => {
    boxElement
      .querySelector(".edit-btn")
      .addEventListener("click", () => editBox(id));
    boxElement
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteBox(id));
  };

  const renderBoxes = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = data.slice(startIndex, endIndex);

    clearBotDiv();
    itemsToDisplay.forEach(({ id = "", title = "", content = "" }) => {
      const boxElement = createBoxElement(id, title, content, "new-box");
      addBoxToBotDiv(boxElement);
      addEventListenersToBox(boxElement, id);
    });
  };

  const loadBoxesFromJson = async (page) => {
    const data = await fetchData("/LLMfront/db.json");
    totalItems = data.length;
    renderBoxes(data, page, itemsPerPage);
    updatePageNumber(page);
    toggleButtonState(page, totalItems, itemsPerPage);
  };

  const editBox = async (id) => {
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

      try {
        const response = await fetch(`http://localhost:3000/api/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
          console.log("Data updated successfully");
        } else {
          console.error("Error updating data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
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
