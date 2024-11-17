// creates the cards with the image and title
export default class Card {
  constructor(
    card,
    cardSelector,
    handleImageClick,
    deleteCardPopup,
    handleDeleteCard,
    api
  ) {
    this._name = card.name;
    this._link = card.link;
    this._id = card._id;
    this._isLiked = card.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._deleteCardPopup = deleteCardPopup;
    this._handleDeleteCard = handleDeleteCard;
    this._api = api;
    this._handleLikeIcon = this._handleLikeIcon.bind(this);
  }

  /*============================================
  =                  Methods                   =
  =============================================*/
  // like button event listener
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    // delete button event listener
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    // image click event listener
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name);
    });
  }

  _handleLikeIcon() {
    // this._likeButton.classList.toggle("card__like-button_active");
    if (this._isLiked) {
      this._api
        .dislikeCard(this._id)
        .then(() => {
          this._isLiked = false;
          this._likeButton.classList.remove("card__like-button_active");
        })
        .catch((err) => {
          console.error("Error disliking card:", err);
        });
    } else {
      this._api
        .likeCard(this._id)
        .then(() => {
          this._isLiked = true;
          this._likeButton.classList.add("card__like-button_active");
        })
        .catch((err) => {
          console.error("Error disliking card:", err);
        });
    }
  }

  _handleDeleteButton() {
    const cardId = this._cardElement.dataset.id; // get the cardId
    this._deleteCardPopup.open(); // open the delete confirmation popup
    this._deleteCardPopup.setConfirmCallback(() => {
      this._handleDeleteCard(cardId, this._cardElement) // call handleDeleteCard with cardId
        .catch((err) => {
          console.error("Error deleting card:", err);
        });
    });
  }

  // get the card view and set event listeners
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");

    // set card content
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // invoking the event listeners
    this._setEventListeners();

    // initial like status
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    // return the card element
    return this._cardElement;
  }
}
