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
const profileEditForm = document.forms["profile-form"];

const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardBtn = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#add-card-modal");
const addNewCardClose = cardModal.querySelector("#card-edit-close");
const newCardForm = document.forms["card-form"];
const cardTitleInput = newCardForm.querySelector("#modal-card-title");
const cardLinkInput = newCardForm.querySelector("#modal-card-link");

const imagePreviewModal = document.querySelector("#modal-image-preview");
const imagePreviewModalClose =
  imagePreviewModal.querySelector("#modal-image-close");
const modalImage = imagePreviewModal.querySelector(".modal__image-preview");
const modalTitle = imagePreviewModal.querySelector(".modal__image-title");

const popups = document.querySelectorAll(".modal");

/*=============================================
=                 Functions                   =
=============================================*/
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  // find the like button. when clicked, set to active
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // find delete button, click eventListener and .remove method
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // open the image preview modal with image details
  cardImageElement.addEventListener("click", () => {
    modalImage.src = data.link;
    modalImage.alt = data.name;
    modalTitle.textContent = data.name;

    openModal(imagePreviewModal);
  });

  return cardElement;
}

// rendering the initial cards
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  // Add the card into the section using the method
  cardListElement[method](cardElement);
}

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
  closePopup(profileEditModal);
}

function handleAddardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link });
  closePopup(cardModal);
  evt.target.reset();
}

/*=============================================
=              Event Listeners                =
=============================================*/
profileEditBtn.addEventListener("click", fillProfileForm);

profileEditModalClose.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

addNewCardBtn.addEventListener("click", () => openModal(cardModal));

addNewCardClose.addEventListener("mousedown", () => closePopup(cardModal));

newCardForm.addEventListener("submit", handleAddardFormSubmit);

imagePreviewModalClose.addEventListener("click", () =>
  closePopup(imagePreviewModal)
);

// esc key event listener
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape" || evt.key === "Esc") {
    popups.forEach((popup) => {
      if (popup.classList.contains("modal_opened")) {
        closePopup(popup);
      }
    });
  }
});

// overlay event listener
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("modal_close")) {
      closePopup(popup);
    }
  });
});

// profileEditModal.addEventListener("click", (evt) => {
//   if (evt.target === profileEditModal) {
//     closePopup(profileEditModal);
//   }
// });

// cardModal.addEventListener("click", (evt) => {
//   if (evt.target === cardModal) {
//     closePopup(cardModal);
//   }
// });

// imagePreviewModal.addEventListener("click", (evt) => {
//   if (evt.target === imagePreviewModal) {
//     closePopup(imagePreviewModal);
//   }
// });
