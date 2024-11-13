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
import PopupConfirmation from "../components/PopupConfirmation.js";

/*=============================================
=                  Elements                   =
=============================================*/
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditForm = document.forms["profile-form"];
const cardListElement = document.querySelector(".cards__list");
const addNewCardBtn = document.querySelector(".profile__add-button");
const newCardForm = document.forms["card-form"];
const deleteButton = document.querySelector(".modal__button-delete");
const avatarEditButton = document.querySelector(".profile__image-overlay");
const avatarForm = document.forms["avatar-form"];

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
=            Render & Delete Cards            =
=============================================*/
// initalizate delete card button before new section
const deleteCardPopup = new PopupConfirmation(
  "#delete-card-modal",
  handleDeleteCard
);
deleteCardPopup.setEventListeners();

// handle the delete button click
function handleDeleteCard(cardElement) {
  const cardId = cardElement.dataset.id;

  // delete request to the API
  api.deleteCard(cardId).then(() => {
    cardElement.remove(); // remove card from the DOM
  });
}

/*=============================================
=            Section and UserInfo             =
=============================================*/
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
section.renderItems();

// retrieve use info
api.getUserInfo().then((data) => {
  // console.log(data);
  userInfo.setUserInfo({
    name: data.name,
    about: data.about,
    avatar: data.avatar,
  });
});

function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.name,
    about: inputValues.about,
    avatar: inputValues.avatar,
  });

  return api
    .setUserInfo({
      name: inputValues.name,
      about: inputValues.about,
      avatar: inputValues.avatar,
    })
    .then((data) => {
      // after updating, reflect the changes in the UI
      userInfo.setUserInfo({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      });
      profilePopup.close();
    });
}

/*=============================================
=               Handle avatar                 =
=============================================*/
// instantiate the avatar popup
const avatarPopup = new PopupWithForm(
  "#avatar-picture-modal",
  handleAvatarFormSubmit
);
avatarPopup.setEventListeners();

function handleAvatarFormSubmit(inputValues) {
  // pass avatar url to the API
  return api.setUserAvatar(inputValues.avatar).then((updatedData) => {
    userInfo.setUserInfo(updatedData); // update avatar in teh DOM
    avatarPopup.close();
  });
}

/*=============================================
=             Form Validation                 =
=============================================*/
const editFormValidation = new FormValidator(settings, profileEditForm);
const addFormValidation = new FormValidator(settings, newCardForm);
const avatarFormValidation = new FormValidator(settings, avatarForm);

editFormValidation.enableValidation(); // check the profile form
addFormValidation.enableValidation(); // check the form adding new cards
avatarFormValidation.enableValidation(); // check the avatar form

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
  return api.addCard({ name, link }).then((newCard) => {
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
  const card = new Card(
    item,
    "#card-template",
    handleImageClick,
    deleteCardPopup,
    handleDeleteCard,
    api
  );
  const cardElement = card.getView();
  cardElement.dataset.id = item._id; // store the cardId to the card element
  cardListElement[method](cardElement);
  // console.log("Card ID:", cardElement.dataset.id);
}

/*=============================================
=               Initial Cards                 =
=============================================*/
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

deleteButton.addEventListener("click", () => {
  // console.log("Delete button (Yes) clicked");
  const cardId = deleteButton.dataset.cardId; // retrieve cardId
  if (!cardId) return; // ensure cardId exists before API call
  handleDeleteCard(cardId);

  api.deleteCard(cardId).then(() => {
    const cardElement = document.querySelector(`[data-id="${cardId}"]`); // find card element
    if (cardElement) {
      cardElement.remove();
    }
    deleteCardPopup.close();
  });
});

// open the popup when the avatar edit icon is clicked
avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
});
