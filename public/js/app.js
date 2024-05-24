document.addEventListener("DOMContentLoaded", () => {
  init();
});

let currentPage = 1;
let itemsPerPage = 3;
let totalItems = 0;
let dataCache = [];

const clearBotDiv = () => {
  document.querySelector(".Bot").innerHTML = "";
};

const createBoxElement = (id, model, title, content, links, className) => {
  const newBox = document.createElement("div");
  newBox.innerHTML = `
    <div class="title-box">
      <i class="fab fa-discord"></i>
      <div class="model-text">${model}</div>
    </div>
    <div class="content-box">
      <p>${title}</p>
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

const renderBoxes = (data) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const itemsToDisplay = data.slice(startIndex, endIndex);

  clearBotDiv();
  itemsToDisplay.forEach(({ id, model, title, content, links }) => {
    const boxElement = createBoxElement(
      id,
      model,
      title,
      content,
      links,
      "new-box"
    );
    addBoxToBotDiv(boxElement);
  });
};

const loadBoxesFromJson = async () => {
  const data = await fetchData("/LLMfront/db.json");

  if (Array.isArray(data)) {
    let mergedData = [];
    data.forEach((item) => {
      if (Array.isArray(item.data)) {
        item.data.forEach((box) => {
          mergedData.push({
            id: box.id,
            model: item.model,
            title: box.title,
            content: box.content,
            links: box.links,
          });
        });
      }
    });

    totalItems = mergedData.length;
    dataCache = mergedData;
    renderBoxes(dataCache);
    updatePageNumber(currentPage);
    toggleButtonState();
  } else {
    console.error("Invalid data format");
  }
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const init = () => {
  loadBoxesFromJson();
  setupPagination();
};

init();
