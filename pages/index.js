/*=============================================
=                  Modules                    =
=============================================*/
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#modal-title-input");
const profileDescriptionInput = document.querySelector(
  "#modal-description-input"
);
const profileEditForm = document.forms["profile-form"];
const cardListElement = document.querySelector(".cards__list");
const addNewCardBtn = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#add-card-modal");
const newCardForm = document.forms["card-form"];
const cardTitleInput = newCardForm.querySelector("#modal-card-title");
const cardLinkInput = newCardForm.querySelector("#modal-card-link");
const imagePreviewModal = document.querySelector("#modal-image-preview");
const modalImage = imagePreviewModal.querySelector(".modal__image-preview");
const modalTitle = imagePreviewModal.querySelector(".modal__image-title");
const popups = document.querySelectorAll(".modal");

/*=============================================
=             Form Validation                 =
=============================================*/
const editFormValidation = new FormValidator(settings, profileEditForm);
const addFormValidation = new FormValidator(settings, newCardForm);

editFormValidation.enableValidation();
addFormValidation.enableValidation();

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

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  // reset the validation state when the modal is opened
  editFormValidation.resetValidation();
  openModal(profileEditModal);
}

// function to handle image preview
function handleImageClick(link, name) {
  modalImage.src = link;
  modalImage.alt = name;
  modalTitle.textContent = name;
  openModal(imagePreviewModal);
}

// refactored renderCard function using the Card class
function renderCard(item, method = "prepend") {
  const card = new Card(item, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardListElement[method](cardElement);
}

// render initial cards
initialCards.forEach((data) => {
  renderCard(data);
});

/*=============================================
=              Event Handlers                 =
=============================================*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link });
  closeModal(cardModal);
  evt.target.reset();
  // reset validation after submitting
  addFormValidation.resetValidation();
}

/*=============================================
=              Event Listeners                =
=============================================*/
profileEditBtn.addEventListener("click", fillProfileForm);
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
// reset validation before opening the card modal
addNewCardBtn.addEventListener("click", () => {
  addFormValidation.resetValidation();
  openModal(cardModal);
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

// newCardForm.addEventListener("reset", () => {
//   const button = newCardForm.querySelector(".modal__button");
//   button.disabled = true;
//   button.classList.add("modal__button_disabled");
// });
