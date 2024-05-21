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

  const toggleButtonState = () => {
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage * itemsPerPage >= totalItems;
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

  const renderBoxes = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = data.slice(startIndex, endIndex);

    clearBotDiv();
    itemsToDisplay.forEach(({ id = "", title = "", content = "" }) => {
      const boxElement = createBoxElement(id, title, content, "new-box");
      addBoxToBotDiv(boxElement);
      addEventListenersToBox(boxElement, id);
    });
  };

  const loadBoxesFromJson = async () => {
    const data = await fetchData("/LLMfront/db.json");
    totalItems = data.length;
    renderBoxes(data);
    updatePageNumber(currentPage);
    toggleButtonState();
  };

  const editBox = async (id) => {
    const box = document.getElementById(id);
    const content = prompt(
      "Enter new content:",
      box.querySelector("p").innerText
    );

    if (content !== null) {
      box.querySelector("p").innerText = content;

      try {
        const response = await fetch(`http://localhost:3000/api/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
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

  const deleteBox = async (id) => {
    const confirmation = confirm("Are you sure you want to delete this item?");
    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:3000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("Data deleted successfully");
          document.getElementById(id).remove();
        } else {
          console.error("Error deleting data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const changePage = (direction) => {
    currentPage += direction;
    loadBoxesFromJson();
  };

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) changePage(-1);
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if ((currentPage - 1) * itemsPerPage + itemsPerPage < totalItems)
      changePage(1);
  });

  loadBoxesFromJson();
});