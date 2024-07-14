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
=                  Elements                   =
=============================================*/
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalClose = document.querySelector("#profile-edit-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#modal-title-input");
const profileDescriptionInput = document.querySelector(
  "#modal-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addNewCardBtn = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#add-card-modal");
const addNewCardClose = cardModal.querySelector("#card-edit-close");
const newCardForm = cardModal.querySelector("#card-form");
const cardTitleInput = newCardForm.querySelector("#modal-card-title");
const cardLinkInput = newCardForm.querySelector("#modal-card-link");

/*=============================================
=                 Functions                   =
=============================================*/
function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
}

function openModal() {
  cardModal.classList.add("modal_opened");
}

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  cardModal.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;
  return cardElement;
}

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListElement.prepend(cardElement);
});

/*=============================================
=              Event Handlers                 =
=============================================*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

function handleAddardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardListElement.prepend(cardElement);
  closePopup();
}

/*=============================================
=              Event Listeners                =
=============================================*/
profileEditBtn.addEventListener("click", fillProfileForm);

profileEditModalClose.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

addNewCardBtn.addEventListener("click", openModal);

addNewCardClose.addEventListener("click", closePopup);

newCardForm.addEventListener("submit", handleAddardFormSubmit);

const cardLikeBtn = document.querySelectorAll(".card__like-button");
cardLikeBtn.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
});
