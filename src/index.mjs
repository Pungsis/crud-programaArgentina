import { UserData } from "./data/UserData.mjs";
import Storage from "./modules/Storage.mjs";
import {
  mainHtmlConstant,
  form,
  manageUsersHtml,
  manageDuesHtml,
} from "./data/constans.mjs";
import { getDate } from "./utils/DateFormatter.mjs";

let { currentFullDate, joinMonth } = getDate();

console.log(currentFullDate);

let clubUsers = Storage.getUsers() || UserData;
let currentId =
  (Storage.getUsers()?.length &&
    Storage.getUsers()[Storage.getUsers().length - 1].id) ||
  5;

console.log(currentId);

//constantes

const d = document;
const usersButton = d.querySelector(".users-button");
const usersButtonList = d.querySelector(".users-button li");
const homeButton = d.querySelector(".home-button");
const homeButtonList = d.querySelector(".home-button li");
const main = d.querySelector(".main");
const html = d.documentElement;
const themeToggler = d.querySelector("#button-toggler");
const sidebar = d.querySelector(".sidebar");
const hamburgerMenu = d.querySelector("#hamburger-menu input");
const duesButton = d.querySelector(".dues-button");
const duesButtonList = d.querySelector(".dues-button li");
const modalButton = d.querySelector(".close-modal-button");
const modalBox = d.querySelector(".user-details-modal-box");

hamburgerMenu.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-open");
});

main.addEventListener("click", () => {
  if (!sidebar.classList.contains("sidebar-open")) {
    return;
  }
  console.log(hamburgerMenu.checked);

  hamburgerMenu.checked === true
    ? (hamburgerMenu.checked = false)
    : (hamburgerMenu.checked = true);

  sidebar.classList.remove("sidebar-open");
});
let storedTheme = JSON.parse(localStorage.getItem("theme")) || "light";
html.setAttribute("data-theme", storedTheme);

themeToggler.addEventListener("click", () => {
  let currentTheme = html.getAttribute("data-theme");
  if (currentTheme === "light") {
    currentTheme = "dark";
    themeToggler.textContent = "BedTime";
  } else {
    currentTheme = "light";
    themeToggler.textContent = "Sunny";
  }

  html.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", JSON.stringify(currentTheme));
});

const handleEditUser = (userId) => {
  clearContent();
  createForm();
  const submitButton = d.querySelector("#form-button");
  const arrowButton = d.querySelector(".main > .arrow-button");
  const title = d.querySelector(".form-container > h1");
  const inputName = d.querySelector("input#name");
  const inputLastName = d.querySelector("input#lastname");
  const inputEmail = d.querySelector("input#email");
  const getUser = clubUsers.find((user) => user.id === userId);
  const { name, lastname, email } = getUser;

  submitButton.textContent = "Confirm";
  title.textContent = "Edit user";
  inputName.value = name;
  inputLastName.value = lastname;
  inputEmail.value = email;

  const form = d.querySelector("#form");
  form.addEventListener("submit", (e) => handleFormEditSubmit(e, userId));
  arrowButton.addEventListener("click", () => {
    clearContent();
    updateManageUsers(clubUsers);
  });
};

const handleFormEditSubmit = (e, userId) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formObj = Object.fromEntries(formData);
  console.log(formObj);
  const getUser = clubUsers.find((user) => user.id === userId);
  const filteredArray = clubUsers.filter((user) => user.id !== userId);
  const newUser = { ...getUser, ...formObj };
  clubUsers = [...filteredArray, newUser];
  clearContent();
  updateManageUsers(clubUsers);
};

const handleFormSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formOBj = Object.fromEntries(formData);

  clubUsers = handleAddUser(formOBj);
  console.log(clubUsers);

  clearContent();
  updateManageUsers(clubUsers);
};

const handleSearch = (e) => {
  const value = e.target.value.toLowerCase();
  const filteredUsersSearch = clubUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(value) ||
      user.lastname.toLowerCase().includes(value) ||
      `${user.name} ${user.lastname}`.toLowerCase().includes(value)
  );
  if (duesButtonList.classList.contains("is-active")) {
    updateDues(filteredUsersSearch);
    return;
  }
  updateManageUsers(filteredUsersSearch);
};

const handleDelete = (userId) => {
  const filteredUsers = clubUsers.filter((user) => user.id !== userId);
  clubUsers = [...filteredUsers];
  updateManageUsers(filteredUsers);
};

