import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor({ popupSelector, api }) {
    super({ popupSelector });
    // this._handleConfirm = handleConfirm;
    this._confirmButton = this._popupElement.querySelector(
      ".modal__button-delete"
    );
    this._api = api;
  }

  setConfirmCallback(callback) {
    this._handleConfirm = callback;
  }

  setDeleteHandler({ cardId, cardElement }) {
    // store delete logic
    this._handleConfirm = () => {
      this._api
        .deleteCard(cardId)
        .then(() => {
          cardElement.remove(); // remove card from DOM
          this.close(); // close the modal
        })
        .catch((err) => {
          console.error("Error deleting card:", err);
        });
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      if (this._handleConfirm) {
        this._handleConfirm(); // call delete logic
      }
    });
  }
}
