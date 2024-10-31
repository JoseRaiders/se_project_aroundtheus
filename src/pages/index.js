/*=============================================
=                  Modules                    =
=============================================*/
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*=============================================
=         Form Validation Settings            =
=============================================*/
const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/*=============================================
=                  Elements                   =
=============================================*/
const profileEditBtn = document.querySelector("#profile-edit-button");
// const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#modal-title-input");
const profileDescriptionInput = document.querySelector(
  "#modal-description-input"
);
const profileEditForm = document.forms["profile-form"];
const cardListElement = document.querySelector(".cards__list");
const addNewCardBtn = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#add-card-modal");
const newCardForm = document.forms["card-form"];
// const cardTitleInput = newCardForm.querySelector("#modal-card-title");
// const cardLinkInput = newCardForm.querySelector("#modal-card-link");
// const imagePreviewModal = document.querySelector("#modal-image-preview");
// const modalImage = imagePreviewModal.querySelector(".modal__image-preview");
// const modalTitle = imagePreviewModal.querySelector(".modal__image-title");
const popups = document.querySelectorAll(".modal");

/*=============================================
=            Section and UserInfo             =
=============================================*/
const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
section.renderItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

/*=============================================
=             Form Validation                 =
=============================================*/
const editFormValidation = new FormValidator(settings, profileEditForm);
const addFormValidation = new FormValidator(settings, newCardForm);

editFormValidation.enableValidation(); // check the profile form
addFormValidation.enableValidation(); // check the form adding new cards

/*=============================================
=                 Functions                   =
=============================================*/
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.title,
    description: inputValues.description,
  });
  profilePopup.close();
  // profileTitle.textContent = inputValues.title;
  // profileDescription.textContent = inputValues.description;
  // closeModal(profileEditModal);
}

// function fillProfileForm() {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   // reset the validation state when the modal is opened
//   editFormValidation.resetValidation();
//   openModal(profileEditModal);
// }

/*=============================================
=            Popup and Form Instances         =
=============================================*/

const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

/*=============================================
=            Handle Image Preview             =
=============================================*/
const previewImagePopup = new PopupWithImage("#modal-image-preview");

function handleImageClick(link, name) {
  previewImagePopup.open({ link, name });
}

// refactored renderCard function using the Card class
function renderCard(item, method = "prepend") {
  const card = new Card(item, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardListElement[method](cardElement);
}

// render initial cards
// initialCards.forEach((data) => {
//   renderCard(data);
// });

/*=============================================
=              Event Handlers                 =
=============================================*/
function handleAddCardFormSubmit(inputValues) {
  console.log("Form input values:", inputValues);
  const name = inputValues.name;
  const link = inputValues.link;
  renderCard({ name, link });
  // closeModal(cardModal);
  addCardPopup.close();
  newCardForm.reset();
  // disable submit button after adding a card
  addFormValidation.disableButton();
}

/*=============================================
=              Event Listeners                =
=============================================*/
// profileEditBtn.addEventListener("click", fillProfileForm);

profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  // profileTitleInput.value = profileTitle.textContent;
  // profileDescriptionInput.value = profileDescription.textContent;
  profilePopup.open();
});

// profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// reset validation before opening the card modal
addNewCardBtn.addEventListener("click", () => {
  // openModal(cardModal);
  addCardPopup.open();
  addFormValidation.resetValidation();
});

newCardForm.addEventListener("submit", handleAddCardFormSubmit);

// esc key function
function handleEscClose(evt) {
  if (evt.key === "Escape" || evt.key === "Esc") {
    document.querySelectorAll(".modal_opened").forEach(closeModal);
  }
}

// overlay event listener
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("modal__close")) {
      closeModal(popup);
    }
  });
});
