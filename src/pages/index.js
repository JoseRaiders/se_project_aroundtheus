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
import { initialCards, settings } from "../utils/constants.js";

/*=============================================
=                  Elements                   =
=============================================*/
const profileEditBtn = document.querySelector("#profile-edit-button");
// const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
// const profileTitleInput = document.querySelector("#modal-title-input");
// const profileDescriptionInput = document.querySelector(
//   "#modal-description-input"
// );
const profileEditForm = document.forms["profile-form"];
const cardListElement = document.querySelector(".cards__list");
const addNewCardBtn = document.querySelector(".profile__add-button");
// const cardModal = document.querySelector("#add-card-modal");
const newCardForm = document.forms["card-form"];
// const cardTitleInput = newCardForm.querySelector("#modal-card-title");
// const cardLinkInput = newCardForm.querySelector("#modal-card-link");
// const imagePreviewModal = document.querySelector("#modal-image-preview");
// const modalImage = imagePreviewModal.querySelector(".modal__image-preview");
// const modalTitle = imagePreviewModal.querySelector(".modal__image-title");
// const popups = document.querySelectorAll(".modal");

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
function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({
    title: inputValues.title,
    description: inputValues.description,
  });
  profilePopup.close();
  // profileTitle.textContent = inputValues.title;
  // profileDescription.textContent = inputValues.description;
  // closeModal(profileEditModal);
}

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
addCardPopup.getForm();

/*=============================================
=            Handle Image Preview             =
=============================================*/
const previewImagePopup = new PopupWithImage("#modal-image-preview");
previewImagePopup.setEventListeners();

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
  const name = inputValues.title;
  const link = inputValues.link;
  renderCard({ name, link });
  addCardPopup.close();
  newCardForm.reset();
  // disable submit button after adding a card
  addFormValidation.disableButton();
}

/*=============================================
=              Event Listeners                =
=============================================*/
profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo(); // { title: 'Profile Title', description: 'Profile Description' }
  profilePopup.setInputValues(currentUserInfo); // populate form inputs with user data
  // profileTitleInput.value = currentUserInfo.name;
  // profileDescriptionInput.value = currentUserInfo.description;
  // profileTitleInput.value = profileTitle.textContent;
  // profileDescriptionInput.value = profileDescription.textContent;
  profilePopup.open();
});

// reset validation before opening the card modal
addNewCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});
