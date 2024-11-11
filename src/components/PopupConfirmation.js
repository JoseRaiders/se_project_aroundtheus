import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super({ popupSelector });
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popupElement.querySelector(
      ".modal__button-delete"
    );
  }

  open(cardId) {
    this._cardId = cardId; // store cardId when popup opens
    super.open();
  }

  setConfirmCallback(callback) {
    this._handleConfirm = callback;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm(this._cardId); // store cardId to delete handler
      this.close();
    });
  }
}
