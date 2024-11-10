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
import Api from "../components/Api.js";

/*=============================================
=                  Elements                   =
=============================================*/
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditForm = document.forms["profile-form"];
const cardListElement = document.querySelector(".cards__list");
const addNewCardBtn = document.querySelector(".profile__add-button");
const newCardForm = document.forms["card-form"];
// const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
// const profileTitleInput = document.querySelector("#modal-title-input");
// const profileDescriptionInput = document.querySelector(
//   "#modal-description-input"
// );
// const cardModal = document.querySelector("#add-card-modal");
// const cardTitleInput = newCardForm.querySelector("#modal-card-title");
// const cardLinkInput = newCardForm.querySelector("#modal-card-link");
// const imagePreviewModal = document.querySelector("#modal-image-preview");
// const modalImage = imagePreviewModal.querySelector(".modal__image-preview");
// const modalTitle = imagePreviewModal.querySelector(".modal__image-title");
// const popups = document.querySelectorAll(".modal");

/*=============================================
=                     API                     =
=============================================*/
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "abab587d-903d-4fa7-90c2-ee61a34ba949",
    "Content-Type": "application/json",
  },
});

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

// retrieve use info
api.getUserInfo().then((data) => {
  userInfo.setUserInfo({
    name: data.name,
    about: data.about,
    // avatar: data.avatar,
  });
});

function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.name,
    about: inputValues.about,
  });

  api
    .setUserInfo({ name: inputValues.name, about: inputValues.about })
    .then((data) => {
      // after updating, reflect the changes in the UI
      userInfo.setUserInfo({
        name: data.name,
        about: data.about,
        // avatar: data.avatar,
      });
      profilePopup.close();
    });
}

/*=============================================
=             Form Validation                 =
=============================================*/
const editFormValidation = new FormValidator(settings, profileEditForm);
const addFormValidation = new FormValidator(settings, newCardForm);

editFormValidation.enableValidation(); // check the profile form
addFormValidation.enableValidation(); // check the form adding new cards

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

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.link;

  // send new card to the server
  api.addCard({ name, link }).then((newCard) => {
    renderCard(newCard);
    addCardPopup.close();
    newCardForm.reset();
    // disable submit button after adding a card
    addFormValidation.disableButton();
  });
}

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

// retrieve initial cards
api.getInitialCards().then((cards) => {
  // display cards in the DOM
  cards.forEach((card) => {
    // render each card (assuming a renderCard function)
    renderCard(card);
  });
});

/*=============================================
=              Event Listeners                =
=============================================*/
profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo(); // { name: 'Profile Name', about: 'Profile Description' }
  profilePopup.setInputValues(currentUserInfo); // populate form inputs with user data
  editFormValidation.resetValidation(); // clear any validation errors before opening
  profilePopup.open();
});

// reset validation before opening the card modal
addNewCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});
