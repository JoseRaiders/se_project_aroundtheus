import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    // this._handleConfirm = handleConfirm;
    this._confirmButton = this._popupElement.querySelector(
      ".modal__button-delete"
    );
  }

  setConfirmCallback(callback) {
    this._handleConfirm = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      if (this._handleConfirm) {
        this._handleConfirm(); // call the confirmCallbacl function
      }
    });
  }
}
