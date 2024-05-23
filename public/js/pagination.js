const updatePageNumber = (page) => {
  document.getElementById("pageNumber").textContent = page;
};

const toggleButtonState = () => {
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage * itemsPerPage >= totalItems;
};

const setupPagination = () => {
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) changePage(-1);
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if ((currentPage - 1) * itemsPerPage + itemsPerPage < totalItems)
      changePage(1);
  });
};
