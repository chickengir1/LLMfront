document.addEventListener("DOMContentLoaded", () => {
  init();
});
let currentPage = 1;
let itemsPerPage = 5;
let totalItems = 0;
let currentEditId = null;
let dataCache = [];

const clearBotDiv = () => {
  document.querySelector(".Bot").innerHTML = "";
};

const createBoxElement = (id, title, content, links, className) => {
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
  newBox.dataset.links = JSON.stringify(links);
  return newBox;
};

const addBoxToBotDiv = (boxElement) => {
  document.querySelector(".Bot").appendChild(boxElement);
};

const addEventListenersToBox = (boxElement, id) => {
  boxElement
    .querySelector(".edit-btn")
    .addEventListener("click", () => openEditModal(id));
  boxElement
    .querySelector(".delete-btn")
    .addEventListener("click", () => deleteBox(id));
};

const renderBoxes = (data) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const itemsToDisplay = data.slice(startIndex, endIndex);

  clearBotDiv();
  itemsToDisplay.forEach(
    ({ id = "", title = "", content = "", links = [] }) => {
      const boxElement = createBoxElement(id, title, content, links, "new-box");
      addBoxToBotDiv(boxElement);
      addEventListenersToBox(boxElement, id);
    }
  );
};

const loadBoxesFromJson = async () => {
  const data = await fetchData("/LLMfront/db.json");
  totalItems = data.length;
  dataCache = data;
  renderBoxes(data);
  updatePageNumber(currentPage);
  toggleButtonState();
};

const deleteBox = async (id) => {
  const confirmation = confirm("Are you sure you want to delete this item?");
  if (confirmation) {
    try {
      const response = await fetch(`/api/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Data deleted successfully");
        document.getElementById(id).remove();
        totalItems--;
        updatePageNumber(currentPage);
        toggleButtonState();
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
  renderBoxes(dataCache);
  updatePageNumber(currentPage);
  toggleButtonState();
};

const init = () => {
  setupPagination();
  setupModalEvents();
  loadBoxesFromJson();
};

init();
