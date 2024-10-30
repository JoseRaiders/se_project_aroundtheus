import Popup from "./Popup.js";

// handles data for the card popup
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__image-preview");
    this._title = this._popupElement.querySelector(".modal__image-title");
  }

  // set src & alt for the image and the text of title
  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
    super.open();
  }
}
