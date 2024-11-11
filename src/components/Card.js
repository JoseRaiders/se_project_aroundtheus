// creates the cards with the image and title
export default class Card {
  constructor(
    card,
    cardSelector,
    handleImageClick,
    deleteCardPopup,
    handleDeleteCard
  ) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._deleteCardPopup = deleteCardPopup;
    this._handleDeleteCard = handleDeleteCard;
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
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    const cardId = this._cardElement.dataset.id; // get the cardId
    this._deleteCardPopup.open(cardId); // pass cardId when opening the popup
    this._deleteCardPopup.setConfirmCallback(() => {
      this._handleDeleteCard(this._cardElement); // pass card element to remove it
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

    // return the card element
    return this._cardElement;
  }
}
