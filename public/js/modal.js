const openEditModal = (id) => {
  currentEditId = id;
  const modal = document.querySelector(".textarea");
  const modalBackground = document.querySelector(".modal-background");
  const box = document.getElementById(id);
  const content = box.querySelector("p").innerText;
  const links = JSON.parse(box.dataset.links);

  document.querySelector(".input").value = content;
  const linksContainer = document.querySelector(".inputs-container");
  linksContainer.innerHTML = "";

  links.forEach((link) => {
    const linkInputDiv = document.createElement("div");
    linkInputDiv.className = "link-input";
    linkInputDiv.innerHTML = `
        <input type="text" value="${link}" placeholder="링크를 입력하세요..." />
        <button class="add-link">+</button>
        <button class="remove-link">-</button>
      `;
    linksContainer.appendChild(linkInputDiv);
  });

  addLinkEventListeners();

  modal.style.display = "flex";
  modalBackground.style.display = "block";
};

const closeModal = () => {
  const modal = document.querySelector(".textarea");
  const modalBackground = document.querySelector(".modal-background");
  modal.style.display = "none";
  modalBackground.style.display = "none";
  currentEditId = null;
};

const saveChanges = async () => {
  console.log("Save Changes button clicked"); // 디버그 로그 추가
  if (currentEditId === null) return;

  const box = document.getElementById(currentEditId);
  const newContent = document.querySelector(".input").value;
  const linksContainer = document.querySelector(".inputs-container");
  const newLinks = Array.from(
    linksContainer.querySelectorAll("input[type='text']")
  ).map((input) => input.value);
  const content = box.querySelector("p").innerText;
  const oldLinks = JSON.parse(box.dataset.links);

  console.log("New Content:", newContent); // 디버그 로그 추가
  console.log("New Links:", newLinks); // 디버그 로그 추가

  if (
    newContent !== content ||
    JSON.stringify(newLinks) !== JSON.stringify(oldLinks)
  ) {
    try {
      const response = await fetch(`/api/update/${currentEditId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newContent, links: newLinks }),
      });

      if (response.ok) {
        console.log("Data updated successfully");
        window.location.reload();
        box.querySelector("p").innerText = newContent;
        box.dataset.links = JSON.stringify(newLinks);
      } else {
        console.error("Error updating data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  closeModal();
  console.log("Success");
};

const addLinkEventListeners = () => {
  const addLinkBtns = document.querySelectorAll(".add-link");
  const removeLinkBtns = document.querySelectorAll(".remove-link");

  addLinkBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const linkInputDiv = document.createElement("div");
      linkInputDiv.className = "link-input";
      linkInputDiv.innerHTML = `
        <input type="text" placeholder="링크를 입력하세요..." />
        <button class="add-link">+</button>
        <button class="remove-link">-</button>
      `;
      btn.parentElement.parentElement.appendChild(linkInputDiv);
      addLinkEventListeners();
    });
  });

  removeLinkBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.remove();
    });
  });
};

const setupModalEvents = () => {
  const closeModalBtn = document.querySelector(".cancel");
  const saveChangesBtn = document.querySelector(".submit");
  const modalBackground = document.querySelector(".modal-background");

  closeModalBtn.addEventListener("click", closeModal);
  modalBackground.addEventListener("click", closeModal);
  saveChangesBtn.addEventListener("click", saveChanges);

  addLinkEventListeners();
};

setupModalEvents();
