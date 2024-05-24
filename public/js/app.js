document.addEventListener("DOMContentLoaded", () => {
  init();
});

let currentPage = 1;
let itemsPerPage = 3;
let totalItems = 0;
let dataCache = [];

const init = () => {
  loadBoxesFromJson();
  setupPagination();
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

const updatePageNumber = (page) => {
  document.getElementById("pageNumber").textContent = `${page}`;
};

const toggleButtonState = () => {
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage * itemsPerPage >= totalItems;
};

const changePage = (direction) => {
  currentPage += direction;
  renderBoxes(dataCache);
  updatePageNumber(currentPage);
  toggleButtonState();
};

const setupPagination = () => {
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) changePage(-1);
  });

  nextButton.addEventListener("click", () => {
    if ((currentPage - 1) * itemsPerPage + itemsPerPage < totalItems)
      changePage(1);
  });

  toggleButtonState();
};

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
      <div class="content-inner">
        <div class="div-i">
          <i class="fa-brands fa-bots"></i>
        </div>
        <div class="div-p">
          <p>${title}</p>
        </div>
      </div>
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
