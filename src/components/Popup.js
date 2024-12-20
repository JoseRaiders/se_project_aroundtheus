export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // open popup & detect the esc key to close popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // close popup & remove esc key listener
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    // listens for esc key
    if (evt.key === "Escape" || evt.key === "Esc") {
      // document.querySelectorAll(".modal_opened").forEach((modal) => {
      //   modal.classList.remove("modal_opened");
      // });
      this.close();
    }
  }

  setEventListeners() {
    // add a mousedown event listener to close the popup
    // if occurs outside the popup or on the close icon
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal_opened") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
