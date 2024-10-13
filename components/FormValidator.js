export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  /*============================================
  =                  Methods                   =
  =============================================*/
  _showInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    // apply a class to show the error element
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    // apply a class to hide the error element
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      // if NOT (!), show the error element
      return this._showInputError(inputElement);
    }
    // if it's valid, hide the error element
    this._hideInputError(inputElement);
  }

  _toggleButtonState() {
    let foundInvalid = false;

    this._inputElements.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        foundInvalid = true;
      }
    });

    if (foundInvalid) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      return (this._submitButton.disabled = true);
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    this._inputElements = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputElements);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      // when the form gets submitted, cancel the default browser behavior
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  // special resetValidation method
  resetValidation() {
    // toggle the submit button state
    this._toggleButtonState();

    // clear errors in the form
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