const updateDues = (users) => {
  const mainE = d.querySelector(".main > *");

  if (!!!mainE) {
    const userInputsDiv = d.createElement("div");
    const inputElement = d.createElement("input");

    userInputsDiv.setAttribute("class", "user-inputs");

    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("placeholder", "search...");

    userInputsDiv.insertAdjacentElement("beforeend", inputElement);
    main.insertAdjacentElement("afterbegin", userInputsDiv);
  }
  const tableContainer = d.querySelector(".manage-users-table");

  if (!!!tableContainer) {
    main.innerHTML += manageDuesHtml;
  } else {
    main.removeChild(tableContainer);

    mainE.insertAdjacentHTML("afterend", manageDuesHtml);
  }

  const searchInput = d.querySelector(".user-inputs > input");
  searchInput.addEventListener("input", handleSearch);

  users.forEach((user) => {
    const tableContainer = d.querySelector(".manage-users-table");
    tableContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="manage-users-table__row">
      <div>
      <img
      src="./public/assets/image.jpg"
      alt="profile-default"
      width="35px"
      height="35px"
      style="border-radius: 50%; transform: translateY(-5px)" />
            <span
              style="display: inline-block; transform: translateY(-17px)"
              >${user.name} ${user.lastname}</span
              >
              </div>
              <p>${user.status}</p>
              <p>${user.nextpayment}</p>
              <button class="access-button" id="access-button-${user.id}">${
        user.access ? "Granted" : "Denied"
      }</button>
              <div class="table-buttons" id="table-buttons-${user.id}">
              <button class="details-button">View details</button>
              </div>`
    );
    const accessButton = d.querySelector(`#access-button-${user.id}`);
    const detailsButton = d.querySelector(
      `#table-buttons-${user.id} .details-button`
    );
    console.log(accessButton);

    user.access ? null : accessButton.classList.add("denied");
    accessButton.addEventListener("click", () => {
      user.access = !user.access;
      accessButton.classList.toggle("denied");
      accessButton.classList.contains("denied")
        ? (accessButton.textContent = "Denied")
        : (accessButton.textContent = "Granted");
    });

    detailsButton.addEventListener("click", () => {
      modalBox.style = "display: flex";
    });
  });
};

const updateManageUsers = (users) => {
  Storage.saveUsers(users);

  const mainE = d.querySelector(".main > *");

  if (!!!mainE) {
    const userInputsDiv = d.createElement("div");
    const inputElement = d.createElement("input");
    const buttonElement = d.createElement("button");

    userInputsDiv.setAttribute("class", "user-inputs");

    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("placeholder", "search...");

    buttonElement.setAttribute("type", "button");
    buttonElement.setAttribute("id", "add-user-button");
    buttonElement.textContent = "+  Add";

    userInputsDiv.insertAdjacentElement("beforeend", inputElement);
    userInputsDiv.insertAdjacentElement("beforeend", buttonElement);
    main.insertAdjacentElement("afterbegin", userInputsDiv);
  }
  const tableContainer = d.querySelector(".manage-users-table");

  if (!!!tableContainer) {
    main.innerHTML += manageUsersHtml;
  } else {
    main.removeChild(tableContainer);

    mainE.insertAdjacentHTML("afterend", manageUsersHtml);
  }

  const searchInput = d.querySelector(".user-inputs > input");
  const addUsers = d.querySelector("#add-user-button");

  searchInput.addEventListener("input", handleSearch);

  //   tableContainer.insertAdjacentHTML("beforeend", data);
  addUsers.addEventListener("click", displayForm);

  users.forEach((user) => {
    const tableContainer = d.querySelector(".manage-users-table");
    tableContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="manage-users-table__row">
      <div>
      <img
      src="./public/assets/image.jpg"
      alt="profile-default"
      width="35px"
      height="35px"
      style="border-radius: 50%; transform: translateY(-5px)" />
            <span
              style="display: inline-block; transform: translateY(-17px)"
              >${user.name} ${user.lastname}</span
              >
              </div>
              <p>${user.email}</p>
              <p>${user.join}</p>
              <p>${user.role}</p>
              <div class="table-buttons" id="table-buttons-${user.id}">
              </div>`
    );
    const tableButtons = d.querySelector(`#table-buttons-${user.id}`);
    const editButton = d.createElement("button");
    const deleteButton = d.createElement("button");
    editButton.setAttribute("class", "table-buttons__button");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("id", "edit-button");
    editButton.textContent = "Edit";

    deleteButton.setAttribute(
      "class",
      "material-symbols-outlined arrow-button"
    );
    deleteButton.setAttribute("id", "delete-button");
    deleteButton.setAttribute("style", "color: red");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => handleDelete(user.id));
    editButton.addEventListener("click", () => handleEditUser(user.id));

    tableButtons.insertAdjacentElement("beforeend", editButton);
    tableButtons.insertAdjacentElement("beforeend", deleteButton);
    // //  <button type="button" class="table-buttons__button">
    // Edit
    // </button>
    // <button class="material-symbols-outlined arrow-button" id="delete-button" style="color: red">Delete</button>
    // </div>
  });
};

