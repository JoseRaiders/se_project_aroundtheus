import Popup from "./Popup.js";

// handles actions for the profile popup
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  // method to populate input values based on provided data
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // returns the form element
  getForm() {
    return this._popupForm;
  }

  // close popup and reset form along with button text
  close() {
    super.close();
    this._popupForm.reset();
    this._renderLoading(false); // reset button when closed
  }

  // collect & return form input values
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _renderLoading(isLoading) {
    this._submitButton.textContent = isLoading
      ? "Saving..."
      : this._submitButtonText;
  }

  // handle outside click closure & form submission
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // this._handleFormSubmit(this._getInputValues());
      // this._popupForm.reset(); // reset from input after successful form submission
      // this.close();

      this._renderLoading(true); // show Saving...
      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          this.close();
        })
        .finally(() => {
          this._renderLoading(false); // revert to original text
        });
    });
  }
}
