const addLinkEventListeners = () => {
  document.querySelectorAll(".add-link").forEach((button) => {
    button.removeEventListener("click", handleAddLink);
    button.addEventListener("click", handleAddLink);
  });
  document.querySelectorAll(".remove-link").forEach((button) => {
    button.removeEventListener("click", handleRemoveLink);
    button.addEventListener("click", handleRemoveLink);
  });
};

const handleAddLink = (event) => {
  const linkInputDiv = document.createElement("div");
  linkInputDiv.className = "link-input";
  linkInputDiv.innerHTML = `
      <input type="text" value="" placeholder="링크를 입력하세요..." />
      <button class="add-link">+</button>
      <button class="remove-link">-</button>
    `;
  event.target.parentElement.parentElement.appendChild(linkInputDiv);
  addLinkEventListeners();
};

const handleRemoveLink = (event) => {
  const linkInputDiv = event.target.parentElement;
  linkInputDiv.remove();
};