const handleAddUser = (userInput) => {
  const { name, lastname, email, role } = userInput;
  currentId++;

  const newUser = {
    id: currentId,
    name: name,
    lastname: lastname,
    email: email,
    member: true,
    join: currentFullDate,
    role: role,
    nextpayment: "30/20/1992",
    status: "active",
    access: false,
    payments: {
      january: "paid",
      february: "paid",
      march: "paid",
      april: "paid",
      june: "paid",
      july: "paid",
      august: "paid",
      september: "paid",
      october: "paid",
      november: "paid",
      december: "paid",
    },
  };
  return [...clubUsers, newUser];
};
const htmlData = () => {
  return UserData.map((data) => {
    return `<div class="table-wrapper__row">
        <div>
          <p>${data.name} ${data.lastname}</p>
        </div>
        <p>${data.email}</p>
        <p>${data.join}</p>
        <p>$1250</p>
        <p class="pending">pending</p>
      </div>`;
  }).join("");
};

const updateHome = () => {
  main.innerHTML = mainHtmlConstant;
};
const initializeUI = () => {
  updateHome();
  const tableWrapper = d.querySelector(".table-wrapper");

  console.log(tableWrapper);
  tableWrapper.insertAdjacentHTML("beforeend", htmlData());
};

initializeUI();

const displayForm = () => {
  clearContent();
  createForm();

  const arrowButton = d.querySelector(".main > .arrow-button");

  const form = d.querySelector("#form");
  form.addEventListener("submit", handleFormSubmit);
  arrowButton.addEventListener("click", () => {
    clearContent();
    updateManageUsers(clubUsers);
  });
};

const createForm = () => {
  main.innerHTML = form;
};

homeButton.addEventListener("click", () => {
  hamburgerMenu.checked === true
    ? (hamburgerMenu.checked = false)
    : (hamburgerMenu.checked = true);

  sidebar.classList.toggle("sidebar-open");
  homeButtonList.classList.add("is-active");
  if (usersButtonList.classList.contains("is-active")) {
    usersButtonList.classList.remove("is-active");
  }
  if (duesButtonList.classList.contains("is-active")) {
    duesButtonList.classList.remove("is-active");
  }
  clearContent();
  updateHome();
  const updatedTableWrapper = d.querySelector(".table-wrapper");
  updatedTableWrapper.insertAdjacentHTML("beforeend", htmlData());
});

usersButton.addEventListener("click", () => {
  hamburgerMenu.checked === true
    ? (hamburgerMenu.checked = false)
    : (hamburgerMenu.checked = true);

  sidebar.classList.toggle("sidebar-open");
  usersButtonList.classList.add("is-active");
  if (homeButtonList.classList.contains("is-active")) {
    homeButtonList.classList.remove("is-active");
  }
  if (duesButtonList.classList.contains("is-active")) {
    duesButtonList.classList.remove("is-active");
  }

  clearContent();
  updateManageUsers(clubUsers);
});

duesButton.addEventListener("click", () => {
  hamburgerMenu.checked === true
    ? (hamburgerMenu.checked = false)
    : (hamburgerMenu.checked = true);

  sidebar.classList.toggle("sidebar-open");
  duesButtonList.classList.add("is-active");
  if (homeButtonList.classList.contains("is-active")) {
    homeButtonList.classList.remove("is-active");
  }
  if (usersButtonList.classList.contains("is-active")) {
    usersButtonList.classList.remove("is-active");
  }

  clearContent();
  updateDues(clubUsers);
});

const clearContent = () => {
  main.innerHTML = "";
};

modalButton.addEventListener("click", () => {
  modalBox.style = "display: none";
});
